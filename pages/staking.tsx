// pages/staking.tsx
import Head from 'next/head';
import React, { useState, useContext, useEffect } from 'react';
import StakingForm from '../components/StakingForm';
import Modal from '../components/Modal'; // Import Modal component
import { WalletContext } from './_app'; // Adjust path as needed
import { stakeNFT as stakeNftUtil, claimRoyalties as claimRoyaltiesUtil, getClaimableRoyalties } from '../utils/contract-interactions'; // Placeholder
import { ethers } from 'ethers';

// Dummy data structures
interface StakedAsset {
  id: string;
  nftName: string;
  stakedAmount: number;
  earnedRoyalties: number;
  nftImageUrl?: string;
}

interface OwnedDeviceNFT {
  id: string;
  name: string;
  balance: number;
}

// Mock function to fetch user's staked assets
const fetchStakedAssets = async (userAddress: string | null, provider: ethers.providers.Provider | null): Promise<StakedAsset[]> => {
  if (!userAddress || !provider) return [];
  // In a real app, you'd call a contract read function here using the provider
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: 'stake001', nftName: 'Genesis Sparkle Drop - Staked', stakedAmount: 50, earnedRoyalties: 1.2534, nftImageUrl: '/images/placeholder.jpg' },
    { id: 'stake002', nftName: 'Anthem X Royalty Share - Staked', stakedAmount: 20, earnedRoyalties: 3.5000, nftImageUrl: '/images/placeholder.jpg' },
  ];
};

// Mock function to fetch user's own NFTs available for staking
const fetchOwnedNftsForStaking = async (userAddress: string | null, provider: ethers.providers.Provider | null): Promise<OwnedDeviceNFT[]> => {
    if (!userAddress || !provider) return [];
    // In a real app, you'd call a contract read function here
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
        { id: 'nft003', name: 'Funky Times Vol. 1 Share (Owned)', balance: 10 },
        { id: 'nft004', name: 'Neon Dreams EP Share (Owned)', balance: 5 },
    ];
};

// Placeholder contract addresses - replace with actual deployed addresses
const STAKING_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ROYALTY_STAKING_ADDRESS || "0xStakingContractAddress";


