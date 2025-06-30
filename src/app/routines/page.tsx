"use client";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import exercisesData from '../../data/exercises.json';

// Equipment tag colors mapping (copied from exercises page)
const equipmentColors: { [key: string]: string } = {
  'Barbell': 'bg-blue-500/20 text-blue-400',
  'Dumbbells': 'bg-purple-500/20 text-purple-400',
  'Bodyweight': 'bg-green-500/20 text-green-400',
  'Machine': 'bg-red-500/20 text-red-400',
  'Medicine-Ball': 'bg-yellow-500/20 text-yellow-400',
  'Kettlebells': 'bg-orange-500/20 text-orange-400',
  'Stretches': 'bg-teal-500/20 text-teal-400',
  'Cables': 'bg-pink-500/20 text-pink-400',
  'Band': 'bg-indigo-500/20 text-indigo-400',
  'Plate': 'bg-cyan-500/20 text-cyan-400',
  'TRX': 'bg-emerald-500/20 text-emerald-400',
  'Yoga': 'bg-violet-500/20 text-violet-400',
  'Bosu-Ball': 'bg-amber-500/20 text-amber-400',
  'Vitruvian': 'bg-rose-500/20 text-rose-400',
  'Cardio': 'bg-sky-500/20 text-sky-400',
  'Smith-Machine': 'bg-fuchsia-500/20 text-fuchsia-400',
  'Recovery': 'bg-lime-500/20 text-lime-400'
};
function EquipmentTag({ equipment }: { equipment: string }) {
  const colorClass = equipmentColors[equipment] || 'bg-gray-500/20 text-gray-400';
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {equipment}
    </span>
  );
}

// Add types for Routine and Exercise

type Exercise = {
  id: string;
  name: string;
  description: string;
  equipment?: string;
  difficulty?: string;
  musclesWorked?: string[];
  instructions?: string[];
  imageUrl?: string;
};

type Routine = {
  id: string;
  name: string;
  description: string;
  difficulty?: string;
  exercises: Exercise[];
};

// Add WorkoutLog type

