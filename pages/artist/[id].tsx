// pages/artist/[id].tsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { WalletContext } from '../_app'; // Adjust path as needed
import React, { useContext, useEffect, useState } from 'react';

// Dummy data structure for an artist - in a real app, this would come from an API/backend
interface ArtistData {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  rating: number;
  riskMetric: string;
  investmentTarget: string; // e.g., "500 AVAX"
  investmentRaised: string; // e.g., "250 AVAX"
  nfts: NftData[];
  streamingData?: { plays: string; monthlyListeners: string }; // Example
  fanEngagement?: { socialFollowers: string; engagementRate: string }; // Example
}

interface NftData {
  nftId: string;
  name: string;
  price: string; // e.g., "10 AVAX"
  royaltyPercentage: number; // e.g., 0.5 for 0.5%
  unitsAvailable: number;
  totalUnits: number;
  imageUrl?: string;
}

// Mock function to fetch artist data - replace with actual API call
const fetchArtistData = async (id: string): Promise<ArtistData | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Dummy data for a few artists
  const artists: { [key: string]: ArtistData } = {
    '1': {
      id: '1',
      name: 'DJ Sparkle',
      bio: 'DJ Sparkle is an up-and-coming electronic music producer known for vibrant beats and energetic performances. With a rapidly growing fanbase, DJ Sparkle is set to take the mainstage.',
      imageUrl: '/images/placeholder.jpg', // Replace with actual artist image
      rating: 4.8,
      riskMetric: 'Low',
      investmentTarget: '100 AVAX',
      investmentRaised: '75 AVAX',
      nfts: [
        { nftId: 'nft001', name: 'Genesis Sparkle Drop', price: '5 AVAX', royaltyPercentage: 0.1, unitsAvailable: 50, totalUnits: 200, imageUrl: '/images/placeholder.jpg' },
        { nftId: 'nft002', name: 'Anthem X Royalty Share', price: '10 AVAX', royaltyPercentage: 0.25, unitsAvailable: 20, totalUnits: 100, imageUrl: '/images/placeholder.jpg' },
      ],
      streamingData: { plays: '1.2M', monthlyListeners: '150K' },
      fanEngagement: { socialFollowers: '50K', engagementRate: '5.2%' },
    },
    '2': {
      id: '2',
      name: 'The Groove Masters',
      bio: 'A dynamic funk band bringing back classic grooves with a modern twist. Their live shows are legendary, and their recordings capture raw energy.',
      imageUrl: '/images/placeholder.jpg',
      rating: 4.5,
      riskMetric: 'Medium',
      investmentTarget: '250 AVAX',
      investmentRaised: '100 AVAX',
      nfts: [
        { nftId: 'nft003', name: 'Funky Times Vol. 1 Share', price: '15 AVAX', royaltyPercentage: 0.5, unitsAvailable: 30, totalUnits: 100, imageUrl: '/images/placeholder.jpg' },
      ],
      streamingData: { plays: '800K', monthlyListeners: '90K' },
      fanEngagement: { socialFollowers: '30K', engagementRate: '4.1%' },
    },
     '3': {
      id: '3',
      name: 'Synthwave Kid',
      rating: 4.9,
      riskMetric: 'Low',
      investmentTarget: '150 AVAX',
      investmentRaised: '140 AVAX',
      bio: 'Riding the retro wave with nostalgic synth melodies and futuristic soundscapes. A true artist for the digital age.',
      imageUrl: '/images/placeholder.jpg',
      nfts: [
        { nftId: 'nft004', name: 'Neon Dreams EP Share', price: '8 AVAX', royaltyPercentage: 0.2, unitsAvailable: 70, totalUnits: 150, imageUrl: '/images/placeholder.jpg' },
        { nftId: 'nft005', name: 'Future Retro Single Share', price: '12 AVAX', royaltyPercentage: 0.3, unitsAvailable: 40, totalUnits: 80, imageUrl: '/images/placeholder.jpg' },
      ],
      streamingData: { plays: '2.1M', monthlyListeners: '250K' },
      fanEngagement: { socialFollowers: '100K', engagementRate: '6.0%' },
    },
  };
  return artists[id] || null;
};