export default function StakingPage() {
  const walletContext = useContext(WalletContext);
  const [stakedAssets, setStakedAssets] = useState<StakedAsset[]>([]);
  const [ownedNfts, setOwnedNfts] = useState<OwnedDeviceNFT[]>([]);
  const [loadingStaked, setLoadingStaked] = useState(true);
  const [loadingOwned, setLoadingOwned] = useState(true);
  const [claimableRoyalties, setClaimableRoyalties] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);


  const refreshClaimableRoyalties = async () => {
    if (walletContext?.isConnected && walletContext.address && walletContext.provider) {
        try {
            const amount = await getClaimableRoyalties(walletContext.provider, STAKING_CONTRACT_ADDRESS, walletContext.address);
            setClaimableRoyalties(amount);
        } catch (error) {
            console.error("Failed to fetch claimable royalties:", error);
            // setModalTitle("Error");
            // setModalContent(<p>Could not fetch your claimable royalties. Please try again later.</p>);
            // setIsModalOpen(true);
        }
    }
  };


  useEffect(() => {
    if (walletContext?.isConnected && walletContext.address && walletContext.provider) {
      setLoadingStaked(true);
      fetchStakedAssets(walletContext.address, walletContext.provider).then(data => {
        setStakedAssets(data);
        setLoadingStaked(false);
      });

      setLoadingOwned(true);
      fetchOwnedNftsForStaking(walletContext.address, walletContext.provider).then(data => {
        setOwnedNfts(data);
        setLoadingOwned(false);
      });
      refreshClaimableRoyalties();
    } else {
      setStakedAssets([]);
      setOwnedNfts([]);
      setClaimableRoyalties(ethers.BigNumber.from(0));
      setLoadingStaked(false);
      setLoadingOwned(false);
    }
  }, [walletContext?.isConnected, walletContext?.address, walletContext?.provider]);

  const handleAttemptStake = (nftId: string, amount: number) => {
    if (!walletContext?.isConnected || !walletContext.provider) {
      setModalTitle("Wallet Not Connected");
      setModalContent(<p>Please connect your wallet to stake NFTs.</p>);
      setOnConfirmAction(null); // No confirm action, just info
      setIsModalOpen(true);
      return;
    }
    const selectedNft = ownedNfts.find(n => n.id === nftId);
    if (!selectedNft) {
        setModalTitle("Error");
        setModalContent(<p>Selected NFT not found.</p>);
        setIsModalOpen(true);
        return;
    }

    setModalTitle("Confirm Stake");
    setModalContent(
      <div>
        <p>Are you sure you want to stake {amount} share(s) of "{selectedNft.name}"?</p>
        <p className="text-sm text-gray-400 mt-2">This will require a transaction confirmation from your wallet.</p>
      </div>
    );
    setOnConfirmAction(() => () => executeStake(nftId, amount));
    setIsModalOpen(true);
  };

  const executeStake = async (nftId: string, amount: number) => {
    setIsModalOpen(false); // Close confirmation modal
    if (!walletContext?.isConnected || !walletContext.provider) {
        // This should ideally be caught by handleAttemptStake, but as a safeguard:
        setModalTitle("Error");
        setModalContent("Wallet disconnected before action could be completed.");
        setIsModalOpen(true);
        return;
    }

    const signer = walletContext.provider.getSigner();
    setModalTitle("Staking in Progress...");
    setModalContent("Please confirm the transaction in your wallet. Do not close this window.");
    setIsModalOpen(true); // Show processing modal

    try {
      const tx = await stakeNftUtil(signer, STAKING_CONTRACT_ADDRESS, nftId, amount);
      console.log('Staking transaction simulated:', tx);
      setModalTitle("Staking Successful!");
      setModalContent(
        <div>
            <p>You have successfully staked {amount} shares of NFT {nftId}.</p>
            <p className="text-sm text-gray-400 mt-1">Transaction Hash (Simulated): {tx.hash}</p>
            <p className="text-sm text-gray-400">It may take a few moments for the changes to reflect.</p>
        </div>
      );
      // TODO: Refresh staked assets and owned NFTs after successful staking
      // For now, just close after a delay or let user close.
      // setTimeout(() => setIsModalOpen(false), 5000);
    } catch (error: any) {
      console.error('Staking failed:', error);
      setModalTitle("Staking Failed");
      setModalContent(<p>Error: {error.message || "An unexpected error occurred during staking."}</p>);
    }
    // Keep modal open to show result (success/failure), user can close it.
    setOnConfirmAction(null); // Clear confirm action after execution
  };


  const handleClaimRoyalties = async () => {
    if (!walletContext?.isConnected || !walletContext.provider) {
      setModalTitle("Wallet Not Connected");
      setModalContent("Please connect your wallet to claim royalties.");
      setIsModalOpen(true);
      return;
    }
    if (claimableRoyalties.isZero()) {
        setModalTitle("No Royalties");
        setModalContent("You have no royalties to claim at this moment.");
        setIsModalOpen(true);
        return;
    }

    setModalTitle("Confirm Claim Royalties");
    setModalContent(
        <div>
            <p>Are you sure you want to claim {ethers.utils.formatEther(claimableRoyalties)} AVAX in royalties?</p>
            <p className="text-sm text-gray-400 mt-2">This will require a transaction confirmation.</p>
        </div>
    );
    setOnConfirmAction(() => () => executeClaimRoyalties());
    setIsModalOpen(true);
  };

  const executeClaimRoyalties = async () => {
    setIsModalOpen(false);
     if (!walletContext?.isConnected || !walletContext.provider) {
        setModalTitle("Error");
        setModalContent("Wallet disconnected before action could be completed.");
        setIsModalOpen(true);
        return;
    }
    const signer = walletContext.provider.getSigner();
    setModalTitle("Claiming Royalties...");
    setModalContent("Please confirm the transaction in your wallet.");
    setIsModalOpen(true);

    try {
        const tx = await claimRoyaltiesUtil(signer, STAKING_CONTRACT_ADDRESS);
        console.log('Claim royalties transaction simulated:', tx);
        setModalTitle("Royalties Claimed!");
        setModalContent(
             <div>
                <p>Successfully claimed your royalties.</p>
                <p className="text-sm text-gray-400 mt-1">Tx Hash (Simulated): {tx.hash}</p>
            </div>
        );
        refreshClaimableRoyalties(); // Refresh claimable amount
        // Also refresh staked assets if individual earnings are shown there
        fetchStakedAssets(walletContext.address, walletContext.provider).then(data => setStakedAssets(data));

    } catch (error: any) {
        console.error('Claiming royalties failed:', error);
        setModalTitle("Claim Failed");
        setModalContent(<p>Error: {error.message || "Could not claim royalties."}</p>);
    }
    setOnConfirmAction(null);
  }

  const stakingFormNftOptions = ownedNfts.map(nft => ({ id: nft.id, name: `${nft.name} (Balance: ${nft.balance})` }));

  return (
    <>
      <Head>
        <title>Staking | Royalty Music Platform</title>
        <meta name="description" content="Stake your music royalty NFTs and earn rewards." />
      </Head>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
            setIsModalOpen(false);
            // If there was a confirm action and it wasn't triggered, clear it
            if (onConfirmAction) setOnConfirmAction(null);
        }}
        title={modalTitle}
      >
        <div>{modalContent}</div>
        {onConfirmAction && (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setOnConfirmAction(null);
              }}
              className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (onConfirmAction) {
                    const actionToExecute = onConfirmAction; // Capture it
                    setOnConfirmAction(null); // Clear before executing to prevent re-trigger if modal stays open
                    actionToExecute(); // Execute the stored function
                }
              }}
              className="bg-secondary-light-blue hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            >
              Confirm
            </button>
          </div>
        )}
      </Modal>


      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary-gold mb-8 text-center">NFT Staking</h1>

        {!walletContext?.isConnected ? (
          <div className="text-center bg-slate-800 p-8 rounded-lg shadow-xl">
            <p className="text-xl text-secondary-white mb-4">Please connect your wallet to view your staked assets and participate in staking.</p>
            <button
                onClick={() => walletContext?.connectWallet()}
                className="bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
            >
                Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-secondary-light-blue mb-6">Stake Your NFTs</h2>
              {loadingOwned ? <p>Loading your NFTs...</p> :
                <StakingForm
                    availableNfts={stakingFormNftOptions}
                    onStake={handleAttemptStake} // Changed to handleAttemptStake
                />
              }
               <p className="text-sm text-gray-400 mt-4">
                Select one of your owned NFTs and the amount of shares you wish to stake. Staked NFTs will start earning royalties based on their performance.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-secondary-light-blue mb-6">Your Staked Assets</h2>
              {loadingStaked ? <p>Loading your staked assets...</p> : stakedAssets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stakedAssets.map(asset => (
                    <div key={asset.id} className="bg-slate-800 p-6 rounded-lg shadow-xl">
                      {asset.nftImageUrl && <img src={asset.nftImageUrl} alt={asset.nftName} className="w-full h-40 object-cover rounded-md mb-4" />}
                      <h3 className="text-xl font-semibold text-primary-gold mb-2">{asset.nftName}</h3>
                      <p className="text-secondary-white">Staked Amount: <span className="font-bold">{asset.stakedAmount} shares</span></p>
                      <p className="text-secondary-white">Earned Royalties: <span className="font-bold text-green-400">{asset.earnedRoyalties.toFixed(4)} AVAX</span></p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-secondary-white bg-slate-800 p-6 rounded-lg">You have no NFTs currently staked.</p>
              )}
            </section>

            <section className="bg-slate-800 p-8 rounded-lg shadow-xl text-center">
              <h2 className="text-2xl font-semibold text-secondary-light-blue mb-4">Claim Your Royalties</h2>
              <p className="text-4xl font-bold text-primary-gold mb-1">{ethers.utils.formatEther(claimableRoyalties)} AVAX</p>
              <p className="text-secondary-white mb-6">Total earned royalties available to claim.</p>
              <button
                onClick={handleClaimRoyalties} // Changed to handleClaimRoyalties which will open modal
                disabled={claimableRoyalties.isZero() || loadingStaked || (walletContext && walletContext.isLoading)}
                className="bg-primary-gold hover:bg-yellow-500 text-primary-dark-blue-gray font-bold py-3 px-8 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStaked ? 'Loading...' : 'Claim All Royalties'}
              </button>
            </section>
          </>
        )}
      </div>
    </>
  );
}
