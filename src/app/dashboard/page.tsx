'use client';

import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon, StarIcon, PlayIcon } from '@heroicons/react/24/solid';
import { withAuth } from '@/components/withAuth';

// Mock data for user dashboard
const mockUserData = {
  totalInvested: 2.5,
  totalEarnings: 0.34,
  monthlyReturn: 0.12,
  portfolioValue: 2.84,
  activeStakes: 5,
  totalArtists: 3,
};

const mockStakes = [
  {
    id: 1,
    artistName: 'Luna Rivers',
    genre: 'Pop',
    stakeAmount: 1.0,
    currentValue: 1.15,
    monthlyEarnings: 0.08,
    change: 15,
    rating: 4.8,
    shares: 2000,
  },
  {
    id: 2,
    artistName: 'Echo Beats',
    genre: 'Electronic',
    stakeAmount: 0.8,
    currentValue: 0.92,
    monthlyEarnings: 0.06,
    change: 15,
    rating: 4.2,
    shares: 2667,
  },
  {
    id: 3,
    artistName: 'Rock Anthem',
    genre: 'Rock',
    stakeAmount: 0.7,
    currentValue: 0.77,
    monthlyEarnings: 0.05,
    change: 10,
    rating: 4.5,
    shares: 875,
  },
];

const mockRecentActivity = [
  { type: 'stake', artist: 'Luna Rivers', amount: 0.5, date: '2024-01-15' },
  { type: 'earning', artist: 'Echo Beats', amount: 0.03, date: '2024-01-14' },
  { type: 'earning', artist: 'Rock Anthem', amount: 0.02, date: '2024-01-13' },
  { type: 'stake', artist: 'Echo Beats', amount: 0.3, date: '2024-01-12' },
];

const DashboardPage = () => {
  // Removed unused state
  
  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(3)} AVAX`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
  };

  return (
    <div className="min-h-screen bg-[#1E293B] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your music investments and earnings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FFC700]/10 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-[#FFC700]" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatCurrency(mockUserData.portfolioValue)}</div>
                <div className="text-sm text-gray-400">Portfolio Value</div>
              </div>
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              +13.6% this month
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FFC700]/10 rounded-lg flex items-center justify-center">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-[#FFC700]" />
                </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatCurrency(mockUserData.totalEarnings)}</div>
                <div className="text-sm text-gray-400">Total Earnings</div>
              </div>
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              +{formatCurrency(mockUserData.monthlyReturn)} this month
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FFC700]/10 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-[#FFC700]" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{mockUserData.activeStakes}</div>
                <div className="text-sm text-gray-400">Active Stakes</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Across {mockUserData.totalArtists} artists
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FFC700]/10 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-[#FFC700]" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatCurrency(mockUserData.totalInvested)}</div>
                <div className="text-sm text-gray-400">Total Invested</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              ROI: +{((mockUserData.totalEarnings / mockUserData.totalInvested) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio */}
          <div className="lg:col-span-2">
            <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
              <h2 className="text-xl font-semibold text-white mb-6">Your Stakes</h2>
              <div className="space-y-4">
                {mockStakes.map((stake) => {
                  const ChangeIcon = getChangeIcon(stake.change);
                  return (
                    <div key={stake.id} className="bg-[#1E293B] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#FFC700]/20 to-[#818CF8]/20 rounded-lg flex items-center justify-center mr-4">
                            <PlayIcon className="w-6 h-6 text-[#FFC700]" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{stake.artistName}</h3>
                            <p className="text-gray-400 text-sm">{stake.genre}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 text-[#FFC700] mr-1" />
                          <span className="text-sm text-gray-300">{stake.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-gray-400 text-xs mb-1">Staked</div>
                          <div className="text-white font-medium">{formatCurrency(stake.stakeAmount)}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs mb-1">Current Value</div>
                          <div className="text-white font-medium">{formatCurrency(stake.currentValue)}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs mb-1">Monthly Earnings</div>
                          <div className="text-[#FFC700] font-medium">{formatCurrency(stake.monthlyEarnings)}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs mb-1">Change</div>
                          <div className={`font-medium flex items-center ${getChangeColor(stake.change)}`}>
                            <ChangeIcon className="w-4 h-4 mr-1" />
                            +{stake.change}%
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#FFC700]/20">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Shares: {stake.shares.toLocaleString()}</span>
                          <div className="flex space-x-2">
                            <button className="text-[#FFC700] hover:text-[#e6b300] text-sm transition-colors duration-200">
                              Add More
                            </button>
                            <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                              Withdraw
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#FFC700] text-[#1E293B] py-3 rounded-lg font-medium hover:bg-[#e6b300] transition-colors duration-200">
                  Explore New Artists
                </button>
                <button className="w-full border border-[#FFC700] text-[#FFC700] py-3 rounded-lg font-medium hover:bg-[#FFC700] hover:text-[#1E293B] transition-colors duration-200">
                  Claim Earnings
                </button>
                <button className="w-full bg-[#1E293B] text-white py-3 rounded-lg font-medium hover:bg-[#334155] transition-colors duration-200">
                  View Marketplace
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-[#FFC700]/20">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {mockRecentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        activity.type === 'stake' ? 'bg-[#FFC700]' : 'bg-green-400'
                      }`}></div>
                      <div>
                        <div className="text-white text-sm">
                          {activity.type === 'stake' ? 'Staked in' : 'Earned from'} {activity.artist}
                        </div>
                        <div className="text-gray-400 text-xs">{activity.date}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${
                      activity.type === 'stake' ? 'text-[#FFC700]' : 'text-green-400'
                    }`}>
                      {activity.type === 'stake' ? '-' : '+'}{formatCurrency(activity.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);
