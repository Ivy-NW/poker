'use client';

import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle p-2 rounded-lg glass-card hover-glow transition-all duration-300 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5 text-[#FFC700] group-hover:text-[#e6b300]" />
      ) : (
        <SunIcon className="w-5 h-5 text-[#FFC700] group-hover:text-[#e6b300]" />
      )}
    </button>
  );
};

export default ThemeToggle;
