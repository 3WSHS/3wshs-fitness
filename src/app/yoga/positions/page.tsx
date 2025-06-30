'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { yogaPoses, getPosesByCategory, YogaPose } from '@/data/yogaPoses';
import YogaPoseModal from '@/components/YogaPoseModal';

const categories = [
  'Biceps',
  'Traps (mid-back)',
  'Lower back',
  'Abdominals',
  'Forearms',
  'Glutes',
  'Hamstrings',
  'Lats',
  'Shoulders',
  'Lateral Deltoid',
  'Anterior Deltoid',
  'Posterior Deltoid',
  'Triceps',
  'Traps',
  'Quads',
  'Chest',
  'Obliques',
  'Front Shoulders',
  'Rear Shoulders',
];

export default function YogaPosesPage() {
  const params = useParams();
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const category = params?.category as string;
  const poses = category ? getPosesByCategory(category) : [];

  const handlePoseClick = (pose: YogaPose) => {
    setSelectedPose(pose);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101112] via-[#18191c] to-[#0a0a0c] p-8 flex flex-col items-center">
      {/* Animated glowing orb and subtitle */}
      <div className="flex flex-col items-center mb-8 mt-2">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_48px_16px_rgba(59,130,246,0.25)] animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-2xl animate-pulse" />
        </div>
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-tight mb-2">Yoga Poses</h1>
        <p className="text-lg text-blue-200 drop-shadow mb-2 animate-fade-in">Select a category to explore poses</p>
      </div>

      {!category ? (
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat}
              href={`/yoga/positions/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative group bg-gradient-to-br from-[#23263a] via-[#181c24] to-[#23263a] rounded-2xl shadow-xl border border-white/5 hover:border-blue-500/40 hover:shadow-blue-500/30 transition-all duration-300 p-6 flex items-center min-h-[80px] cursor-pointer overflow-hidden"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-blue-900/10 transition-all duration-300" />
              <span className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-blue-500 opacity-10 blur-2xl group-hover:opacity-20 transition-all duration-300" />
              <h2 className="text-2xl font-bold text-white drop-shadow group-hover:text-blue-400 transition-colors duration-300 z-10">{cat}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {poses.map((pose) => (
            <button
              key={pose.id}
              onClick={() => handlePoseClick(pose)}
              className="bg-gray-800 p-4 rounded shadow-lg hover:bg-gray-700 transition-colors text-left"
            >
              <h2 className="text-xl font-semibold text-white mb-2">{pose.name}</h2>
              <p className="text-gray-300 text-sm mb-2">{pose.description}</p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                pose.difficulty === 'Beginner' ? 'bg-green-500' :
                pose.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                'bg-red-500'
              } text-white`}>
                {pose.difficulty}
              </span>
            </button>
          ))}
        </div>
      )}

      <YogaPoseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pose={selectedPose}
      />
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(.4,2,.6,1) both;
        }
      `}</style>
    </div>
  );
} 