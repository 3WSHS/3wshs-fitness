"use client";
import React, { useEffect, useState, type ReactElement } from 'react';
import exercisesData from '@/data/exercises.json';

function getAllLogs() {
  if (typeof window === 'undefined') return {};
  return JSON.parse(localStorage.getItem('routineLogs') || '{}');
}

function getTotalMiles() {
  if (typeof window === 'undefined') return 0;
  const allLogs = getAllLogs();
  const cardioIds = exercisesData.muscleGroups
    .flatMap((mg: any) => mg.exercises)
    .filter((ex: any) => ex.equipment === 'bodyweight' && ex.musclesWorked?.includes('heart'))
    .map((ex: any) => ex.id);
  let miles = 0;
  Object.values(allLogs).forEach((logsArr: any) => {
    logsArr.forEach((log: any) => {
      if (log.completed && Array.isArray(log.exercises)) {
        log.exercises.forEach((ex: any) => {
          if (cardioIds.includes(ex.id) && Array.isArray(ex.sets)) {
            ex.sets.forEach((set: any) => {
              const dist = parseFloat(set.sets);
              if (!isNaN(dist)) miles += dist;
            });
          }
        });
      }
    });
  });
  return miles;
}

function getLongestStreak() {
  if (typeof window === 'undefined') return 0;
  const allLogs = getAllLogs();
  const completedDays = new Set<string>();
  Object.values(allLogs).forEach((logsArr: any) => {
    logsArr.forEach((log: any) => {
      if (log.completed) {
        completedDays.add(log.date);
      }
    });
  });
  if (completedDays.size === 0) return 0;
  const sortedDays = Array.from(completedDays).sort();
  let maxStreak = 1;
  let currentStreak = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1]);
    const curr = new Date(sortedDays[i]);
    if ((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24) === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 1;
    }
  }
  return maxStreak;
}

function getCompletedRoutinesCount() {
  if (typeof window === 'undefined') return 0;
  const allLogs = getAllLogs();
  let count = 0;
  Object.values(allLogs).forEach((logsArr: any) => {
    logsArr.forEach((log: any) => {
      if (log.completed) count++;
    });
  });
  return count;
}

function getSavedRoutinesCount() {
  if (typeof window === 'undefined') return 0;
  return (JSON.parse(localStorage.getItem('routines') || '[]') as any[]).length;
}

function getLogsWithNotesCount() {
  if (typeof window === 'undefined') return 0;
  const allLogs = getAllLogs();
  let count = 0;
  Object.values(allLogs).forEach((logsArr: any) => {
    logsArr.forEach((log: any) => {
      if (log.completed && log.notes && log.notes.trim().length > 0) count++;
    });
  });
  return count;
}

function hasComebackAfterBreak() {
  if (typeof window === 'undefined') return false;
  const allLogs = getAllLogs();
  // Get all unique days with at least one completed routine
  const completedDays = Array.from(new Set(
    Object.values(allLogs).flatMap((logsArr: any) =>
      logsArr.filter((log: any) => log.completed).map((log: any) => log.date)
    )
  )).sort();
  if (completedDays.length < 2) return false;
  let lastDate = new Date(completedDays[0]);
  for (let i = 1; i < completedDays.length; i++) {
    const currDate = new Date(completedDays[i]);
    const diff = (currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diff >= 7) return true;
    lastDate = currDate;
  }
  return false;
}

// Add a type for Achievement

type Achievement = {
  id: string;
  title: string;
  description: string;
  milestone: number;
  icon: ReactElement;
  getProgress: (arg: any) => number;
  isUnlocked: (arg: any) => boolean;
  progressLabel: (arg: any) => string;
  use?: string;
};

