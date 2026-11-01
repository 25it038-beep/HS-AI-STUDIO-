"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useMultiverse } from "./MultiverseContext";
import { BlackHoleEngine } from "./black-hole-engine";
import { WormholeEngine } from "./wormhole-engine";
import { DimensionSceneBuilder, DIMENSIONS } from "./world-generator";

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

  // Live speed counter state for display
  const [speedMetric, setSpeedMetric] = useState("84.2 c");

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
      }, 4500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    };
  }, []);

  // Speedometer fluctuation
  useEffect(() => {
    if (phase !== "dimension" && phase !== "warping") return;
    const interval = setInterval(() => {
      const base = phase === "warping" ? 380 : 80;
      const val = (base + Math.random() * 45).toFixed(1);
      setSpeedMetric(`${val} c`);
    }, 120);
    return () => clearInterval(interval);
  }, [phase]);

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
    const starCount = 2400;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 600;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 600;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
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
        blackHole.update(time, delta, 0.6, mx, my);
        camera.position.z = 32 - time * 3.0;
        camera.lookAt(0, 0, 0);
      } else if (phase === "collapse") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        blackHole.update(time, delta, 1.4, mx, my);
        // Approach event horizon rapidly
        camera.position.z = Math.max(5.5, 30.0 - time * 11.0);
        camera.lookAt(0, 0, 0);
      } else if (phase === "horizon" || phase === "singularity") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        blackHole.update(time, delta, 2.5, mx, my);
        camera.position.z = 5.0;
      } else if (phase === "wormhole" || phase === "warping" || phase === "returning") {
        blackHole.group.visible = false;
        wormhole.group.visible = true;
        if (activeDimScene) {
          activeDimScene.cleanup();
          activeDimScene = null;
        }

        const isWarping = phase === "warping";
        const isReturning = phase === "returning";
        const speed = isWarping ? 4.2 : (isReturning ? -2.8 : 2.2);

        wormhole.update(time, delta, speed);

        // High-speed camera shake & wider hyperspace FOV
        if (isWarping) {
          camera.fov = 88;
          const shakeX = (Math.random() - 0.5) * 1.5;
          const shakeY = (Math.random() - 0.5) * 1.5;
          camera.position.set(mx * 2 + shakeX, my * 2 + shakeY, 0);
        } else {
          camera.fov = 70;
          camera.position.set(mx * 1.5, my * 1.5, 0);
        }
        camera.updateProjectionMatrix();
        camera.lookAt(mx * 0.5, my * 0.5, -40);
      } else if (phase === "dimension") {
        blackHole.group.visible = false;
        wormhole.group.visible = false;

        camera.fov = 65;
        camera.updateProjectionMatrix();

        if (!activeDimScene) {
          activeDimScene = DimensionSceneBuilder.buildDimension(currentDimensionIndex, scene);
        }

        activeDimScene.animate(time, delta);

        // Rapid 3D roller-coaster trajectory with dynamic banking & zoom!
        const speedTime = time * 2.2;
        camera.position.x = Math.sin(speedTime * 0.8) * 16 + mx * 8;
        camera.position.y = Math.cos(speedTime * 0.6) * 10 + my * 6;
        camera.position.z = 30 + Math.sin(speedTime * 0.4) * 16;
        camera.rotation.z = Math.sin(speedTime * 0.7) * 0.28; // Dynamic roll angle!
        camera.lookAt(mx * 2, my * 2, -10);
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
        className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-600 ${
          phase === "horizon" ? "opacity-95" : "opacity-0"
        }`}
      />

      {/* Lightning Warp Burst Flash during high-speed transitions */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-400/25 via-white/40 to-cyan-400/25 transition-opacity duration-300 ${
          phase === "warping" ? "opacity-75" : "opacity-0"
        }`}
      />

      {/* Momentary Total Void Singularity */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
          phase === "singularity" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Multiverse Autonomous HUD (reveals in Dimension and Warping phase) */}
      {(phase === "dimension" || phase === "warping") && (
        <div
          className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-8 transition-opacity duration-500 ${
            hudVisible ? "opacity-100" : "opacity-30 hover:opacity-100"
          }`}
        >
          {/* Top Bar: Automated Tour Tracker & Speedometer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Brand + Tour Indicator */}
            <div className="pointer-events-auto flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/40 bg-zinc-950/80 font-mono text-xs font-bold text-amber-300 shadow-lg shadow-amber-500/10 backdrop-blur-md">
                HS
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-white">
                    HS INFINITE
                  </span>
                  <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[9px] font-mono font-bold text-amber-300 animate-pulse">
                    AUTOMATIC HYPERSPEED TOUR
                  </span>
                </div>
                <div className="font-mono text-[10px] tracking-widest text-amber-300/80 uppercase">
                  WORLD {currentDimensionIndex + 1} OF {DIMENSIONS.length} · {currentDimension.title}
                </div>
              </div>
            </div>

            {/* Live Speedometer & Controls */}
            <div className="pointer-events-auto flex items-center gap-2.5">
              {/* Relativistic Velocity Metric */}
              <div className="hidden md:flex items-center gap-2 rounded-full border border-amber-400/30 bg-black/70 px-4 py-1.5 font-mono text-xs text-amber-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-white/50">SPEED:</span>
                <span className="font-bold">{speedMetric}</span>
                <span className="text-white/40">·</span>
                <span className="text-amber-400 font-semibold">WARP 9.92</span>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 text-xs font-mono text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                title={audioEnabled ? "Mute Cosmic Audio" : "Unmute Audio"}
              >
                <span>{audioEnabled ? "♫ AUDIO" : "✕ MUTED"}</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 text-xs font-mono text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                title="Toggle Fullscreen"
              >
                <span>⛶</span>
              </button>

              <button
                type="button"
                onClick={exitUniverse}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-red-500/40 bg-red-950/30 px-4 text-xs font-mono font-bold uppercase tracking-wider text-red-300 backdrop-blur-md transition-all hover:border-red-400 hover:bg-red-900/50 hover:text-white shadow-lg shadow-red-950/30"
              >
                <span>✕ RETURN TO STUDIO</span>
              </button>
            </div>
          </div>

          {/* Segmented Multiverse Progress Bar across the top center */}
          <div className="pointer-events-auto w-full max-w-2xl mx-auto my-2">
            <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
              {DIMENSIONS.map((dim, idx) => {
                const isPassed = idx < currentDimensionIndex;
                const isActive = idx === currentDimensionIndex;
                return (
                  <div key={dim.id} className="flex flex-col gap-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-amber-400 shadow-md shadow-amber-400/80 animate-pulse"
                          : isPassed
                          ? "bg-cyan-400/90 shadow-sm shadow-cyan-400/40"
                          : "bg-white/15"
                      }`}
                    />
                    <span className="hidden sm:inline text-center font-mono text-[9px] text-white/40">
                      W0{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: World Information & Manual Warp Override */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-4 sm:gap-6">
            {/* World Specs Panel */}
            <div className="pointer-events-auto max-w-lg rounded-2xl border border-white/10 bg-black/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                  {currentDimension.subtitle}
                </span>
              </div>

              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {currentDimension.title}
              </h2>

              <p className="mt-1.5 text-xs text-white/70 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {currentDimension.description}
              </p>

              {/* Physical Metrics Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-2 text-[10px] sm:text-[11px] font-mono text-white/60">
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

            {/* Quick Skip Button */}
            <div className="pointer-events-auto flex items-center gap-3">
              <button
                type="button"
                onClick={warpToNextDimension}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:border-amber-400/60 hover:bg-amber-500/10 hover:text-white active:scale-95"
              >
                <span>SKIP TO NEXT WORLD</span>
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
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-amber-300/90 animate-pulse">
            HYPERSPEED WARP ENGAGED
          </div>
          <div className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-widest text-white">
            {phase === "warping" ? "WARPING TO NEXT UNIVERSE" : "ENTERING MULTIVERSE"}
          </div>
          <div className="mt-4 font-mono text-[11px] text-white/50 tracking-wider">
            TRANSIT VELOCITY: {speedMetric} · RELATIVISTIC DILATION ACTIVE
          </div>
        </div>
      )}

      {/* Automated Return Sequence Indicator */}
      {phase === "returning" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-300/90 animate-pulse">
            ✦ TOUR COMPLETE · REVERSING SINGULARITY ✦
          </div>
          <div className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-widest text-white">
            RETURNING TO HS AI STUDIO
          </div>
          <div className="mt-4 font-mono text-xs text-amber-300 font-semibold tracking-wider">
            RECONSTRUCTING WEBSITE ELEMENTS FROM THE EVENT HORIZON...
          </div>
        </div>
      )}
    </div>
  );
}
