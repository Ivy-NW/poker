"use client";
import React, { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { parseEther, isAddress, formatEther } from 'viem';
import { withAuth } from '../components/withAuth';
import { ROYALTY_NFT_CONTRACT_ABI, ROYALTY_NFT_CONTRACT_ADDRESS } from "@/app/ContractABI/RoyaltyNFT";

function ViewArtistsComponent() {
    const { address, isConnected } = useAccount();
    const [tokenId, setTokenId] = useState('');
    const [searchTokenId, setSearchTokenId] = useState('');

    // Get artist info for a specific token ID
    const { 
        data: artistInfo, 
        isLoading, 
        isError, 
        error 
    } = useReadContract({
        address: ROYALTY_NFT_CONTRACT_ADDRESS,
        abi: ROYALTY_NFT_CONTRACT_ABI,
        functionName: 'getArtistInfo',
        args: searchTokenId ? [BigInt(searchTokenId)] : undefined,
        query: {
            enabled: !!searchTokenId && !isNaN(Number(searchTokenId))
        }
    });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (tokenId && !isNaN(Number(tokenId))) {
            setSearchTokenId(tokenId);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTokenId(e.target.value);
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-black p-6">
                <div className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-500/30 p-8">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
                        View Artists
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
            <div className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-500/30 p-8">
                <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
                    View Artists
                </h1>

                {/* Search Form */}
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-yellow-400 font-semibold mb-2">
                                Enter Token ID
                            </label>
                            <input
                                type="number"
                                value={tokenId}
                                onChange={handleInputChange}
                                placeholder="Enter token ID (e.g., 1, 2, 3...)"
                                className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                min="0"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={!tokenId || isNaN(Number(tokenId))}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                    !tokenId || isNaN(Number(tokenId))
                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                        : 'bg-yellow-500 text-black hover:bg-yellow-400'
                                }`}
                            >
                                Search Artist
                            </button>
                        </div>
                    </form>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-300">Loading artist information...</p>
                    </div>
                )}

                {/* Error State */}
                {isError && (
                    <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
                        <p className="font-semibold">Error loading artist information:</p>
                        <p className="text-sm">{error?.message || 'Unknown error occurred'}</p>
                    </div>
                )}

                {/* Artist Information Display */}
                {artistInfo && !isLoading && !isError && (
                    <div className="bg-gray-800/50 border border-yellow-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-yellow-400">
                                Artist Information
                            </h2>
                            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                                Token ID: {searchTokenId}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Artist Name */}
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h3 className="text-yellow-400 font-semibold mb-2">Artist Name</h3>
                                <p className="text-white text-lg">{artistInfo.name || 'Not provided'}</p>
                            </div>

                            {/* Artist Address */}
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h3 className="text-yellow-400 font-semibold mb-2">Artist Address</h3>
                                <p className="text-white text-sm font-mono break-all">
                                    {artistInfo.artistAddress}
                                </p>
                            </div>

                            {/* Rating */}
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h3 className="text-yellow-400 font-semibold mb-2">Rating</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-lg">{artistInfo.rating.toString()}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={i} 
                                                className={`text-lg ${
                                                    i < Number(artistInfo.rating) ? 'text-yellow-400' : 'text-gray-600'
                                                }`}
                                            >
                                                ⭐
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Investment Target */}
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h3 className="text-yellow-400 font-semibold mb-2">Investment Target</h3>
                                <p className="text-white text-lg">
                                    {formatEther(artistInfo.investmentTarget)} ETH
                                </p>
                            </div>

                            {/* Total Royalties */}
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h3 className="text-yellow-400 font-semibold mb-2">Total Royalties</h3>
                                <p className="text-white text-lg">
                                    {formatEther(artistInfo.totalRoyalties)} ETH
                                </p>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-700/50 p-4 rounded-lg md:col-span-2">
                                <h3 className="text-yellow-400 font-semibold mb-2">Description</h3>
                                <p className="text-white leading-relaxed">
                                    {artistInfo.description || 'No description provided'}
                                </p>
                            </div>
                        </div>

                        {/* Investment Progress */}
                        <div className="mt-6 bg-gray-700/50 p-4 rounded-lg">
                            <h3 className="text-yellow-400 font-semibold mb-2">Investment Progress</h3>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                                <div 
                                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${Math.min(
                                            (Number(formatEther(artistInfo.totalRoyalties)) / Number(formatEther(artistInfo.investmentTarget))) * 100,
                                            100
                                        )}%`
                                    }}
                                ></div>
                            </div>
                            <p className="text-gray-300 text-sm mt-2">
                                {formatEther(artistInfo.totalRoyalties)} ETH raised of {formatEther(artistInfo.investmentTarget)} ETH target
                                ({Math.min(
                                    (Number(formatEther(artistInfo.totalRoyalties)) / Number(formatEther(artistInfo.investmentTarget))) * 100,
                                    100
                                ).toFixed(2)}% complete)
                            </p>
                        </div>
                    </div>
                )}

                {/* No Results State */}
                {searchTokenId && !isLoading && !isError && !artistInfo && (
                    <div className="text-center py-8">
                        <p className="text-gray-300 text-lg">
                            No artist found for Token ID: {searchTokenId}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Please try a different token ID or ensure the artist NFT has been minted.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Wrap the component with authentication HOC
const ViewArtistsWithAuth = withAuth(ViewArtistsComponent);

export default function ViewArtists() {
    return <ViewArtistsWithAuth />;
}