export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query;
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const walletContext = useContext(WalletContext);

  useEffect(() => {
    if (id && typeof id === 'string') {
      setLoading(true);
      fetchArtistData(id)
        .then(data => {
          setArtist(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch artist data:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handlePurchaseNFT = (nftId: string) => {
    if (!walletContext?.isConnected) {
      alert("Please connect your wallet to purchase an NFT.");
      walletContext?.connectWallet(); // Attempt to connect
      return;
    }
    // Placeholder for actual purchase logic (will use contract-interactions.ts)
    console.log(`Attempting to purchase NFT: ${nftId} for artist ${artist?.name}`);
    alert(`Purchase initiated for NFT ${nftId} (simulation). Integration with smart contract needed.`);
  };

  const investmentProgress = artist ? (parseFloat(artist.investmentRaised) / parseFloat(artist.investmentTarget) * 100) : 0;

  if (loading) {
    return <div className="text-center py-10">Loading artist profile...</div>;
  }

  if (!artist) {
    return (
        <div className="text-center py-10">
            <h1 className="text-2xl text-red-500">Artist not found.</h1>
            <Link href="/" legacyBehavior>
                <a className="text-secondary-light-blue hover:underline mt-4 inline-block">Go back to Homepage</a>
            </Link>
        </div>
    );
  }

  return (
    <>
      <Head>
        <title>{artist.name} - Artist Profile | Royalty Music Platform</title>
        <meta name="description" content={`Learn more about ${artist.name} and their music royalty NFTs.`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Artist Header */}
        <section className="flex flex-col md:flex-row items-center md:items-start mb-12">
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg mb-6 md:mb-0 md:mr-8 border-4 border-primary-gold"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-gold mb-2">{artist.name}</h1>
            <p className="text-secondary-white text-lg mb-4">{artist.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4">
              <p className="text-secondary-white">Rating: <span className="font-bold text-yellow-400">{artist.rating.toFixed(1)}/5.0</span></p>
              <p className="text-secondary-white">Risk: <span className="font-bold text-red-400">{artist.riskMetric}</span></p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-light-blue">Investment Target: {artist.investmentTarget}</h3>
              <div className="w-full bg-slate-700 rounded-full h-2.5 mb-1">
                <div
                    className="bg-primary-gold h-2.5 rounded-full"
                    style={{ width: `${investmentProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">{artist.investmentRaised} raised ({investmentProgress.toFixed(1)}%)</p>
            </div>
          </div>
        </section>

        {/* NFTs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-secondary-light-blue mb-6">Available Royalty NFTs</h2>
          {artist.nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.nfts.map(nft => (
                <div key={nft.nftId} className="bg-slate-800 p-6 rounded-lg shadow-xl hover:shadow-primary-gold/40 transition-shadow duration-300">
                  {nft.imageUrl && <img src={nft.imageUrl} alt={nft.name} className="w-full h-40 object-cover rounded-md mb-4" />}
                  <h3 className="text-xl font-semibold text-primary-gold mb-2">{nft.name}</h3>
                  <p className="text-secondary-white mb-1">Price: <span className="font-bold">{nft.price}</span></p>
                  <p className="text-secondary-white mb-1">Royalty Share: <span className="font-bold">{nft.royaltyPercentage}%</span></p>
                  <p className="text-secondary-white mb-3">Available: <span className="font-bold">{nft.unitsAvailable} / {nft.totalUnits}</span></p>
                  <button
                    onClick={() => handlePurchaseNFT(nft.nftId)}
                    className="w-full bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
                    Purchase NFT
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary-white">No NFTs currently available for this artist.</p>
          )}
        </section>

        {/* Performance Metrics Section (Simulated) */}
        {(artist.streamingData || artist.fanEngagement) && (
          <section>
            <h2 className="text-3xl font-bold text-secondary-light-blue mb-6">Performance Metrics (Simulated)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.streamingData && (
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary-gold mb-3">Streaming Highlights</h3>
                  <p className="text-secondary-white">Total Plays: <span className="font-bold">{artist.streamingData.plays}</span></p>
                  <p className="text-secondary-white">Monthly Listeners: <span className="font-bold">{artist.streamingData.monthlyListeners}</span></p>
                </div>
              )}
              {artist.fanEngagement && (
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-primary-gold mb-3">Fan Engagement</h3>
                  <p className="text-secondary-white">Social Followers: <span className="font-bold">{artist.fanEngagement.socialFollowers}</span></p>
                  <p className="text-secondary-white">Engagement Rate: <span className="font-bold">{artist.fanEngagement.engagementRate}</span></p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
