'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const StretchModal = dynamic(() => import('../../components/YogaPoseModal'), { ssr: false });

interface Stretch {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  instructions: string[];
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

const categories = [
  { id: 'biceps', name: 'Biceps', color: 'bg-red-500' },
  { id: 'calves', name: 'Calves', color: 'bg-green-500' },
  { id: 'traps-mid-back', name: 'Traps Mid-Back', color: 'bg-blue-500' },
  { id: 'lower-back', name: 'Lower Back', color: 'bg-purple-500' },
  { id: 'abdominals', name: 'Abdominals', color: 'bg-yellow-500' },
  { id: 'forearms', name: 'Forearms', color: 'bg-pink-500' },
  { id: 'glutes', name: 'Glutes', color: 'bg-indigo-500' },
  { id: 'hamstrings', name: 'Hamstrings', color: 'bg-orange-500' },
  { id: 'lats', name: 'Lats', color: 'bg-teal-500' },
  { id: 'chest', name: 'Chest', color: 'bg-red-600' },
  { id: 'shoulders', name: 'Shoulders', color: 'bg-blue-600' },
  { id: 'quads', name: 'Quadriceps', color: 'bg-green-600' },
  { id: 'triceps', name: 'Triceps', color: 'bg-purple-600' },
  { id: 'abs', name: 'Abs', color: 'bg-yellow-600' },
  { id: 'back', name: 'Back', color: 'bg-gray-600' },
  { id: 'legs', name: 'Legs', color: 'bg-indigo-600' },
  { id: 'arms', name: 'Arms', color: 'bg-pink-600' },
  { id: 'neck', name: 'Neck', color: 'bg-orange-600' },
  { id: 'hips', name: 'Hips', color: 'bg-teal-600' },
  { id: 'ankles', name: 'Ankles', color: 'bg-red-700' },
  { id: 'wrists', name: 'Wrists', color: 'bg-blue-700' },
  { id: 'feet', name: 'Feet', color: 'bg-green-700' },
  { id: 'full-body', name: 'Full Body', color: 'bg-purple-700' }
];

const bicepsVariations = [
  {
    id: 'standing-bicep-stretch',
    name: 'Standing Bicep Stretch',
    description: 'Classic standing stretch that targets the biceps and anterior shoulder muscles.',
    benefits: ['Improves arm flexibility', 'Reduces muscle tightness', 'Enhances shoulder mobility', 'Great for post-workout recovery'],
    instructions: [
      'Stand tall with your feet shoulder-width apart.',
      'Extend your right arm straight out to the side at shoulder height.',
      'Rotate your palm up toward the ceiling.',
      'Use your left hand to gently pull your right fingers back toward your body.',
      'Hold for 30 seconds, then switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Biceps'
  },
  {
    id: 'doorway-bicep-stretch',
    name: 'Doorway Bicep Stretch',
    description: 'Effective stretch using a doorway to target biceps and chest muscles.',
    benefits: ['Deep stretch', 'Opens chest and shoulders', 'Improves posture', 'Targets multiple muscle groups'],
    instructions: [
      'Stand in a doorway with your right arm extended.',
      'Place your right hand on the door frame at shoulder height.',
      'Gently turn your body to the left, away from your arm.',
      'Feel the stretch in your biceps and chest.',
      'Hold for 30 seconds and repeat on the other side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Biceps'
  },
  {
    id: 'behind-back-bicep-stretch',
    name: 'Behind Back Bicep Stretch',
    description: 'Advanced stretch that targets biceps while also opening the chest and shoulders.',
    benefits: ['Intense bicep stretch', 'Improves shoulder flexibility', 'Opens chest muscles', 'Great for tight arms'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Place your hands behind your back and interlace your fingers.',
      'Straighten your arms and lift them slightly.',
      'Feel the stretch in your biceps and chest.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Biceps'
  },
  {
    id: 'seated-bicep-stretch',
    name: 'Seated Bicep Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces arm tension'],
    instructions: [
      'Sit on the floor with your legs extended in front.',
      'Place your hands behind you, fingers pointing away from your body.',
      'Slide your hips forward slightly to increase the stretch.',
      'Keep your back straight and chest open.',
      'Hold for 30 seconds.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Biceps'
  },
  {
    id: 'wall-bicep-stretch',
    name: 'Wall Bicep Stretch',
    description: 'Simple wall-based stretch that can be done anywhere with a wall.',
    benefits: ['No equipment needed', 'Consistent stretch', 'Good for all levels', 'Improves arm mobility'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall at shoulder height.',
      'Turn your body to the left, keeping your arm straight.',
      'Feel the stretch in your biceps and shoulder.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Biceps'
  },
  {
    id: 'towel-bicep-stretch',
    name: 'Towel Bicep Stretch',
    description: 'Portable stretch using a towel that provides controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel with both hands behind your back.',
      'Extend your arms straight and lift the towel up.',
      'Feel the stretch in your biceps and shoulders.',
      'Hold for 30 seconds.',
      'You can adjust the towel length for different intensities.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Biceps'
  },
  {
    id: 'kneeling-bicep-stretch',
    name: 'Kneeling Bicep Stretch',
    description: 'Advanced kneeling stretch that provides a deep bicep stretch.',
    benefits: ['Deep stretch', 'Targets both arms', 'Improves flexibility', 'Great for tight biceps'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Place your hands behind you, fingers pointing away.',
      'Sit back on your heels while keeping your arms straight.',
      'Feel the stretch in your biceps and shoulders.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Biceps'
  },
  {
    id: 'resistance-band-bicep-stretch',
    name: 'Resistance Band Bicep Stretch',
    description: 'Dynamic stretch using resistance bands for controlled bicep stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Hold a resistance band with both hands in front of you.',
      'Extend your arms straight out to the sides.',
      'Gently pull the band apart, feeling the stretch in your biceps.',
      'Hold for 30 seconds.',
      'You can adjust the band tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Biceps'
  },
  {
    id: 'dynamic-bicep-stretch',
    name: 'Dynamic Bicep Stretch',
    description: 'Moving stretch that warms up the biceps and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your arms at your sides.',
      'Swing your arms in small circles forward for 10 seconds.',
      'Then swing them backward for 10 seconds.',
      'Gradually increase the circle size.',
      'Repeat 3-5 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Biceps'
  },
  {
    id: 'foam-roller-bicep-release',
    name: 'Foam Roller Bicep Release',
    description: 'Self-massage technique using a foam roller to release bicep tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie face down with a foam roller under your right arm.',
      'Position the roller from your shoulder to your elbow.',
      'Roll slowly up and down your bicep area.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other arm.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Biceps'
  }
];

const calvesVariations = [
  {
    id: 'standing-calf-stretch',
    name: 'Standing Calf Stretch',
    description: 'Classic standing calf stretch targeting the gastrocnemius muscle.',
    benefits: ['Improves ankle flexibility', 'Reduces calf tightness', 'Helps prevent shin splints', 'Enhances running performance'],
    instructions: [
      'Stand facing a wall with one foot forward and one foot back.',
      'Keep your back leg straight with heel on the ground.',
      'Lean forward until you feel a stretch in your calf.',
      'Hold for 30 seconds.',
      'Switch legs and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Calves'
  },
  {
    id: 'seated-calf-stretch',
    name: 'Seated Calf Stretch',
    description: 'Gentle seated stretch for the soleus muscle.',
    benefits: ['Targets deeper calf muscles', 'Good for beginners', 'Can be done anywhere', 'Reduces muscle tension'],
    instructions: [
      'Sit on the floor with legs extended in front.',
      'Loop a towel or resistance band around the ball of your foot.',
      'Gently pull your toes toward you.',
      'Hold for 30 seconds.',
      'Repeat with the other foot.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Calves'
  },
  {
    id: 'wall-calf-stretch',
    name: 'Wall Calf Stretch',
    description: 'Effective wall-based stretch for both calf muscles.',
    benefits: ['Intense stretch', 'Targets both gastrocnemius and soleus', 'Improves ankle mobility', 'Great for runners'],
    instructions: [
      'Stand facing a wall with hands on the wall at shoulder height.',
      'Step one foot back, keeping it straight.',
      'Bend your front knee and lean into the wall.',
      'Keep your back heel on the ground.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Calves'
  },
  {
    id: 'step-calf-stretch',
    name: 'Step Calf Stretch',
    description: 'Advanced stretch using a step or curb for deeper calf engagement.',
    benefits: ['Deep stretch', 'Improves balance', 'Strengthens ankle stabilizers', 'Great for athletes'],
    instructions: [
      'Stand on a step or curb with heels hanging off the edge.',
      'Hold onto a railing or wall for balance.',
      'Lower your heels below the step level.',
      'Hold for 30 seconds.',
      'Raise up onto your toes, then lower again.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Calves'
  },
  {
    id: 'towel-calf-stretch',
    name: 'Towel Calf Stretch',
    description: 'Simple towel-based stretch that can be done anywhere.',
    benefits: ['Portable', 'No equipment needed', 'Gentle stretch', 'Good for recovery'],
    instructions: [
      'Sit on the floor with legs extended.',
      'Loop a towel around the ball of your foot.',
      'Hold both ends of the towel.',
      'Gently pull your toes toward you.',
      'Hold for 30 seconds and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Calves'
  },
  {
    id: 'downward-dog-calf',
    name: 'Downward Dog Calf Stretch',
    description: 'Yoga-inspired stretch that targets calves while stretching the entire posterior chain.',
    benefits: ['Full body stretch', 'Improves flexibility', 'Strengthens shoulders', 'Calms the mind'],
    instructions: [
      'Start in a plank position.',
      'Lift your hips up and back, forming an inverted V.',
      'Keep your heels reaching toward the ground.',
      'Bend one knee to stretch the opposite calf.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Calves'
  },
  {
    id: 'foam-roller-calf',
    name: 'Foam Roller Calf Release',
    description: 'Self-massage technique using a foam roller to release calf tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on the floor with legs extended.',
      'Place a foam roller under your calf.',
      'Lift your hips and roll from ankle to knee.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other leg.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Calves'
  },
  {
    id: 'resistance-band-calf',
    name: 'Resistance Band Calf Stretch',
    description: 'Dynamic stretch using resistance bands for controlled calf stretching.',
    benefits: ['Controlled stretch', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Sit on the floor with legs extended.',
      'Loop a resistance band around the ball of your foot.',
      'Hold the band ends in your hands.',
      'Gently pull your toes toward you.',
      'Hold for 30 seconds and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Calves'
  },
  {
    id: 'kneeling-calf-stretch',
    name: 'Kneeling Calf Stretch',
    description: 'Intense kneeling stretch that deeply targets the calf muscles.',
    benefits: ['Deep stretch', 'Improves flexibility', 'Targets both calf muscles', 'Great for tight calves'],
    instructions: [
      'Kneel on the floor with toes pointed.',
      'Sit back on your heels.',
      'Feel the stretch in your calves and ankles.',
      'Hold for 30 seconds.',
      'Gradually increase duration over time.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Calves'
  },
  {
    id: 'dynamic-calf-stretch',
    name: 'Dynamic Calf Stretch',
    description: 'Moving stretch that warms up the calves and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with feet hip-width apart.',
      'Rise up onto your toes.',
      'Lower back down slowly.',
      'Repeat 10-15 times.',
      'Gradually increase speed and range.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Calves'
  }
];

const trapsMidBackVariations = [
  {
    id: 'cat-cow-stretch',
    name: 'Cat-Cow Stretch',
    description: 'Gentle yoga-inspired stretch that mobilizes the entire spine and mid-back.',
    benefits: ['Improves spinal mobility', 'Reduces mid-back tension', 'Great for posture', 'Calms the nervous system'],
    instructions: [
      'Start on hands and knees with wrists under shoulders and knees under hips.',
      'Inhale and arch your back, lifting your head and tailbone (cow pose).',
      'Exhale and round your back, tucking your chin and tailbone (cat pose).',
      'Move slowly and smoothly between poses.',
      'Repeat 10-15 times, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'childs-pose-stretch',
    name: 'Child\'s Pose Stretch',
    description: 'Restorative stretch that gently opens the mid-back and shoulders.',
    benefits: ['Relieves back tension', 'Opens shoulders', 'Reduces stress', 'Great for recovery'],
    instructions: [
      'Kneel on the floor with knees hip-width apart.',
      'Sit back on your heels and fold forward.',
      'Extend your arms in front of you or alongside your body.',
      'Rest your forehead on the floor.',
      'Hold for 1-3 minutes, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'thread-the-needle',
    name: 'Thread the Needle Stretch',
    description: 'Rotational stretch that targets the mid-back and opens the chest.',
    benefits: ['Improves spinal rotation', 'Opens chest muscles', 'Reduces shoulder tension', 'Enhances mobility'],
    instructions: [
      'Start on hands and knees with wrists under shoulders.',
      'Slide your right arm under your left arm, rotating your torso.',
      'Rest your right shoulder and temple on the floor.',
      'Extend your left arm overhead or keep it on the floor.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'seated-twist-stretch',
    name: 'Seated Twist Stretch',
    description: 'Simple seated rotation that targets the mid-back and improves spinal mobility.',
    benefits: ['Improves rotation', 'Reduces stiffness', 'Can be done anywhere', 'Good for office workers'],
    instructions: [
      'Sit on the floor with legs extended in front.',
      'Bend your right knee and place your right foot outside your left knee.',
      'Place your left elbow on the outside of your right knee.',
      'Gently twist to the right, looking over your right shoulder.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'foam-roller-mid-back',
    name: 'Foam Roller Mid-Back Release',
    description: 'Self-massage technique using a foam roller to release mid-back tension.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie on your back with a foam roller under your mid-back.',
      'Bend your knees and place your feet flat on the floor.',
      'Lift your hips and roll slowly up and down your mid-back.',
      'Pause on tender spots for 30 seconds.',
      'Focus on the area between your shoulder blades.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'wall-angel-stretch',
    name: 'Wall Angel Stretch',
    description: 'Standing stretch against a wall that improves posture and opens the mid-back.',
    benefits: ['Improves posture', 'Opens chest', 'Strengthens back muscles', 'Reduces shoulder tension'],
    instructions: [
      'Stand with your back against a wall, feet shoulder-width apart.',
      'Press your head, upper back, and tailbone against the wall.',
      'Raise your arms up the wall in a W position.',
      'Slowly slide your arms up and down the wall.',
      'Repeat 10-15 times, maintaining contact with the wall.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'prone-back-extension',
    name: 'Prone Back Extension',
    description: 'Strengthening stretch that targets the mid-back muscles while improving mobility.',
    benefits: ['Strengthens back muscles', 'Improves posture', 'Reduces back pain', 'Enhances spinal mobility'],
    instructions: [
      'Lie face down on the floor with arms extended overhead.',
      'Lift your chest and arms off the floor simultaneously.',
      'Keep your legs and hips on the floor.',
      'Hold for 5-10 seconds, then lower slowly.',
      'Repeat 8-12 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'resistance-band-row',
    name: 'Resistance Band Row Stretch',
    description: 'Dynamic stretch using resistance bands to strengthen and stretch the mid-back.',
    benefits: ['Strengthens back muscles', 'Improves posture', 'Reduces shoulder tension', 'Great for rehabilitation'],
    instructions: [
      'Sit on the floor with legs extended and resistance band around your feet.',
      'Hold the band ends in your hands with arms extended.',
      'Pull the band toward your chest, squeezing your shoulder blades.',
      'Hold for 2-3 seconds, then slowly extend your arms.',
      'Repeat 10-15 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'kneeling-lat-stretch',
    name: 'Kneeling Lat Stretch',
    description: 'Deep stretch that targets the lats and mid-back muscles.',
    benefits: ['Deep stretch', 'Opens shoulders', 'Improves posture', 'Reduces upper back tension'],
    instructions: [
      'Kneel on the floor with knees hip-width apart.',
      'Extend your arms forward and place your hands on the floor.',
      'Walk your hands forward while keeping your hips over your knees.',
      'Lower your chest toward the floor, feeling the stretch in your mid-back.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Traps (mid-back)'
  },
  {
    id: 'dynamic-back-mobility',
    name: 'Dynamic Back Mobility',
    description: 'Moving stretches that warm up the mid-back and improve overall mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet shoulder-width apart and arms at your sides.',
      'Slowly rotate your torso to the right, then to the left.',
      'Add arm swings as you rotate for increased mobility.',
      'Gradually increase the range of motion.',
      'Repeat 10-15 times in each direction.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Traps (mid-back)'
  }
];

const lowerBackVariations = [
  {
    id: 'knee-to-chest-stretch',
    name: 'Knee to Chest Stretch',
    description: 'Gentle stretch that relieves lower back tension and improves hip flexibility.',
    benefits: ['Relieves lower back pain', 'Improves hip mobility', 'Reduces sciatic nerve pressure', 'Great for beginners'],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Bring your right knee toward your chest.',
      'Hold your knee with both hands and gently pull it closer.',
      'Keep your left foot on the floor.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lower back'
  },
  {
    id: 'pelvic-tilt-stretch',
    name: 'Pelvic Tilt Stretch',
    description: 'Core-strengthening stretch that stabilizes the lower back and improves posture.',
    benefits: ['Strengthens core muscles', 'Improves posture', 'Reduces lower back pain', 'Enhances stability'],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Place your hands on your hips.',
      'Gently tilt your pelvis to flatten your lower back against the floor.',
      'Hold for 5-10 seconds, then release.',
      'Repeat 10-15 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lower back'
  },
  {
    id: 'cat-cow-lower-back',
    name: 'Cat-Cow Lower Back Focus',
    description: 'Yoga-inspired stretch that specifically targets lower back mobility.',
    benefits: ['Improves spinal flexibility', 'Reduces lower back stiffness', 'Calms the nervous system', 'Great for daily practice'],
    instructions: [
      'Start on hands and knees with wrists under shoulders and knees under hips.',
      'Inhale and arch your back, lifting your tailbone (cow pose).',
      'Exhale and round your back, tucking your tailbone (cat pose).',
      'Focus on the movement in your lower back.',
      'Repeat 10-15 times, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lower back'
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated Forward Fold',
    description: 'Gentle seated stretch that targets the lower back and hamstrings.',
    benefits: ['Stretches lower back', 'Improves hamstring flexibility', 'Reduces stress', 'Good for office workers'],
    instructions: [
      'Sit on the floor with your legs extended in front.',
      'Keep your back straight and chest open.',
      'Gently fold forward from your hips.',
      'Reach for your toes or ankles.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lower back'
  },
  {
    id: 'foam-roller-lower-back',
    name: 'Foam Roller Lower Back Release',
    description: 'Self-massage technique using a foam roller to release lower back tension.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on the floor with a foam roller behind your lower back.',
      'Bend your knees and place your feet flat on the floor.',
      'Gently roll up and down your lower back area.',
      'Pause on tender spots for 30 seconds.',
      'Focus on the area just above your hips.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Lower back'
  },
  {
    id: 'bridge-stretch',
    name: 'Bridge Stretch',
    description: 'Strengthening stretch that targets the lower back, glutes, and core.',
    benefits: ['Strengthens lower back', 'Activates glutes', 'Improves core stability', 'Enhances posture'],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Place your arms at your sides, palms down.',
      'Lift your hips off the floor, creating a bridge.',
      'Squeeze your glutes and hold for 5-10 seconds.',
      'Lower slowly and repeat 8-12 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Lower back'
  },
  {
    id: 'childs-pose-lower-back',
    name: 'Child\'s Pose Lower Back Focus',
    description: 'Restorative stretch that gently stretches the lower back and hips.',
    benefits: ['Relieves lower back tension', 'Opens hips', 'Reduces stress', 'Great for recovery'],
    instructions: [
      'Kneel on the floor with knees hip-width apart.',
      'Sit back on your heels and fold forward.',
      'Extend your arms in front of you.',
      'Rest your forehead on the floor.',
      'Hold for 1-3 minutes, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lower back'
  },
  {
    id: 'resistance-band-good-morning',
    name: 'Resistance Band Good Morning',
    description: 'Dynamic stretch using resistance bands to strengthen and stretch the lower back.',
    benefits: ['Strengthens lower back', 'Improves hip mobility', 'Reduces back pain', 'Great for rehabilitation'],
    instructions: [
      'Stand with feet shoulder-width apart and resistance band under your feet.',
      'Hold the band ends at shoulder height.',
      'Hinge at your hips and lower your torso forward.',
      'Keep your back straight and core engaged.',
      'Return to standing and repeat 10-15 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Lower back'
  },
  {
    id: 'supine-twist-stretch',
    name: 'Supine Twist Stretch',
    description: 'Gentle rotational stretch that targets the lower back and improves spinal mobility.',
    benefits: ['Improves spinal rotation', 'Reduces lower back stiffness', 'Opens hips', 'Great for recovery'],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Extend your arms out to the sides at shoulder height.',
      'Gently drop your knees to the right side.',
      'Turn your head to the left.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lower back'
  },
  {
    id: 'dynamic-lower-back-mobility',
    name: 'Dynamic Lower Back Mobility',
    description: 'Moving stretches that warm up the lower back and improve overall mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet shoulder-width apart and hands on your hips.',
      'Slowly rotate your hips in a circular motion.',
      'Move clockwise for 10 rotations, then counterclockwise.',
      'Gradually increase the range of motion.',
      'Add gentle back bends and forward folds.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lower back'
  }
];

const abdominalsVariations = [
  {
    id: 'cobra-stretch',
    name: 'Cobra Stretch',
    description: 'Gentle backbend that stretches the abdominal muscles and opens the chest.',
    benefits: ['Stretches abs', 'Opens chest', 'Improves posture', 'Reduces back tension'],
    instructions: [
      'Lie face down on the floor with legs extended.',
      'Place your hands under your shoulders, elbows close to your body.',
      'Press your hands into the floor and lift your chest.',
      'Keep your hips and legs on the floor.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Abdominals'
  },
  {
    id: 'upward-facing-dog',
    name: 'Upward Facing Dog',
    description: 'Yoga pose that stretches the abdominal muscles and strengthens the back.',
    benefits: ['Deep abs stretch', 'Strengthens back', 'Opens chest', 'Improves spinal flexibility'],
    instructions: [
      'Lie face down with hands under your shoulders.',
      'Press your hands and tops of feet into the floor.',
      'Lift your entire body off the floor.',
      'Keep your arms straight and chest open.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Abdominals'
  },
  {
    id: 'seated-backbend',
    name: 'Seated Backbend',
    description: 'Simple seated stretch that targets the abdominal muscles.',
    benefits: ['Stretches abs', 'Improves posture', 'Opens chest', 'Can be done anywhere'],
    instructions: [
      'Sit on the floor with legs extended in front.',
      'Place your hands behind you, fingers pointing away.',
      'Lift your chest and arch your back gently.',
      'Keep your legs straight and engaged.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Abdominals'
  },
  {
    id: 'bridge-pose',
    name: 'Bridge Pose',
    description: 'Advanced backbend that deeply stretches the abdominal muscles.',
    benefits: ['Deep abs stretch', 'Strengthens back', 'Opens chest', 'Improves flexibility'],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Place your hands by your ears, fingers pointing toward shoulders.',
      'Press into your hands and feet to lift your hips.',
      'Straighten your arms and arch your back.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Abdominals'
  },
  {
    id: 'wheel-pose',
    name: 'Wheel Pose',
    description: 'Advanced yoga pose that provides maximum stretch for the abdominal muscles.',
    benefits: ['Maximum abs stretch', 'Strengthens entire body', 'Opens chest', 'Improves flexibility'],
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Place your hands by your ears, fingers pointing toward shoulders.',
      'Press into your hands and feet to lift your body.',
      'Straighten your arms and legs, arching your back.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Abdominals'
  },
  {
    id: 'standing-backbend',
    name: 'Standing Backbend',
    description: 'Standing stretch that targets the abdominal muscles and improves posture.',
    benefits: ['Stretches abs', 'Improves posture', 'Opens chest', 'Great for daily practice'],
    instructions: [
      'Stand with feet hip-width apart and arms at your sides.',
      'Place your hands on your lower back, fingers pointing down.',
      'Gently arch your back and lift your chest.',
      'Keep your legs straight and engaged.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Abdominals'
  },
  {
    id: 'camel-pose',
    name: 'Camel Pose',
    description: 'Kneeling backbend that stretches the abdominal muscles and opens the chest.',
    benefits: ['Deep abs stretch', 'Opens chest', 'Improves posture', 'Reduces back tension'],
    instructions: [
      'Kneel on the floor with knees hip-width apart.',
      'Place your hands on your lower back, fingers pointing down.',
      'Lift your chest and arch your back gently.',
      'Keep your hips over your knees.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Abdominals'
  },
  {
    id: 'bow-pose',
    name: 'Bow Pose',
    description: 'Prone backbend that stretches the abdominal muscles and strengthens the back.',
    benefits: ['Stretches abs', 'Strengthens back', 'Opens chest', 'Improves flexibility'],
    instructions: [
      'Lie face down with arms at your sides.',
      'Bend your knees and reach back to hold your ankles.',
      'Lift your chest and thighs off the floor.',
      'Rock gently back and forth.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Abdominals'
  },
  {
    id: 'fish-pose',
    name: 'Fish Pose',
    description: 'Supine backbend that stretches the abdominal muscles and opens the chest.',
    benefits: ['Stretches abs', 'Opens chest', 'Improves posture', 'Reduces neck tension'],
    instructions: [
      'Lie on your back with legs extended.',
      'Place your hands under your hips, palms down.',
      'Lift your chest and arch your back.',
      'Let your head drop back gently.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Abdominals'
  },
  {
    id: 'dynamic-abs-mobility',
    name: 'Dynamic Abs Mobility',
    description: 'Moving stretches that warm up the abdominal muscles and improve mobility.',
    benefits: ['Warms up abs', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with feet shoulder-width apart and hands on your hips.',
      'Slowly arch your back and lift your chest.',
      'Then round your back and tuck your chin.',
      'Move smoothly between the two positions.',
      'Repeat 10-15 times, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Abdominals'
  }
];

const forearmsVariations = [
  {
    id: 'wrist-flexor-stretch',
    name: 'Wrist Flexor Stretch',
    description: 'Classic stretch that targets the wrist flexor muscles in the forearm.',
    benefits: ['Relieves wrist pain', 'Improves grip strength', 'Reduces carpal tunnel symptoms', 'Great for office workers'],
    instructions: [
      'Extend your right arm straight out in front of you.',
      'Point your fingers toward the ceiling.',
      'Use your left hand to gently pull your fingers back toward your body.',
      'Feel the stretch in your forearm and wrist.',
      'Hold for 30 seconds and switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Forearms'
  },
  {
    id: 'wrist-extensor-stretch',
    name: 'Wrist Extensor Stretch',
    description: 'Targets the wrist extensor muscles to improve wrist mobility.',
    benefits: ['Improves wrist flexibility', 'Reduces forearm tightness', 'Helps with typing', 'Good for musicians'],
    instructions: [
      'Extend your right arm straight out in front of you.',
      'Point your fingers toward the floor.',
      'Use your left hand to gently push your fingers down.',
      'Feel the stretch in the top of your forearm.',
      'Hold for 30 seconds and switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Forearms'
  },
  {
    id: 'prayer-stretch',
    name: 'Prayer Stretch',
    description: 'Gentle stretch that targets both flexors and extensors simultaneously.',
    benefits: ['Balanced stretch', 'Improves wrist mobility', 'Reduces tension', 'Can be done anywhere'],
    instructions: [
      'Bring your palms together in front of your chest.',
      'Keep your elbows at shoulder height.',
      'Slowly lower your hands toward your waist.',
      'Feel the stretch in both forearms.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Forearms'
  },
  {
    id: 'reverse-prayer-stretch',
    name: 'Reverse Prayer Stretch',
    description: 'Advanced variation that provides deeper stretch for the forearms.',
    benefits: ['Deep stretch', 'Improves flexibility', 'Targets tight areas', 'Great for athletes'],
    instructions: [
      'Bring the backs of your hands together behind your back.',
      'Keep your elbows bent and close to your body.',
      'Gently press your hands together.',
      'Feel the stretch in your forearms and wrists.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Forearms'
  },
  {
    id: 'wall-forearm-stretch',
    name: 'Wall Forearm Stretch',
    description: 'Simple wall-based stretch that can be done anywhere.',
    benefits: ['No equipment needed', 'Consistent stretch', 'Good for all levels', 'Improves wrist mobility'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall at shoulder height.',
      'Keep your arm straight and press your palm into the wall.',
      'Feel the stretch in your forearm and wrist.',
      'Hold for 30 seconds and switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Forearms'
  },
  {
    id: 'seated-forearm-stretch',
    name: 'Seated Forearm Stretch',
    description: 'Comfortable seated stretch perfect for office workers.',
    benefits: ['Can be done at desk', 'Gentle on joints', 'Good for beginners', 'Reduces wrist tension'],
    instructions: [
      'Sit in a chair with your back straight.',
      'Place your right hand on your right thigh, palm up.',
      'Use your left hand to gently pull your fingers back.',
      'Feel the stretch in your forearm.',
      'Hold for 30 seconds and switch hands.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Forearms'
  },
  {
    id: 'towel-forearm-stretch',
    name: 'Towel Forearm Stretch',
    description: 'Portable stretch using a towel for controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel with both hands in front of you.',
      'Extend your arms straight out.',
      'Gently pull the towel apart, feeling the stretch in your forearms.',
      'Hold for 30 seconds.',
      'You can adjust the towel length for different intensities.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Forearms'
  },
  {
    id: 'foam-roller-forearm-release',
    name: 'Foam Roller Forearm Release',
    description: 'Self-massage technique using a foam roller to release forearm tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Place a foam roller on a table or floor.',
      'Rest your forearm on the roller, palm down.',
      'Roll slowly from your elbow to your wrist.',
      'Pause on tender spots for 30 seconds.',
      'Repeat with palm up and on the other arm.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Forearms'
  },
  {
    id: 'dynamic-forearm-mobility',
    name: 'Dynamic Forearm Mobility',
    description: 'Moving stretches that warm up the forearms and improve mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your arms at your sides.',
      'Make fists and rotate your wrists in circles.',
      'Move clockwise for 10 rotations, then counterclockwise.',
      'Gradually increase the range of motion.',
      'Repeat 3-5 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Forearms'
  },
  {
    id: 'resistance-band-forearm-stretch',
    name: 'Resistance Band Forearm Stretch',
    description: 'Dynamic stretch using resistance bands for controlled forearm stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Hold a resistance band with both hands in front of you.',
      'Extend your arms straight out to the sides.',
      'Gently pull the band apart, feeling the stretch in your forearms.',
      'Hold for 30 seconds.',
      'You can adjust the band tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Forearms'
  }
];

const glutesVariations = [
  {
    id: 'figure-four-stretch',
    name: 'Figure Four Stretch',
    description: 'Classic glute stretch that targets the piriformis and deep glute muscles.',
    benefits: ['Relieves sciatic pain', 'Improves hip mobility', 'Reduces lower back tension', 'Great for runners'],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Cross your right ankle over your left knee.',
      'Grab your left thigh and pull it toward your chest.',
      'Feel the stretch in your right glute and hip.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Glutes'
  },
  {
    id: 'pigeon-pose',
    name: 'Pigeon Pose',
    description: 'Yoga-inspired stretch that deeply targets the glute muscles.',
    benefits: ['Deep glute stretch', 'Opens hips', 'Improves flexibility', 'Reduces hip tightness'],
    instructions: [
      'Start in a tabletop position on hands and knees.',
      'Bring your right knee forward and place it behind your right wrist.',
      'Extend your left leg straight back behind you.',
      'Lower your hips toward the floor.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Glutes'
  },
  {
    id: 'seated-glute-stretch',
    name: 'Seated Glute Stretch',
    description: 'Simple seated stretch that can be done anywhere.',
    benefits: ['Can be done at desk', 'Gentle on joints', 'Good for beginners', 'Reduces glute tension'],
    instructions: [
      'Sit on the edge of a chair with your back straight.',
      'Cross your right ankle over your left knee.',
      'Gently press down on your right knee.',
      'Feel the stretch in your right glute.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Glutes'
  },
  {
    id: 'standing-glute-stretch',
    name: 'Standing Glute Stretch',
    description: 'Standing variation that targets the glutes and improves balance.',
    benefits: ['Improves balance', 'Strengthens core', 'Targets glutes', 'Great for athletes'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Cross your right ankle over your left knee.',
      'Sit back into a mini squat position.',
      'Feel the stretch in your right glute.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Glutes'
  },
  {
    id: 'lying-glute-stretch',
    name: 'Lying Glute Stretch',
    description: 'Gentle lying stretch that targets the glute muscles.',
    benefits: ['Gentle stretch', 'Good for recovery', 'Reduces soreness', 'Great for beginners'],
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Cross your right ankle over your left knee.',
      'Grab your left thigh and pull it toward your chest.',
      'Keep your head and shoulders on the floor.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Glutes'
  },
  {
    id: 'wall-glute-stretch',
    name: 'Wall Glute Stretch',
    description: 'Wall-assisted stretch that provides support and stability.',
    benefits: ['Provides support', 'Good for beginners', 'Consistent stretch', 'Improves stability'],
    instructions: [
      'Sit on the floor with your back against a wall.',
      'Cross your right ankle over your left knee.',
      'Gently press your right knee away from your body.',
      'Feel the stretch in your right glute.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Glutes'
  },
  {
    id: 'foam-roller-glute-release',
    name: 'Foam Roller Glute Release',
    description: 'Self-massage technique using a foam roller to release glute tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on a foam roller with your hands behind you for support.',
      'Cross your right ankle over your left knee.',
      'Roll slowly over your right glute area.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Glutes'
  },
  {
    id: 'resistance-band-glute-stretch',
    name: 'Resistance Band Glute Stretch',
    description: 'Dynamic stretch using resistance bands for controlled glute stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Loop a resistance band around your right foot.',
      'Lie on your back and hold the band with both hands.',
      'Gently pull your leg toward your chest.',
      'Feel the stretch in your glute and hip.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Glutes'
  },
  {
    id: 'dynamic-glute-mobility',
    name: 'Dynamic Glute Mobility',
    description: 'Moving stretches that warm up the glutes and improve mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Lift your right knee toward your chest.',
      'Rotate your knee outward in a circular motion.',
      'Lower your leg and repeat with the left.',
      'Repeat 10-15 times on each side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Glutes'
  },
  {
    id: 'kneeling-glute-stretch',
    name: 'Kneeling Glute Stretch',
    description: 'Advanced kneeling stretch that provides deep glute stretch.',
    benefits: ['Deep stretch', 'Targets tight areas', 'Improves flexibility', 'Great for athletes'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Cross your right ankle over your left knee.',
      'Sit back on your heels while keeping your back straight.',
      'Feel the stretch in your right glute.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Glutes'
  }
];

const hamstringsVariations = [
  {
    id: 'standing-hamstring-stretch',
    name: 'Standing Hamstring Stretch',
    description: 'Classic standing stretch that targets the hamstring muscles.',
    benefits: ['Improves flexibility', 'Reduces tightness', 'Enhances mobility', 'Great for runners'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Extend your right leg straight out in front of you.',
      'Hinge at your hips and reach toward your toes.',
      'Keep your back straight and chest open.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hamstrings'
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated Forward Fold',
    description: 'Gentle seated stretch that targets both hamstrings simultaneously.',
    benefits: ['Gentle stretch', 'Good for beginners', 'Can be done anywhere', 'Reduces tension'],
    instructions: [
      'Sit on the floor with legs extended in front.',
      'Keep your back straight and chest open.',
      'Gently fold forward from your hips.',
      'Reach for your toes or ankles.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hamstrings'
  },
  {
    id: 'lying-hamstring-stretch',
    name: 'Lying Hamstring Stretch',
    description: 'Comfortable lying stretch that targets the hamstrings.',
    benefits: ['Comfortable position', 'Good for recovery', 'Reduces soreness', 'Great for beginners'],
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Extend your right leg straight up toward the ceiling.',
      'Grab behind your thigh or calf with both hands.',
      'Gently pull your leg toward your chest.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hamstrings'
  },
  {
    id: 'wall-hamstring-stretch',
    name: 'Wall Hamstring Stretch',
    description: 'Wall-assisted stretch that provides support and stability.',
    benefits: ['Provides support', 'Good for beginners', 'Consistent stretch', 'Improves stability'],
    instructions: [
      'Lie on your back near a wall.',
      'Place your right foot against the wall.',
      'Straighten your right leg up the wall.',
      'Keep your left leg bent or extended on the floor.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hamstrings'
  },
  {
    id: 'towel-hamstring-stretch',
    name: 'Towel Hamstring Stretch',
    description: 'Portable stretch using a towel for controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Loop a towel around your right foot.',
      'Extend your right leg straight up.',
      'Gently pull the towel to increase the stretch.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Hamstrings'
  },
  {
    id: 'resistance-band-hamstring-stretch',
    name: 'Resistance Band Hamstring Stretch',
    description: 'Dynamic stretch using resistance bands for controlled hamstring stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Loop a resistance band around your right foot.',
      'Lie on your back and hold the band with both hands.',
      'Extend your right leg straight up.',
      'Gently pull the band to increase the stretch.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Hamstrings'
  },
  {
    id: 'foam-roller-hamstring-release',
    name: 'Foam Roller Hamstring Release',
    description: 'Self-massage technique using a foam roller to release hamstring tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on the floor with a foam roller under your right thigh.',
      'Place your hands behind you for support.',
      'Roll slowly from your knee to your hip.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other leg.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Hamstrings'
  },
  {
    id: 'dynamic-hamstring-mobility',
    name: 'Dynamic Hamstring Mobility',
    description: 'Moving stretches that warm up the hamstrings and improve mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Swing your right leg forward and backward.',
      'Keep your leg straight and controlled.',
      'Gradually increase the range of motion.',
      'Repeat 10-15 times on each leg.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hamstrings'
  },
  {
    id: 'kneeling-hamstring-stretch',
    name: 'Kneeling Hamstring Stretch',
    description: 'Advanced kneeling stretch that provides deep hamstring stretch.',
    benefits: ['Deep stretch', 'Targets tight areas', 'Improves flexibility', 'Great for athletes'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Extend your right leg straight out in front.',
      'Hinge at your hips and reach toward your toes.',
      'Keep your back straight and chest open.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Hamstrings'
  },
  {
    id: 'split-hamstring-stretch',
    name: 'Split Hamstring Stretch',
    description: 'Advanced stretch that targets hamstrings in a split position.',
    benefits: ['Advanced flexibility', 'Targets both legs', 'Improves range of motion', 'Great for dancers'],
    instructions: [
      'Sit on the floor with legs extended in a wide V shape.',
      'Keep your back straight and chest open.',
      'Gently fold forward from your hips.',
      'Reach toward the center or alternate sides.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Hamstrings'
  }
];

const latsVariations = [
  {
    id: 'childs-pose-lat-stretch',
    name: 'Child\'s Pose Lat Stretch',
    description: 'Gentle yoga pose that stretches the latissimus dorsi muscles.',
    benefits: ['Relieves back tension', 'Opens shoulders', 'Reduces stress', 'Great for beginners'],
    instructions: [
      'Kneel on the floor with knees hip-width apart.',
      'Sit back on your heels and fold forward.',
      'Extend your arms in front of you.',
      'Rest your forehead on the floor.',
      'Hold for 1-3 minutes, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lats'
  },
  {
    id: 'cat-cow-lat-stretch',
    name: 'Cat-Cow Lat Stretch',
    description: 'Dynamic yoga sequence that stretches and mobilizes the lats.',
    benefits: ['Improves spinal flexibility', 'Opens chest and shoulders', 'Reduces tension', 'Great for daily practice'],
    instructions: [
      'Start on hands and knees with wrists under shoulders and knees under hips.',
      'Inhale and arch your back, lifting your tailbone (cow pose).',
      'Exhale and round your back, tucking your tailbone (cat pose).',
      'Move with your breath, feeling the stretch in your lats.',
      'Repeat 10-15 times, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lats'
  },
  {
    id: 'standing-lat-stretch',
    name: 'Standing Lat Stretch',
    description: 'Simple standing stretch that targets the lat muscles.',
    benefits: ['Can be done anywhere', 'Improves posture', 'Reduces tightness', 'Good for all levels'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Raise your right arm overhead.',
      'Bend to the left side, feeling the stretch in your right lat.',
      'Keep your hips square and chest open.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lats'
  },
  {
    id: 'seated-lat-stretch',
    name: 'Seated Lat Stretch',
    description: 'Comfortable seated stretch perfect for office workers.',
    benefits: ['Can be done at desk', 'Gentle on joints', 'Good for beginners', 'Reduces back tension'],
    instructions: [
      'Sit in a chair with your back straight.',
      'Raise your right arm overhead.',
      'Bend to the left side, feeling the stretch in your right lat.',
      'Keep your hips square and chest open.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lats'
  },
  {
    id: 'wall-lat-stretch',
    name: 'Wall Lat Stretch',
    description: 'Wall-assisted stretch that provides support and stability.',
    benefits: ['Provides support', 'Good for beginners', 'Consistent stretch', 'Improves stability'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall at shoulder height.',
      'Turn your body to the left, keeping your arm straight.',
      'Feel the stretch in your right lat and shoulder.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lats'
  },
  {
    id: 'towel-lat-stretch',
    name: 'Towel Lat Stretch',
    description: 'Portable stretch using a towel for controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel with both hands overhead.',
      'Keep your arms straight and shoulder-width apart.',
      'Gently pull the towel apart, feeling the stretch in your lats.',
      'Hold for 30 seconds.',
      'You can adjust the towel length for different intensities.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Lats'
  },
  {
    id: 'foam-roller-lat-release',
    name: 'Foam Roller Lat Release',
    description: 'Self-massage technique using a foam roller to release lat tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie on your side with a foam roller under your armpit.',
      'Extend your arm overhead and roll slowly down your side.',
      'Focus on the area from your armpit to your hip.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Lats'
  },
  {
    id: 'resistance-band-lat-stretch',
    name: 'Resistance Band Lat Stretch',
    description: 'Dynamic stretch using resistance bands for controlled lat stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Hold a resistance band with both hands overhead.',
      'Keep your arms straight and shoulder-width apart.',
      'Gently pull the band apart, feeling the stretch in your lats.',
      'Hold for 30 seconds.',
      'You can adjust the band tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Lats'
  },
  {
    id: 'dynamic-lat-mobility',
    name: 'Dynamic Lat Mobility',
    description: 'Moving stretches that warm up the lats and improve mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Raise your arms overhead and swing them in circles.',
      'Move clockwise for 10 rotations, then counterclockwise.',
      'Gradually increase the range of motion.',
      'Repeat 3-5 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Lats'
  },
  {
    id: 'kneeling-lat-stretch',
    name: 'Kneeling Lat Stretch',
    description: 'Advanced kneeling stretch that provides deep lat stretch.',
    benefits: ['Deep stretch', 'Targets tight areas', 'Improves flexibility', 'Great for athletes'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Raise your right arm overhead.',
      'Bend to the left side, feeling the stretch in your right lat.',
      'Keep your hips square and chest open.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Lats'
  }
];

const chestVariations = [
  {
    id: 'doorway-chest-stretch',
    name: 'Doorway Chest Stretch',
    description: 'Classic stretch using a doorway to open up the chest and shoulders.',
    benefits: ['Opens chest muscles', 'Improves posture', 'Reduces shoulder tightness', 'Great for desk workers'],
    instructions: [
      'Stand in a doorway with your feet shoulder-width apart.',
      'Place your forearms on the door frame at shoulder height.',
      'Step forward slightly to feel the stretch in your chest.',
      'Keep your back straight and core engaged.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Chest'
  },
  {
    id: 'wall-chest-stretch',
    name: 'Wall Chest Stretch',
    description: 'Simple wall-based stretch that targets the pectoral muscles.',
    benefits: ['No equipment needed', 'Consistent stretch', 'Good for all levels', 'Improves chest mobility'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall at shoulder height.',
      'Turn your body to the left, keeping your arm straight.',
      'Feel the stretch in your chest and shoulder.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Chest'
  },
  {
    id: 'kneeling-chest-stretch',
    name: 'Kneeling Chest Stretch',
    description: 'Advanced kneeling stretch that provides a deep chest opening.',
    benefits: ['Deep chest stretch', 'Opens shoulders', 'Improves flexibility', 'Great for tight chest'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Place your hands behind you, fingers pointing away.',
      'Sit back on your heels while arching your chest forward.',
      'Feel the stretch in your chest and shoulders.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Chest'
  },
  {
    id: 'foam-roller-chest-release',
    name: 'Foam Roller Chest Release',
    description: 'Self-massage technique using a foam roller to release chest tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie face down with a foam roller under your chest.',
      'Position the roller from your collarbone to your sternum.',
      'Roll slowly up and down your chest area.',
      'Pause on tender spots for 30 seconds.',
      'Breathe deeply throughout the movement.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Chest'
  },
  {
    id: 'resistance-band-chest-stretch',
    name: 'Resistance Band Chest Stretch',
    description: 'Dynamic stretch using resistance bands for controlled chest stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Hold a resistance band with both hands in front of you.',
      'Extend your arms straight out to the sides.',
      'Gently pull the band apart, feeling the stretch in your chest.',
      'Hold for 30 seconds.',
      'You can adjust the band tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Chest'
  },
  {
    id: 'seated-chest-stretch',
    name: 'Seated Chest Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces chest tension'],
    instructions: [
      'Sit on the floor with your legs crossed.',
      'Place your hands behind you, fingers pointing away.',
      'Lift your chest and arch your back slightly.',
      'Feel the stretch in your chest and shoulders.',
      'Hold for 30 seconds.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Chest'
  },
  {
    id: 'dynamic-chest-stretch',
    name: 'Dynamic Chest Stretch',
    description: 'Moving stretch that warms up the chest and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your arms at your sides.',
      'Swing your arms in small circles forward for 10 seconds.',
      'Then swing them backward for 10 seconds.',
      'Gradually increase the circle size.',
      'Repeat 3-5 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Chest'
  },
  {
    id: 'towel-chest-stretch',
    name: 'Towel Chest Stretch',
    description: 'Portable stretch using a towel that provides controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel with both hands behind your back.',
      'Extend your arms straight and lift the towel up.',
      'Feel the stretch in your chest and shoulders.',
      'Hold for 30 seconds.',
      'You can adjust the towel length for different intensities.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Chest'
  },
  {
    id: 'lying-chest-stretch',
    name: 'Lying Chest Stretch',
    description: 'Relaxing stretch performed while lying down to open the chest.',
    benefits: ['Relaxing', 'Deep stretch', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your knees bent.',
      'Extend your arms out to the sides at shoulder height.',
      'Let your arms relax and feel the chest opening.',
      'Hold for 30-60 seconds.',
      'Breathe deeply and relax.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Chest'
  },
  {
    id: 'standing-chest-expansion',
    name: 'Standing Chest Expansion',
    description: 'Active stretch that expands the chest and improves breathing.',
    benefits: ['Improves breathing', 'Opens chest', 'Enhances posture', 'Reduces tension'],
    instructions: [
      'Stand tall with your feet shoulder-width apart.',
      'Interlace your fingers behind your back.',
      'Straighten your arms and lift them slightly.',
      'Lift your chest and look up slightly.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Chest'
  }
];

const shoulderVariations = [
  {
    id: 'cross-body-shoulder-stretch',
    name: 'Cross-Body Shoulder Stretch',
    description: 'Classic stretch that targets the posterior deltoid and rotator cuff muscles.',
    benefits: ['Relieves shoulder tension', 'Improves range of motion', 'Reduces stiffness', 'Great for desk workers'],
    instructions: [
      'Stand or sit with your back straight.',
      'Bring your right arm across your chest.',
      'Use your left hand to gently pull your right arm closer.',
      'Hold for 30 seconds, feeling the stretch in your shoulder.',
      'Switch arms and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Shoulders'
  },
  {
    id: 'behind-back-shoulder-stretch',
    name: 'Behind Back Shoulder Stretch',
    description: 'Effective stretch that opens the chest and stretches the anterior shoulder muscles.',
    benefits: ['Opens chest', 'Improves posture', 'Reduces shoulder tightness', 'Enhances breathing'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Place your hands behind your back and interlace your fingers.',
      'Straighten your arms and lift them slightly.',
      'Lift your chest and look up slightly.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Shoulders'
  },
  {
    id: 'wall-shoulder-stretch',
    name: 'Wall Shoulder Stretch',
    description: 'Wall-based stretch that provides consistent resistance for shoulder opening.',
    benefits: ['Consistent stretch', 'No equipment needed', 'Good for all levels', 'Improves shoulder mobility'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall at shoulder height.',
      'Turn your body to the left, keeping your arm straight.',
      'Feel the stretch in your shoulder and chest.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Shoulders'
  },
  {
    id: 'towel-shoulder-stretch',
    name: 'Towel Shoulder Stretch',
    description: 'Portable stretch using a towel that provides controlled shoulder stretching.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel with both hands behind your back.',
      'Extend your arms straight and lift the towel up.',
      'Feel the stretch in your shoulders and chest.',
      'Hold for 30 seconds.',
      'You can adjust the towel length for different intensities.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Shoulders'
  },
  {
    id: 'seated-shoulder-stretch',
    name: 'Seated Shoulder Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces shoulder tension'],
    instructions: [
      'Sit on the floor with your legs crossed.',
      'Place your hands behind you, fingers pointing away.',
      'Lift your chest and arch your back slightly.',
      'Feel the stretch in your shoulders and chest.',
      'Hold for 30 seconds.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Shoulders'
  },
  {
    id: 'dynamic-shoulder-stretch',
    name: 'Dynamic Shoulder Stretch',
    description: 'Moving stretch that warms up the shoulders and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your arms at your sides.',
      'Swing your arms in small circles forward for 10 seconds.',
      'Then swing them backward for 10 seconds.',
      'Gradually increase the circle size.',
      'Repeat 3-5 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Shoulders'
  },
  {
    id: 'resistance-band-shoulder-stretch',
    name: 'Resistance Band Shoulder Stretch',
    description: 'Dynamic stretch using resistance bands for controlled shoulder stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Hold a resistance band with both hands in front of you.',
      'Extend your arms straight out to the sides.',
      'Gently pull the band apart, feeling the stretch in your shoulders.',
      'Hold for 30 seconds.',
      'You can adjust the band tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Shoulders'
  },
  {
    id: 'lying-shoulder-stretch',
    name: 'Lying Shoulder Stretch',
    description: 'Relaxing stretch performed while lying down to open the shoulders.',
    benefits: ['Relaxing', 'Deep stretch', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your knees bent.',
      'Extend your arms out to the sides at shoulder height.',
      'Let your arms relax and feel the shoulder opening.',
      'Hold for 30-60 seconds.',
      'Breathe deeply and relax.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Shoulders'
  },
  {
    id: 'kneeling-shoulder-stretch',
    name: 'Kneeling Shoulder Stretch',
    description: 'Advanced kneeling stretch that provides a deep shoulder opening.',
    benefits: ['Deep shoulder stretch', 'Opens chest', 'Improves flexibility', 'Great for tight shoulders'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Place your hands behind you, fingers pointing away.',
      'Sit back on your heels while arching your chest forward.',
      'Feel the stretch in your shoulders and chest.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Shoulders'
  },
  {
    id: 'foam-roller-shoulder-release',
    name: 'Foam Roller Shoulder Release',
    description: 'Self-massage technique using a foam roller to release shoulder tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie face down with a foam roller under your right shoulder.',
      'Position the roller from your shoulder to your upper arm.',
      'Roll slowly up and down your shoulder area.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other shoulder.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Shoulders'
  }
];

const quadricepsVariations = [
  {
    id: 'standing-quad-stretch',
    name: 'Standing Quad Stretch',
    description: 'Classic standing stretch that targets the quadriceps muscles.',
    benefits: ['Improves leg flexibility', 'Reduces muscle tightness', 'Enhances knee mobility', 'Great for post-workout recovery'],
    instructions: [
      'Stand tall with your feet shoulder-width apart.',
      'Bend your right knee and bring your heel toward your buttocks.',
      'Grasp your right ankle with your right hand.',
      'Gently pull your heel closer to your buttocks.',
      'Hold for 30 seconds, then switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Quadriceps'
  },
  {
    id: 'lying-quad-stretch',
    name: 'Lying Quad Stretch',
    description: 'Gentle lying stretch that provides a deep quadriceps stretch.',
    benefits: ['Deep stretch', 'Gentle on joints', 'Good for beginners', 'Reduces leg tension'],
    instructions: [
      'Lie on your right side with your legs straight.',
      'Bend your left knee and bring your heel toward your buttocks.',
      'Grasp your left ankle with your left hand.',
      'Gently pull your heel closer to your buttocks.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Quadriceps'
  },
  {
    id: 'kneeling-quad-stretch',
    name: 'Kneeling Quad Stretch',
    description: 'Advanced kneeling stretch that provides an intense quadriceps stretch.',
    benefits: ['Intense stretch', 'Targets both legs', 'Improves flexibility', 'Great for tight quads'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Lean back and place your hands behind you.',
      'Lower your body back toward the floor.',
      'Feel the stretch in your quadriceps.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Quadriceps'
  },
  {
    id: 'wall-quad-stretch',
    name: 'Wall Quad Stretch',
    description: 'Wall-assisted stretch that provides support while stretching the quadriceps.',
    benefits: ['Supported stretch', 'Good for balance', 'Consistent stretch', 'Safe for all levels'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall for support.',
      'Bend your left knee and bring your heel toward your buttocks.',
      'Grasp your left ankle with your left hand.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Quadriceps'
  },
  {
    id: 'seated-quad-stretch',
    name: 'Seated Quad Stretch',
    description: 'Seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces leg tension'],
    instructions: [
      'Sit on the floor with your legs extended in front.',
      'Bend your right knee and bring your heel toward your buttocks.',
      'Grasp your right ankle with your right hand.',
      'Gently pull your heel closer to your buttocks.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Quadriceps'
  },
  {
    id: 'dynamic-quad-stretch',
    name: 'Dynamic Quad Stretch',
    description: 'Moving stretch that warms up the quadriceps and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'March in place, bringing your knees up high.',
      'Gradually increase the height of your knee lifts.',
      'Continue for 30-60 seconds.',
      'You can also add arm swings for balance.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Quadriceps'
  },
  {
    id: 'foam-roller-quad-release',
    name: 'Foam Roller Quad Release',
    description: 'Self-massage technique using a foam roller to release quadriceps tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie face down with a foam roller under your right thigh.',
      'Position the roller from your hip to your knee.',
      'Roll slowly up and down your quadriceps area.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other leg.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Quadriceps'
  },
  {
    id: 'resistance-band-quad-stretch',
    name: 'Resistance Band Quad Stretch',
    description: 'Dynamic stretch using resistance bands for controlled quadriceps stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Attach a resistance band to a sturdy object.',
      'Loop the band around your right ankle.',
      'Face away from the anchor point.',
      'Bend your right knee and bring your heel toward your buttocks.',
      'Hold for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Quadriceps'
  },
  {
    id: 'pigeon-quad-stretch',
    name: 'Pigeon Quad Stretch',
    description: 'Yoga-inspired stretch that targets quadriceps while opening the hips.',
    benefits: ['Opens hips', 'Stretches quads', 'Improves flexibility', 'Great for runners'],
    instructions: [
      'Start in a kneeling position.',
      'Bring your right leg forward and place your right foot on the floor.',
      'Slide your left leg back and lower your left knee to the floor.',
      'Bend your left knee and reach back to grasp your left ankle.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Quadriceps'
  },
  {
    id: 'couch-quad-stretch',
    name: 'Couch Quad Stretch',
    description: 'Gentle stretch using a couch or chair for support and comfort.',
    benefits: ['Comfortable', 'Supported stretch', 'Good for recovery', 'Reduces strain'],
    instructions: [
      'Sit on the edge of a couch or chair.',
      'Slide your right leg back so your knee is on the seat.',
      'Gently lean back to feel the stretch in your quadriceps.',
      'Hold for 30 seconds and switch legs.',
      'You can adjust the intensity by leaning back further.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Quadriceps'
  }
];

const tricepsVariations = [
  {
    id: 'overhead-triceps-stretch',
    name: 'Overhead Triceps Stretch',
    description: 'Classic stretch that targets the triceps and the muscles along the side of the torso.',
    benefits: ['Improves arm flexibility', 'Reduces triceps tightness', 'Enhances shoulder mobility', 'Great for post-workout recovery'],
    instructions: [
      'Stand or sit tall with your back straight.',
      'Raise your right arm overhead and bend the elbow to reach your hand down your back.',
      'Use your left hand to gently push on your right elbow.',
      'Hold for 30 seconds, then switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Triceps'
  },
  {
    id: 'cross-body-triceps-stretch',
    name: 'Cross-Body Triceps Stretch',
    description: 'Effective stretch that targets the triceps and rear shoulder.',
    benefits: ['Deep stretch', 'Opens rear shoulder', 'Improves posture', 'Targets multiple muscle groups'],
    instructions: [
      'Stand or sit with your back straight.',
      'Bring your right arm across your chest.',
      'Use your left hand to gently pull your right arm closer.',
      'Hold for 30 seconds and repeat on the other side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Triceps'
  },
  {
    id: 'seated-overhead-triceps-stretch',
    name: 'Seated Overhead Triceps Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces arm tension'],
    instructions: [
      'Sit on a chair or the floor with your back straight.',
      'Raise your right arm overhead and bend the elbow to reach your hand down your back.',
      'Use your left hand to gently push on your right elbow.',
      'Hold for 30 seconds, then switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Triceps'
  },
  {
    id: 'wall-triceps-stretch',
    name: 'Wall Triceps Stretch',
    description: 'Simple wall-based stretch that can be done anywhere with a wall.',
    benefits: ['No equipment needed', 'Consistent stretch', 'Good for all levels', 'Improves arm mobility'],
    instructions: [
      'Stand facing a wall.',
      'Place your right hand and forearm on the wall, elbow bent at 90 degrees.',
      'Gently lean forward to feel the stretch in your triceps.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Triceps'
  },
  {
    id: 'towel-triceps-stretch',
    name: 'Towel Triceps Stretch',
    description: 'Portable stretch using a towel that provides controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel in your right hand and raise it overhead.',
      'Bend your right elbow so the towel hangs down your back.',
      'Reach behind with your left hand and grab the towel.',
      'Gently pull down with your left hand to stretch your right triceps.',
      'Hold for 30 seconds and switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Triceps'
  },
  {
    id: 'dynamic-triceps-stretch',
    name: 'Dynamic Triceps Stretch',
    description: 'Moving stretch that warms up the triceps and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your arms at your sides.',
      'Swing your arms overhead and then back down repeatedly.',
      'Continue for 30-60 seconds.',
      'You can also add torso twists for a dynamic warm-up.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Triceps'
  },
  {
    id: 'foam-roller-triceps-release',
    name: 'Foam Roller Triceps Release',
    description: 'Self-massage technique using a foam roller to release triceps tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on the floor with a foam roller in front of you.',
      'Place your right triceps on the roller and support your body with your left hand and knees.',
      'Roll slowly up and down your triceps area.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other arm.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Triceps'
  },
  {
    id: 'resistance-band-triceps-stretch',
    name: 'Resistance Band Triceps Stretch',
    description: 'Dynamic stretch using resistance bands for controlled triceps stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Hold a resistance band with both hands behind your back.',
      'Raise your right arm overhead and bend the elbow.',
      'Gently pull down with your left hand to stretch your right triceps.',
      'Hold for 30 seconds and switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Triceps'
  },
  {
    id: 'kneeling-triceps-stretch',
    name: 'Kneeling Triceps Stretch',
    description: 'Advanced kneeling stretch that provides a deep triceps stretch.',
    benefits: ['Deep stretch', 'Targets both arms', 'Improves flexibility', 'Great for tight triceps'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Raise your right arm overhead and bend the elbow to reach your hand down your back.',
      'Use your left hand to gently push on your right elbow.',
      'Hold for 30 seconds, breathing deeply, then switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Triceps'
  },
  {
    id: 'tabletop-triceps-stretch',
    name: 'Tabletop Triceps Stretch',
    description: 'Stretch performed in a tabletop position to target the triceps and shoulders.',
    benefits: ['Stretches triceps and shoulders', 'Improves arm mobility', 'Good for all levels', 'Reduces tension'],
    instructions: [
      'Start on your hands and knees in a tabletop position.',
      'Bend your right elbow and slide your arm under your chest.',
      'Lower your right shoulder to the floor and feel the stretch in your triceps.',
      'Hold for 30 seconds and switch arms.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Triceps'
  }
];

const backVariations = [
  {
    id: 'cat-cow-stretch',
    name: 'Cat-Cow Stretch',
    description: 'Dynamic yoga-inspired stretch that mobilizes the entire spine and back muscles.',
    benefits: ['Mobilizes spine', 'Relieves back tension', 'Improves posture', 'Great for warm-up'],
    instructions: [
      'Start on your hands and knees in a tabletop position.',
      'Inhale and arch your back, lifting your head and tailbone (cow pose).',
      'Exhale and round your back, tucking your chin and tailbone (cat pose).',
      'Flow between these positions for 10-15 repetitions.',
      'Move slowly and breathe deeply with each movement.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Back'
  },
  {
    id: 'childs-pose-back-stretch',
    name: 'Child\'s Pose Back Stretch',
    description: 'Gentle restorative stretch that releases tension in the back and shoulders.',
    benefits: ['Relieves back tension', 'Opens shoulders', 'Reduces stress', 'Great for recovery'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Sit back on your heels and fold forward from your hips.',
      'Extend your arms forward and rest your forehead on the floor.',
      'Let your back relax and feel the gentle stretch.',
      'Hold for 30-60 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Back'
  },
  {
    id: 'cobra-back-stretch',
    name: 'Cobra Back Stretch',
    description: 'Classic back stretch that strengthens and stretches the back muscles.',
    benefits: ['Strengthens back', 'Improves posture', 'Opens chest', 'Relieves lower back pain'],
    instructions: [
      'Lie face down on the floor with your legs extended.',
      'Place your hands under your shoulders, elbows close to your body.',
      'Press into your hands and lift your chest off the floor.',
      'Keep your pelvis on the floor and look forward.',
      'Hold for 15-30 seconds, then lower back down.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Back'
  },
  {
    id: 'seated-back-twist',
    name: 'Seated Back Twist',
    description: 'Gentle twisting stretch that mobilizes the spine and relieves back tension.',
    benefits: ['Mobilizes spine', 'Relieves tension', 'Improves digestion', 'Good for posture'],
    instructions: [
      'Sit on the floor with your legs extended in front.',
      'Bend your right knee and place your right foot outside your left knee.',
      'Place your left elbow on your right knee and twist to the right.',
      'Look over your right shoulder and hold for 30 seconds.',
      'Repeat on the other side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Back'
  },
  {
    id: 'standing-back-bend',
    name: 'Standing Back Bend',
    description: 'Active stretch that opens the chest and stretches the back muscles.',
    benefits: ['Opens chest', 'Stretches back', 'Improves posture', 'Enhances breathing'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Place your hands on your lower back, fingers pointing down.',
      'Gently arch your back and lift your chest toward the ceiling.',
      'Look up slightly and hold for 15-30 seconds.',
      'Return to neutral position slowly.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Back'
  },
  {
    id: 'lying-back-twist',
    name: 'Lying Back Twist',
    description: 'Relaxing stretch that gently twists the spine while lying down.',
    benefits: ['Gentle spine twist', 'Relieves tension', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your arms extended out to the sides.',
      'Bend your knees and bring them toward your chest.',
      'Slowly lower your knees to the right side.',
      'Turn your head to the left and hold for 30 seconds.',
      'Return to center and repeat on the other side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Back'
  },
  {
    id: 'bridge-back-stretch',
    name: 'Bridge Back Stretch',
    description: 'Strengthening stretch that opens the chest and strengthens the back.',
    benefits: ['Strengthens back', 'Opens chest', 'Improves posture', 'Relieves tension'],
    instructions: [
      'Lie on your back with your knees bent and feet flat on the floor.',
      'Place your arms at your sides, palms down.',
      'Press into your feet and lift your hips toward the ceiling.',
      'Keep your shoulders on the floor and hold for 15-30 seconds.',
      'Lower back down slowly.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Back'
  },
  {
    id: 'foam-roller-back-release',
    name: 'Foam Roller Back Release',
    description: 'Self-massage technique using a foam roller to release back tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie on your back with a foam roller under your mid-back.',
      'Support your head with your hands and lift your hips slightly.',
      'Roll slowly up and down your back area.',
      'Pause on tender spots for 30 seconds.',
      'Breathe deeply throughout the movement.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Back'
  },
  {
    id: 'wall-back-stretch',
    name: 'Wall Back Stretch',
    description: 'Simple wall-based stretch that opens the chest and stretches the back.',
    benefits: ['Opens chest', 'Stretches back', 'Improves posture', 'No equipment needed'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your hands on the wall at shoulder height.',
      'Step back slightly and lean forward from your hips.',
      'Feel the stretch in your back and shoulders.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Back'
  },
  {
    id: 'dynamic-back-stretch',
    name: 'Dynamic Back Stretch',
    description: 'Moving stretch that warms up the back and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Place your hands on your hips.',
      'Gently rotate your torso to the right and left.',
      'Then gently bend forward and back.',
      'Continue for 30-60 seconds, moving slowly.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Back'
  }
];

const legsVariations = [
  {
    id: 'standing-leg-stretch',
    name: 'Standing Leg Stretch',
    description: 'Comprehensive standing stretch that targets multiple leg muscle groups.',
    benefits: ['Improves leg flexibility', 'Reduces muscle tightness', 'Enhances balance', 'Great for warm-up'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Bend forward from your hips and reach toward your toes.',
      'Keep your legs straight but not locked.',
      'Hold for 30 seconds, feeling the stretch in your hamstrings.',
      'Slowly return to standing position.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Legs'
  },
  {
    id: 'butterfly-leg-stretch',
    name: 'Butterfly Leg Stretch',
    description: 'Seated stretch that opens the hips and stretches the inner thighs.',
    benefits: ['Opens hips', 'Stretches inner thighs', 'Improves flexibility', 'Good for all levels'],
    instructions: [
      'Sit on the floor with your back straight.',
      'Bring the soles of your feet together and let your knees fall out to the sides.',
      'Gently press your knees toward the floor.',
      'Hold for 30-60 seconds, breathing deeply.',
      'You can lean forward to increase the stretch.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Legs'
  },
  {
    id: 'pigeon-leg-stretch',
    name: 'Pigeon Leg Stretch',
    description: 'Yoga-inspired stretch that targets the hips and outer thighs.',
    benefits: ['Opens hips', 'Stretches glutes', 'Improves flexibility', 'Great for runners'],
    instructions: [
      'Start in a kneeling position.',
      'Bring your right leg forward and place your right foot on the floor.',
      'Slide your left leg back and lower your left knee to the floor.',
      'Gently lower your hips toward the floor.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Legs'
  },
  {
    id: 'figure-four-leg-stretch',
    name: 'Figure Four Leg Stretch',
    description: 'Effective stretch that targets the hips, glutes, and outer thighs.',
    benefits: ['Stretches glutes', 'Opens hips', 'Relieves tension', 'Good for lower back'],
    instructions: [
      'Lie on your back with your knees bent and feet flat on the floor.',
      'Cross your right ankle over your left knee.',
      'Grasp your left thigh and pull it toward your chest.',
      'Feel the stretch in your right hip and glute.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Legs'
  },
  {
    id: 'seated-leg-stretch',
    name: 'Seated Leg Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces leg tension'],
    instructions: [
      'Sit on the floor with your legs extended in front.',
      'Keep your back straight and reach toward your toes.',
      'Hold for 30 seconds, feeling the stretch in your hamstrings.',
      'You can bend your knees slightly if needed.',
      'Breathe deeply throughout the stretch.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Legs'
  },
  {
    id: 'dynamic-leg-stretch',
    name: 'Dynamic Leg Stretch',
    description: 'Moving stretch that warms up the legs and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'March in place, bringing your knees up high.',
      'Then swing your legs forward and back.',
      'Continue for 30-60 seconds.',
      'You can also add arm swings for balance.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Legs'
  },
  {
    id: 'foam-roller-leg-release',
    name: 'Foam Roller Leg Release',
    description: 'Self-massage technique using a foam roller to release leg tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on the floor with a foam roller under your right thigh.',
      'Support your body with your hands and roll slowly up and down.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other leg.',
      'You can also roll your calves and hamstrings.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Legs'
  },
  {
    id: 'wall-leg-stretch',
    name: 'Wall Leg Stretch',
    description: 'Wall-assisted stretch that provides support while stretching the legs.',
    benefits: ['Supported stretch', 'Good for balance', 'Consistent stretch', 'Safe for all levels'],
    instructions: [
      'Lie on your back near a wall.',
      'Place your legs up the wall, keeping them straight.',
      'Let your arms rest at your sides.',
      'Hold for 30-60 seconds, feeling the stretch in your legs.',
      'This is great for circulation and relaxation.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Legs'
  },
  {
    id: 'resistance-band-leg-stretch',
    name: 'Resistance Band Leg Stretch',
    description: 'Dynamic stretch using resistance bands for controlled leg stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Attach a resistance band to a sturdy object.',
      'Loop the band around your right ankle.',
      'Face away from the anchor point.',
      'Gently stretch your leg in different directions.',
      'Hold each position for 30 seconds and switch legs.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Legs'
  },
  {
    id: 'lying-leg-stretch',
    name: 'Lying Leg Stretch',
    description: 'Relaxing stretch performed while lying down to stretch the legs.',
    benefits: ['Relaxing', 'Deep stretch', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your legs extended.',
      'Bend your right knee and bring it toward your chest.',
      'Hold your knee with both hands and gently pull it closer.',
      'Hold for 30 seconds and switch legs.',
      'You can also stretch both legs at once.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Legs'
  }
];

const armsVariations = [
  {
    id: 'overhead-arm-stretch',
    name: 'Overhead Arm Stretch',
    description: 'Classic stretch that targets the entire arm including shoulders, biceps, and triceps.',
    benefits: ['Improves arm flexibility', 'Reduces muscle tightness', 'Enhances shoulder mobility', 'Great for post-workout recovery'],
    instructions: [
      'Stand or sit tall with your back straight.',
      'Raise your right arm overhead and bend the elbow to reach your hand down your back.',
      'Use your left hand to gently push on your right elbow.',
      'Hold for 30 seconds, then switch arms.',
      'Feel the stretch in your triceps and shoulders.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Arms'
  },
  {
    id: 'cross-body-arm-stretch',
    name: 'Cross-Body Arm Stretch',
    description: 'Effective stretch that targets the arms and opens the chest and shoulders.',
    benefits: ['Deep stretch', 'Opens chest and shoulders', 'Improves posture', 'Targets multiple muscle groups'],
    instructions: [
      'Stand or sit with your back straight.',
      'Bring your right arm across your chest.',
      'Use your left hand to gently pull your right arm closer.',
      'Hold for 30 seconds, feeling the stretch in your arm and shoulder.',
      'Switch arms and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Arms'
  },
  {
    id: 'wall-arm-stretch',
    name: 'Wall Arm Stretch',
    description: 'Simple wall-based stretch that can be done anywhere with a wall.',
    benefits: ['No equipment needed', 'Consistent stretch', 'Good for all levels', 'Improves arm mobility'],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall at shoulder height.',
      'Turn your body to the left, keeping your arm straight.',
      'Feel the stretch in your arm and shoulder.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Arms'
  },
  {
    id: 'seated-arm-stretch',
    name: 'Seated Arm Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces arm tension'],
    instructions: [
      'Sit on a chair or the floor with your back straight.',
      'Place your hands behind you, fingers pointing away from your body.',
      'Slide your hips forward slightly to increase the stretch.',
      'Keep your back straight and chest open.',
      'Hold for 30 seconds.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Arms'
  },
  {
    id: 'towel-arm-stretch',
    name: 'Towel Arm Stretch',
    description: 'Portable stretch using a towel that provides controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel with both hands behind your back.',
      'Extend your arms straight and lift the towel up.',
      'Feel the stretch in your arms and shoulders.',
      'Hold for 30 seconds.',
      'You can adjust the towel length for different intensities.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Arms'
  },
  {
    id: 'dynamic-arm-stretch',
    name: 'Dynamic Arm Stretch',
    description: 'Moving stretch that warms up the arms and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your arms at your sides.',
      'Swing your arms in small circles forward for 10 seconds.',
      'Then swing them backward for 10 seconds.',
      'Gradually increase the circle size.',
      'Repeat 3-5 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Arms'
  },
  {
    id: 'foam-roller-arm-release',
    name: 'Foam Roller Arm Release',
    description: 'Self-massage technique using a foam roller to release arm tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie face down with a foam roller under your right arm.',
      'Position the roller from your shoulder to your elbow.',
      'Roll slowly up and down your arm area.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other arm.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Arms'
  },
  {
    id: 'resistance-band-arm-stretch',
    name: 'Resistance Band Arm Stretch',
    description: 'Dynamic stretch using resistance bands for controlled arm stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Hold a resistance band with both hands in front of you.',
      'Extend your arms straight out to the sides.',
      'Gently pull the band apart, feeling the stretch in your arms.',
      'Hold for 30 seconds.',
      'You can adjust the band tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Arms'
  },
  {
    id: 'kneeling-arm-stretch',
    name: 'Kneeling Arm Stretch',
    description: 'Advanced kneeling stretch that provides a deep arm stretch.',
    benefits: ['Deep stretch', 'Targets both arms', 'Improves flexibility', 'Great for tight arms'],
    instructions: [
      'Kneel on the floor with your knees hip-width apart.',
      'Place your hands behind you, fingers pointing away.',
      'Sit back on your heels while keeping your arms straight.',
      'Feel the stretch in your arms and shoulders.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Arms'
  },
  {
    id: 'lying-arm-stretch',
    name: 'Lying Arm Stretch',
    description: 'Relaxing stretch performed while lying down to open the arms.',
    benefits: ['Relaxing', 'Deep stretch', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your knees bent.',
      'Extend your arms out to the sides at shoulder height.',
      'Let your arms relax and feel the arm opening.',
      'Hold for 30-60 seconds.',
      'Breathe deeply and relax.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Arms'
  }
];

const neckVariations = [
  {
    id: 'neck-tilt-stretch',
    name: 'Neck Tilt Stretch',
    description: 'Gentle stretch that targets the side neck muscles and relieves tension.',
    benefits: ['Relieves neck tension', 'Improves flexibility', 'Reduces stiffness', 'Great for desk workers'],
    instructions: [
      'Sit or stand with your back straight.',
      'Slowly tilt your head to the right, bringing your right ear toward your right shoulder.',
      'Hold for 15-30 seconds, feeling the stretch in your left neck.',
      'Return to center and repeat on the left side.',
      'Keep your shoulders relaxed throughout the movement.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  },
  {
    id: 'neck-rotation-stretch',
    name: 'Neck Rotation Stretch',
    description: 'Simple rotation stretch that improves neck mobility and range of motion.',
    benefits: ['Improves neck mobility', 'Reduces stiffness', 'Enhances range of motion', 'Good for all levels'],
    instructions: [
      'Sit or stand with your back straight.',
      'Slowly turn your head to the right as far as comfortable.',
      'Hold for 15-30 seconds, feeling the stretch in your neck.',
      'Return to center and repeat to the left.',
      'Move slowly and avoid jerky movements.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  },
  {
    id: 'neck-flexion-stretch',
    name: 'Neck Flexion Stretch',
    description: 'Forward bend stretch that targets the back of the neck and upper back.',
    benefits: ['Stretches back of neck', 'Relieves tension', 'Improves posture', 'Reduces stress'],
    instructions: [
      'Sit or stand with your back straight.',
      'Slowly lower your chin toward your chest.',
      'Hold for 15-30 seconds, feeling the stretch in the back of your neck.',
      'Return to neutral position slowly.',
      'You can place your hands on the back of your head for gentle pressure.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  },
  {
    id: 'neck-extension-stretch',
    name: 'Neck Extension Stretch',
    description: 'Backward bend stretch that opens the front of the neck and throat.',
    benefits: ['Opens front of neck', 'Improves breathing', 'Reduces forward head posture', 'Enhances mobility'],
    instructions: [
      'Sit or stand with your back straight.',
      'Slowly tilt your head back, looking toward the ceiling.',
      'Hold for 15-30 seconds, feeling the stretch in the front of your neck.',
      'Return to neutral position slowly.',
      'Be gentle and avoid overextending.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  },
  {
    id: 'seated-neck-stretch',
    name: 'Seated Neck Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces neck tension'],
    instructions: [
      'Sit in a chair with your back straight.',
      'Place your right hand on the left side of your head.',
      'Gently pull your head toward your right shoulder.',
      'Hold for 15-30 seconds and switch sides.',
      'Keep your shoulders relaxed and breathe deeply.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  },
  {
    id: 'dynamic-neck-stretch',
    name: 'Dynamic Neck Stretch',
    description: 'Moving stretch that warms up the neck and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand or sit with your back straight.',
      'Slowly rotate your head in a circular motion.',
      'Make 5-10 circles clockwise, then counterclockwise.',
      'Keep the movements slow and controlled.',
      'Stop if you feel any pain or discomfort.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  },
  {
    id: 'foam-roller-neck-release',
    name: 'Foam Roller Neck Release',
    description: 'Self-massage technique using a foam roller to release neck tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie on your back with a foam roller under your neck.',
      'Support your head with your hands and gently roll side to side.',
      'Pause on tender spots for 30 seconds.',
      'Breathe deeply throughout the movement.',
      'Be very gentle and avoid putting too much pressure.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Neck'
  },
  {
    id: 'resistance-band-neck-stretch',
    name: 'Resistance Band Neck Stretch',
    description: 'Dynamic stretch using resistance bands for controlled neck stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Attach a resistance band to a sturdy object at head height.',
      'Stand facing the anchor point with the band around your forehead.',
      'Gently pull your head back against the resistance.',
      'Hold for 15-30 seconds.',
      'You can also do side-to-side movements.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Neck'
  },
  {
    id: 'lying-neck-stretch',
    name: 'Lying Neck Stretch',
    description: 'Relaxing stretch performed while lying down to release neck tension.',
    benefits: ['Relaxing', 'Deep stretch', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your knees bent.',
      'Gently turn your head to the right and hold for 30 seconds.',
      'Return to center and turn to the left.',
      'You can also do gentle tilts while lying down.',
      'Breathe deeply and relax your neck muscles.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  },
  {
    id: 'wall-neck-stretch',
    name: 'Wall Neck Stretch',
    description: 'Wall-assisted stretch that provides support while stretching the neck.',
    benefits: ['Supported stretch', 'Good for balance', 'Consistent stretch', 'Safe for all levels'],
    instructions: [
      'Stand with your back against a wall.',
      'Place your hands behind your head for support.',
      'Gently press your head back against your hands.',
      'Hold for 15-30 seconds.',
      'You can also do side tilts against the wall.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Neck'
  }
];

const hipsVariations = [
  {
    id: 'butterfly-hip-stretch',
    name: 'Butterfly Hip Stretch',
    description: 'Classic seated stretch that opens the hips and stretches the inner thighs.',
    benefits: ['Opens hips', 'Stretches inner thighs', 'Improves flexibility', 'Good for all levels'],
    instructions: [
      'Sit on the floor with your back straight.',
      'Bring the soles of your feet together and let your knees fall out to the sides.',
      'Gently press your knees toward the floor.',
      'Hold for 30-60 seconds, breathing deeply.',
      'You can lean forward to increase the stretch.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hips'
  },
  {
    id: 'pigeon-hip-stretch',
    name: 'Pigeon Hip Stretch',
    description: 'Yoga-inspired stretch that targets the hips and outer thighs.',
    benefits: ['Opens hips', 'Stretches glutes', 'Improves flexibility', 'Great for runners'],
    instructions: [
      'Start in a kneeling position.',
      'Bring your right leg forward and place your right foot on the floor.',
      'Slide your left leg back and lower your left knee to the floor.',
      'Gently lower your hips toward the floor.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Hips'
  },
  {
    id: 'figure-four-hip-stretch',
    name: 'Figure Four Hip Stretch',
    description: 'Effective stretch that targets the hips, glutes, and outer thighs.',
    benefits: ['Stretches glutes', 'Opens hips', 'Relieves tension', 'Good for lower back'],
    instructions: [
      'Lie on your back with your knees bent and feet flat on the floor.',
      'Cross your right ankle over your left knee.',
      'Grasp your left thigh and pull it toward your chest.',
      'Feel the stretch in your right hip and glute.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hips'
  },
  {
    id: 'seated-hip-stretch',
    name: 'Seated Hip Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces hip tension'],
    instructions: [
      'Sit on a chair with your feet flat on the floor.',
      'Cross your right ankle over your left knee.',
      'Gently press down on your right knee.',
      'Hold for 30 seconds and switch sides.',
      'Keep your back straight throughout the stretch.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hips'
  },
  {
    id: 'dynamic-hip-stretch',
    name: 'Dynamic Hip Stretch',
    description: 'Moving stretch that warms up the hips and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Place your hands on your hips.',
      'Slowly rotate your hips in a circular motion.',
      'Move clockwise for 10 rotations, then counterclockwise.',
      'Keep the movements slow and controlled.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hips'
  },
  {
    id: 'foam-roller-hip-release',
    name: 'Foam Roller Hip Release',
    description: 'Self-massage technique using a foam roller to release hip tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on a foam roller with your hands behind you for support.',
      'Cross your right ankle over your left knee.',
      'Roll slowly from your hip to your thigh.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other side.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Hips'
  },
  {
    id: 'resistance-band-hip-stretch',
    name: 'Resistance Band Hip Stretch',
    description: 'Dynamic stretch using resistance bands for controlled hip stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Attach a resistance band to a sturdy object.',
      'Loop the band around your right ankle.',
      'Stand sideways to the anchor point.',
      'Gently move your leg away from the anchor point.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Hips'
  },
  {
    id: 'lying-hip-stretch',
    name: 'Lying Hip Stretch',
    description: 'Relaxing stretch performed while lying down to open the hips.',
    benefits: ['Relaxing', 'Deep stretch', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your knees bent and feet flat on the floor.',
      'Cross your right ankle over your left knee.',
      'Grasp your left thigh and pull it toward your chest.',
      'Feel the stretch in your right hip.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hips'
  },
  {
    id: 'wall-hip-stretch',
    name: 'Wall Hip Stretch',
    description: 'Wall-assisted stretch that provides support while stretching the hips.',
    benefits: ['Supported stretch', 'Good for balance', 'Consistent stretch', 'Safe for all levels'],
    instructions: [
      'Lie on your back near a wall.',
      'Place your legs up the wall, keeping them straight.',
      'Let your arms rest at your sides.',
      'Hold for 30-60 seconds, feeling the stretch in your hips.',
      'This is great for circulation and relaxation.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Hips'
  },
  {
    id: 'kneeling-hip-stretch',
    name: 'Kneeling Hip Stretch',
    description: 'Advanced kneeling stretch that provides a deep hip opening.',
    benefits: ['Deep hip stretch', 'Opens hip flexors', 'Improves flexibility', 'Great for tight hips'],
    instructions: [
      'Start in a kneeling position.',
      'Step your right foot forward into a lunge position.',
      'Lower your left knee to the floor.',
      'Gently press your hips forward.',
      'Hold for 30 seconds and switch sides.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Advanced' as const,
    category: 'Hips'
  }
];

const anklesVariations = [
  {
    id: 'ankle-circles',
    name: 'Ankle Circles',
    description: 'Simple rotating stretch that improves ankle mobility and range of motion.',
    benefits: ['Improves ankle mobility', 'Reduces stiffness', 'Enhances range of motion', 'Great for warm-up'],
    instructions: [
      'Sit or stand with your back straight.',
      'Lift your right foot off the ground.',
      'Slowly rotate your ankle in a circular motion.',
      'Make 10 circles clockwise, then 10 counterclockwise.',
      'Repeat with your left ankle.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  },
  {
    id: 'ankle-flexion-stretch',
    name: 'Ankle Flexion Stretch',
    description: 'Stretch that targets the calf muscles and improves ankle flexibility.',
    benefits: ['Stretches calves', 'Improves ankle flexibility', 'Reduces stiffness', 'Good for all levels'],
    instructions: [
      'Sit on the floor with your legs extended in front.',
      'Point your toes away from your body as far as possible.',
      'Hold for 15-30 seconds, feeling the stretch in your calves.',
      'Then flex your toes back toward your body.',
      'Hold for 15-30 seconds and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  },
  {
    id: 'seated-ankle-stretch',
    name: 'Seated Ankle Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces ankle tension'],
    instructions: [
      'Sit in a chair with your feet flat on the floor.',
      'Lift your right foot and rotate your ankle in circles.',
      'Then point and flex your toes.',
      'Repeat with your left foot.',
      'Do this for 1-2 minutes on each foot.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  },
  {
    id: 'wall-ankle-stretch',
    name: 'Wall Ankle Stretch',
    description: 'Wall-assisted stretch that provides support while stretching the ankles.',
    benefits: ['Supported stretch', 'Good for balance', 'Consistent stretch', 'Safe for all levels'],
    instructions: [
      'Stand facing a wall with your hands on the wall for support.',
      'Step back with your right foot, keeping your heel on the ground.',
      'Gently lean forward to feel the stretch in your calf and ankle.',
      'Hold for 30 seconds and switch legs.',
      'Keep your back leg straight throughout the stretch.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  },
  {
    id: 'towel-ankle-stretch',
    name: 'Towel Ankle Stretch',
    description: 'Portable stretch using a towel that provides controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Sit on the floor with your legs extended.',
      'Loop a towel around the ball of your right foot.',
      'Gently pull the towel toward you, flexing your ankle.',
      'Hold for 30 seconds and switch feet.',
      'You can adjust the towel tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  },
  {
    id: 'dynamic-ankle-stretch',
    name: 'Dynamic Ankle Stretch',
    description: 'Moving stretch that warms up the ankles and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Lift your heels off the ground and hold for 5 seconds.',
      'Then lower your heels and lift your toes.',
      'Continue alternating for 30-60 seconds.',
      'You can also do ankle circles while standing.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  },
  {
    id: 'foam-roller-ankle-release',
    name: 'Foam Roller Ankle Release',
    description: 'Self-massage technique using a foam roller to release ankle tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on the floor with a foam roller under your right calf.',
      'Roll slowly from your knee to your ankle.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other leg.',
      'You can also roll the bottom of your foot.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Ankles'
  },
  {
    id: 'resistance-band-ankle-stretch',
    name: 'Resistance Band Ankle Stretch',
    description: 'Dynamic stretch using resistance bands for controlled ankle stretching.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Sit on the floor with your legs extended.',
      'Loop a resistance band around the ball of your right foot.',
      'Hold the band with both hands and gently pull.',
      'Point and flex your foot against the resistance.',
      'Hold each position for 15-30 seconds and switch feet.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Ankles'
  },
  {
    id: 'lying-ankle-stretch',
    name: 'Lying Ankle Stretch',
    description: 'Relaxing stretch performed while lying down to stretch the ankles.',
    benefits: ['Relaxing', 'Deep stretch', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your legs extended.',
      'Point your toes away from your body.',
      'Hold for 15-30 seconds.',
      'Then flex your toes back toward your body.',
      'Hold for 15-30 seconds and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  },
  {
    id: 'standing-ankle-stretch',
    name: 'Standing Ankle Stretch',
    description: 'Standing stretch that improves ankle strength and flexibility.',
    benefits: ['Improves ankle strength', 'Enhances balance', 'Good for all levels', 'Reduces stiffness'],
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Slowly lift your heels off the ground.',
      'Hold for 5-10 seconds, then lower.',
      'Then lift your toes off the ground.',
      'Repeat 10-15 times.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Ankles'
  }
];

const wristsVariations = [
  {
    id: 'wrist-circles',
    name: 'Wrist Circles',
    description: 'Simple rotating stretch that improves wrist mobility and range of motion.',
    benefits: ['Improves wrist mobility', 'Reduces stiffness', 'Enhances range of motion', 'Great for warm-up'],
    instructions: [
      'Sit or stand with your arms relaxed at your sides.',
      'Extend your arms in front of you at shoulder height.',
      'Make fists with both hands.',
      'Slowly rotate your wrists in circular motions.',
      'Do 10 circles clockwise, then 10 counterclockwise.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Wrists'
  },
  {
    id: 'wrist-flexion-stretch',
    name: 'Wrist Flexion Stretch',
    description: 'Stretch that targets the forearm flexors and improves wrist flexibility.',
    benefits: ['Stretches forearm flexors', 'Improves wrist flexibility', 'Reduces stiffness', 'Good for all levels'],
    instructions: [
      'Extend your right arm in front of you with your palm facing up.',
      'Use your left hand to gently pull your right fingers back toward your forearm.',
      'Hold for 15-30 seconds, feeling the stretch in your forearm.',
      'Then point your fingers down and pull them toward your forearm.',
      'Hold for 15-30 seconds and repeat with your left wrist.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Wrists'
  },
  {
    id: 'seated-wrist-stretch',
    name: 'Seated Wrist Stretch',
    description: 'Gentle seated stretch perfect for office workers or those with limited mobility.',
    benefits: ['Can be done anywhere', 'Gentle on joints', 'Good for beginners', 'Reduces wrist tension'],
    instructions: [
      'Sit in a chair with your feet flat on the floor.',
      'Place your right hand on your right thigh, palm up.',
      'Use your left hand to gently press down on your right fingers.',
      'Hold for 15-30 seconds and switch hands.',
      'Do this for 1-2 minutes on each wrist.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Wrists'
  },
  {
    id: 'wall-wrist-stretch',
    name: 'Wall Wrist Stretch',
    description: 'Wall-assisted stretch that provides support while stretching the wrists.',
    benefits: ['Supported stretch', 'Good for balance', 'Consistent stretch', 'Safe for all levels'],
    instructions: [
      'Stand facing a wall with your hands on the wall at shoulder height.',
      'Place your palms flat against the wall, fingers pointing up.',
      'Gently lean forward to feel the stretch in your wrists and forearms.',
      'Hold for 30 seconds, then rotate your hands so fingers point down.',
      'Hold for another 30 seconds.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Wrists'
  },
  {
    id: 'towel-wrist-stretch',
    name: 'Towel Wrist Stretch',
    description: 'Portable stretch using a towel that provides controlled resistance.',
    benefits: ['Portable', 'Controlled stretch', 'Can adjust intensity', 'Good for travel'],
    instructions: [
      'Hold a towel with both hands in front of you.',
      'Extend your arms straight out.',
      'Gently pull the towel apart, feeling the stretch in your wrists.',
      'Hold for 30 seconds and release.',
      'You can adjust the towel tension as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Wrists'
  },
  {
    id: 'dynamic-wrist-stretch',
    name: 'Dynamic Wrist Stretch',
    description: 'Moving stretch that warms up the wrists and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Enhances performance'],
    instructions: [
      'Stand with your arms at your sides.',
      'Make fists and rotate your wrists in circles.',
      'Do 10 circles forward, then 10 backward.',
      'Then open and close your fists rapidly.',
      'Continue for 30-60 seconds.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Wrists'
  },
  {
    id: 'foam-roller-wrist-release',
    name: 'Foam Roller Wrist Release',
    description: 'Self-massage technique using a foam roller to release wrist tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Lie face down with a foam roller under your right wrist.',
      'Position the roller from your wrist to your hand.',
      'Roll slowly from your wrist to your fingers.',
      'Pause on tender spots for 30 seconds.',
      'Repeat with your left wrist.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Wrists'
  }
];

const feetVariations = [
  {
    id: 'toe-touch-stretch',
    name: 'Toe Touch Stretch',
    description: 'A classic stretch that targets the toes and the bottom of the feet.',
    benefits: ['Improves toe flexibility', 'Stretches plantar fascia', 'Reduces foot tension', 'Good for all levels'],
    instructions: [
      'Sit on the floor with your legs extended.',
      'Reach forward and grab your toes with your hands.',
      'Gently pull your toes back toward your body.',
      'Hold for 20-30 seconds.',
      'Release and repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  },
  {
    id: 'seated-foot-stretch',
    name: 'Seated Foot Stretch',
    description: 'Gentle stretch for the top and bottom of the feet, perfect for office workers.',
    benefits: ['Gentle on joints', 'Can be done anywhere', 'Reduces foot fatigue', 'Improves flexibility'],
    instructions: [
      'Sit in a chair with your feet flat on the floor.',
      'Lift your right foot and place it on your left knee.',
      'Use your hand to gently pull your toes back.',
      'Hold for 20-30 seconds, then switch feet.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  },
  {
    id: 'standing-calf-foot-stretch',
    name: 'Standing Calf & Foot Stretch',
    description: 'Targets both the calves and the bottom of the feet.',
    benefits: ['Stretches calves and feet', 'Improves ankle mobility', 'Reduces tightness', 'Great for runners'],
    instructions: [
      'Stand facing a wall with your hands on the wall for support.',
      'Step back with your right foot, keeping your heel on the ground.',
      'Lean forward to stretch your calf and foot.',
      'Hold for 30 seconds, then switch sides.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  },
  {
    id: 'toe-spread-stretch',
    name: 'Toe Spread Stretch',
    description: 'Improves toe mobility and foot strength by spreading the toes apart.',
    benefits: ['Improves toe mobility', 'Strengthens foot muscles', 'Reduces cramping', 'Good for balance'],
    instructions: [
      'Sit comfortably and place your foot on your opposite knee.',
      'Use your fingers to gently spread your toes apart.',
      'Hold for 10-15 seconds, then relax.',
      'Repeat 3-5 times per foot.',
      'Switch feet and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  },
  {
    id: 'plantar-fascia-stretch',
    name: 'Plantar Fascia Stretch',
    description: 'Targets the plantar fascia, the thick band of tissue on the bottom of the foot.',
    benefits: ['Reduces plantar fasciitis pain', 'Improves arch flexibility', 'Relieves tension', 'Good for recovery'],
    instructions: [
      'Sit with your right ankle resting on your left knee.',
      'Hold your toes and gently pull them back toward your shin.',
      'Massage the arch of your foot with your thumb.',
      'Hold for 20-30 seconds, then switch feet.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  },
  {
    id: 'towel-foot-stretch',
    name: 'Towel Foot Stretch',
    description: 'Uses a towel to provide a deep stretch for the bottom of the foot.',
    benefits: ['Deep stretch', 'Portable', 'Adjustable intensity', 'Good for all levels'],
    instructions: [
      'Sit on the floor with your legs extended.',
      'Loop a towel around the ball of your right foot.',
      'Gently pull the towel toward you, flexing your foot.',
      'Hold for 20-30 seconds, then switch feet.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  },
  {
    id: 'dynamic-foot-stretch',
    name: 'Dynamic Foot Stretch',
    description: 'A moving stretch that warms up the feet and improves mobility.',
    benefits: ['Warms up muscles', 'Improves mobility', 'Great for pre-workout', 'Reduces stiffness'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Rise up onto your toes and hold for 3 seconds.',
      'Lower your heels and lift your toes off the ground.',
      'Repeat this motion for 30-60 seconds.',
      'You can also wiggle your toes for added mobility.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  },
  {
    id: 'foam-roller-foot-release',
    name: 'Foam Roller Foot Release',
    description: 'Self-massage technique using a foam roller to release foot tightness.',
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Reduces soreness', 'Enhances recovery'],
    instructions: [
      'Sit on a chair and place a foam roller under your foot.',
      'Roll your foot slowly back and forth over the roller.',
      'Pause on tender spots for 30 seconds.',
      'Repeat on the other foot.',
      'You can also use a tennis ball for this stretch.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Feet'
  },
  {
    id: 'resistance-band-foot-stretch',
    name: 'Resistance Band Foot Stretch',
    description: 'Uses a resistance band for controlled stretching of the foot and toes.',
    benefits: ['Controlled resistance', 'Builds strength', 'Improves range of motion', 'Great for rehabilitation'],
    instructions: [
      'Sit on the floor with your legs extended.',
      'Loop a resistance band around the ball of your right foot.',
      'Hold the band with both hands and gently pull.',
      'Point and flex your foot against the resistance.',
      'Hold each position for 15-30 seconds, then switch feet.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Feet'
  },
  {
    id: 'standing-foot-stretch',
    name: 'Standing Foot Stretch',
    description: 'Standing stretch that improves foot strength and flexibility.',
    benefits: ['Improves foot strength', 'Enhances balance', 'Good for all levels', 'Reduces stiffness'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Lift your right foot and place the top of your toes on the ground behind you.',
      'Gently press down to stretch the top of your foot.',
      'Hold for 15-30 seconds, then switch feet.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Feet'
  }
];

const fullBodyVariations = [
  {
    id: 'standing-forward-bend',
    name: 'Standing Forward Bend',
    description: 'A classic yoga stretch that targets the entire posterior chain from head to toe.',
    benefits: ['Stretches back, hamstrings, and calves', 'Relieves tension', 'Improves flexibility', 'Calms the mind'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Hinge at your hips and fold forward, reaching for your toes.',
      'Let your head and neck relax.',
      'Hold for 30 seconds, breathing deeply.',
      'Slowly rise back up to standing.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  },
  {
    id: 'downward-dog',
    name: 'Downward Dog',
    description: 'A yoga pose that stretches the entire body, especially the back, shoulders, and legs.',
    benefits: ['Full body stretch', 'Improves flexibility', 'Strengthens shoulders', 'Calms the mind'],
    instructions: [
      'Start on your hands and knees.',
      'Lift your hips up and back, straightening your legs and arms.',
      'Press your heels toward the floor.',
      'Hold for 30 seconds, breathing deeply.',
      'Return to starting position.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    description: 'A gentle flow between two poses that warms up the spine and stretches the whole body.',
    benefits: ['Mobilizes spine', 'Stretches back and chest', 'Improves posture', 'Relieves tension'],
    instructions: [
      'Start on your hands and knees.',
      'Inhale, arch your back and look up (Cow).',
      'Exhale, round your back and tuck your chin (Cat).',
      'Repeat for 30-60 seconds.',
      'Move slowly and with your breath.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  },
  {
    id: 'childs-pose',
    name: "Child's Pose",
    description: 'A restorative yoga pose that stretches the back, hips, and shoulders.',
    benefits: ['Relieves back and hip tension', 'Calms the mind', 'Improves flexibility', 'Gentle on joints'],
    instructions: [
      'Kneel on the floor and sit back on your heels.',
      'Fold forward, extending your arms in front of you.',
      'Rest your forehead on the mat.',
      'Hold for 30-60 seconds, breathing deeply.',
      'Return to upright position.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  },
  {
    id: 'cobra-stretch',
    name: 'Cobra Stretch',
    description: 'A yoga pose that stretches the chest, abs, and spine.',
    benefits: ['Stretches chest and abs', 'Improves spinal flexibility', 'Opens shoulders', 'Boosts energy'],
    instructions: [
      'Lie face down with your hands under your shoulders.',
      'Press into your hands and lift your chest off the ground.',
      'Keep your elbows close to your body.',
      'Hold for 20-30 seconds.',
      'Lower back down and repeat.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  },
  {
    id: 'spinal-twist',
    name: 'Spinal Twist',
    description: 'A seated stretch that targets the spine, back, and hips.',
    benefits: ['Stretches spine and hips', 'Improves digestion', 'Relieves tension', 'Enhances flexibility'],
    instructions: [
      'Sit on the floor with your legs extended.',
      'Bend your right knee and cross it over your left leg.',
      'Twist your torso to the right, placing your left elbow outside your right knee.',
      'Hold for 20-30 seconds, then switch sides.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  },
  {
    id: 'lunge-with-reach',
    name: 'Lunge with Reach',
    description: 'A dynamic stretch that targets the hips, legs, and upper body.',
    benefits: ['Stretches hips and legs', 'Opens chest', 'Improves balance', 'Full body activation'],
    instructions: [
      'Step your right foot forward into a lunge.',
      'Reach your arms overhead and slightly back.',
      'Hold for 20-30 seconds, then switch sides.',
      'Keep your core engaged.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Full Body'
  },
  {
    id: 'side-bend-stretch',
    name: 'Side Bend Stretch',
    description: 'A standing stretch that targets the sides of the body, arms, and hips.',
    benefits: ['Stretches obliques and lats', 'Improves flexibility', 'Opens rib cage', 'Relieves tension'],
    instructions: [
      'Stand with your feet hip-width apart.',
      'Reach your right arm overhead and lean to the left.',
      'Hold for 20-30 seconds, then switch sides.',
      'Keep your hips facing forward.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  },
  {
    id: 'standing-quad-stretch-reach',
    name: 'Standing Quad Stretch with Reach',
    description: 'A balance challenge that stretches the quads, hip flexors, and upper body.',
    benefits: ['Stretches quads and hip flexors', 'Improves balance', 'Opens chest', 'Full body engagement'],
    instructions: [
      'Stand tall and grab your right ankle with your right hand.',
      'Reach your left arm overhead.',
      'Hold for 20-30 seconds, then switch sides.',
      'Keep your knees together.',
      'Repeat as needed.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Intermediate' as const,
    category: 'Full Body'
  },
  {
    id: 'supine-full-body-stretch',
    name: 'Supine Full Body Stretch',
    description: 'A relaxing stretch performed lying down that lengthens the entire body.',
    benefits: ['Lengthens body', 'Relieves tension', 'Good for recovery', 'Reduces stress'],
    instructions: [
      'Lie on your back with your arms extended overhead and legs straight.',
      'Stretch your arms and legs in opposite directions.',
      'Hold for 20-30 seconds, breathing deeply.',
      'Relax and repeat as needed.',
      'Great for morning or bedtime.'
    ],
    imageUrl: '/images/stretch-placeholder.jpg',
    difficulty: 'Beginner' as const,
    category: 'Full Body'
  }
];

// Placeholder stretch data for other categories
const stretchData = Object.fromEntries(
  categories.map(cat => [
    cat.id,
    cat.id === 'biceps'
      ? bicepsVariations[0]
      : cat.id === 'calves'
        ? calvesVariations[0]
        : cat.id === 'traps-mid-back'
          ? trapsMidBackVariations[0]
          : cat.id === 'lower-back'
            ? lowerBackVariations[0]
            : cat.id === 'abdominals'
              ? abdominalsVariations[0]
              : cat.id === 'forearms'
                ? forearmsVariations[0]
                : cat.id === 'glutes'
                  ? glutesVariations[0]
                  : cat.id === 'hamstrings'
                    ? hamstringsVariations[0]
                    : cat.id === 'lats'
                      ? latsVariations[0]
                      : cat.id === 'chest'
                        ? chestVariations[0]
                        : cat.id === 'shoulders'
                          ? shoulderVariations[0]
                          : cat.id === 'quads'
                            ? quadricepsVariations[0]
                            : cat.id === 'triceps'
                              ? tricepsVariations[0]
                              : cat.id === 'back'
                                ? backVariations[0]
                                : cat.id === 'legs'
                                  ? legsVariations[0]
                                  : cat.id === 'arms'
                                    ? armsVariations[0]
                                    : cat.id === 'neck'
                                      ? neckVariations[0]
                                      : cat.id === 'hips'
                                        ? hipsVariations[0]
                                        : cat.id === 'ankles'
                                          ? anklesVariations[0]
                                          : cat.id === 'wrists'
                                            ? wristsVariations[0]
                                            : cat.id === 'feet'
                                              ? feetVariations[0]
      : {
          id: cat.id,
          name: `${cat.name} Stretch`,
          description: `A comprehensive stretch for ${cat.name.toLowerCase()}.`,
          benefits: ['Improves flexibility', 'Reduces muscle tension', 'Enhances range of motion'],
          instructions: [
            'Start in a comfortable position.',
            'Gently stretch the target muscle group.',
            'Hold the position for 30 seconds.',
            'Breathe deeply and relax.',
            'Repeat as needed.'
          ],
          imageUrl: '/images/stretch-placeholder.jpg',
          difficulty: 'Beginner' as const,
          category: cat.name
        }
  ])
);

export default function StretchesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedBicepsVariation, setSelectedBicepsVariation] = useState<number | null>(null);
  const [selectedCalvesVariation, setSelectedCalvesVariation] = useState<number | null>(null);
  const [selectedTrapsMidBackVariation, setSelectedTrapsMidBackVariation] = useState<number | null>(null);
  const [selectedLowerBackVariation, setSelectedLowerBackVariation] = useState<number | null>(null);
  const [selectedAbdominalsVariation, setSelectedAbdominalsVariation] = useState<number | null>(null);
  const [selectedForearmsVariation, setSelectedForearmsVariation] = useState<number | null>(null);
  const [selectedGlutesVariation, setSelectedGlutesVariation] = useState<number | null>(null);
  const [selectedHamstringsVariation, setSelectedHamstringsVariation] = useState<number | null>(null);
  const [selectedLatsVariation, setSelectedLatsVariation] = useState<number | null>(null);
  const [selectedChestVariation, setSelectedChestVariation] = useState<number | null>(null);
  const [selectedShoulderVariation, setSelectedShoulderVariation] = useState<number | null>(null);
  const [selectedQuadricepsVariation, setSelectedQuadricepsVariation] = useState<number | null>(null);
  const [selectedTricepsVariation, setSelectedTricepsVariation] = useState<number | null>(null);
  const [selectedBackVariation, setSelectedBackVariation] = useState<number | null>(null);
  const [selectedLegsVariation, setSelectedLegsVariation] = useState<number | null>(null);
  const [selectedArmsVariation, setSelectedArmsVariation] = useState<number | null>(null);
  const [selectedNeckVariation, setSelectedNeckVariation] = useState<number | null>(null);
  const [selectedHipsVariation, setSelectedHipsVariation] = useState<number | null>(null);
  const [showHipsModal, setShowHipsModal] = useState(false);
  const [selectedAnklesStretch, setSelectedAnklesStretch] = useState<Stretch | null>(null);
  const [showAnklesModal, setShowAnklesModal] = useState(false);
  const [selectedWristsStretch, setSelectedWristsStretch] = useState<Stretch | null>(null);
  const [showWristsModal, setShowWristsModal] = useState(false);

  // Feet state
  const [selectedFeetStretch, setSelectedFeetStretch] = useState<Stretch | null>(null);
  const [showFeetModal, setShowFeetModal] = useState(false);

  // Full Body state
  const [selectedFullBodyStretch, setSelectedFullBodyStretch] = useState<Stretch | null>(null);
  const [showFullBodyModal, setShowFullBodyModal] = useState(false);

  // New state for uploaded images
  const [uploadedImages, setUploadedImages] = useState<{ [id: string]: string }>({});

  const handleOpen = (category: string) => {
    setSelected(category);
    setSelectedHamstringsVariation(null);
    setSelectedLatsVariation(null);
    setSelectedChestVariation(null);
    setSelectedShoulderVariation(null);
    setSelectedQuadricepsVariation(null);
    setSelectedTricepsVariation(null);
    setSelectedBackVariation(null);
    setSelectedLegsVariation(null);
    setSelectedArmsVariation(null);
    setSelectedNeckVariation(null);
    setSelectedHipsVariation(null);
    setShowAnklesModal(false);
    setShowWristsModal(false);
    setShowFeetModal(false);
    setShowFullBodyModal(false);
  };

  const handleBicepsCardClick = (idx: number) => {
    setSelectedBicepsVariation(idx);
  };

  const handleCalvesCardClick = (idx: number) => {
    setSelectedCalvesVariation(idx);
  };

  const handleTrapsMidBackCardClick = (idx: number) => {
    setSelectedTrapsMidBackVariation(idx);
  };

  const handleLowerBackCardClick = (idx: number) => {
    setSelectedLowerBackVariation(idx);
  };

  const handleAbdominalsCardClick = (idx: number) => {
    setSelectedAbdominalsVariation(idx);
  };

  const handleForearmsCardClick = (idx: number) => {
    setSelectedForearmsVariation(idx);
  };

  const handleGlutesCardClick = (idx: number) => {
    setSelectedGlutesVariation(idx);
  };

  const handleHamstringsCardClick = (index: number) => {
    setSelectedHamstringsVariation(index);
  };

  const handleLatsCardClick = (index: number) => {
    setSelectedLatsVariation(index);
  };

  const handleChestCardClick = (index: number) => {
    setSelectedChestVariation(index);
  };

  const handleShoulderCardClick = (index: number) => {
    setSelectedShoulderVariation(index);
  };

  const handleQuadricepsCardClick = (index: number) => {
    setSelectedQuadricepsVariation(index);
  };

  const handleTricepsCardClick = (index: number) => {
    setSelectedTricepsVariation(index);
  };

  const handleBackCardClick = (index: number) => {
    setSelectedBackVariation(index);
  };

  const handleLegsCardClick = (index: number) => {
    setSelectedLegsVariation(index);
  };

  const handleArmsCardClick = (index: number) => {
    setSelectedArmsVariation(index);
  };

  const handleNeckCardClick = (index: number) => {
    setSelectedNeckVariation(index);
  };

  const handleHipsCardClick = (index: number) => {
    setSelectedHipsVariation(index);
  };

  const handleBackToGrid = () => {
    setSelectedHamstringsVariation(null);
    setSelectedLatsVariation(null);
    setSelectedChestVariation(null);
    setSelectedShoulderVariation(null);
    setSelectedQuadricepsVariation(null);
    setSelectedTricepsVariation(null);
    setSelectedBackVariation(null);
    setSelectedLegsVariation(null);
    setSelectedArmsVariation(null);
    setSelectedNeckVariation(null);
    setSelectedHipsVariation(null);
  };

  const handleAnklesStretchClick = (stretch: Stretch) => {
    setSelectedAnklesStretch(stretch);
    setShowAnklesModal(true);
  };

  const handleWristsStretchClick = (stretch: Stretch) => {
    setSelectedWristsStretch(stretch);
    setShowWristsModal(true);
  };

  const handleFeetStretchClick = (stretch: Stretch) => {
    setSelectedFeetStretch(stretch);
    setShowFeetModal(true);
  };

  const handleFullBodyStretchClick = (stretch: Stretch) => {
    setSelectedFullBodyStretch(stretch);
    setShowFullBodyModal(true);
  };

  // Handler for image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, stretchId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => ({ ...prev, [stretchId]: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-[#111215] text-white">
      <h1 className="text-4xl font-bold mb-8">Stretches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((group) => (
          <button
            key={group.id}
            onClick={() => handleOpen(group.id)}
            className={`card bg-[#18191c] hover:shadow-xl hover:bg-[#23242a] transition-shadow transition-colors rounded-xl p-6 flex flex-col items-center cursor-pointer border border-transparent hover:border-blue-400 focus:outline-none ${group.color}`}
          >
            <span className="text-xl font-semibold mb-2 text-blue-300 group-hover:text-blue-400 transition-colors uppercase tracking-wide text-center">{group.name}</span>
            <span className="text-gray-400 text-sm text-center">View stretches for {group.name}</span>
          </button>
        ))}
      </div>
      {/* Modal for Biceps with variations grid or details */}
      {selected === 'biceps' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Biceps Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedBicepsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {bicepsVariations.map((variation, idx) => (
                  <div key={variation.id} className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400">
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img
                      src={uploadedImages[variation.id] || '/images/stretch-placeholder.jpg'}
                      alt="Stretch preview"
                      className="w-24 h-24 object-cover rounded mb-2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="mb-2 text-xs text-gray-400"
                      onChange={(e) => handleImageUpload(e, variation.id)}
                    />
                  <button
                    onClick={() => handleBicepsCardClick(idx)}
                      className="w-full px-2 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs mb-1"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Biceps Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={selectedBicepsVariation !== null && bicepsVariations[selectedBicepsVariation] ? bicepsVariations[selectedBicepsVariation] : null}
                  onBack={() => setSelectedBicepsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Calves with variations grid or details */}
      {selected === 'calves' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Calves Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedCalvesVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {calvesVariations.map((variation, idx) => (
                  <div key={variation.id} className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400">
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img
                      src={uploadedImages[variation.id] || '/images/stretch-placeholder.jpg'}
                      alt="Stretch preview"
                      className="w-24 h-24 object-cover rounded mb-2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="mb-2 text-xs text-gray-400"
                      onChange={(e) => handleImageUpload(e, variation.id)}
                    />
                    <button
                      onClick={() => handleCalvesCardClick(idx)}
                      className="w-full px-2 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs mb-1"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Calves Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={selectedCalvesVariation !== null && calvesVariations[selectedCalvesVariation] ? calvesVariations[selectedCalvesVariation] : null}
                  onBack={() => setSelectedCalvesVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Lower Back with variations grid or details */}
      {selected === 'lower-back' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Lower Back Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedLowerBackVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {lowerBackVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleLowerBackCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Lower Back Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={lowerBackVariations[selectedLowerBackVariation]}
                  onBack={() => setSelectedLowerBackVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Abdominals with variations grid or details */}
      {selected === 'abdominals' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Abdominals Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedAbdominalsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {abdominalsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleAbdominalsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Abdominals Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={abdominalsVariations[selectedAbdominalsVariation]}
                  onBack={() => setSelectedAbdominalsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Forearms with variations grid or details */}
      {selected === 'forearms' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Forearms Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedForearmsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {forearmsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleForearmsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Forearms Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={forearmsVariations[selectedForearmsVariation]}
                  onBack={() => setSelectedForearmsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Glutes with variations grid or details */}
      {selected === 'glutes' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Glutes Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedGlutesVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {glutesVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleGlutesCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Glutes Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={glutesVariations[selectedGlutesVariation]}
                  onBack={() => setSelectedGlutesVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Hamstrings with variations grid or details */}
      {selected === 'hamstrings' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Hamstrings Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedHamstringsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {hamstringsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleHamstringsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Hamstrings Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={hamstringsVariations[selectedHamstringsVariation]}
                  onBack={() => setSelectedHamstringsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Lats with variations grid or details */}
      {selected === 'lats' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Lats Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedLatsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {latsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleLatsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Lats Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={latsVariations[selectedLatsVariation]}
                  onBack={() => setSelectedLatsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Chest with variations grid or details */}
      {selected === 'chest' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Chest Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedChestVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {chestVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleChestCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Chest Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={chestVariations[selectedChestVariation]}
                  onBack={() => setSelectedChestVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Shoulders with variations grid or details */}
      {selected === 'shoulders' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Shoulders Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedShoulderVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {shoulderVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleShoulderCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Shoulders Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={shoulderVariations[selectedShoulderVariation]}
                  onBack={() => setSelectedShoulderVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Quadriceps with variations grid or details */}
      {selected === 'quads' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Quadriceps Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedQuadricepsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {quadricepsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleQuadricepsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Quadriceps Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={quadricepsVariations[selectedQuadricepsVariation]}
                  onBack={() => setSelectedQuadricepsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Triceps with variations grid or details */}
      {selected === 'triceps' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Triceps Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedTricepsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {tricepsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleTricepsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Triceps Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={tricepsVariations[selectedTricepsVariation]}
                  onBack={() => setSelectedTricepsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Back with variations grid or details */}
      {selected === 'back' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Back Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedBackVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {backVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleBackCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Back Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={backVariations[selectedBackVariation]}
                  onBack={() => setSelectedBackVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Legs with variations grid or details */}
      {selected === 'legs' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Legs Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedLegsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {legsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleLegsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Legs Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={legsVariations[selectedLegsVariation]}
                  onBack={() => setSelectedLegsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Arms with variations grid or details */}
      {selected === 'arms' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Arms Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedArmsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {armsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleArmsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Arms Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={armsVariations[selectedArmsVariation]}
                  onBack={() => setSelectedArmsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Neck with variations grid or details */}
      {selected === 'neck' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Neck Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedNeckVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {neckVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleNeckCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Neck Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={neckVariations[selectedNeckVariation]}
                  onBack={() => setSelectedNeckVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Hips with variations grid or details */}
      {selected === 'hips' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Hips Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedHipsVariation === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {hipsVariations.map((variation, idx) => (
                  <button
                    key={variation.id}
                    onClick={() => handleHipsCardClick(idx)}
                    className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                  >
                    <span className="font-semibold text-blue-200 mb-2 text-center">{variation.name}</span>
                    <img src={variation.imageUrl} alt={variation.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <span className="text-xs text-gray-400 text-center">Click to view details</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBackToGrid}
                  className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
                >
                  ← Back to all Hips Stretches
                </button>
                <StretchModal
                  isOpen={true}
                  onClose={() => setSelected(null)}
                  pose={hipsVariations[selectedHipsVariation]}
                  onBack={() => setSelectedHipsVariation(null)}
                  mode="stretch"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Modal for Ankles with variations grid or details */}
      {selected === 'ankles' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Ankles Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {anklesVariations.map((stretch) => (
                <button
                  key={stretch.id}
                  onClick={() => handleAnklesStretchClick(stretch)}
                  className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                >
                  <span className="font-semibold text-blue-200 mb-2 text-center">{stretch.name}</span>
                  <img src={stretch.imageUrl} alt={stretch.name} className="w-24 h-24 object-cover rounded mb-2" />
                  <span className="text-xs text-gray-400 text-center">Click to view details</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showAnklesModal && selectedAnklesStretch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <button
              onClick={() => setShowAnklesModal(false)}
              className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
            >
              ← Back to all Ankles Stretches
            </button>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedAnklesStretch.name}</h2>
              <button
                onClick={() => setShowAnklesModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <StretchModal
              isOpen={true}
              onClose={() => setShowAnklesModal(false)}
              pose={selectedAnklesStretch}
              onBack={() => setShowAnklesModal(false)}
              mode="stretch"
            />
          </div>
        </div>
      )}
      {/* Modal for Wrists with variations grid or details */}
      {selected === 'wrists' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Wrists Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {wristsVariations.map((stretch) => (
                <button
                  key={stretch.id}
                  onClick={() => handleWristsStretchClick(stretch)}
                  className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                >
                  <span className="font-semibold text-blue-200 mb-2 text-center">{stretch.name}</span>
                  <img src={stretch.imageUrl} alt={stretch.name} className="w-24 h-24 object-cover rounded mb-2" />
                  <span className="text-xs text-gray-400 text-center">Click to view details</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showWristsModal && selectedWristsStretch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <button
              onClick={() => setShowWristsModal(false)}
              className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
            >
              ← Back to all Wrists Stretches
            </button>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedWristsStretch.name}</h2>
              <button
                onClick={() => setShowWristsModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <StretchModal
              isOpen={true}
              onClose={() => setShowWristsModal(false)}
              pose={selectedWristsStretch}
              onBack={() => setShowWristsModal(false)}
              mode="stretch"
            />
          </div>
        </div>
      )}
      {/* Modal for Full Body with variations grid or details */}
      {selected === 'full-body' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Full Body Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {fullBodyVariations.map((stretch) => (
                <button
                  key={stretch.id}
                  onClick={() => handleFullBodyStretchClick(stretch)}
                  className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                >
                  <span className="font-semibold text-blue-200 mb-2 text-center">{stretch.name}</span>
                  <img src={stretch.imageUrl} alt={stretch.name} className="w-24 h-24 object-cover rounded mb-2" />
                  <span className="text-xs text-gray-400 text-center">Click to view details</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showFullBodyModal && selectedFullBodyStretch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <button
              onClick={() => setShowFullBodyModal(false)}
              className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
            >
              ← Back to all Full Body Stretches
            </button>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedFullBodyStretch.name}</h2>
              <button
                onClick={() => setShowFullBodyModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <StretchModal
              isOpen={true}
              onClose={() => setShowFullBodyModal(false)}
              pose={selectedFullBodyStretch}
              onBack={() => setShowFullBodyModal(false)}
              mode="stretch"
            />
          </div>
        </div>
      )}
      {/* Modal for other categories */}
      {selected && selected !== 'biceps' && selected !== 'calves' && selected !== 'traps-mid-back' && selected !== 'lower-back' && selected !== 'abdominals' && selected !== 'forearms' && selected !== 'glutes' && selected !== 'hamstrings' && selected !== 'lats' && selected !== 'chest' && selected !== 'shoulders' && selected !== 'quads' && selected !== 'triceps' && selected !== 'back' && selected !== 'legs' && selected !== 'arms' && selected !== 'neck' && selected !== 'hips' && selected !== 'ankles' && selected !== 'wrists' && selected !== 'feet' && selected !== 'full-body' && (
        <StretchModal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          pose={selected ? stretchData[selected] : null}
          mode="stretch"
        />
      )}
      {/* Modal for Feet with variations grid or details */}
      {selected === 'feet' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Feet Stretches</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {feetVariations.map((stretch) => (
                <button
                  key={stretch.id}
                  onClick={() => handleFeetStretchClick(stretch)}
                  className="rounded-lg p-4 bg-[#23242a] hover:bg-blue-900 border transition-colors flex flex-col items-center border-transparent hover:border-blue-400"
                >
                  <span className="font-semibold text-blue-200 mb-2 text-center">{stretch.name}</span>
                  <img src={stretch.imageUrl} alt={stretch.name} className="w-24 h-24 object-cover rounded mb-2" />
                  <span className="text-xs text-gray-400 text-center">Click to view details</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showFeetModal && selectedFeetStretch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <button
              onClick={() => setShowFeetModal(false)}
              className="mb-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-colors"
            >
              ← Back to all Feet Stretches
            </button>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedFeetStretch.name}</h2>
              <button
                onClick={() => setShowFeetModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <StretchModal
              isOpen={true}
              onClose={() => setShowFeetModal(false)}
              pose={selectedFeetStretch}
              onBack={() => setShowFeetModal(false)}
              mode="stretch"
            />
          </div>
        </div>
      )}
    </main>
  );
} 