// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RoyaltyNFT.sol"; // Assuming RoyaltyNFT.sol is in the same directory

contract RoyaltyStaking is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    IERC1155 public royaltyNFT; // The RoyaltyNFT contract instance
    RoyaltyNFT public royaltyNFTContract; // To access rating

    // Struct to store staking information for each user and token ID
    struct Stake {
        uint256 amount; // Amount of NFTs staked
        uint256 rewardDebt; // Tracks rewards paid out or owed
    }

    // Mapping from token ID => user address => Stake
    mapping(uint256 => mapping(address => Stake)) public stakes;

    // Mapping from token ID => total staked amount for that token
    mapping(uint256 => uint256) public totalStakedPerToken;

    // Mapping from token ID => accumulated rewards per share
    // This value is updated each time royalties are distributed
    mapping(uint256 => uint256) public accRewardsPerShare;

    // Mapping from user address => token ID => pending rewards
    // This is used to simplify claim logic and show users their claimable amount
    mapping(address => mapping(uint256 => uint256)) public pendingRewards;

    // Total AVAX royalties received for a token ID, yet to be distributed
    mapping(uint256 => uint256) public totalUndistributedRoyalties;

    // Events
    event Staked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event Unstaked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event RoyaltiesDistributed(uint256 indexed tokenId, uint256 amountDistributed);
    event RoyaltiesClaimed(address indexed user, uint256 indexed tokenId, uint256 amountClaimed);

    constructor(address _royaltyNFTAddress) {
        royaltyNFT = IERC1155(_royaltyNFTAddress);
        royaltyNFTContract = RoyaltyNFT(_royaltyNFTAddress); // For reading artist rating
    }

    // Allows users to stake NFT shares to earn royalties.
    function stake(uint256 tokenId, uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0 tokens");
        require(
            royaltyNFT.balanceOf(msg.sender, tokenId) >= amount,
            "Insufficient token balance"
        );

        // Update rewards before staking more
        _updateRewards(msg.sender, tokenId);

        // Transfer NFTs to this contract
        royaltyNFT.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        stakes[tokenId][msg.sender].amount = stakes[tokenId][msg.sender].amount.add(amount);
        totalStakedPerToken[tokenId] = totalStakedPerToken[tokenId].add(amount);

        // Update reward debt for the new stake
        stakes[tokenId][msg.sender].rewardDebt = stakes[tokenId][msg.sender].amount.mul(accRewardsPerShare[tokenId]).div(1e18); // Assuming 1e18 precision for accRewardsPerShare

        emit Staked(msg.sender, tokenId, amount);
    }

    // Allows users to unstake their NFT shares
    function unstake(uint256 tokenId, uint256 amount) external nonReentrant {
        Stake storage userStake = stakes[tokenId][msg.sender];
        require(amount > 0, "Cannot unstake 0 tokens");
        require(userStake.amount >= amount, "Not enough staked tokens");

        // Update rewards before unstaking
        _updateRewards(msg.sender, tokenId);

        // Transfer NFTs back to the user
        royaltyNFT.safeTransferFrom(address(this), msg.sender, tokenId, amount, "");

        userStake.amount = userStake.amount.sub(amount);
        totalStakedPerToken[tokenId] = totalStakedPerToken[tokenId].sub(amount);

        // Update reward debt for the remaining stake
        userStake.rewardDebt = userStake.amount.mul(accRewardsPerShare[tokenId]).div(1e18); // Assuming 1e18 precision

        emit Unstaked(msg.sender, tokenId, amount);
    }

    // Distributes royalties to the staking contract.
    // This function would typically be called by the StreamingSimulator or an admin role.
    function distributeRoyalties(uint256 tokenId, uint256 amount) external payable Ownable { // Assuming AVAX is sent with the call
        require(amount > 0, "Cannot distribute 0 royalties");
        require(msg.value == amount, "Sent AVAX does not match royalty amount");
        require(totalStakedPerToken[tokenId] > 0, "No tokens staked for this ID");

        // Update accumulated rewards per share for the token
        // The precision factor (1e18) is used to handle fractional rewards
        accRewardsPerShare[tokenId] = accRewardsPerShare[tokenId].add(amount.mul(1e18).div(totalStakedPerToken[tokenId]));
        totalUndistributedRoyalties[tokenId] = totalUndistributedRoyalties[tokenId].add(amount);

        emit RoyaltiesDistributed(tokenId, amount);
    }

    // Updates pending rewards for a user and a specific token ID
    function _updateRewards(address user, uint256 tokenId) internal {
        Stake storage userStake = stakes[tokenId][user];
        uint256 currentRewards = userStake.amount.mul(accRewardsPerShare[tokenId]).div(1e18); // Using 1e18 precision
        uint256 newRewards = currentRewards.sub(userStake.rewardDebt);

        if (newRewards > 0) {
            pendingRewards[user][tokenId] = pendingRewards[user][tokenId].add(newRewards);
        }
        // Update reward debt to current level, so user doesn't get paid for past earnings again on next calculation
        userStake.rewardDebt = currentRewards;
    }

    // Real-time claim functionality for investors to withdraw earnings.
    function claimRoyalties(uint256 tokenId) external nonReentrant {
        _updateRewards(msg.sender, tokenId); // Ensure pending rewards are up-to-date

        uint256 amountToClaim = pendingRewards[msg.sender][tokenId];
        require(amountToClaim > 0, "No royalties to claim");
        require(address(this).balance >= amountToClaim, "Insufficient contract balance for payout");

        pendingRewards[msg.sender][tokenId] = 0; // Reset pending rewards for this token
        totalUndistributedRoyalties[tokenId] = totalUndistributedRoyalties[tokenId].sub(amountToClaim);


        (bool success, ) = msg.sender.call{value: amountToClaim}("");
        require(success, "AVAX transfer failed");

        emit RoyaltiesClaimed(msg.sender, tokenId, amountToClaim);
    }

    // View function to check pending rewards for a user and token ID
    function getPendingRoyalties(address user, uint256 tokenId) external view returns (uint256) {
        Stake storage userStake = stakes[tokenId][user];
        uint256 currentTotalRewards = userStake.amount.mul(accRewardsPerShare[tokenId]).div(1e18); // Using 1e18 precision
        uint256 alreadyAccountedFor = userStake.rewardDebt;
        uint256 newRewardsSinceLastAction = currentTotalRewards.sub(alreadyAccountedFor);
        return pendingRewards[user][tokenId].add(newRewardsSinceLastAction);
    }

    // View function to get artist rating via the RoyaltyNFT contract
    function getArtistRatingForToken(uint256 tokenId) external view returns (uint256) {
        return royaltyNFTContract.getArtistRating(tokenId);
    }

    // Fallback function to accept direct AVAX transfers (e.g., for royalty distributions)
    receive() external payable {}

    // Required for ERC1155Holder
    function onERC1155Received(
        address, /*operator*/
        address, /*from*/
        uint256, /*id*/
        uint256, /*value*/
        bytes calldata /*data*/
    ) external pure returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address, /*operator*/
        address, /*from*/
        uint256[] calldata, /*ids*/
        uint256[] calldata, /*values*/
        bytes calldata /*data*/
    ) external pure returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}
