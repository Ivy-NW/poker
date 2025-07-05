// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RoyaltyStaking.sol";

contract StreamingSimulator is Ownable {
    RoyaltyStaking public stakingContract;

    struct StreamingData {
        uint256 totalStreams;
        uint256 lastUpdateTimestamp;
        uint256 streamingRate; // Streams per second
    }

    mapping(uint256 => StreamingData) public tokenStreamingData;

    // Conversion rate: streams to AVAX (configurable)
    uint256 public streamsPerAVAX = 100000; // 100,000 streams = 1 AVAX

    event DummyStreamsGenerated(uint256 indexed tokenId, uint256 streamCount, uint256 royaltyAmount);
    event StreamingRateUpdated(uint256 indexed tokenId, uint256 newRate);
    event ConversionRateUpdated(uint256 newRate);

    constructor(address _stakingAddress) {
        stakingContract = RoyaltyStaking(_stakingAddress);
    }

    function generateDummyStreams(uint256 tokenId, uint256 streamCount) external onlyOwner {
        require(streamCount > 0, "Stream count must be positive");

        // Calculate royalty amount based on stream count
        uint256 royaltyAmount = streamCount * 1 ether / streamsPerAVAX;

        // Update streaming data
        tokenStreamingData[tokenId].totalStreams += streamCount;
        tokenStreamingData[tokenId].lastUpdateTimestamp = block.timestamp;

        // Distribute royalties to staking contract
        if (royaltyAmount > 0 && address(this).balance >= royaltyAmount) {
            stakingContract.distributeRoyalties{value: royaltyAmount}(tokenId);
        }

        emit DummyStreamsGenerated(tokenId, streamCount, royaltyAmount);
    }

    function setStreamingRate(uint256 tokenId, uint256 ratePerSecond) external onlyOwner {
        tokenStreamingData[tokenId].streamingRate = ratePerSecond;
        tokenStreamingData[tokenId].lastUpdateTimestamp = block.timestamp;
        emit StreamingRateUpdated(tokenId, ratePerSecond);
    }

    function setConversionRate(uint256 newStreamsPerAVAX) external onlyOwner {
        require(newStreamsPerAVAX > 0, "Conversion rate must be positive");
        streamsPerAVAX = newStreamsPerAVAX;
        emit ConversionRateUpdated(newStreamsPerAVAX);
    }

    function simulateRealTimeStreaming(uint256 tokenId) external onlyOwner {
        StreamingData storage data = tokenStreamingData[tokenId];

        if (data.streamingRate > 0 && data.lastUpdateTimestamp > 0) {
            uint256 timeElapsed = block.timestamp - data.lastUpdateTimestamp;
            uint256 newStreams = timeElapsed * data.streamingRate;

            if (newStreams > 0) {
                generateDummyStreams(tokenId, newStreams);
            }
        }
    }

    // Function to fund the contract for royalty distribution
    function fundContract() external payable onlyOwner {}

    function getStreamingData(uint256 tokenId) external view returns (StreamingData memory) {
        return tokenStreamingData[tokenId];
    }

    // Emergency withdrawal function
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
