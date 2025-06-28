// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './assets/styles/global.css'; // Global styles
// import './assets/styles/themes/darkTheme.css'; // Example: import dark theme if default

// Import Components
import ArtistDashboard from './components/ArtistDashboard';
import InvestorDashboard from './components/InvestorDashboard';
import NFTMinting from './components/NFTMinting';
import StakingDashboard from './components/StakingDashboard';
import RoyaltyDistribution from './components/RoyaltyDistribution';
import Analytics from './components/Analytics';

// Import Services
import { connectWallet, disconnectWallet, getSignerAddress } from './services/blockchainService';
// import { getFromLocalStorage, setInLocalStorage } from './utils/helpers';
// import { LOCAL_STORAGE_THEME_KEY } from './utils/constants';

function App() {
  const [currentView, setCurrentView] = useState('artist'); // 'artist', 'investor', 'analytics'
  const [walletAddress, setWalletAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [theme, setTheme] = useState(getFromLocalStorage(LOCAL_STORAGE_THEME_KEY, 'dark'));

  // useEffect(() => {
  //   // Apply theme to body or root element
  //   document.documentElement.setAttribute('data-theme', theme);
  //   setInLocalStorage(LOCAL_STORAGE_THEME_KEY, theme);
  // }, [theme]);

  // const toggleTheme = () => {
  //   setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  // };

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      const connection = await connectWallet();
      if (connection.success) {
        setWalletAddress(connection.signerAddress);
      } else {
        alert(`Wallet connection failed: ${connection.error}`);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to connect wallet.");
    }
    setIsLoading(false);
  };

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
    setWalletAddress(null);
  };

  // Attempt to reconnect wallet if already connected (e.g., on page refresh)
  useEffect(() => {
    const checkConnection = async () => {
      // This is a simplified check. A more robust solution might involve checking
      // localStorage for a "previously connected" flag or using Web3Modal's cache.
      if (window.ethereum && window.ethereum.selectedAddress) {
         handleConnectWallet();
      }
    };
    checkConnection();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Stake-to-Earn Music Platform</h1>
        <nav>
          <button onClick={() => setCurrentView('artist')} disabled={currentView === 'artist'}>Artist Hub</button>
          <button onClick={() => setCurrentView('investor')} disabled={currentView === 'investor'}>Investor Hub</button>
          <button onClick={() => setCurrentView('analytics')} disabled={currentView === 'analytics'}>Platform Analytics</button>
          {/* <button onClick={toggleTheme}>Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'})</button> */}
        </nav>
        <div className="wallet-connector">
          {walletAddress ? (
            <>
              <p>Connected: {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</p>
              <button onClick={handleDisconnectWallet}>Disconnect Wallet</button>
            </>
          ) : (
            <button onClick={handleConnectWallet} disabled={isLoading}>
              {isLoading ? 'Connecting...' : 'Connect Core Wallet'}
            </button>
          )}
        </div>
      </header>

      <main>
        {!walletAddress && <p className="connect-prompt">Please connect your wallet to use the platform features.</p>}

        {walletAddress && currentView === 'artist' && (
          <>
            <ArtistDashboard />
            <NFTMinting /> {/* Artist can mint NFTs */}
          </>
        )}
        {walletAddress && currentView === 'investor' && (
          <>
            <InvestorDashboard />
            <StakingDashboard /> {/* Investor can stake/unstake/claim */}
            <RoyaltyDistribution /> {/* Investor can see distributions */}
          </>
        )}
        {walletAddress && currentView === 'analytics' && (
          <Analytics />
        )}

        {/* Components below could be part of specific dashboards or global */}
        {/* <RoyaltyDistribution /> */}
        {/* <Analytics /> */}
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Stake-to-Earn Music Inc. All Rights Reserved.</p>
        {/* Add links to terms, privacy policy, etc. */}
      </footer>
    </div>
  );
}

export default App;
