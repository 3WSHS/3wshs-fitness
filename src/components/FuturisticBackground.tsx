'use client';
import React, { useRef, useEffect, useState } from "react";
import Particles from "@tsparticles/react";

export default function FuturisticBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {/* Animated Network/Particle Effect */}
      <div style={{ position: 'absolute', left: '50%', top: '43%', width: 1600, height: 1600, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0, opacity: 0.28 }}>
        <Particles
          id="tsparticles"
          options={{
            fullScreen: false,
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              number: { value: 120, density: { enable: false } },
              color: { value: "#cccccc" },
              size: { value: 6 },
              opacity: { value: 0.5 },
              move: { enable: false },
              links: { enable: false }
            }
          }}
          style={{ width: 1600, height: 1600, pointerEvents: 'none' }}
        />
      </div>
      {/* Layered 3D-Like Globe */}
      <div className="absolute left-1/2 top-[43%] z-0 pointer-events-none" style={{ width: 1600, height: 1600, transform: 'translate(-50%, -50%)' }}>
        {/* Globe Ellipse Layers (doubled in size) */}
        {/* Layer 1 */}
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none" className="globe-layer globe-layer-1" style={{ position: 'absolute', left: 0, top: 0 }}>
          <ellipse cx="800" cy="800" rx="540" ry="240" stroke="#cccccc" strokeWidth="1.5" opacity="0.25" fill="none" />
        </svg>
        {/* Layer 2 */}
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none" className="globe-layer globe-layer-2" style={{ position: 'absolute', left: 0, top: 0 }}>
          <ellipse cx="800" cy="800" rx="440" ry="340" stroke="#cccccc" strokeWidth="1.5" opacity="0.18" fill="none" />
        </svg>
        {/* Layer 3 */}
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none" className="globe-layer globe-layer-3" style={{ position: 'absolute', left: 0, top: 0 }}>
          <ellipse cx="800" cy="800" rx="340" ry="540" stroke="#cccccc" strokeWidth="1.5" opacity="0.22" fill="none" />
        </svg>
        {/* Layer 4 */}
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none" className="globe-layer globe-layer-4" style={{ position: 'absolute', left: 0, top: 0 }}>
          <ellipse cx="800" cy="800" rx="540" ry="540" stroke="#cccccc" strokeWidth="1.2" opacity="0.13" fill="none" />
        </svg>
        {/* Layer 5 */}
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none" className="globe-layer globe-layer-5" style={{ position: 'absolute', left: 0, top: 0 }}>
          <ellipse cx="800" cy="800" rx="240" ry="540" stroke="#cccccc" strokeWidth="1.5" opacity="0.18" fill="none" />
        </svg>
        {/* Layer 6 */}
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none" className="globe-layer globe-layer-6" style={{ position: 'absolute', left: 0, top: 0 }}>
          <ellipse cx="800" cy="800" rx="540" ry="140" stroke="#cccccc" strokeWidth="1.5" opacity="0.18" fill="none" />
        </svg>
        {/* Animated Globe Nodes */}
        {mounted && <GlobeNodes center={800} scale={2} />}
      </div>
      {/* Animated SVG Network Effect (over globe, under muscle map) */}
      {mounted && <AnimatedNetwork />}
      <style jsx>{`
        .globe-layer {
          will-change: transform;
        }
        .globe-layer-1 { animation: globe-tilt-1 18s linear infinite; }
        .globe-layer-2 { animation: globe-tilt-2 22s linear infinite; }
        .globe-layer-3 { animation: globe-tilt-3 28s linear infinite; }
        .globe-layer-4 { animation: globe-tilt-4 32s linear infinite; }
        .globe-layer-5 { animation: globe-tilt-5 24s linear infinite; }
        .globe-layer-6 { animation: globe-tilt-6 30s linear infinite; }
        @keyframes globe-tilt-1 {
          0% { transform: rotateZ(0deg) rotateX(0deg); }
          100% { transform: rotateZ(360deg) rotateX(18deg); }
        }
        @keyframes globe-tilt-2 {
          0% { transform: rotateZ(0deg) rotateY(0deg); }
          100% { transform: rotateZ(-360deg) rotateY(24deg); }
        }
        @keyframes globe-tilt-3 {
          0% { transform: rotateZ(0deg) rotateX(0deg); }
          100% { transform: rotateZ(360deg) rotateX(-18deg); }
        }
        @keyframes globe-tilt-4 {
          0% { transform: rotateZ(0deg) rotateY(0deg); }
          100% { transform: rotateZ(360deg) rotateY(-24deg); }
        }
        @keyframes globe-tilt-5 {
          0% { transform: rotateZ(0deg) rotateX(0deg); }
          100% { transform: rotateZ(-360deg) rotateX(12deg); }
        }
        @keyframes globe-tilt-6 {
          0% { transform: rotateZ(0deg) rotateY(0deg); }
          100% { transform: rotateZ(360deg) rotateY(12deg); }
        }
        .network-dot {
          animation: network-dot-float 3s ease-in-out infinite alternate;
        }
        @keyframes network-dot-float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-18px); }
        }
        .network-line {
          stroke-dasharray: 8 4;
          animation: network-line-flicker 2s linear infinite alternate;
        }
        @keyframes network-line-flicker {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        /* Animated Globe Lines */
        .globe-anim-line { stroke-dasharray: 80 12; stroke-linecap: round; }
        .globe-anim-line-0 { animation: globe-move-0 3.2s linear infinite alternate; }
        .globe-anim-line-1 { animation: globe-move-1 2.7s linear infinite alternate; }
        .globe-anim-line-2 { animation: globe-move-2 3.7s linear infinite alternate; }
        .globe-anim-line-3 { animation: globe-move-3 2.9s linear infinite alternate; }
        .globe-anim-line-4 { animation: globe-move-4 3.5s linear infinite alternate; }
        .globe-anim-line-5 { animation: globe-move-5 2.5s linear infinite alternate; }
        .globe-anim-line-6 { animation: globe-move-6 3.1s linear infinite alternate; }
        .globe-anim-line-7 { animation: globe-move-7 2.8s linear infinite alternate; }
        @keyframes globe-move-0 { 0% { opacity: 0.2; stroke-dashoffset: 0; } 100% { opacity: 1; stroke-dashoffset: 60; } }
        @keyframes globe-move-1 { 0% { opacity: 1; stroke-dashoffset: 0; } 100% { opacity: 0.3; stroke-dashoffset: 40; } }
        @keyframes globe-move-2 { 0% { opacity: 0.5; stroke-dashoffset: 0; } 100% { opacity: 1; stroke-dashoffset: 80; } }
        @keyframes globe-move-3 { 0% { opacity: 1; stroke-dashoffset: 0; } 100% { opacity: 0.2; stroke-dashoffset: 30; } }
        @keyframes globe-move-4 { 0% { opacity: 0.7; stroke-dashoffset: 0; } 100% { opacity: 1; stroke-dashoffset: 70; } }
        @keyframes globe-move-5 { 0% { opacity: 1; stroke-dashoffset: 0; } 100% { opacity: 0.4; stroke-dashoffset: 50; } }
        @keyframes globe-move-6 { 0% { opacity: 0.3; stroke-dashoffset: 0; } 100% { opacity: 1; stroke-dashoffset: 90; } }
        @keyframes globe-move-7 { 0% { opacity: 1; stroke-dashoffset: 0; } 100% { opacity: 0.5; stroke-dashoffset: 20; } }
      `}</style>
    </div>
  );
}

