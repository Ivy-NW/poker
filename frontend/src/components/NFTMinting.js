// frontend/src/components/NFTMinting.js
import React, { useState } from 'react';

const NFTMinting = () => {
  const [metadataURI, setMetadataURI] = useState('');
  const [initialRating, setInitialRating] = useState(''); // e.g., 3.5
  const [investmentTarget, setInvestmentTarget] = useState('');

  const handleMint = () => {
    // Logic to mint NFT
    console.log('Minting NFT with:', { metadataURI, initialRating, investmentTarget });
    // This would interact with blockchainService.js
  };

  return (
    <div>
      <h3>Mint Royalty NFT</h3>
      <div>
        <label htmlFor="metadataURI">Metadata URI (e.g., IPFS link): </label>
        <input
          type="text"
          id="metadataURI"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
          placeholder="ipfs://..."
        />
      </div>
      <div>
        <label htmlFor="initialRating">Initial Artist Rating (2.5-5.0): </label>
        <input
          type="number"
          id="initialRating"
          value={initialRating}
          step="0.1"
          min="2.5"
          max="5.0"
          onChange={(e) => setInitialRating(e.target.value)}
          placeholder="e.g., 3.5"
        />
      </div>
      <div>
        <label htmlFor="investmentTarget">Initial Investment Target (AVAX): </label>
        <input
          type="number"
          id="investmentTarget"
          value={investmentTarget}
          onChange={(e) => setInvestmentTarget(e.target.value)}
          placeholder="e.g., 100 AVAX"
        />
      </div>
      <button onClick={handleMint} style={{ marginTop: '10px' }}>
        Mint NFT
      </button>
    </div>
  );
};

export default NFTMinting;
