'use client';

import { useState, useMemo, useEffect } from 'react';
import exercises from '@/data/exercises.json';
import { yogaPoses, YogaPose } from '@/data/yogaPoses';
import { allStretches } from '@/data/stretches';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
}

export default function BuilderPage() {
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const [tab, setTab] = useState<'exercises' | 'yoga' | 'stretches' | 'favorites'>('exercises');
  const [selectedExercises, setSelectedExercises] = useState<(Exercise | YogaPose | { id: string; name: string })[]>([]);
  const [favorites, setFavorites] = useState<(Exercise | YogaPose | { id: string; name: string })[]>([]);
  const [favoritesFilter, setFavoritesFilter] = useState<'all' | 'exercise' | 'yoga' | 'stretch'>('all');

  const allExercises = useMemo(() =>
    exercises.muscleGroups.flatMap(group =>
      group.exercises.map(exercise => ({
        id: exercise.id,
        name: exercise.name,
        muscleGroup: group.name
      }))
    ),
    [exercises.muscleGroups]
  );

  // Get all exercise ids
  const allExerciseIds = useMemo(
    () => new Set(
      exercises.muscleGroups.flatMap(group => group.exercises.map(ex => ex.id))
    ),
    [exercises.muscleGroups]
  );

  // Filter yoga poses to exclude any with an id that matches an exercise id
  const filteredYogaPoses = useMemo(
    () => yogaPoses.filter(pose => !allExerciseIds.has(pose.id)),
    [allExerciseIds]
  );

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
    // Listen for localStorage changes from other tabs/pages
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'favorites') {
        try {
          setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setFavorites([]);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Reload favorites from localStorage every time the tab changes to 'favorites'
  useEffect(() => {
    if (tab === 'favorites') {
      try {
        const stored = localStorage.getItem('favorites');
        setFavorites(stored ? JSON.parse(stored) : []);
      } catch {
        setFavorites([]);
      }
    }
  }, [tab]);

  const handleAddExercise = (exercise: Exercise | YogaPose | { id: string; name: string }) => {
    if (!selectedExercises.some(ex => ex.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== exerciseId));
  };

  const handleAddFavorite = (item: Exercise | YogaPose | { id: string; name: string }) => {
    if (!favorites.some(fav => fav.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const handleRemoveFavorite = (id: string) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoutine = {
      id: Date.now().toString(),
      name: routineName,
      description,
      difficulty,
      exercises: selectedExercises
    };
    // Get existing routines from localStorage
    const routines = JSON.parse(localStorage.getItem('routines') || '[]');
    routines.push(newRoutine);
    localStorage.setItem('routines', JSON.stringify(routines));
    alert('Routine created!');
    window.location.href = '/routines';
  };

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Create Workout Routine</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="card">
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              Routine Name
            </label>
            <input
              type="text"
              id="name"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="w-full mt-2"
              required
            />
          </div>
          <div className="card">
            <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2"
              rows={3}
              required
            />
          </div>
          <div className="card">
            <label htmlFor="difficulty" className="block text-sm font-medium text-white mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-2"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="card">
            <label className="block text-sm font-medium text-white mb-1">
              Exercises / Yoga Poses / Stretches
            </label>
            <div className="mb-4 flex gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${tab === 'exercises' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                onClick={() => setTab('exercises')}
              >
                Exercises
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${tab === 'yoga' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                onClick={() => setTab('yoga')}
              >
                Yoga
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${tab === 'stretches' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                onClick={() => setTab('stretches')}
              >
                Stretches
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${tab === 'favorites' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                onClick={() => setTab('favorites')}
              >
                Favorites
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-700 rounded-lg p-4 bg-[#232428]">
                <h3 className="font-medium mb-2 text-white">
                  {tab === 'exercises' && 'Available Exercises'}
                  {tab === 'yoga' && 'Available Yoga Poses'}
                  {tab === 'stretches' && 'Available Stretches'}
                  {tab === 'favorites' && 'Favorites'}
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {tab === 'exercises' && allExercises.map((exercise) => (
                    <button
                      key={`exercise-${exercise.muscleGroup}-${exercise.id}`}
                      type="button"
                      onClick={() => handleAddExercise(exercise)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-200 hover:text-white"
                    >
                      {exercise.name} ({exercise.muscleGroup})
                    </button>
                  ))}
                  {tab === 'yoga' && filteredYogaPoses.map((pose, idx) => (
                    <button
                      key={`yoga-${pose.category}-${pose.id}-${idx}`}
                      type="button"
                      onClick={() => handleAddExercise(pose)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-200 hover:text-white"
                    >
                      {pose.name} ({pose.category})
                    </button>
                  ))}
                  {tab === 'stretches' && allStretches.map((stretch) => (
                    <button
                      key={`stretch-${stretch.category}-${stretch.id}`}
                      type="button"
                      onClick={() => handleAddExercise(stretch)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded-lg text-gray-200 hover:text-white"
                    >
                      {stretch.name} ({stretch.category})
                    </button>
                  ))}
                  {tab === 'favorites' && (
                    <>
                      <div className="flex gap-2 mb-4">
                        <button
                          type="button"
                          className={`px-3 py-1 rounded font-semibold transition-colors ${favoritesFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                          onClick={() => setFavoritesFilter('all')}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          className={`px-3 py-1 rounded font-semibold transition-colors ${favoritesFilter === 'exercise' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                          onClick={() => setFavoritesFilter('exercise')}
                        >
                          Exercises
                        </button>
                        <button
                          type="button"
                          className={`px-3 py-1 rounded font-semibold transition-colors ${favoritesFilter === 'yoga' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                          onClick={() => setFavoritesFilter('yoga')}
                        >
                          Yoga
                        </button>
                        <button
                          type="button"
                          className={`px-3 py-1 rounded font-semibold transition-colors ${favoritesFilter === 'stretch' ? 'bg-blue-600 text-white' : 'bg-[#232428] text-gray-300 hover:bg-blue-900'}`}
                          onClick={() => setFavoritesFilter('stretch')}
                        >
                          Stretches
                        </button>
                      </div>
                      {favorites.length === 0 && <div className="text-gray-400">No favorites yet.</div>}
                      {favorites
                        .filter(item => favoritesFilter === 'all' || (item as any).type === favoritesFilter)
                        .map((item) => (
                          <div
                            key={('muscleGroup' in item ? `exercise-${item.muscleGroup}-${item.id}` : ('category' in item ? `yoga-${item.category}-${item.id}` : `stretch-unknown-${item.id}`))}
                            className="flex items-center justify-between px-3 py-2 bg-gray-900 rounded-lg text-gray-200 mb-2"
                          >
                            <span>
                              {item.name}
                              <span className="ml-2 text-xs text-blue-400">
                                {(item as any).type === 'exercise' ? 'Exercise' : (item as any).type === 'yoga' ? 'Yoga Pose' : (item as any).type === 'stretch' ? 'Stretch' : ''}
                              </span>
                            </span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleAddExercise(item)}
                                className="text-green-400 hover:text-green-200 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded font-semibold"
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveFavorite(item.id)}
                                className="text-red-400 hover:text-red-200 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded font-semibold"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
              <div className="border border-gray-700 rounded-lg p-4 bg-[#232428]">
                <h3 className="font-medium mb-2 text-white">Selected Items</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {selectedExercises.map((item) => (
                    <div
                      key={('muscleGroup' in item ? `exercise-${item.muscleGroup}-${item.id}` : ('category' in item ? `yoga-${item.category}-${item.id}` : `stretch-unknown-${item.id}`))}
                      className="flex items-center justify-between px-3 py-2 bg-gray-900 rounded-lg text-gray-200"
                    >
                      <span>
                        {item.name}
                        <span className="ml-2 text-xs text-blue-400">
                          {('muscleGroup' in item) ? 'Exercise' : ('category' in item ? 'Yoga Pose' : 'Stretch')}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(item.id)}
                        className="text-red-400 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn"
            >
              Create Routine
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 