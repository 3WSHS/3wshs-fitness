export interface YogaPose {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  instructions: string[];
  imageUrl?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export const yogaPoses: YogaPose[] = [
  {
    id: 'corpse-pose',
    name: 'Corpse Pose (Savasana)',
    description: 'A deeply relaxing pose that allows the body to fully rest and recover.',
    benefits: [
      'Reduces stress and anxiety',
      'Lowers blood pressure',
      'Improves sleep quality',
      'Helps release tension in biceps and shoulders',
      'Promotes mental clarity'
    ],
    instructions: [
      'Lie flat on your back',
      'Allow your arms to rest at your sides, palms facing up',
      'Let your legs fall naturally apart',
      'Close your eyes and focus on your breath',
      'Stay in the pose for 5-10 minutes'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'crow-pose',
    name: 'Crow Pose (Bakasana)',
    description: 'An arm-balancing pose that builds strength in the biceps and core.',
    benefits: [
      'Strengthens biceps and forearms',
      'Improves balance and coordination',
      'Builds core strength',
      'Enhances focus and concentration',
      'Develops wrist strength'
    ],
    instructions: [
      'Start in a squat position',
      'Place hands shoulder-width apart on the floor',
      'Bend elbows and place knees on upper arms',
      'Shift weight forward onto hands',
      'Lift feet off the ground and balance'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'downward-dog',
    name: 'Downward-Facing Dog (Adho Mukha Svanasana)',
    description: 'A foundational pose that stretches and strengthens the entire body.',
    benefits: [
      'Strengthens biceps and shoulders',
      'Stretches hamstrings and calves',
      'Relieves back pain',
      'Improves posture',
      'Calms the mind'
    ],
    instructions: [
      'Start on your hands and knees',
      'Lift your hips up and back',
      'Straighten your legs',
      'Press your heels toward the floor',
      'Keep your head between your arms'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'downward-dog-fingers-feet',
    name: 'Downward Dog With Fingers Facing Feet',
    description: 'A variation of downward dog that specifically targets the biceps.',
    benefits: [
      'Intensifies bicep stretch',
      'Improves shoulder flexibility',
      'Strengthens upper arms',
      'Enhances wrist mobility',
      'Deepens the stretch in the back'
    ],
    instructions: [
      'Start in downward dog',
      'Rotate hands so fingers point toward feet',
      'Keep arms straight',
      'Press through the palms',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'scorpion-twist',
    name: 'Scorpion Twist Pose',
    description: 'An advanced pose that combines strength and flexibility.',
    benefits: [
      'Strengthens biceps and shoulders',
      'Improves spinal flexibility',
      'Builds core strength',
      'Enhances balance',
      'Develops upper body control'
    ],
    instructions: [
      'Start in downward dog',
      'Lift one leg up toward the ceiling',
      'Bend the lifted leg at the knee',
      'Twist the torso to bring the foot toward the opposite shoulder',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Advanced',
    category: 'Biceps'
  },
  {
    id: 'seated-arm-stretch',
    name: 'Seated Arm Stretch',
    description: 'A gentle pose that stretches the biceps and shoulders.',
    benefits: [
      'Stretches biceps and shoulders',
      'Improves posture',
      'Relieves upper body tension',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit in a comfortable cross-legged position',
      'Extend arms behind your back',
      'Interlace fingers and straighten arms',
      'Lift arms up as high as comfortable',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'warrior-1',
    name: 'Warrior I',
    description: 'A powerful standing pose that builds strength and stability.',
    benefits: [
      'Strengthens legs and core',
      'Opens hips and chest',
      'Improves balance',
      'Builds focus and concentration'
    ],
    instructions: [
      'Start in mountain pose',
      'Step one foot back',
      'Bend front knee to 90 degrees',
      'Raise arms overhead',
      'Square hips to the front'
    ],
    difficulty: 'Beginner',
    category: 'Quads'
  },
  {
    id: 'plank',
    name: 'Plank Pose',
    description: 'A core-strengthening pose that builds full-body stability.',
    benefits: [
      'Strengthens core muscles',
      'Improves posture',
      'Builds arm and shoulder strength',
      'Enhances balance'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage core muscles',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'reverse-tabletop',
    name: 'Reverse Tabletop Pose',
    description: 'A pose that strengthens the biceps, shoulders, and core while opening the chest.',
    benefits: [
      'Strengthens biceps and shoulders',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Keep arms straight and squeeze shoulder blades together',
      'Hold for 5-10 breaths',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'upward-plank',
    name: 'Upward Plank Pose (Purvottanasana)',
    description: 'A challenging pose that targets the biceps, triceps, and entire front body.',
    benefits: [
      'Strengthens biceps, triceps, and shoulders',
      'Stretches chest and front ankles',
      'Improves arm and wrist strength',
      'Builds core stability',
      'Enhances overall endurance'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips, fingers pointing toward feet',
      'Press into hands and feet to lift hips and torso upward',
      'Keep legs straight and point toes',
      'Engage biceps to keep arms strong',
      'Hold for 5-10 breaths, then lower down'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'dolphin-pose',
    name: 'Dolphin Pose',
    description: 'A forearm-based inversion that builds biceps and shoulder strength.',
    benefits: [
      'Strengthens biceps and shoulders',
      'Improves upper body stability',
      'Stretches hamstrings and calves',
      'Prepares for more advanced inversions',
      'Relieves tension in the neck and back'
    ],
    instructions: [
      'Start on hands and knees, lower forearms to the mat',
      'Tuck toes and lift hips up and back',
      'Keep forearms parallel and press down through elbows',
      'Engage biceps to support the pose',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'side-plank-bicep',
    name: 'Side Plank with Bicep Curl',
    description: 'A dynamic variation of side plank that incorporates a bicep curl for added arm strength.',
    benefits: [
      'Strengthens biceps and core',
      'Improves balance and stability',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Hold a light dumbbell or use bodyweight for left arm',
      'Curl left arm up toward shoulder, keeping elbow stable',
      'Lower arm and repeat for several reps',
      'Switch sides and repeat'
    ],
    difficulty: 'Advanced',
    category: 'Biceps'
  },
  {
    id: 'reverse-prayer-bicep',
    name: 'Reverse Prayer Pose (Bicep Focus)',
    description: 'A standing pose that deeply stretches the biceps and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Deeply stretches biceps and forearms',
      'Opens chest and shoulders',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'eagle-arms-bicep',
    name: 'Eagle Arms (Bicep Emphasis)',
    description: 'A seated or standing pose that wraps the arms to stretch and activate the biceps and shoulders.',
    benefits: [
      'Stretches biceps and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms, bringing palms to touch',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'thread-the-needle-bicep',
    name: 'Thread the Needle (Bicep Stretch)',
    description: 'A gentle twist that stretches the biceps, shoulders, and upper back.',
    benefits: [
      'Stretches biceps and shoulders',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Press left hand into the mat for a deeper stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'puppy-pose-bicep',
    name: 'Puppy Pose (Bicep Focus)',
    description: 'A heart-opening pose that stretches the biceps, chest, and shoulders.',
    benefits: [
      'Stretches biceps and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Rotate arms so palms face up for deeper bicep stretch',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'bow-pose-bicep',
    name: 'Bow Pose (Bicep Engagement)',
    description: 'A backbend that actively engages the biceps as you pull your feet toward your head.',
    benefits: [
      'Strengthens biceps and back',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach',
      'Bend knees and reach back to grab ankles',
      'Inhale and lift chest and thighs off the mat',
      'Pull feet toward head, engaging biceps',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'locust-pose-bicep',
    name: 'Locust Pose (Bicep Variation)',
    description: 'A prone pose that strengthens the biceps by interlacing the hands and lifting the arms.',
    benefits: [
      'Strengthens biceps and upper back',
      'Improves posture',
      'Opens chest',
      'Enhances arm endurance',
      'Reduces fatigue'
    ],
    instructions: [
      'Lie on your stomach, arms at sides',
      'Interlace fingers behind back',
      'Inhale and lift chest, arms, and legs off the mat',
      'Squeeze shoulder blades and engage biceps',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'camel-pose-bicep',
    name: 'Camel Pose (Bicep Focus)',
    description: 'A deep backbend that stretches the biceps as you reach for your heels.',
    benefits: [
      'Stretches biceps and chest',
      'Opens front body',
      'Improves spinal flexibility',
      'Boosts energy',
      'Enhances arm mobility'
    ],
    instructions: [
      'Kneel with knees hip-width apart',
      'Place hands on lower back, fingers pointing down',
      'Lean back and reach hands for heels',
      'Press hips forward and lift chest',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Advanced',
    category: 'Biceps'
  },
  {
    id: 'half-frog-bicep',
    name: 'Half Frog Pose (Bicep Engagement)',
    description: 'A prone quad stretch that also engages the biceps as you pull the foot toward the body.',
    benefits: [
      'Engages biceps and shoulders',
      'Stretches quads and hip flexors',
      'Improves arm strength',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Lie on your stomach',
      'Bend right knee and reach right hand back to grab foot',
      'Pull foot toward glute, engaging biceps',
      'Keep left arm extended forward',
      'Hold for 5-8 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    category: 'Biceps'
  },
  {
    id: 'tabletop-bicep-curl',
    name: 'Tabletop with Bicep Curl',
    description: 'A dynamic tabletop pose that incorporates a bicep curl for added arm strength.',
    benefits: [
      'Strengthens biceps and core',
      'Improves balance',
      'Engages shoulders',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Hold a light dumbbell or use bodyweight for one arm',
      'Curl arm up toward shoulder, keeping elbow stable',
      'Lower arm and repeat for several reps',
      'Switch arms and repeat'
    ],
    difficulty: 'Advanced',
    category: 'Biceps'
  },
  {
    id: 'sphinx-bicep',
    name: 'Sphinx Pose (Bicep Focus)',
    description: 'A gentle backbend that stretches and activates the biceps as you press the forearms into the mat.',
    benefits: [
      'Stretches biceps and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging biceps',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Biceps'
  },
  {
    id: 'cat-cow-traps',
    name: 'Cat-Cow Pose (Traps Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the traps and mid-back.',
    benefits: [
      'Mobilizes traps and spine',
      'Relieves mid-back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Repeat for 1-2 minutes',
      'Move slowly with your breath'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'thread-the-needle-traps',
    name: 'Thread the Needle (Traps Stretch)',
    description: 'A gentle twist that stretches the traps, shoulders, and upper back.',
    benefits: [
      'Stretches traps and shoulders',
      'Improves spinal mobility',
      'Relieves upper back tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Press left hand into the mat for a deeper stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'puppy-pose-traps',
    name: 'Puppy Pose (Traps Focus)',
    description: 'A heart-opening pose that stretches the traps, chest, and shoulders.',
    benefits: [
      'Stretches traps and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Press hands into the mat to activate traps',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'childs-pose-traps',
    name: "Child's Pose (Traps Stretch)",
    description: 'A restorative pose that gently stretches the traps and mid-back.',
    benefits: [
      'Relieves mid-back and trap tension',
      'Calms the mind',
      'Improves flexibility',
      'Gentle on joints',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on the floor and sit back on your heels',
      'Fold forward, extending arms in front',
      'Rest forehead on the mat',
      'Reach arms forward to stretch traps',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'sphinx-traps',
    name: 'Sphinx Pose (Traps Focus)',
    description: 'A gentle backbend that stretches and activates the traps as you press the forearms into the mat.',
    benefits: [
      'Stretches traps and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging traps',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'cobra-traps',
    name: 'Cobra Pose (Traps Engagement)',
    description: 'A backbend that stretches the traps and strengthens the upper back.',
    benefits: [
      'Strengthens traps and back',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest off the mat',
      'Draw shoulders down and back, engaging traps',
      'Keep elbows close to body',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'locust-traps',
    name: 'Locust Pose (Traps Variation)',
    description: 'A prone pose that strengthens the traps by lifting the arms and chest.',
    benefits: [
      'Strengthens traps and upper back',
      'Improves posture',
      'Opens chest',
      'Enhances arm endurance',
      'Reduces fatigue'
    ],
    instructions: [
      'Lie on your stomach, arms at sides',
      'Inhale and lift chest, arms, and legs off the mat',
      'Squeeze shoulder blades and engage traps',
      'Hold for 5-8 breaths',
      'Lower down and rest'
    ],
    difficulty: 'Intermediate',
    category: 'Traps (mid Back)'
  },
  {
    id: 'downward-dog-traps',
    name: 'Downward-Facing Dog (Traps Emphasis)',
    description: 'A foundational pose that stretches and strengthens the traps and upper back.',
    benefits: [
      'Strengthens traps and shoulders',
      'Stretches hamstrings and calves',
      'Relieves back pain',
      'Improves posture',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back',
      'Press hands into the mat, activating traps',
      'Keep head between arms',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'dolphin-traps',
    name: 'Dolphin Pose (Traps Focus)',
    description: 'A forearm-based inversion that builds traps and shoulder strength.',
    benefits: [
      'Strengthens traps and shoulders',
      'Improves upper body stability',
      'Stretches hamstrings and calves',
      'Prepares for more advanced inversions',
      'Relieves tension in the neck and back'
    ],
    instructions: [
      'Start on hands and knees, lower forearms to the mat',
      'Tuck toes and lift hips up and back',
      'Keep forearms parallel and press down through elbows',
      'Engage traps to support the pose',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Traps (mid Back)'
  },
  {
    id: 'bridge-traps',
    name: 'Bridge Pose (Traps Engagement)',
    description: 'A backbend that strengthens the traps and opens the chest.',
    benefits: [
      'Strengthens traps and back',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your back, knees bent, feet flat on the floor',
      'Press feet and arms into the mat',
      'Lift hips and chest upward',
      'Roll shoulders under and squeeze traps',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Traps (mid Back)'
  },
  {
    id: 'camel-traps',
    name: 'Camel Pose (Traps Focus)',
    description: 'A deep backbend that stretches the traps as you reach for your heels.',
    benefits: [
      'Stretches traps and chest',
      'Opens front body',
      'Improves spinal flexibility',
      'Boosts energy',
      'Enhances arm mobility'
    ],
    instructions: [
      'Kneel with knees hip-width apart',
      'Place hands on lower back, fingers pointing down',
      'Lean back and reach hands for heels',
      'Press hips forward and engage glutes',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Advanced',
    category: 'Traps (mid Back)'
  },
  {
    id: 'bow-traps',
    name: 'Bow Pose (Traps Engagement)',
    description: 'A backbend that actively engages the traps as you pull your feet toward your head.',
    benefits: [
      'Strengthens traps and back',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach',
      'Bend knees and reach back to grab ankles',
      'Inhale and lift chest and thighs off the mat',
      'Pull feet toward head, engaging traps',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Advanced',
    category: 'Traps (mid Back)'
  },
  {
    id: 'reclined-twist-traps',
    name: 'Reclined Twist (Traps Stretch)',
    description: 'A gentle supine twist that stretches the traps and mid-back.',
    benefits: [
      'Stretches traps and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Turn head in the opposite direction',
      'Relax shoulders and traps',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'eagle-arms-traps',
    name: 'Eagle Arms (Traps Emphasis)',
    description: 'A pose that wraps the arms to stretch and activate the traps and shoulders.',
    benefits: [
      'Stretches traps and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms, bringing palms to touch',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'reverse-tabletop-traps',
    name: 'Reverse Tabletop Pose (Traps Focus)',
    description: 'A pose that strengthens the traps, shoulders, and core while opening the chest.',
    benefits: [
      'Strengthens traps and shoulders',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Keep arms straight and squeeze shoulder blades together',
      'Hold for 5-10 breaths',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'upward-plank-traps',
    name: 'Upward Plank Pose (Traps Engagement)',
    description: 'A challenging pose that targets the traps, shoulders, and entire front body.',
    benefits: [
      'Strengthens traps, shoulders, and arms',
      'Stretches chest and front ankles',
      'Improves arm and wrist strength',
      'Builds core stability',
      'Enhances overall endurance'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips, fingers pointing toward feet',
      'Press into hands and feet to lift hips and torso upward',
      'Keep legs straight and point toes',
      'Engage traps to keep arms strong',
      'Hold for 5-10 breaths, then lower down'
    ],
    difficulty: 'Intermediate',
    category: 'Traps (mid Back)'
  },
  {
    id: 'side-plank-traps',
    name: 'Side Plank (Traps Focus)',
    description: 'A side plank variation that engages the traps and shoulders for stability.',
    benefits: [
      'Strengthens traps and core',
      'Improves balance and stability',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Press floor away with right hand, engaging traps',
      'Lift left arm toward ceiling',
      'Hold for 5-10 breaths, then switch sides',
      'Lower down and rest'
    ],
    difficulty: 'Advanced',
    category: 'Traps (mid Back)'
  },
  {
    id: 'tabletop-traps',
    name: 'Tabletop Pose (Traps Engagement)',
    description: 'A dynamic tabletop pose that incorporates shoulder blade retraction to activate the traps.',
    benefits: [
      'Strengthens traps and core',
      'Improves balance',
      'Engages shoulders',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Press hands into mat and retract shoulder blades',
      'Engage traps as you hold',
      'Hold for 5-10 breaths',
      'Release and repeat'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'standing-forward-bend-traps',
    name: 'Standing Forward Bend (Traps Stretch)',
    description: 'A standing pose that stretches the traps and upper back as you fold forward.',
    benefits: [
      'Stretches traps and spine',
      'Relieves back tension',
      'Improves flexibility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge at hips and fold forward',
      'Let head and arms hang, relaxing traps',
      'Hold for 1-2 minutes',
      'Slowly rise back up to standing'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'garland-pose-traps',
    name: 'Garland Pose (Traps Focus)',
    description: 'A deep squat that stretches the traps and upper back as you reach arms forward.',
    benefits: [
      'Stretches traps and upper back',
      'Opens hips',
      'Improves posture',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Squat with feet wider than hips',
      'Bring palms together at chest',
      'Reach arms forward and round upper back',
      'Relax head and neck',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'cow-face-arms-traps',
    name: 'Cow Face Arms (Traps Stretch)',
    description: 'A seated pose that stretches the traps and shoulders by reaching one arm overhead and the other behind the back.',
    benefits: [
      'Stretches traps and shoulders',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    category: 'Traps (mid Back)'
  },
  {
    id: 'cobra-abdominals',
    name: 'Cobra Pose (Abdominals Focus)',
    description: 'A gentle backbend that stretches the abdominal muscles and opens the chest.',
    benefits: [
      'Stretches abdominals',
      'Opens chest',
      'Improves posture',
      'Reduces back tension',
      'Boosts energy'
    ],
    instructions: [
      'Lie face down on the floor with legs extended.',
      'Place your hands under your shoulders, elbows close to your body.',
      'Press your hands into the floor and lift your chest.',
      'Keep your hips and legs on the floor.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'upward-facing-dog-abdominals',
    name: 'Upward Facing Dog (Abdominals)',
    description: 'A yoga pose that stretches the abdominals and strengthens the back.',
    benefits: [
      'Deep abs stretch',
      'Strengthens back',
      'Opens chest',
      'Improves spinal flexibility',
      'Energizes the body'
    ],
    instructions: [
      'Lie face down with hands under your shoulders.',
      'Press your hands and tops of feet into the floor.',
      'Lift your entire body off the floor.',
      'Keep your arms straight and chest open.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Intermediate',
    category: 'Abdominals'
  },
  {
    id: 'seated-backbend-abdominals',
    name: 'Seated Backbend (Abdominals)',
    description: 'A simple seated stretch that targets the abdominal muscles.',
    benefits: [
      'Stretches abdominals',
      'Improves posture',
      'Opens chest',
      'Can be done anywhere',
      'Reduces tension'
    ],
    instructions: [
      'Sit on the floor with legs extended in front.',
      'Place your hands behind you, fingers pointing away.',
      'Lift your chest and arch your back gently.',
      'Keep your legs straight and engaged.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'bridge-pose-abdominals',
    name: 'Bridge Pose (Abdominals)',
    description: 'An advanced backbend that deeply stretches the abdominals.',
    benefits: [
      'Deep abs stretch',
      'Strengthens back',
      'Opens chest',
      'Improves flexibility',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Place your hands by your ears, fingers pointing toward shoulders.',
      'Press into your hands and feet to lift your hips.',
      'Straighten your arms and arch your back.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Advanced',
    category: 'Abdominals'
  },
  {
    id: 'wheel-pose-abdominals',
    name: 'Wheel Pose (Abdominals)',
    description: 'An advanced yoga pose that provides maximum stretch for the abdominals.',
    benefits: [
      'Maximum abs stretch',
      'Strengthens entire body',
      'Opens chest',
      'Improves flexibility',
      'Energizes the body'
    ],
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Place your hands by your ears, fingers pointing toward shoulders.',
      'Press into your hands and feet to lift your body.',
      'Straighten your arms and legs, arching your back.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Advanced',
    category: 'Abdominals'
  },
  {
    id: 'standing-backbend-abdominals',
    name: 'Standing Backbend (Abdominals)',
    description: 'A standing stretch that targets the abdominals and improves posture.',
    benefits: [
      'Stretches abdominals',
      'Improves posture',
      'Opens chest',
      'Great for daily practice',
      'Reduces tension'
    ],
    instructions: [
      'Stand with feet hip-width apart and arms at your sides.',
      'Place your hands on your lower back, fingers pointing down.',
      'Gently arch your back and lift your chest.',
      'Keep your legs straight and engaged.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Intermediate',
    category: 'Abdominals'
  },
  {
    id: 'camel-pose-abdominals',
    name: 'Camel Pose (Abdominals)',
    description: 'A kneeling backbend that stretches the abdominals and opens the chest.',
    benefits: [
      'Deep abs stretch',
      'Opens chest',
      'Improves posture',
      'Reduces back tension',
      'Boosts energy'
    ],
    instructions: [
      'Kneel on the floor with knees hip-width apart.',
      'Place your hands on your lower back, fingers pointing down.',
      'Lift your chest and arch your back gently.',
      'Keep your hips over your knees.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Intermediate',
    category: 'Abdominals'
  },
  {
    id: 'bow-pose-abdominals',
    name: 'Bow Pose (Abdominals)',
    description: 'A prone backbend that stretches the abdominals and strengthens the back.',
    benefits: [
      'Stretches abdominals',
      'Strengthens back',
      'Opens chest',
      'Improves flexibility',
      'Energizes the body'
    ],
    instructions: [
      'Lie face down with arms at your sides.',
      'Bend your knees and reach back to hold your ankles.',
      'Lift your chest and thighs off the floor.',
      'Rock gently back and forth.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Intermediate',
    category: 'Abdominals'
  },
  {
    id: 'fish-pose-abdominals',
    name: 'Fish Pose (Abdominals)',
    description: 'A supine backbend that stretches the abdominals and opens the chest.',
    benefits: [
      'Stretches abdominals',
      'Opens chest',
      'Improves posture',
      'Reduces neck tension',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your back with legs extended.',
      'Place your hands under your hips, palms down.',
      'Lift your chest and arch your back.',
      'Let your head drop back gently.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'dynamic-abs-mobility-abdominals',
    name: 'Dynamic Abs Mobility (Abdominals)',
    description: 'Moving stretches that warm up the abdominals and improve mobility.',
    benefits: [
      'Warms up abdominals',
      'Improves mobility',
      'Great for pre-workout',
      'Enhances performance',
      'Reduces stiffness'
    ],
    instructions: [
      'Stand with feet shoulder-width apart and hands on your hips.',
      'Slowly arch your back and lift your chest.',
      'Then round your back and tuck your chin.',
      'Move smoothly between the two positions.',
      'Repeat 10-15 times, breathing deeply.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'boat-pose-abdominals',
    name: 'Boat Pose (Abdominals)',
    description: 'A balancing pose that strengthens and stretches the abdominals.',
    benefits: [
      'Strengthens abdominals',
      'Improves balance',
      'Enhances core stability',
      'Boosts energy',
      'Improves posture'
    ],
    instructions: [
      'Sit on the floor with legs extended.',
      'Lean back slightly and lift your legs off the floor.',
      'Extend your arms forward, parallel to the floor.',
      'Balance on your sit bones, keeping your back straight.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Intermediate',
    category: 'Abdominals'
  },
  {
    id: 'half-boat-pose-abdominals',
    name: 'Half Boat Pose (Abdominals)',
    description: 'A modified boat pose that targets the abdominals and improves balance.',
    benefits: [
      'Strengthens abdominals',
      'Improves balance',
      'Enhances core stability',
      'Reduces tension',
      'Boosts energy'
    ],
    instructions: [
      'Sit on the floor with knees bent and feet flat.',
      'Lean back slightly and lift your feet off the floor.',
      'Extend your arms forward, parallel to the floor.',
      'Balance on your sit bones, keeping your back straight.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'reclined-twist-abdominals',
    name: 'Reclined Twist (Abdominals)',
    description: 'A gentle supine twist that stretches the abdominals and spine.',
    benefits: [
      'Stretches abdominals and spine',
      'Relieves tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides.',
      'Bend knees and drop them to one side.',
      'Turn head in the opposite direction.',
      'Relax shoulders and abdominals.',
      'Hold for 1-2 minutes, then switch sides.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'supine-stretch-abdominals',
    name: 'Supine Stretch (Abdominals)',
    description: 'A relaxing stretch performed lying down that lengthens the abdominals.',
    benefits: [
      'Lengthens abdominals',
      'Relieves tension',
      'Good for recovery',
      'Reduces stress',
      'Improves flexibility'
    ],
    instructions: [
      'Lie on your back with arms extended overhead and legs straight.',
      'Stretch your arms and legs in opposite directions.',
      'Hold for 20-30 seconds, breathing deeply.',
      'Relax and repeat as needed.',
      'Great for morning or bedtime.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'side-plank-abdominals',
    name: 'Side Plank (Abdominals)',
    description: 'A side plank variation that engages the abdominals and obliques.',
    benefits: [
      'Strengthens abdominals and obliques',
      'Improves balance',
      'Enhances core stability',
      'Builds functional strength',
      'Reduces tension'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right.',
      'Engage abdominals to keep hips lifted.',
      'Extend left arm toward ceiling.',
      'Hold for 30 seconds, then switch sides.',
      'Lower down and rest.'
    ],
    difficulty: 'Intermediate',
    category: 'Abdominals'
  },
  {
    id: 'reverse-plank-abdominals',
    name: 'Reverse Plank (Abdominals)',
    description: 'A reverse plank variation that stretches and strengthens the abdominals.',
    benefits: [
      'Strengthens abdominals and back',
      'Opens chest',
      'Improves posture',
      'Enhances arm endurance',
      'Reduces tension'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips, fingers pointing toward feet.',
      'Press into hands and feet to lift hips and torso upward.',
      'Keep legs straight and point toes.',
      'Engage abdominals to keep body strong.',
      'Hold for 30 seconds, then lower down.'
    ],
    difficulty: 'Intermediate',
    category: 'Abdominals'
  },
  {
    id: 'tabletop-abdominals',
    name: 'Tabletop Pose (Abdominals)',
    description: 'A dynamic tabletop pose that incorporates core engagement to activate the abdominals.',
    benefits: [
      'Strengthens abdominals and core',
      'Improves balance',
      'Engages shoulders',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position.',
      'Engage abdominals as you lift opposite arm and leg.',
      'Hold for 5-10 breaths, then switch sides.',
      'Release and repeat.',
      'Focus on core stability.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'knees-to-chest-abdominals',
    name: 'Knees to Chest (Abdominals)',
    description: 'A gentle stretch that relieves abdominal tension and improves hip flexibility.',
    benefits: [
      'Relieves abdominal tension',
      'Improves hip mobility',
      'Reduces lower back pain',
      'Great for beginners',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Bring both knees toward your chest.',
      'Hold your knees with both hands and gently pull them closer.',
      'Hold for 30 seconds, breathing deeply.',
      'Release and repeat as needed.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'dynamic-core-mobility-abdominals',
    name: 'Dynamic Core Mobility (Abdominals)',
    description: 'Moving stretches that warm up the core and abdominals.',
    benefits: [
      'Warms up abdominals',
      'Improves mobility',
      'Great for pre-workout',
      'Enhances performance',
      'Reduces stiffness'
    ],
    instructions: [
      'Stand with feet shoulder-width apart and hands on your hips.',
      'Twist your torso gently side to side.',
      'Add arm swings for increased mobility.',
      'Gradually increase the range of motion.',
      'Repeat 10-15 times.'
    ],
    difficulty: 'Beginner',
    category: 'Abdominals'
  },
  {
    id: 'wrist-flexor-stretch-forearms',
    name: 'Wrist Flexor Stretch',
    description: 'A classic stretch that targets the wrist flexor muscles in the forearm.',
    benefits: [
      'Relieves wrist pain',
      'Improves grip strength',
      'Reduces carpal tunnel symptoms',
      'Great for office workers',
      'Enhances flexibility'
    ],
    instructions: [
      'Extend your right arm straight out in front of you.',
      'Point your fingers toward the ceiling.',
      'Use your left hand to gently pull your fingers back toward your body.',
      'Feel the stretch in your forearm and wrist.',
      'Hold for 30 seconds and switch arms.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'wrist-extensor-stretch-forearms',
    name: 'Wrist Extensor Stretch',
    description: 'Targets the wrist extensor muscles to improve wrist mobility.',
    benefits: [
      'Improves wrist flexibility',
      'Reduces forearm tightness',
      'Helps with typing',
      'Good for musicians',
      'Prevents injury'
    ],
    instructions: [
      'Extend your right arm straight out in front of you.',
      'Point your fingers toward the floor.',
      'Use your left hand to gently push your fingers down.',
      'Feel the stretch in the top of your forearm.',
      'Hold for 30 seconds and switch arms.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'prayer-stretch-forearms',
    name: 'Prayer Stretch',
    description: 'A gentle stretch that targets both flexors and extensors simultaneously.',
    benefits: [
      'Balanced stretch',
      'Improves wrist mobility',
      'Reduces tension',
      'Can be done anywhere',
      'Promotes relaxation'
    ],
    instructions: [
      'Bring your palms together in front of your chest.',
      'Keep your elbows at shoulder height.',
      'Slowly lower your hands toward your waist.',
      'Feel the stretch in both forearms.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'reverse-prayer-stretch-forearms',
    name: 'Reverse Prayer Stretch',
    description: 'An advanced variation that provides a deeper stretch for the forearms.',
    benefits: [
      'Deep stretch',
      'Improves flexibility',
      'Targets tight areas',
      'Great for athletes',
      'Enhances posture'
    ],
    instructions: [
      'Bring the backs of your hands together behind your back.',
      'Keep your elbows bent and close to your body.',
      'Gently press your hands together.',
      'Feel the stretch in your forearms and wrists.',
      'Hold for 30 seconds, breathing deeply.'
    ],
    difficulty: 'Intermediate',
    category: 'Forearms'
  },
  {
    id: 'wall-forearm-stretch-forearms',
    name: 'Wall Forearm Stretch',
    description: 'A simple wall-based stretch that can be done anywhere.',
    benefits: [
      'No equipment needed',
      'Consistent stretch',
      'Good for all levels',
      'Improves wrist mobility',
      'Reduces tension'
    ],
    instructions: [
      'Stand facing a wall with your feet shoulder-width apart.',
      'Place your right hand on the wall at shoulder height.',
      'Keep your arm straight and press your palm into the wall.',
      'Feel the stretch in your forearm and wrist.',
      'Hold for 30 seconds and switch arms.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'seated-forearm-stretch-forearms',
    name: 'Seated Forearm Stretch',
    description: 'A comfortable seated stretch perfect for office workers.',
    benefits: [
      'Can be done at desk',
      'Gentle on joints',
      'Good for beginners',
      'Reduces wrist tension',
      'Improves flexibility'
    ],
    instructions: [
      'Sit in a chair with your back straight.',
      'Place your right hand on your right thigh, palm up.',
      'Use your left hand to gently pull your fingers back.',
      'Feel the stretch in your forearm.',
      'Hold for 30 seconds and switch hands.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'towel-forearm-stretch-forearms',
    name: 'Towel Forearm Stretch',
    description: 'A portable stretch using a towel for controlled resistance.',
    benefits: [
      'Portable',
      'Controlled stretch',
      'Can adjust intensity',
      'Good for travel',
      'Improves grip strength'
    ],
    instructions: [
      'Hold a towel with both hands in front of you.',
      'Extend your arms straight out.',
      'Gently pull the towel apart, feeling the stretch in your forearms.',
      'Hold for 30 seconds.',
      'You can adjust the towel length for different intensities.'
    ],
    difficulty: 'Intermediate',
    category: 'Forearms'
  },
  {
    id: 'foam-roller-forearm-release-forearms',
    name: 'Foam Roller Forearm Release',
    description: 'A self-massage technique using a foam roller to release forearm tightness.',
    benefits: [
      'Releases muscle knots',
      'Improves blood flow',
      'Reduces soreness',
      'Enhances recovery',
      'Promotes relaxation'
    ],
    instructions: [
      'Place a foam roller on a table or floor.',
      'Rest your forearm on the roller, palm down.',
      'Roll slowly from your elbow to your wrist.',
      'Pause on tender spots for 30 seconds.',
      'Repeat with palm up and on the other arm.'
    ],
    difficulty: 'Intermediate',
    category: 'Forearms'
  },
  {
    id: 'dynamic-forearm-mobility-forearms',
    name: 'Dynamic Forearm Mobility',
    description: 'Moving stretches that warm up the forearms and improve mobility.',
    benefits: [
      'Warms up muscles',
      'Improves mobility',
      'Great for pre-workout',
      'Enhances performance',
      'Reduces stiffness'
    ],
    instructions: [
      'Stand with your arms at your sides.',
      'Make fists and rotate your wrists in circles.',
      'Move clockwise for 10 rotations, then counterclockwise.',
      'Gradually increase the range of motion.',
      'Repeat 3-5 times.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'resistance-band-forearm-stretch-forearms',
    name: 'Resistance Band Forearm Stretch',
    description: 'A dynamic stretch using resistance bands for controlled forearm stretching.',
    benefits: [
      'Controlled resistance',
      'Builds strength',
      'Improves range of motion',
      'Great for rehabilitation',
      'Enhances flexibility'
    ],
    instructions: [
      'Hold a resistance band with both hands in front of you.',
      'Extend your arms straight out to the sides.',
      'Gently pull the band apart, feeling the stretch in your forearms.',
      'Hold for 30 seconds.',
      'You can adjust the band tension as needed.'
    ],
    difficulty: 'Intermediate',
    category: 'Forearms'
  },
  {
    id: 'forearm-plank-forearms',
    name: 'Forearm Plank',
    description: 'A core-strengthening pose that builds endurance in the forearms.',
    benefits: [
      'Strengthens forearms and core',
      'Improves posture',
      'Builds arm and shoulder strength',
      'Enhances balance',
      'Boosts endurance'
    ],
    instructions: [
      'Start in plank position on your forearms.',
      'Keep body in straight line.',
      'Engage core muscles.',
      'Hold for 30 seconds to 1 minute.',
      'Breathe steadily.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'reverse-tabletop-forearms',
    name: 'Reverse Tabletop (Forearms)',
    description: 'A pose that strengthens the forearms, wrists, and shoulders while opening the chest.',
    benefits: [
      'Strengthens forearms and wrists',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward.',
      'Press into hands and feet to lift hips up, coming into a tabletop position.',
      'Keep arms straight and squeeze shoulder blades together.',
      'Hold for 5-10 breaths.',
      'Lower hips back down to release.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'upward-plank-forearms',
    name: 'Upward Plank (Forearms)',
    description: 'A challenging pose that targets the forearms, wrists, and entire front body.',
    benefits: [
      'Strengthens forearms, wrists, and arms',
      'Stretches chest and front ankles',
      'Improves arm and wrist strength',
      'Builds core stability',
      'Enhances overall endurance'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips, fingers pointing toward feet.',
      'Press into hands and feet to lift hips and torso upward.',
      'Keep legs straight and point toes.',
      'Engage forearms to keep arms strong.',
      'Hold for 5-10 breaths, then lower down.'
    ],
    difficulty: 'Intermediate',
    category: 'Forearms'
  },
  {
    id: 'side-plank-forearms',
    name: 'Side Plank (Forearms)',
    description: 'A side plank variation that engages the forearms and wrists for stability.',
    benefits: [
      'Strengthens forearms and core',
      'Improves balance and stability',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right forearm, left foot stacked on right.',
      'Press floor away with right forearm, engaging forearms.',
      'Lift left arm toward ceiling.',
      'Hold for 5-10 breaths, then switch sides.',
      'Lower down and rest.'
    ],
    difficulty: 'Advanced',
    category: 'Forearms'
  },
  {
    id: 'tabletop-forearms',
    name: 'Tabletop Pose (Forearms)',
    description: 'A dynamic tabletop pose that incorporates wrist and forearm engagement.',
    benefits: [
      'Strengthens forearms and core',
      'Improves balance',
      'Engages wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position.',
      'Press hands into mat and retract shoulder blades.',
      'Engage forearms as you hold.',
      'Hold for 5-10 breaths.',
      'Release and repeat.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'dolphin-forearms',
    name: 'Dolphin Pose (Forearms)',
    description: 'A forearm-based inversion that builds forearm and shoulder strength.',
    benefits: [
      'Strengthens forearms and shoulders',
      'Improves upper body stability',
      'Stretches hamstrings and calves',
      'Prepares for more advanced inversions',
      'Relieves tension in the neck and back'
    ],
    instructions: [
      'Start on hands and knees, lower forearms to the mat.',
      'Tuck toes and lift hips up and back.',
      'Keep forearms parallel and press down through elbows.',
      'Engage forearms to support the pose.',
      'Hold for 5-10 breaths.'
    ],
    difficulty: 'Intermediate',
    category: 'Forearms'
  },
  {
    id: 'puppy-pose-forearms',
    name: 'Puppy Pose (Forearms)',
    description: 'A heart-opening pose that stretches the forearms, chest, and shoulders.',
    benefits: [
      'Stretches forearms and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees.',
      'Walk hands forward, keeping hips above knees.',
      'Lower chest and chin toward the mat.',
      'Rotate arms so palms face up for deeper forearm stretch.',
      'Hold for 5-10 breaths.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'eagle-arms-forearms',
    name: 'Eagle Arms (Forearms)',
    description: 'A pose that wraps the arms to stretch and activate the forearms and shoulders.',
    benefits: [
      'Stretches forearms and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall.',
      'Extend arms forward and cross right arm over left.',
      'Bend elbows and wrap forearms, bringing palms to touch.',
      'Lift elbows and reach hands forward.',
      'Hold for 5-10 breaths, then switch sides.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'garland-pose-forearms',
    name: 'Garland Pose (Forearms)',
    description: 'A deep squat that stretches the forearms and upper back as you reach arms forward.',
    benefits: [
      'Stretches forearms and upper back',
      'Opens hips',
      'Improves posture',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Squat with feet wider than hips.',
      'Bring palms together at chest.',
      'Reach arms forward and round upper back.',
      'Relax head and neck.',
      'Hold for 5-10 breaths.'
    ],
    difficulty: 'Beginner',
    category: 'Forearms'
  },
  {
    id: 'cow-face-arms-forearms',
    name: 'Cow Face Arms (Forearms)',
    description: 'A seated pose that stretches the forearms and shoulders by reaching one arm overhead and the other behind the back.',
    benefits: [
      'Stretches forearms and shoulders',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    category: 'Forearms'
  },
  {
    id: 'bridge-pose-glutes',
    name: 'Bridge Pose (Glutes Focus)',
    description: 'A classic pose that activates and strengthens the glutes while opening the hips.',
    benefits: [
      'Strengthens glutes and hamstrings',
      'Opens hip flexors',
      'Improves core stability',
      'Relieves lower back tension',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back with knees bent and feet hip-width apart',
      'Press feet into the mat and lift hips toward the ceiling',
      'Squeeze glutes at the top',
      'Hold for 5-10 breaths, then lower down'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/bridge-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'locust-pose-glutes',
    name: 'Locust Pose (Glutes Focus)',
    description: 'A prone pose that targets the glutes and strengthens the entire posterior chain.',
    benefits: [
      'Strengthens glutes and lower back',
      'Improves posture',
      'Opens chest',
      'Enhances core stability',
      'Reduces fatigue'
    ],
    instructions: [
      'Lie on your stomach, arms at sides',
      'Inhale and lift chest, arms, and legs off the mat',
      'Squeeze glutes and hold',
      'Lower down and rest'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/locust-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'warrior-iii-glutes',
    name: 'Warrior III (Glutes Focus)',
    description: 'A balancing pose that activates the glutes and improves lower body strength.',
    benefits: [
      'Strengthens glutes and hamstrings',
      'Improves balance',
      'Enhances core stability',
      'Builds focus',
      'Tones legs'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Hinge forward at hips, extending other leg back',
      'Reach arms forward or to the sides',
      'Keep hips level and engage glutes',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/warrior-iii.jpg',
    category: 'Glutes'
  },
  {
    id: 'chair-pose-glutes',
    name: 'Chair Pose (Glutes Focus)',
    description: 'A powerful standing pose that activates the glutes and builds lower body endurance.',
    benefits: [
      'Strengthens glutes and quads',
      'Improves balance',
      'Builds stamina',
      'Tones legs',
      'Enhances focus'
    ],
    instructions: [
      'Stand with feet together',
      'Bend knees and lower hips as if sitting in a chair',
      'Reach arms overhead',
      'Engage glutes and hold',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/chair-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'crescent-lunge-glutes',
    name: 'Crescent Lunge (Glutes Focus)',
    description: 'A dynamic lunge that stretches the hip flexors and activates the glutes.',
    benefits: [
      'Strengthens glutes and quads',
      'Opens hip flexors',
      'Improves balance',
      'Builds lower body endurance',
      'Enhances flexibility'
    ],
    instructions: [
      'Step one foot forward into a lunge',
      'Bend front knee to 90 degrees',
      'Reach arms overhead',
      'Engage glutes and press through front heel',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/crescent-lunge.jpg',
    category: 'Glutes'
  },
  {
    id: 'half-bridge-glutes',
    name: 'Half Bridge Pose (Glutes Focus)',
    description: 'A gentle backbend that isolates and strengthens the glutes.',
    benefits: [
      'Isolates glute activation',
      'Improves hip mobility',
      'Relieves lower back tension',
      'Strengthens hamstrings',
      'Enhances core stability'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips halfway',
      'Squeeze glutes and hold',
      'Lower down and repeat'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/half-bridge.jpg',
    category: 'Glutes'
  },
  {
    id: 'goddess-pose-glutes',
    name: 'Goddess Pose (Glutes Focus)',
    description: 'A wide-legged squat that targets the glutes and inner thighs.',
    benefits: [
      'Strengthens glutes and inner thighs',
      'Opens hips',
      'Improves lower body endurance',
      'Enhances flexibility',
      'Builds stamina'
    ],
    instructions: [
      'Stand with feet wide, toes turned out',
      'Bend knees and lower hips',
      'Engage glutes and press knees outward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/goddess-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'standing-split-glutes',
    name: 'Standing Split (Glutes Focus)',
    description: 'A balancing pose that stretches the hamstrings and activates the glutes.',
    benefits: [
      'Strengthens glutes and hamstrings',
      'Improves balance',
      'Enhances flexibility',
      'Tones legs',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, hinge forward at hips',
      'Lift one leg up behind you',
      'Keep hips square and engage glutes',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/standing-split.jpg',
    category: 'Glutes'
  },
  {
    id: 'reverse-warrior-glutes',
    name: 'Reverse Warrior (Glutes Focus)',
    description: 'A variation of warrior pose that stretches the side body and activates the glutes.',
    benefits: [
      'Strengthens glutes and legs',
      'Stretches side body',
      'Improves balance',
      'Builds lower body endurance',
      'Enhances flexibility'
    ],
    instructions: [
      'Start in warrior II stance',
      'Reverse the back hand to the back leg',
      'Reach front arm overhead',
      'Engage glutes and hold',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-warrior.jpg',
    category: 'Glutes'
  },
  {
    id: 'side-lying-leg-lift-glutes',
    name: 'Side-Lying Leg Lift (Glutes Focus)',
    description: 'A floor pose that isolates the glute medius and improves hip stability.',
    benefits: [
      'Isolates glute medius',
      'Improves hip stability',
      'Strengthens outer glutes',
      'Enhances balance',
      'Tones legs'
    ],
    instructions: [
      'Lie on your side, legs stacked',
      'Lift top leg up, keeping it straight',
      'Engage glutes and hold',
      'Lower down and repeat, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/side-lying-leg-lift.jpg',
    category: 'Glutes'
  },
  {
    id: 'fire-hydrant-glutes',
    name: 'Fire Hydrant (Glutes Focus)',
    description: 'A quadruped pose that targets the glute medius and improves hip mobility.',
    benefits: [
      'Strengthens glute medius',
      'Improves hip mobility',
      'Enhances core stability',
      'Tones outer hips',
      'Builds functional strength'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift one knee out to the side',
      'Engage glutes and hold',
      'Lower down and repeat, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/fire-hydrant.jpg',
    category: 'Glutes'
  },
  {
    id: 'tabletop-leg-raise-glutes',
    name: 'Tabletop Leg Raise (Glutes Focus)',
    description: 'A tabletop variation that isolates the glutes and builds lower body strength.',
    benefits: [
      'Isolates glutes',
      'Improves hip extension',
      'Strengthens hamstrings',
      'Enhances core stability',
      'Tones legs'
    ],
    instructions: [
      'Start in tabletop position',
      'Lift one leg up and back, keeping knee bent',
      'Engage glutes and hold',
      'Lower down and repeat, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-leg-raise.jpg',
    category: 'Glutes'
  },
  {
    id: 'standing-figure-four-glutes',
    name: 'Standing Figure Four (Glutes Focus)',
    description: 'A balancing pose that stretches the glutes and opens the hips.',
    benefits: [
      'Stretches glutes and hips',
      'Improves balance',
      'Enhances hip mobility',
      'Relieves tension',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, cross one ankle over opposite knee',
      'Sit back as if into a chair',
      'Engage glutes and hold',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/standing-figure-four.jpg',
    category: 'Glutes'
  },
  {
    id: 'reverse-tabletop-glutes',
    name: 'Reverse Tabletop (Glutes Focus)',
    description: 'A pose that strengthens the glutes, hamstrings, and core while opening the chest.',
    benefits: [
      'Strengthens glutes and hamstrings',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Engage glutes and hold',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Glutes'
  },
  {
    id: 'camel-pose-glutes',
    name: 'Camel Pose (Glutes Focus)',
    description: 'A deep backbend that stretches the hip flexors and activates the glutes.',
    benefits: [
      'Stretches hip flexors and glutes',
      'Opens front body',
      'Improves spinal flexibility',
      'Boosts energy',
      'Enhances glute activation'
    ],
    instructions: [
      'Kneel with knees hip-width apart',
      'Place hands on lower back, fingers pointing down',
      'Lean back and reach hands for heels',
      'Press hips forward and engage glutes',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/camel-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'lizard-pose-glutes',
    name: 'Lizard Pose (Glutes Focus)',
    description: 'A deep hip opener that stretches and activates the glutes.',
    benefits: [
      'Stretches glutes and hip flexors',
      'Improves hip mobility',
      'Relieves lower back tension',
      'Enhances flexibility',
      'Builds lower body strength'
    ],
    instructions: [
      'Start in a lunge position',
      'Lower elbows to the mat inside front foot',
      'Engage glutes and hold',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/lizard-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'pigeon-pose-glutes',
    name: 'Pigeon Pose (Glutes Focus)',
    description: 'A classic hip opener that deeply stretches the glutes and relieves tension.',
    benefits: [
      'Deeply stretches glutes',
      'Opens hips',
      'Relieves lower back pain',
      'Improves hip mobility',
      'Promotes relaxation'
    ],
    instructions: [
      'From downward dog, bring one knee forward and place it behind wrist',
      'Extend other leg back',
      'Lower hips toward the mat',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/pigeon-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'figure-four-supine-glutes',
    name: 'Supine Figure Four (Glutes Focus)',
    description: 'A reclined pose that stretches the glutes and relieves hip tension.',
    benefits: [
      'Stretches glutes and hips',
      'Relieves lower back pain',
      'Improves hip mobility',
      'Promotes relaxation',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back, cross one ankle over opposite knee',
      'Pull legs toward chest',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/figure-four-supine.jpg',
    category: 'Glutes'
  },
  {
    id: 'bridge-march-glutes',
    name: 'Bridge March (Glutes Focus)',
    description: 'A dynamic bridge variation that challenges glute stability and strength.',
    benefits: [
      'Strengthens glutes and hamstrings',
      'Improves hip stability',
      'Enhances core control',
      'Builds lower body endurance',
      'Tones legs'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Lift hips into bridge',
      'March one knee toward chest, then switch',
      'Keep hips lifted and glutes engaged throughout'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/bridge-march.jpg',
    category: 'Glutes'
  },
  {
    id: 'frog-pose-glutes',
    name: 'Frog Pose (Glutes Focus)',
    description: 'A deep stretch for the inner thighs and glutes, improving hip mobility.',
    benefits: [
      'Stretches glutes and inner thighs',
      'Improves hip mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Widen knees and lower hips toward the mat',
      'Keep feet in line with knees',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/frog-pose.jpg',
    category: 'Glutes'
  },
  {
    id: 'bridge-single-leg-glutes',
    name: 'Single-Leg Bridge (Glutes Focus)',
    description: 'A unilateral bridge variation that isolates and strengthens each glute.',
    benefits: [
      'Isolates each glute',
      'Improves hip stability',
      'Strengthens hamstrings',
      'Enhances balance',
      'Tones legs'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Lift one leg off the mat',
      'Press through other foot to lift hips',
      'Squeeze glutes and hold, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/bridge-single-leg.jpg',
    category: 'Glutes'
  },
  {
    id: 'standing-lateral-leg-lift-glutes',
    name: 'Standing Lateral Leg Lift (Glutes Focus)',
    description: 'A standing pose that targets the glute medius and improves hip stability.',
    benefits: [
      'Strengthens glute medius',
      'Improves hip stability',
      'Enhances balance',
      'Tones outer hips',
      'Builds functional strength'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Lift other leg out to the side',
      'Engage glutes and hold',
      'Lower down and repeat, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/standing-lateral-leg-lift.jpg',
    category: 'Glutes'
  },
  {
    id: 'standing-forward-bend-traps',
    name: 'Standing Forward Bend (Traps Stretch)',
    description: 'A standing pose that stretches the traps and upper back as you fold forward.',
    benefits: [
      'Stretches traps and spine',
      'Relieves back tension',
      'Improves flexibility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge at hips and fold forward',
      'Let head and arms hang, relaxing traps',
      'Hold for 1-2 minutes',
      'Slowly rise back up to standing'
    ],
    difficulty: 'Beginner',
    category: 'Traps (mid Back)'
  },
  {
    id: 'reclined-big-toe-twist-hamstrings',
    name: 'Reclined Big Toe Twist (Hamstrings Focus)',
    description: 'A supine twist that stretches the hamstrings and relieves lower back pain.',
    benefits: [
      'Stretches hamstrings and spine',
      'Improves hip mobility',
      'Relieves lower back pain',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back',
      'Lift one leg and hold big toe with hand or use a strap',
      'Twist leg across body',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reclined-big-toe-twist.jpg',
    category: 'Hamstrings'
  },
  {
    id: 'half-moon-hamstrings',
    name: 'Half Moon Pose (Hamstrings Focus)',
    description: 'A balancing pose that stretches the hamstrings and strengthens the legs.',
    benefits: [
      'Stretches hamstrings and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Reach one hand to the floor and lift other leg up',
      'Keep hips open and engage hamstrings',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Hamstrings'
  },
  {
    id: 'head-to-knee-hamstrings',
    name: 'Head-to-Knee Pose (Hamstrings Focus)',
    description: 'A seated pose that stretches the hamstrings and side body.',
    benefits: [
      'Stretches hamstrings and spine',
      'Improves hip mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit with one leg extended, other foot to inner thigh',
      'Fold over extended leg',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/head-to-knee.jpg',
    category: 'Hamstrings'
  },
  {
    id: 'reclined-hand-to-foot-hamstrings',
    name: 'Reclined Hand-to-Foot Pose (Hamstrings Focus)',
    description: 'A supine pose that stretches the hamstrings and calves.',
    benefits: [
      'Stretches hamstrings and calves',
      'Improves hip mobility',
      'Relieves lower back pain',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back',
      'Lift one leg and hold foot with hand or use a strap',
      'Keep other leg extended on the mat',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reclined-hand-to-foot.jpg',
    category: 'Hamstrings'
  },
  {
    id: 'seated-wide-angle-hamstrings',
    name: 'Seated Wide Angle Pose (Hamstrings Focus)',
    description: 'A seated pose that stretches the hamstrings, inner thighs, and spine.',
    benefits: [
      'Stretches hamstrings and inner thighs',
      'Improves hip mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit with legs wide apart',
      'Hinge at hips and fold forward',
      'Reach arms forward',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/seated-wide-angle.jpg',
    category: 'Hamstrings'
  },
  {
    id: 'revolved-head-to-knee-hamstrings',
    name: 'Revolved Head-to-Knee Pose (Hamstrings Focus)',
    description: 'A twisting seated pose that stretches the hamstrings and side body.',
    benefits: [
      'Stretches hamstrings and spine',
      'Improves hip mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit with one leg extended, other foot to inner thigh',
      'Twist torso and reach opposite arm to extended leg',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-head-to-knee.jpg',
    category: 'Hamstrings'
  },
  {
    id: 'splits-hamstrings',
    name: 'Full Splits (Hanumanasana, Hamstrings Focus)',
    description: 'An advanced pose that provides a deep stretch for the hamstrings and hip flexors.',
    benefits: [
      'Deeply stretches hamstrings and hip flexors',
      'Improves flexibility',
      'Builds lower body strength',
      'Enhances balance',
      'Promotes relaxation'
    ],
    instructions: [
      'Start in a low lunge',
      'Slide front foot forward and back knee backward',
      'Lower hips toward the mat',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/splits.jpg',
    category: 'Hamstrings'
  },
  // --- LATS YOGA POSES START ---
  {
    id: 'childs-pose-lats',
    name: "Child's Pose (Lats Focus)",
    description: 'A gentle resting pose that stretches the lats and relieves tension in the back.',
    benefits: [
      'Stretches lats and spine',
      'Relieves back tension',
      'Calms the mind',
      'Improves flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on the floor and sit back on your heels',
      'Fold forward, extending arms in front',
      'Walk hands to one side to deepen the lat stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/childs-pose.jpg',
    category: 'Lats'
  },
  {
    id: 'extended-puppy-lats',
    name: 'Extended Puppy Pose (Lats Focus)',
    description: 'A heart-opening pose that stretches the lats, shoulders, and spine.',
    benefits: [
      'Stretches lats and shoulders',
      'Opens chest',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Walk hands to one side for deeper lat stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/extended-puppy.jpg',
    category: 'Lats'
  },
  {
    id: 'thread-the-needle-lats',
    name: 'Thread the Needle (Lats Focus)',
    description: 'A gentle twist that stretches the lats, shoulders, and upper back.',
    benefits: [
      'Stretches lats and shoulders',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Walk left hand forward for deeper lat stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Lats'
  },
  {
    id: 'downward-dog-lats',
    name: 'Downward-Facing Dog (Lats Focus)',
    description: 'A foundational pose that stretches the lats, shoulders, and back.',
    benefits: [
      'Stretches lats and shoulders',
      'Strengthens arms and back',
      'Improves posture',
      'Relieves back pain',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back',
      'Press hands into the mat and lengthen through the sides',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/downward-dog.jpg',
    category: 'Lats'
  },
  {
    id: 'side-plank-lats',
    name: 'Side Plank (Lats Focus)',
    description: 'A balancing pose that strengthens the lats, obliques, and shoulders.',
    benefits: [
      'Strengthens lats and core',
      'Improves balance',
      'Engages shoulders',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage lats to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Lats'
  },
  {
    id: 'gate-pose-lats',
    name: 'Gate Pose (Lats Focus)',
    description: 'A kneeling side stretch that targets the lats and opens the side body.',
    benefits: [
      'Stretches lats and obliques',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the lats',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/gate-pose.jpg',
    category: 'Lats'
  },
  {
    id: 'revolved-head-to-knee-lats',
    name: 'Revolved Head-to-Knee Pose (Lats Focus)',
    description: 'A twisting seated pose that stretches the lats and side body.',
    benefits: [
      'Stretches lats and spine',
      'Improves hip mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit with one leg extended, other foot to inner thigh',
      'Twist torso and reach opposite arm to extended leg',
      'Reach other arm overhead for a deep lat stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-head-to-knee.jpg',
    category: 'Lats'
  },
  {
    id: 'half-moon-lats',
    name: 'Half Moon Pose (Lats Focus)',
    description: 'A balancing pose that stretches the lats, hips, and side body.',
    benefits: [
      'Stretches lats and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Reach one hand to the floor and lift other leg up',
      'Reach top arm overhead for a deep lat stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Lats'
  },
  {
    id: 'banana-pose-lats',
    name: 'Banana Pose (Lats Focus)',
    description: 'A supine side stretch that targets the lats and improves lateral flexibility.',
    benefits: [
      'Stretches lats and obliques',
      'Improves lateral flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, arms overhead',
      'Walk feet and hands to one side, forming a banana shape',
      'Feel the stretch along the lats',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/banana-pose.jpg',
    category: 'Lats'
  },
  {
    id: 'seated-side-bend-lats',
    name: 'Seated Side Bend (Lats Focus)',
    description: 'A seated pose that stretches the lats and side body.',
    benefits: [
      'Stretches lats and spine',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Sit cross-legged or in staff pose',
      'Reach one arm overhead and lean to the side',
      'Feel the stretch along the lats',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/seated-side-bend.jpg',
    category: 'Lats'
  },
  {
    id: 'parighasana-lats',
    name: 'Parighasana (Gate Pose, Lats Focus)',
    description: 'A kneeling side stretch that targets the lats and opens the side body.',
    benefits: [
      'Stretches lats and obliques',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the lats',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/parighasana.jpg',
    category: 'Lats'
  },
  {
    id: 'reclined-twist-lats',
    name: 'Reclined Twist (Lats Focus)',
    description: 'A gentle supine twist that stretches the lats and spine.',
    benefits: [
      'Stretches lats and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Reach top arm overhead for a deep lat stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reclined-twist.jpg',
    category: 'Lats'
  },
  {
    id: 'puppy-pose-lats',
    name: 'Puppy Pose (Lats Focus)',
    description: 'A heart-opening pose that stretches the lats, chest, and shoulders.',
    benefits: [
      'Stretches lats and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Walk hands to one side for deeper lat stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Lats'
  },
  {
    id: 'side-lying-lat-stretch',
    name: 'Side-Lying Lat Stretch',
    description: 'A floor pose that isolates the lats and improves shoulder mobility.',
    benefits: [
      'Isolates lats',
      'Improves shoulder mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your side, legs stacked',
      'Reach top arm overhead and grab wrist with bottom hand',
      'Gently pull for a deeper stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/side-lying-lat-stretch.jpg',
    category: 'Lats'
  },
  {
    id: 'cat-cow-lats',
    name: 'Cat-Cow Pose (Lats Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the lats and spine.',
    benefits: [
      'Mobilizes lats and spine',
      'Relieves back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Walk hands to one side for deeper lat stretch',
      'Repeat for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cat-cow.jpg',
    category: 'Lats'
  },
  {
    id: 'cobra-lats',
    name: 'Cobra Pose (Lats Engagement)',
    description: 'A backbend that stretches the lats and strengthens the upper back.',
    benefits: [
      'Strengthens lats and back',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest off the mat',
      'Draw shoulders down and back, engaging lats',
      'Keep elbows close to body',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cobra.jpg',
    category: 'Lats'
  },
  {
    id: 'locust-lats',
    name: 'Locust Pose (Lats Variation)',
    description: 'A prone pose that strengthens the lats by lifting the arms and chest.',
    benefits: [
      'Strengthens lats and upper back',
      'Improves posture',
      'Opens chest',
      'Enhances arm endurance',
      'Reduces fatigue'
    ],
    instructions: [
      'Lie on your stomach, arms at sides',
      'Inhale and lift chest, arms, and legs off the mat',
      'Squeeze shoulder blades and engage lats',
      'Hold for 5-8 breaths',
      'Lower down and rest'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/locust.jpg',
    category: 'Lats'
  },
  {
    id: 'revolved-side-angle-lats',
    name: 'Revolved Side Angle Pose (Lats Focus)',
    description: 'A twisting lunge that stretches the lats and strengthens the legs.',
    benefits: [
      'Stretches lats and spine',
      'Strengthens legs',
      'Improves balance',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start in a lunge position',
      'Twist torso and bring opposite elbow to outside of front knee',
      'Reach top arm overhead for a deep lat stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/revolved-side-angle.jpg',
    category: 'Lats'
  },
  {
    id: 'side-angle-lats',
    name: 'Side Angle Pose (Lats Focus)',
    description: 'A standing pose that stretches the lats, hips, and side body.',
    benefits: [
      'Stretches lats and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Bend one knee and place forearm on thigh',
      'Reach top arm overhead for a deep lat stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-angle.jpg',
    category: 'Lats'
  },
  // --- LATS YOGA POSES END ---
  // --- SHOULDERS YOGA POSES START ---
  {
    id: 'downward-dog-shoulders',
    name: 'Downward-Facing Dog (Shoulders Focus)',
    description: 'A foundational pose that stretches and strengthens the shoulders and upper back.',
    benefits: [
      'Stretches shoulders and upper back',
      'Strengthens arms',
      'Improves posture',
      'Relieves tension',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back',
      'Press hands into the mat and lengthen through the arms',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/downward-dog.jpg',
    category: 'Shoulders'
  },
  {
    id: 'puppy-pose-shoulders',
    name: 'Puppy Pose (Shoulders Focus)',
    description: 'A heart-opening pose that stretches the shoulders, chest, and upper back.',
    benefits: [
      'Stretches shoulders and chest',
      'Opens upper back',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Shoulders'
  },
  {
    id: 'thread-the-needle-shoulders',
    name: 'Thread the Needle (Shoulders Focus)',
    description: 'A gentle twist that stretches the shoulders, upper back, and neck.',
    benefits: [
      'Stretches shoulders and upper back',
      'Improves spinal mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Shoulders'
  },
  {
    id: 'eagle-arms-shoulders',
    name: 'Eagle Arms (Shoulders Focus)',
    description: 'A pose that wraps the arms to stretch and activate the shoulders and upper back.',
    benefits: [
      'Stretches shoulders and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms, bringing palms to touch',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/eagle-arms.jpg',
    category: 'Shoulders'
  },
  {
    id: 'cow-face-arms-shoulders',
    name: 'Cow Face Arms (Shoulders Focus)',
    description: 'A seated pose that stretches the shoulders by reaching one arm overhead and the other behind the back.',
    benefits: [
      'Stretches shoulders and triceps',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/cow-face-arms.jpg',
    category: 'Shoulders'
  },
  {
    id: 'shoulder-stand-shoulders',
    name: 'Shoulder Stand (Shoulders Focus)',
    description: 'An inversion that strengthens and stretches the shoulders and upper back.',
    benefits: [
      'Strengthens shoulders and upper back',
      'Improves circulation',
      'Relieves tension',
      'Enhances balance',
      'Calms the mind'
    ],
    instructions: [
      'Lie on your back',
      'Lift legs overhead and support lower back with hands',
      'Stack hips over shoulders',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/shoulder-stand.jpg',
    category: 'Shoulders'
  },
  {
    id: 'reverse-tabletop-shoulders',
    name: 'Reverse Tabletop (Shoulders Focus)',
    description: 'A pose that strengthens the shoulders, arms, and core while opening the chest.',
    benefits: [
      'Strengthens shoulders and arms',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Keep arms straight and squeeze shoulder blades together',
      'Hold for 5-10 breaths',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Shoulders'
  },
  {
    id: 'plank-shoulders',
    name: 'Plank Pose (Shoulders Focus)',
    description: 'A core-strengthening pose that builds shoulder and arm stability.',
    benefits: [
      'Strengthens shoulders and arms',
      'Improves posture',
      'Builds core strength',
      'Enhances balance',
      'Tones upper body'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage shoulders and core',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/plank.jpg',
    category: 'Shoulders'
  },
  {
    id: 'dolphin-pose-shoulders',
    name: 'Dolphin Pose (Shoulders Focus)',
    description: 'A forearm-based inversion that builds shoulder and upper back strength.',
    benefits: [
      'Strengthens shoulders and upper back',
      'Improves upper body stability',
      'Stretches hamstrings and calves',
      'Prepares for more advanced inversions',
      'Relieves tension in the neck and back'
    ],
    instructions: [
      'Start on hands and knees, lower forearms to the mat',
      'Tuck toes and lift hips up and back',
      'Keep forearms parallel and press down through elbows',
      'Engage shoulders to support the pose',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/dolphin-pose.jpg',
    category: 'Shoulders'
  },
  {
    id: 'side-plank-shoulders',
    name: 'Side Plank (Shoulders Focus)',
    description: 'A balancing pose that strengthens the shoulders, obliques, and arms.',
    benefits: [
      'Strengthens shoulders and core',
      'Improves balance',
      'Engages arms and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage shoulders to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Shoulders'
  },
  {
    id: 'upward-plank-shoulders',
    name: 'Upward Plank Pose (Shoulders Focus)',
    description: 'A challenging pose that targets the shoulders, triceps, and entire front body.',
    benefits: [
      'Strengthens shoulders, triceps, and arms',
      'Stretches chest and front ankles',
      'Improves arm and wrist strength',
      'Builds core stability',
      'Enhances overall endurance'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips, fingers pointing toward feet',
      'Press into hands and feet to lift hips and torso upward',
      'Keep legs straight and point toes',
      'Engage shoulders to keep arms strong',
      'Hold for 5-10 breaths, then lower down'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/upward-plank.jpg',
    category: 'Shoulders'
  },
  {
    id: 'reverse-prayer-shoulders',
    name: 'Reverse Prayer Pose (Shoulders Focus)',
    description: 'A standing pose that deeply stretches the shoulders and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Deeply stretches shoulders and forearms',
      'Opens chest and upper back',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Shoulders'
  },
  {
    id: 'shoulder-opener-wall',
    name: 'Shoulder Opener at Wall',
    description: 'A wall-assisted stretch that opens the shoulders and chest.',
    benefits: [
      'Stretches shoulders and chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand facing a wall',
      'Place hands on wall at shoulder height',
      'Step back and lower chest toward the floor',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-opener-wall.jpg',
    category: 'Shoulders'
  },
  {
    id: 'garland-pose-shoulders',
    name: 'Garland Pose (Shoulders Focus)',
    description: 'A deep squat that stretches the shoulders and upper back as you reach arms forward.',
    benefits: [
      'Stretches shoulders and upper back',
      'Opens hips',
      'Improves posture',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Squat with feet wider than hips',
      'Bring palms together at chest',
      'Reach arms forward and round upper back',
      'Relax head and neck',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/garland-pose.jpg',
    category: 'Shoulders'
  },
  {
    id: 'tabletop-shoulder-taps',
    name: 'Tabletop Shoulder Taps',
    description: 'A dynamic tabletop pose that incorporates shoulder taps for added stability and strength.',
    benefits: [
      'Strengthens shoulders and core',
      'Improves balance',
      'Engages arms',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Lift one hand to tap opposite shoulder',
      'Alternate sides for several reps',
      'Keep hips stable throughout'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-shoulder-taps.jpg',
    category: 'Shoulders'
  },
  {
    id: 'shoulder-flossing',
    name: 'Shoulder Flossing',
    description: 'A mobility drill that increases shoulder flexibility and range of motion.',
    benefits: [
      'Increases shoulder mobility',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Hold a strap or towel with both hands',
      'Lift arms overhead and behind',
      'Bring arms back to front',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-flossing.jpg',
    category: 'Shoulders'
  },
  {
    id: 'sphinx-shoulders',
    name: 'Sphinx Pose (Shoulders Focus)',
    description: 'A gentle backbend that stretches and activates the shoulders as you press the forearms into the mat.',
    benefits: [
      'Stretches shoulders and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging shoulders',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Shoulders'
  },
  {
    id: 'shoulder-bridge',
    name: 'Shoulder Bridge',
    description: 'A bridge variation that strengthens the shoulders, glutes, and back.',
    benefits: [
      'Strengthens shoulders and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Clasp hands under back and squeeze shoulders together',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/shoulder-bridge.jpg',
    category: 'Shoulders'
  },
  // --- SHOULDERS YOGA POSES END ---
  // --- LATERAL DELTOID YOGA POSES START ---
  {
    id: 'side-plank-lateral-deltoid',
    name: 'Side Plank (Lateral Deltoid Focus)',
    description: 'A balancing pose that strongly activates the lateral deltoids and improves shoulder stability.',
    benefits: [
      'Strengthens lateral deltoids and core',
      'Improves balance',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage lateral deltoids to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'half-moon-lateral-deltoid',
    name: 'Half Moon Pose (Lateral Deltoid Focus)',
    description: 'A balancing pose that stretches and activates the lateral deltoids and side body.',
    benefits: [
      'Stretches lateral deltoids and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Reach one hand to the floor and lift other leg up',
      'Reach top arm overhead for a deep lateral deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'gate-pose-lateral-deltoid',
    name: 'Gate Pose (Lateral Deltoid Focus)',
    description: 'A kneeling side stretch that targets the lateral deltoids and opens the side body.',
    benefits: [
      'Stretches lateral deltoids and obliques',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the lateral deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/gate-pose.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'seated-side-bend-lateral-deltoid',
    name: 'Seated Side Bend (Lateral Deltoid Focus)',
    description: 'A seated pose that stretches the lateral deltoids and side body.',
    benefits: [
      'Stretches lateral deltoids and spine',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Sit cross-legged or in staff pose',
      'Reach one arm overhead and lean to the side',
      'Feel the stretch along the lateral deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/seated-side-bend.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'banana-pose-lateral-deltoid',
    name: 'Banana Pose (Lateral Deltoid Focus)',
    description: 'A supine side stretch that targets the lateral deltoids and improves lateral flexibility.',
    benefits: [
      'Stretches lateral deltoids and obliques',
      'Improves lateral flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, arms overhead',
      'Walk feet and hands to one side, forming a banana shape',
      'Feel the stretch along the lateral deltoid',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/banana-pose.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'thread-the-needle-lateral-deltoid',
    name: 'Thread the Needle (Lateral Deltoid Focus)',
    description: 'A gentle twist that stretches the lateral deltoids, shoulders, and upper back.',
    benefits: [
      'Stretches lateral deltoids and shoulders',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Walk left hand forward for deeper lateral deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'puppy-pose-lateral-deltoid',
    name: 'Puppy Pose (Lateral Deltoid Focus)',
    description: 'A heart-opening pose that stretches the lateral deltoids, chest, and shoulders.',
    benefits: [
      'Stretches lateral deltoids and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Walk hands to one side for deeper lateral deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'reclined-twist-lateral-deltoid',
    name: 'Reclined Twist (Lateral Deltoid Focus)',
    description: 'A gentle supine twist that stretches the lateral deltoids and spine.',
    benefits: [
      'Stretches lateral deltoids and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Reach top arm overhead for a deep lateral deltoid stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reclined-twist.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'cat-cow-lateral-deltoid',
    name: 'Cat-Cow Pose (Lateral Deltoid Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the lateral deltoids and spine.',
    benefits: [
      'Mobilizes lateral deltoids and spine',
      'Relieves back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Walk hands to one side for deeper lateral deltoid stretch',
      'Repeat for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cat-cow.jpg',
    category: 'Lateral Deltoid'
  },
  // 10 more poses below
  {
    id: 'reverse-tabletop-lateral-deltoid',
    name: 'Reverse Tabletop (Lateral Deltoid Focus)',
    description: 'A pose that strengthens the lateral deltoids, arms, and core while opening the chest.',
    benefits: [
      'Strengthens lateral deltoids and arms',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Engage lateral deltoids and hold',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'plank-lateral-deltoid',
    name: 'Plank Pose (Lateral Deltoid Focus)',
    description: 'A core-strengthening pose that builds lateral deltoid and arm stability.',
    benefits: [
      'Strengthens lateral deltoids and arms',
      'Improves posture',
      'Builds core strength',
      'Enhances balance',
      'Tones upper body'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage lateral deltoids and core',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/plank.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'shoulder-flossing-lateral-deltoid',
    name: 'Shoulder Flossing (Lateral Deltoid Focus)',
    description: 'A mobility drill that increases lateral deltoid flexibility and range of motion.',
    benefits: [
      'Increases lateral deltoid mobility',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Hold a strap or towel with both hands',
      'Lift arms overhead and behind',
      'Bring arms back to front',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-flossing.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'tabletop-lateral-deltoid-raise',
    name: 'Tabletop Lateral Deltoid Raise',
    description: 'A dynamic tabletop pose that incorporates lateral deltoid raises for added shoulder strength.',
    benefits: [
      'Strengthens lateral deltoids and core',
      'Improves balance',
      'Engages arms',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Lift one arm out to the side',
      'Alternate sides for several reps',
      'Keep hips stable throughout'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-lateral-raise.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'sphinx-lateral-deltoid',
    name: 'Sphinx Pose (Lateral Deltoid Focus)',
    description: 'A gentle backbend that stretches and activates the lateral deltoids as you press the forearms into the mat.',
    benefits: [
      'Stretches lateral deltoids and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging lateral deltoids',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'garland-pose-lateral-deltoid',
    name: 'Garland Pose (Lateral Deltoid Focus)',
    description: 'A deep squat that stretches the lateral deltoids and upper back as you reach arms forward.',
    benefits: [
      'Stretches lateral deltoids and upper back',
      'Opens hips',
      'Improves posture',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Squat with feet wider than hips',
      'Bring palms together at chest',
      'Reach arms forward and round upper back',
      'Relax head and neck',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/garland-pose.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'reverse-prayer-lateral-deltoid',
    name: 'Reverse Prayer Pose (Lateral Deltoid Focus)',
    description: 'A standing pose that deeply stretches the lateral deltoids and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Deeply stretches lateral deltoids and forearms',
      'Opens chest and upper back',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'shoulder-opener-wall-lateral-deltoid',
    name: 'Shoulder Opener at Wall (Lateral Deltoid Focus)',
    description: 'A wall-assisted stretch that opens the lateral deltoids and chest.',
    benefits: [
      'Stretches lateral deltoids and chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand facing a wall',
      'Place hands on wall at shoulder height',
      'Step back and lower chest toward the floor',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-opener-wall.jpg',
    category: 'Lateral Deltoid'
  },
  {
    id: 'shoulder-bridge-lateral-deltoid',
    name: 'Shoulder Bridge (Lateral Deltoid Focus)',
    description: 'A bridge variation that strengthens the lateral deltoids, glutes, and back.',
    benefits: [
      'Strengthens lateral deltoids and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Clasp hands under back and squeeze lateral deltoids together',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/shoulder-bridge.jpg',
    category: 'Lateral Deltoid'
  },
  // --- LATERAL DELTOID YOGA POSES END ---
  // --- ANTERIOR DELTOID YOGA POSES START ---
  {
    id: 'plank-anterior-deltoid',
    name: 'Plank Pose (Anterior Deltoid Focus)',
    description: 'A core-strengthening pose that builds anterior deltoid and arm stability.',
    benefits: [
      'Strengthens anterior deltoids and arms',
      'Improves posture',
      'Builds core strength',
      'Enhances balance',
      'Tones upper body'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage anterior deltoids and core',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/plank.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'downward-dog-anterior-deltoid',
    name: 'Downward-Facing Dog (Anterior Deltoid Focus)',
    description: 'A foundational pose that stretches and strengthens the anterior deltoids and upper back.',
    benefits: [
      'Stretches anterior deltoids and upper back',
      'Strengthens arms',
      'Improves posture',
      'Relieves tension',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back',
      'Press hands into the mat and lengthen through the arms',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/downward-dog.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'dolphin-pose-anterior-deltoid',
    name: 'Dolphin Pose (Anterior Deltoid Focus)',
    description: 'A forearm-based inversion that builds anterior deltoid and upper back strength.',
    benefits: [
      'Strengthens anterior deltoids and upper back',
      'Improves upper body stability',
      'Stretches hamstrings and calves',
      'Prepares for more advanced inversions',
      'Relieves tension in the neck and back'
    ],
    instructions: [
      'Start on hands and knees, lower forearms to the mat',
      'Tuck toes and lift hips up and back',
      'Keep forearms parallel and press down through elbows',
      'Engage anterior deltoids to support the pose',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/dolphin-pose.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'upward-plank-anterior-deltoid',
    name: 'Upward Plank Pose (Anterior Deltoid Focus)',
    description: 'A challenging pose that targets the anterior deltoids, triceps, and entire front body.',
    benefits: [
      'Strengthens anterior deltoids, triceps, and arms',
      'Stretches chest and front ankles',
      'Improves arm and wrist strength',
      'Builds core stability',
      'Enhances overall endurance'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips, fingers pointing toward feet',
      'Press into hands and feet to lift hips and torso upward',
      'Keep legs straight and point toes',
      'Engage anterior deltoids to keep arms strong',
      'Hold for 5-10 breaths, then lower down'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/upward-plank.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'reverse-tabletop-anterior-deltoid',
    name: 'Reverse Tabletop (Anterior Deltoid Focus)',
    description: 'A pose that strengthens the anterior deltoids, arms, and core while opening the chest.',
    benefits: [
      'Strengthens anterior deltoids and arms',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Engage anterior deltoids and hold',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'shoulder-flossing-anterior-deltoid',
    name: 'Shoulder Flossing (Anterior Deltoid Focus)',
    description: 'A mobility drill that increases anterior deltoid flexibility and range of motion.',
    benefits: [
      'Increases anterior deltoid mobility',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Hold a strap or towel with both hands',
      'Lift arms overhead and behind',
      'Bring arms back to front',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-flossing.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'tabletop-anterior-deltoid-raise',
    name: 'Tabletop Anterior Deltoid Raise',
    description: 'A dynamic tabletop pose that incorporates anterior deltoid raises for added shoulder strength.',
    benefits: [
      'Strengthens anterior deltoids and core',
      'Improves balance',
      'Engages arms',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Lift one arm forward',
      'Alternate sides for several reps',
      'Keep hips stable throughout'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-anterior-raise.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'sphinx-anterior-deltoid',
    name: 'Sphinx Pose (Anterior Deltoid Focus)',
    description: 'A gentle backbend that stretches and activates the anterior deltoids as you press the forearms into the mat.',
    benefits: [
      'Stretches anterior deltoids and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging anterior deltoids',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'garland-pose-anterior-deltoid',
    name: 'Garland Pose (Anterior Deltoid Focus)',
    description: 'A deep squat that stretches the anterior deltoids and upper back as you reach arms forward.',
    benefits: [
      'Stretches anterior deltoids and upper back',
      'Opens hips',
      'Improves posture',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Squat with feet wider than hips',
      'Bring palms together at chest',
      'Reach arms forward and round upper back',
      'Relax head and neck',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/garland-pose.jpg',
    category: 'Anterior Deltoid'
  },
  // 10 more poses below
  {
    id: 'reverse-prayer-anterior-deltoid',
    name: 'Reverse Prayer Pose (Anterior Deltoid Focus)',
    description: 'A standing pose that deeply stretches the anterior deltoids and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Deeply stretches anterior deltoids and forearms',
      'Opens chest and upper back',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'shoulder-opener-wall-anterior-deltoid',
    name: 'Shoulder Opener at Wall (Anterior Deltoid Focus)',
    description: 'A wall-assisted stretch that opens the anterior deltoids and chest.',
    benefits: [
      'Stretches anterior deltoids and chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand facing a wall',
      'Place hands on wall at shoulder height',
      'Step back and lower chest toward the floor',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-opener-wall.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'shoulder-bridge-anterior-deltoid',
    name: 'Shoulder Bridge (Anterior Deltoid Focus)',
    description: 'A bridge variation that strengthens the anterior deltoids, glutes, and back.',
    benefits: [
      'Strengthens anterior deltoids and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Clasp hands under back and squeeze anterior deltoids together',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/shoulder-bridge.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'side-plank-anterior-deltoid',
    name: 'Side Plank (Anterior Deltoid Focus)',
    description: 'A balancing pose that strongly activates the anterior deltoids and improves shoulder stability.',
    benefits: [
      'Strengthens anterior deltoids and core',
      'Improves balance',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage anterior deltoids to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'half-moon-anterior-deltoid',
    name: 'Half Moon Pose (Anterior Deltoid Focus)',
    description: 'A balancing pose that stretches and activates the anterior deltoids and side body.',
    benefits: [
      'Stretches anterior deltoids and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Reach one hand to the floor and lift other leg up',
      'Reach top arm overhead for a deep anterior deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'gate-pose-anterior-deltoid',
    name: 'Gate Pose (Anterior Deltoid Focus)',
    description: 'A kneeling side stretch that targets the anterior deltoids and opens the side body.',
    benefits: [
      'Stretches anterior deltoids and obliques',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the anterior deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/gate-pose.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'seated-side-bend-anterior-deltoid',
    name: 'Seated Side Bend (Anterior Deltoid Focus)',
    description: 'A seated pose that stretches the anterior deltoids and side body.',
    benefits: [
      'Stretches anterior deltoids and spine',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Sit cross-legged or in staff pose',
      'Reach one arm overhead and lean to the side',
      'Feel the stretch along the anterior deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/seated-side-bend.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'banana-pose-anterior-deltoid',
    name: 'Banana Pose (Anterior Deltoid Focus)',
    description: 'A supine side stretch that targets the anterior deltoids and improves lateral flexibility.',
    benefits: [
      'Stretches anterior deltoids and obliques',
      'Improves lateral flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, arms overhead',
      'Walk feet and hands to one side, forming a banana shape',
      'Feel the stretch along the anterior deltoid',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/banana-pose.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'thread-the-needle-anterior-deltoid',
    name: 'Thread the Needle (Anterior Deltoid Focus)',
    description: 'A gentle twist that stretches the anterior deltoids, shoulders, and upper back.',
    benefits: [
      'Stretches anterior deltoids and shoulders',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Walk left hand forward for deeper anterior deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'reclined-twist-anterior-deltoid',
    name: 'Reclined Twist (Anterior Deltoid Focus)',
    description: 'A gentle supine twist that stretches the anterior deltoids and spine.',
    benefits: [
      'Stretches anterior deltoids and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Reach top arm overhead for a deep anterior deltoid stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reclined-twist.jpg',
    category: 'Anterior Deltoid'
  },
  {
    id: 'cat-cow-anterior-deltoid',
    name: 'Cat-Cow Pose (Anterior Deltoid Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the anterior deltoids and spine.',
    benefits: [
      'Mobilizes anterior deltoids and spine',
      'Relieves back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Walk hands to one side for deeper anterior deltoid stretch',
      'Repeat for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cat-cow.jpg',
    category: 'Anterior Deltoid'
  },
  // --- ANTERIOR DELTOID YOGA POSES END ---
  // --- POSTERIOR DELTOID YOGA POSES START ---
  {
    id: 'reverse-fly-posterior-deltoid',
    name: 'Reverse Fly (Posterior Deltoid Focus)',
    description: 'A pose that mimics the reverse fly movement, activating the posterior deltoids and upper back.',
    benefits: [
      'Strengthens posterior deltoids and upper back',
      'Improves posture',
      'Enhances shoulder stability',
      'Relieves tension',
      'Builds functional strength'
    ],
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge forward at the hips',
      'Extend arms out to the sides, squeezing shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-fly.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'childs-pose-posterior-deltoid',
    name: "Child's Pose (Posterior Deltoid Focus)",
    description: 'A gentle resting pose that stretches the posterior deltoids and relieves tension in the upper back.',
    benefits: [
      'Stretches posterior deltoids and spine',
      'Relieves upper back tension',
      'Calms the mind',
      'Improves flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on the floor and sit back on your heels',
      'Fold forward, extending arms in front',
      'Walk hands to one side to deepen the posterior deltoid stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/childs-pose.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'thread-the-needle-posterior-deltoid',
    name: 'Thread the Needle (Posterior Deltoid Focus)',
    description: 'A gentle twist that stretches the posterior deltoids, shoulders, and upper back.',
    benefits: [
      'Stretches posterior deltoids and shoulders',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Walk left hand forward for deeper posterior deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'eagle-arms-posterior-deltoid',
    name: 'Eagle Arms (Posterior Deltoid Focus)',
    description: 'A pose that wraps the arms to stretch and activate the posterior deltoids and upper back.',
    benefits: [
      'Stretches posterior deltoids and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms, bringing palms to touch',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/eagle-arms.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'cow-face-arms-posterior-deltoid',
    name: 'Cow Face Arms (Posterior Deltoid Focus)',
    description: 'A seated pose that stretches the posterior deltoids by reaching one arm overhead and the other behind the back.',
    benefits: [
      'Stretches posterior deltoids and triceps',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/cow-face-arms.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'cat-cow-posterior-deltoid',
    name: 'Cat-Cow Pose (Posterior Deltoid Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the posterior deltoids and spine.',
    benefits: [
      'Mobilizes posterior deltoids and spine',
      'Relieves back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Walk hands to one side for deeper posterior deltoid stretch',
      'Repeat for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cat-cow.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'puppy-pose-posterior-deltoid',
    name: 'Puppy Pose (Posterior Deltoid Focus)',
    description: 'A heart-opening pose that stretches the posterior deltoids, chest, and shoulders.',
    benefits: [
      'Stretches posterior deltoids and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Walk hands to one side for deeper posterior deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'reclined-twist-posterior-deltoid',
    name: 'Reclined Twist (Posterior Deltoid Focus)',
    description: 'A gentle supine twist that stretches the posterior deltoids and spine.',
    benefits: [
      'Stretches posterior deltoids and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Reach top arm overhead for a deep posterior deltoid stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reclined-twist.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'reverse-tabletop-posterior-deltoid',
    name: 'Reverse Tabletop (Posterior Deltoid Focus)',
    description: 'A pose that strengthens the posterior deltoids, arms, and core while opening the chest.',
    benefits: [
      'Strengthens posterior deltoids and arms',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Engage posterior deltoids and hold',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'plank-posterior-deltoid',
    name: 'Plank Pose (Posterior Deltoid Focus)',
    description: 'A core-strengthening pose that builds posterior deltoid and arm stability.',
    benefits: [
      'Strengthens posterior deltoids and arms',
      'Improves posture',
      'Builds core strength',
      'Enhances balance',
      'Tones upper body'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage posterior deltoids and core',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/plank.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'shoulder-flossing-posterior-deltoid',
    name: 'Shoulder Flossing (Posterior Deltoid Focus)',
    description: 'A mobility drill that increases posterior deltoid flexibility and range of motion.',
    benefits: [
      'Increases posterior deltoid mobility',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Hold a strap or towel with both hands',
      'Lift arms overhead and behind',
      'Bring arms back to front',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-flossing.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'tabletop-posterior-deltoid-raise',
    name: 'Tabletop Posterior Deltoid Raise',
    description: 'A dynamic tabletop pose that incorporates posterior deltoid raises for added shoulder strength.',
    benefits: [
      'Strengthens posterior deltoids and core',
      'Improves balance',
      'Engages arms',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Lift one arm out to the side and slightly back',
      'Alternate sides for several reps',
      'Keep hips stable throughout'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-posterior-raise.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'sphinx-posterior-deltoid',
    name: 'Sphinx Pose (Posterior Deltoid Focus)',
    description: 'A gentle backbend that stretches and activates the posterior deltoids as you press the forearms into the mat.',
    benefits: [
      'Stretches posterior deltoids and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging posterior deltoids',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'garland-pose-posterior-deltoid',
    name: 'Garland Pose (Posterior Deltoid Focus)',
    description: 'A deep squat that stretches the posterior deltoids and upper back as you reach arms forward.',
    benefits: [
      'Stretches posterior deltoids and upper back',
      'Opens hips',
      'Improves posture',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Squat with feet wider than hips',
      'Bring palms together at chest',
      'Reach arms forward and round upper back',
      'Relax head and neck',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/garland-pose.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'reverse-prayer-posterior-deltoid',
    name: 'Reverse Prayer Pose (Posterior Deltoid Focus)',
    description: 'A standing pose that deeply stretches the posterior deltoids and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Deeply stretches posterior deltoids and forearms',
      'Opens chest and upper back',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'shoulder-opener-wall-posterior-deltoid',
    name: 'Shoulder Opener at Wall (Posterior Deltoid Focus)',
    description: 'A wall-assisted stretch that opens the posterior deltoids and chest.',
    benefits: [
      'Stretches posterior deltoids and chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand facing a wall',
      'Place hands on wall at shoulder height',
      'Step back and lower chest toward the floor',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-opener-wall.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'shoulder-bridge-posterior-deltoid',
    name: 'Shoulder Bridge (Posterior Deltoid Focus)',
    description: 'A bridge variation that strengthens the posterior deltoids, glutes, and back.',
    benefits: [
      'Strengthens posterior deltoids and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Clasp hands under back and squeeze posterior deltoids together',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/shoulder-bridge.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'side-plank-posterior-deltoid',
    name: 'Side Plank (Posterior Deltoid Focus)',
    description: 'A balancing pose that strongly activates the posterior deltoids and improves shoulder stability.',
    benefits: [
      'Strengthens posterior deltoids and core',
      'Improves balance',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage posterior deltoids to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'half-moon-posterior-deltoid',
    name: 'Half Moon Pose (Posterior Deltoid Focus)',
    description: 'A balancing pose that stretches and activates the posterior deltoids and side body.',
    benefits: [
      'Stretches posterior deltoids and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Reach one hand to the floor and lift other leg up',
      'Reach top arm overhead for a deep posterior deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'gate-pose-posterior-deltoid',
    name: 'Gate Pose (Posterior Deltoid Focus)',
    description: 'A kneeling side stretch that targets the posterior deltoids and opens the side body.',
    benefits: [
      'Stretches posterior deltoids and obliques',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the posterior deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/gate-pose.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'seated-side-bend-posterior-deltoid',
    name: 'Seated Side Bend (Posterior Deltoid Focus)',
    description: 'A seated pose that stretches the posterior deltoids and side body.',
    benefits: [
      'Stretches posterior deltoids and spine',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Sit cross-legged or in staff pose',
      'Reach one arm overhead and lean to the side',
      'Feel the stretch along the posterior deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/seated-side-bend.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'banana-pose-posterior-deltoid',
    name: 'Banana Pose (Posterior Deltoid Focus)',
    description: 'A supine side stretch that targets the posterior deltoids and improves lateral flexibility.',
    benefits: [
      'Stretches posterior deltoids and obliques',
      'Improves lateral flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, arms overhead',
      'Walk feet and hands to one side, forming a banana shape',
      'Feel the stretch along the posterior deltoid',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/banana-pose.jpg',
    category: 'Posterior Deltoid'
  },
  // --- POSTERIOR DELTOID YOGA POSES END ---
  // --- TRICEPS YOGA POSES START ---
  {
    id: 'downward-dog-triceps',
    name: 'Downward Dog (Triceps Focus)',
    description: 'A classic yoga pose that stretches and strengthens the triceps as you press the arms into the mat.',
    benefits: [
      'Stretches triceps and shoulders',
      'Strengthens arms',
      'Improves flexibility',
      'Relieves tension',
      'Enhances posture'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back, straightening arms and legs',
      'Press hands firmly into the mat, engaging triceps',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/downward-dog.jpg',
    category: 'Triceps'
  },
  {
    id: 'plank-triceps',
    name: 'Plank Pose (Triceps Focus)',
    description: 'A core-strengthening pose that builds triceps and arm stability.',
    benefits: [
      'Strengthens triceps and arms',
      'Builds core strength',
      'Improves posture',
      'Enhances balance',
      'Tones upper body'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage triceps and core',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/plank.jpg',
    category: 'Triceps'
  },
  {
    id: 'chaturanga-triceps',
    name: 'Chaturanga (Triceps Focus)',
    description: 'A low plank pose that deeply activates the triceps and core.',
    benefits: [
      'Strengthens triceps and chest',
      'Builds arm endurance',
      'Improves core stability',
      'Enhances upper body strength',
      'Tones shoulders'
    ],
    instructions: [
      'From plank, lower halfway down, elbows close to ribs',
      'Keep body in straight line',
      'Engage triceps and hold',
      'Push back up to plank to release'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/chaturanga.jpg',
    category: 'Triceps'
  },
  {
    id: 'dolphin-pose-triceps',
    name: 'Dolphin Pose (Triceps Focus)',
    description: 'A forearm-based inversion that stretches and strengthens the triceps and shoulders.',
    benefits: [
      'Stretches triceps and shoulders',
      'Strengthens arms',
      'Improves balance',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Start on forearms and knees',
      'Lift hips up and back, keeping forearms on the mat',
      'Press forearms and hands into the mat, engaging triceps',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/dolphin-pose.jpg',
    category: 'Triceps'
  },
  {
    id: 'upward-plank-triceps',
    name: 'Upward Plank (Triceps Focus)',
    description: 'A reverse plank that strengthens the triceps, shoulders, and core.',
    benefits: [
      'Strengthens triceps and shoulders',
      'Opens chest',
      'Improves posture',
      'Engages core',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips',
      'Press into hands and lift hips up',
      'Engage triceps to keep arms straight',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/upward-plank.jpg',
    category: 'Triceps'
  },
  {
    id: 'side-plank-triceps',
    name: 'Side Plank (Triceps Focus)',
    description: 'A balancing pose that activates the triceps and improves arm stability.',
    benefits: [
      'Strengthens triceps and core',
      'Improves balance',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage triceps to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Triceps'
  },
  {
    id: 'cobra-triceps',
    name: 'Cobra Pose (Triceps Focus)',
    description: 'A gentle backbend that stretches and activates the triceps as you press into the mat.',
    benefits: [
      'Stretches triceps and chest',
      'Strengthens arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest',
      'Engage triceps to straighten arms',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cobra.jpg',
    category: 'Triceps'
  },
  {
    id: 'upward-dog-triceps',
    name: 'Upward Dog (Triceps Focus)',
    description: 'A backbend that stretches and strengthens the triceps and chest.',
    benefits: [
      'Stretches triceps and chest',
      'Strengthens arms',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest and thighs off the mat',
      'Engage triceps to keep arms straight',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/upward-dog.jpg',
    category: 'Triceps'
  },
  {
    id: 'reverse-tabletop-triceps',
    name: 'Reverse Tabletop (Triceps Focus)',
    description: 'A pose that strengthens the triceps, arms, and core while opening the chest.',
    benefits: [
      'Strengthens triceps and arms',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Engage triceps and hold',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Triceps'
  },
  {
    id: 'crow-pose-triceps',
    name: 'Crow Pose (Triceps Focus)',
    description: 'An arm balance that builds triceps strength and improves focus.',
    benefits: [
      'Strengthens triceps and wrists',
      'Improves balance',
      'Builds core strength',
      'Enhances focus',
      'Tones upper body'
    ],
    instructions: [
      'Squat down, place hands on the mat',
      'Bend elbows and lift feet off the ground, balancing on hands',
      'Engage triceps to support the pose',
      'Hold for a few breaths'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/crow-pose.jpg',
    category: 'Triceps'
  },
  {
    id: 'eight-angle-triceps',
    name: 'Eight Angle Pose (Triceps Focus)',
    description: 'An advanced arm balance that deeply activates the triceps and core.',
    benefits: [
      'Strengthens triceps and core',
      'Improves balance',
      'Enhances arm endurance',
      'Builds focus',
      'Tones upper body'
    ],
    instructions: [
      'Sit with legs extended, bend knees and hook right leg over right arm',
      'Plant hands on the mat and lift hips',
      'Engage triceps to support the pose',
      'Hold for a few breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/eight-angle.jpg',
    category: 'Triceps'
  },
  {
    id: 'side-crow-triceps',
    name: 'Side Crow (Triceps Focus)',
    description: 'A twisting arm balance that builds triceps and core strength.',
    benefits: [
      'Strengthens triceps and core',
      'Improves balance',
      'Enhances focus',
      'Tones upper body',
      'Builds arm endurance'
    ],
    instructions: [
      'Squat and twist knees to one side',
      'Place hands on the mat, shoulder-width apart',
      'Lift feet off the ground, balancing on hands',
      'Engage triceps to support the pose',
      'Hold for a few breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/side-crow.jpg',
    category: 'Triceps'
  },
  {
    id: 'upward-bow-triceps',
    name: 'Upward Bow (Triceps Focus)',
    description: 'A deep backbend that stretches and strengthens the triceps and shoulders.',
    benefits: [
      'Stretches triceps and chest',
      'Strengthens arms',
      'Improves flexibility',
      'Opens chest',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, bend knees and place feet on the mat',
      'Place hands by ears, fingers pointing toward shoulders',
      'Press into hands and feet to lift body up',
      'Engage triceps to keep arms straight',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/upward-bow.jpg',
    category: 'Triceps'
  },
  {
    id: 'tabletop-triceps-raise',
    name: 'Tabletop Triceps Raise',
    description: 'A dynamic tabletop pose that incorporates triceps raises for added arm strength.',
    benefits: [
      'Strengthens triceps and core',
      'Improves balance',
      'Engages arms',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Bend elbows to lower chest toward the mat',
      'Press back up, engaging triceps',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-triceps-raise.jpg',
    category: 'Triceps'
  },
  {
    id: 'cobra-pushup-triceps',
    name: 'Cobra Pushup (Triceps Focus)',
    description: 'A pushup variation that targets the triceps and chest.',
    benefits: [
      'Strengthens triceps and chest',
      'Improves arm endurance',
      'Builds upper body strength',
      'Enhances flexibility',
      'Tones arms'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest, then lower back down',
      'Engage triceps throughout the movement',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cobra-pushup.jpg',
    category: 'Triceps'
  },
  {
    id: 'puppy-pose-triceps',
    name: 'Puppy Pose (Triceps Focus)',
    description: 'A heart-opening pose that stretches the triceps, chest, and shoulders.',
    benefits: [
      'Stretches triceps and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Bend elbows and bring forearms to the mat',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Triceps'
  },
  {
    id: 'shoulder-bridge-triceps',
    name: 'Shoulder Bridge (Triceps Focus)',
    description: 'A bridge variation that strengthens the triceps, glutes, and back.',
    benefits: [
      'Strengthens triceps and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Press arms into the mat, engaging triceps',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/shoulder-bridge.jpg',
    category: 'Triceps'
  },
  {
    id: 'reverse-prayer-triceps',
    name: 'Reverse Prayer Pose (Triceps Focus)',
    description: 'A standing pose that stretches the triceps and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Stretches triceps and forearms',
      'Opens chest and upper back',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Triceps'
  },
  {
    id: 'eagle-arms-triceps',
    name: 'Eagle Arms (Triceps Focus)',
    description: 'A pose that wraps the arms to stretch and activate the triceps and upper back.',
    benefits: [
      'Stretches triceps and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms, bringing palms to touch',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/eagle-arms.jpg',
    category: 'Triceps'
  },
  {
    id: 'cow-face-arms-triceps',
    name: 'Cow Face Arms (Triceps Focus)',
    description: 'A seated pose that stretches the triceps by reaching one arm overhead and the other behind the back.',
    benefits: [
      'Stretches triceps and shoulders',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/cow-face-arms.jpg',
    category: 'Triceps'
  },
  // --- TRICEPS YOGA POSES END ---
  // --- QUADS YOGA POSES START ---
  {
    id: 'warrior-i-quads',
    name: 'Warrior I',
    description: 'A powerful standing pose that builds strength and stability in the quads and legs.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves balance',
      'Enhances hip flexibility',
      'Builds lower body endurance',
      'Opens chest and shoulders'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Turn right foot out, left foot slightly in',
      'Bend right knee over ankle',
      'Reach arms overhead',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/warrior-i.jpg',
    category: 'Quads'
  },
  {
    id: 'warrior-ii-quads',
    name: 'Warrior II',
    description: 'A classic pose that deeply engages the quads and builds lower body strength.',
    benefits: [
      'Strengthens quads and inner thighs',
      'Improves stamina',
      'Opens hips',
      'Enhances focus',
      'Builds balance'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Turn right foot out, left foot slightly in',
      'Bend right knee over ankle',
      'Extend arms parallel to the floor',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/warrior-ii.jpg',
    category: 'Quads'
  },
  {
    id: 'crescent-lunge-quads',
    name: 'Crescent Lunge',
    description: 'A dynamic lunge that targets the quads and hip flexors.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves hip flexibility',
      'Builds balance',
      'Opens chest',
      'Enhances lower body endurance'
    ],
    instructions: [
      'Step right foot forward, bend knee to 90 degrees',
      'Lift left heel, keeping left leg straight',
      'Reach arms overhead',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/crescent-lunge.jpg',
    category: 'Quads'
  },
  {
    id: 'chair-pose-quads',
    name: 'Chair Pose',
    description: 'A squat-like pose that powerfully activates the quads and glutes.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves posture',
      'Builds lower body endurance',
      'Engages core',
      'Enhances focus'
    ],
    instructions: [
      'Stand with feet together',
      'Bend knees and lower hips as if sitting in a chair',
      'Reach arms overhead',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/chair-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'goddess-pose-quads',
    name: 'Goddess Pose',
    description: 'A wide-legged squat that targets the quads, inner thighs, and glutes.',
    benefits: [
      'Strengthens quads and inner thighs',
      'Opens hips',
      'Improves balance',
      'Builds lower body strength',
      'Enhances flexibility'
    ],
    instructions: [
      'Stand with feet wide apart, toes turned out',
      'Bend knees deeply, keeping them over ankles',
      'Bring arms to cactus position',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/goddess-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'high-lunge-quads',
    name: 'High Lunge',
    description: 'A standing lunge that strengthens the quads and improves balance.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves balance',
      'Opens hips',
      'Builds lower body endurance',
      'Enhances focus'
    ],
    instructions: [
      'Step right foot forward, bend knee to 90 degrees',
      'Keep left leg straight and strong',
      'Reach arms overhead',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/high-lunge.jpg',
    category: 'Quads'
  },
  {
    id: 'low-lunge-quads',
    name: 'Low Lunge',
    description: 'A gentle lunge that stretches and strengthens the quads and hip flexors.',
    benefits: [
      'Stretches and strengthens quads',
      'Opens hips',
      'Improves flexibility',
      'Relieves tension',
      'Builds balance'
    ],
    instructions: [
      'Step right foot forward, lower left knee to the mat',
      'Bend right knee to 90 degrees',
      'Reach arms overhead',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/low-lunge.jpg',
    category: 'Quads'
  },
  {
    id: 'triangle-pose-quads',
    name: 'Triangle Pose (Quads Focus)',
    description: 'A standing pose that stretches and strengthens the quads and legs.',
    benefits: [
      'Strengthens quads and hamstrings',
      'Improves balance',
      'Opens hips',
      'Enhances flexibility',
      'Builds lower body strength'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Turn right foot out, left foot slightly in',
      'Reach right hand toward right shin, left arm up',
      'Engage quads throughout',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/triangle-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'half-moon-quads',
    name: 'Half Moon Pose (Quads Focus)',
    description: 'A balancing pose that activates the quads and improves stability.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves balance',
      'Enhances flexibility',
      'Builds focus',
      'Tones lower body'
    ],
    instructions: [
      'Stand tall, shift weight to right leg',
      'Reach right hand to the floor, lift left leg up',
      'Engage quads to stabilize',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Quads'
  },
  {
    id: 'revolved-lunge-quads',
    name: 'Revolved Lunge',
    description: 'A twisting lunge that strengthens the quads and improves spinal mobility.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves spinal mobility',
      'Builds balance',
      'Opens chest',
      'Enhances focus'
    ],
    instructions: [
      'Step right foot forward, bend knee to 90 degrees',
      'Twist torso to the right, bringing left elbow outside right knee',
      'Reach arms apart',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-lunge.jpg',
    category: 'Quads'
  },
  {
    id: 'reclined-hero-quads',
    name: 'Reclined Hero Pose',
    description: 'A deep quad stretch that also opens the hips and lengthens the spine.',
    benefits: [
      'Deeply stretches quads',
      'Opens hips',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel with knees together, feet apart',
      'Sit between heels, then lean back onto elbows or back',
      'Keep knees together and quads engaged',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reclined-hero.jpg',
    category: 'Quads'
  },
  {
    id: 'bridge-pose-quads',
    name: 'Bridge Pose (Quads Focus)',
    description: 'A backbend that strengthens the quads, glutes, and lower back.',
    benefits: [
      'Strengthens quads and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Builds lower body strength'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Engage quads and glutes',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/bridge-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'chair-twist-quads',
    name: 'Chair Twist (Quads Focus)',
    description: 'A twisting squat that activates the quads and improves spinal mobility.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves spinal mobility',
      'Builds balance',
      'Engages core',
      'Enhances focus'
    ],
    instructions: [
      'Stand with feet together',
      'Bend knees and lower hips as if sitting in a chair',
      'Twist torso to one side, bringing elbow outside opposite knee',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/chair-twist.jpg',
    category: 'Quads'
  },
  {
    id: 'dancer-pose-quads',
    name: 'Dancer Pose (Quads Focus)',
    description: 'A balancing backbend that stretches and strengthens the quads and hip flexors.',
    benefits: [
      'Stretches and strengthens quads',
      'Improves balance',
      'Opens chest',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, bend right knee and grab right foot behind you',
      'Press foot into hand and reach left arm forward',
      'Lift chest and engage quads',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/dancer-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'standing-split-quads',
    name: 'Standing Split (Quads Focus)',
    description: 'A standing balance that activates the quads and stretches the hamstrings.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves balance',
      'Stretches hamstrings',
      'Builds focus',
      'Tones lower body'
    ],
    instructions: [
      'Stand tall, hinge forward and place hands on the floor',
      'Lift one leg up behind you',
      'Engage quads to stabilize',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/standing-split.jpg',
    category: 'Quads'
  },
  {
    id: 'revolved-triangle-quads',
    name: 'Revolved Triangle (Quads Focus)',
    description: 'A twisting standing pose that strengthens the quads and improves spinal mobility.',
    benefits: [
      'Strengthens quads and glutes',
      'Improves spinal mobility',
      'Builds balance',
      'Opens chest',
      'Enhances focus'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Turn right foot out, left foot slightly in',
      'Twist torso to the right, reaching left hand to right foot',
      'Engage quads throughout',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-triangle.jpg',
    category: 'Quads'
  },
  {
    id: 'hero-pose-quads',
    name: 'Hero Pose (Quads Focus)',
    description: 'A kneeling pose that stretches the quads and improves flexibility.',
    benefits: [
      'Stretches quads and ankles',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Builds lower body endurance'
    ],
    instructions: [
      'Kneel with knees together, feet apart',
      'Sit between heels, keeping spine tall',
      'Engage quads and relax shoulders',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/hero-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'frog-pose-quads',
    name: 'Frog Pose (Quads Focus)',
    description: 'A deep hip opener that also stretches the quads and inner thighs.',
    benefits: [
      'Stretches quads and inner thighs',
      'Opens hips',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Widen knees and bring feet in line with knees',
      'Lower forearms to the mat',
      'Engage quads and relax hips',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/frog-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'lizard-pose-quads',
    name: 'Lizard Pose (Quads Focus)',
    description: 'A deep lunge that stretches and strengthens the quads and hip flexors.',
    benefits: [
      'Stretches and strengthens quads',
      'Opens hips',
      'Improves flexibility',
      'Relieves tension',
      'Builds lower body strength'
    ],
    instructions: [
      'Step right foot forward outside right hand',
      'Lower left knee to the mat',
      'Engage quads and relax hips',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/lizard-pose.jpg',
    category: 'Quads'
  },
  {
    id: 'malasana-quads',
    name: 'Malasana (Quads Focus)',
    description: 'A deep squat that activates the quads and opens the hips.',
    benefits: [
      'Strengthens quads and glutes',
      'Opens hips',
      'Improves flexibility',
      'Relieves tension',
      'Builds lower body endurance'
    ],
    instructions: [
      'Stand with feet wider than hips',
      'Squat down, bringing palms together at chest',
      'Engage quads and relax hips',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/malasana.jpg',
    category: 'Quads'
  },
  // --- QUADS YOGA POSES END ---
  // --- CHEST YOGA POSES START ---
  {
    id: 'cobra-chest',
    name: 'Cobra Pose (Chest Focus)',
    description: 'A gentle backbend that stretches and opens the chest and shoulders.',
    benefits: [
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Relieves tension',
      'Strengthens arms',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest',
      'Draw shoulders back and down',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cobra.jpg',
    category: 'Chest'
  },
  {
    id: 'upward-dog-chest',
    name: 'Upward Dog (Chest Focus)',
    description: 'A backbend that deeply opens the chest and strengthens the arms.',
    benefits: [
      'Opens chest and shoulders',
      'Strengthens arms',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest and thighs off the mat',
      'Draw shoulders back and down',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/upward-dog.jpg',
    category: 'Chest'
  },
  {
    id: 'camel-chest',
    name: 'Camel Pose (Chest Focus)',
    description: 'A deep backbend that stretches and opens the chest, shoulders, and front body.',
    benefits: [
      'Deeply opens chest and shoulders',
      'Improves spinal flexibility',
      'Strengthens back',
      'Relieves tension',
      'Promotes energy'
    ],
    instructions: [
      'Kneel with knees hip-width apart',
      'Place hands on lower back or heels',
      'Lift chest and arch back',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/camel.jpg',
    category: 'Chest'
  },
  {
    id: 'bridge-chest',
    name: 'Bridge Pose (Chest Focus)',
    description: 'A backbend that opens the chest and strengthens the back and legs.',
    benefits: [
      'Opens chest and shoulders',
      'Strengthens back and legs',
      'Improves posture',
      'Relieves tension',
      'Builds lower body strength'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Clasp hands under back and lift chest',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/bridge-pose.jpg',
    category: 'Chest'
  },
  {
    id: 'wheel-chest',
    name: 'Wheel Pose (Chest Focus)',
    description: 'A deep backbend that powerfully opens the chest and front body.',
    benefits: [
      'Deeply opens chest and shoulders',
      'Strengthens arms and legs',
      'Improves flexibility',
      'Boosts energy',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, bend knees and place feet on the mat',
      'Place hands by ears, fingers pointing toward shoulders',
      'Press into hands and feet to lift body up',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/wheel.jpg',
    category: 'Chest'
  },
  {
    id: 'puppy-chest',
    name: 'Puppy Pose (Chest Focus)',
    description: 'A heart-opening pose that stretches the chest, shoulders, and spine.',
    benefits: [
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Chest'
  },
  {
    id: 'fish-chest',
    name: 'Fish Pose (Chest Focus)',
    description: 'A reclining backbend that opens the chest and throat.',
    benefits: [
      'Opens chest and throat',
      'Improves posture',
      'Relieves tension',
      'Strengthens upper back',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, legs extended',
      'Prop upper body up on elbows',
      'Lift chest and arch back',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/fish-pose.jpg',
    category: 'Chest'
  },
  {
    id: 'bow-chest',
    name: 'Bow Pose (Chest Focus)',
    description: 'A prone backbend that stretches and opens the chest and shoulders.',
    benefits: [
      'Opens chest and shoulders',
      'Strengthens back and legs',
      'Improves flexibility',
      'Relieves tension',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach, bend knees and grab ankles',
      'Press feet into hands to lift chest and thighs',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/bow-pose.jpg',
    category: 'Chest'
  },
  {
    id: 'sphinx-chest',
    name: 'Sphinx Pose (Chest Focus)',
    description: 'A gentle backbend that opens the chest and strengthens the spine.',
    benefits: [
      'Opens chest and shoulders',
      'Strengthens spine',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Chest'
  },
  {
    id: 'reverse-plank-chest',
    name: 'Reverse Plank (Chest Focus)',
    description: 'A plank variation that opens the chest and strengthens the arms and back.',
    benefits: [
      'Opens chest and shoulders',
      'Strengthens arms and back',
      'Improves posture',
      'Builds core strength',
      'Enhances flexibility'
    ],
    instructions: [
      'Sit with legs extended, hands behind hips',
      'Press into hands and lift hips up',
      'Draw shoulders back and lift chest',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-plank.jpg',
    category: 'Chest'
  },
  {
    id: 'wild-thing-chest',
    name: 'Wild Thing (Chest Focus)',
    description: 'A dynamic backbend that opens the chest and front body.',
    benefits: [
      'Opens chest and shoulders',
      'Strengthens arms and back',
      'Improves flexibility',
      'Boosts energy',
      'Enhances posture'
    ],
    instructions: [
      'Start in downward dog',
      'Lift right leg and flip over, opening chest to the sky',
      'Reach right arm overhead',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/wild-thing.jpg',
    category: 'Chest'
  },
  {
    id: 'cow-face-arms-chest',
    name: 'Cow Face Arms (Chest Focus)',
    description: 'A seated pose that stretches the chest and shoulders by clasping hands behind the back.',
    benefits: [
      'Stretches chest and shoulders',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/cow-face-arms.jpg',
    category: 'Chest'
  },
  {
    id: 'reverse-prayer-chest',
    name: 'Reverse Prayer Pose (Chest Focus)',
    description: 'A standing pose that opens the chest and shoulders by bringing the palms together behind the back.',
    benefits: [
      'Opens chest and shoulders',
      'Improves posture',
      'Enhances arm flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Chest'
  },
  {
    id: 'thread-the-needle-chest',
    name: 'Thread the Needle (Chest Focus)',
    description: 'A gentle twist that stretches the chest, shoulders, and upper back.',
    benefits: [
      'Stretches chest and shoulders',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Walk left hand forward for deeper chest stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Chest'
  },
  {
    id: 'sphinx-twist-chest',
    name: 'Sphinx Twist (Chest Focus)',
    description: 'A gentle backbend and twist that opens the chest and shoulders.',
    benefits: [
      'Opens chest and shoulders',
      'Improves spinal mobility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Twist torso to one side, reaching arm overhead',
      'Lift chest and gaze upward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Chest'
  },
  {
    id: 'extended-puppy-chest',
    name: 'Extended Puppy Pose (Chest Focus)',
    description: 'A variation of puppy pose that deeply opens the chest and shoulders.',
    benefits: [
      'Deeply opens chest and shoulders',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, lowering chest toward the mat',
      'Extend arms fully and relax forehead to the floor',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Chest'
  },
  {
    id: 'locust-chest',
    name: 'Locust Pose (Chest Focus)',
    description: 'A prone backbend that strengthens the back and opens the chest.',
    benefits: [
      'Opens chest and shoulders',
      'Strengthens back',
      'Improves posture',
      'Relieves tension',
      'Builds endurance'
    ],
    instructions: [
      'Lie on your stomach, arms at sides',
      'Lift chest, arms, and legs off the mat',
      'Draw shoulders back and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/locust.jpg',
    category: 'Chest'
  },
  {
    id: 'supported-bridge-chest',
    name: 'Supported Bridge (Chest Focus)',
    description: 'A restorative backbend that opens the chest and relaxes the body.',
    benefits: [
      'Opens chest and shoulders',
      'Relieves tension',
      'Promotes relaxation',
      'Improves posture',
      'Reduces stress'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Place a block under your sacrum',
      'Relax arms at sides and lift chest',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/bridge-pose.jpg',
    category: 'Chest'
  },
  {
    id: 'cat-cow-chest',
    name: 'Cat-Cow Pose (Chest Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and open the chest.',
    benefits: [
      'Mobilizes chest and spine',
      'Relieves back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Focus on opening the chest during Cow',
      'Repeat for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cat-cow.jpg',
    category: 'Chest'
  },
  // --- CHEST YOGA POSES END ---
  // --- OBLIQUES YOGA POSES START ---
  {
    id: 'revolved-chair-obliques',
    name: 'Revolved Chair Pose (Obliques Focus)',
    description: 'A twisting squat that activates the obliques and improves spinal mobility.',
    benefits: [
      'Strengthens obliques and glutes',
      'Improves spinal mobility',
      'Builds balance',
      'Engages core',
      'Enhances focus'
    ],
    instructions: [
      'Stand with feet together',
      'Bend knees and lower hips as if sitting in a chair',
      'Twist torso to one side, bringing elbow outside opposite knee',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-chair.jpg',
    category: 'Obliques'
  },
  {
    id: 'revolved-triangle-obliques',
    name: 'Revolved Triangle Pose (Obliques Focus)',
    description: 'A twisting standing pose that strengthens the obliques and improves spinal mobility.',
    benefits: [
      'Strengthens obliques and glutes',
      'Improves spinal mobility',
      'Builds balance',
      'Opens chest',
      'Enhances focus'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Turn right foot out, left foot slightly in',
      'Twist torso to the right, reaching left hand to right foot',
      'Engage obliques throughout',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-triangle.jpg',
    category: 'Obliques'
  },
  {
    id: 'side-plank-obliques',
    name: 'Side Plank (Obliques Focus)',
    description: 'A balancing pose that strongly activates the obliques and improves core stability.',
    benefits: [
      'Strengthens obliques and core',
      'Improves balance',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage obliques to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Obliques'
  },
  {
    id: 'gate-pose-obliques',
    name: 'Gate Pose (Obliques Focus)',
    description: 'A kneeling side stretch that targets the obliques and opens the side body.',
    benefits: [
      'Stretches obliques and side body',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the obliques',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/gate-pose.jpg',
    category: 'Obliques'
  },
  {
    id: 'revolved-lunge-obliques',
    name: 'Revolved Lunge (Obliques Focus)',
    description: 'A twisting lunge that strengthens the obliques and improves spinal mobility.',
    benefits: [
      'Strengthens obliques and glutes',
      'Improves spinal mobility',
      'Builds balance',
      'Opens chest',
      'Enhances focus'
    ],
    instructions: [
      'Step right foot forward, bend knee to 90 degrees',
      'Twist torso to the right, bringing left elbow outside right knee',
      'Reach arms apart',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-lunge.jpg',
    category: 'Obliques'
  },
  {
    id: 'triangle-side-bend-obliques',
    name: 'Triangle Side Bend (Obliques Focus)',
    description: 'A standing side bend that stretches and activates the obliques.',
    benefits: [
      'Stretches obliques and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, feet wide apart',
      'Reach one hand overhead and lean to the side',
      'Feel the stretch along the obliques',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/triangle-pose.jpg',
    category: 'Obliques'
  },
  {
    id: 'seated-side-bend-obliques',
    name: 'Seated Side Bend (Obliques Focus)',
    description: 'A seated pose that stretches the obliques and side body.',
    benefits: [
      'Stretches obliques and spine',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Sit cross-legged or in staff pose',
      'Reach one arm overhead and lean to the side',
      'Feel the stretch along the obliques',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/seated-side-bend.jpg',
    category: 'Obliques'
  },
  {
    id: 'banana-pose-obliques',
    name: 'Banana Pose (Obliques Focus)',
    description: 'A supine side stretch that targets the obliques and improves lateral flexibility.',
    benefits: [
      'Stretches obliques and side body',
      'Improves lateral flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, arms overhead',
      'Walk feet and hands to one side, forming a banana shape',
      'Feel the stretch along the obliques',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/banana-pose.jpg',
    category: 'Obliques'
  },
  {
    id: 'reclined-twist-obliques',
    name: 'Reclined Twist (Obliques Focus)',
    description: 'A gentle supine twist that stretches the obliques and spine.',
    benefits: [
      'Stretches obliques and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Reach top arm overhead for a deep oblique stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reclined-twist.jpg',
    category: 'Obliques'
  },
  {
    id: 'side-boat-obliques',
    name: 'Side Boat Pose (Obliques Focus)',
    description: 'A core-strengthening pose that targets the obliques and improves balance.',
    benefits: [
      'Strengthens obliques and core',
      'Improves balance',
      'Builds core endurance',
      'Enhances focus',
      'Tones waistline'
    ],
    instructions: [
      'Sit with knees bent, feet on the floor',
      'Lean back slightly and lift feet off the ground',
      'Twist torso to one side, reaching arms out',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/boat-pose.jpg',
    category: 'Obliques'
  },
  {
    id: 'twisted-root-obliques',
    name: 'Twisted Root Pose (Obliques Focus)',
    description: 'A supine twist that stretches the obliques and lower back.',
    benefits: [
      'Stretches obliques and lower back',
      'Relieves tension',
      'Improves spinal mobility',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, cross right leg over left',
      'Drop knees to the left',
      'Extend arms out to the sides',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/twisted-root.jpg',
    category: 'Obliques'
  },
  {
    id: 'parivrtta-anjaneyasana-obliques',
    name: 'Parivrtta Anjaneyasana (Obliques Focus)',
    description: 'A revolved lunge variation that targets the obliques and improves balance.',
    benefits: [
      'Strengthens obliques and glutes',
      'Improves balance',
      'Opens chest',
      'Enhances focus',
      'Builds lower body strength'
    ],
    instructions: [
      'Step right foot forward, bend knee to 90 degrees',
      'Twist torso to the right, bringing left elbow outside right knee',
      'Reach arms apart',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/revolved-lunge.jpg',
    category: 'Obliques'
  },
  {
    id: 'side-angle-obliques',
    name: 'Side Angle Pose (Obliques Focus)',
    description: 'A standing pose that stretches and strengthens the obliques and side body.',
    benefits: [
      'Stretches obliques and hips',
      'Strengthens legs',
      'Improves balance',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Bend right knee and place right elbow on right thigh',
      'Reach left arm overhead, feeling the stretch along the obliques',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/side-angle.jpg',
    category: 'Obliques'
  },
  {
    id: 'revolved-half-moon-obliques',
    name: 'Revolved Half Moon (Obliques Focus)',
    description: 'A balancing twist that activates the obliques and improves stability.',
    benefits: [
      'Strengthens obliques and core',
      'Improves balance',
      'Enhances flexibility',
      'Builds focus',
      'Tones waistline'
    ],
    instructions: [
      'Stand tall, shift weight to right leg',
      'Reach right hand to the floor, lift left leg up',
      'Twist torso to the left, reaching left arm up',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Obliques'
  },
  {
    id: 'supine-twist-obliques',
    name: 'Supine Twist (Obliques Focus)',
    description: 'A gentle supine twist that stretches the obliques and spine.',
    benefits: [
      'Stretches obliques and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Reach top arm overhead for a deep oblique stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/supine-twist.jpg',
    category: 'Obliques'
  },
  {
    id: 'side-crow-obliques',
    name: 'Side Crow (Obliques Focus)',
    description: 'A twisting arm balance that builds oblique and core strength.',
    benefits: [
      'Strengthens obliques and core',
      'Improves balance',
      'Enhances focus',
      'Tones upper body',
      'Builds arm endurance'
    ],
    instructions: [
      'Squat and twist knees to one side',
      'Place hands on the mat, shoulder-width apart',
      'Lift feet off the ground, balancing on hands',
      'Engage obliques to support the pose',
      'Hold for a few breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/side-crow.jpg',
    category: 'Obliques'
  },
  {
    id: 'parighasana-obliques',
    name: 'Parighasana (Gate Pose, Obliques Focus)',
    description: 'A kneeling side stretch that targets the obliques and opens the side body.',
    benefits: [
      'Stretches obliques and side body',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the obliques',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/gate-pose.jpg',
    category: 'Obliques'
  },
  {
    id: 'ardha-chandrasana-obliques',
    name: 'Ardha Chandrasana (Obliques Focus)',
    description: 'A balancing pose that stretches and activates the obliques and side body.',
    benefits: [
      'Stretches obliques and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Reach one hand to the floor and lift other leg up',
      'Reach top arm overhead for a deep oblique stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Obliques'
  },
  // --- OBLIQUES YOGA POSES END ---
  // --- FRONT SHOULDERS YOGA POSES START ---
  {
    id: 'plank-front-shoulders',
    name: 'Plank Pose (Front Shoulders Focus)',
    description: 'A core-strengthening pose that builds front shoulder and arm stability.',
    benefits: [
      'Strengthens front shoulders and arms',
      'Improves posture',
      'Builds core strength',
      'Enhances balance',
      'Tones upper body'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage front shoulders and core',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/plank.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'downward-dog-front-shoulders',
    name: 'Downward Dog (Front Shoulders Focus)',
    description: 'A classic yoga pose that stretches and strengthens the front shoulders as you press the arms into the mat.',
    benefits: [
      'Stretches front shoulders and arms',
      'Strengthens upper body',
      'Improves flexibility',
      'Relieves tension',
      'Enhances posture'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back, straightening arms and legs',
      'Press hands firmly into the mat, engaging front shoulders',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/downward-dog.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'upward-dog-front-shoulders',
    name: 'Upward Dog (Front Shoulders Focus)',
    description: 'A backbend that stretches and strengthens the front shoulders and chest.',
    benefits: [
      'Stretches front shoulders and chest',
      'Strengthens arms',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest and thighs off the mat',
      'Engage front shoulders to keep arms straight',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/upward-dog.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'cobra-front-shoulders',
    name: 'Cobra Pose (Front Shoulders Focus)',
    description: 'A gentle backbend that stretches and activates the front shoulders as you press into the mat.',
    benefits: [
      'Stretches front shoulders and chest',
      'Strengthens arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest',
      'Engage front shoulders to straighten arms',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cobra.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'dolphin-pose-front-shoulders',
    name: 'Dolphin Pose (Front Shoulders Focus)',
    description: 'A forearm-based inversion that stretches and strengthens the front shoulders and arms.',
    benefits: [
      'Stretches front shoulders and arms',
      'Strengthens upper body',
      'Improves balance',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Start on forearms and knees',
      'Lift hips up and back, keeping forearms on the mat',
      'Press forearms and hands into the mat, engaging front shoulders',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/dolphin-pose.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'reverse-tabletop-front-shoulders',
    name: 'Reverse Tabletop (Front Shoulders Focus)',
    description: 'A pose that strengthens the front shoulders, arms, and core while opening the chest.',
    benefits: [
      'Strengthens front shoulders and arms',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Engage front shoulders and hold',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'side-plank-front-shoulders',
    name: 'Side Plank (Front Shoulders Focus)',
    description: 'A balancing pose that activates the front shoulders and improves arm stability.',
    benefits: [
      'Strengthens front shoulders and core',
      'Improves balance',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage front shoulders to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'tabletop-front-shoulders-raise',
    name: 'Tabletop Front Shoulders Raise',
    description: 'A dynamic tabletop pose that incorporates front shoulder raises for added arm strength.',
    benefits: [
      'Strengthens front shoulders and core',
      'Improves balance',
      'Engages arms',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Lift one arm forward and slightly up',
      'Alternate sides for several reps',
      'Keep hips stable throughout'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-front-raise.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'shoulder-flossing-front-shoulders',
    name: 'Shoulder Flossing (Front Shoulders Focus)',
    description: 'A mobility drill that increases front shoulder flexibility and range of motion.',
    benefits: [
      'Increases front shoulder mobility',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Hold a strap or towel with both hands',
      'Lift arms overhead and behind',
      'Bring arms back to front',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-flossing.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'cat-cow-front-shoulders',
    name: 'Cat-Cow Pose (Front Shoulders Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the front shoulders and spine.',
    benefits: [
      'Mobilizes front shoulders and spine',
      'Relieves back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Walk hands forward for deeper front shoulder stretch',
      'Repeat for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cat-cow.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'puppy-pose-front-shoulders',
    name: 'Puppy Pose (Front Shoulders Focus)',
    description: 'A heart-opening pose that stretches the front shoulders, chest, and arms.',
    benefits: [
      'Stretches front shoulders and chest',
      'Opens arms',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'shoulder-bridge-front-shoulders',
    name: 'Shoulder Bridge (Front Shoulders Focus)',
    description: 'A bridge variation that strengthens the front shoulders, glutes, and back.',
    benefits: [
      'Strengthens front shoulders and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Clasp hands under back and squeeze front shoulders together',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/shoulder-bridge.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'reverse-prayer-front-shoulders',
    name: 'Reverse Prayer Pose (Front Shoulders Focus)',
    description: 'A standing pose that stretches the front shoulders and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Stretches front shoulders and forearms',
      'Opens chest and upper back',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'eagle-arms-front-shoulders',
    name: 'Eagle Arms (Front Shoulders Focus)',
    description: 'A pose that wraps the arms to stretch and activate the front shoulders and upper back.',
    benefits: [
      'Stretches front shoulders and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms, bringing palms to touch',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/eagle-arms.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'cow-face-arms-front-shoulders',
    name: 'Cow Face Arms (Front Shoulders Focus)',
    description: 'A seated pose that stretches the front shoulders by reaching one arm overhead and the other behind the back.',
    benefits: [
      'Stretches front shoulders and arms',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/cow-face-arms.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'thread-the-needle-front-shoulders',
    name: 'Thread the Needle (Front Shoulders Focus)',
    description: 'A gentle twist that stretches the front shoulders, arms, and upper back.',
    benefits: [
      'Stretches front shoulders and arms',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Walk left hand forward for deeper front shoulder stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'sphinx-front-shoulders',
    name: 'Sphinx Pose (Front Shoulders Focus)',
    description: 'A gentle backbend that opens and activates the front shoulders as you press the forearms into the mat.',
    benefits: [
      'Opens front shoulders and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging front shoulders',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Front Shoulders'
  },
  {
    id: 'shoulder-opener-wall-front-shoulders',
    name: 'Shoulder Opener at Wall (Front Shoulders Focus)',
    description: 'A wall-assisted stretch that opens the front shoulders and chest.',
    benefits: [
      'Stretches front shoulders and chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand facing a wall',
      'Place hands on wall at shoulder height',
      'Step back and lower chest toward the floor',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-opener-wall.jpg',
    category: 'Front Shoulders'
  },
  // --- FRONT SHOULDERS YOGA POSES END ---
  // --- REAR SHOULDERS YOGA POSES START ---
  {
    id: 'reverse-fly-rear-shoulders',
    name: 'Reverse Fly (Rear Shoulders Focus)',
    description: 'A pose that mimics the reverse fly movement, activating the rear shoulders and upper back.',
    benefits: [
      'Strengthens rear shoulders and upper back',
      'Improves posture',
      'Enhances shoulder stability',
      'Relieves tension',
      'Builds functional strength'
    ],
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge forward at the hips',
      'Extend arms out to the sides, squeezing shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-fly.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'childs-pose-rear-shoulders',
    name: "Child's Pose (Rear Shoulders Focus)",
    description: 'A gentle resting pose that stretches the rear shoulders and relieves tension in the upper back.',
    benefits: [
      'Stretches rear shoulders and spine',
      'Relieves upper back tension',
      'Calms the mind',
      'Improves flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on the floor and sit back on your heels',
      'Fold forward, extending arms in front',
      'Walk hands to one side to deepen the rear shoulder stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/childs-pose.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'thread-the-needle-rear-shoulders',
    name: 'Thread the Needle (Rear Shoulders Focus)',
    description: 'A gentle twist that stretches the rear shoulders, shoulders, and upper back.',
    benefits: [
      'Stretches rear shoulders and shoulders',
      'Improves spinal mobility',
      'Relieves upper body tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Walk left hand forward for deeper rear shoulder stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/thread-the-needle.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'eagle-arms-rear-shoulders',
    name: 'Eagle Arms (Rear Shoulders Focus)',
    description: 'A pose that wraps the arms to stretch and activate the rear shoulders and upper back.',
    benefits: [
      'Stretches rear shoulders and upper back',
      'Improves shoulder mobility',
      'Relieves tension in arms',
      'Enhances focus',
      'Promotes balance'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms, bringing palms to touch',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/eagle-arms.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'cow-face-arms-rear-shoulders',
    name: 'Cow Face Arms (Rear Shoulders Focus)',
    description: 'A seated pose that stretches the rear shoulders by reaching one arm overhead and the other behind the back.',
    benefits: [
      'Stretches rear shoulders and triceps',
      'Improves arm flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit tall, extend right arm overhead',
      'Bend right elbow and reach hand down back',
      'Reach left arm behind and clasp hands',
      'Lift right elbow and draw left elbow down',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/cow-face-arms.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'cat-cow-rear-shoulders',
    name: 'Cat-Cow Pose (Rear Shoulders Focus)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the rear shoulders and spine.',
    benefits: [
      'Mobilizes rear shoulders and spine',
      'Relieves back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Walk hands to one side for deeper rear shoulder stretch',
      'Repeat for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/cat-cow.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'puppy-pose-rear-shoulders',
    name: 'Puppy Pose (Rear Shoulders Focus)',
    description: 'A heart-opening pose that stretches the rear shoulders, chest, and shoulders.',
    benefits: [
      'Stretches rear shoulders and chest',
      'Opens shoulders',
      'Improves upper body flexibility',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Walk hands forward, keeping hips above knees',
      'Lower chest and chin toward the mat',
      'Walk hands to one side for deeper rear shoulder stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/puppy-pose.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'reclined-twist-rear-shoulders',
    name: 'Reclined Twist (Rear Shoulders Focus)',
    description: 'A gentle supine twist that stretches the rear shoulders and spine.',
    benefits: [
      'Stretches rear shoulders and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Reach top arm overhead for a deep rear shoulder stretch',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reclined-twist.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'reverse-tabletop-rear-shoulders',
    name: 'Reverse Tabletop (Rear Shoulders Focus)',
    description: 'A pose that strengthens the rear shoulders, arms, and core while opening the chest.',
    benefits: [
      'Strengthens rear shoulders and arms',
      'Opens chest and front body',
      'Improves wrist flexibility',
      'Engages core muscles',
      'Enhances arm endurance'
    ],
    instructions: [
      'Sit with knees bent and feet flat on the floor, hands behind hips with fingers pointing forward',
      'Press into hands and feet to lift hips up, coming into a tabletop position',
      'Engage rear shoulders and hold',
      'Lower hips back down to release'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/reverse-tabletop.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'plank-rear-shoulders',
    name: 'Plank Pose (Rear Shoulders Focus)',
    description: 'A core-strengthening pose that builds rear shoulder and arm stability.',
    benefits: [
      'Strengthens rear shoulders and arms',
      'Improves posture',
      'Builds core strength',
      'Enhances balance',
      'Tones upper body'
    ],
    instructions: [
      'Start in push-up position',
      'Keep body in straight line',
      'Engage rear shoulders and core',
      'Hold for 30 seconds to 1 minute'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/plank.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'shoulder-flossing-rear-shoulders',
    name: 'Shoulder Flossing (Rear Shoulders Focus)',
    description: 'A mobility drill that increases rear shoulder flexibility and range of motion.',
    benefits: [
      'Increases rear shoulder mobility',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Hold a strap or towel with both hands',
      'Lift arms overhead and behind',
      'Bring arms back to front',
      'Repeat for several reps'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-flossing.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'tabletop-rear-shoulders-raise',
    name: 'Tabletop Rear Shoulders Raise',
    description: 'A dynamic tabletop pose that incorporates rear shoulder raises for added shoulder strength.',
    benefits: [
      'Strengthens rear shoulders and core',
      'Improves balance',
      'Engages arms',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in tabletop position',
      'Lift one arm out to the side and slightly back',
      'Alternate sides for several reps',
      'Keep hips stable throughout'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/tabletop-posterior-raise.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'sphinx-rear-shoulders',
    name: 'Sphinx Pose (Rear Shoulders Focus)',
    description: 'A gentle backbend that stretches and activates the rear shoulders as you press the forearms into the mat.',
    benefits: [
      'Stretches rear shoulders and chest',
      'Strengthens upper arms',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging rear shoulders',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/sphinx.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'garland-pose-rear-shoulders',
    name: 'Garland Pose (Rear Shoulders Focus)',
    description: 'A deep squat that stretches the rear shoulders and upper back as you reach arms forward.',
    benefits: [
      'Stretches rear shoulders and upper back',
      'Opens hips',
      'Improves posture',
      'Enhances flexibility',
      'Relieves tension'
    ],
    instructions: [
      'Squat with feet wider than hips',
      'Bring palms together at chest',
      'Reach arms forward and round upper back',
      'Relax head and neck',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/garland-pose.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'reverse-prayer-rear-shoulders',
    name: 'Reverse Prayer Pose (Rear Shoulders Focus)',
    description: 'A standing pose that deeply stretches the rear shoulders and opens the chest by bringing the palms together behind the back.',
    benefits: [
      'Deeply stretches rear shoulders and forearms',
      'Opens chest and upper back',
      'Improves posture',
      'Enhances arm flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Bring arms behind your back and press palms together in a prayer position',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/reverse-prayer.jpg',
    category: 'Rear Shoulders'
  },
  {
    id: 'shoulder-opener-wall-rear-shoulders',
    name: 'Shoulder Opener at Wall (Rear Shoulders Focus)',
    description: 'A wall-assisted stretch that opens the posterior deltoids and chest.',
    benefits: [
      'Stretches posterior deltoids and chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand facing a wall',
      'Place hands on wall at shoulder height',
      'Step back and lower chest toward the floor',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/shoulder-opener-wall.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'shoulder-bridge-posterior-deltoid',
    name: 'Shoulder Bridge (Posterior Deltoid Focus)',
    description: 'A bridge variation that strengthens the posterior deltoids, glutes, and back.',
    benefits: [
      'Strengthens posterior deltoids and glutes',
      'Opens chest',
      'Improves posture',
      'Relieves tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Lie on your back with knees bent',
      'Press feet into the mat and lift hips',
      'Clasp hands under back and squeeze posterior deltoids together',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/shoulder-bridge.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'side-plank-posterior-deltoid',
    name: 'Side Plank (Posterior Deltoid Focus)',
    description: 'A balancing pose that strongly activates the posterior deltoids and improves shoulder stability.',
    benefits: [
      'Strengthens posterior deltoids and core',
      'Improves balance',
      'Engages shoulders and wrists',
      'Enhances arm endurance',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand, left foot stacked on right',
      'Lift left arm toward ceiling',
      'Engage posterior deltoids to stabilize the pose',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    imageUrl: '/images/yoga/side-plank.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'half-moon-posterior-deltoid',
    name: 'Half Moon Pose (Posterior Deltoid Focus)',
    description: 'A balancing pose that stretches and activates the posterior deltoids and side body.',
    benefits: [
      'Stretches posterior deltoids and hips',
      'Improves balance',
      'Strengthens legs',
      'Enhances flexibility',
      'Builds focus'
    ],
    instructions: [
      'Stand tall, shift weight to one leg',
      'Reach one hand to the floor and lift other leg up',
      'Reach top arm overhead for a deep posterior deltoid stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Advanced',
    imageUrl: '/images/yoga/half-moon.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'gate-pose-posterior-deltoid',
    name: 'Gate Pose (Posterior Deltoid Focus)',
    description: 'A kneeling side stretch that targets the posterior deltoids and opens the side body.',
    benefits: [
      'Stretches posterior deltoids and obliques',
      'Improves lateral flexibility',
      'Opens chest',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on one knee, extend other leg to the side',
      'Reach same-side arm overhead and lean to the side',
      'Feel the stretch along the posterior deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/gate-pose.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'seated-side-bend-posterior-deltoid',
    name: 'Seated Side Bend (Posterior Deltoid Focus)',
    description: 'A seated pose that stretches the posterior deltoids and side body.',
    benefits: [
      'Stretches posterior deltoids and spine',
      'Improves flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Sit cross-legged or in staff pose',
      'Reach one arm overhead and lean to the side',
      'Feel the stretch along the posterior deltoid',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/seated-side-bend.jpg',
    category: 'Posterior Deltoid'
  },
  {
    id: 'banana-pose-posterior-deltoid',
    name: 'Banana Pose (Posterior Deltoid Focus)',
    description: 'A supine side stretch that targets the posterior deltoids and improves lateral flexibility.',
    benefits: [
      'Stretches posterior deltoids and obliques',
      'Improves lateral flexibility',
      'Relieves tension',
      'Promotes relaxation',
      'Enhances posture'
    ],
    instructions: [
      'Lie on your back, arms overhead',
      'Walk feet and hands to one side, forming a banana shape',
      'Feel the stretch along the posterior deltoid',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    imageUrl: '/images/yoga/banana-pose.jpg',
    category: 'Posterior Deltoid'
  },
  // --- POSTERIOR DELTOID YOGA POSES END ---
  // --- LOWER BACK YOGA POSES START ---
  {
    id: 'cat-cow-lower-back',
    name: 'Cat-Cow Pose (Lower Back)',
    description: 'A gentle flow between arching and rounding the back to mobilize and stretch the lower back.',
    benefits: [
      'Mobilizes lower back and spine',
      'Relieves lower back tension',
      'Improves posture',
      'Enhances flexibility',
      'Promotes relaxation'
    ],
    instructions: [
      'Start on hands and knees',
      'Inhale, arch your back and lift your head (Cow)',
      'Exhale, round your back and tuck your chin (Cat)',
      'Repeat for 1-2 minutes',
      'Move slowly with your breath'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'childs-pose-lower-back',
    name: "Child's Pose (Lower Back)",
    description: 'A restorative pose that gently stretches the lower back and hips.',
    benefits: [
      'Relieves lower back tension',
      'Calms the mind',
      'Improves flexibility',
      'Gentle on joints',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on the floor and sit back on your heels',
      'Fold forward, extending arms in front',
      'Rest forehead on the mat',
      'Reach arms forward to stretch lower back',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'supine-twist-lower-back',
    name: 'Supine Twist (Lower Back)',
    description: 'A gentle supine twist that stretches the lower back and spine.',
    benefits: [
      'Stretches lower back and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Turn head in the opposite direction',
      'Relax shoulders and lower back',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'sphinx-lower-back',
    name: 'Sphinx Pose (Lower Back)',
    description: 'A gentle backbend that stretches and activates the lower back as you press the forearms into the mat.',
    benefits: [
      'Stretches lower back and chest',
      'Strengthens lower back',
      'Improves posture',
      'Relieves tension',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your stomach, forearms on the mat',
      'Elbows under shoulders, palms down',
      'Press forearms and hands into the mat, engaging lower back',
      'Lift chest and gaze forward',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'cobra-lower-back',
    name: 'Cobra Pose (Lower Back)',
    description: 'A backbend that stretches the lower back and strengthens the spine.',
    benefits: [
      'Strengthens lower back and spine',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach, hands under shoulders',
      'Press into hands to lift chest off the mat',
      'Draw shoulders down and back, engaging lower back',
      'Keep elbows close to body',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'locust-lower-back',
    name: 'Locust Pose (Lower Back)',
    description: 'A prone pose that strengthens the lower back by lifting the arms and chest.',
    benefits: [
      'Strengthens lower back and glutes',
      'Improves posture',
      'Opens chest',
      'Enhances endurance',
      'Reduces fatigue'
    ],
    instructions: [
      'Lie on your stomach, arms at sides',
      'Inhale and lift chest, arms, and legs off the mat',
      'Squeeze glutes and engage lower back',
      'Hold for 5-8 breaths',
      'Lower down and rest'
    ],
    difficulty: 'Intermediate',
    category: 'Lower Back'
  },
  {
    id: 'bridge-lower-back',
    name: 'Bridge Pose (Lower Back)',
    description: 'A backbend that strengthens the lower back and opens the front body.',
    benefits: [
      'Strengthens lower back and glutes',
      'Opens chest and hips',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your back, knees bent, feet flat on the floor',
      'Press feet and arms into the mat',
      'Lift hips and chest upward',
      'Roll shoulders under and squeeze lower back',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Lower Back'
  },
  {
    id: 'reclined-pigeon-lower-back',
    name: 'Reclined Pigeon Pose (Lower Back)',
    description: 'A gentle hip opener that also stretches the lower back.',
    benefits: [
      'Stretches lower back and hips',
      'Relieves tension',
      'Improves flexibility',
      'Promotes relaxation',
      'Reduces stiffness'
    ],
    instructions: [
      'Lie on your back, knees bent',
      'Cross right ankle over left knee',
      'Pull left thigh toward chest',
      'Hold for 1-2 minutes, then switch sides',
      'Relax shoulders and lower back'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'thread-the-needle-lower-back',
    name: 'Thread the Needle (Lower Back)',
    description: 'A gentle twist that stretches the lower back, hips, and shoulders.',
    benefits: [
      'Stretches lower back and hips',
      'Improves spinal mobility',
      'Relieves tension',
      'Enhances flexibility',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Slide right arm under left arm, palm facing up',
      'Lower right shoulder and ear to the mat',
      'Press left hand into the mat for a deeper stretch',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'downward-dog-lower-back',
    name: 'Downward-Facing Dog (Lower Back)',
    description: 'A foundational pose that stretches and strengthens the lower back and hamstrings.',
    benefits: [
      'Strengthens lower back and shoulders',
      'Stretches hamstrings and calves',
      'Relieves back pain',
      'Improves posture',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back',
      'Press hands into the mat, activating lower back',
      'Keep head between arms',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'dolphin-lower-back',
    name: 'Dolphin Pose (Lower Back)',
    description: 'A forearm-based inversion that builds lower back and shoulder strength.',
    benefits: [
      'Strengthens lower back and shoulders',
      'Improves upper body stability',
      'Stretches hamstrings and calves',
      'Prepares for more advanced inversions',
      'Relieves tension in the back'
    ],
    instructions: [
      'Start on hands and knees, lower forearms to the mat',
      'Tuck toes and lift hips up and back',
      'Keep forearms parallel and press down through elbows',
      'Engage lower back to support the pose',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Lower Back'
  },
  {
    id: 'bow-lower-back',
    name: 'Bow Pose (Lower Back)',
    description: 'A backbend that actively engages the lower back as you pull your feet toward your head.',
    benefits: [
      'Strengthens lower back and spine',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Enhances posture',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach',
      'Bend knees and reach back to grab ankles',
      'Inhale and lift chest and thighs off the mat',
      'Pull feet toward head, engaging lower back',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Advanced',
    category: 'Lower Back'
  },
  {
    id: 'half-lord-of-the-fishes-lower-back',
    name: 'Half Lord of the Fishes (Lower Back)',
    description: 'A seated twist that stretches the lower back and improves spinal mobility.',
    benefits: [
      'Stretches lower back and spine',
      'Improves rotation',
      'Reduces stiffness',
      'Can be done anywhere',
      'Good for office workers'
    ],
    instructions: [
      'Sit on the floor with legs extended in front.',
      'Bend your right knee and place your right foot outside your left knee.',
      'Place your left elbow on the outside of your right knee.',
      'Gently twist to the right, looking over your right shoulder.',
      'Hold for 30 seconds and switch sides.'
    ],
    difficulty: 'Intermediate',
    category: 'Lower Back'
  },
  {
    id: 'reclined-butterfly-lower-back',
    name: 'Reclined Butterfly (Lower Back)',
    description: 'A gentle supine pose that opens the hips and stretches the lower back.',
    benefits: [
      'Stretches lower back and hips',
      'Relieves tension',
      'Improves flexibility',
      'Promotes relaxation',
      'Reduces stiffness'
    ],
    instructions: [
      'Lie on your back, bring soles of feet together',
      'Let knees fall open to the sides',
      'Relax arms at your sides',
      'Breathe deeply and relax lower back',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'seated-forward-bend-lower-back',
    name: 'Seated Forward Bend (Lower Back)',
    description: 'A seated pose that stretches the lower back and hamstrings.',
    benefits: [
      'Stretches lower back and hamstrings',
      'Improves flexibility',
      'Relieves tension',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Sit with legs extended in front',
      'Inhale and lengthen spine',
      'Exhale and fold forward from hips',
      'Reach for feet or shins',
      'Hold for 1-2 minutes, breathing deeply'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'standing-forward-bend-lower-back',
    name: 'Standing Forward Bend (Lower Back)',
    description: 'A standing pose that stretches the lower back and spine as you fold forward.',
    benefits: [
      'Stretches lower back and spine',
      'Relieves back tension',
      'Improves flexibility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge at hips and fold forward',
      'Let head and arms hang, relaxing lower back',
      'Hold for 1-2 minutes',
      'Slowly rise back up to standing'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'reclined-twist-lower-back',
    name: 'Reclined Twist (Lower Back)',
    description: 'A gentle supine twist that stretches the lower back and spine.',
    benefits: [
      'Stretches lower back and spine',
      'Relieves back tension',
      'Improves spinal mobility',
      'Calms the mind',
      'Promotes relaxation'
    ],
    instructions: [
      'Lie on your back, arms out to the sides',
      'Bend knees and drop them to one side',
      'Turn head in the opposite direction',
      'Relax shoulders and lower back',
      'Hold for 1-2 minutes, then switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  {
    id: 'happy-baby-lower-back',
    name: 'Happy Baby Pose (Lower Back)',
    description: 'A gentle pose that opens the hips and stretches the lower back.',
    benefits: [
      'Stretches lower back and hips',
      'Relieves tension',
      'Improves flexibility',
      'Promotes relaxation',
      'Reduces stiffness'
    ],
    instructions: [
      'Lie on your back, bend knees toward chest',
      'Grab the outside edges of your feet',
      'Gently pull knees toward armpits',
      'Rock side to side to massage lower back',
      'Hold for 1-2 minutes'
    ],
    difficulty: 'Beginner',
    category: 'Lower Back'
  },
  // --- LOWER BACK YOGA POSES END ---
// --- TRAPS YOGA POSES START ---
  {
    id: 'shrug-pose-traps',
    name: 'Shrug Pose',
    description: 'A standing pose that activates the upper trapezius through shoulder shrugs.',
    benefits: [
      'Strengthens upper traps',
      'Improves neck mobility',
      'Relieves tension',
      'Enhances posture'
    ],
    instructions: [
      'Stand tall with feet hip-width apart',
      'Let arms hang by your sides',
      'Lift shoulders up toward ears',
      'Hold for a second, then release',
      'Repeat for 10-15 reps'
    ],
    difficulty: 'Beginner',
    category: 'Traps'
  },
  {
    id: 'ear-to-shoulder-traps',
    name: 'Ear-to-Shoulder Stretch',
    description: 'A gentle neck stretch that targets the upper trapezius.',
    benefits: [
      'Stretches upper traps',
      'Relieves neck tension',
      'Improves flexibility',
      'Reduces headaches'
    ],
    instructions: [
      'Sit or stand tall',
      'Tilt right ear toward right shoulder',
      'Hold for 20-30 seconds',
      'Switch sides',
      'Repeat 2-3 times each side'
    ],
    difficulty: 'Beginner',
    category: 'Traps'
  },
  {
    id: 'cross-body-arm-traps',
    name: 'Cross-Body Arm Stretch',
    description: 'A classic stretch that targets the middle trapezius.',
    benefits: [
      'Stretches mid traps',
      'Improves shoulder mobility',
      'Relieves upper back tension',
      'Enhances flexibility'
    ],
    instructions: [
      'Stand or sit tall',
      'Bring right arm across chest',
      'Use left hand to gently pull right arm closer',
      'Hold for 20-30 seconds',
      'Switch sides'
    ],
    difficulty: 'Beginner',
    category: 'Traps'
  },
  {
    id: 'reverse-prayer-traps',
    name: 'Reverse Prayer Pose (Traps)',
    description: 'A standing pose that stretches the upper and mid traps.',
    benefits: [
      'Stretches upper and mid traps',
      'Opens chest',
      'Improves posture',
      'Enhances arm flexibility'
    ],
    instructions: [
      'Stand tall',
      'Bring arms behind back and press palms together',
      'Roll shoulders back and down',
      'Lift chest and squeeze shoulder blades',
      'Hold for 5-10 breaths'
    ],
    difficulty: 'Intermediate',
    category: 'Traps'
  },
  {
    id: 'eagle-arms-traps',
    name: 'Eagle Arms (Traps)',
    description: 'A pose that wraps the arms to stretch the upper traps.',
    benefits: [
      'Stretches upper traps and shoulders',
      'Improves shoulder mobility',
      'Relieves tension',
      'Enhances focus'
    ],
    instructions: [
      'Sit or stand tall',
      'Extend arms forward and cross right arm over left',
      'Bend elbows and wrap forearms',
      'Lift elbows and reach hands forward',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    category: 'Traps'
  },
  {
    id: 'side-plank-traps',
    name: 'Side Plank (Traps)',
    description: 'A side plank variation that engages the upper traps.',
    benefits: [
      'Strengthens upper traps and core',
      'Improves balance',
      'Engages shoulders',
      'Builds functional strength'
    ],
    instructions: [
      'Start in side plank on right hand',
      'Press floor away with right hand, engaging upper traps',
      'Lift left arm toward ceiling',
      'Hold for 5-10 breaths, then switch sides'
    ],
    difficulty: 'Intermediate',
    category: 'Traps'
  },
  {
    id: 'bow-pose-traps',
    name: 'Bow Pose (Traps)',
    description: 'A backbend that engages the upper traps.',
    benefits: [
      'Strengthens upper traps and back',
      'Opens chest and shoulders',
      'Improves spinal flexibility',
      'Boosts energy'
    ],
    instructions: [
      'Lie on your stomach',
      'Bend knees and reach back to grab ankles',
      'Lift chest and thighs off the mat',
      'Pull feet toward head, engaging upper traps',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Advanced',
    category: 'Traps'
  },
  {
    id: 'camel-pose-traps',
    name: 'Camel Pose (Traps)',
    description: 'A deep backbend that stretches the upper traps.',
    benefits: [
      'Stretches upper traps and chest',
      'Opens front body',
      'Improves spinal flexibility',
      'Boosts energy'
    ],
    instructions: [
      'Kneel with knees hip-width apart',
      'Place hands on lower back, fingers pointing down',
      'Lean back and reach hands for heels',
      'Press hips forward and engage upper traps',
      'Hold for 5-8 breaths'
    ],
    difficulty: 'Advanced',
    category: 'Traps'
  },
  {
    id: 'prone-y-raise-traps',
    name: 'Prone Y Raise (Traps)',
    description: 'A prone pose that targets the lower and mid traps.',
    benefits: [
      'Strengthens lower and mid traps',
      'Improves posture',
      'Enhances shoulder stability',
      'Builds upper back strength'
    ],
    instructions: [
      'Lie face down, arms extended overhead in a Y',
      'Lift arms and chest off the mat',
      'Hold for 5-8 breaths',
      'Lower down and rest',
      'Repeat for 8-10 reps'
    ],
    difficulty: 'Intermediate',
    category: 'Traps'
  },
  {
    id: 'standing-side-bend-traps',
    name: 'Standing Side Bend (Traps)',
    description: 'A standing pose that stretches the upper traps.',
    benefits: [
      'Stretches upper traps and side body',
      'Improves flexibility',
      'Relieves tension',
      'Enhances posture'
    ],
    instructions: [
      'Stand tall, reach right arm overhead',
      'Lean to the left, feeling the stretch along right side',
      'Hold for 20-30 seconds',
      'Switch sides',
      'Repeat 2-3 times each side'
    ],
    difficulty: 'Beginner',
    category: 'Traps'
  },
  // --- TRAPS YOGA POSES END ---
  // ... existing code ...

];

export const getPosesByCategory = (category: string): YogaPose[] => {
  return yogaPoses.filter(pose => pose.category === category);
}; 