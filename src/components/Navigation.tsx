'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useRef } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [yogaOpen, setYogaOpen] = useState(false);
  const [exercisesOpen, setExercisesOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const closeExercisesTimeout = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#18191c] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-white font-bold text-xl hover:text-blue-400 transition-colors"
            >
              3WSHS Fitness
            </Link>
          </div>
          <div className="flex space-x-6">
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeExercisesTimeout.current) clearTimeout(closeExercisesTimeout.current);
                setExercisesOpen(true);
              }}
              onMouseLeave={() => {
                closeExercisesTimeout.current = setTimeout(() => setExercisesOpen(false), 220);
              }}
            >
              <span
                className={`inline-flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                  isActive('/exercises') || isActive('/stretches')
                    ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
                }`}
              >
                Exercises
              </span>
              <div
                className={`absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg transition-all duration-300 z-50
                  ${exercisesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onMouseEnter={() => {
                  if (closeExercisesTimeout.current) clearTimeout(closeExercisesTimeout.current);
                  setExercisesOpen(true);
                }}
                onMouseLeave={() => {
                  closeExercisesTimeout.current = setTimeout(() => setExercisesOpen(false), 220);
                }}
              >
                <Link
                  href="/exercises"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  Exercises
                </Link>
                <Link
                  href="/stretches"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  Stretches
                </Link>
              </div>
            </div>
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);
                setYogaOpen(true);
              }}
              onMouseLeave={() => {
                closeTimeout.current = setTimeout(() => setYogaOpen(false), 220);
              }}
            >
              <Link
                href="/yoga"
                className={`inline-flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/yoga')
                    ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
                }`}
              >
                Yoga
              </Link>
              <div
                className={`absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg transition-all duration-300 z-50
                  ${yogaOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onMouseEnter={() => {
                  if (closeTimeout.current) clearTimeout(closeTimeout.current);
                  setYogaOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimeout.current = setTimeout(() => setYogaOpen(false), 220);
                }}
              >
                <Link
                  href="/yoga/positions"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  Poses
                </Link>
              </div>
            </div>
            <Link
              href="/routines"
              className={`inline-flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/routines')
                  ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
              }`}
            >
              Routines
            </Link>
            <Link
              href="/nutrition"
              className={`inline-flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/nutrition')
                  ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
              }`}
            >
              Nutrition
            </Link>
            <Link
              href="/builder"
              className={`inline-flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/builder')
                  ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
              }`}
            >
              Builder
            </Link>
            <Link
              href="/progress"
              className={`inline-flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/progress')
                  ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
              }`}
            >
              Progress
            </Link>
            <Link
              href="/achievements"
              className={`inline-flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/achievements')
                  ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
              }`}
            >
              Achievements
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 