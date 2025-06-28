// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import ArtistCard from '../components/ArtistCard';
import { WalletContext } from './_app'; // Adjust path if _app.tsx is elsewhere or context is separate
import React, { useContext } from 'react';


// Dummy data for featured artists
const featuredArtists = [
  {
    id: '1',
    artistName: 'DJ Sparkle',
    rating: 4.8,
    riskLevel: 'Low',
    investmentTarget: '100 AVAX',
    imageUrl: '/images/placeholder.jpg', // Replace with actual images or dynamic ones
  },
  {
    id: '2',
    artistName: 'The Groove Masters',
    rating: 4.5,
    riskLevel: 'Medium',
    investmentTarget: '250 AVAX',
    imageUrl: '/images/placeholder.jpg',
  },
  {
    id: '3',
    artistName: 'Synthwave Kid',
    rating: 4.9,
    riskLevel: 'Low',
    investmentTarget: '150 AVAX',
    imageUrl: '/images/placeholder.jpg',
  },
];

// Dummy data for platform features
const platformFeatures = [
  {
    title: 'Artist Rating System',
    description: 'Dynamic ratings (2.5–5.0) based on performance, with visible risk metrics.',
    icon: '🌟', // Placeholder icon
  },
  {
    title: 'Fractional Royalty NFTs',
    description: 'Own parts of music rights via ERC-1155 NFTs and trade them on secondary markets.',
    icon: '🎵', // Placeholder icon
  },
  {
    title: 'Automated Payouts',
    description: 'Smart contracts handle royalty distributions transparently and instantly.',
    icon: '💸', // Placeholder icon
  },
  {
    title: 'Staking Mechanism',
    description: 'Stake your NFT shares to earn proportional royalties from streaming data.',
    icon: '🔒', // Placeholder icon
  },
];

export default function HomePage() {
  const walletContext = useContext(WalletContext);

  return (
    <>
      <Head>
        <title>Welcome to Royalty Music Platform</title>
        <meta name="description" content="Invest in music royalties and support your favorite artists." />
      </Head>

      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary-dark-blue-gray via-slate-800 to-primary-dark-blue-gray">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-gold mb-6">
          Revolutionizing Music Royalties
        </h1>
        <p className="text-lg md:text-xl text-secondary-white mb-8 max-w-2xl mx-auto">
          Invest in your favorite artists, own fractional music rights, and earn royalties directly through blockchain technology.
        </p>
        <div className="space-x-4">
          <Link href="/#featured-artists" legacyBehavior>
            <a className="bg-primary-gold hover:bg-yellow-500 text-primary-dark-blue-gray font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
              Explore Artists
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
              Learn More
            </a>
          </Link>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section id="featured-artists" className="py-12 md:py-20">
        <h2 className="text-3xl font-bold text-center text-primary-gold mb-10">
          Featured Artists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artistName={artist.artistName}
              rating={artist.rating}
              riskLevel={artist.riskLevel}
              investmentTarget={artist.investmentTarget}
              imageUrl={artist.imageUrl}
            />
          ))}
        </div>
        <div className="text-center mt-10">
            <Link href="/artists" legacyBehavior> {/* Assuming an /artists overview page */}
                 <a className="text-secondary-light-blue hover:text-blue-400 font-semibold text-lg">
                    View All Artists &rarr;
                 </a>
            </Link>
        </div>
      </section>

      {/* Platform Features Overview */}
      <section className="py-12 md:py-20 bg-slate-800">
        <h2 className="text-3xl font-bold text-center text-primary-gold mb-12">
          How Our Platform Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {platformFeatures.map((feature) => (
            <div key={feature.title} className="bg-primary-dark-blue-gray p-6 rounded-lg shadow-lg text-center hover:shadow-primary-gold/30 transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary-light-blue mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action to Stake/Invest */}
      <section className="py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold text-primary-gold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-secondary-white mb-8 max-w-xl mx-auto">
          Connect your wallet, explore NFT offerings, and start earning royalties by staking your shares.
        </p>
        {walletContext && !walletContext.isConnected ? (
          <button
            onClick={walletContext.connectWallet}
            className="bg-primary-gold hover:bg-yellow-500 text-primary-dark-blue-gray font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 mr-4"
          >
            Connect Wallet
          </button>
        ) : (
          <Link href="/staking" legacyBehavior>
            <a className="bg-primary-gold hover:bg-yellow-500 text-primary-dark-blue-gray font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 mr-4">
              Go to Staking
            </a>
          </Link>
        )}
        <Link href="/dashboard" legacyBehavior>
          <a className="bg-transparent hover:bg-secondary-light-blue border-2 border-secondary-light-blue text-secondary-light-blue font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
            View Dashboard
          </a>
        </Link>
      </section>
    </>
  );
}
