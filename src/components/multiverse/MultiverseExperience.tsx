"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useMultiverse } from "./MultiverseContext";
import { BlackHoleEngine } from "./black-hole-engine";
import { WormholeEngine } from "./wormhole-engine";
import { DimensionSceneBuilder } from "./world-generator";

export function MultiverseExperience() {
  const {
    phase,
    currentDimensionIndex,
    currentDimension,
    audioEnabled,
    exitUniverse,
    warpToNextDimension,
    toggleAudio,
    toggleFullscreen,
  } = useMultiverse();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // HUD visibility state
  const [hudVisible, setHudVisible] = useState(true);
  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse kinematics
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      setHudVisible(true);
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
      hudTimerRef.current = setTimeout(() => {
        setHudVisible(false);
      }, 3800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    };
  }, []);

  // Three.js Lifecycle
  useEffect(() => {
    if (phase === "idle") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 32);

    // Background starfield
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 500;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 500;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.1,
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Engines
    const blackHole = new BlackHoleEngine();
    const wormhole = new WormholeEngine();
    scene.add(blackHole.group);
    scene.add(wormhole.group);

    // Active Dimension objects
    let activeDimScene: {
      cleanup: () => void;
      animate: (time: number, delta: number) => void;
    } | null = null;

    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Phase handling
      if (phase === "awakening") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        blackHole.update(time, delta, 0.4, mx, my);
        camera.position.z = 32 - time * 2.0;
        camera.lookAt(0, 0, 0);
      } else if (phase === "collapse") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        blackHole.update(time, delta, 1.0, mx, my);
        // Approach event horizon rapidly
        camera.position.z = Math.max(6.0, 30.0 - time * 9.0);
        camera.lookAt(0, 0, 0);
      } else if (phase === "horizon" || phase === "singularity") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        blackHole.update(time, delta, 2.0, mx, my);
        camera.position.z = 5.2;
      } else if (phase === "wormhole" || phase === "warping" || phase === "returning") {
        blackHole.group.visible = false;
        wormhole.group.visible = true;
        if (activeDimScene) {
          activeDimScene.cleanup();
          activeDimScene = null;
        }

        const speed = phase === "warping" ? 3.0 : (phase === "returning" ? -2.2 : 1.8);
        wormhole.update(time, delta, speed);
        camera.position.set(mx * 1.5, my * 1.5, 0);
        camera.lookAt(mx * 0.5, my * 0.5, -40);
      } else if (phase === "dimension") {
        blackHole.group.visible = false;
        wormhole.group.visible = false;

        if (!activeDimScene) {
          activeDimScene = DimensionSceneBuilder.buildDimension(currentDimensionIndex, scene);
        }

        activeDimScene.animate(time, delta);

        // Smooth dimensional camera drift + mouse parallax
        camera.position.x = Math.sin(time * 0.2) * 8 + mx * 6;
        camera.position.y = Math.cos(time * 0.15) * 4 + my * 4;
        camera.position.z = 40 + Math.sin(time * 0.1) * 5;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (activeDimScene) activeDimScene.cleanup();
      blackHole.dispose();
      wormhole.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, [phase, currentDimensionIndex]);

  if (phase === "idle") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] overflow-hidden bg-black select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block" />

      {/* Relativistic Flash Overlay for Event Horizon Phase */}
      <div
        className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-700 ${
          phase === "horizon" ? "opacity-90" : "opacity-0"
        }`}
      />

      {/* Momentary Total Void Singularity */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
          phase === "singularity" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Multiverse HUD (reveals in Dimension phase) */}
      {phase === "dimension" && (
        <div
          className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 transition-opacity duration-500 ${
            hudVisible ? "opacity-100" : "opacity-20 hover:opacity-100"
          }`}
        >
          {/* Top Bar: Brand, Coordinates & Controls */}
          <div className="flex items-center justify-between">
            <div className="pointer-events-auto flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/40 bg-zinc-950/80 font-mono text-xs font-bold text-amber-300 shadow-lg shadow-amber-500/10 backdrop-blur-md">
                HS
              </span>
              <div>
                <div className="font-display text-sm font-semibold tracking-[0.2em] text-white">
                  HS INFINITE
                </div>
                <div className="font-mono text-[10px] tracking-widest text-amber-300/80 uppercase">
                  Beyond Reality · {currentDimension.name}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAudio}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 text-xs font-mono text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                title={audioEnabled ? "Mute Cosmic Audio" : "Unmute Audio"}
              >
                <span>{audioEnabled ? "♫ AUDIO ON" : "✕ MUTED"}</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 text-xs font-mono text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                title="Toggle Fullscreen"
              >
                <span>⛶ FULLSCREEN</span>
              </button>

              <button
                type="button"
                onClick={exitUniverse}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-red-500/40 bg-red-950/30 px-4 text-xs font-mono font-bold uppercase tracking-wider text-red-300 backdrop-blur-md transition-all hover:border-red-400 hover:bg-red-900/50 hover:text-white shadow-lg shadow-red-950/30"
              >
                <span>✕ EXIT UNIVERSE</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar: World Information & Warp Jump */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            {/* World Specs Panel */}
            <div className="pointer-events-auto max-w-lg rounded-2xl border border-white/10 bg-black/75 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                  {currentDimension.subtitle}
                </span>
              </div>

              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {currentDimension.title}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                {currentDimension.description}
              </p>

              {/* Physical Metrics Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[11px] font-mono text-white/60">
                <div>
                  <span className="text-white/40">GRAVITY:</span> {currentDimension.metrics.gravitationalConstant}
                </div>
                <div>
                  <span className="text-white/40">VELOCITY:</span> {currentDimension.metrics.relativisticBeta}
                </div>
                <div>
                  <span className="text-white/40">CURVATURE:</span> {currentDimension.metrics.curvatureTensor}
                </div>
                <div>
                  <span className="text-white/40">ENTROPY:</span> {currentDimension.metrics.entropyIndex}
                </div>
              </div>
            </div>

            {/* Warp Jump Button */}
            <div className="pointer-events-auto flex flex-col items-end gap-2">
              <div className="font-mono text-[10px] text-white/40 tracking-wider">
                SEED: #{currentDimension.seed} · DIMENSION {currentDimensionIndex + 1} OF 8
              </div>

              <button
                type="button"
                onClick={warpToNextDimension}
                className="group relative inline-flex items-center gap-3 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500/30 via-zinc-900 to-amber-950/50 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-200 shadow-xl shadow-amber-500/20 backdrop-blur-md transition-all hover:scale-105 hover:border-amber-300 hover:shadow-amber-500/40"
              >
                <span>WARP TO NEXT DIMENSION</span>
                <span className="text-amber-400 transition-transform group-hover:translate-x-1">
                  ❯
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wormhole Hyperspace Travel Indicator */}
      {(phase === "wormhole" || phase === "warping") && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-amber-300/80 animate-pulse">
            TRANSCENDING REALITY
          </div>
          <div className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-widest text-white">
            WORMHOLE ACCELERATION
          </div>
          <div className="mt-4 font-mono text-[11px] text-white/50 tracking-wider">
            SYNCHRONIZING SPACETIME METRIC · VELOCITY &gt; c
          </div>
        </div>
      )}

      {/* Returning Sequence Indicator */}
      {phase === "returning" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-300/80 animate-pulse">
            REVERSING SINGULARITY
          </div>
          <div className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-widest text-white">
            RETURNING TO HS AI STUDIO
          </div>
          <div className="mt-4 font-mono text-[11px] text-white/50 tracking-wider">
            RECONSTRUCTING WEBSITE FROM EVENT HORIZON
          </div>
        </div>
      )}
    </div>
  );
}