const achievements: Achievement[] = [
  {
    id: 'first-10-miles',
    title: 'First 10 Miles',
    description: 'Run a total of 10 miles.',
    milestone: 10,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <circle cx="32" cy="32" r="22" fill="#38bdf8" fillOpacity="0.15" />
        <path d="M32 16L36.4721 26.4721L48 28.1803L39.5 36.5279L41.9443 48L32 42L22.0557 48L24.5 36.5279L16 28.1803L27.5279 26.4721L32 16Z" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
    getProgress: (totalMiles: number) => Math.min(totalMiles, 10),
    isUnlocked: (totalMiles: number) => totalMiles >= 10,
    progressLabel: (totalMiles: number) => `${Math.min(totalMiles, 10).toFixed(2)} / 10 miles`,
  },
  {
    id: 'consistency-streak',
    title: 'Consistency Streak',
    description: 'Achieve a 7-day workout streak.',
    milestone: 7,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="48" height="40" rx="10" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <rect x="16" y="22" width="32" height="24" rx="6" fill="#38bdf8" fillOpacity="0.15" />
        <path d="M32 28L35 34H29L32 28Z" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
        <circle cx="32" cy="40" r="3" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (longestStreak: number) => Math.min(longestStreak, 7),
    isUnlocked: (longestStreak: number) => longestStreak >= 7,
    progressLabel: (longestStreak: number) => `${Math.min(longestStreak, 7)} / 7 days`,
    use: 'longestStreak',
  },
  {
    id: 'routine-master',
    title: 'Routine Master',
    description: 'Complete 20 total routines.',
    milestone: 20,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="10" width="40" height="44" rx="10" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <rect x="20" y="18" width="24" height="28" rx="6" fill="#38bdf8" fillOpacity="0.15" />
        <path d="M26 34l6 6 10-12" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="24" r="3" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (completedRoutines: number) => Math.min(completedRoutines, 20),
    isUnlocked: (completedRoutines: number) => completedRoutines >= 20,
    progressLabel: (completedRoutines: number) => `${Math.min(completedRoutines, 20)} / 20 routines`,
    use: 'completedRoutines',
  },
  {
    id: 'first-50-workouts',
    title: 'First 50 Workouts',
    description: 'Complete 50 total workouts.',
    milestone: 50,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="18" width="44" height="28" rx="10" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <rect x="18" y="26" width="28" height="12" rx="6" fill="#38bdf8" fillOpacity="0.15" />
        <rect x="24" y="30" width="16" height="4" rx="2" fill="#38bdf8" />
        <circle cx="16" cy="32" r="4" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
        <circle cx="48" cy="32" r="4" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (completedRoutines: number) => Math.min(completedRoutines, 50),
    isUnlocked: (completedRoutines: number) => completedRoutines >= 50,
    progressLabel: (completedRoutines: number) => `${Math.min(completedRoutines, 50)} / 50 workouts`,
    use: 'completedRoutines',
  },
  {
    id: 'two-week-titan',
    title: 'Two Week Titan',
    description: 'Achieve a 14-day workout streak.',
    milestone: 14,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="48" height="40" rx="10" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <rect x="16" y="22" width="32" height="24" rx="6" fill="#38bdf8" fillOpacity="0.15" />
        <path d="M24 32L32 20L40 32" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="40" r="3" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="3" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (longestStreak: number) => Math.min(longestStreak, 14),
    isUnlocked: (longestStreak: number) => longestStreak >= 14,
    progressLabel: (longestStreak: number) => `${Math.min(longestStreak, 14)} / 14 days`,
    use: 'longestStreak',
  },
  {
    id: 'streak-supreme',
    title: 'Streak Supreme',
    description: 'Achieve a 30-day workout streak.',
    milestone: 30,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <path d="M32 16L36 28H48L38 36L42 48L32 40L22 48L26 36L16 28H28L32 16Z" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
        <circle cx="32" cy="32" r="12" stroke="#38bdf8" strokeWidth="2" fill="none" />
      </svg>
    ),
    getProgress: (longestStreak: number) => Math.min(longestStreak, 30),
    isUnlocked: (longestStreak: number) => longestStreak >= 30,
    progressLabel: (longestStreak: number) => `${Math.min(longestStreak, 30)} / 30 days`,
    use: 'longestStreak',
  },
  {
    id: 'routine-collector',
    title: 'Routine Collector',
    description: 'Create and save 10 unique routines.',
    milestone: 10,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="16" width="40" height="32" rx="8" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <rect x="20" y="24" width="24" height="16" rx="4" fill="#38bdf8" fillOpacity="0.15" />
        <rect x="28" y="32" width="8" height="4" rx="2" fill="#38bdf8" />
        <circle cx="32" cy="24" r="3" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (savedRoutines: number) => Math.min(savedRoutines, 10),
    isUnlocked: (savedRoutines: number) => savedRoutines >= 10,
    progressLabel: (savedRoutines: number) => `${Math.min(savedRoutines, 10)} / 10 routines`,
    use: 'savedRoutines',
  },
  {
    id: 'cardio-champion',
    title: 'Cardio Champion',
    description: 'Run a total of 100 miles.',
    milestone: 100,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="32" rx="28" ry="18" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <path d="M20 32c4-8 20-8 24 0" stroke="#38bdf8" strokeWidth="3" fill="none" />
        <circle cx="32" cy="32" r="6" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (totalMiles: number) => Math.min(totalMiles, 100),
    isUnlocked: (totalMiles: number) => totalMiles >= 100,
    progressLabel: (totalMiles: number) => `${Math.min(totalMiles, 100).toFixed(2)} / 100 miles`,
    use: 'totalMiles',
  },
  {
    id: 'note-taker',
    title: 'Note Taker',
    description: 'Add notes to 10 different workout logs.',
    milestone: 10,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="12" width="32" height="40" rx="8" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <rect x="24" y="20" width="16" height="20" rx="4" fill="#38bdf8" fillOpacity="0.15" />
        <path d="M28 36h8M28 32h8M28 28h8" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="44" r="2" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (logsWithNotes: number) => Math.min(logsWithNotes, 10),
    isUnlocked: (logsWithNotes: number) => logsWithNotes >= 10,
    progressLabel: (logsWithNotes: number) => `${Math.min(logsWithNotes, 10)} / 10 notes`,
    use: 'logsWithNotes',
  },
  {
    id: 'comeback-kid',
    title: 'Comeback Kid',
    description: 'Complete a workout after missing 7+ days in a row.',
    milestone: 1,
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#181c2b" stroke="#38bdf8" strokeWidth="4" />
        <path d="M32 16v16l12 8" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 48a16 16 0 1 1 0-32" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <circle cx="32" cy="32" r="6" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    ),
    getProgress: (hasComeback: boolean) => hasComeback ? 1 : 0,
    isUnlocked: (hasComeback: boolean) => !!hasComeback,
    progressLabel: (hasComeback: boolean) => hasComeback ? '1 / 1 comeback' : '0 / 1 comeback',
    use: 'comeback',
  },
];

