'use client';

import Link from 'next/link';
import { ArrowRightIcon, MusicalNoteIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import { useWalletAuth } from '@/contexts/WalletAuthContext';
import {MintArtistNFTForm} from '@/components/MintArtistNFTForm';

const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => ({ default: mod.ConnectButton })),
  { ssr: false }
);

export default function Home() {
  const { isConnected, address } = useWalletAuth();

  const features = [
    {
      icon: MusicalNoteIcon,
      title: 'Artist NFT Minting',
      description: 'Artists can mint NFTs representing fractional ownership of their music royalties.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Stake to Earn',
      description: 'Fans stake in artist NFTs to earn proportional music royalties automatically.',
    },
    {
      icon: ChartBarIcon,
      title: 'Dynamic Rating System',
      description: 'Artists rated 2.5-5.0 based on performance metrics with visible risk levels.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Automated Payouts',
      description: 'Smart contracts handle royalty distributions without manual intervention.',
    },
  ];

  const stats = [
    { label: 'Total Artists', value: '150+' },
    { label: 'NFTs Minted', value: '2.5K+' },
    { label: 'Total Staked', value: '$1.2M' },
    { label: 'Royalties Paid', value: '$450K' },
  ];

  return (
    <div className="min-h-screen parallax-container">
      <div className="parallax-bg"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-royal-bold text-luxury mb-8">
              Royal Music Investment,
              <span className="text-royal-gold block">Earn Noble Royalties</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-4xl mx-auto font-elegant leading-relaxed">
              Stake in royal artists&apos; NFTs to gain fractional ownership of their music royalties.
              A decentralized palace built on Avalanche blockchain for transparent music investment.
            </p>
            <div className="royal-divider mb-10"></div>

            {/* Conditional content based on wallet connection */}
            {isConnected ? (
              <div className="space-y-6">
                <div className="glass-premium p-6 max-w-lg mx-auto mb-8 hover-glow">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="poker-chip w-8 h-8 flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-royal-gold font-royal text-lg">Royal Wallet Connected</span>
                  </div>
                  <p className="text-gray-200 text-sm mt-3 text-center font-elegant">
                    {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/dashboard"
                    className="btn-royal px-10 py-4 text-lg font-royal flex items-center justify-center hover-lift"
                  >
                    Enter Royal Dashboard
                    <ArrowRightIcon className="w-6 h-6 ml-3" />
                  </Link>
                  <Link
                    href="/artists"
                    className="btn-royal-outline px-10 py-4 text-lg font-royal hover-lift"
                  >
                    Explore Royal Artists
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="glass-royal p-8 max-w-lg mx-auto hover-glow">
                  <div className="text-center">
                    <div className="poker-chip w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-royal-bold text-royal-gold mb-4">Connect Your Royal Wallet</h3>
                    <p className="text-gray-200 text-base mb-6 font-elegant leading-relaxed">
                      Connect your wallet to start investing in royal music royalties and accessing all palace features.
                    </p>
                    <div className="flex justify-center">
                      <ConnectButton />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 font-elegant">
                    Once connected, you&apos;ll have access to the royal dashboard, artist marketplace, and staking palace.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-premium p-10 hover-lift">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-royal-bold text-royal-gold mb-4">Royal Platform Statistics</h2>
              <div className="royal-divider"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="poker-chip w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl font-royal-bold text-black">{stat.value}</div>
                  </div>
                  <div className="text-gray-200 font-elegant text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-royal-bold text-luxury mb-6">
              How Royal Royalties Work
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-elegant leading-relaxed">
              Our royal platform democratizes music investment through blockchain technology and noble elegance
            </p>
            <div className="royal-divider mt-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-luxury p-8 hover-lift group">
                  <div className="poker-chip w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-royal-bold text-royal-gold mb-4 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-200 font-elegant leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
