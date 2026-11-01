"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useMultiverse } from "./MultiverseContext";
import { BlackHoleEngine } from "./black-hole-engine";

export function FloatingBlackHoleWidget() {
  const { openPortal, phase } = useMultiverse();
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Miniature Three.js Black Hole renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = 96;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(size, size);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 24);

    const blackHole = new BlackHoleEngine();
    scene.add(blackHole.group);

    let animId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Faster rotation when hovered
      const speedMult = isHovered ? 1.5 : 0.6;
      blackHole.update(time * speedMult, delta, isHovered ? 0.5 : 0.0, mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      blackHole.dispose();
      renderer.dispose();
    };
  }, [isHovered]);

  const handleTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase !== "idle") return;

    let origin = { x: window.innerWidth - 64, y: window.innerHeight - 120 };
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    openPortal(origin);
  };

  // Only render if we are in idle or starting sequence
  if (phase === "dimension" || phase === "wormhole" || phase === "warping") {
    return null;
  }

  return (
    <div
      ref={widgetRef}
      className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-40 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Expanded Floating Label / Action Pill */}
      <AnimatePresence>
        {isHovered && phase === "idle" && (
          <motion.button
            type="button"
            onClick={handleTrigger}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group hidden sm:flex items-center gap-3 rounded-full border border-amber-400/50 bg-[#09080e]/95 py-2.5 pl-4 pr-3.5 text-left shadow-2xl shadow-amber-950/40 backdrop-blur-xl transition-all hover:border-amber-400 hover:shadow-amber-500/25 active:scale-95"
          >
            <div className="flex flex-col">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                Gravitational Singularity
              </span>
              <span className="font-display text-xs font-bold tracking-wider text-white group-hover:text-amber-200">
                Suck Studio into Multiverse <span className="text-amber-400 inline-block transition-transform group-hover:translate-x-1">✦</span>
              </span>
            </div>
            <span className="rounded bg-amber-400/20 px-2 py-1 text-[10px] font-mono font-bold text-amber-300">
              CONSUME
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating 3D Black Hole Orb Widget */}
      <motion.button
        type="button"
        onClick={handleTrigger}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === "awakening" ? 1.3 : (phase === "collapse" ? 2.2 : 1),
          opacity: 1,
        }}
        transition={{
          scale: { duration: phase === "collapse" ? 1.6 : 0.4 },
          default: { type: "spring", stiffness: 260, damping: 20 },
        }}
        className="group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full p-[2px] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Activate Black Hole Singularity to suck studio into multiverse"
        title="Black Hole Singularity — Click to suck studio elements into multiverse"
      >
        {/* Pulsing gravitational horizon aura */}
        <span className="absolute -inset-2 rounded-full bg-amber-500/20 blur-md animate-pulse pointer-events-none" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500/40 via-purple-600/20 to-black blur-sm pointer-events-none" />

        {/* Outer glowing border ring */}
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-amber-400/40 bg-black/90 shadow-2xl shadow-amber-500/30 overflow-hidden">
          {/* Miniature 3D Black Hole WebGL Canvas */}
          <canvas
            ref={canvasRef}
            className="h-full w-full block pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Central event horizon shadow gradient */}
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.95)]" />
        </div>

        {/* Status Indicator Dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[9px] font-mono font-bold text-black items-center justify-center">
            ✦
          </span>
        </span>
      </motion.button>
    </div>
  );
}
