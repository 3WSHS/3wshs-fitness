import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const yogaCategories = [
  'Biceps',
  'Traps (mid-back)',
  'Lower back',
  'Abdominals',
  'Forearms',
  'Glutes',
  'Hamstrings',
  'Lats',
  'Shoulders',
  'Lateral Deltoid',
  'Anterior Deltoid',
  'Posterior Deltoid',
  'Triceps',
  'Traps',
  'Quads',
  'Chest',
  'Obliques',
  'Front Shoulders',
  'Rear Shoulders',
];

const NODE_SIZE = 32;
const ORB_CENTER_X = 400;
const ORB_CENTER_Y = 270;

const hardcodedPositions = [
  {
    "cat": "Biceps",
    "x": 634,
    "y": 119
  },
  {
    "cat": "Traps (mid-back)",
    "x": 728,
    "y": 9
  },
  {
    "cat": "Lower back",
    "x": 820,
    "y": 197
  },
  {
    "cat": "Abdominals",
    "x": 668,
    "y": 330
  },
  {
    "cat": "Forearms",
    "x": 1032,
    "y": 474
  },
  {
    "cat": "Glutes",
    "x": 766,
    "y": 470
  },
  {
    "cat": "Hamstrings",
    "x": -261,
    "y": 173
  },
  {
    "cat": "Lats",
    "x": -55,
    "y": 207
  },
  {
    "cat": "Shoulders",
    "x": 969,
    "y": 294
  },
  {
    "cat": "Lateral Deltoid",
    "x": 569,
    "y": 505
  },
  {
    "cat": "Anterior Deltoid",
    "x": -136,
    "y": 32
  },
  {
    "cat": "Posterior Deltoid",
    "x": -216,
    "y": 444
  },
  {
    "cat": "Triceps",
    "x": 348,
    "y": 465
  },
  {
    "cat": "Traps",
    "x": 143,
    "y": 525
  },
  {
    "cat": "Quads",
    "x": 990,
    "y": 30
  },
  {
    "cat": "Chest",
    "x": 135,
    "y": 84
  },
  {
    "cat": "Obliques",
    "x": 24,
    "y": 381
  },
  {
    "cat": "Front Shoulders",
    "x": 179,
    "y": 292
  },
  {
    "cat": "Rear Shoulders",
    "x": 425,
    "y": 44
  }
];

function AnimatedParticles() {
  // Number of particles
  const PARTICLE_COUNT = 14;
  // Each particle gets a random angle and duration
  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.5;
    const distance = 90 + Math.random() * 40; // keep them close to the orb (just outside the orb)
    const duration = 2.2 + Math.random() * 1.2;
    const delay = Math.random() * 1.5;
    return { angle, distance, duration, delay };
  });
  return (
    <>
      {particles.map((p, i) => {
        const x = Math.cos(p.angle);
        const y = Math.sin(p.angle);
        return (
          <span
            key={i}
            className="absolute z-20 pointer-events-none"
            style={{
              left: ORB_CENTER_X - 6,
              top: ORB_CENTER_Y - 6,
              width: 12,
              height: 12,
              filter: 'blur(2.5px)',
              animation: `particle-move-${i} ${p.duration}s linear ${p.delay}s infinite`,
              opacity: 0,
            }}
          >
            <span className="block w-full h-full rounded-full bg-white opacity-90 shadow-lg" />
            <style>{`
              @keyframes particle-move-${i} {
                0% { transform: translate(0,0) scale(0.7); opacity: 0; }
                10% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translate(${x * p.distance}px, ${y * p.distance}px) scale(1.1); opacity: 0; }
              }
            `}</style>
          </span>
        );
      })}
    </>
  );
}

