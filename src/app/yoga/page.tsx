'use client';

import React from 'react';
import FuturisticBackground from '@/components/FuturisticBackground';
import YogaCategoryMap from '@/components/YogaCategoryMap';

export default function YogaPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#101112] via-[#18191c] to-[#0a0a0c]">
      {/* Full-viewport network/particle effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FuturisticBackground />
      </div>
      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-16">
        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Yoga</h1>
        <p className="text-lg text-blue-200 mb-10 drop-shadow">Explore yoga poses by category. Click a node to begin.</p>
        <YogaCategoryMap />
      </div>
    </div>
  );
} 