// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "./RoyaltyNFT.sol";

contract RoyaltyStaking is Ownable, ReentrancyGuard {

    RoyaltyNFT public nftContract;

    struct Stake {
        uint256 tokenId;
        uint256 amount;
        uint256 stakeTimestamp;
        uint256 lastClaimTimestamp;
    }

    mapping(address => Stake[]) public userStakes;
    mapping(uint256 => uint256) public totalStakedPerToken;
    mapping(uint256 => uint256) public royaltyPool;
    mapping(uint256 => uint256) public totalRoyaltiesDistributed;

    event Staked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event Unstaked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event RoyaltyDistributed(uint256 indexed tokenId, uint256 amount);
    event RoyaltiesClaimed(address indexed user, uint256 indexed tokenId, uint256 amount);

    constructor(address _nftAddress) Ownable(msg.sender) {
        nftContract = RoyaltyNFT(_nftAddress);
    }

    function stake(uint256 tokenId, uint256 amount) external nonReentrant {
        require(nftContract.balanceOf(msg.sender, tokenId) >= amount, "Insufficient NFT balance");
        require(amount > 0, "Cannot stake 0 tokens");

        nftContract.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        userStakes[msg.sender].push(Stake({
            tokenId: tokenId,
            amount: amount,
            stakeTimestamp: block.timestamp,
            lastClaimTimestamp: block.timestamp
        }));

        totalStakedPerToken[tokenId] += amount; // Fixed: changed from ++ to += amount
        emit Staked(msg.sender, tokenId, amount);
    }

    function unstake(uint256 stakeIndex) external nonReentrant {
        require(stakeIndex < userStakes[msg.sender].length, "Invalid stake index");

        Stake memory userStake = userStakes[msg.sender][stakeIndex];
        uint256 tokenId = userStake.tokenId;
        uint256 amount = userStake.amount;

        _claimRoyaltiesForStake(stakeIndex);

        // Remove stake from array
        userStakes[msg.sender][stakeIndex] = userStakes[msg.sender][userStakes[msg.sender].length - 1];
        userStakes[msg.sender].pop();

        nftContract.safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
        totalStakedPerToken[tokenId] -= amount; // Fixed: changed from -- to -= amount

        emit Unstaked(msg.sender, tokenId, amount);
    }

    function distributeRoyalties(uint256 tokenId) external payable onlyOwner {
        require(msg.value > 0, "No royalties to distribute");
        require(totalStakedPerToken[tokenId] > 0, "No stakes for this token");

        royaltyPool[tokenId] += msg.value; // Fixed: changed from .add() to +=
        totalRoyaltiesDistributed[tokenId] += msg.value; // Fixed: changed from .add() to +=

        emit RoyaltyDistributed(tokenId, msg.value);
    }

    function claimRoyalties(uint256 stakeIndex) external nonReentrant {
        _claimRoyaltiesForStake(stakeIndex);
    }

    function _claimRoyaltiesForStake(uint256 stakeIndex) internal {
        require(stakeIndex < userStakes[msg.sender].length, "Invalid stake index");

        Stake storage userStake = userStakes[msg.sender][stakeIndex];
        uint256 tokenId = userStake.tokenId;

        if (totalStakedPerToken[tokenId] == 0 || royaltyPool[tokenId] == 0) {
            return;
        }

        uint256 userShare = (userStake.amount * royaltyPool[tokenId]) / totalStakedPerToken[tokenId]; // Fixed: changed from .mul().div() to * /

        if (userShare > 0) {
            royaltyPool[tokenId] -= userShare; // Fixed: changed from .sub() to -=
            userStake.lastClaimTimestamp = block.timestamp;

            payable(msg.sender).transfer(userShare);
            emit RoyaltiesClaimed(msg.sender, tokenId, userShare);
        }
    }

    function getUserStakeCount(address user) external view returns (uint256) {
        return userStakes[user].length;
    }

    function getUserStake(address user, uint256 index) external view returns (Stake memory) {
        require(index < userStakes[user].length, "Invalid stake index");
        return userStakes[user][index];
    }
}