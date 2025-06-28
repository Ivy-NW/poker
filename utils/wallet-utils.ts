// utils/wallet-utils.ts
import { ethers } from 'ethers';

// This is a simplified placeholder. A real implementation would use libraries
// like Web3Modal, @web3-react, or specific SDKs like Core Wallet SDK.

interface ConnectInfo {
  chainId: string;
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

// Check if MetaMask or a compatible provider is available
const getEthereumProvider = (): ethers.providers.Web3Provider | null => {
  // @ts-ignore
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // @ts-ignore
    return new ethers.providers.Web3Provider(window.ethereum, 'any'); // "any" allows network changes
  }
  return null;
};

export const connectWallet = async (): Promise<{ address: string; provider: ethers.providers.Web3Provider } | null> => {
  const provider = getEthereumProvider();
  if (!provider) {
    alert('Please install a Web3 wallet like MetaMask or use a Core-enabled browser.');
    // Or, trigger a UI element to guide users for Core Wallet SDK if that's the primary target.
    console.warn('No Ethereum provider found. Consider Core Wallet SDK integration.');
    return null;
  }

  try {
    // Request account access
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Listen for network changes
    // @ts-ignore
    window.ethereum.on('chainChanged', (chainId: string) => {
      console.log('Network changed to:', chainId);
      // Typically, you'd want to reload the app or re-verify contract compatibility
      window.location.reload();
    });

    // Listen for account changes
    // @ts-ignore
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      console.log('Accounts changed:', accounts);
      if (accounts.length === 0) {
        // MetaMask is locked or the user has disconnected all accounts
        console.log('All accounts disconnected.');
        // Handle disconnection state in your app
      } else {
        // Typically, you'd update the connected account
        // This might involve a page reload or state update in your context
        window.location.reload(); // Simplest way to reflect change for now
      }
    });

    console.log("Wallet connected:", address);
    return { address, provider };

  } catch (error) {
    const e = error as ProviderRpcError;
    console.error("Failed to connect wallet:", e);
    if (e.code === 4001) { // User rejected the request
      alert('You rejected the connection request. Please connect your wallet to use the platform.');
    } else {
      alert(`Failed to connect wallet: ${e.message}`);
    }
    return null;
  }
};

// In a real Core Wallet SDK integration, you would use its specific methods.
// For example:
// import { Core } from '@avalabs/core-sdk'; // Fictional import
// export const connectCoreWallet = async () => {
//   try {
//     const core = new Core(); // Initialize Core SDK
//     await core.connect();
//     const accounts = await core.getAccounts();
//     if (accounts.length > 0) {
//       return { address: accounts[0], provider: core.getProvider() }; // Adjust based on SDK
//     }
//     return null;
//   } catch (error) {
//     console.error("Core Wallet connection failed:", error);
//     return null;
//   }
// };

// Disconnect function (MetaMask specific - it doesn't truly "disconnect" but applications can clear state)
export const disconnectWalletProvider = () => {
    // For MetaMask, there isn't a programmatic way to force disconnection.
    // The best practice is for the dApp to clear its own state related to the connection.
    // Users must manually disconnect from the MetaMask extension.
    console.log("Wallet state cleared by dApp. User needs to disconnect from wallet extension if desired.");
    // The actual state clearing (e.g., setting address to null) should happen in the WalletContext.
};