// Animated Network Component
function AnimatedNetwork() {
  type Node = { x: number; y: number; opacity: number };
  type Drift = {
    xBase: number;
    yBase: number;
    xAmp: number;
    yAmp: number;
    xPhase: number;
    yPhase: number;
    xSpeed: number;
    ySpeed: number;
    fadePhase: number;
    fadeSpeed: number;
  };
  type Line = [number, number, number, number, number];
  const NODE_COUNT = 60;
  // Get viewport size
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  useEffect(() => {
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Random drift and fade parameters for each node
  const driftParams = useRef<Drift[]>(
    Array.from({ length: NODE_COUNT }, () => ({
      xBase: Math.random(),
      yBase: Math.random(),
      xAmp: 120 + Math.random() * 240,
      yAmp: 120 + Math.random() * 240,
      xPhase: Math.random() * Math.PI * 2,
      yPhase: Math.random() * Math.PI * 2,
      xSpeed: 0.0001 + Math.random() * 0.0003,
      ySpeed: 0.0001 + Math.random() * 0.0003,
      fadePhase: Math.random() * Math.PI * 2,
      fadeSpeed: 0.0003 + Math.random() * 0.0003,
    }))
  );
  // Animation frame ref
  const animRef = useRef<number | null>(null);
  // Store latest nodes in a ref
  const nodesRef = useRef<Node[]>([]);
  // Dummy state to force re-render on every frame
  const [, setRerender] = useState(0);

  // Animation loop (does not use state)
  useEffect(() => {
    let running = true;
    function animate() {
      if (!running) return;
      const now = Date.now();
      nodesRef.current = driftParams.current.map((drift) => {
        const x = drift.xBase * dimensions.width + Math.sin(now * drift.xSpeed + drift.xPhase) * drift.xAmp;
        const y = drift.yBase * dimensions.height + Math.cos(now * drift.ySpeed + drift.yPhase) * drift.yAmp;
        const opacity = 0.4 + 0.6 * Math.max(0, Math.sin(now * drift.fadeSpeed + drift.fadePhase));
        return { x, y, opacity };
      });
      setRerender(r => r + 1); // force re-render every frame
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [dimensions]);

  // Connect each node to its 4 nearest neighbors
  const nodes = nodesRef.current;
  const lines: Line[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const dists: { j: number; d: number }[] = nodes.map((n, j) => ({ j, d: i === j ? Infinity : Math.hypot(nodes[i]?.x - n.x, nodes[i]?.y - n.y) }));
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 4; k++) {
      if (!dists[k]) continue;
      const next: number = dists[k].j;
      if (typeof next === 'number' && i < next) {
        lines.push([
          nodes[i]?.x,
          nodes[i]?.y,
          nodes[next]?.x,
          nodes[next]?.y,
          Math.min(nodes[i]?.opacity, nodes[next]?.opacity)
        ]);
      }
    }
  }

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      {lines.map(([x1, y1, x2, y2, opacity], idx) => (
        <line
          key={idx}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#cccccc"
          strokeWidth="1.2"
          opacity={0.2 * opacity}
        />
      ))}
      {nodes.map((node, idx) => (
        <circle
          key={idx}
          cx={node.x}
          cy={node.y}
          r={5}
          fill="#cccccc"
          opacity={node.opacity}
        />
      ))}
    </svg>
  );
}

// Animated Globe Nodes Component
type NodeGlobe = { x: number; y: number; color: string; opacity: number };
function GlobeNodes({ center, scale }: { center: number; scale: number }) {
  // Each entry: [rx, ry, count, speed, color, opacity]
  const ellipses: [number, number, number, number, string, number][] = [
    [270, 120, 3, 0.00012, '#cccccc', 0.7],
    [220, 170, 2, 0.00016, '#cccccc', 0.6],
    [170, 270, 3, 0.00009, '#cccccc', 0.7],
    [270, 270, 4, 0.00007, '#cccccc', 0.5],
    [120, 270, 2, 0.00013, '#cccccc', 0.6],
    [270, 70, 2, 0.00018, '#cccccc', 0.5],
  ];
  // Animation tick ref
  const tickRef = React.useRef(0);
  // Local state to force re-render on mount only
  const [, setRender] = React.useState(0);
  useEffect(() => { setRender(r => r + 1); }, []);

  // Animation loop (does not use state)
  useEffect(() => {
    let running = true;
    function animate() {
      if (!running) return;
      tickRef.current = Date.now();
      requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  const now = Date.now();
  const nodes: NodeGlobe[] = [];
  ellipses.forEach(([rx, ry, count, speed, color, baseOpacity], i) => {
    for (let j = 0; j < Number(count); j++) {
      const phase = (j / Number(count)) * Math.PI * 2 + i;
      const angle = (now * Number(speed) + phase) % (Math.PI * 2);
      const x = center + Number(rx) * Math.cos(angle) * scale;
      const y = center + Number(ry) * Math.sin(angle) * scale;
      // Flicker/fade effect
      const opacity = Number(baseOpacity) * (0.7 + 0.3 * Math.abs(Math.sin(now * 0.001 + phase * 2)));
      nodes.push({ x, y, color: String(color), opacity });
    }
  });
  return (
    <svg width="800" height="800" viewBox="0 0 800 800" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      {nodes.map((node, idx) => (
        <circle
          key={idx}
          cx={node.x}
          cy={node.y}
          r={8}
          fill={node.color}
          opacity={node.opacity}
          filter="url(#glow)"
        />
      ))}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
} 