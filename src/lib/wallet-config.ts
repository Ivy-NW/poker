'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalanche, avalancheFuji } from 'wagmi/chains';

// Configure the Avalanche chain for the wallet
export const config = getDefaultConfig({
  appName: 'Royalty - Music Investment Platform',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '2f5a2b1c8d3e4f5a6b7c8d9e0f1a2b3c',
  chains: [avalanche, avalancheFuji],
  ssr: false, // Disable SSR to avoid indexedDB issues
});

// Export chains for use in other components
export { avalanche, avalancheFuji };
