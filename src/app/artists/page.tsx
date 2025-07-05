'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StarIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { PlayIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { withAuth } from '@/components/withAuth';

// Mock data for artists
const mockArtists = [
  {
    id: 1,
    name: 'Luna Rivers',
    genre: 'Pop',
    rating: 4.8,
    riskLevel: 'Low',
    totalStaked: 125000,
    monthlyStreams: 2500000,
    image: '/api/placeholder/300/300',
    description: 'Rising pop sensation with viral hits',
    nftPrice: 0.5,
    availableShares: 1000,
    totalShares: 5000,
  },
  {
    id: 2,
    name: 'Echo Beats',
    genre: 'Electronic',
    rating: 4.2,
    riskLevel: 'Medium',
    totalStaked: 89000,
    monthlyStreams: 1800000,
    image: '/api/placeholder/300/300',
    description: 'Electronic music producer with growing fanbase',
    nftPrice: 0.3,
    availableShares: 2500,
    totalShares: 4000,
  },
  {
    id: 3,
    name: 'Midnight Jazz',
    genre: 'Jazz',
    rating: 3.9,
    riskLevel: 'High',
    totalStaked: 45000,
    monthlyStreams: 950000,
    image: '/api/placeholder/300/300',
    description: 'Contemporary jazz artist with unique sound',
    nftPrice: 0.2,
    availableShares: 3000,
    totalShares: 3500,
  },
  {
    id: 4,
    name: 'Rock Anthem',
    genre: 'Rock',
    rating: 4.5,
    riskLevel: 'Low',
    totalStaked: 156000,
    monthlyStreams: 3200000,
    image: '/api/placeholder/300/300',
    description: 'Classic rock band with loyal following',
    nftPrice: 0.8,
    availableShares: 500,
    totalShares: 2000,
  },
];

const ArtistsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');

  const genres = ['All', 'Pop', 'Electronic', 'Jazz', 'Rock', 'Hip Hop', 'Country'];
  const riskLevels = ['All', 'Low', 'Medium', 'High'];

  const filteredArtists = mockArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || artist.genre === selectedGenre;
    const matchesRisk = selectedRisk === 'All' || artist.riskLevel === selectedRisk;
    
    return matchesSearch && matchesGenre && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'High': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen py-8 parallax-container">
      <div className="parallax-bg"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-royal-bold text-royal-gold mb-4 text-luxury">
            Discover Royal Artists
          </h1>
          <p className="text-gray-300 font-elegant text-lg">Invest in talented artists and earn music royalties with royal precision</p>
          <div className="royal-divider"></div>
        </div>

        {/* Search and Filters */}
        <div className="glass-royal p-8 mb-8 hover-lift">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#FFC700]" />
              <input
                type="text"
                placeholder="Search royal artists or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-card text-white placeholder-gray-300 focus:outline-none focus:border-[#FFC700] transition-all duration-300 font-elegant text-lg"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="appearance-none glass-card px-6 py-4 text-white focus:outline-none focus:border-[#FFC700] pr-12 font-elegant text-lg"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-[#1E293B]">{genre}</option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#FFC700] pointer-events-none" />
            </div>

            {/* Risk Filter */}
            <div className="relative">
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="appearance-none glass-card px-6 py-4 text-white focus:outline-none focus:border-[#FFC700] pr-12 font-elegant text-lg"
              >
                {riskLevels.map(risk => (
                  <option key={risk} value={risk} className="bg-[#1E293B]">Risk: {risk}</option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#FFC700] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="card-luxury overflow-hidden hover-lift cursor-pointer group">
              {/* Artist Image */}
              <div className="relative h-56 bg-gradient-to-br from-[#FFC700]/30 to-[#000000]/80 parallax-bg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="poker-chip w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PlayIcon className="w-10 h-10 text-black" />
                  </div>
                </div>
                {/* Risk Badge */}
                <div className={`absolute top-4 right-4 px-3 py-2 glass-card text-sm font-royal ${getRiskColor(artist.riskLevel)}`}>
                  {artist.riskLevel} Risk
                </div>
              </div>

              {/* Artist Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-royal-bold text-white group-hover:text-royal-gold transition-colors duration-300">{artist.name}</h3>
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-[#FFC700] mr-1" />
                    <span className="text-sm text-gray-200 font-elegant">{artist.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4 font-elegant">{artist.genre} • {artist.description}</p>

                {/* Stats */}
                <div className="space-y-3 mb-5">
                  <div className="glass-card p-3 flex items-center justify-between text-sm">
                    <span className="text-gray-300 flex items-center font-elegant">
                      <CurrencyDollarIcon className="w-4 h-4 mr-2 text-[#FFC700]" />
                      Total Staked
                    </span>
                    <span className="text-white font-royal font-medium">${artist.totalStaked.toLocaleString()}</span>
                  </div>
                  <div className="glass-card p-3 flex items-center justify-between text-sm">
                    <span className="text-gray-300 flex items-center font-elegant">
                      <UserGroupIcon className="w-4 h-4 mr-2 text-[#FFC700]" />
                      Monthly Streams
                    </span>
                    <span className="text-white font-royal font-medium">{(artist.monthlyStreams / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                {/* NFT Info */}
                <div className="glass-premium p-4 mb-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-300 font-elegant">NFT Price</span>
                    <span className="text-[#FFC700] font-royal font-semibold">{artist.nftPrice} AVAX</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 font-elegant">Available</span>
                    <span className="text-white font-royal">{artist.availableShares}/{artist.totalShares}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/artists/${artist.id}`}
                  className="w-full btn-royal py-3 text-center block font-royal"
                >
                  View Royal Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-royal p-8 max-w-md mx-auto">
              <div className="text-gray-300 mb-6 font-elegant text-lg">No royal artists found matching your criteria</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('All');
                  setSelectedRisk('All');
                }}
                className="btn-royal-outline px-6 py-3 font-royal"
              >
                Clear Royal Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ArtistsPage);
