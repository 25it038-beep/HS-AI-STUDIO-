"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useMultiverse } from "./MultiverseContext";
import { BlackHoleEngine } from "./black-hole-engine";
import { Reveal } from "@/components/ui/Reveal";

export function BlackHolePortalSection() {
  const { openPortal, phase } = useMultiverse();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 28);

    const blackHole = new BlackHoleEngine();
    scene.add(blackHole.group);

    let animId: number;
    const clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      animId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      blackHole.update(time, delta, 0.0, mouseRef.current.x, mouseRef.current.y);
      renderer.render(scene, camera);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      blackHole.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="multiverse-portal" className="relative overflow-hidden bg-ink py-28 border-t border-white/[0.08]">
      {/* Background ambient cosmic glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-r from-amber-600/10 via-zinc-900 to-indigo-900/10 blur-3xl" />
      </div>

      <div className="container-x relative z-10 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-950/30 px-4 py-1 text-xs font-mono text-amber-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>PROJECT: HS INFINITE</span>
              <span className="text-white/30">·</span>
              <span>BEYOND REALITY</span>
            </div>
          </Reveal>

          {/* Typography */}
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase">
              HS AI Solutions
            </h2>
            <p className="mt-3 font-mono text-sm sm:text-base tracking-[0.25em] text-amber-300/90 uppercase">
              Beyond the Known Universe
            </p>
          </Reveal>

          {/* 3D Black Hole Interactive Portal */}
          <Reveal delay={0.2} className="w-full">
            <div className="relative mt-8 h-[380px] sm:h-[460px] w-full max-w-2xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-amber-950/20 backdrop-blur-xl">
              <canvas ref={canvasRef} className="h-full w-full block cursor-grab active:cursor-grabbing" />

              {/* Portal Center Hover Overlay */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-8">
                <span className="font-mono text-[11px] text-white/50 tracking-widest uppercase">
                  Interactive Gravitational Field · Move Cursor to Bend Spacetime
                </span>
              </div>
            </div>
          </Reveal>

          {/* Trigger Button: ENTER THE INFINITE */}
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  openPortal({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                  });
                }}
                disabled={phase !== "idle"}
                className="group relative inline-flex items-center gap-3 rounded-full border border-amber-400/70 bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-950/40 px-9 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-amber-200 shadow-2xl shadow-amber-500/25 backdrop-blur-xl transition-all hover:scale-105 hover:border-amber-300 hover:shadow-amber-500/50 active:scale-95 disabled:opacity-50"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                </span>
                <span>Enter the Infinite</span>
                <span className="text-amber-400 font-mono transition-transform group-hover:translate-x-1">
                  ✦
                </span>
              </button>

              <span className="text-[11px] font-mono text-white/40">
                Warning: Initiates real-time gravitational collapse and multidimensional wormhole transit.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
