'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const WalletProviders = dynamic(
  () => import("@/components/WalletProviders").then((mod) => ({ default: mod.WalletProviders })),
  { ssr: false }
);

const WalletAuthProvider = dynamic(
  () => import("@/contexts/WalletAuthContext").then((mod) => ({ default: mod.WalletAuthProvider })),
  { ssr: false }
);

interface ClientWalletWrapperProps {
  children: ReactNode;
}

export function ClientWalletWrapper({ children }: ClientWalletWrapperProps) {
  return (
    <WalletProviders>
      <WalletAuthProvider>
        {children}
      </WalletAuthProvider>
    </WalletProviders>
  );
}
