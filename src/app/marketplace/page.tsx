'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { PlayIcon, StarIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { withAuth } from '@/components/withAuth';

// Mock NFT marketplace data
const mockNFTs = [
  {
    id: 1,
    artistName: 'Luna Rivers',
    songTitle: 'Midnight Dreams',
    genre: 'Pop',
    price: 0.5,
    originalPrice: 0.4,
    shares: 1000,
    totalShares: 5000,
    rating: 4.8,
    monthlyStreams: 1200000,
    royaltyYield: 8.5,
    timeLeft: '2d 14h',
    image: '/api/placeholder/300/300',
    isAuction: false,
    seller: '0x1234...5678',
    rarity: 'Common',
    lastSale: 0.45,
  },
  {
    id: 2,
    artistName: 'Echo Beats',
    songTitle: 'Electric Nights',
    genre: 'Electronic',
    price: 0.8,
    originalPrice: 0.6,
    shares: 500,
    totalShares: 2000,
    rating: 4.2,
    monthlyStreams: 980000,
    royaltyYield: 12.3,
    timeLeft: '1d 8h',
    image: '/api/placeholder/300/300',
    isAuction: true,
    seller: '0x9876...5432',
    rarity: 'Rare',
    lastSale: 0.75,
  },
  {
    id: 3,
    artistName: 'Rock Anthem',
    songTitle: 'Thunder Road',
    genre: 'Rock',
    price: 1.2,
    originalPrice: 1.0,
    shares: 250,
    totalShares: 1500,
    rating: 4.5,
    monthlyStreams: 1500000,
    royaltyYield: 15.7,
    timeLeft: '5d 2h',
    image: '/api/placeholder/300/300',
    isAuction: false,
    seller: '0x5555...7777',
    rarity: 'Epic',
    lastSale: 1.15,
  },
  {
    id: 4,
    artistName: 'Midnight Jazz',
    songTitle: 'Blue Moon Serenade',
    genre: 'Jazz',
    price: 0.3,
    originalPrice: 0.25,
    shares: 2000,
    totalShares: 3500,
    rating: 3.9,
    monthlyStreams: 650000,
    royaltyYield: 6.2,
    timeLeft: '3d 16h',
    image: '/api/placeholder/300/300',
    isAuction: true,
    seller: '0x3333...9999',
    rarity: 'Common',
    lastSale: 0.28,
  },
];

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [sortBy, setSortBy] = useState('price-low');
  const [showAuctionsOnly, setShowAuctionsOnly] = useState(false);

  const genres = ['All', 'Pop', 'Electronic', 'Rock', 'Jazz', 'Hip Hop', 'Country'];
  const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];
  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'yield-high', label: 'Highest Yield' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'time-left', label: 'Ending Soon' },
  ];

  const filteredNFTs = mockNFTs
    .filter(nft => {
      const matchesSearch = nft.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nft.songTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nft.genre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || nft.genre === selectedGenre;
      const matchesRarity = selectedRarity === 'All' || nft.rarity === selectedRarity;
      const matchesAuction = !showAuctionsOnly || nft.isAuction;
      
      return matchesSearch && matchesGenre && matchesRarity && matchesAuction;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'yield-high': return b.royaltyYield - a.royaltyYield;
        case 'rating-high': return b.rating - a.rating;
        case 'time-left': return a.timeLeft.localeCompare(b.timeLeft);
        default: return 0;
      }
    });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 bg-gray-400/10';
      case 'Rare': return 'text-blue-400 bg-blue-400/10';
      case 'Epic': return 'text-purple-400 bg-purple-400/10';
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
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
            Royal NFT Marketplace
          </h1>
          <p className="text-gray-300 font-elegant text-lg">Buy and sell fractional music royalty NFTs with royal elegance</p>
          <div className="royal-divider"></div>
        </div>

        {/* Filters */}
        <div className="glass-royal p-8 mb-8 hover-lift">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#FFC700]" />
              <input
                type="text"
                placeholder="Search royal NFTs, artists, or songs..."
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
                className="appearance-none w-full glass-card px-4 py-4 text-white focus:outline-none focus:border-[#FFC700] pr-10 font-elegant"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-[#1E293B]">{genre}</option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFC700] pointer-events-none" />
            </div>

            {/* Rarity Filter */}
            <div className="relative">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="appearance-none w-full glass-card px-4 py-4 text-white focus:outline-none focus:border-[#FFC700] pr-10 font-elegant"
              >
                {rarities.map(rarity => (
                  <option key={rarity} value={rarity} className="bg-[#1E293B]">{rarity}</option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFC700] pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full glass-card px-4 py-4 text-white focus:outline-none focus:border-[#FFC700] pr-10 font-elegant"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-[#1E293B]">{option.label}</option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFC700] pointer-events-none" />
            </div>

            {/* Auction Toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer glass-card px-4 py-3 rounded-lg hover-glow">
                <input
                  type="checkbox"
                  checked={showAuctionsOnly}
                  onChange={(e) => setShowAuctionsOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  showAuctionsOnly ? 'bg-[#FFC700]' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    showAuctionsOnly ? 'transform translate-x-7' : ''
                  }`}></div>
                </div>
                <span className="ml-3 text-white font-elegant">Royal Auctions Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="card-luxury overflow-hidden hover-lift cursor-pointer group">
              {/* NFT Image */}
              <div className="relative h-56 bg-gradient-to-br from-[#FFC700]/30 to-[#000000]/80 parallax-bg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="poker-chip w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PlayIcon className="w-10 h-10 text-black" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className={`glass-card px-3 py-2 text-sm font-royal ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>

                {nft.isAuction && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-royal shadow-lg">
                    Royal Auction
                  </div>
                )}

                {/* Action Icons */}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200">
                    <HeartIcon className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200">
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* NFT Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white truncate">{nft.songTitle}</h3>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-[#FFC700] mr-1" />
                    <span className="text-sm text-gray-300">{nft.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-3">{nft.artistName} • {nft.genre}</p>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Monthly Streams</span>
                    <span className="text-white font-medium">{(nft.monthlyStreams / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Royalty Yield</span>
                    <span className="text-green-400 font-medium">{nft.royaltyYield}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Available Shares</span>
                    <span className="text-white font-medium">{nft.shares}/{nft.totalShares}</span>
                  </div>
                </div>

                {/* Price Info */}
                <div className="bg-[#1E293B] rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Current Price</span>
                    <div className="text-right">
                      <div className="text-[#FFC700] font-semibold">{formatCurrency(nft.price)}</div>
                      {nft.price !== nft.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">{formatCurrency(nft.originalPrice)}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Last Sale</span>
                    <span className="text-white text-sm">{formatCurrency(nft.lastSale)}</span>
                  </div>
                </div>

                {/* Time Left (for auctions) */}
                {nft.isAuction && (
                  <div className="flex items-center justify-center mb-4 text-sm">
                    <ClockIcon className="w-4 h-4 text-[#FFC700] mr-2" />
                    <span className="text-white">Ends in {nft.timeLeft}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-[#FFC700] text-[#1E293B] py-2 rounded-lg font-medium hover:bg-[#e6b300] transition-colors duration-200">
                    {nft.isAuction ? 'Place Bid' : 'Buy Now'}
                  </button>
                  <button className="px-3 py-2 border border-[#FFC700] text-[#FFC700] rounded-lg hover:bg-[#FFC700] hover:text-[#1E293B] transition-colors duration-200">
                    <ChartBarIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Seller Info */}
                <div className="mt-3 pt-3 border-t border-[#FFC700]/20">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Seller</span>
                    <span className="text-white font-mono">{nft.seller}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No NFTs found matching your criteria</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
                setSelectedRarity('All');
                setShowAuctionsOnly(false);
              }}
              className="text-[#FFC700] hover:text-[#e6b300] transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(MarketplacePage);
