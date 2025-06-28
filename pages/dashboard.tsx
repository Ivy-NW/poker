// pages/dashboard.tsx
import Head from 'next/head';
import React, { useState, useContext, useEffect } from 'react';
import { WalletContext } from './_app'; // Adjust path as needed
import DashboardWidget from '../components/DashboardWidget'; // Assuming DashboardWidget is created
import Link from 'next/link';

// Dummy data structures
interface PortfolioSummary {
  totalValueStaked: number; // In AVAX or USD equivalent
  totalRoyaltiesEarned: number; // In AVAX
  activeStakesCount: number;
  portfolioChange24h: number; // Percentage
}

interface StakedNftPerformance {
  id: string; // Staked NFT identifier
  nftName: string;
  stakedValue: number; // Current value of this stake
  earnedThisPeriod: number; // Royalties earned recently
  totalEarned: number;
  nftImageUrl?: string;
}

interface RecentActivity {
  id: string;
  type: 'stake' | 'claim' | 'purchase' | 'sale';
  description: string;
  timestamp: string; // ISO date string
  amount?: string; // e.g., "+ 0.5 AVAX" or "NFT X"
}

// Mock function to fetch dashboard data - replace with actual API/contract calls
const fetchDashboardData = async (userAddress: string | null): Promise<{
  summary: PortfolioSummary;
  performance: StakedNftPerformance[];
  activity: RecentActivity[];
} | null> => {
  if (!userAddress) return null;
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate delay

  // Simulate some data
  return {
    summary: {
      totalValueStaked: 1250.75, // Example value
      totalRoyaltiesEarned: 88.50,
      activeStakesCount: 3,
      portfolioChange24h: 1.5, // +1.5%
    },
    performance: [
      { id: 'perf001', nftName: 'Genesis Sparkle - Staked', stakedValue: 500, earnedThisPeriod: 5.2, totalEarned: 25.5, nftImageUrl: '/images/placeholder.jpg' },
      { id: 'perf002', nftName: 'Anthem X Royalty - Staked', stakedValue: 350, earnedThisPeriod: 3.1, totalEarned: 18.0, nftImageUrl: '/images/placeholder.jpg' },
      { id: 'perf003', nftName: 'Funky Times Vol. 1 - Staked', stakedValue: 400.75, earnedThisPeriod: 7.5, totalEarned: 45.0, nftImageUrl: '/images/placeholder.jpg' },
    ],
    activity: [
      { id: 'act001', type: 'claim', description: 'Claimed royalties', amount: '+ 1.25 AVAX', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() }, // 2 hours ago
      { id: 'act002', type: 'stake', description: 'Staked "Neon Dreams EP"', amount: '5 shares', timestamp: new Date(Date.now() - 3600000 * 24).toISOString() }, // 1 day ago
      { id: 'act003', type: 'purchase', description: 'Purchased "Future Retro Single"', amount: '1 NFT', timestamp: new Date(Date.now() - 3600000 * 48).toISOString() }, // 2 days ago
    ],
  };
};


