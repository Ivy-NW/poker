'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

interface WalletAuthContextType {
  isConnected: boolean;
  address: string | undefined;
  isConnecting: boolean;
  isReconnecting: boolean;
  disconnect: () => void;
}

const WalletAuthContext = createContext<WalletAuthContextType | undefined>(undefined);

interface WalletAuthProviderProps {
  children: ReactNode;
}

export function WalletAuthProvider({ children }: WalletAuthProviderProps) {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { disconnect } = useDisconnect();

  const value: WalletAuthContextType = {
    isConnected,
    address,
    isConnecting,
    isReconnecting,
    disconnect,
  };

  return (
    <WalletAuthContext.Provider value={value}>
      {children}
    </WalletAuthContext.Provider>
  );
}

export function useWalletAuth() {
  const context = useContext(WalletAuthContext);
  if (context === undefined) {
    throw new Error('useWalletAuth must be used within a WalletAuthProvider');
  }
  return context;
}

// Hook to check if user is authenticated (has connected wallet)
export function useIsAuthenticated() {
  const { isConnected } = useWalletAuth();
  return isConnected;
}