export default function AchievementsPage() {
  const [totalMiles, setTotalMiles] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [completedRoutines, setCompletedRoutines] = useState(0);
  const [savedRoutines, setSavedRoutines] = useState(0);
  const [logsWithNotes, setLogsWithNotes] = useState(0);
  const [hasComeback, setHasComeback] = useState(false);
  useEffect(() => {
    setTotalMiles(getTotalMiles());
    setLongestStreak(getLongestStreak());
    setCompletedRoutines(getCompletedRoutinesCount());
    setSavedRoutines(getSavedRoutinesCount());
    setLogsWithNotes(getLogsWithNotesCount());
    setHasComeback(hasComebackAfterBreak());
  }, []);

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white px-4">Achievements</h1>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-8 px-4 w-full">
            {achievements.map((ach) => {
              const progressArg =
                ach.use === 'longestStreak' ? longestStreak :
                ach.use === 'completedRoutines' ? completedRoutines :
                ach.use === 'savedRoutines' ? savedRoutines :
                ach.use === 'logsWithNotes' ? logsWithNotes :
                ach.use === 'comeback' ? hasComeback :
                ach.use === 'totalMiles' ? totalMiles :
                totalMiles;
              const unlocked = ach.isUnlocked(progressArg);
              const progress = ach.getProgress(progressArg);
              const progressLabel = ach.progressLabel(progressArg);
              return (
                <div key={ach.id} className={`relative flex flex-col items-center rounded-2xl p-4 min-w-[170px] max-w-[220px] shadow-xl border ${unlocked ? 'border-cyan-400/60 bg-gradient-to-br from-[#181c2b]/80 via-[#18191c]/90 to-[#1a1a2e]/80' : 'border-gray-700 bg-[#18191c]'} glassy-card transition-all duration-300`}>
                  <div className={`mb-3 ${unlocked ? '' : 'grayscale opacity-60'}`}>{ach.icon}</div>
                  <div className="text-lg font-bold text-white mb-1 text-center">{ach.title}</div>
                  <div className="text-gray-300 text-center mb-2 text-sm">{ach.description}</div>
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full h-2 bg-[#232428] rounded-full overflow-hidden mb-1">
                      <div className={`h-full rounded-full transition-all duration-500 ${unlocked ? 'bg-cyan-400' : 'bg-cyan-900'}`} style={{ width: `${(progress / ach.milestone) * 100}%` }} />
                    </div>
                    <div className="text-xs text-cyan-300 font-mono">{progressLabel}</div>
                  </div>
                  {unlocked && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-500/80 text-white text-[10px] font-bold shadow-lg border border-cyan-300 animate-pulse">Unlocked!</div>
                  )}
                  {!unlocked && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gray-700/80 text-gray-300 text-[10px] font-bold border border-gray-500">Locked</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
} 