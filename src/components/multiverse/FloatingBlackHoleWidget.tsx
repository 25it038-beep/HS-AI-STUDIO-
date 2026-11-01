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

    const size = 110;
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
      const speedMult = isHovered ? 1.8 : 0.75;
      blackHole.update(
        time * speedMult,
        delta,
        isHovered ? 0.7 : 0.0,
        mouseRef.current.x,
        mouseRef.current.y
      );

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

    let origin = { x: window.innerWidth - 64, y: window.innerHeight / 2 };
    if (widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    openPortal(origin);
  };

  // Only render if we are in idle state
  if (phase !== "idle") {
    return null;
  }

  return (
    <div
      ref={widgetRef}
      data-multiverse-widget="true"
      className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-40 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label: ENTER COSMOS with Champagne-Gold and Blue-White highlights */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.button
            type="button"
            onClick={handleTrigger}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.3 }}
            className={`group flex items-center gap-2.5 rounded-full border bg-[#08070d]/92 py-2 pl-3.5 pr-3 shadow-2xl backdrop-blur-xl transition-all active:scale-95 cursor-pointer ${
              isHovered
                ? "border-cyan-400/80 bg-[#0f0e1c] shadow-cyan-500/25 ring-1 ring-amber-400/50"
                : "border-amber-400/40 shadow-amber-950/40"
            }`}
          >
            <div className="flex flex-col text-left">
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                HS COSMIC CONSUMPTION
              </span>
              <span className="font-display text-[12px] font-bold tracking-wider text-white group-hover:text-amber-200 uppercase flex items-center gap-1.5">
                ENTER COSMOS
                <span className="text-amber-400 transition-transform group-hover:translate-x-1 font-mono">✦</span>
              </span>
            </div>
            <span className="rounded bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-400/30 px-2 py-0.5 text-[9px] font-mono font-bold text-amber-200">
              ACTIVATION
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
          scale: isHovered ? 1.08 : 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full p-[2px] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="ENTER COSMOS — Gravitational Singularity Activation"
        title="HS Cosmic Consumption — Click to activate black hole gravitational simulation"
      >
        {/* Pulsing gravitational horizon aura with gold and blue-white highlights */}
        <span className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-500/30 via-cyan-500/20 to-purple-600/30 blur-md animate-pulse pointer-events-none" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400/50 via-sky-400/30 to-black blur-sm pointer-events-none" />

        {/* Outer glowing border ring */}
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-amber-400/60 bg-black/95 shadow-2xl shadow-cyan-500/25 overflow-hidden">
          {/* Miniature 3D Black Hole WebGL Canvas */}
          <canvas
            ref={canvasRef}
            className="h-full w-full block pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Central deep-black event horizon shadow gradient */}
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_16px_rgba(0,0,0,0.98)]" />
        </div>
      </motion.button>
    </div>
  );
}