function RotatingHexGlobe() {
  // Each entry: [radius, stroke, opacity, duration, initial rotation, rotateX, rotateY]
  const hexPlanes: [number, string, number, number, number, number, number][] = [
    [54, '#fff', 0.18, 18, 0, 0, 0],
    [70, '#fff', 0.13, 22, 30, 18, 0],
    [88, '#fff', 0.09, 28, 60, 0, 24],
    [104, '#fff', 0.07, 32, 90, -18, 0],
    [120, '#fff', 0.05, 36, 120, 0, -24],
  ];
  // Hexagon points generator
  const hexPoints = (r: number) => {
    return Array.from({ length: 6 })
      .map((_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = ORB_CENTER_X + r * Math.cos(angle);
        const y = ORB_CENTER_Y + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };
  return (
    <svg width="800" height="800" className="absolute inset-0 z-0 pointer-events-none">
      {hexPlanes.map(([r, stroke, opacity, duration, rot, rx, ry], i) => (
        <polygon
          key={i}
          points={hexPoints(r)}
          stroke={stroke}
          strokeWidth={2}
          fill="none"
          opacity={opacity}
          style={{
            transformOrigin: `${ORB_CENTER_X}px ${ORB_CENTER_Y}px`,
            animation: `hex-rotate-3d-${i} ${duration}s linear infinite`,
            transform: `rotateZ(${rot}deg) rotateX(${rx}deg) rotateY(${ry}deg)`
          }}
        />
      ))}
      <style>{`
        ${hexPlanes
          .map(
            ([, , , duration, rot, rx, ry], i) =>
              `@keyframes hex-rotate-3d-${i} { 0% { transform: rotateZ(${rot}deg) rotateX(${rx}deg) rotateY(${ry}deg); } 100% { transform: rotateZ(${360 + rot}deg) rotateX(${rx}deg) rotateY(${ry}deg); } }`
          )
          .join('\n')}
      `}</style>
    </svg>
  );
}

export default function YogaCategoryMap() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  // Animation state for the line
  const [lineProgress, setLineProgress] = useState(0); // 0 = at node, 1 = at orb
  const animRef = React.useRef<number | null>(null);
  const ANIMATION_DURATION = 700; // ms
  const lastHover = React.useRef<string | null>(null);

  // DEV MODE
  const devMode = false;
  // Production: use static positions
  const positions = hardcodedPositions;

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleNodeClick(cat: string) {
    router.push(`/yoga/positions/${cat.toLowerCase().replace(/\s+/g, '-')}`);
  }

  useEffect(() => {
    if (hovered) {
      setLineProgress(0);
      const start = performance.now();
      function animate(now: number) {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / ANIMATION_DURATION);
        setLineProgress(progress);
        if (progress < 1 && hovered === lastHover.current) {
          animRef.current = requestAnimationFrame(animate);
        }
      }
      lastHover.current = hovered;
      animRef.current = requestAnimationFrame(animate);
    } else {
      setLineProgress(0);
      lastHover.current = null;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [hovered]);

  return (
    <div className="relative w-[800px] h-[800px] mx-auto">
      {/* Rotating multi-plane hexagon globe */}
      <RotatingHexGlobe />
      {/* Animated particles from orb */}
      <AnimatedParticles />
      {/* Sci-fi orb (sun) in the center */}
      <svg width="800" height="800" className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft white animated glow layers */}
        <circle cx={ORB_CENTER_X} cy={ORB_CENTER_Y} r={140} fill="url(#orb-glow-outer)" opacity="0.35" />
        <circle cx={ORB_CENTER_X} cy={ORB_CENTER_Y} r={38} fill="url(#orb-glow-white)" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={ORB_CENTER_X} cy={ORB_CENTER_Y} r={22} fill="url(#orb-core-white)" opacity="1">
          <animate attributeName="opacity" values="1;0.5;1" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <defs>
          <radialGradient id="orb-glow-outer" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-glow-white" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-core-white" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        {/* Hover line effect */}
        {hovered && (() => {
          const node = positions.find(n => n.cat === hovered);
          if (!node) return null;
          // Animate x2/y2 from node to orb
          const x1 = node.x;
          const y1 = node.y;
          const x2 = ORB_CENTER_X;
          const y2 = ORB_CENTER_Y;
          const x = x1 + (x2 - x1) * lineProgress;
          const y = y1 + (y2 - y1) * lineProgress;
          return (
            <line
              x1={x1}
              y1={y1}
              x2={x}
              y2={y}
              stroke="#fff"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="hover-orb-line"
            />
          );
        })()}
      </svg>
      {/* Yoga category nodes with animation */}
      {positions.map((node, i) => {
        // Animation: from center to mapped position, fade in
        const delay = i * 60; // ms, staggered
        const floatDelay = (i * 0.18).toFixed(2); // seconds, unique per node
        return (
          <div
            key={node.cat}
            className="absolute z-10 group cursor-pointer select-none float-anim"
            style={{
              left: `calc(50% - ${NODE_SIZE / 2}px)`,
              top: `calc(50% - ${NODE_SIZE / 2}px)`,
              width: NODE_SIZE,
              height: NODE_SIZE,
              opacity: 0,
              transform: `translate(0px, 0px)`,
              transition: `opacity 0.7s ${delay}ms, transform 0.7s cubic-bezier(.4,2,.6,1) ${delay}ms`,
              ...(mounted && {
                left: node.x - NODE_SIZE / 2,
                top: node.y - NODE_SIZE / 2,
                opacity: 1,
                transform: `translate(0,0)`
              }),
              animationDelay: `${floatDelay}s`,
            }}
            onClick={() => handleNodeClick(node.cat)}
            onMouseEnter={() => setHovered(node.cat)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_16px_4px_rgba(255,255,255,0.45)] flex items-center justify-center border-2 border-white group-hover:scale-110 group-hover:shadow-[0_0_24px_8px_rgba(255,255,255,0.7)] transition-all duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-lg" />
            </div>
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 text-white text-xs font-medium whitespace-nowrap transition-all duration-300">
              {node.cat}
            </div>
          </div>
        );
      })}
      <style jsx>{`
        .glow-line {
          filter: drop-shadow(0 0 6px #38bdf8) drop-shadow(0 0 12px #38bdf8);
        }
        .hover-orb-line {
          stroke: #fff;
          filter: drop-shadow(0 0 6px #fff);
        }
        .float-anim {
          animation: float 3.2s ease-in-out infinite;
        }
        @keyframes float {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 