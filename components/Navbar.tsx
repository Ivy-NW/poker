// components/Navbar.tsx
import Link from 'next/link';
import React, { useContext } from 'react';
import { WalletContext } from '../pages/_app'; // Adjust path if context is moved

const Navbar = () => {
  const walletContext = useContext(WalletContext);

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <nav className="bg-slate-900 text-secondary-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-primary-gold hover:text-yellow-300">
            RoyaltyMusic
          </a>
        </Link>
        <div className="space-x-4">
          <Link href="/" legacyBehavior><a className="hover:text-primary-gold transition-colors">Home</a></Link>
          <Link href="/#featured-artists" legacyBehavior><a className="hover:text-primary-gold transition-colors">Artists</a></Link>
          <Link href="/staking" legacyBehavior><a className="hover:text-primary-gold transition-colors">Staking</a></Link>
          <Link href="/dashboard" legacyBehavior><a className="hover:text-primary-gold transition-colors">Dashboard</a></Link>
          <Link href="/about" legacyBehavior><a className="hover:text-primary-gold transition-colors">About</a></Link>
        </div>
        <div>
          {walletContext?.isLoading ? (
            <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
              Loading...
            </button>
          ) : walletContext?.isConnected && walletContext.address ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm bg-slate-700 px-3 py-1 rounded-md">{formatAddress(walletContext.address)}</span>
              <button
                onClick={walletContext.disconnectWallet}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={walletContext?.connectWallet}
              className="bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
