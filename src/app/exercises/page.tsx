"use client";
import Link from 'next/link';
import exercises from '@/data/exercises.json';
import { useState, useRef, useEffect } from 'react';

interface Exercise {
  id: string;
  name: string;
  description: string;
  musclesWorked: string[];
  equipment: string;
  difficulty: string;
  instructions: string[];
  imageUrl?: string;
}

// Equipment tag colors mapping
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

export default function ExercisesPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{ id: string; name: string; exercises: Exercise[] } | null>(null);
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (modalExercise) {
      let favs: any[] = [];
      try {
        const stored = localStorage.getItem('favorites');
        if (stored) favs = JSON.parse(stored);
      } catch { favs = []; }
      setIsFavorite(favs.some((f: any) => f.id === modalExercise.id));
    }
    // Listen for custom favorites-updated event
    const handler = () => {
      if (modalExercise) {
        let favs: any[] = [];
        try {
          const stored = localStorage.getItem('favorites');
          if (stored) favs = JSON.parse(stored);
        } catch { favs = []; }
        setIsFavorite(favs.some((f: any) => f.id === modalExercise.id));
      }
    };
    window.addEventListener('favorites-updated', handler);
    return () => window.removeEventListener('favorites-updated', handler);
  }, [modalExercise]);

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

  function handleToggleFavorite() {
    if (!modalExercise) return;
    let favs: any[] = [];
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) favs = JSON.parse(stored);
    } catch { favs = []; }
    if (isFavorite) {
      favs = favs.filter((f: any) => f.id !== modalExercise.id);
    } else {
      favs.push({ ...modalExercise, type: 'exercise' });
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Exercises</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exercises.muscleGroups.map((group) => (
            <button
              key={group.id}
              className={`card hover:shadow-xl transition-shadow text-left`}
              onClick={() => setSelectedGroup(group)}
            >
              <h2 className="text-2xl font-bold text-white mb-0">{group.name}</h2>
            </button>
          ))}
        </div>
        {/* Modal for Muscle Group Exercises */}
        {selectedGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setSelectedGroup(null)}>
            <div
              className="bg-[#18191c] rounded-2xl shadow-2xl p-8 max-w-5xl w-full relative text-white border border-gray-700"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                onClick={() => setSelectedGroup(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedGroup.name} Exercises</h2>
              <div className="max-h-[80vh] overflow-y-auto">
                {selectedGroup.exercises.length === 0 ? (
                  <p className="text-gray-400">No exercises yet for this category.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {selectedGroup.exercises.map((ex) => (
                      <button
                        key={ex.id}
                        className="card bg-[#232428] border border-gray-700 text-left hover:ring-2 hover:ring-blue-400 p-3 text-sm"
                        style={{ minHeight: '90px' }}
                        onClick={() => {
                          setModalExercise(ex);
                          setUploadedImage(null);
                          setImageError(false);
                        }}
                      >
                        <h3 className="text-lg font-semibold text-white mb-1">{ex.name}</h3>
                        <p className="text-gray-300 mb-1 line-clamp-2">{ex.description}</p>
                        <div className="flex flex-wrap gap-1 mb-1">
                          <EquipmentTag equipment={ex.equipment} />
                        </div>
                        <p className="text-gray-400 text-xs mb-0">Difficulty: {ex.difficulty}</p>
                      </button>
                    ))}
                  </div>
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
                  <EquipmentTag equipment={modalExercise.equipment} />
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
              <button
                onClick={handleToggleFavorite}
                className={`mt-4 px-4 py-2 rounded transition-colors font-semibold ${isFavorite ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 