type WorkoutLog = {
  date: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  completed: boolean;
  notes: string;
  exercises: any[];
};

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [modalRoutine, setModalRoutine] = useState<Routine | null>(null);
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [completedRoutines, setCompletedRoutines] = useState<{ [id: string]: boolean }>({});
  const [completedExercises, setCompletedExercises] = useState<{ [routineId: string]: { [exerciseId: string]: boolean } }>({});
  const [exerciseLogs, setExerciseLogs] = useState<{ [routineId: string]: { [exerciseId: string]: { sets: string, reps: string, weight: string }[] } }>({});
  const [logDate, setLogDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [routineLogs, setRoutineLogs] = useState<{ [routineId: string]: unknown[] }>({});
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState('');
  const allExercises = exercisesData.muscleGroups.flatMap((mg: any) => mg.exercises);
  const [routineNotes, setRoutineNotes] = useState<{ [routineId: string]: string }>({});
  const [exercisePRs, setExercisePRs] = useState<{ [exerciseId: string]: string }>({});
  const [prInputs, setPrInputs] = useState<{ [exerciseId: string]: string }>({});
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('routines') || '[]');
      setRoutines(stored);
      const completed = JSON.parse(localStorage.getItem('completedRoutines') || '{}');
      setCompletedRoutines(completed);
      const completedEx = JSON.parse(localStorage.getItem('completedExercises') || '{}');
      setCompletedExercises(completedEx);
      const logs = JSON.parse(localStorage.getItem('exerciseLogs') || '{}');
      setExerciseLogs(logs);
      const routineLogsStored = JSON.parse(localStorage.getItem('routineLogs') || '{}');
      setRoutineLogs(routineLogsStored);
      const exercisePRsStored = JSON.parse(localStorage.getItem('exercisePRs') || '{}');
      setExercisePRs(exercisePRsStored);
      setPrInputs(exercisePRsStored);
    }
  }, []);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  }
  function handleImageError() {
    setImageError(true);
  }

  function handleRoutineCompleted(routineId: string, checked: boolean) {
    const updated = { ...completedRoutines, [routineId]: checked };
    setCompletedRoutines(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedRoutines', JSON.stringify(updated));
    }
  }

  function handleExerciseCompleted(routineId: string, exerciseId: string, checked: boolean) {
    const prev = completedExercises[routineId] || {};
    const updatedRoutine = { ...prev, [exerciseId]: checked };
    const updated = { ...completedExercises, [routineId]: updatedRoutine };
    setCompletedExercises(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedExercises', JSON.stringify(updated));
    }
  }

  function handleExerciseLogChange(routineId: string, exerciseId: string, idx: number, field: 'sets' | 'reps' | 'weight', value: string) {
    const prevRoutine = exerciseLogs[routineId] || {};
    const prevLogs = prevRoutine[exerciseId] || [{ sets: '', reps: '', weight: '' }];
    const updatedLogs = prevLogs.map((log, i) => {
      if (i !== idx) return log;
      const newLog = { ...log, [field]: value };
      // Find the exercise to check if it's cardio
      const allExercises = exercisesData.muscleGroups.flatMap((mg: any) => mg.exercises);
      const ex = allExercises.find((e: any) => e.id === exerciseId);
      if (ex && ex.equipment === 'bodyweight' && ex.musclesWorked?.includes('heart')) {
        // Cardio: auto-calculate pace if distance and time are valid
        const dist = field === 'sets' ? value : newLog.sets;
        const time = field === 'reps' ? value : newLog.reps;
        const distNum = parseFloat(dist);
        const timeNum = parseFloat(time);
        if (!isNaN(distNum) && distNum > 0 && !isNaN(timeNum) && timeNum > 0) {
          newLog.weight = (timeNum / distNum).toFixed(2);
        }
      }
      return newLog;
    });
    const updatedRoutine = { ...prevRoutine, [exerciseId]: updatedLogs };
    const updated = { ...exerciseLogs, [routineId]: updatedRoutine };
    setExerciseLogs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('exerciseLogs', JSON.stringify(updated));
    }
  }

  function handleAddSetLine(routineId: string, exerciseId: string) {
    const prevRoutine = exerciseLogs[routineId] || {};
    const prevLogs = prevRoutine[exerciseId] || [{ sets: '', reps: '', weight: '' }];
    const updatedLogs = [...prevLogs, { sets: '', reps: '', weight: '' }];
    const updatedRoutine = { ...prevRoutine, [exerciseId]: updatedLogs };
    const updated = { ...exerciseLogs, [routineId]: updatedRoutine };
    setExerciseLogs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('exerciseLogs', JSON.stringify(updated));
    }
  }

  function handleSaveLog(routine: Routine) {
    const log = {
      date: logDate,
      startTime,
      endTime,
      duration: startTime && endTime ? calculateDuration(startTime, endTime) : '',
      completed: !!completedRoutines[routine.id],
      notes: routineNotes[routine.id] || '',
      exercises: routine.exercises.map((ex: any) => ({
        id: ex.id,
        name: ex.name,
        sets: (exerciseLogs[routine.id]?.[ex.id] || [{ sets: '', reps: '', weight: '' }]),
        completed: !!completedExercises[routine.id]?.[ex.id]
      }))
    };
    const prevLogs = routineLogs[routine.id] || [];
    const updatedLogs = [log, ...prevLogs];
    const updatedRoutineLogs = { ...routineLogs, [routine.id]: updatedLogs };
    setRoutineLogs(updatedRoutineLogs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('routineLogs', JSON.stringify(updatedRoutineLogs));
    }
    // Clear notes after saving
    setRoutineNotes(notes => ({ ...notes, [routine.id]: '' }));
  }

  function handleResetRoutine(routineId: string) {
    // Uncheck all completed exercises for this routine
    const updatedCompleted = { ...completedExercises, [routineId]: {} };
    setCompletedExercises(updatedCompleted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedExercises', JSON.stringify(updatedCompleted));
    }
    // Clear all logs for this routine
    const updatedLogs = { ...exerciseLogs, [routineId]: {} };
    setExerciseLogs(updatedLogs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('exerciseLogs', JSON.stringify(updatedLogs));
    }
  }

  function handleDeleteLog(routineId: string, logIdx: number) {
    const prevLogs = routineLogs[routineId] || [];
    const updatedLogs = prevLogs.filter((_, idx) => idx !== logIdx);
    const updatedRoutineLogs = { ...routineLogs, [routineId]: updatedLogs };
    setRoutineLogs(updatedRoutineLogs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('routineLogs', JSON.stringify(updatedRoutineLogs));
    }
  }

  function handleAddExerciseToRoutine(ex: Exercise) {
    if (!modalRoutine) return;
    // Add to routine in state
    const updatedRoutine: Routine = {
      ...modalRoutine,
      exercises: [...modalRoutine.exercises, ex]
    };
    setModalRoutine(updatedRoutine);
    // Update in routines list and localStorage
    const updatedRoutines = routines.map((r: Routine) => r.id === modalRoutine.id ? updatedRoutine : r);
    setRoutines(updatedRoutines);
    if (typeof window !== 'undefined') {
      localStorage.setItem('routines', JSON.stringify(updatedRoutines));
    }
    setShowAddExercise(false);
    setExerciseSearch('');
  }

  // Add a function to delete a routine
  function handleDeleteRoutine(routineId: string) {
    const updatedRoutines = routines.filter((r: Routine) => r.id !== routineId);
    setRoutines(updatedRoutines);
    if (typeof window !== 'undefined') {
      localStorage.setItem('routines', JSON.stringify(updatedRoutines));
    }
    // If the deleted routine is open in the modal, close it
    if (modalRoutine && modalRoutine.id === routineId) {
      setModalRoutine(null);
    }
  }

  function handlePRInputChange(exerciseId: string, value: string) {
    setPrInputs(inputs => ({ ...inputs, [exerciseId]: value }));
  }

  function handlePRSave(exerciseId: string) {
    const value = prInputs[exerciseId] || '';
    const updated = { ...exercisePRs, [exerciseId]: value };
    setExercisePRs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('exercisePRs', JSON.stringify(updated));
    }
  }

  function calculateDuration(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    let mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins < 0) mins += 24 * 60;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h > 0 ? h + 'h ' : ''}${m}m`;
  }

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-3xl rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-700/80 py-6 px-4 flex items-center justify-center shadow-lg border border-gray-700/60">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
              Welcome To Your Routines
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Routines</h1>
          <Link
            href="/builder"
            className="btn"
          >
            Create New Routine
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routines.length === 0 ? (
            <p className="text-gray-400 col-span-full">No routines yet. Create one!</p>
          ) : routines.map((routine) => (
            <div key={routine.id} className="card">
              <h2 className="text-2xl font-bold mb-2 text-white">{routine.name}</h2>
              <p className="text-gray-300 mb-4">{routine.description}</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p><span className="font-semibold text-white">Difficulty:</span> {routine.difficulty}</p>
                <p><span className="font-semibold text-white">Exercises:</span> {routine.exercises.length}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="inline-block text-blue-400 hover:text-blue-200 hover:underline"
                  onClick={() => setModalRoutine(routine)}
                >
                  View Routine →
                </button>
                <button
                  className="inline-block text-red-400 hover:text-red-200 hover:underline"
                  onClick={() => handleDeleteRoutine(routine.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pre-made Routines Section (below user's routines) */}
        <div className="mb-10 mt-12">
          <div className="w-full flex justify-center mb-8">
            <div className="w-full max-w-3xl rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-700/80 py-6 px-4 flex items-center justify-center shadow-lg border border-gray-700/60">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
                Explore Our Pre-made Workout Routines
              </h2>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-blue-200 mb-3">Push Day Workouts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chest & Triceps Beginner Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              {/* Icon above the title */}
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Chest & Triceps: Beginner</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-chest-triceps-beginner',
                  name: 'Chest & Triceps Beginner Day',
                  description: 'A simple push day for beginners, including stretches.',
                  difficulty: 'Beginner',
                  exercises: [
                    // Warmup
                    { id: 'chest-mobility', name: 'Chest Mobility', description: 'Mobility exercise for chest range of motion.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['chest'], instructions: ['Perform dynamic chest stretches', 'Focus on full range of motion', 'Work on shoulder mobility', 'Include chest flexibility'], imageUrl: '/images/exercises/chest-mobility.jpg' },
                    { id: 'chest-stretch', name: 'Chest Stretch', description: 'Stretching exercise for chest flexibility.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['chest'], instructions: ['Stand with arms extended to sides', 'Pull arms back to stretch chest', 'Hold stretch position', 'Feel chest stretch'], imageUrl: '/images/exercises/chest-stretch.jpg' },
                    // Chest
                    { id: 'machine-chest-press', name: 'Machine Chest Press', description: 'Machine chest press for controlled movement.', equipment: 'Machine', difficulty: 'Beginner', musclesWorked: ['chest', 'triceps', 'anterior deltoid'], instructions: ['Sit in chest press machine', 'Grip handles at chest level', 'Press handles forward', 'Return to starting position'], imageUrl: '/images/exercises/machine-chest-press.jpg' },
                    { id: 'band-chest-press', name: 'Band Chest Press', description: 'Band chest press for resistance training.', equipment: 'Band', difficulty: 'Beginner', musclesWorked: ['chest', 'triceps', 'anterior deltoid'], instructions: ['Anchor band behind back', 'Hold band handles at chest level', 'Press handles forward', 'Return to starting position'], imageUrl: '/images/exercises/band-chest-press.jpg' },
                    // Triceps
                    { id: 'tricep-pushdown', name: 'Tricep Pushdown', description: 'An isolation exercise for the triceps', equipment: 'Cable Machine', difficulty: 'Beginner', musclesWorked: ['triceps'], instructions: ['Stand facing cable machine', 'Grip bar with overhand grip', 'Push bar down until arms are extended', 'Return to starting position'], imageUrl: '/images/exercises/tricep-pushdown.jpg' },
                    { id: 'seated-overhead-long-head', name: 'Seated Overhead Long Head Extension', description: 'Seated overhead extension for long head focus.', equipment: 'Dumbbells', difficulty: 'Intermediate', musclesWorked: ['long head tricep'], instructions: ['Sit on bench with dumbbell overhead', 'Lower weight behind head', 'Keep upper arms stationary', 'Extend arms back to starting position'], imageUrl: '/images/exercises/seated-overhead-long-head.jpg' },
                    // Stretches
                    { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch', description: 'Classic stretch using a doorway to open up the chest and shoulders.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['chest'], instructions: ['Stand in a doorway with your feet shoulder-width apart.', 'Place your forearms on the door frame at shoulder height.', 'Step forward slightly to feel the stretch in your chest.', 'Keep your back straight and core engaged.', 'Hold for 30 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'overhead-triceps-stretch', name: 'Overhead Triceps Stretch', description: 'Classic stretch that targets the triceps and the muscles along the side of the torso.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['triceps'], instructions: ['Stand or sit tall with your back straight.', 'Raise your right arm overhead and bend the elbow to reach your hand down your back.', 'Use your left hand to gently push on your right elbow.', 'Hold for 30 seconds, then switch arms.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>
            {/* Chest & Triceps Intermediate Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Chest & Triceps: Intermediate</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-chest-triceps-intermediate',
                  name: 'Chest & Triceps Intermediate Day',
                  description: 'A challenging push day for intermediates, with more volume and extra stretches.',
                  difficulty: 'Intermediate',
                  exercises: [
                    // Chest (4)
                    { id: 'barbell-bench-press', name: 'Barbell Bench Press', description: 'Primary compound exercise for chest development.', equipment: 'Barbell', difficulty: 'Intermediate', musclesWorked: ['chest', 'triceps', 'anterior deltoid'], instructions: ['Lie on bench with barbell at chest level', 'Grip bar slightly wider than shoulders', 'Lower bar to chest with control', 'Press bar back up to starting position'], imageUrl: '/images/exercises/barbell-bench-press.jpg' },
                    { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', description: 'Dumbbell variation for chest development.', equipment: 'Dumbbells', difficulty: 'Intermediate', musclesWorked: ['chest', 'triceps', 'anterior deltoid'], instructions: ['Lie on bench with dumbbells at chest level', 'Hold dumbbells with neutral grip', 'Lower dumbbells to chest with control', 'Press dumbbells back up to starting position'], imageUrl: '/images/exercises/dumbbell-bench-press.jpg' },
                    { id: 'incline-barbell-press', name: 'Incline Barbell Press', description: 'Primary compound exercise for upper chest development.', equipment: 'Barbell', difficulty: 'Intermediate', musclesWorked: ['upper pectoralis', 'triceps', 'anterior deltoid'], instructions: ['Lie on incline bench with barbell at chest level', 'Grip bar slightly wider than shoulders', 'Lower bar to chest with control', 'Press bar back up to starting position'], imageUrl: '/images/exercises/incline-barbell-press.jpg' },
                    { id: 'cable-crossovers', name: 'Cable Crossovers', description: 'Cable crossovers for chest development.', equipment: 'Cables', difficulty: 'Intermediate', musclesWorked: ['chest'], instructions: ['Stand between cable machine with cables at chest level', 'Step forward with slight bend in knees', 'Bring cables together in front of chest', 'Return to starting position'], imageUrl: '/images/exercises/cable-crossovers.jpg' },
                    // Triceps (4)
                    { id: 'tricep-pushdown', name: 'Tricep Pushdown', description: 'An isolation exercise for the triceps', equipment: 'Cable Machine', difficulty: 'Beginner', musclesWorked: ['triceps'], instructions: ['Stand facing cable machine', 'Grip bar with overhand grip', 'Push bar down until arms are extended', 'Return to starting position'], imageUrl: '/images/exercises/tricep-pushdown.jpg' },
                    { id: 'overhead-long-head-extension', name: 'Overhead Long Head Extension', description: 'Primary exercise targeting long head of triceps.', equipment: 'Dumbbells', difficulty: 'Intermediate', musclesWorked: ['long head tricep'], instructions: ['Stand with dumbbell overhead', 'Lower weight behind head', 'Keep upper arms stationary', 'Extend arms back to starting position'], imageUrl: '/images/exercises/overhead-long-head-extension.jpg' },
                    { id: 'rope-pushdown-medial', name: 'Rope Pushdown Medial', description: 'Rope pushdown targeting medial head.', equipment: 'Cables', difficulty: 'Beginner', musclesWorked: ['medial head triceps'], instructions: ['Stand facing cable machine', 'Grip rope with both hands', 'Push rope down and spread hands apart', 'Focus on medial head engagement'], imageUrl: '/images/exercises/rope-pushdown-medial.jpg' },
                    { id: 'kickback-medial', name: 'Tricep Kickback Medial', description: 'Kickback targeting medial head.', equipment: 'Dumbbells', difficulty: 'Beginner', musclesWorked: ['medial head triceps'], instructions: ['Bend at hips, lean forward', 'Hold dumbbell with arm bent', 'Extend arm back and up', 'Focus on medial head engagement'], imageUrl: '/images/exercises/kickback-medial.jpg' },
                    // Chest/Triceps Stretches
                    { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch', description: 'Classic stretch using a doorway to open up the chest and shoulders.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['chest'], instructions: ['Stand in a doorway with your feet shoulder-width apart.', 'Place your forearms on the door frame at shoulder height.', 'Step forward slightly to feel the stretch in your chest.', 'Keep your back straight and core engaged.', 'Hold for 30 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'overhead-triceps-stretch', name: 'Overhead Triceps Stretch', description: 'Classic stretch that targets the triceps and the muscles along the side of the torso.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['triceps'], instructions: ['Stand or sit tall with your back straight.', 'Raise your right arm overhead and bend the elbow to reach your hand down your back.', 'Use your left hand to gently push on your right elbow.', 'Hold for 30 seconds, then switch arms.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    // Other Body Part Stretches
                    { id: 'standing-bicep-stretch', name: 'Standing Bicep Stretch', description: 'Classic standing stretch that targets the biceps and anterior shoulder muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand tall with your feet shoulder-width apart.', 'Extend your right arm straight out to the side at shoulder height.', 'Rotate your palm up toward the ceiling.', 'Use your left hand to gently pull your right fingers back toward your body.', 'Hold for 30 seconds, then switch arms.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'seated-quad-stretch', name: 'Seated Quad Stretch', description: 'Seated stretch perfect for office workers or those with limited mobility.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['quadriceps'], instructions: ['Sit on the floor with your legs extended in front.', 'Bend your right knee and bring your heel toward your buttocks.', 'Grasp your right ankle with your right hand.', 'Gently pull your heel closer to your buttocks.', 'Hold for 30 seconds and switch legs.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>
            {/* Chest & Triceps Advanced Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Chest & Triceps: Advanced</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-chest-triceps-advanced',
                  name: 'Chest & Triceps Advanced Day',
                  description: 'An intense push day for advanced lifters, with challenging exercises and comprehensive stretches.',
                  difficulty: 'Advanced',
                  exercises: [
                    // Chest (4)
                    { id: 'chest-superset', name: 'Chest Superset', description: 'Superset for chest development.', equipment: 'Machine', difficulty: 'Advanced', musclesWorked: ['chest'], instructions: ['Perform bench press', 'Immediately perform flyes', 'Rest between supersets', 'Focus on chest'], imageUrl: '/images/exercises/chest-superset.jpg' },
                    { id: 'chest-pyramid', name: 'Chest Pyramid', description: 'Pyramid set for chest development.', equipment: 'Machine', difficulty: 'Advanced', musclesWorked: ['chest'], instructions: ['Start light with high reps', 'Increase weight, decrease reps', 'Peak with heavy weight, low reps', 'Reverse pyramid back down'], imageUrl: '/images/exercises/chest-pyramid.jpg' },
                    { id: 'incline-21s', name: 'Incline 21s', description: '21s technique for upper chest development.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['upper pectoralis'], instructions: ['Perform 7 reps top to middle', 'Perform 7 reps middle to bottom', 'Perform 7 full reps', 'That\'s one set'], imageUrl: '/images/exercises/incline-21s.jpg' },
                    { id: 'dumbbell-burnout', name: 'Dumbbell Burnout', description: 'Burnout set for mid chest intensity.', equipment: 'Dumbbells', difficulty: 'Advanced', musclesWorked: ['mid and lower chest', 'triceps', 'anterior deltoid'], instructions: ['Lie on bench with light dumbbells', 'Perform rapid reps to failure', 'Focus on mid chest burn', 'Push through fatigue'], imageUrl: '/images/exercises/dumbbell-burnout.jpg' },
                    // Triceps (4)
                    { id: 'pushdown-medial-drop-set', name: 'Pushdown Medial Drop Set', description: 'Drop set for medial head development.', equipment: 'Cables', difficulty: 'Advanced', musclesWorked: ['medial head triceps'], instructions: ['Start with heavy weight', 'Perform pushdowns to failure', 'Immediately reduce weight', 'Continue to failure'], imageUrl: '/images/exercises/pushdown-medial-drop-set.jpg' },
                    { id: 'pushdown-medial-with-bounce', name: 'Pushdown Medial with Bounce', description: 'Pushdown with slight bounce targeting medial head.', equipment: 'Cables', difficulty: 'Advanced', musclesWorked: ['medial head triceps'], instructions: ['Perform pushdown', 'Slight bounce at bottom position', 'Use momentum to extend', 'Focus on control'], imageUrl: '/images/exercises/pushdown-medial-with-bounce.jpg' },
                    { id: 'chaturanga-triceps', name: 'Chaturanga (Triceps Focus)', description: 'A low plank pose that deeply activates the triceps and core.', equipment: 'Bodyweight', difficulty: 'Advanced', musclesWorked: ['triceps', 'chest'], instructions: ['From plank, lower halfway down, elbows close to ribs', 'Keep body in straight line', 'Engage triceps and hold', 'Push back up to plank to release'], imageUrl: '/images/yoga/chaturanga.jpg' },
                    { id: 'crow-pose-triceps', name: 'Crow Pose (Triceps Focus)', description: 'An arm balance that builds triceps strength and improves focus.', equipment: 'Bodyweight', difficulty: 'Advanced', musclesWorked: ['triceps', 'wrists'], instructions: ['Squat down, place hands on the mat', 'Bend elbows and lift feet off the ground, balancing on hands', 'Engage triceps to support the pose', 'Hold for a few breaths'], imageUrl: '/images/yoga/crow-pose.jpg' },
                    // Chest/Triceps Stretches
                    { id: 'chest-foam-roll', name: 'Chest Foam Roll', description: 'Foam rolling for chest recovery.', equipment: 'Foam-roller', difficulty: 'Beginner', musclesWorked: ['chest'], instructions: ['Lie on foam roller along chest muscles', 'Roll along chest muscles', 'Find tight spots and hold', 'Focus on recovery'], imageUrl: '/images/exercises/chest-foam-roll.jpg' },
                    { id: 'foam-roller-triceps-release', name: 'Foam Roller Triceps Release', description: 'Self-massage technique using a foam roller to release triceps tightness.', equipment: 'Foam-roller', difficulty: 'Intermediate', musclesWorked: ['triceps'], instructions: ['Sit on the floor with a foam roller in front of you.', 'Place your right triceps on the roller and support your body with your left hand and knees.', 'Roll slowly up and down your triceps area.', 'Pause on tender spots for 30 seconds.', 'Repeat on the other arm.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    // Other Body Part Stretches
                    { id: 'dynamic-bicep-stretch', name: 'Dynamic Bicep Stretch', description: 'Moving stretch that warms up the biceps and improves mobility.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand with your arms at your sides.', 'Swing your arms in small circles forward for 10 seconds.', 'Then swing them backward for 10 seconds.', 'Gradually increase the circle size.', 'Repeat 3-5 times.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'dynamic-quad-stretch', name: 'Dynamic Quad Stretch', description: 'Moving stretch that warms up the quadriceps and improves mobility.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['quadriceps'], instructions: ['Stand with your feet shoulder-width apart.', 'March in place, bringing your knees up high.', 'Gradually increase the height of your knee lifts.', 'Continue for 30-60 seconds.', 'You can also add arm swings for balance.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>
          </div>
          {/* Pull Day Workouts Section */}
          <h3 className="text-xl font-semibold text-blue-200 mt-10 mb-3">Pull Day Workouts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pull Day: Beginner Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Pull Day: Beginner</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-pull-beginner',
                  name: 'Pull Day Beginner',
                  description: 'A beginner-friendly pull day routine targeting all areas of the back and biceps, with effective stretches.',
                  difficulty: 'Beginner',
                  exercises: [
                    // Back (upper, mid, lower, lats, traps)
                    { id: 'face-pull', name: 'Face Pull', description: 'Mid-back and rear delt exercise.', equipment: 'Cable Machine', difficulty: 'Beginner', musclesWorked: ['traps-mid-back', 'rear-deltoids', 'rhomboids'], instructions: ['Set cable at eye level', 'Grip rope attachment', 'Pull to face', 'Squeeze shoulder blades'], imageUrl: '/images/exercises/face-pull.jpg' },
                    { id: 'machine-reverse-fly', name: 'Machine Reverse Fly', description: 'Reverse fly using specialized machine.', equipment: 'Reverse Fly Machine', difficulty: 'Beginner', musclesWorked: ['traps-mid-back', 'rear-deltoids', 'rhomboids'], instructions: ['Sit in machine', 'Adjust seat', 'Pull handles back', 'Squeeze shoulder blades'], imageUrl: '/images/exercises/machine-reverse-fly.jpg' },
                    { id: 'superman', name: 'Superman', description: 'Bodyweight lower back exercise.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['lower-back', 'glutes'], instructions: ['Lie face down on ground', 'Lift arms and legs', 'Hold position', 'Lower slowly'], imageUrl: '/images/exercises/superman.jpg' },
                    { id: 'mid-back-warmup', name: 'Mid Back Warmup', description: 'Mid-back warmup for preparation.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['traps-mid-back'], instructions: ['Warm up mid-back', 'Increase blood flow', 'Prepare for work', 'Include mobility'], imageUrl: '/images/exercises/mid-back-warmup.jpg' },
                    // Biceps (short head, long head)
                    { id: 'machine-preacher-curl', name: 'Machine Preacher Curl', description: 'Preacher curl using specialized machine.', equipment: 'Preacher Curl Machine', difficulty: 'Beginner', musclesWorked: ['long-head-bicep', 'biceps', 'short-head-bicep'], instructions: ['Sit in machine', 'Adjust seat', 'Curl weight up', 'Lower slowly'], imageUrl: '/images/exercises/machine-preacher-curl.jpg' },
                    { id: 'standing-barbell-curl', name: 'Standing Barbell Curl', description: 'Classic bicep exercise for overall bicep development.', equipment: 'Barbell', difficulty: 'Intermediate', musclesWorked: ['biceps', 'long-head-bicep', 'short-head-bicep'], instructions: ['Stand with barbell at sides', 'Curl barbell up', 'Squeeze at top', 'Lower slowly'], imageUrl: '/images/exercises/standing-barbell-curl.jpg' },
                    { id: 'short-head-warmup', name: 'Short Head Warmup', description: 'Short head bicep warmup for preparation.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['short-head-bicep'], instructions: ['Warm up short head bicep', 'Increase blood flow', 'Prepare for work', 'Include mobility'], imageUrl: '/images/exercises/short-head-warmup.jpg' },
                    { id: 'long-head-activation', name: 'Long Head Activation', description: 'Long head bicep activation for warmup.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['long-head-bicep'], instructions: ['Activate long head bicep', 'Feel muscle engagement', 'Prepare for work', 'Light movement'], imageUrl: '/images/exercises/long-head-activation.jpg' },
                    // Stretches (back & biceps)
                    { id: 'cat-cow-stretch', name: 'Cat-Cow Stretch', description: 'Dynamic yoga-inspired stretch that mobilizes the entire spine and back muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['back'], instructions: ['Start on your hands and knees in a tabletop position.', 'Inhale and arch your back, lifting your head and tailbone (cow pose).', 'Exhale and round your back, tucking your chin and tailbone (cat pose).', 'Flow between these positions for 10-15 repetitions.', 'Move slowly and breathe deeply with each movement.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'childs-pose-back-stretch', name: "Child's Pose Back Stretch", description: 'Gentle restorative stretch that releases tension in the back and shoulders.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['back'], instructions: ['Kneel on the floor with your knees hip-width apart.', 'Sit back on your heels and fold forward from your hips.', 'Extend your arms forward and rest your forehead on the floor.', 'Let your back relax and feel the gentle stretch.', 'Hold for 30-60 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'standing-bicep-stretch', name: 'Standing Bicep Stretch', description: 'Classic standing stretch that targets the biceps and anterior shoulder muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand tall with your feet shoulder-width apart.', 'Extend your right arm straight out to the side at shoulder height.', 'Rotate your palm up toward the ceiling.', 'Use your left hand to gently pull your right fingers back toward your body.', 'Hold for 30 seconds, then switch arms.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'dynamic-bicep-stretch', name: 'Dynamic Bicep Stretch', description: 'Moving stretch that warms up the biceps and improves mobility.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand with your arms at your sides.', 'Swing your arms in small circles forward for 10 seconds.', 'Then swing them backward for 10 seconds.', 'Gradually increase the circle size.', 'Repeat 3-5 times.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>
            {/* Pull Day: Intermediate Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Pull Day: Intermediate</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-pull-intermediate',
                  name: 'Pull Day Intermediate',
                  description: 'An intermediate pull day routine targeting all areas of the back and biceps, with effective stretches.',
                  difficulty: 'Intermediate',
                  exercises: [
                    // Back (upper, mid, lower, lats, traps)
                    { id: 'bent-over-row', name: 'Bent Over Row', description: 'Classic mid-back exercise targeting the middle trapezius.', equipment: 'Barbell', difficulty: 'Intermediate', musclesWorked: ['traps-mid-back', 'rhomboids', 'lats'], instructions: ['Stand with feet shoulder-width apart', 'Bend at hips and knees', 'Hold barbell with overhand grip', 'Pull bar to lower chest'], imageUrl: '/images/exercises/bent-over-row.jpg' },
                    { id: 't-bar-row', name: 'T-Bar Row', description: 'Mid-back exercise using T-bar machine.', equipment: 'T-bar Machine', difficulty: 'Intermediate', musclesWorked: ['traps-mid-back', 'rhomboids', 'lats'], instructions: ['Straddle T-bar machine', 'Bend at hips', 'Grip handles', 'Pull bar to chest'], imageUrl: '/images/exercises/t-bar-row.jpg' },
                    { id: 'superman', name: 'Superman', description: 'Bodyweight lower back exercise.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['lower-back', 'glutes'], instructions: ['Lie face down on ground', 'Lift arms and legs', 'Hold position', 'Lower slowly'], imageUrl: '/images/exercises/superman.jpg' },
                    { id: 'machine-shrug', name: 'Machine Shrug', description: 'Machine shrug for stability.', equipment: 'Machine', difficulty: 'Beginner', musclesWorked: ['traps'], instructions: ['Sit at shrug machine', 'Place hands on handles', 'Shrug shoulders up towards ears', 'Lower with control'], imageUrl: '/images/exercises/machine-shrug.jpg' },
                    // Biceps (short head, long head)
                    { id: 'standing-dumbbell-curl', name: 'Standing Dumbbell Curl', description: 'Standing curl with dumbbells for bicep development.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['biceps', 'long-head-bicep', 'short-head-bicep'], instructions: ['Stand with dumbbells at sides', 'Curl dumbbells up', 'Squeeze at top', 'Lower slowly'], imageUrl: '/images/exercises/standing-dumbbell-curl.jpg' },
                    { id: 'incline-dumbbell-curl', name: 'Incline Dumbbell Curl', description: 'Incline curl for long head bicep focus.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['biceps', 'long-head-bicep', 'short-head-bicep'], instructions: ['Lie on incline bench', 'Hold dumbbells at sides', 'Curl dumbbells up', 'Lower slowly'], imageUrl: '/images/exercises/incline-dumbbell-curl.jpg' },
                    { id: 'preacher-curl', name: 'Preacher Curl', description: 'Classic preacher curl for long head development.', equipment: 'Barbell', difficulty: 'Intermediate', musclesWorked: ['long-head-bicep', 'biceps', 'short-head-bicep'], instructions: ['Sit at preacher bench', 'Rest arms on pad', 'Curl barbell up', 'Lower slowly'], imageUrl: '/images/exercises/preacher-curl.jpg' },
                    { id: 'dumbbell-preacher-curl', name: 'Dumbbell Preacher Curl', description: 'Preacher curl with dumbbells for unilateral training.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['short-head-bicep', 'biceps'], instructions: ['Sit at preacher bench', 'Rest arms on pad', 'Curl dumbbells up', 'Lower slowly'], imageUrl: '/images/exercises/dumbbell-preacher-curl.jpg' },
                    // Stretches (back & biceps)
                    { id: 'wall-back-stretch', name: 'Wall Back Stretch', description: 'Simple wall-based stretch that opens the chest and stretches the back.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['back'], instructions: ['Stand facing a wall with your feet shoulder-width apart.', 'Place your hands on the wall at shoulder height.', 'Step back slightly and lean forward from your hips.', 'Feel the stretch in your back and shoulders.', 'Hold for 30 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'lying-back-twist', name: 'Lying Back Twist', description: 'Relaxing stretch that gently twists the spine while lying down.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['back'], instructions: ['Lie on your back with your arms extended out to the sides.', 'Bend your knees and bring them toward your chest.', 'Slowly lower your knees to the right side.', 'Turn your head to the left and hold for 30 seconds.', 'Return to center and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'doorway-bicep-stretch', name: 'Doorway Bicep Stretch', description: 'Effective stretch using a doorway to target biceps and chest muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand in a doorway with your right arm extended.', 'Place your right hand on the door frame at shoulder height.', 'Gently turn your body to the left, away from your arm.', 'Feel the stretch in your biceps and chest.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'dynamic-bicep-stretch', name: 'Dynamic Bicep Stretch', description: 'Moving stretch that warms up the biceps and improves mobility.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand with your arms at your sides.', 'Swing your arms in small circles forward for 10 seconds.', 'Then swing them backward for 10 seconds.', 'Gradually increase the circle size.', 'Repeat 3-5 times.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>
            {/* Pull Day: Advanced Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Pull Day: Advanced</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-pull-advanced',
                  name: 'Pull Day Advanced',
                  description: 'An advanced pull day routine targeting all areas of the back and biceps, with effective stretches.',
                  difficulty: 'Advanced',
                  exercises: [
                    // Back (upper, mid, lower, lats, traps)
                    { id: 'deadlift', name: 'Deadlift', description: 'Compound exercise targeting the entire posterior chain.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['lower-back', 'traps', 'lats', 'glutes'], instructions: ['Stand with feet shoulder-width apart', 'Bend at hips and knees', 'Grip bar with overhand grip', 'Lift bar by extending hips and knees'], imageUrl: '/images/exercises/deadlift.jpg' },
                    { id: 'barbell-row', name: 'Barbell Row', description: 'Classic compound back exercise.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['traps-mid-back', 'rhomboids', 'lats'], instructions: ['Stand with feet shoulder-width apart', 'Bend at hips and knees', 'Hold barbell with overhand grip', 'Pull bar to lower chest'], imageUrl: '/images/exercises/barbell-row.jpg' },
                    { id: 'pull-up', name: 'Pull-up', description: 'Advanced bodyweight exercise for upper back and lats.', equipment: 'Bodyweight', difficulty: 'Advanced', musclesWorked: ['lats', 'upper-back', 'biceps'], instructions: ['Hang from pull-up bar', 'Pull body up until chin over bar', 'Lower with control', 'Repeat'], imageUrl: '/images/exercises/pull-up.jpg' },
                    { id: 'weighted-shrug', name: 'Weighted Shrug', description: 'Advanced shrug with heavy weights.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['traps'], instructions: ['Stand with barbell at sides', 'Shrug shoulders up towards ears', 'Hold at top', 'Lower with control'], imageUrl: '/images/exercises/weighted-shrug.jpg' },
                    // Biceps (short head, long head)
                    { id: 'barbell-curl', name: 'Barbell Curl', description: 'Classic barbell curl for bicep development.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['biceps', 'long-head-bicep', 'short-head-bicep'], instructions: ['Stand with barbell at sides', 'Curl barbell up', 'Squeeze at top', 'Lower slowly'], imageUrl: '/images/exercises/barbell-curl.jpg' },
                    { id: 'hammer-curl', name: 'Hammer Curl', description: 'Dumbbell curl with neutral grip for brachialis development.', equipment: 'Dumbbell', difficulty: 'Advanced', musclesWorked: ['biceps', 'brachialis', 'long-head-bicep', 'short-head-bicep'], instructions: ['Stand with dumbbells at sides', 'Curl dumbbells up with neutral grip', 'Squeeze at top', 'Lower slowly'], imageUrl: '/images/exercises/hammer-curl.jpg' },
                    { id: 'concentration-curl', name: 'Concentration Curl', description: 'Isolated curl for maximum bicep focus.', equipment: 'Dumbbell', difficulty: 'Advanced', musclesWorked: ['short-head-bicep', 'biceps'], instructions: ['Sit on bench with legs apart', 'Rest elbow on inner thigh', 'Curl dumbbell up', 'Lower slowly'], imageUrl: '/images/exercises/concentration-curl.jpg' },
                    { id: 'spider-curl', name: 'Spider Curl', description: 'Advanced curl variation for peak contraction.', equipment: 'Dumbbell', difficulty: 'Advanced', musclesWorked: ['long-head-bicep', 'biceps'], instructions: ['Lie face down on incline bench', 'Hold dumbbells at sides', 'Curl dumbbells up', 'Lower slowly'], imageUrl: '/images/exercises/spider-curl.jpg' },
                    // Stretches (back & biceps)
                    { id: 'wall-back-stretch', name: 'Wall Back Stretch', description: 'Simple wall-based stretch that opens the chest and stretches the back.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['back'], instructions: ['Stand facing a wall with your feet shoulder-width apart.', 'Place your hands on the wall at shoulder height.', 'Step back slightly and lean forward from your hips.', 'Feel the stretch in your back and shoulders.', 'Hold for 30 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'lying-back-twist', name: 'Lying Back Twist', description: 'Relaxing stretch that gently twists the spine while lying down.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['back'], instructions: ['Lie on your back with your arms extended out to the sides.', 'Bend your knees and bring them toward your chest.', 'Slowly lower your knees to the right side.', 'Turn your head to the left and hold for 30 seconds.', 'Return to center and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'doorway-bicep-stretch', name: 'Doorway Bicep Stretch', description: 'Effective stretch using a doorway to target biceps and chest muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand in a doorway with your right arm extended.', 'Place your right hand on the door frame at shoulder height.', 'Gently turn your body to the left, away from your arm.', 'Feel the stretch in your biceps and chest.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'dynamic-bicep-stretch', name: 'Dynamic Bicep Stretch', description: 'Moving stretch that warms up the biceps and improves mobility.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['biceps'], instructions: ['Stand with your arms at your sides.', 'Swing your arms in small circles forward for 10 seconds.', 'Then swing them backward for 10 seconds.', 'Gradually increase the circle size.', 'Repeat 3-5 times.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>
          </div>

          {/* Legs & Shoulders Workouts */}
          <h2 className="text-2xl font-bold text-white mb-6 mt-12">Legs & Shoulders Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Legs & Shoulders: Beginner Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Legs & Shoulders: Beginner</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-legs-shoulders-beginner',
                  name: 'Legs & Shoulders Beginner',
                  description: 'A beginner-friendly routine targeting legs and shoulders with foundational exercises and stretches.',
                  difficulty: 'Beginner',
                  exercises: [
                    // Legs (quads, hamstrings, calves)
                    { id: 'bodyweight-squat', name: 'Bodyweight Squat', description: 'Fundamental squat movement for leg strength.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['quads', 'glutes', 'hamstrings'], instructions: ['Stand with feet shoulder-width apart', 'Lower body as if sitting back', 'Keep chest up', 'Return to standing'], imageUrl: '/images/exercises/bodyweight-squat.jpg' },
                    { id: 'wall-sit', name: 'Wall Sit', description: 'Isometric exercise for quad endurance.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['quads', 'glutes'], instructions: ['Lean back against wall', 'Slide down until thighs parallel', 'Hold position', 'Keep back against wall'], imageUrl: '/images/exercises/wall-sit.jpg' },
                    { id: 'calf-raise', name: 'Calf Raise', description: 'Simple calf strengthening exercise.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['calves'], instructions: ['Stand on edge of step', 'Raise heels up', 'Lower heels below step', 'Repeat'], imageUrl: '/images/exercises/calf-raise.jpg' },
                    { id: 'glute-bridge', name: 'Glute Bridge', description: 'Basic hip hinge movement for posterior chain.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['glutes', 'hamstrings'], instructions: ['Lie on back with knees bent', 'Lift hips off ground', 'Squeeze glutes', 'Lower slowly'], imageUrl: '/images/exercises/glute-bridge.jpg' },
                    // Shoulders (front, side, rear delts)
                    { id: 'pike-push-up', name: 'Pike Push-up', description: 'Bodyweight shoulder press variation.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['front-shoulder', 'side-shoulder'], instructions: ['Start in downward dog position', 'Lower head toward ground', 'Push back up', 'Keep hips high'], imageUrl: '/images/exercises/pike-push-up.jpg' },
                    { id: 'wall-push-up', name: 'Wall Push-up', description: 'Beginner-friendly push-up variation.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['front-shoulder', 'chest'], instructions: ['Stand facing wall', 'Place hands on wall', 'Lower body toward wall', 'Push back to start'], imageUrl: '/images/exercises/wall-push-up.jpg' },
                    { id: 'arm-circles', name: 'Arm Circles', description: 'Dynamic shoulder mobility exercise.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['front-shoulder', 'side-shoulder', 'rear-shoulder'], instructions: ['Stand with arms extended', 'Make small circles forward', 'Then backward', 'Gradually increase size'], imageUrl: '/images/exercises/arm-circles.jpg' },
                    { id: 'shoulder-tap', name: 'Shoulder Tap', description: 'Plank variation for shoulder stability.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['front-shoulder', 'core'], instructions: ['Start in plank position', 'Tap left shoulder with right hand', 'Return to plank', 'Alternate sides'], imageUrl: '/images/exercises/shoulder-tap.jpg' },
                    // Stretches (legs & shoulders)
                    { id: 'standing-quad-stretch', name: 'Standing Quad Stretch', description: 'Simple standing stretch for the quadriceps muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['quads'], instructions: ['Stand on one leg, holding onto a wall or chair for balance.', 'Bend your other knee and grab your ankle behind you.', 'Gently pull your heel toward your buttocks.', 'Hold for 30 seconds and switch legs.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'seated-hamstring-stretch', name: 'Seated Hamstring Stretch', description: 'Gentle seated stretch for the back of the thighs.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['hamstrings'], instructions: ['Sit on the ground with your legs extended straight in front of you.', 'Lean forward from your hips, reaching toward your toes.', 'Keep your back straight and don\'t round your shoulders.', 'Hold for 30 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'wall-shoulder-stretch', name: 'Wall Shoulder Stretch', description: 'Effective stretch using a wall to open up the shoulders and chest.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['front-shoulder'], instructions: ['Stand facing a wall with your right arm extended to the side.', 'Place your right hand on the wall at shoulder height.', 'Gently turn your body to the left, away from your arm.', 'Feel the stretch in your shoulder and chest.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch', description: 'Simple stretch that targets the rear deltoids and upper back.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['rear-shoulder'], instructions: ['Stand or sit with your right arm extended across your chest.', 'Use your left hand to gently pull your right arm closer to your chest.', 'Feel the stretch in your right shoulder and upper back.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>

            {/* Legs & Shoulders: Intermediate Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Legs & Shoulders: Intermediate</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-legs-shoulders-intermediate',
                  name: 'Legs & Shoulders Intermediate',
                  description: 'An intermediate routine targeting legs and shoulders with progressive exercises and stretches.',
                  difficulty: 'Intermediate',
                  exercises: [
                    // Legs (quads, hamstrings, calves)
                    { id: 'goblet-squat', name: 'Goblet Squat', description: 'Dumbbell squat variation for form and depth.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['quads', 'glutes', 'hamstrings'], instructions: ['Hold dumbbell at chest', 'Stand with feet shoulder-width', 'Squat down deep', 'Return to standing'], imageUrl: '/images/exercises/goblet-squat.jpg' },
                    { id: 'dumbbell-lunge', name: 'Dumbbell Lunge', description: 'Unilateral leg exercise with dumbbells.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['quads', 'glutes', 'hamstrings'], instructions: ['Hold dumbbells at sides', 'Step forward with one leg', 'Lower body until knees bent', 'Return to start'], imageUrl: '/images/exercises/dumbbell-lunge.jpg' },
                    { id: 'dumbbell-calf-raise', name: 'Dumbbell Calf Raise', description: 'Weighted calf exercise for strength.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['calves'], instructions: ['Hold dumbbells at sides', 'Stand on edge of step', 'Raise heels up', 'Lower below step'], imageUrl: '/images/exercises/dumbbell-calf-raise.jpg' },
                    { id: 'dumbbell-romanian-deadlift', name: 'Dumbbell Romanian Deadlift', description: 'Hip hinge movement for hamstrings and glutes.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['hamstrings', 'glutes', 'lower-back'], instructions: ['Hold dumbbells in front', 'Hinge at hips', 'Lower dumbbells down legs', 'Return to standing'], imageUrl: '/images/exercises/dumbbell-romanian-deadlift.jpg' },
                    // Shoulders (front, side, rear delts)
                    { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', description: 'Classic overhead press for shoulder strength.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['front-shoulder', 'side-shoulder'], instructions: ['Sit or stand with dumbbells at shoulders', 'Press dumbbells overhead', 'Lower back to shoulders', 'Repeat'], imageUrl: '/images/exercises/dumbbell-shoulder-press.jpg' },
                    { id: 'lateral-raise', name: 'Lateral Raise', description: 'Isolation exercise for side deltoids.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['side-shoulder'], instructions: ['Hold dumbbells at sides', 'Raise arms out to sides', 'Keep slight bend in elbows', 'Lower with control'], imageUrl: '/images/exercises/lateral-raise.jpg' },
                    { id: 'front-raise', name: 'Front Raise', description: 'Isolation exercise for front deltoids.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['front-shoulder'], instructions: ['Hold dumbbells in front', 'Raise arms forward', 'Keep arms straight', 'Lower with control'], imageUrl: '/images/exercises/front-raise.jpg' },
                    { id: 'reverse-fly', name: 'Reverse Fly', description: 'Isolation exercise for rear deltoids.', equipment: 'Dumbbell', difficulty: 'Intermediate', musclesWorked: ['rear-shoulder'], instructions: ['Bend at hips with dumbbells', 'Raise arms out to sides', 'Squeeze shoulder blades', 'Lower with control'], imageUrl: '/images/exercises/reverse-fly.jpg' },
                    // Stretches (legs & shoulders)
                    { id: 'standing-quad-stretch', name: 'Standing Quad Stretch', description: 'Simple standing stretch for the quadriceps muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['quads'], instructions: ['Stand on one leg, holding onto a wall or chair for balance.', 'Bend your other knee and grab your ankle behind you.', 'Gently pull your heel toward your buttocks.', 'Hold for 30 seconds and switch legs.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'seated-hamstring-stretch', name: 'Seated Hamstring Stretch', description: 'Gentle seated stretch for the back of the thighs.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['hamstrings'], instructions: ['Sit on the ground with your legs extended straight in front of you.', 'Lean forward from your hips, reaching toward your toes.', 'Keep your back straight and don\'t round your shoulders.', 'Hold for 30 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'wall-shoulder-stretch', name: 'Wall Shoulder Stretch', description: 'Effective stretch using a wall to open up the shoulders and chest.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['front-shoulder'], instructions: ['Stand facing a wall with your right arm extended to the side.', 'Place your right hand on the wall at shoulder height.', 'Gently turn your body to the left, away from your arm.', 'Feel the stretch in your shoulder and chest.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch', description: 'Simple stretch that targets the rear deltoids and upper back.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['rear-shoulder'], instructions: ['Stand or sit with your right arm extended across your chest.', 'Use your left hand to gently pull your right arm closer to your chest.', 'Feel the stretch in your right shoulder and upper back.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>

            {/* Legs & Shoulders: Advanced Routine */}
            <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
              <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="36" y="20" width="6" height="8" rx="2" fill="white"/>
                <rect x="14" y="22" width="20" height="4" rx="2" fill="white"/>
                <rect x="10" y="18" width="4" height="12" rx="2" fill="white"/>
                <rect x="34" y="18" width="4" height="12" rx="2" fill="white"/>
              </svg>
              <span className="text-xl font-semibold mb-2">Legs & Shoulders: Advanced</span>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold mt-6"
                onClick={() => setModalRoutine({
                  id: 'premade-legs-shoulders-advanced',
                  name: 'Legs & Shoulders Advanced',
                  description: 'An advanced routine targeting legs and shoulders with challenging compound and isolation movements.',
                  difficulty: 'Advanced',
                  exercises: [
                    // Legs (quads, hamstrings, calves)
                    { id: 'barbell-squat', name: 'Barbell Squat', description: 'King of leg exercises for overall strength.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['quads', 'glutes', 'hamstrings'], instructions: ['Place barbell on upper back', 'Stand with feet shoulder-width', 'Squat down deep', 'Drive back up'], imageUrl: '/images/exercises/barbell-squat.jpg' },
                    { id: 'barbell-deadlift', name: 'Barbell Deadlift', description: 'Compound exercise for posterior chain strength.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['hamstrings', 'glutes', 'lower-back'], instructions: ['Stand with feet shoulder-width', 'Bend at hips and knees', 'Grip bar with overhand grip', 'Lift by extending hips and knees'], imageUrl: '/images/exercises/barbell-deadlift.jpg' },
                    { id: 'barbell-lunge', name: 'Barbell Lunge', description: 'Advanced unilateral leg exercise.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['quads', 'glutes', 'hamstrings'], instructions: ['Place barbell on upper back', 'Step forward with one leg', 'Lower until knees bent', 'Return to start'], imageUrl: '/images/exercises/barbell-lunge.jpg' },
                    { id: 'standing-calf-raise', name: 'Standing Calf Raise', description: 'Advanced calf exercise with barbell.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['calves'], instructions: ['Place barbell on upper back', 'Stand on edge of step', 'Raise heels up', 'Lower below step'], imageUrl: '/images/exercises/standing-calf-raise.jpg' },
                    // Shoulders (front, side, rear delts)
                    { id: 'barbell-shoulder-press', name: 'Barbell Shoulder Press', description: 'Advanced overhead press for strength.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['front-shoulder', 'side-shoulder'], instructions: ['Hold barbell at shoulders', 'Press barbell overhead', 'Lower back to shoulders', 'Repeat'], imageUrl: '/images/exercises/barbell-shoulder-press.jpg' },
                    { id: 'arnold-press', name: 'Arnold Press', description: 'Rotating press for full shoulder development.', equipment: 'Dumbbell', difficulty: 'Advanced', musclesWorked: ['front-shoulder', 'side-shoulder'], instructions: ['Start with dumbbells at chest', 'Rotate and press overhead', 'Lower with reverse rotation', 'Repeat'], imageUrl: '/images/exercises/arnold-press.jpg' },
                    { id: 'upright-row', name: 'Upright Row', description: 'Compound shoulder and trap exercise.', equipment: 'Barbell', difficulty: 'Advanced', musclesWorked: ['front-shoulder', 'side-shoulder', 'traps'], instructions: ['Hold barbell with narrow grip', 'Pull barbell up to chin', 'Keep elbows high', 'Lower with control'], imageUrl: '/images/exercises/upright-row.jpg' },
                    { id: 'face-pull', name: 'Face Pull', description: 'Rear delt and rotator cuff exercise.', equipment: 'Cable', difficulty: 'Advanced', musclesWorked: ['rear-shoulder'], instructions: ['Set cable at face height', 'Pull rope to face', 'Separate hands at end', 'Return with control'], imageUrl: '/images/exercises/face-pull.jpg' },
                    // Stretches (legs & shoulders)
                    { id: 'standing-quad-stretch', name: 'Standing Quad Stretch', description: 'Simple standing stretch for the quadriceps muscles.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['quads'], instructions: ['Stand on one leg, holding onto a wall or chair for balance.', 'Bend your other knee and grab your ankle behind you.', 'Gently pull your heel toward your buttocks.', 'Hold for 30 seconds and switch legs.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'seated-hamstring-stretch', name: 'Seated Hamstring Stretch', description: 'Gentle seated stretch for the back of the thighs.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['hamstrings'], instructions: ['Sit on the ground with your legs extended straight in front of you.', 'Lean forward from your hips, reaching toward your toes.', 'Keep your back straight and don\'t round your shoulders.', 'Hold for 30 seconds, breathing deeply.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'wall-shoulder-stretch', name: 'Wall Shoulder Stretch', description: 'Effective stretch using a wall to open up the shoulders and chest.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['front-shoulder'], instructions: ['Stand facing a wall with your right arm extended to the side.', 'Place your right hand on the wall at shoulder height.', 'Gently turn your body to the left, away from your arm.', 'Feel the stretch in your shoulder and chest.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' },
                    { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch', description: 'Simple stretch that targets the rear deltoids and upper back.', equipment: 'Bodyweight', difficulty: 'Beginner', musclesWorked: ['rear-shoulder'], instructions: ['Stand or sit with your right arm extended across your chest.', 'Use your left hand to gently pull your right arm closer to your chest.', 'Feel the stretch in your right shoulder and upper back.', 'Hold for 30 seconds and repeat on the other side.'], imageUrl: '/images/stretch-placeholder.jpg' }
                  ]
                })}
              >
                View Routine
              </button>
            </div>
          </div>
        </div>
        {/* Modal for Routine Details */}
        {modalRoutine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setModalRoutine(null)}>
            <div
              className="bg-[#18191c] rounded-2xl shadow-2xl p-8 max-w-7xl w-full relative text-white border border-gray-700 max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                onClick={() => setModalRoutine(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold mb-2">{modalRoutine.name}</h2>
              <p className="mb-4 text-gray-300">{modalRoutine.description}</p>
              <div className="mb-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`completed-${modalRoutine.id}`}
                  checked={!!completedRoutines[modalRoutine.id]}
                  onChange={e => handleRoutineCompleted(modalRoutine.id, e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400 border-gray-600 bg-[#232428]"
                />
                <label htmlFor={`completed-${modalRoutine.id}`} className="text-lg select-none">
                  Mark as Completed
                </label>
                {completedRoutines[modalRoutine.id] && (
                  <span className="ml-2 text-green-400 font-semibold">✓ Completed</span>
                )}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Difficulty:</span> <span className="text-gray-200">{modalRoutine.difficulty}</span>
              </div>
              <div className="mb-2 flex items-center gap-4">
                <span className="font-semibold">Exercises:</span>
                <button
                  className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold shadow"
                  onClick={() => setShowAddExercise(true)}
                >
                  Add Exercise
                </button>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Exercises:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 items-stretch min-w-0">
                  {/* Group stretches and exercises */}
                  {(() => {
                    const stretches = modalRoutine.exercises.filter((ex: any) => ex.name.toLowerCase().includes('stretch'));
                    const exercises = modalRoutine.exercises.filter((ex: any) => !ex.name.toLowerCase().includes('stretch'));
                    return (
                      <>
                        {stretches.length > 0 && (
                          <div className="col-span-full mb-2">
                            <h3 className="text-lg font-bold text-blue-300">Stretches</h3>
                          </div>
                        )}
                        {stretches.map((ex: any) => {
                          const allExercises = exercisesData.muscleGroups.flatMap((mg: any) => mg.exercises);
                          const fullExercise = allExercises.find((e: any) => e.id === ex.id) || ex;
                          return (
                            <div key={ex.id} className="card bg-[#232428] border border-gray-700 text-left hover:ring-2 hover:ring-blue-400 p-3 text-sm flex flex-col h-full flex-1 min-w-0 overflow-hidden mb-4"
                              onClick={() => {
                                setModalExercise(fullExercise);
                                setUploadedImage(null);
                                setImageError(false);
                              }}
                            >
                              <h3 className="text-lg font-semibold text-white mb-1">{ex.name}</h3>
                              <p className="text-gray-300 mb-1 line-clamp-2">{ex.description}</p>
                              <div className="flex flex-wrap gap-1 mb-1">
                                <EquipmentTag equipment={ex.equipment || ''} />
                              </div>
                              <p className="text-gray-400 text-xs mb-0">Difficulty: {ex.difficulty}</p>
                              <button
                                type="button"
                                className={`mt-2 px-2 py-1 rounded text-xs font-semibold border transition
                                  ${completedExercises[modalRoutine.id]?.[ex.id]
                                    ? 'bg-green-600/80 text-white border-green-500 hover:bg-red-700 hover:border-red-500 hover:text-white'
                                    : 'bg-gray-700 text-gray-300 border-gray-500 hover:bg-blue-700 hover:text-white'}
                                `}
                                onClick={e => {
                                  e.stopPropagation();
                                  handleExerciseCompleted(
                                    modalRoutine.id,
                                    ex.id,
                                    !completedExercises[modalRoutine.id]?.[ex.id]
                                  );
                                }}
                              >
                                {completedExercises[modalRoutine.id]?.[ex.id] ? '✓ Completed (Click to Undo)' : 'Mark Complete'}
                              </button>
                              <div className="mt-3 flex flex-col gap-2">
                                {(exerciseLogs[modalRoutine.id]?.[ex.id] || [{ sets: '', reps: '', weight: '' }]).map((log, idx) => (
                                  <div key={idx} className="flex flex-nowrap gap-1 items-end">
                                    {fullExercise.equipment === 'bodyweight' && fullExercise.musclesWorked?.includes('heart') ? (
                                      <>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`distance-${modalRoutine.id}-${ex.id}-${idx}`}>Distance (mi)</label>
                                          <input
                                            id={`distance-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Distance"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.sets}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'sets', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`time-${modalRoutine.id}-${ex.id}-${idx}`}>Time (min)</label>
                                          <input
                                            id={`time-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Time"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.reps}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'reps', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`pace-${modalRoutine.id}-${ex.id}-${idx}`}>Pace (min/mi)</label>
                                          <input
                                            id={`pace-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Pace"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.weight}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'weight', e.target.value)}
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`sets-${modalRoutine.id}-${ex.id}-${idx}`}>Sets</label>
                                          <input
                                            id={`sets-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Sets"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.sets}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'sets', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`reps-${modalRoutine.id}-${ex.id}-${idx}`}>Reps</label>
                                          <input
                                            id={`reps-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Reps"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.reps}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'reps', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`weight-${modalRoutine.id}-${ex.id}-${idx}`}>Weight</label>
                                          <input
                                            id={`weight-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Weight"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.weight}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'weight', e.target.value)}
                                          />
                                        </div>
                                      </>
                                    )}
                                    <button
                                      type="button"
                                      className="ml-1 px-1.5 py-1 text-xs bg-blue-700 hover:bg-blue-600 text-white font-bold shadow"
                                      onClick={e => {
                                        e.stopPropagation();
                                        handleAddSetLine(modalRoutine.id, ex.id);
                                      }}
                                      title="Add another set"
                                    >
                                      +
                                    </button>
                                  </div>
                                ))}
                                {/* PR Editable Box */}
                                <div className="flex items-center gap-2 mb-2">
                                  <label className="text-xs text-gray-400" htmlFor={`pr-${ex.id}`}>PR:</label>
                                  <input
                                    id={`pr-${ex.id}`}
                                    type="text"
                                    className="w-28 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={prInputs[ex.id] ?? ''}
                                    onChange={e => handlePRInputChange(ex.id, e.target.value)}
                                    onClick={e => e.stopPropagation()}
                                  />
                                  <button
                                    className="px-2 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold shadow"
                                    onClick={e => { e.stopPropagation(); handlePRSave(ex.id); }}
                                  >
                                    Save
                                  </button>
                                  {exercisePRs[ex.id] && (
                                    <span className="ml-2 text-green-400 text-xs">Current: {exercisePRs[ex.id]}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {exercises.length > 0 && (
                          <div className="col-span-full mb-2 mt-4">
                            <h3 className="text-lg font-bold text-blue-300">Exercises</h3>
                          </div>
                        )}
                        {exercises.map((ex: any) => {
                          const allExercises = exercisesData.muscleGroups.flatMap((mg: any) => mg.exercises);
                          const fullExercise = allExercises.find((e: any) => e.id === ex.id) || ex;
                          return (
                            <div key={ex.id} className="card bg-[#232428] border border-gray-700 text-left hover:ring-2 hover:ring-blue-400 p-3 text-sm flex flex-col h-full flex-1 min-w-0 overflow-hidden mb-4"
                              onClick={() => {
                                setModalExercise(fullExercise);
                                setUploadedImage(null);
                                setImageError(false);
                              }}
                            >
                              <h3 className="text-lg font-semibold text-white mb-1">{ex.name}</h3>
                              <p className="text-gray-300 mb-1 line-clamp-2">{ex.description}</p>
                              <div className="flex flex-wrap gap-1 mb-1">
                                <EquipmentTag equipment={ex.equipment || ''} />
                              </div>
                              <p className="text-gray-400 text-xs mb-0">Difficulty: {ex.difficulty}</p>
                              <button
                                type="button"
                                className={`mt-2 px-2 py-1 rounded text-xs font-semibold border transition
                                  ${completedExercises[modalRoutine.id]?.[ex.id]
                                    ? 'bg-green-600/80 text-white border-green-500 hover:bg-red-700 hover:border-red-500 hover:text-white'
                                    : 'bg-gray-700 text-gray-300 border-gray-500 hover:bg-blue-700 hover:text-white'}
                                `}
                                onClick={e => {
                                  e.stopPropagation();
                                  handleExerciseCompleted(
                                    modalRoutine.id,
                                    ex.id,
                                    !completedExercises[modalRoutine.id]?.[ex.id]
                                  );
                                }}
                              >
                                {completedExercises[modalRoutine.id]?.[ex.id] ? '✓ Completed (Click to Undo)' : 'Mark Complete'}
                              </button>
                              <div className="mt-3 flex flex-col gap-2">
                                {(exerciseLogs[modalRoutine.id]?.[ex.id] || [{ sets: '', reps: '', weight: '' }]).map((log, idx) => (
                                  <div key={idx} className="flex flex-nowrap gap-1 items-end">
                                    {fullExercise.equipment === 'bodyweight' && fullExercise.musclesWorked?.includes('heart') ? (
                                      <>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`distance-${modalRoutine.id}-${ex.id}-${idx}`}>Distance (mi)</label>
                                          <input
                                            id={`distance-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Distance"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.sets}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'sets', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`time-${modalRoutine.id}-${ex.id}-${idx}`}>Time (min)</label>
                                          <input
                                            id={`time-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Time"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.reps}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'reps', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`pace-${modalRoutine.id}-${ex.id}-${idx}`}>Pace (min/mi)</label>
                                          <input
                                            id={`pace-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Pace"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.weight}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'weight', e.target.value)}
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`sets-${modalRoutine.id}-${ex.id}-${idx}`}>Sets</label>
                                          <input
                                            id={`sets-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Sets"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.sets}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'sets', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`reps-${modalRoutine.id}-${ex.id}-${idx}`}>Reps</label>
                                          <input
                                            id={`reps-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Reps"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.reps}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'reps', e.target.value)}
                                          />
                                        </div>
                                        <div className="flex flex-col items-center">
                                          <label className="text-xs text-gray-400 mb-1" htmlFor={`weight-${modalRoutine.id}-${ex.id}-${idx}`}>Weight</label>
                                          <input
                                            id={`weight-${modalRoutine.id}-${ex.id}-${idx}`}
                                            type="text"
                                            placeholder="Weight"
                                            className="w-14 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={log.weight}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => handleExerciseLogChange(modalRoutine.id, ex.id, idx, 'weight', e.target.value)}
                                          />
                                        </div>
                                      </>
                                    )}
                                    <button
                                      type="button"
                                      className="ml-1 px-1.5 py-1 text-xs bg-blue-700 hover:bg-blue-600 text-white font-bold shadow"
                                      onClick={e => {
                                        e.stopPropagation();
                                        handleAddSetLine(modalRoutine.id, ex.id);
                                      }}
                                      title="Add another set"
                                    >
                                      +
                                    </button>
                                  </div>
                                ))}
                                {/* PR Editable Box */}
                                <div className="flex items-center gap-2 mb-2">
                                  <label className="text-xs text-gray-400" htmlFor={`pr-${ex.id}`}>PR:</label>
                                  <input
                                    id={`pr-${ex.id}`}
                                    type="text"
                                    className="w-28 px-2 py-1 rounded bg-[#232428] border border-gray-600 text-xs text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={prInputs[ex.id] ?? ''}
                                    onChange={e => handlePRInputChange(ex.id, e.target.value)}
                                    onClick={e => e.stopPropagation()}
                                  />
                                  <button
                                    className="px-2 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold shadow"
                                    onClick={e => { e.stopPropagation(); handlePRSave(ex.id); }}
                                  >
                                    Save
                                  </button>
                                  {exercisePRs[ex.id] && (
                                    <span className="ml-2 text-green-400 text-xs">Current: {exercisePRs[ex.id]}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <textarea
                  className="w-full mb-2 px-3 py-2 rounded bg-[#232428] border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add notes about this workout (optional)"
                  value={routineNotes[modalRoutine.id] || ''}
                  onChange={e => setRoutineNotes(notes => ({ ...notes, [modalRoutine.id]: e.target.value }))}
                  rows={2}
                />
                <button
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold shadow mr-4"
                  onClick={() => modalRoutine && handleResetRoutine(modalRoutine.id)}
                >
                  Reset Routine
                </button>
                <label htmlFor="log-date" className="text-sm text-gray-300 mr-2">Workout Date:</label>
                <input
                  id="log-date"
                  type="date"
                  className="bg-[#232428] border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={logDate}
                  onChange={e => setLogDate(e.target.value)}
                />
                <label htmlFor="start-time" className="text-sm text-gray-300 ml-2">Start Time:</label>
                <input
                  id="start-time"
                  type="time"
                  className="bg-[#232428] border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={startTime ?? ''}
                  onChange={e => setStartTime(e.target.value)}
                />
                <label htmlFor="end-time" className="text-sm text-gray-300 ml-2">End Time:</label>
                <input
                  id="end-time"
                  type="time"
                  className="bg-[#232428] border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={endTime ?? ''}
                  onChange={e => setEndTime(e.target.value)}
                />
                <button
                  className="ml-4 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow"
                  onClick={() => modalRoutine && handleSaveLog(modalRoutine)}
                >
                  Save Log
                </button>
              </div>
              {/* Past Logs */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2 text-white">Past Workout Logs</h3>
                {routineLogs[modalRoutine?.id || '']?.length > 0 ? (
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {(routineLogs[modalRoutine?.id || ''] as WorkoutLog[]).map((log: WorkoutLog, idx: number) => (
                      <div key={idx} className="bg-[#232428] border border-gray-700 rounded-lg p-3 relative">
                        <button
                          className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-200 bg-[#232428] border border-red-400 rounded px-2 py-1"
                          title="Delete Log"
                          onClick={() => handleDeleteLog((modalRoutine?.id || ''), idx)}
                        >
                          Delete
                        </button>
                        {log.notes && (
                          <div className="mb-2 text-blue-300 text-xs italic whitespace-pre-line">{log.notes}</div>
                        )}
                        <div className="flex items-center text-gray-300 text-sm mb-2">
                          <span>{log.date}</span>
                          {log.completed ? (
                            <span className="ml-3 text-green-400 font-semibold text-xs">&#10003; Completed</span>
                          ) : (
                            <span className="ml-3 text-gray-400 font-semibold text-xs">Not Completed</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mb-1">
                          <span>Start: {log.startTime || 'N/A'} | End: {log.endTime || 'N/A'} | Duration: {log.duration || 'N/A'}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {log.exercises.map((ex: any) => {
                            // Always get the full exercise object for correct properties
                            const allExercises = exercisesData.muscleGroups.flatMap((mg: any) => mg.exercises);
                            const fullExercise = allExercises.find((e: any) => e.id === ex.id) || ex;
                            return (
                              <div key={ex.id} className="text-xs text-gray-200 border-b border-gray-700 pb-1 mb-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-white">{ex.name}</span>
                                  {ex.completed ? (
                                    <span className="ml-3 text-green-400 font-semibold text-xs">&#10003; Completed</span>
                                  ) : (
                                    <span className="ml-3 text-gray-400 font-semibold text-xs">Not Completed</span>
                                  )}
                                </div>
                                {(ex.sets || []).map((set: any, idx: number) => (
                                  <div key={idx} className="ml-2 flex gap-4">
                                    <span>Set {idx + 1}:</span>
                                    {fullExercise.equipment === 'bodyweight' && fullExercise.musclesWorked?.includes('heart') ? (
                                      <>
                                        <span>Distance: <span className="font-mono">{set.sets} mi</span></span>
                                        <span>Time: <span className="font-mono">{set.reps} min</span></span>
                                        <span>Pace: <span className="font-mono">{set.weight} min/mi</span></span>
                                      </>
                                    ) : (
                                      <>
                                        <span>Sets: <span className="font-mono">{set.sets}</span></span>
                                        <span>Reps: <span className="font-mono">{set.reps}</span></span>
                                        <span>Weight: <span className="font-mono">{set.weight}</span></span>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">No logs yet. Complete a workout and save your log!</div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Modal for Exercise Details */}
        {modalExercise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setModalExercise(null)}>
            <div
              className="bg-[#18191c] rounded-2xl shadow-2xl p-8 max-w-lg w-full relative text-white border border-gray-700"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                onClick={() => setModalExercise(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold mb-2">{modalExercise.name}</h2>
              <p className="mb-4 text-gray-300">{modalExercise.description}</p>
              {/* Image or Placeholder */}
              {uploadedImage ? (
                <img src={uploadedImage} alt={modalExercise.name} className="w-full h-48 object-contain rounded-lg mb-4 bg-black" />
              ) : modalExercise.imageUrl && !imageError ? (
                <img
                  src={modalExercise.imageUrl}
                  alt={modalExercise.name}
                  className="w-full h-48 object-contain rounded-lg mb-4 bg-black"
                  onError={handleImageError}
                />
              ) : (
                <div
                  className="w-full h-48 flex flex-col items-center justify-center rounded-lg mb-4 bg-gray-800 border-2 border-dashed border-gray-600 cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="text-gray-400 text-3xl mb-2">📷</span>
                  <span className="text-gray-400">Upload Image</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
              <div className="mb-2">
                <span className="font-semibold">Muscles Worked:</span>
                <ul className="list-disc list-inside ml-4 text-gray-200">
                  {modalExercise.musclesWorked?.map((m: string) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Equipment:</span>
                <div className="mt-1">
                  <EquipmentTag equipment={modalExercise.equipment || ''} />
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Difficulty:</span> <span className="text-gray-200">{modalExercise.difficulty}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Instructions:</span>
                <ol className="list-decimal list-inside ml-4 text-gray-200">
                  {modalExercise.instructions?.map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
        {/* Add Exercise Modal */}
        {showAddExercise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowAddExercise(false)}>
            <div
              className="bg-[#18191c] rounded-2xl shadow-2xl p-6 max-w-lg w-full relative text-white border border-gray-700"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                onClick={() => setShowAddExercise(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-4">Add Exercise to Routine</h3>
              <input
                type="text"
                placeholder="Search exercises..."
                className="w-full mb-4 px-3 py-2 rounded bg-[#232428] border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={exerciseSearch}
                onChange={e => setExerciseSearch(e.target.value)}
              />
              <div className="max-h-64 overflow-y-auto space-y-2">
                {allExercises
                  .filter(ex =>
                    modalRoutine && !modalRoutine.exercises.some((e: any) => e.id === ex.id) &&
                    (ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
                      ex.musclesWorked?.join(' ').toLowerCase().includes(exerciseSearch.toLowerCase()))
                  )
                  .map(ex => (
                    <button
                      key={ex.id}
                      className="w-full text-left px-3 py-2 rounded bg-[#232428] border border-gray-700 hover:bg-blue-800 hover:text-white transition"
                      onClick={() => handleAddExerciseToRoutine(ex)}
                    >
                      <span className="font-semibold text-white">{ex.name}</span>
                      <span className="ml-2 text-xs text-gray-400">{ex.musclesWorked?.join(', ')}</span>
                    </button>
                  ))}
                {allExercises.filter(ex =>
                  modalRoutine && !modalRoutine.exercises.some((e: any) => e.id === ex.id) &&
                  (ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
                    ex.musclesWorked?.join(' ').toLowerCase().includes(exerciseSearch.toLowerCase()))
                ).length === 0 && (
                  <div className="text-gray-400 text-sm">No exercises found.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Yoga Routines Banner */}
        <div className="w-full flex justify-center mb-8 mt-16">
          <div className="w-full max-w-3xl rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-700/80 py-6 px-4 flex items-center justify-center shadow-lg border border-gray-700/60">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
              Explore Our Pre-made Yoga Routines
            </h2>
          </div>
        </div>

        {/* Yoga Routines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Beginner Yoga Flow */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
            <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M16 20h16M16 28h16" stroke="white" strokeWidth="2"/>
              <circle cx="24" cy="24" r="4" fill="white"/>
            </svg>
            <h3 className="text-xl font-bold mb-2">Beginner Yoga Flow</h3>
            <button
              onClick={() => setModalRoutine({
                id: 'beginner-yoga-flow',
                name: 'Beginner Yoga Flow',
                description: 'A gentle yoga sequence perfect for beginners, focusing on relaxation, basic stretching, and foundational poses.',
                difficulty: 'Beginner',
                exercises: [
                  {
                    id: 'corpse-pose',
                    name: 'Corpse Pose (Savasana)',
                    description: 'A deeply relaxing pose that allows the body to fully rest and recover.',
                    equipment: 'None',
                    musclesWorked: ['biceps'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Lie flat on your back',
                      'Allow your arms to rest at your sides, palms facing up',
                      'Let your legs fall naturally apart',
                      'Close your eyes and focus on your breath',
                      'Stay in the pose for 5-10 minutes'
                    ]
                  },
                  {
                    id: 'seated-arm-stretch',
                    name: 'Seated Arm Stretch',
                    description: 'A gentle pose that stretches the biceps and shoulders.',
                    equipment: 'None',
                    musclesWorked: ['biceps'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Sit in a comfortable cross-legged position',
                      'Extend arms behind your back',
                      'Interlace fingers and straighten arms',
                      'Lift arms up as high as comfortable',
                      'Hold for 30 seconds to 1 minute'
                    ]
                  },
                  {
                    id: 'downward-dog-shoulders',
                    name: 'Downward-Facing Dog (Shoulders Focus)',
                    description: 'A foundational pose that stretches and strengthens the shoulders and upper back.',
                    equipment: 'None',
                    musclesWorked: ['shoulders'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Start on hands and knees',
                      'Lift hips up and back',
                      'Press hands into the mat and lengthen through the arms',
                      'Hold for 5-10 breaths'
                    ]
                  },
                  {
                    id: 'bridge-pose-glutes',
                    name: 'Bridge Pose (Glutes Focus)',
                    description: 'A classic pose that activates and strengthens the glutes while opening the hips.',
                    equipment: 'None',
                    musclesWorked: ['glutes'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Lie on your back with knees bent and feet hip-width apart',
                      'Press feet into the mat and lift hips toward the ceiling',
                      'Squeeze glutes at the top',
                      'Hold for 5-10 breaths, then lower down'
                    ]
                  },
                  {
                    id: 'warrior-i-quads',
                    name: 'Warrior I',
                    description: 'A powerful standing pose that builds strength and stability in the quads and legs.',
                    equipment: 'None',
                    musclesWorked: ['quads'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Stand with feet wide apart',
                      'Turn right foot out, left foot slightly in',
                      'Bend right knee over ankle',
                      'Reach arms overhead',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  }
                ]
              })}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Routine
            </button>
          </div>

          {/* Intermediate Yoga Flow */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
            <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M16 20h16M16 28h16" stroke="white" strokeWidth="2"/>
              <circle cx="24" cy="24" r="4" fill="white"/>
            </svg>
            <h3 className="text-xl font-bold mb-2">Intermediate Yoga Flow</h3>
            <button
              onClick={() => setModalRoutine({
                id: 'intermediate-yoga-flow',
                name: 'Intermediate Yoga Flow',
                description: 'A balanced yoga sequence that builds strength, improves balance, and deepens flexibility for intermediate practitioners.',
                difficulty: 'Intermediate',
                exercises: [
                  {
                    id: 'warrior-i-quads',
                    name: 'Warrior I',
                    description: 'A powerful standing pose that builds strength and stability in the quads and legs.',
                    equipment: 'None',
                    musclesWorked: ['quads'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Stand with feet wide apart',
                      'Turn right foot out, left foot slightly in',
                      'Bend right knee over ankle',
                      'Reach arms overhead',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'side-angle-lats',
                    name: 'Side Angle Pose (Lats Focus)',
                    description: 'A standing pose that stretches the lats, hips, and side body.',
                    equipment: 'None',
                    musclesWorked: ['lats'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Stand with feet wide apart',
                      'Bend one knee and place forearm on thigh',
                      'Reach top arm overhead for a deep lat stretch',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'chair-pose-glutes',
                    name: 'Chair Pose (Glutes Focus)',
                    description: 'A powerful standing pose that activates the glutes and builds lower body endurance.',
                    equipment: 'None',
                    musclesWorked: ['glutes'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Stand with feet together',
                      'Bend knees and lower hips as if sitting in a chair',
                      'Reach arms overhead',
                      'Engage glutes and hold',
                      'Hold for 5-10 breaths'
                    ]
                  },
                  {
                    id: 'dolphin-pose-shoulders',
                    name: 'Dolphin Pose (Shoulders Focus)',
                    description: 'A forearm-based inversion that builds shoulder and upper back strength.',
                    equipment: 'None',
                    musclesWorked: ['shoulders'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Start on hands and knees, lower forearms to the mat',
                      'Tuck toes and lift hips up and back',
                      'Keep forearms parallel and press down through elbows',
                      'Engage shoulders to support the pose',
                      'Hold for 5-10 breaths'
                    ]
                  },
                  {
                    id: 'plank-shoulders',
                    name: 'Plank Pose (Shoulders Focus)',
                    description: 'A core-strengthening pose that builds shoulder and arm stability.',
                    equipment: 'None',
                    musclesWorked: ['shoulders'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Start in push-up position',
                      'Keep body in straight line',
                      'Engage shoulders and core',
                      'Hold for 30 seconds to 1 minute'
                    ]
                  },
                  {
                    id: 'locust-pose-glutes',
                    name: 'Locust Pose (Glutes Focus)',
                    description: 'A prone pose that targets the glutes and strengthens the entire posterior chain.',
                    equipment: 'None',
                    musclesWorked: ['glutes'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Lie on your stomach, arms at sides',
                      'Inhale and lift chest, arms, and legs off the mat',
                      'Squeeze glutes and hold',
                      'Lower down and rest'
                    ]
                  }
                ]
              })}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Routine
            </button>
          </div>

          {/* Advanced Yoga Flow */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
            <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M16 20h16M16 28h16" stroke="white" strokeWidth="2"/>
              <circle cx="24" cy="24" r="4" fill="white"/>
            </svg>
            <h3 className="text-xl font-bold mb-2">Advanced Yoga Flow</h3>
            <button
              onClick={() => setModalRoutine({
                id: 'advanced-yoga-flow',
                name: 'Advanced Yoga Flow',
                description: 'A challenging yoga sequence featuring arm balances, deep backbends, and advanced strength and balance poses.',
                difficulty: 'Advanced',
                exercises: [
                  {
                    id: 'crow-pose',
                    name: 'Crow Pose (Bakasana)',
                    description: 'An arm-balancing pose that builds strength in the biceps and core.',
                    equipment: 'None',
                    musclesWorked: ['biceps'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Start in a squat position',
                      'Place hands shoulder-width apart on the floor',
                      'Bend elbows and place knees on upper arms',
                      'Shift weight forward onto hands',
                      'Lift feet off the ground and balance'
                    ]
                  },
                  {
                    id: 'wheel-pose-abdominals',
                    name: 'Wheel Pose (Abdominals)',
                    description: 'An advanced yoga pose that provides maximum stretch for the abdominals.',
                    equipment: 'None',
                    musclesWorked: ['abdominals'],
                    difficulty: 'Advanced',
                    instructions: [
                      'Lie on your back with knees bent and feet flat.',
                      'Place your hands by your ears, fingers pointing toward shoulders.',
                      'Press into your hands and feet to lift your body.',
                      'Straighten your arms and legs, arching your back.',
                      'Hold for 30 seconds, breathing deeply.'
                    ]
                  },
                  {
                    id: 'revolved-side-angle-lats',
                    name: 'Revolved Side Angle Pose (Lats Focus)',
                    description: 'A twisting lunge that stretches the lats and strengthens the legs.',
                    equipment: 'None',
                    musclesWorked: ['lats'],
                    difficulty: 'Advanced',
                    instructions: [
                      'Start in a lunge position',
                      'Twist torso and bring opposite elbow to outside of front knee',
                      'Reach top arm overhead for a deep lat stretch',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'bow-lower-back',
                    name: 'Bow Pose (Lower Back)',
                    description: 'A backbend that actively engages the lower back as you pull your feet toward your head.',
                    equipment: 'None',
                    musclesWorked: ['lower-back'],
                    difficulty: 'Advanced',
                    instructions: [
                      'Lie on your stomach',
                      'Bend knees and reach back to grab ankles',
                      'Inhale and lift chest and thighs off the mat',
                      'Pull feet toward head, engaging lower back',
                      'Hold for 5-8 breaths'
                    ]
                  },
                  {
                    id: 'half-moon-quads',
                    name: 'Half Moon Pose (Quads Focus)',
                    description: 'A balancing pose that activates the quads and improves stability.',
                    equipment: 'None',
                    musclesWorked: ['quads'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Stand tall, shift weight to right leg',
                      'Reach right hand to the floor, lift left leg up',
                      'Engage quads to stabilize',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'side-plank-bicep',
                    name: 'Side Plank with Bicep Curl',
                    description: 'A dynamic variation of side plank that incorporates a bicep curl for added arm strength.',
                    equipment: 'None',
                    musclesWorked: ['biceps'],
                    difficulty: 'Advanced',
                    instructions: [
                      'Start in side plank on right hand, left foot stacked on right',
                      'Hold a light dumbbell or use bodyweight for left arm',
                      'Curl left arm up toward shoulder, keeping elbow stable',
                      'Lower arm and repeat for several reps',
                      'Switch sides and repeat'
                    ]
                  }
                ]
              })}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Routine
            </button>
          </div>
        </div>

        {/* Themed Yoga Routines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-8">
          {/* Morning Flow */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
            <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M16 20h16M16 28h16" stroke="white" strokeWidth="2"/>
              <circle cx="24" cy="24" r="4" fill="white"/>
            </svg>
            <h3 className="text-xl font-bold mb-2">Morning Flow</h3>
            <button
              onClick={() => setModalRoutine({
                id: 'morning-yoga-flow',
                name: 'Morning Flow',
                description: 'An energizing yoga sequence perfect for starting your day, featuring sun salutations and invigorating poses that boost energy and focus.',
                difficulty: 'Beginner',
                exercises: [
                  {
                    id: 'sun-salutation-a',
                    name: 'Sun Salutation A',
                    description: 'A dynamic sequence that warms up the body and energizes the mind.',
                    equipment: 'None',
                    musclesWorked: ['full-body'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Start in mountain pose with hands at heart center',
                      'Inhale, reach arms overhead',
                      'Exhale, fold forward from hips',
                      'Inhale, lift chest halfway',
                      'Exhale, step back to plank, lower to ground',
                      'Inhale, lift chest (cobra), exhale to downward dog',
                      'Hold for 5 breaths, then step forward',
                      'Repeat 3-5 times'
                    ]
                  },
                  {
                    id: 'warrior-i-quads',
                    name: 'Warrior I',
                    description: 'A powerful standing pose that builds strength and stability in the quads and legs.',
                    equipment: 'None',
                    musclesWorked: ['quads'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Stand with feet wide apart',
                      'Turn right foot out, left foot slightly in',
                      'Bend right knee over ankle',
                      'Reach arms overhead',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'plank-shoulders',
                    name: 'Plank Pose (Shoulders Focus)',
                    description: 'A core-strengthening pose that builds shoulder and arm stability.',
                    equipment: 'None',
                    musclesWorked: ['shoulders'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Start in push-up position',
                      'Keep body in straight line',
                      'Engage shoulders and core',
                      'Hold for 30 seconds to 1 minute'
                    ]
                  },
                  {
                    id: 'bridge-pose-glutes',
                    name: 'Bridge Pose (Glutes Focus)',
                    description: 'A classic pose that activates and strengthens the glutes while opening the hips.',
                    equipment: 'None',
                    musclesWorked: ['glutes'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Lie on your back with knees bent and feet hip-width apart',
                      'Press feet into the mat and lift hips toward the ceiling',
                      'Squeeze glutes at the top',
                      'Hold for 5-10 breaths, then lower down'
                    ]
                  },
                  {
                    id: 'downward-dog-shoulders',
                    name: 'Downward-Facing Dog (Shoulders Focus)',
                    description: 'A foundational pose that stretches and strengthens the shoulders and upper back.',
                    equipment: 'None',
                    musclesWorked: ['shoulders'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Start on hands and knees',
                      'Lift hips up and back',
                      'Press hands into the mat and lengthen through the arms',
                      'Hold for 5-10 breaths'
                    ]
                  }
                ]
              })}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Routine
            </button>
          </div>

          {/* Strength & Balance */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
            <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M16 20h16M16 28h16" stroke="white" strokeWidth="2"/>
              <circle cx="24" cy="24" r="4" fill="white"/>
            </svg>
            <h3 className="text-xl font-bold mb-2">Strength & Balance</h3>
            <button
              onClick={() => setModalRoutine({
                id: 'strength-balance-yoga',
                name: 'Strength & Balance',
                description: 'A challenging sequence focused on building functional strength, improving balance, and developing core stability through dynamic poses.',
                difficulty: 'Intermediate',
                exercises: [
                  {
                    id: 'crow-pose',
                    name: 'Crow Pose (Bakasana)',
                    description: 'An arm-balancing pose that builds strength in the biceps and core.',
                    equipment: 'None',
                    musclesWorked: ['biceps'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Start in a squat position',
                      'Place hands shoulder-width apart on the floor',
                      'Bend elbows and place knees on upper arms',
                      'Shift weight forward onto hands',
                      'Lift feet off the ground and balance'
                    ]
                  },
                  {
                    id: 'half-moon-quads',
                    name: 'Half Moon Pose (Quads Focus)',
                    description: 'A balancing pose that activates the quads and improves stability.',
                    equipment: 'None',
                    musclesWorked: ['quads'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Stand tall, shift weight to right leg',
                      'Reach right hand to the floor, lift left leg up',
                      'Engage quads to stabilize',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'dolphin-pose-shoulders',
                    name: 'Dolphin Pose (Shoulders Focus)',
                    description: 'A forearm-based inversion that builds shoulder and upper back strength.',
                    equipment: 'None',
                    musclesWorked: ['shoulders'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Start on hands and knees, lower forearms to the mat',
                      'Tuck toes and lift hips up and back',
                      'Keep forearms parallel and press down through elbows',
                      'Engage shoulders to support the pose',
                      'Hold for 5-10 breaths'
                    ]
                  },
                  {
                    id: 'side-plank-triceps',
                    name: 'Side Plank (Triceps Focus)',
                    description: 'A balancing pose that activates the triceps and improves arm stability.',
                    equipment: 'None',
                    musclesWorked: ['triceps'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Start in side plank on right hand, left foot stacked on right',
                      'Lift left arm toward ceiling',
                      'Engage triceps to stabilize the pose',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'warrior-iii-glutes',
                    name: 'Warrior III (Glutes Focus)',
                    description: 'A balancing pose that activates the glutes and improves lower body strength.',
                    equipment: 'None',
                    musclesWorked: ['glutes'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Stand tall, shift weight to one leg',
                      'Hinge forward at hips, extending other leg back',
                      'Reach arms forward or to the sides',
                      'Keep hips level and engage glutes',
                      'Hold for 5-10 breaths, then switch sides'
                    ]
                  },
                  {
                    id: 'boat-pose-abdominals',
                    name: 'Boat Pose (Abdominals)',
                    description: 'A balancing pose that strengthens and stretches the abdominals.',
                    equipment: 'None',
                    musclesWorked: ['abdominals'],
                    difficulty: 'Intermediate',
                    instructions: [
                      'Sit on the floor with legs extended.',
                      'Lean back slightly and lift your legs off the floor.',
                      'Extend your arms forward, parallel to the floor.',
                      'Balance on your sit bones, keeping your back straight.',
                      'Hold for 30 seconds, breathing deeply.'
                    ]
                  }
                ]
              })}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Routine
            </button>
          </div>

          {/* Relax & Restore */}
          <div className="card bg-gradient-to-br from-gray-900/90 to-gray-700/80 border border-gray-700/40 text-white shadow-lg flex flex-col items-center justify-center min-h-[120px] p-6">
            <svg className="mb-2" width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M16 20h16M16 28h16" stroke="white" strokeWidth="2"/>
              <circle cx="24" cy="24" r="4" fill="white"/>
            </svg>
            <h3 className="text-xl font-bold mb-2">Relax & Restore</h3>
            <button
              onClick={() => setModalRoutine({
                id: 'relax-restore-yoga',
                name: 'Relax & Restore',
                description: 'A gentle, restorative sequence designed to release tension, reduce stress, and promote deep relaxation through supported poses and mindful breathing.',
                difficulty: 'Beginner',
                exercises: [
                  {
                    id: 'corpse-pose',
                    name: 'Corpse Pose (Savasana)',
                    description: 'A deeply relaxing pose that allows the body to fully rest and recover.',
                    equipment: 'None',
                    musclesWorked: ['biceps'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Lie flat on your back',
                      'Allow your arms to rest at your sides, palms facing up',
                      'Let your legs fall naturally apart',
                      'Close your eyes and focus on your breath',
                      'Stay in the pose for 5-10 minutes'
                    ]
                  },
                  {
                    id: 'childs-pose-back-stretch',
                    name: "Child's Pose Back Stretch",
                    description: 'Gentle restorative stretch that releases tension in the back and shoulders.',
                    equipment: 'None',
                    musclesWorked: ['back'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Kneel on the floor with your knees hip-width apart.',
                      'Sit back on your heels and fold forward from your hips.',
                      'Extend your arms forward and rest your forehead on the floor.',
                      'Let your back relax and feel the gentle stretch.',
                      'Hold for 30-60 seconds, breathing deeply.'
                    ]
                  },
                  {
                    id: 'seated-arm-stretch',
                    name: 'Seated Arm Stretch',
                    description: 'A gentle pose that stretches the biceps and shoulders.',
                    equipment: 'None',
                    musclesWorked: ['biceps'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Sit in a comfortable cross-legged position',
                      'Extend arms behind your back',
                      'Interlace fingers and straighten arms',
                      'Lift arms up as high as comfortable',
                      'Hold for 30 seconds to 1 minute'
                    ]
                  },
                  {
                    id: 'fish-pose-abdominals',
                    name: 'Fish Pose (Abdominals)',
                    description: 'A supine backbend that stretches the abdominals and opens the chest.',
                    equipment: 'None',
                    musclesWorked: ['abdominals'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Lie on your back with legs extended.',
                      'Place your hands under your hips, palms down.',
                      'Lift your chest and arch your back.',
                      'Let your head drop back gently.',
                      'Hold for 30 seconds, breathing deeply.'
                    ]
                  },
                  {
                    id: 'hero-pose-quads',
                    name: 'Hero Pose (Quads Focus)',
                    description: 'A kneeling pose that stretches the quads and improves flexibility.',
                    equipment: 'None',
                    musclesWorked: ['quads'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Kneel with knees together, feet apart',
                      'Sit between heels, keeping spine tall',
                      'Engage quads and relax shoulders',
                      'Hold for 1-2 minutes'
                    ]
                  },
                  {
                    id: 'lying-back-twist',
                    name: 'Lying Back Twist',
                    description: 'Relaxing stretch that gently twists the spine while lying down.',
                    equipment: 'None',
                    musclesWorked: ['back'],
                    difficulty: 'Beginner',
                    instructions: [
                      'Lie on your back with your arms extended out to the sides.',
                      'Bend your knees and bring them toward your chest.',
                      'Slowly lower your knees to the right side.',
                      'Turn your head to the left and hold for 30 seconds.',
                      'Return to center and repeat on the other side.'
                    ]
                  }
                ]
              })}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Routine
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 