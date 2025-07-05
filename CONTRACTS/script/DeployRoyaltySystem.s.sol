// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "lib/forge-std/src/Script.sol";
import {RoyaltyNFT} from "../src/RoyaltyNFT.sol";
import {RoyaltyStaking} from "../src/RoyaltyStaking.sol";

contract DeployRoyaltySystem is Script {
    RoyaltyNFT public royaltyNFT;
    RoyaltyStaking public royaltyStaking;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy RoyaltyNFT contract first
        console.log("Deploying RoyaltyNFT contract...");
        royaltyNFT = new RoyaltyNFT();
        console.log("RoyaltyNFT deployed at:", address(royaltyNFT));

        // Deploy RoyaltyStaking contract with RoyaltyNFT address
        console.log("Deploying RoyaltyStaking contract...");
        royaltyStaking = new RoyaltyStaking(address(royaltyNFT));
        console.log("RoyaltyStaking deployed at:", address(royaltyStaking));



        console.log("Deployment completed successfully!");
        console.log("RoyaltyNFT Address:", address(royaltyNFT));
        console.log("RoyaltyStaking Address:", address(royaltyStaking));
        console.log("Deployer Address:", msg.sender);

        vm.stopBroadcast();
    }


}