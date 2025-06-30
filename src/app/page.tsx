"use client";
import Image from "next/image";
import Link from "next/link";
import FuturisticBackground from "@/components/FuturisticBackground";
import exercisesData from '../data/exercises.json';
import { useState, useRef, useEffect } from "react";

export default function Home() {
  // Remove drag-and-drop and dev logic, add hardcoded positions
  const muscleMapPositions: { [key: string]: { top: number; left: number } } = {
    "biceps": { "top": 23.758469687567818, "left": 15.077718098958334 },
    "long-head-bicep": { "top": 26.514381832546658, "left": 14.84375 },
    "short-head-bicep": { "top": 27.053568098280167, "left": 11.692301432291668 },
    "traps-mid-back": { "top": 24.916452831692165, "left": 71.588134765625 },
    "lower-back": { "top": 35.01697116427952, "left": 72.369384765625 },
    "abdominals": { "top": 32.27665159437392, "left": 24.223836263020836 },
    "lower-abdominals": { "top": 38.64792717827691, "left": 24.354044596354164 },
    "upper-abdominals": { "top": 27.506134245130752, "left": 24.223836263020836 },
    "calves": { "top": 70.67559030320909, "left": 21.7498779296875 },
    "tibialis": { "top": 76.38237741258409, "left": 29.6875 },
    "soleus": { "top": 80.2425119611952, "left": 69.30643717447916 },
    "gastrocnemius": { "top": 72.63613806830513, "left": 75.81685384114584 },
    "forearms": { "top": 31.71103795369466, "left": 39.09810384114583 },
    "wrist-extensors": { "top": 36.156654357910156, "left": 39.7491455078125 },
    "wrist-flexors": { "top": 33.48390791151259, "left": 11.103312174479168 },
    "glutes": { "top": 40.72893990410699, "left": 76.89005533854166 },
    "gluteus-medius": { "top": 39.61930274963379, "left": 68.035888671875 },
    "gluteus-maximus": { "top": 44.02444627549913, "left": 72.20255533854166 },
    "hamstrings": { "top": 54.52198452419705, "left": 75.067138671875 },
    "medial-hamstrings": { "top": 61.95317374335395, "left": 68.426513671875 },
    "lateral-hamstrings": { "top": 53.32822799682617, "left": 68.45804850260416 },
    "lats": { "top": 28.514210383097332, "left": 77.31221516927084 },
    "shoulders": { "top": 40, "left": 82 },
    "lateral-deltoid": { "top": 17.861901389227974, "left": 79.94791666666666 },
    "anterior-deltoid": { "top": 16.44208166334364, "left": 62.760416666666664 },
    "posterior-deltoid": { "top": 22.781753540039062, "left": 66.14583333333334 },
    "triceps": { "top": 24.302668041653103, "left": 84.11458333333334 },
    "long-head-tricep": { "top": 28.73098585340712, "left": 60.15625 },
    "lateral-head-triceps": { "top": 28.508196936713325, "left": 82.94270833333334 },
    "medial-head-triceps": { "top": 22.993146048651802, "left": 58.723958333333336 },
    "traps": { "top": 19.691027535332573, "left": 71.77530924479166 },
    "upper-traps": { "top": 13.341495725843641, "left": 71.64510091145834 },
    "lower-traps": { "top": 29.377290937635635, "left": 71.514892578125 },
    "quads": { "top": 57.67774052090115, "left": 29.848225911458332 },
    "inner-thigh": { "top": 56.93128373887804, "left": 22.947184244791664 },
    "inner-quadriceps": { "top": 51.03867318895128, "left": 28.7078857421875 },
    "outer-quadricep": { "top": 52.48009363810221, "left": 17.900594075520836 },
    "rectus-femoris": { "top": 51.262664794921875, "left": 23.108927408854164 },
    "chest": { "top": 17.515299055311413, "left": 25.1922607421875 },
    "upper-pectoralis": { "top": 17.171462376912437, "left": 21.025594075520836 },
    "mid-lower-chest": { "top": 23.14096556769477, "left": 24.609375 },
    "obliques": { "top": 33.70114962259929, "left": 29.6875 },
    "hands": { "top": 41.08487764994304, "left": 54.781087239583336 },
    "feet": { "top": 90.87527592976889, "left": 29.781087239583332 },
    "front-shoulders": { "top": 16.16604063245985, "left": 32.77587890625 },
    "rear-shoulders": { "top": 10, "left": 172 },
    "neck": { "top": 25, "left": 172 }
  };

  return (
    <main className="min-h-screen p-8 bg-[#111215] relative overflow-hidden">
      <FuturisticBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header Box with Orbs */}
        <div className="relative rounded-3xl bg-[#18191c] shadow-lg mb-10 py-10 px-4 flex flex-col items-center overflow-hidden">
          {/* Animated Orbs */}
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-200 opacity-20 rounded-full blur-3xl animate-pulse-slow" style={{ zIndex: 1 }} />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-2xl animate-pulse-slower" style={{ zIndex: 1 }} />
          <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-blue-100 opacity-10 rounded-full blur-2xl animate-pulse" style={{ zIndex: 1 }} />
          <h1 className="text-5xl font-bold text-center text-white relative z-10">Welcome to Your Fitness Trainer</h1>
          <p className="text-lg text-center text-gray-300 mt-2 relative z-10">A futuristic home for your fitness and routines.</p>
        </div>
        
        {/* Muscle Map */}
        <div className="relative w-full aspect-[4/3] max-w-3xl mx-auto mb-12 animate-float">
          <Image
            id="muscle-map-img"
            src="/images/muscle-map.png"
            alt="Interactive Muscle Map"
            fill
            className="object-contain"
            priority
          />
          {/* Interactive Muscle Areas - static production version */}
          <div className="absolute inset-0">
            {exercisesData.muscleGroups.map((group) => {
              const pos = muscleMapPositions[group.id] || { top: 10, left: 10 };
              const isLeft = pos.left < 50;
              return (
                <Link
                  key={group.id}
                  href={`/exercises/${group.id}`}
                  className="absolute z-10 rounded-full transition-colors duration-200 cursor-pointer group"
                  style={{
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    width: '4%',
                    height: '4%'
                  }}
                  aria-label={`${group.name} exercises`}
                  draggable={false}
                >
                  {/* Glowing node at center */}
                  <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.7)] pointer-events-none" />
                  {/* Sci-fi animated outer data circle on hover */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block group-focus:block z-10">
                    <div className="w-8 h-8 rounded-full border-2 border-white neon-glow-sci-fi-white animate-sci-fi-outer-circle" />
                  </div>
                  {/* Sci-fi animated line and label on hover, direction based on node position */}
                  {isLeft ? (
                    <div className="pointer-events-none select-none hidden group-hover:flex group-focus:flex flex-row-reverse items-center absolute right-full top-1/2 -translate-y-1/2 z-20">
                      {/* Animated horizontal line to left */}
                      <div className="origin-right h-0.5 bg-white neon-glow-sci-fi-white animate-sci-fi-line-horizontal-left w-0 group-hover:animate-sci-fi-line-horizontal-left group-focus:animate-sci-fi-line-horizontal-left" style={{width: '80px'}} />
                      {/* Animated label at end of line */}
                      <span className="mr-3 px-4 py-1 text-sm font-mono tracking-widest text-white neon-glow-sci-fi-white animate-sci-fi-label-horizontal-left uppercase" style={{letterSpacing: '0.15em'}}>
                        {group.name}
                      </span>
                    </div>
                  ) : (
                    <div className="pointer-events-none select-none hidden group-hover:flex group-focus:flex items-center absolute left-full top-1/2 -translate-y-1/2 z-20">
                      {/* Animated horizontal line to right */}
                      <div className="origin-left h-0.5 bg-white neon-glow-sci-fi-white animate-sci-fi-line-horizontal w-0 group-hover:animate-sci-fi-line-horizontal group-focus:animate-sci-fi-line-horizontal" style={{width: '80px'}} />
                      {/* Animated label at end of line */}
                      <span className="ml-3 px-4 py-1 text-sm font-mono tracking-widest text-white neon-glow-sci-fi-white animate-sci-fi-label-horizontal uppercase" style={{letterSpacing: '0.15em'}}>
                        {group.name}
                      </span>
                    </div>
                  )}
                  <span className="sr-only">{group.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <Link 
            href="/exercises"
            className="card hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2 text-white">Browse Exercises</h2>
            <p className="text-gray-300">Explore our comprehensive exercise database</p>
          </Link>
          
          <Link 
            href="/routines"
            className="card hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2 text-white">Workout Routines</h2>
            <p className="text-gray-300">Find pre-made routines for your goals</p>
          </Link>
          
          <Link 
            href="/builder"
            className="card hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2 text-white">Routine Builder</h2>
            <p className="text-gray-300">Create your own custom workout routines</p>
          </Link>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.28; transform: scale(1.08); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.13; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.12); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 10s ease-in-out infinite; }
        .neon-glow-sci-fi-white {
          text-shadow:
            0 0 6px #fff,
            0 0 12px #fff,
            0 0 18px #fff,
            0 0 24px #fff;
          box-shadow:
            0 0 8px 2px #fff,
            0 0 16px 4px #fff;
        }
        @keyframes sci-fi-line {
          0% { height: 0; opacity: 0; }
          60% { height: 32px; opacity: 1; }
          100% { height: 32px; opacity: 1; }
        }
        .animate-sci-fi-line {
          animation: sci-fi-line 0.35s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes sci-fi-label {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          60% { opacity: 0; transform: translateY(10px) scale(0.98); }
          80% { opacity: 1; transform: translateY(-2px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-sci-fi-label {
          animation: sci-fi-label 0.6s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes sci-fi-line-horizontal {
          0% { width: 0; opacity: 0; }
          60% { width: 80px; opacity: 1; }
          100% { width: 80px; opacity: 1; }
        }
        .animate-sci-fi-line-horizontal {
          animation: sci-fi-line-horizontal 0.35s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes sci-fi-label-horizontal {
          0% { opacity: 0; transform: translateX(10px) scale(0.98); }
          60% { opacity: 0; transform: translateX(10px) scale(0.98); }
          80% { opacity: 1; transform: translateX(-2px) scale(1.03); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-sci-fi-label-horizontal {
          animation: sci-fi-label-horizontal 0.6s cubic-bezier(0.4,0,0.2,1) both;
        }
        /* Leftward animation for left-side nodes */
        @keyframes sci-fi-line-horizontal-left {
          0% { width: 0; opacity: 0; }
          60% { width: 80px; opacity: 1; }
          100% { width: 80px; opacity: 1; }
        }
        .animate-sci-fi-line-horizontal-left {
          animation: sci-fi-line-horizontal-left 0.35s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes sci-fi-label-horizontal-left {
          0% { opacity: 0; transform: translateX(-10px) scale(0.98); }
          60% { opacity: 0; transform: translateX(-10px) scale(0.98); }
          80% { opacity: 1; transform: translateX(2px) scale(1.03); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-sci-fi-label-horizontal-left {
          animation: sci-fi-label-horizontal-left 0.6s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes sci-fi-outer-circle {
          0% { box-shadow: 0 0 8px 2px #fff, 0 0 16px 4px #fff; opacity: 0.7; transform: scale(0.95) rotate(0deg); }
          50% { box-shadow: 0 0 16px 6px #fff, 0 0 32px 8px #fff; opacity: 1; transform: scale(1.08) rotate(180deg); }
          100% { box-shadow: 0 0 8px 2px #fff, 0 0 16px 4px #fff; opacity: 0.7; transform: scale(0.95) rotate(360deg); }
        }
        .animate-sci-fi-outer-circle {
          animation: sci-fi-outer-circle 1.2s linear infinite;
        }
      `}</style>
      </main>
  );
}
