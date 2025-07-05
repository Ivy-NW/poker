'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletAuth } from '@/contexts/WalletAuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isConnected, isConnecting, isReconnecting } = useWalletAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're sure the wallet is not connected and not in a loading state
    if (!isConnecting && !isReconnecting && !isConnected) {
      router.push('/');
    }
  }, [isConnected, isConnecting, isReconnecting, router]);

  // Show loading state while checking connection
  if (isConnecting || isReconnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1E293B]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC700] mx-auto mb-4"></div>
          <p className="text-gray-300">Connecting to wallet...</p>
        </div>
      </div>
    );
  }

  // If not connected, show fallback or redirect
  if (!isConnected) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1E293B]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-[#FFC700]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#FFC700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Required</h2>
          <p className="text-gray-300 mb-6">
            Please connect your wallet to access this page. You&apos;ll be redirected to the home page to connect your wallet.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#FFC700] text-[#1E293B] px-6 py-3 rounded-lg font-semibold hover:bg-[#e6b300] transition-colors duration-200"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }

  // If connected, render the protected content
  return <>{children}</>;
}