export default function DashboardPage() {
  const walletContext = useContext(WalletContext);
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [performance, setPerformance] = useState<StakedNftPerformance[]>([]);
  const [activity, setActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletContext?.isConnected && walletContext.address) {
      setLoading(true);
      fetchDashboardData(walletContext.address).then(data => {
        if (data) {
          setSummary(data.summary);
          setPerformance(data.performance);
          setActivity(data.activity);
        }
        setLoading(false);
      });
    } else {
      setSummary(null);
      setPerformance([]);
      setActivity([]);
      setLoading(false);
    }
  }, [walletContext?.isConnected, walletContext?.address]);

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  if (!walletContext?.isConnected) {
    return (
      <div className="text-center bg-slate-800 p-8 rounded-lg shadow-xl mt-10">
        <h1 className="text-2xl font-bold text-primary-gold mb-4">Investor Dashboard</h1>
        <p className="text-xl text-secondary-white mb-4">Please connect your wallet to view your portfolio performance and activity.</p>
        <button
          onClick={walletContext?.connectWallet}
          className="bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-10">Loading dashboard data...</div>;
  }

  if (!summary) {
     return (
        <div className="text-center py-10 bg-slate-800 p-8 rounded-lg shadow-xl mt-10">
            <h1 className="text-2xl font-bold text-primary-gold mb-4">Investor Dashboard</h1>
            <p className="text-xl text-secondary-white mb-4">No dashboard data available. Start by staking some NFTs!</p>
            <Link href="/staking" legacyBehavior>
                <a className="bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
                    Go to Staking
                </a>
            </Link>
        </div>
     );
  }


  return (
    <>
      <Head>
        <title>Dashboard | Royalty Music Platform</title>
        <meta name="description" content="Monitor your portfolio performance, royalty earnings, and risk metrics." />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary-gold mb-8">Investor Dashboard</h1>

        {/* Summary Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardWidget
            title="Total Value Staked"
            value={`${summary.totalValueStaked.toLocaleString('en-US', { style: 'currency', currency: 'AVAX' , minimumFractionDigits: 2, maximumFractionDigits: 2})}`} // Assuming AVAX or similar crypto
            description={`Portfolio change (24h): ${summary.portfolioChange24h >= 0 ? '+' : ''}${summary.portfolioChange24h}%`}
          />
          <DashboardWidget
            title="Total Royalties Earned"
            value={`${summary.totalRoyaltiesEarned.toLocaleString('en-US', { style: 'currency', currency: 'AVAX', minimumFractionDigits: 4, maximumFractionDigits: 4 })}`}
            description="Across all staked assets"
          />
          <DashboardWidget
            title="Active Stakes"
            value={summary.activeStakesCount}
            description="NFTs currently earning royalties"
          />
           <DashboardWidget
            title="Risk Overview" // Placeholder
            value="Balanced"
            description="Overall portfolio risk level (Simulated)"
          />
        </section>

        {/* Staked NFT Performance */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-secondary-light-blue mb-6">Your Staked NFTs Performance</h2>
          {performance.length > 0 ? (
            <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-xl">
              <table className="min-w-full">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="text-left p-4 font-semibold text-primary-gold">NFT Name</th>
                    <th className="text-right p-4 font-semibold text-primary-gold">Staked Value (AVAX)</th>
                    <th className="text-right p-4 font-semibold text-primary-gold">Earned (Period)</th>
                    <th className="text-right p-4 font-semibold text-primary-gold">Total Earned (AVAX)</th>
                  </tr>
                </thead>
                <tbody>
                  {performance.map(p => (
                    <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="p-4 flex items-center">
                        {p.nftImageUrl && <img src={p.nftImageUrl} alt={p.nftName} className="w-10 h-10 rounded-md mr-3 object-cover"/>}
                        {p.nftName}
                      </td>
                      <td className="text-right p-4">{p.stakedValue.toFixed(2)}</td>
                      <td className="text-right p-4 text-green-400">{`+ ${p.earnedThisPeriod.toFixed(4)}`}</td>
                      <td className="text-right p-4">{p.totalEarned.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-secondary-white">No performance data available. Stake some NFTs to see their performance.</p>
          )}
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary-light-blue mb-6">Recent Activity</h2>
          {activity.length > 0 ? (
            <div className="bg-slate-800 rounded-lg shadow-xl p-6">
              <ul>
                {activity.map(a => (
                  <li key={a.id} className="border-b border-slate-700 py-3 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className={`capitalize font-semibold ${
                            a.type === 'stake' || a.type === 'purchase' ? 'text-blue-400' :
                            a.type === 'claim' ? 'text-green-400' : 'text-yellow-400' // sale or other
                        }`}>
                            {a.type}
                        </span>: {a.description}
                      </div>
                      <div className="text-right">
                        {a.amount && <p className="font-semibold text-sm">{a.amount}</p>}
                        <p className="text-xs text-gray-400">{formatTimestamp(a.timestamp)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-secondary-white">No recent activity to display.</p>
          )}
        </section>
      </div>
    </>
  );
}
