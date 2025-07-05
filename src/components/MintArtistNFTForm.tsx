"use client";
import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, isAddress } from 'viem';
import { withAuth } from '../components/withAuth';
import { ROYALTY_NFT_CONTRACT_ADDRESS, ROYALTY_NFT_CONTRACT_ABI } from '../app/ContractABI/RoyaltyNFT';

export function MintArtistNFTForm() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [formData, setFormData] = useState({
    artist: '',
    initialSupply: '',
    tokenURI: '',
    investmentTarget: '',
    name: '',
    description: ''
  });

  const [formError, setFormError] = useState('');

  // Handle form input changes
  // Define the form data interface
  interface FormData {
    artist: string;
    initialSupply: string;
    tokenURI: string;
    investmentTarget: string;
    name: string;
    description: string;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear form error when user starts typing
    if (formError) setFormError('');
  };

  // Validate form data
  const validateForm = () => {
    if (!isAddress(formData.artist)) {
      setFormError('Invalid artist address');
      return false;
    }
    if (!formData.initialSupply || parseInt(formData.initialSupply) <= 0) {
      setFormError('Initial supply must be greater than 0');
      return false;
    }
    if (!formData.tokenURI || !formData.name || !formData.description) {
      setFormError('Please fill in all required fields');
      return false;
    }
    if (!formData.investmentTarget || parseFloat(formData.investmentTarget) <= 0) {
      setFormError('Investment target must be greater than 0');
      return false;
    }
    return true;
  };

  // Mint NFT function
  const mintNFT = async () => {
    if (!validateForm()) return;

    try {
      setFormError('');
      
      writeContract({
        address: ROYALTY_NFT_CONTRACT_ADDRESS,
        abi: ROYALTY_NFT_CONTRACT_ABI,
        functionName: 'mintArtistNFT',
        args: [
          formData.artist as `0x${string}`,
          BigInt(formData.initialSupply),
          formData.tokenURI,
          parseEther(formData.investmentTarget),
          formData.name,
          formData.description
        ],
      });
    } catch (err) {
      if (err instanceof Error) {
        setFormError('Failed to mint NFT: ' + err.message);
      } else {
        setFormError('Failed to mint NFT: ' + String(err));
      }
    }
  };

  // Reset form after successful mint
  React.useEffect(() => {
    if (isSuccess) {
      setFormData({
        artist: '',
        initialSupply: '',
        tokenURI: '',
        investmentTarget: '',
        name: '',
        description: ''
      });
    }
  }, [isSuccess]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-500/30 p-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
            Mint Artist NFT
          </h1>
          <div className="text-center">
            <p className="text-gray-300 mb-6">Please connect your wallet to continue</p>
            <button 
              onClick={() => {}} 
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 font-semibold"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-500/30 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            Mint Artist NFT
          </h1>
        </div>

        <div className="space-y-6">
          {/* Artist Address */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">
              Artist Address *
            </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
              placeholder="0x..."
              className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Artist Name */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">
              Artist Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter artist name"
              className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter artist description"
              rows={3}
              className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Initial Supply */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">
              Initial Supply *
            </label>
            <input
              type="number"
              name="initialSupply"
              value={formData.initialSupply}
              onChange={handleInputChange}
              placeholder="100"
              min="1"
              className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Investment Target */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">
              Investment Target (ETH) *
            </label>
            <input
              type="number"
              name="investmentTarget"
              value={formData.investmentTarget}
              onChange={handleInputChange}
              placeholder="1.0"
              step="0.01"
              min="0"
              className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Token URI */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">
              Token URI *
            </label>
            <input
              type="url"
              name="tokenURI"
              value={formData.tokenURI}
              onChange={handleInputChange}
              placeholder="https://example.com/metadata.json"
              className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Form Error */}
          {formError && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              {formError}
            </div>
          )}

          {/* Contract Error */}
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              Transaction Error: {error.message}
            </div>
          )}

          {/* Success Message */}
          {hash && (
            <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
              <p className="font-semibold">
                {isConfirming ? 'Confirming Transaction...' : 'NFT Minted Successfully!'}
              </p>
              <p className="text-sm">Transaction Hash: https://subnets-test.avax.network/c-chain/tx/{hash}</p>
              {isSuccess && (
                <p className="text-sm font-semibold mt-2">✅ Transaction Confirmed!</p>
              )}
            </div>
          )}

          {/* Mint Button */}
          <button
            onClick={mintNFT}
            disabled={isPending || isConfirming}
            className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
              isPending || isConfirming
                ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                : 'bg-yellow-500 text-black hover:bg-yellow-400'
            }`}
          >
            {isPending || isConfirming ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mr-2"></div>
                {isPending ? 'Confirming...' : 'Minting...'}
              </div>
            ) : (
              'Mint Artist NFT'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Wrap the component with authentication HOC
const MintArtistNFTWithAuth = withAuth(MintArtistNFTForm);

export default function MintArtistNFT() {
  return <MintArtistNFTWithAuth />;
}