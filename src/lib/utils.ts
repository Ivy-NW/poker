import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'AVAX'): string {
  return `${amount.toFixed(3)} ${currency}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getRiskColor(risk: string): string {
  switch (risk.toLowerCase()) {
    case 'low':
      return 'text-green-400 bg-green-400/10 border-green-400/20';
    case 'medium':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    case 'high':
      return 'text-red-400 bg-red-400/10 border-red-400/20';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
}

export function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'text-gray-400 bg-gray-400/10';
    case 'rare':
      return 'text-blue-400 bg-blue-400/10';
    case 'epic':
      return 'text-purple-400 bg-purple-400/10';
    case 'legendary':
      return 'text-yellow-400 bg-yellow-400/10';
    default:
      return 'text-gray-400 bg-gray-400/10';
  }
}

export function calculateAPY(earnings: number, principal: number, timeInYears: number): number {
  if (principal === 0 || timeInYears === 0) return 0;
  return ((earnings / principal) / timeInYears) * 100;
}

export function formatTimeLeft(timeString: string): string {
  // Simple time formatting - in a real app, you'd use a proper date library
  return timeString;
}

export function truncateAddress(address: string, startLength: number = 6, endLength: number = 4): string {
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
