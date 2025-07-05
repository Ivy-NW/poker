'use client';

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
