"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const METRICS = [
  { label: "AI Products", value: "4 Flagships", color: "text-cyan-400", border: "border-cyan-500/30" },
  { label: "Execution Engine", value: "Neural v4", color: "text-amber-400", border: "border-amber-500/30" },
  { label: "Response Latency", value: "< 12ms", color: "text-purple-400", border: "border-purple-500/30" },
  { label: "Ecosystem Status", value: "100% Operational", color: "text-emerald-400", border: "border-emerald-500/30" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 cyber-grid"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/15 to-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-10">
        
        {/* Top Floating Cyber Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0d111d]/90 border border-cyan-500/40 text-xs font-black tracking-widest text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>AUTONOMOUS CYBER AI ECOSYSTEM V2.0</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
            Engineering Supremacy. <br />
            <span className="neon-gradient-text">
              One Ecosystem. Infinite AI.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Bespoke suite of high-performance artificial intelligence tools for cybersecurity, career intelligence, multimodal coding, and autonomous app synthesis.
          </p>
        </motion.div>

        {/* Action Button Stage */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <a
            href="#solutions"
            className="h-14 px-9 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest inline-flex items-center gap-3 shadow-[0_0_35px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Solutions Shelf</span>
            <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a
            href="#features"
            className="h-14 px-8 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] text-white font-bold text-xs uppercase tracking-widest border border-white/15 hover:border-cyan-400/50 inline-flex items-center gap-2.5 transition-all duration-300 shadow-lg"
          >
            <span>Inspect Live HUD</span>
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>

        {/* Central Futuristic Interactive Command Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-5xl rounded-3xl bg-[#090b14]/90 border border-cyan-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-2xl grid md:grid-cols-2 gap-8 items-center text-left"
        >
          {/* Top Laser Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-amber-400 to-purple-500" />

          {/* Left Side: Animated Cyber Terminal Log */}
          <TerminalWidget />

          {/* Right Side: 3D Hologram Cube Stage */}
          <div className="flex items-center justify-center relative min-h-[260px]">
            <ThreeScene />
          </div>
        </motion.div>

        {/* 4 Cyber Metric Bento Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className={`p-5 rounded-2xl bg-[#090b14]/80 border ${m.border} text-left space-y-1 shadow-lg backdrop-blur-xl hover:scale-[1.03] transition-transform`}
            >
              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                {m.label}
              </span>
              <span className={`text-lg sm:text-xl font-black ${m.color} block`}>
                {m.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}

function TerminalWidget() {
  const [logs, setLogs] = useState<string[]>([
    "[SYS OK] Initializing HS AI Neural Core...",
    "[STATUS] AIShield v4.2 Security Protocol Active",
    "[STATUS] CareerAI Roadmap Engine Operational",
    "[STATUS] HS AI Chatbot Multimodal Stream Online",
    "[STATUS] AI App Builder Executable Setup Ready",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = `[PING ${Math.floor(Math.random() * 10 + 5)}ms] Neural latency optimal. Stream active.`;
        return [...prev.slice(1), nextLog];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
          LIVE CYBER CONSOLE
        </span>
      </div>

      <div className="space-y-2 font-mono text-xs text-zinc-300">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">&gt;</span>
            <span className={idx === logs.length - 1 ? "text-amber-300 font-bold animate-pulse" : "text-zinc-400"}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(260, 260);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current?.appendChild(renderer.domElement);

      // Holographic Diamond Octahedron Core
      const octaGeo = new THREE.OctahedronGeometry(1.4, 0);
      const octaMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const octa = new THREE.Mesh(octaGeo, octaMat);
      scene.add(octa);

      // Inner Core Glow
      const icoGeo = new THREE.IcosahedronGeometry(0.8, 1);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const ico = new THREE.Mesh(icoGeo, icoMat);
      scene.add(ico);

      // Swarming Particles
      const particlesGeo = new THREE.BufferGeometry();
      const count = 300;
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.5 + Math.random() * 1.0;
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
      }

      particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particlesMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      camera.position.z = 4.2;

      const animate = () => {
        octa.rotation.y += 0.006;
        octa.rotation.x += 0.003;
        ico.rotation.y -= 0.008;
        particles.rotation.y += 0.003;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        renderer.dispose();
        mountRef.current?.removeChild(renderer.domElement);
      };
    };

    init();

    return () => cleanup?.();
  }, []);

  return <div ref={mountRef} className="w-[260px] h-[260px] pointer-events-none" />;
}