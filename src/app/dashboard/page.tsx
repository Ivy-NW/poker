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
    <div className="min-h-screen py-8 parallax-container">
      <div className="parallax-bg"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-royal-bold text-royal-gold mb-4 text-luxury">
            Royal Dashboard
          </h1>
          <p className="text-gray-300 font-elegant text-lg">Track your music investments and earnings with royal precision</p>
          <div className="royal-divider"></div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-premium hover-lift card-entrance">
            <div className="flex items-center justify-between mb-4">
              <div className="poker-chip w-14 h-14 flex items-center justify-center">
                <CurrencyDollarIcon className="w-7 h-7 text-black" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-royal-bold text-royal-gold">{formatCurrency(mockUserData.portfolioValue)}</div>
                <div className="text-sm text-gray-300 font-elegant">Portfolio Value</div>
              </div>
            </div>
            <div className="flex items-center text-green-400 text-sm font-elegant">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              +13.6% this month
            </div>
          </div>

          <div className="glass-premium hover-lift card-entrance">
            <div className="flex items-center justify-between mb-4">
              <div className="poker-chip w-14 h-14 flex items-center justify-center">
                <ArrowTrendingUpIcon className="w-7 h-7 text-black" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-royal-bold text-royal-gold">{formatCurrency(mockUserData.totalEarnings)}</div>
                <div className="text-sm text-gray-300 font-elegant">Total Earnings</div>
              </div>
            </div>
            <div className="flex items-center text-green-400 text-sm font-elegant">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              +{formatCurrency(mockUserData.monthlyReturn)} this month
            </div>
          </div>

          <div className="glass-premium hover-lift card-entrance">
            <div className="flex items-center justify-between mb-4">
              <div className="poker-chip w-14 h-14 flex items-center justify-center">
                <ChartBarIcon className="w-7 h-7 text-black" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-royal-bold text-royal-gold">{mockUserData.activeStakes}</div>
                <div className="text-sm text-gray-300 font-elegant">Active Stakes</div>
              </div>
            </div>
            <div className="text-sm text-gray-300 font-elegant">
              Across {mockUserData.totalArtists} artists
            </div>
          </div>

          <div className="glass-premium hover-lift card-entrance">
            <div className="flex items-center justify-between mb-4">
              <div className="poker-chip w-14 h-14 flex items-center justify-center">
                <UserGroupIcon className="w-7 h-7 text-black" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-royal-bold text-royal-gold">{formatCurrency(mockUserData.totalInvested)}</div>
                <div className="text-sm text-gray-300 font-elegant">Total Invested</div>
              </div>
            </div>
            <div className="text-sm text-gray-300 font-elegant">
              ROI: +{((mockUserData.totalEarnings / mockUserData.totalInvested) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio */}
          <div className="lg:col-span-2">
            <div className="glass-royal p-8 hover-lift">
              <h2 className="text-2xl font-royal-bold text-royal-gold mb-6 text-luxury">Your Royal Stakes</h2>
              <div className="space-y-4">
                {mockStakes.map((stake) => {
                  const ChangeIcon = getChangeIcon(stake.change);
                  return (
                    <div key={stake.id} className="card-luxury p-6 hover-glow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="poker-chip w-16 h-16 flex items-center justify-center mr-4">
                            <PlayIcon className="w-8 h-8 text-black" />
                          </div>
                          <div>
                            <h3 className="text-white font-royal font-semibold text-lg">{stake.artistName}</h3>
                            <p className="text-gray-300 text-sm font-elegant">{stake.genre}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-5 h-5 text-[#FFC700] mr-1" />
                          <span className="text-sm text-gray-200 font-elegant">{stake.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="glass-card p-3">
                          <div className="text-gray-300 text-xs mb-1 font-elegant">Staked</div>
                          <div className="text-white font-royal font-medium">{formatCurrency(stake.stakeAmount)}</div>
                        </div>
                        <div className="glass-card p-3">
                          <div className="text-gray-300 text-xs mb-1 font-elegant">Current Value</div>
                          <div className="text-white font-royal font-medium">{formatCurrency(stake.currentValue)}</div>
                        </div>
                        <div className="glass-card p-3">
                          <div className="text-gray-300 text-xs mb-1 font-elegant">Monthly Earnings</div>
                          <div className="text-[#FFC700] font-royal font-medium">{formatCurrency(stake.monthlyEarnings)}</div>
                        </div>
                        <div className="glass-card p-3">
                          <div className="text-gray-300 text-xs mb-1 font-elegant">Change</div>
                          <div className={`font-royal font-medium flex items-center ${getChangeColor(stake.change)}`}>
                            <ChangeIcon className="w-4 h-4 mr-1" />
                            +{stake.change}%
                          </div>
                        </div>
                      </div>

                      <div className="royal-divider"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm font-elegant">Shares: {stake.shares.toLocaleString()}</span>
                        <div className="flex space-x-3">
                          <button className="btn-royal-outline px-4 py-2 text-sm">
                            Add More
                          </button>
                          <button className="text-gray-400 hover:text-white text-sm transition-colors duration-200 font-elegant">
                            Withdraw
                          </button>
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
            <div className="glass-royal p-6 hover-lift">
              <h3 className="text-xl font-royal-bold text-royal-gold mb-6 text-luxury">Royal Actions</h3>
              <div className="space-y-4">
                <button className="w-full btn-royal py-3 font-royal">
                  Explore New Artists
                </button>
                <button className="w-full btn-royal-outline py-3 font-royal">
                  Claim Earnings
                </button>
                <button className="w-full glass-premium text-white py-3 rounded-lg font-royal font-medium hover:bg-[#334155] transition-colors duration-200 border border-[#FFC700]/30">
                  View Marketplace
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-royal p-6 hover-lift">
              <h3 className="text-xl font-royal-bold text-royal-gold mb-6 text-luxury">Royal Activity</h3>
              <div className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <div key={index} className="glass-card p-4 hover-glow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`poker-chip w-8 h-8 mr-3 ${
                          activity.type === 'stake' ? 'bg-[#FFC700]' : 'bg-green-400'
                        }`}></div>
                        <div>
                          <div className="text-white text-sm font-royal">
                            {activity.type === 'stake' ? 'Staked in' : 'Earned from'} {activity.artist}
                          </div>
                          <div className="text-gray-300 text-xs font-elegant">{activity.date}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-royal font-medium ${
                        activity.type === 'stake' ? 'text-[#FFC700]' : 'text-green-400'
                      }`}>
                        {activity.type === 'stake' ? '-' : '+'}{formatCurrency(activity.amount)}
                      </div>
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
