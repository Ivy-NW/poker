'use client';

import { useState } from 'react';
import { CurrencyDollarIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import { PlayIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { withAuth } from '@/components/withAuth';

// Mock staking data
const mockStakingPools = [
  {
    id: 1,
    artistName: 'Luna Rivers',
    genre: 'Pop',
    apy: 24.5,
    totalStaked: 125000,
    userStaked: 1.0,
    pendingRewards: 0.08,
    lockPeriod: 30,
    rating: 4.8,
    riskLevel: 'Low',
    minStake: 0.1,
    maxStake: 10.0,
  },
  {
    id: 2,
    artistName: 'Echo Beats',
    genre: 'Electronic',
    apy: 18.2,
    totalStaked: 89000,
    userStaked: 0.8,
    pendingRewards: 0.06,
    lockPeriod: 60,
    rating: 4.2,
    riskLevel: 'Medium',
    minStake: 0.1,
    maxStake: 5.0,
  },
  {
    id: 3,
    artistName: 'Rock Anthem',
    genre: 'Rock',
    apy: 32.1,
    totalStaked: 156000,
    userStaked: 0.7,
    pendingRewards: 0.05,
    lockPeriod: 90,
    rating: 4.5,
    riskLevel: 'Low',
    minStake: 0.2,
    maxStake: 15.0,
  },
  {
    id: 4,
    artistName: 'Midnight Jazz',
    genre: 'Jazz',
    apy: 15.8,
    totalStaked: 45000,
    userStaked: 0,
    pendingRewards: 0,
    lockPeriod: 45,
    rating: 3.9,
    riskLevel: 'High',
    minStake: 0.05,
    maxStake: 3.0,
  },
];

const StakingPage = () => {
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState('pools');

  const totalUserStaked = mockStakingPools.reduce((sum, pool) => sum + pool.userStaked, 0);
  const totalPendingRewards = mockStakingPools.reduce((sum, pool) => sum + pool.pendingRewards, 0);
  const averageAPY = mockStakingPools.reduce((sum, pool) => sum + (pool.apy * pool.userStaked), 0) / totalUserStaked || 0;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'High': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleStake = (poolId: number) => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    console.log(`Staking ${stakeAmount} AVAX in pool ${poolId}`);
    setStakeAmount('');
    setSelectedPool(null);
  };

  const handleClaimRewards = (poolId: number) => {
    console.log(`Claiming rewards from pool ${poolId}`);
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(3)} AVAX`;
  };

  return (
    <div className="min-h-screen py-8 parallax-container">
      <div className="parallax-bg"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-royal-bold text-royal-gold mb-4 text-luxury">
            Royal Staking Palace
          </h1>
          <p className="text-gray-300 font-elegant text-lg">Stake your royal tokens to earn music royalties</p>
          <div className="royal-divider"></div>
        </div>

        {/* Staking Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="glass-premium p-8 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div className="poker-chip w-16 h-16 flex items-center justify-center">
                <CurrencyDollarIcon className="w-8 h-8 text-black" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-royal-bold text-royal-gold">{formatCurrency(totalUserStaked)}</div>
                <div className="text-sm text-gray-300 font-elegant">Total Royal Stakes</div>
              </div>
            </div>
            <div className="text-sm text-gray-300 font-elegant">
              Across {mockStakingPools.filter(pool => pool.userStaked > 0).length} royal pools
            </div>
          </div>

          <div className="glass-premium p-8 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div className="poker-chip w-16 h-16 flex items-center justify-center">
                <ClockIcon className="w-8 h-8 text-black" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-royal-bold text-royal-gold">{formatCurrency(totalPendingRewards)}</div>
                <div className="text-sm text-gray-300 font-elegant">Pending Royal Rewards</div>
              </div>
            </div>
            <div className="text-sm text-green-400">
              Ready to claim
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FFC700]/10 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-[#FFC700]" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{averageAPY.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Average APY</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Weighted by stake amount
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
          <div className="flex space-x-6 mb-6 border-b border-[#FFC700]/20">
            {['pools', 'my-stakes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium capitalize transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-[#FFC700] border-b-2 border-[#FFC700]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Staking Pools Tab */}
          {activeTab === 'pools' && (
            <div className="space-y-4">
              {mockStakingPools.map((pool) => (
                <div key={pool.id} className="bg-[#1E293B] rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Pool Info */}
                    <div className="flex items-center mb-4 lg:mb-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FFC700]/20 to-[#818CF8]/20 rounded-lg flex items-center justify-center mr-4">
                        <PlayIcon className="w-8 h-8 text-[#FFC700]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{pool.artistName}</h3>
                        <p className="text-gray-400">{pool.genre}</p>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-4 h-4 text-[#FFC700] mr-1" />
                          <span className="text-sm text-gray-300 mr-3">{pool.rating}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(pool.riskLevel)}`}>
                            {pool.riskLevel} Risk
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pool Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 lg:mb-0">
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-[#FFC700]">{pool.apy}%</div>
                        <div className="text-xs text-gray-400">APY</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-lg font-semibold text-white">${pool.totalStaked.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Total Staked</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-lg font-semibold text-white">{pool.lockPeriod} days</div>
                        <div className="text-xs text-gray-400">Lock Period</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-lg font-semibold text-white">{formatCurrency(pool.minStake)} - {formatCurrency(pool.maxStake)}</div>
                        <div className="text-xs text-gray-400">Stake Range</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex space-x-2">
                      {pool.userStaked > 0 && pool.pendingRewards > 0 && (
                        <button
                          onClick={() => handleClaimRewards(pool.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                        >
                          Claim {formatCurrency(pool.pendingRewards)}
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedPool(selectedPool === pool.id ? null : pool.id)}
                        className="px-4 py-2 bg-[#FFC700] text-[#1E293B] rounded-lg font-medium hover:bg-[#e6b300] transition-colors duration-200"
                      >
                        {pool.userStaked > 0 ? 'Add More' : 'Stake'}
                      </button>
                    </div>
                  </div>

                  {/* Staking Interface */}
                  {selectedPool === pool.id && (
                    <div className="mt-6 pt-6 border-t border-[#FFC700]/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Stake Amount (AVAX)</label>
                          <input
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder={`Min: ${pool.minStake} AVAX`}
                            min={pool.minStake}
                            max={pool.maxStake}
                            step="0.01"
                            className="w-full bg-[#0F172A] border border-[#FFC700]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFC700]"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => handleStake(pool.id)}
                            disabled={!stakeAmount || parseFloat(stakeAmount) < pool.minStake || parseFloat(stakeAmount) > pool.maxStake}
                            className="w-full bg-[#FFC700] text-[#1E293B] py-3 rounded-lg font-semibold hover:bg-[#e6b300] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Stake Now
                          </button>
                        </div>
                      </div>
                      {stakeAmount && parseFloat(stakeAmount) > 0 && (
                        <div className="mt-4 p-4 bg-[#0F172A] rounded-lg">
                          <div className="text-sm text-gray-400 mb-2">Estimated Annual Rewards</div>
                          <div className="text-[#FFC700] font-semibold">
                            {formatCurrency(parseFloat(stakeAmount) * (pool.apy / 100))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* My Stakes Tab */}
          {activeTab === 'my-stakes' && (
            <div className="space-y-4">
              {mockStakingPools.filter(pool => pool.userStaked > 0).map((pool) => (
                <div key={pool.id} className="bg-[#1E293B] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FFC700]/20 to-[#818CF8]/20 rounded-lg flex items-center justify-center mr-4">
                        <PlayIcon className="w-6 h-6 text-[#FFC700]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{pool.artistName}</h3>
                        <p className="text-gray-400 text-sm">{pool.genre}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">{formatCurrency(pool.userStaked)}</div>
                      <div className="text-sm text-gray-400">Staked</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#0F172A] rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">APY</div>
                      <div className="text-[#FFC700] font-semibold">{pool.apy}%</div>
                    </div>
                    <div className="bg-[#0F172A] rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">Pending Rewards</div>
                      <div className="text-green-400 font-semibold">{formatCurrency(pool.pendingRewards)}</div>
                    </div>
                    <div className="bg-[#0F172A] rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">Lock Period</div>
                      <div className="text-white font-semibold">{pool.lockPeriod} days</div>
                    </div>
                    <div className="bg-[#0F172A] rounded-lg p-3">
                      <div className="text-gray-400 text-xs mb-1">Est. Annual</div>
                      <div className="text-white font-semibold">{formatCurrency(pool.userStaked * (pool.apy / 100))}</div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    {pool.pendingRewards > 0 && (
                      <button
                        onClick={() => handleClaimRewards(pool.id)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                      >
                        Claim Rewards
                      </button>
                    )}
                    <button className="flex-1 bg-[#FFC700] text-[#1E293B] py-2 rounded-lg font-medium hover:bg-[#e6b300] transition-colors duration-200">
                      Add More
                    </button>
                    <button className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors duration-200">
                      Unstake
                    </button>
                  </div>
                </div>
              ))}

              {mockStakingPools.filter(pool => pool.userStaked > 0).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">You haven&apos;t staked in any pools yet</div>
                  <button
                    onClick={() => setActiveTab('pools')}
                    className="text-[#FFC700] hover:text-[#e6b300] transition-colors duration-200"
                  >
                    Explore staking pools
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(StakingPage);
