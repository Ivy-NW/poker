'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { MusicalNoteIcon, ChartBarIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import { useWalletAuth } from '@/contexts/WalletAuthContext';
import ThemeToggle from './ThemeToggle';

const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => ({ default: mod.ConnectButton })),
  { ssr: false }
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useWalletAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Artists', href: '/artists', icon: MusicalNoteIcon },
    { name: 'Marketplace', href: '/marketplace', icon: CurrencyDollarIcon },
    { name: 'Staking', href: '/staking', icon: UserGroupIcon },
  ];

  return (
    <nav className="glass-navbar rounded-container sticky top-0 z-50 mx-4 mt-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover-glow rounded-lg p-2 transition-all duration-300">
              <div className="w-10 h-10 relative">
                <Image
                  src="/favicon.ico"
                  alt="Royalty Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <span className="text-2xl font-royal font-bold text-[#FFC700] text-shimmer">Royalty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isConnected && navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-[#FFC700] transition-all duration-300 px-4 py-2 rounded-lg hover-lift btn-animate font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle and Connect Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <div className="btn-animate">
              <ConnectButton />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-[#FFC700] transition-all duration-300 p-2 rounded-lg hover-glow"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-3 glass-card mt-2 mx-4 rounded-lg">
            {isConnected && navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#FFC700] hover-lift glass-card px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#FFC700]/20">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
