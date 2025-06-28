// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TreasuryManagement is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    // Mapping for diversified pools across different artist risk categories
    // Risk category could be represented by uint (e.g., 1 for low, 2 for medium, 3 for high)
    mapping(uint256 => uint256) public liquidityPools; // riskCategory => amount

    // Total funds held in the treasury for operational sustainability and liquidity
    uint256 public totalOperationalFunds;

    // Events
    event FundsAddedToPool(uint256 indexed riskCategory, uint256 amount);
    event FundsRemovedFromPool(uint256 indexed riskCategory, uint256 amount, address indexed recipient);
    event OperationalFundsAdded(uint256 amount);
    event OperationalFundsWithdrawn(uint256 amount, address indexed recipient);
    event FundsAllocatedForArtistActivity(uint256 indexed artistId, uint256 amount, string purpose);


    constructor() {
        // Initialize with a small amount of operational funds if needed, or can be funded later
        totalOperationalFunds = 0;
    }

    // Function to add funds to a specific risk category pool
    // Automated liquidity provision for quick payouts.
    function addFundsToLiquidityPool(uint256 riskCategory) public payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than zero");
        liquidityPools[riskCategory] = liquidityPools[riskCategory].add(msg.value);
        emit FundsAddedToPool(riskCategory, msg.value);
    }

    // Function to add funds to the general operational fund
    function addOperationalFunds() public payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than zero");
        totalOperationalFunds = totalOperationalFunds.add(msg.value);
        emit OperationalFundsAdded(msg.value);
    }

    // Function for the owner to withdraw funds from a specific liquidity pool
    // This might be used to rebalance pools or for payouts if direct contract interaction is needed
    function withdrawFromLiquidityPool(uint256 riskCategory, uint256 amount, address payable recipient) public onlyOwner nonReentrant {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");
        require(liquidityPools[riskCategory] >= amount, "Insufficient funds in the pool");

        liquidityPools[riskCategory] = liquidityPools[riskCategory].sub(amount);
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsRemovedFromPool(riskCategory, amount, recipient);
    }

    // Function for the owner to withdraw operational funds
    function withdrawOperationalFunds(uint256 amount, address payable recipient) public onlyOwner nonReentrant {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");
        require(totalOperationalFunds >= amount, "Insufficient operational funds");

        totalOperationalFunds = totalOperationalFunds.sub(amount);
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");

        emit OperationalFundsWithdrawn(amount, recipient);
    }

    // Allocates funds for artist-specific activities like concerts.
    function allocateForArtistActivity(uint256 artistId, uint256 amount, string memory purpose, address payable artistWallet) public onlyOwner nonReentrant {
        require(artistWallet != address(0), "Invalid artist wallet address");
        require(amount > 0, "Amount must be greater than zero");
        // Assuming operational funds are used for this, or a specific 'artist activity fund'
        require(totalOperationalFunds >= amount, "Insufficient operational funds for artist activity");

        totalOperationalFunds = totalOperationalFunds.sub(amount);
        (bool success, ) = artistWallet.call{value: amount}("");
        require(success, "Transfer to artist wallet failed");

        emit FundsAllocatedForArtistActivity(artistId, amount, purpose);
    }


    // View function to get the balance of a specific liquidity pool
    function getLiquidityPoolBalance(uint256 riskCategory) public view returns (uint256) {
        return liquidityPools[riskCategory];
    }

    // View function to get the total operational funds
    function getTotalOperationalFunds() public view returns (uint256) {
        return totalOperationalFunds;
    }

    // View function to get the total balance of the contract
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Fallback function to receive Ether
    receive() external payable {
        // By default, funds sent directly could go to operational funds
        // Or require a specific function call to allocate them.
        // For simplicity, let's add to operational funds.
        addOperationalFunds();
    }
}
