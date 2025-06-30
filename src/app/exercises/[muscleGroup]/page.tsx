"use client";
import Link from 'next/link';
import exercisesData from '@/data/exercises.json';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface MuscleGroupPageProps {
  params: {
    muscleGroup: string;
  };
}

export default function MuscleGroupPage({ params }: MuscleGroupPageProps) {
  const group = exercisesData.muscleGroups.find(
    (g) => g.id === params.muscleGroup
  );

  // Store uploaded images and error state per exercise
  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setUploadedImages(JSON.parse(localStorage.getItem('uploadedExerciseImages') || '{}'));
      } catch {}
    }
  }, []);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, exerciseId: string) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = ev.target?.result as string;
        setUploadedImages((prev) => {
          const updated = { ...prev, [exerciseId]: img };
          if (typeof window !== 'undefined') {
            localStorage.setItem('uploadedExerciseImages', JSON.stringify(updated));
          }
          return updated;
        });
        setImageErrors((prev) => ({ ...prev, [exerciseId]: false }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleImageError(exerciseId: string) {
    setImageErrors((prev) => ({ ...prev, [exerciseId]: true }));
  }

  if (!group) {
    return (
      <main className="min-h-screen p-8 bg-[#111215]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Muscle Group Not Found</h1>
          <Link href="/exercises" className="text-blue-400 hover:underline">← Back to Exercises</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">{group.name} Workouts</h1>
        <Link href="/exercises" className="text-blue-400 hover:underline mb-6 inline-block">← Back to Exercises</Link>
        {group.exercises.length === 0 ? (
          <div className="text-gray-400 text-lg">No exercises found for this muscle group.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {group.exercises.map((exercise) => {
              const uploaded = uploadedImages[exercise.id];
              const errored = imageErrors[exercise.id];
              return (
                <Link
                  key={exercise.id}
                  href={`/exercises/${group.id}/${exercise.id}`}
                  className="card hover:shadow-xl transition-shadow flex flex-col items-stretch bg-[#18191c] border border-gray-700 rounded-xl p-4 text-white hover:ring-2 hover:ring-blue-400 min-h-[220px]"
                  tabIndex={0}
                  onClick={e => {
                    // Prevent navigation if clicking upload area
                    if ((e.target as HTMLElement).closest('.upload-placeholder')) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="flex-1 flex flex-col">
                    <div className="mb-3 w-full h-32 relative">
                      {/* Image or Placeholder/Upload */}
                      {uploaded && !errored ? (
                        <Image
                          src={uploaded}
                          alt={exercise.name}
                          fill
                          className="object-contain rounded-lg bg-black"
                        />
                      ) : exercise.imageUrl && !errored ? (
                        <Image
                          src={exercise.imageUrl}
                          alt={exercise.name}
                          fill
                          className="object-contain rounded-lg bg-black"
                          onError={() => handleImageError(exercise.id)}
                        />
                      ) : (
                        <div
                          className="upload-placeholder w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-800 border-2 border-dashed border-gray-600 cursor-pointer hover:bg-gray-700 transition"
                          onClick={e => {
                            e.preventDefault();
                            fileInputRefs.current[exercise.id]?.click();
                          }}
                        >
                          <span className="text-gray-400 text-2xl mb-1">📷</span>
                          <span className="text-gray-400 text-xs">Upload Image</span>
                          <input
                            ref={el => { fileInputRefs.current[exercise.id] = el; }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleImageUpload(e, exercise.id)}
                          />
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-1">{exercise.name}</h2>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">{exercise.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">{exercise.equipment}</span>
                      <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">{exercise.difficulty}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
} 