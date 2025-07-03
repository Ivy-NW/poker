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
    <div className="min-h-screen bg-[#1E293B] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Discover Artists</h1>
          <p className="text-gray-400">Invest in talented artists and earn music royalties</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#0F172A] rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search artists or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1E293B] border border-[#FFC700]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FFC700]"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="appearance-none bg-[#1E293B] border border-[#FFC700]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FFC700] pr-8"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Risk Filter */}
            <div className="relative">
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="appearance-none bg-[#1E293B] border border-[#FFC700]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FFC700] pr-8"
              >
                {riskLevels.map(risk => (
                  <option key={risk} value={risk}>Risk: {risk}</option>
                ))}
              </select>
              <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="bg-[#0F172A] rounded-xl overflow-hidden border border-[#FFC700]/20 hover:border-[#FFC700]/40 transition-all duration-200 hover:transform hover:scale-105">
              {/* Artist Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#FFC700]/20 to-[#818CF8]/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#FFC700] rounded-full flex items-center justify-center">
                    <PlayIcon className="w-8 h-8 text-[#1E293B]" />
                  </div>
                </div>
                {/* Risk Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(artist.riskLevel)}`}>
                  {artist.riskLevel} Risk
                </div>
              </div>

              {/* Artist Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-[#FFC700] mr-1" />
                    <span className="text-sm text-gray-300">{artist.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-3">{artist.genre} • {artist.description}</p>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center">
                      <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                      Total Staked
                    </span>
                    <span className="text-white font-medium">${artist.totalStaked.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1" />
                      Monthly Streams
                    </span>
                    <span className="text-white font-medium">{(artist.monthlyStreams / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                {/* NFT Info */}
                <div className="bg-[#1E293B] rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">NFT Price</span>
                    <span className="text-[#FFC700] font-semibold">{artist.nftPrice} AVAX</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Available</span>
                    <span className="text-white">{artist.availableShares}/{artist.totalShares}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/artists/${artist.id}`}
                  className="w-full bg-[#FFC700] text-[#1E293B] py-2 rounded-lg font-medium hover:bg-[#e6b300] transition-colors duration-200 text-center block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No artists found matching your criteria</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
                setSelectedRisk('All');
              }}
              className="text-[#FFC700] hover:text-[#e6b300] transition-colors duration-200"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ArtistsPage);
