import Image from 'next/image';
import Link from 'next/link';
import exercises from '@/data/exercises.json';

interface ExercisePageProps {
  params: {
    muscleGroup: string;
    exerciseId: string;
  };
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const muscleGroup = exercises.muscleGroups.find(
    (group) => group.id === params.muscleGroup
  );
  
  const exercise = muscleGroup?.exercises.find(
    (ex) => ex.id === params.exerciseId
  );

  if (!exercise) {
    return (
      <main className="min-h-screen p-8 bg-[#111215]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Exercise Not Found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-6 text-blue-400 hover:text-blue-200 hover:underline font-semibold">← Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8 text-white">{exercise.name}</h1>
        <div className="card mb-8">
          <div className="aspect-video relative mb-6">
            <Image
              src={exercise.imageUrl}
              alt={exercise.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">Description</h2>
              <p className="text-gray-200">{exercise.description}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">Muscles Worked</h2>
              <ul className="list-disc list-inside text-gray-200">
                {exercise.musclesWorked.map((muscle) => (
                  <li key={muscle}>{muscle}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-200">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">Equipment</h2>
              <p className="text-gray-200 capitalize">{exercise.equipment}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">Difficulty</h2>
              <p className="text-gray-200 capitalize">{exercise.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 