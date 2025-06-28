import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css'; // Tailwind CSS and global styles

import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { connectWallet as connectWalletUtil, disconnectWalletProvider } from '../utils/wallet-utils';
import { ethers } from 'ethers';

interface WalletState {
  address: string | null;
  provider: ethers.providers.Web3Provider | null;
  isConnected: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

export const WalletContext = createContext<WalletState | undefined>(undefined);

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // To manage connection loading state
  const isConnected = !!address && !!provider;

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      console.log('Wallet disconnected or locked.');
      setAddress(null);
      setProvider(null);
      // Optionally, notify user or redirect
    } else {
      console.log('Account changed to:', accounts[0]);
      setAddress(accounts[0]);
      // Re-initialize provider if necessary, or assume it's the same
    }
  }, []);

  const handleChainChanged = useCallback((chainId: string) => {
    console.log('Network changed to:', chainId);
    // It's often best to reload the app to ensure all state is fresh and contracts are re-fetched for the new network
    window.location.reload();
  }, []);


  useEffect(() => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      // @ts-ignore
      window.ethereum.on('chainChanged', handleChainChanged);

      // Check if already connected (e.g., on page refresh)
      // This part is tricky and can be handled in various ways.
      // For simplicity, we'll require explicit connect on each app load for now,
      // but a real dApp would try to re-establish session if wallet was previously connected.
    }

    return () => {
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        // @ts-ignore
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged]);


  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const connection = await connectWalletUtil();
      if (connection) {
        setAddress(connection.address);
        setProvider(connection.provider);
      } else {
        // Connection failed or was rejected by user, wallet-utils handles alerts.
        setAddress(null);
        setProvider(null);
      }
    } catch (error) {
      console.error("Error in connectWallet context:", error);
      setAddress(null);
      setProvider(null);
      // alert("An unexpected error occurred while connecting the wallet.");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsLoading(true); // Optional: show loading state during disconnection cleanup
    disconnectWalletProvider(); // This function currently just logs.
    setAddress(null);
    setProvider(null);
    console.log("Wallet context state cleared.");
    setIsLoading(false);
    // No need to reload page here unless strictly necessary for some cleanup.
    // User will need to manually disconnect from MetaMask extension.
  };

  return (
    <WalletContext.Provider value={{ address, provider, isConnected, isLoading, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Royalty Music Platform</title>
        <meta name="description" content="Decentralized music royalty platform" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <WalletProvider>
        <div className="flex flex-col min-h-screen bg-primary-dark-blue-gray text-secondary-white">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </WalletProvider>
    </>
  );
}

export default MyApp;
