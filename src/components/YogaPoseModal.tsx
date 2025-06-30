'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface YogaPoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pose: {
    id: string;
    name: string;
    description: string;
    benefits: string[];
    instructions: string[];
    imageUrl?: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
  } | null;
  onBack?: () => void;
  mode?: 'yoga' | 'stretch';
}

const yogaCategories = [
  'Biceps', 'Traps (mid-back)', 'Lower back', 'Abdominals', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Shoulders',
  'Lateral Deltoid', 'Anterior Deltoid', 'Posterior Deltoid', 'Triceps', 'Traps', 'Quads', 'Chest', 'Obliques',
  'Front Shoulders', 'Rear Shoulders'
];

export default function YogaPoseModal({ isOpen, onClose, pose, onBack, mode = 'yoga' }: YogaPoseModalProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState(false);

  // Always check localStorage for uploaded image for this pose
  useEffect(() => {
    if (pose) {
      const savedImages = JSON.parse(localStorage.getItem('yogaPoseImages') || '{}');
      setImageUrl(savedImages[pose.id]);
    }
  }, [pose]);

  // Check if this pose is a favorite
  useEffect(() => {
    if (pose) {
      let favs: any[] = [];
      try {
        const stored = localStorage.getItem('favorites');
        if (stored) favs = JSON.parse(stored);
      } catch { favs = []; }
      setIsFavorite(favs.some((f: any) => f.id === pose.id));
    }
    // Listen for custom favorites-updated event
    const handler = () => {
      if (pose) {
        let favs: any[] = [];
        try {
          const stored = localStorage.getItem('favorites');
          if (stored) favs = JSON.parse(stored);
        } catch { favs = []; }
        setIsFavorite(favs.some((f: any) => f.id === pose.id));
      }
    };
    window.addEventListener('favorites-updated', handler);
    return () => window.removeEventListener('favorites-updated', handler);
  }, [pose]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && pose) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
          const savedImages = JSON.parse(localStorage.getItem('yogaPoseImages') || '{}');
          savedImages[pose.id] = base64String;
          localStorage.setItem('yogaPoseImages', JSON.stringify(savedImages));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleFavorite = () => {
    if (!pose) return;
    let favs: any[] = [];
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) favs = JSON.parse(stored);
    } catch { favs = []; }
    if (isFavorite) {
      favs = favs.filter((f: any) => f.id !== pose.id);
    } else {
      favs.push({ ...pose, type: mode });
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  if (!isOpen || !pose) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
            >
              ← Back
            </button>
          )}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white">{pose.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Stretch preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
              {imageUrl && (
                <button
                  onClick={() => {
                    setImageUrl(undefined);
                    const savedImages = JSON.parse(localStorage.getItem('yogaPoseImages') || '{}');
                    delete savedImages[pose.id];
                    localStorage.setItem('yogaPoseImages', JSON.stringify(savedImages));
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300">{pose.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Benefits</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {pose.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Instructions</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                  {pose.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Difficulty</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  pose.difficulty === 'Beginner' ? 'bg-green-500' :
                  pose.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                  'bg-red-500'
                } text-white`}>
                  {pose.difficulty}
                </span>
              </div>

              <button
                onClick={handleToggleFavorite}
                className={`mt-4 px-4 py-2 rounded transition-colors font-semibold ${isFavorite ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 