// frontend/src/services/blockchainService.js
import { ethers } from 'ethers';
// Import ABIs:
// import RoyaltyNFT_ABI from '../utils/contracts/RoyaltyNFT.json';
// import RoyaltyStaking_ABI from '../utils/contracts/RoyaltyStaking.json';
// import StreamingSimulator_ABI from '../utils/contracts/StreamingSimulator.json';

// TODO: Replace with actual contract addresses and network details from deployment
const NFT_CONTRACT_ADDRESS = 'YOUR_ROYALTY_NFT_CONTRACT_ADDRESS';
const STAKING_CONTRACT_ADDRESS = 'YOUR_ROYALTY_STAKING_CONTRACT_ADDRESS';
const SIMULATOR_CONTRACT_ADDRESS = 'YOUR_STREAMING_SIMULATOR_CONTRACT_ADDRESS';

// Will be initialized on wallet connection
let provider;
let signer;
let royaltyNFTContract;
let royaltyStakingContract;
let streamingSimulatorContract;

// Function to initialize ethers and contracts, potentially on wallet connect
export const initBlockchainService = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      // TODO: Uncomment and use actual ABIs once they are populated
      // royaltyNFTContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, RoyaltyNFT_ABI.abi, signer);
      // royaltyStakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, RoyaltyStaking_ABI.abi, signer);
      // streamingSimulatorContract = new ethers.Contract(SIMULATOR_CONTRACT_ADDRESS, StreamingSimulator_ABI.abi, signer);

      console.log("Blockchain service initialized.");
      return { success: true, signerAddress: await signer.getAddress() };
    } catch (error) {
      console.error("Error initializing blockchain service:", error);
      return { success: false, error };
    }
  } else {
    console.error("No Ethereum wallet found. Please install Core Wallet or MetaMask.");
    return { success: false, error: "No wallet found." };
  }
};

// --- RoyaltyNFT Contract Interactions ---

export const mintNFT = async (to, id, amount, initialRating, metadataURI) => {
  if (!royaltyNFTContract) throw new Error("RoyaltyNFT Contract not initialized.");
  // The `data` parameter in ERC1155 mint can be empty if not used
  const data = ethers.utils.toUtf8Bytes("");
  // Scale rating: e.g., 3.5 to 35
  const scaledRating = Math.round(parseFloat(initialRating) * 10);

  try {
    const tx = await royaltyNFTContract.mintNFT(to, id, amount, scaledRating, metadataURI, data);
    await tx.wait();
    console.log("NFT Minted:", tx);
    return tx;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};

export const getArtistRating = async (tokenId) => {
  if (!royaltyNFTContract) throw new Error("RoyaltyNFT Contract not initialized.");
  try {
    const rating = await royaltyNFTContract.getArtistRating(tokenId);
    return parseFloat(rating.toString()) / 10; // Scale back: e.g., 35 to 3.5
  } catch (error) {
    console.error("Error getting artist rating:", error);
    throw error;
  }
};

// --- RoyaltyStaking Contract Interactions ---

export const stakeTokens = async (tokenId, amount) => {
  if (!royaltyStakingContract) throw new Error("RoyaltyStaking Contract not initialized.");
  try {
    const tx = await royaltyStakingContract.stake(tokenId, ethers.utils.parseUnits(amount.toString(), 0)); // Assuming amount is integer
    await tx.wait();
    console.log("Tokens Staked:", tx);
    return tx;
  } catch (error) {
    console.error("Error staking tokens:", error);
    throw error;
  }
};

export const unstakeTokens = async (tokenId, amount) => {
  if (!royaltyStakingContract) throw new Error("RoyaltyStaking Contract not initialized.");
  try {
    const tx = await royaltyStakingContract.unstake(tokenId, ethers.utils.parseUnits(amount.toString(), 0));
    await tx.wait();
    console.log("Tokens Unstaked:", tx);
    return tx;
  } catch (error) {
    console.error("Error unstaking tokens:", error);
    throw error;
  }
};

export const claimRoyalties = async (tokenId) => {
  if (!royaltyStakingContract) throw new Error("RoyaltyStaking Contract not initialized.");
  try {
    const tx = await royaltyStakingContract.claimRoyalties(tokenId);
    await tx.wait();
    console.log("Royalties Claimed:", tx);
    return tx;
  } catch (error) {
    console.error("Error claiming royalties:", error);
    throw error;
  }
};

export const getPendingRoyalties = async (userAddress, tokenId) => {
  if (!royaltyStakingContract) throw new Error("RoyaltyStaking Contract not initialized.");
  try {
    const royalties = await royaltyStakingContract.getPendingRoyalties(userAddress, tokenId);
    return ethers.utils.formatEther(royalties); // Assuming royalties are in Wei
  } catch (error) {
    console.error("Error getting pending royalties:", error);
    throw error;
  }
};


// --- StreamingSimulator Contract Interactions (for admin/testing) ---

export const simulateStreams = async (tokenId, numberOfStreams, avaxAmount) => {
  if (!streamingSimulatorContract) throw new Error("StreamingSimulator Contract not initialized.");
  try {
    const tx = await streamingSimulatorContract.simulateStreamsAndDistribute(
      tokenId,
      numberOfStreams,
      { value: ethers.utils.parseEther(avaxAmount.toString()) } // Send AVAX with the transaction
    );
    await tx.wait();
    console.log("Streams Simulated:", tx);
    return tx;
  } catch (error) {
    console.error("Error simulating streams:", error);
    throw error;
  }
};

export const setStreamingConversionRate = async (weiPerStream) => {
    if (!streamingSimulatorContract) throw new Error("StreamingSimulator Contract not initialized.");
    try {
        const tx = await streamingSimulatorContract.setConversionRate(weiPerStream);
        await tx.wait();
        console.log("Streaming conversion rate updated:", tx);
        return tx;
    } catch (error) {
        console.error("Error setting streaming conversion rate:", error);
        throw error;
    }
};

// Utility to get connected account
export const getSignerAddress = async () => {
    if (!signer) await initBlockchainService(); // Initialize if not already
    if (signer) return await signer.getAddress();
    return null;
};

// Add more functions as needed for interacting with your smart contracts
// e.g., functions to get artist metadata, total staked amounts, etc.

// Placeholder for Core Wallet SDK and Web3Modal integration
export const connectWallet = async () => {
    // TODO: Implement wallet connection logic using Core Wallet SDK / Web3Modal
    // For now, we rely on initBlockchainService which uses window.ethereum
    return await initBlockchainService();
};

export const disconnectWallet = async () => {
    // TODO: Implement wallet disconnection logic
    provider = null;
    signer = null;
    royaltyNFTContract = null;
    royaltyStakingContract = null;
    streamingSimulatorContract = null;
    console.log("Wallet disconnected (simulated).");
};
