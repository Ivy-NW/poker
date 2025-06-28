// frontend/src/utils/constants.js

// Network Configuration - Using Fuji Testnet as default for development
export const DEFAULT_CHAIN_ID = '0xa869'; // Avalanche Fuji C-Chain Chain ID (43113 in decimal)
export const DEFAULT_NETWORK_NAME = 'Avalanche Fuji Testnet';
export const DEFAULT_RPC_URL = 'https://api.avax-test.network/ext/bc/C/rpc';
export const DEFAULT_EXPLORER_URL = 'https://testnet.snowtrace.io/';

export const MAINNET_CHAIN_ID = '0xa86a'; // Avalanche Mainnet C-Chain ID (43114 in decimal)
export const MAINNET_NETWORK_NAME = 'Avalanche Mainnet';
export const MAINNET_RPC_URL = 'https://api.avax.network/ext/bc/C/rpc';
export const MAINNET_EXPLORER_URL = 'https://snowtrace.io/';

// Smart Contract Addresses (to be filled in after deployment)
// These should ideally be stored in environment variables for different environments (dev, staging, prod)
export const ROYALTY_NFT_CONTRACT_ADDRESS = process.env.REACT_APP_ROYALTY_NFT_CONTRACT_ADDRESS || 'YOUR_ROYALTY_NFT_CONTRACT_ADDRESS_HERE';
export const ROYALTY_STAKING_CONTRACT_ADDRESS = process.env.REACT_APP_ROYALTY_STAKING_CONTRACT_ADDRESS || 'YOUR_ROYALTY_STAKING_CONTRACT_ADDRESS_HERE';
export const STREAMING_SIMULATOR_CONTRACT_ADDRESS = process.env.REACT_APP_STREAMING_SIMULATOR_CONTRACT_ADDRESS || 'YOUR_STREAMING_SIMULATOR_CONTRACT_ADDRESS_HERE';
export const TREASURY_MANAGEMENT_CONTRACT_ADDRESS = process.env.REACT_APP_TREASURY_MANAGEMENT_CONTRACT_ADDRESS || 'YOUR_TREASURY_CONTRACT_ADDRESS_HERE';

// Artist Rating System
export const MIN_ARTIST_RATING = 2.5; // As per spec 2.5
export const MAX_ARTIST_RATING = 5.0; // As per spec 5.0
// For smart contract storage, if scaling (e.g., 25 for 2.5, 50 for 5.0)
export const RATING_SCALE_FACTOR = 10;

// UI Constants
export const DEFAULT_PAGE_SIZE = 10; // For pagination
export const MODAL_TRANSITION_DURATION = 300; // ms

// Local Storage Keys
export const LOCAL_STORAGE_THEME_KEY = 'stakeToEarnMusic_theme';
export const LOCAL_STORAGE_WALLET_KEY = 'stakeToEarnMusic_walletPreference';

// API Endpoints (if your backend services are hosted elsewhere or namespaced)
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api'; // Example for Vercel functions

// External Links
export const CORE_WALLET_URL = 'https://core.app/';
export const AVALANCHE_PROJECT_URL = 'https://www.avax.network/';
export const OPENSEA_TESTNETS_URL = 'https://testnets.opensea.io/assets/avalanche-fuji'; // For viewing NFTs on Fuji

// Default values for forms or simulations
export const DEFAULT_STREAM_TO_ROYALTY_RATE = 0.00001; // e.g., 0.00001 AVAX per stream (adjust as needed)
                                                      // This corresponds to 10^13 wei per stream if AVAX has 18 decimals
                                                      // (0.01 AVAX per 1000 streams)

// TanStack Query keys (examples, expand as needed)
export const QUERY_KEYS = {
  USER_PROFILE: 'userProfile',
  ARTIST_NFTS: 'artistNfts',
  INVESTOR_PORTFOLIO: 'investorPortfolio',
  PLATFORM_ANALYTICS: 'platformAnalytics',
  ARTIST_DETAILS: 'artistDetails', // e.g., artistDetails_artistId
  NFT_DETAILS: 'nftDetails', // e.g., nftDetails_tokenId
  USER_STAKES: 'userStakes',
  PENDING_ROYALTIES: 'pendingRoyalties',
};

// Important Note:
// Ensure that .env files are properly configured for environment-specific variables,
// especially contract addresses and API keys.
// Example .env.development:
// REACT_APP_ROYALTY_NFT_CONTRACT_ADDRESS=0xYourDevNFTAddress
// REACT_APP_ROYALTY_STAKING_CONTRACT_ADDRESS=0xYourDevStakingAddress
// REACT_APP_STREAMING_SIMULATOR_CONTRACT_ADDRESS=0xYourDevSimulatorAddress
// REACT_APP_TREASURY_MANAGEMENT_CONTRACT_ADDRESS=0xYourDevTreasuryAddress
// REACT_APP_VIBERATE_API_KEY=your_viberate_api_key_if_used

// Example .env.production:
// REACT_APP_ROYALTY_NFT_CONTRACT_ADDRESS=0xYourProdNFTAddress
// ... and so on.

// Make sure .env files are added to .gitignore to prevent committing sensitive keys.
// Only commit .env.example or similar template files.
