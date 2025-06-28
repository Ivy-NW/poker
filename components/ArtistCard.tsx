// components/ArtistCard.tsx
import React from 'react';

interface ArtistCardProps {
  artistName: string;
  rating: number;
  riskLevel: string;
  investmentTarget: string;
  imageUrl?: string; // Optional image URL
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  artistName,
  rating,
  riskLevel,
  investmentTarget,
  imageUrl = '/images/placeholder.jpg', // Default placeholder
}) => {
  return (
    <div className="bg-slate-800 shadow-lg rounded-lg p-6 m-4 max-w-sm hover:shadow-primary-gold/50 transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={`${artistName} - Artist`}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-2xl font-bold text-primary-gold mb-2">{artistName}</h3>
      <p className="text-secondary-white mb-1">
        Rating: <span className="font-semibold">{rating.toFixed(1)} / 5.0</span>
      </p>
      <p className="text-secondary-white mb-1">
        Risk Level: <span className="font-semibold">{riskLevel}</span>
      </p>
      <p className="text-secondary-white mb-4">
        Investment Target: <span className="font-semibold">{investmentTarget}</span>
      </p>
      <button className="w-full bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        View Details
      </button>
    </div>
  );
};

export default ArtistCard;
