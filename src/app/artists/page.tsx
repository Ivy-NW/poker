'use client';

import { withAuth } from '@/components/withAuth';
import ViewArtistsComponent from '@/components/viewArtists';


const ArtistsPage = () => {
  


  return (
    <div className="min-h-screen py-8 parallax-container">
     <ViewArtistsComponent/>
    </div>
  );
};

export default withAuth(ArtistsPage);
