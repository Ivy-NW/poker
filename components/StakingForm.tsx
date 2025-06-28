// components/StakingForm.tsx
import React, { useState } from 'react';

interface StakingFormProps {
  availableNfts: Array<{ id: string; name: string }>; // Example: NFTs available to stake
  onStake: (nftId: string, amount: number) => void; // Callback for when stake action is performed
}

const StakingForm: React.FC<StakingFormProps> = ({ availableNfts, onStake }) => {
  const [selectedNft, setSelectedNft] = useState<string>(availableNfts[0]?.id || '');
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNft || amount <= 0) {
      alert('Please select an NFT and enter a valid amount to stake.');
      return;
    }
    onStake(selectedNft, amount);
    // Reset form or provide feedback
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 shadow-lg rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold text-primary-gold mb-4">Stake Your NFTs</h3>

      <div>
        <label htmlFor="nft-select" className="block text-sm font-medium text-secondary-white mb-1">
          Select NFT to Stake:
        </label>
        <select
          id="nft-select"
          value={selectedNft}
          onChange={(e) => setSelectedNft(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-secondary-white border border-slate-600 focus:ring-secondary-light-blue focus:border-secondary-light-blue"
        >
          {availableNfts.length === 0 && <option value="">No NFTs available</option>}
          {availableNfts.map((nft) => (
            <option key={nft.id} value={nft.id}>
              {nft.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="stake-amount" className="block text-sm font-medium text-secondary-white mb-1">
          Amount to Stake (shares/fractions):
        </label>
        <input
          type="number"
          id="stake-amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
          className="w-full p-2 rounded bg-slate-700 text-secondary-white border border-slate-600 focus:ring-secondary-light-blue focus:border-secondary-light-blue"
          placeholder="Enter amount"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-secondary-light-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50"
        disabled={!selectedNft || amount <= 0}
      >
        Stake Now
      </button>
    </form>
  );
};

export default StakingForm;
