'use client';

import Link from 'next/link';
import { ArrowRightIcon, MusicalNoteIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import { useWalletAuth } from '@/contexts/WalletAuthContext';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E293B] via-[#1E293B] to-[#0F172A] py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Invest in Music,
              <span className="text-[#FFC700] block">Earn Royalties</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stake in artists&apos; NFTs to gain fractional ownership of their music royalties.
              A decentralized platform built on Avalanche blockchain for transparent music investment.
            </p>

            {/* Conditional content based on wallet connection */}
            {isConnected ? (
              <div className="space-y-4">
                <div className="bg-[#FFC700]/10 border border-[#FFC700]/30 rounded-lg p-4 max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-[#FFC700] font-medium">Wallet Connected</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-2 text-center">
                    {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/dashboard"
                    className="bg-[#FFC700] text-[#1E293B] px-8 py-3 rounded-lg font-semibold hover:bg-[#e6b300] transition-colors duration-200 flex items-center justify-center"
                  >
                    Go to Dashboard
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/artists"
                    className="border border-[#FFC700] text-[#FFC700] px-8 py-3 rounded-lg font-semibold hover:bg-[#FFC700] hover:text-[#1E293B] transition-colors duration-200"
                  >
                    Explore Artists
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#FFC700]/5 border border-[#FFC700]/20 rounded-lg p-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#FFC700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-[#FFC700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Connect your wallet to start investing in music royalties and accessing all platform features.
                    </p>
                    <div className="flex justify-center">
                      <ConnectButton />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Once connected, you&apos;ll have access to the dashboard, artist marketplace, and staking features.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#FFC700] mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How Royalty Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our platform democratizes music investment through blockchain technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#0F172A] p-6 rounded-xl border border-[#FFC700]/20 hover:border-[#FFC700]/40 transition-colors duration-200">
                  <div className="w-12 h-12 bg-[#FFC700]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#FFC700]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
