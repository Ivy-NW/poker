'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { StarIcon, PlayIcon, PauseIcon} from '@heroicons/react/24/solid';
import { ArrowLeftIcon, CurrencyDollarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { withAuth } from '@/components/withAuth';

// Mock artist data
const mockArtist = {
  id: 1,
  name: 'Luna Rivers',
  genre: 'Pop',
  rating: 4.8,
  riskLevel: 'Low',
  totalStaked: 125000,
  monthlyStreams: 2500000,
  image: '/api/placeholder/400/400',
  description: 'Luna Rivers is a rising pop sensation known for her ethereal vocals and catchy melodies. With over 2.5 million monthly streams, she has quickly become one of the most promising artists in the pop music scene.',
  nftPrice: 0.5,
  availableShares: 1000,
  totalShares: 5000,
  biography: 'Born and raised in Nashville, Luna Rivers started her musical journey at the age of 16. Her unique blend of pop and electronic elements has garnered attention from major record labels and streaming platforms.',
  achievements: [
    'Featured on Spotify\'s New Music Friday',
    'Over 10M total streams across platforms',
    'Performed at major music festivals',
    'Collaborated with Grammy-winning producers'
  ],
  recentTracks: [
    { title: 'Midnight Dreams', streams: 1200000, duration: '3:24' },
    { title: 'Electric Nights', streams: 980000, duration: '2:58' },
    { title: 'Golden Hour', streams: 1500000, duration: '4:12' },
  ],
  monthlyData: [
    { month: 'Jan', streams: 1800000, revenue: 4500 },
    { month: 'Feb', streams: 2100000, revenue: 5250 },
    { month: 'Mar', streams: 2500000, revenue: 6250 },
    { month: 'Apr', streams: 2300000, revenue: 5750 },
    { month: 'May', streams: 2700000, revenue: 6750 },
    { month: 'Jun', streams: 2500000, revenue: 6250 },
  ]
};

const ArtistDetailPage = () => {
  const params = useParams();
  const artistId = params.id;
  const [stakeAmount, setStakeAmount] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    // Handle staking logic here
    console.log(`Staking ${stakeAmount} AVAX in ${mockArtist.name}`);
  };

  return (
    <div className="min-h-screen py-8 parallax-container">
      <div className="parallax-bg"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link
          href="/artists"
          className="inline-flex items-center btn-royal-outline px-4 py-2 mb-8 font-royal"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Royal Artists
        </Link>

        {/* Artist Header */}
        <div className="glass-royal p-10 mb-8 hover-lift">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Artist Image */}
            <div className="flex-shrink-0">
              <div className="w-80 h-80 bg-gradient-to-br from-[#FFC700]/30 to-[#000000]/80 rounded-xl flex items-center justify-center relative parallax-bg overflow-hidden">
                <div className="poker-chip w-32 h-32 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  {isPlaying ? (
                    <PauseIcon className="w-16 h-16 text-black" />
                  ) : (
                    <PlayIcon className="w-16 h-16 text-black" />
                  )}
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 rounded-xl hover:bg-black/10 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Artist Info */}
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-5xl font-royal-bold text-royal-gold mb-3 text-luxury">{mockArtist.name}</h1>
                  <p className="text-xl text-gray-200 mb-4 font-elegant">{mockArtist.genre} (ID: {artistId})</p>
                </div>
                <div className={`glass-premium px-4 py-2 text-sm font-royal ${getRiskColor(mockArtist.riskLevel)}`}>
                  {mockArtist.riskLevel} Risk
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(mockArtist.rating) ? 'text-[#FFC700]' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="text-white ml-3 font-royal font-semibold text-lg">{mockArtist.rating}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-200 mb-8 font-elegant text-lg leading-relaxed">{mockArtist.description}</p>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1E293B] rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CurrencyDollarIcon className="w-5 h-5 text-[#FFC700] mr-2" />
                    <span className="text-gray-400 text-sm">Total Staked</span>
                  </div>
                  <div className="text-2xl font-bold text-white">${mockArtist.totalStaked.toLocaleString()}</div>
                </div>
                <div className="bg-[#1E293B] rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <UserGroupIcon className="w-5 h-5 text-[#FFC700] mr-2" />
                    <span className="text-gray-400 text-sm">Monthly Streams</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{(mockArtist.monthlyStreams / 1000000).toFixed(1)}M</div>
                </div>
                <div className="bg-[#1E293B] rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <ChartBarIcon className="w-5 h-5 text-[#FFC700] mr-2" />
                    <span className="text-gray-400 text-sm">NFT Price</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{mockArtist.nftPrice} AVAX</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-[#0F172A] rounded-xl p-6">
              <div className="flex space-x-6 mb-6 border-b border-[#FFC700]/20">
                {['overview', 'tracks', 'analytics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 text-sm font-medium capitalize transition-colors duration-200 ${
                      activeTab === tab
                        ? 'text-[#FFC700] border-b-2 border-[#FFC700]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Biography</h3>
                    <p className="text-gray-300">{mockArtist.biography}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Achievements</h3>
                    <ul className="space-y-2">
                      {mockArtist.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#FFC700] rounded-full mr-3"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'tracks' && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Tracks</h3>
                  <div className="space-y-3">
                    {mockArtist.recentTracks.map((track, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#1E293B] rounded-lg">
                        <div className="flex items-center">
                          <button className="w-10 h-10 bg-[#FFC700] rounded-full flex items-center justify-center mr-3">
                            <PlayIcon className="w-5 h-5 text-[#1E293B]" />
                          </button>
                          <div>
                            <div className="text-white font-medium">{track.title}</div>
                            <div className="text-gray-400 text-sm">{track.streams.toLocaleString()} streams</div>
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm">{track.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Performance Analytics</h3>
                  <div className="space-y-4">
                    {mockArtist.monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#1E293B] rounded-lg">
                        <div className="text-white font-medium">{data.month}</div>
                        <div className="flex space-x-6">
                          <div className="text-right">
                            <div className="text-gray-400 text-sm">Streams</div>
                            <div className="text-white">{(data.streams / 1000000).toFixed(1)}M</div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-400 text-sm">Revenue</div>
                            <div className="text-[#FFC700]">${data.revenue}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Staking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#0F172A] rounded-xl p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-4">Stake in {mockArtist.name}</h3>
              
              {/* NFT Availability */}
              <div className="bg-[#1E293B] rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Available Shares</span>
                  <span className="text-white font-semibold">{mockArtist.availableShares}/{mockArtist.totalShares}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-[#FFC700] h-2 rounded-full" 
                    style={{ width: `${((mockArtist.totalShares - mockArtist.availableShares) / mockArtist.totalShares) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Stake Amount Input */}
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">Stake Amount (AVAX)</label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-[#1E293B] border border-[#FFC700]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFC700]"
                />
              </div>

              {/* Estimated Returns */}
              {stakeAmount && parseFloat(stakeAmount) > 0 && (
                <div className="bg-[#1E293B] rounded-lg p-4 mb-4">
                  <div className="text-gray-400 text-sm mb-2">Estimated Monthly Returns</div>
                  <div className="text-[#FFC700] font-semibold">
                    ${((parseFloat(stakeAmount) / mockArtist.nftPrice) * 0.05).toFixed(2)}
                  </div>
                </div>
              )}

              {/* Stake Button */}
              <button
                onClick={handleStake}
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                className="w-full bg-[#FFC700] text-[#1E293B] py-3 rounded-lg font-semibold hover:bg-[#e6b300] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Stake Now
              </button>

              <div className="text-xs text-gray-400 mt-3 text-center">
                Minimum stake: {mockArtist.nftPrice} AVAX
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ArtistDetailPage);
