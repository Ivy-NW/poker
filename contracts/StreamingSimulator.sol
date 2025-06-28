// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RoyaltyStaking.sol"; // Assuming RoyaltyStaking.sol is in the same directory

contract StreamingSimulator is Ownable {
    RoyaltyStaking public royaltyStakingContract;

    // Configurable stream-to-royalty conversion rates.
    // e.g., 1000 streams = 0.01 AVAX (or 10^16 wei if AVAX has 18 decimals)
    // To store 0.01, we can store 1 and divisor 100, or store 10^16 and divisor 10^18
    // Let's store the amount of wei per stream.
    // If 1000 streams = 0.01 AVAX (10^16 wei), then 1 stream = 10^13 wei.
    uint256 public weiPerStream;

    // Event for when the conversion rate is updated
    event ConversionRateUpdated(uint256 newWeiPerStream);
    // Event for when streams are simulated and royalties sent
    event StreamsSimulated(uint256 indexed tokenId, uint256 streams, uint256 royaltyAmountSent);

    constructor(address _royaltyStakingAddress, uint256 _initialWeiPerStream) {
        royaltyStakingContract = RoyaltyStaking(_royaltyStakingAddress);
        weiPerStream = _initialWeiPerStream; // e.g., 10**13 for 0.00001 AVAX per stream
        emit ConversionRateUpdated(_initialWeiPerStream);
    }

    // Function to update the stream-to-royalty conversion rate (only owner)
    function setConversionRate(uint256 _newWeiPerStream) public onlyOwner {
        weiPerStream = _newWeiPerStream;
        emit ConversionRateUpdated(_newWeiPerStream);
    }

    // Generates test streaming data.
    // Converts streams to royalty amounts.
    // Distributes royalties to the staking contract.
    function simulateStreamsAndDistribute(uint256 tokenId, uint256 numberOfStreams) public payable onlyOwner {
        require(numberOfStreams > 0, "Number of streams must be positive");

        uint256 royaltyAmount = numberOfStreams * weiPerStream;
        require(royaltyAmount > 0, "Royalty amount must be positive");
        require(msg.value >= royaltyAmount, "Not enough AVAX sent to cover royalties");

        // Transfer the royalty amount to the RoyaltyStaking contract
        // The RoyaltyStaking contract's distributeRoyalties function is payable and expects AVAX.
        royaltyStakingContract.distributeRoyalties{value: royaltyAmount}(tokenId, royaltyAmount);

        emit StreamsSimulated(tokenId, numberOfStreams, royaltyAmount);

        // If more AVAX was sent than needed, refund the difference
        if (msg.value > royaltyAmount) {
            payable(owner()).transfer(msg.value - royaltyAmount);
        }
    }

    // Fallback function to allow the contract to receive AVAX (e.g., for funding simulations)
    receive() external payable {}

    // Function to withdraw any AVAX accidentally sent to this contract (apart from simulation funding)
    function withdrawAVAX(address payable to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot send to zero address");
        require(address(this).balance >= amount, "Insufficient balance");
        to.transfer(amount);
    }

    // Function to check the contract's AVAX balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
