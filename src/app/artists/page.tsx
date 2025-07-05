'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StarIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { PlayIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
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
