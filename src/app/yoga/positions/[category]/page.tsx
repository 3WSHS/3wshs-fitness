'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { yogaPoses, getPosesByCategory, YogaPose } from '@/data/yogaPoses';
import YogaPoseModal from '@/components/YogaPoseModal';
import Image from 'next/image';
import { Fragment } from 'react';

function AddPoseModal({ isOpen, onClose, onAdd, category }: { isOpen: boolean; onClose: () => void; onAdd: (pose: any) => void; category: string }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState('');
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instructionInput, setInstructionInput] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleBenefitAdd = () => {
    if (benefitInput.trim()) {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput('');
    }
  };
  const handleInstructionAdd = () => {
    if (instructionInput.trim()) {
      setInstructions([...instructions, instructionInput.trim()]);
      setInstructionInput('');
    }
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || benefits.length === 0 || instructions.length === 0) return;
    onAdd({
      id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name,
      description,
      benefits,
      instructions,
      imageUrl,
      difficulty,
      category,
    });
    setName(''); setDescription(''); setBenefits([]); setBenefitInput(''); setInstructions([]); setInstructionInput(''); setDifficulty('Beginner'); setImageUrl(undefined);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-2xl space-y-4 relative">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-white">Add New Pose</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <input className="w-full p-2 rounded bg-gray-800 text-white" placeholder="Name of pose" value={name} onChange={e => setName(e.target.value)} required />
        <textarea className="w-full p-2 rounded bg-gray-800 text-white" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <div>
          <label className="block text-white mb-1">Benefits</label>
          <div className="flex gap-2 mb-2">
            <input className="flex-1 p-2 rounded bg-gray-800 text-white" placeholder="Add benefit" value={benefitInput} onChange={e => setBenefitInput(e.target.value)} />
            <button type="button" onClick={handleBenefitAdd} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {benefits.map((b, i) => <span key={i} className="bg-blue-700 text-white px-2 py-1 rounded text-xs">{b}</span>)}
          </div>
        </div>
        <div>
          <label className="block text-white mb-1">Instructions</label>
          <div className="flex gap-2 mb-2">
            <input className="flex-1 p-2 rounded bg-gray-800 text-white" placeholder="Add instruction" value={instructionInput} onChange={e => setInstructionInput(e.target.value)} />
            <button type="button" onClick={handleInstructionAdd} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {instructions.map((ins, i) => <span key={i} className="bg-blue-700 text-white px-2 py-1 rounded text-xs">{ins}</span>)}
          </div>
        </div>
        <div>
          <label className="block text-white mb-1">Difficulty</label>
          <select className="w-full p-2 rounded bg-gray-800 text-white" value={difficulty} onChange={e => setDifficulty(e.target.value as unknown as any)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-white mb-1">Thumbnail</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-white" />
          {imageUrl && <img src={imageUrl} alt="thumbnail" className="mt-2 rounded w-24 h-24 object-cover" />}
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">Add Pose</button>
        </div>
      </form>
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedImages, setSavedImages] = useState<Record<string, string>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customPoses, setCustomPoses] = useState<YogaPose[]>([]);

  const category = params?.category as string;
  const formattedCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const images = JSON.parse(localStorage.getItem('yogaPoseImages') || '{}');
    setSavedImages(images);
    const custom = JSON.parse(localStorage.getItem(`customYogaPoses-${formattedCategory}`) || '[]');
    setCustomPoses(custom);
  }, [formattedCategory]);

  const poses = getPosesByCategory(formattedCategory);

  const handlePoseClick = (pose: YogaPose) => {
    setSelectedPose(pose);
    setIsModalOpen(true);
  };

  const handleAddPose = (pose: YogaPose) => {
    const updated = [...customPoses, pose];
    setCustomPoses(updated);
    localStorage.setItem(`customYogaPoses-${formattedCategory}`, JSON.stringify(updated));
  };

  const allPoses = [...getPosesByCategory(formattedCategory), ...customPoses];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c24] via-[#23263a] to-[#10111a] p-8">
      <button
        onClick={() => router.push('/yoga/positions')}
        className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors font-semibold shadow"
      >
        ← Back to Yoga Muscle Groups
      </button>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">{formattedCategory} Poses</h1>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md">+ Add Pose</button>
      </div>
      <AddPoseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddPose} category={formattedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allPoses.map((pose) => (
          <button
            key={pose.id}
            onClick={() => handlePoseClick(pose)}
            className="group bg-gradient-to-br from-[#23263a] via-[#181c24] to-[#23263a] p-2 rounded-2xl shadow-xl border border-transparent hover:border-blue-500 hover:shadow-blue-500/40 transition-all duration-300 relative overflow-hidden"
            style={{ minHeight: 260 }}
          >
            <div className="flex justify-center items-center mb-2">
              <div className="relative w-32 h-32 bg-gradient-to-br from-[#23263a] to-[#181c24] rounded-lg overflow-hidden border border-[#23263a] group-hover:border-blue-400 transition-all duration-300">
                {savedImages[pose.id] ? (
                  <Image
                    src={savedImages[pose.id]}
                    alt={pose.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1 drop-shadow-sm group-hover:text-blue-400 transition-colors duration-300">{pose.name}</h2>
            <p className="text-gray-300 text-xs mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">{pose.description}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-md ${
              pose.difficulty === 'Beginner' ? 'bg-green-500/90 text-white' :
              pose.difficulty === 'Intermediate' ? 'bg-yellow-500/90 text-gray-900' :
              'bg-red-500/90 text-white'
            }`}>
              {pose.difficulty}
            </span>
            <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-2 group-hover:ring-blue-500/40 transition-all duration-300" />
          </button>
        ))}
      </div>

      <YogaPoseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pose={selectedPose}
      />
    </div>
  );
} 