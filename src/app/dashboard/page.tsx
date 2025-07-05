'use client';

import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon, StarIcon, PlayIcon } from '@heroicons/react/24/solid';
import { withAuth } from '@/components/withAuth';
import MintArtistNFTForm from '@/components/MintArtistNFTForm';

const DashboardPage = () => {


  return (
    <div className="min-h-screen py-8 parallax-container">
      <MintArtistNFTForm/>
    </div>
  );
};

export default withAuth(DashboardPage);
