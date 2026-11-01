"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useMultiverse } from "./MultiverseContext";
import { BlackHoleEngine } from "./black-hole-engine";
import { WormholeEngine } from "./wormhole-engine";
import { CosmicUniverseEngine, CelestialObjectData } from "./cosmic-universe-engine";

export function MultiverseExperience() {
  const {
    phase,
    audioEnabled,
    exitUniverse,
    toggleAudio,
    toggleFullscreen,
  } = useMultiverse();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Selected celestial object state & automated tour tracking
  const [selectedObject, setSelectedObject] = useState<CelestialObjectData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Explore Universe");
  const [hudVisible, setHudVisible] = useState(true);
  const [autoTourActive, setAutoTourActive] = useState(true);
  const [currentSceneName, setCurrentSceneName] = useState("SCENE C · GALAXY TRAVEL");
  const [returnCountdown, setReturnCountdown] = useState(24);

  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);
  const universeEnterTimeRef = useRef<number>(0);

  // Camera target controls for smooth fly-to
  const cameraTargetPos = useRef<THREE.Vector3 | null>(null);
  const cameraLookTarget = useRef<THREE.Vector3 | null>(null);

  // Mouse kinematics & orbit drag controls
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const orbitAngle = useRef({ theta: 0, phi: Math.PI * 0.45, radius: 55 });
  const mouseInertia = useRef({ x: 0, y: 0 });

  // Auto-hide HUD on cursor inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setHudVisible(true);
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
      hudTimerRef.current = setTimeout(() => {
        setHudVisible(false);
      }, 6000);
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
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 32);

    // 1. Black Hole Engine (Phase 1, 2, 3)
    const blackHole = new BlackHoleEngine();
    scene.add(blackHole.group);

    // 2. 3D Cylindrical Wormhole Engine (Phase 4 & 6)
    const wormhole = new WormholeEngine();
    scene.add(wormhole.group);

    // 3. Massive Interactive Cosmic Universe (Phase 5)
    const cosmicUniverse = new CosmicUniverseEngine();
    scene.add(cosmicUniverse.group);

    // Raycaster for celestial object picking
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // Default selection
    if (cosmicUniverse.celestialObjects.length > 0) {
      setSelectedObject(cosmicUniverse.celestialObjects[0]);
    }

    // Pointer event listeners for orbit & selection
    const handlePointerDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevPointer.current = { x: e.clientX, y: e.clientY };

      if (phase === "universe") {
        mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        const intersects = raycaster.intersectObjects(cosmicUniverse.interactiveMeshes, true);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const hitId = hit.userData?.id;
          const found = cosmicUniverse.celestialObjects.find((o) => o.id === hitId);
          if (found) {
            setSelectedObject(found);
            cameraTargetPos.current = found.targetCameraPos.clone();
            cameraLookTarget.current = found.position.clone();
            setAutoTourActive(false); // User took manual control
          }
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      mouseInertia.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseInertia.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (!isDragging.current || phase !== "universe") return;
      const dx = e.clientX - prevPointer.current.x;
      const dy = e.clientY - prevPointer.current.y;
      prevPointer.current = { x: e.clientX, y: e.clientY };

      orbitAngle.current.theta -= dx * 0.005;
      orbitAngle.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, orbitAngle.current.phi - dy * 0.005));

      // User manually rotated camera
      cameraTargetPos.current = null;
      setAutoTourActive(false);
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (phase !== "universe") return;
      orbitAngle.current.radius = Math.max(12, Math.min(180, orbitAngle.current.radius + e.deltaY * 0.05));
      cameraTargetPos.current = null;
      setAutoTourActive(false);
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("wheel", handleWheel, { passive: true });

    let animId: number;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Render depending on phase
      if (phase === "awakening") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = false;

        blackHole.update(time, delta, 0.6, mouseInertia.current.x, mouseInertia.current.y);
        camera.position.z = 32 - time * 1.5;
        camera.lookAt(0, 0, 0);
      } else if (phase === "collapse") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = false;

        // Black hole visual radius & speed grows as it swallows elements
        blackHole.update(time, delta, 2.2, mouseInertia.current.x, mouseInertia.current.y);
        blackHole.group.scale.setScalar(1.0 + (time * 0.35));

        // Camera accelerates towards event horizon
        camera.position.z = Math.max(5.0, 30.0 - time * 6.5);
        camera.lookAt(0, 0, 0);
      } else if (phase === "horizon" || phase === "singularity") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = false;

        blackHole.update(time, delta, 3.5, mouseInertia.current.x, mouseInertia.current.y);
        camera.position.z = 4.8;
      } else if (phase === "wormhole" || phase === "returning") {
        blackHole.group.visible = false;
        wormhole.group.visible = true;
        cosmicUniverse.group.visible = false;

        const isReturning = phase === "returning";
        const speed = isReturning ? -3.5 : 2.8;

        wormhole.update(time, delta, speed);
        camera.fov = 75;
        camera.updateProjectionMatrix();
        camera.position.set(mouseInertia.current.x * 2.2, mouseInertia.current.y * 2.2, 0);
        camera.lookAt(mouseInertia.current.x * 0.7, mouseInertia.current.y * 0.7, -45);
      } else if (phase === "universe") {
        blackHole.group.visible = false;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = true;

        if (universeEnterTimeRef.current === 0) {
          universeEnterTimeRef.current = time;
        }

        const universeElapsed = time - universeEnterTimeRef.current;
        setReturnCountdown(Math.max(0, Math.ceil(24 - universeElapsed)));

        cosmicUniverse.update(time, delta);
        camera.fov = 60;
        camera.updateProjectionMatrix();

        // AUTOMATIC CAMERA CHOREOGRAPHY:
        // Automatically glide through scenes unless manually overridden
        if (autoTourActive) {
          // Scene C: Galaxy Travel (0s - 6s)
          if (universeElapsed < 6) {
            const andromeda = cosmicUniverse.celestialObjects[0];
            if (andromeda) {
              setSelectedObject(andromeda);
              setCurrentSceneName("SCENE C · GALAXY TRAVEL (ANDROMEDA-IX)");
              cameraTargetPos.current = andromeda.targetCameraPos;
              cameraLookTarget.current = andromeda.position;
            }
          }
          // Scene D1: Relativistic Pulsar (6s - 12s)
          else if (universeElapsed < 12) {
            const pulsar = cosmicUniverse.celestialObjects.find((o) => o.category === "Pulsars") || cosmicUniverse.celestialObjects[2];
            if (pulsar) {
              setSelectedObject(pulsar);
              setCurrentSceneName("SCENE D1 · RELATIVISTIC PULSAR BEAMS (VELA PSR)");
              cameraTargetPos.current = pulsar.targetCameraPos;
              cameraLookTarget.current = pulsar.position;
            }
          }
          // Scene D2: Supernova Explosion & Singularity (12s - 18s)
          else if (universeElapsed < 18) {
            const supernova = cosmicUniverse.celestialObjects.find((o) => o.name.includes("Crab")) || cosmicUniverse.celestialObjects[5];
            if (supernova) {
              setSelectedObject(supernova);
              setCurrentSceneName("SCENE D2 · SUPERNOVA BLAST SHELL (CRAB REMNANT)");
              cameraTargetPos.current = supernova.targetCameraPos;
              cameraLookTarget.current = supernova.position;
            }
          }
          // Scene E: Infinite Universe & Exoplanet (18s - 24s)
          else {
            const planet = cosmicUniverse.celestialObjects.find((o) => o.category === "Planetary Systems") || cosmicUniverse.celestialObjects[6];
            if (planet) {
              setSelectedObject(planet);
              setCurrentSceneName("SCENE E · INFINITE MULTIVERSE & EXOPLANET FRONTIER");
              cameraTargetPos.current = planet.targetCameraPos;
              cameraLookTarget.current = planet.position;
            }
          }
        }

        // Camera flight to selected celestial target OR free orbit
        if (cameraTargetPos.current && cameraLookTarget.current) {
          camera.position.lerp(cameraTargetPos.current, 0.04);
          camera.lookAt(cameraLookTarget.current);
        } else {
          // Free spherical orbit camera
          const r = orbitAngle.current.radius;
          const th = orbitAngle.current.theta;
          const ph = orbitAngle.current.phi;

          const targetX = r * Math.sin(ph) * Math.sin(th);
          const targetY = r * Math.cos(ph);
          const targetZ = r * Math.sin(ph) * Math.cos(th);

          camera.position.x += (targetX - camera.position.x) * 0.08;
          camera.position.y += (targetY - camera.position.y) * 0.08;
          camera.position.z += (targetZ - camera.position.z) * 0.08;

          camera.lookAt(0, 0, -20);
        }
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
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);

      blackHole.dispose();
      wormhole.dispose();
      cosmicUniverse.dispose();
      renderer.dispose();
      universeEnterTimeRef.current = 0;
    };
  }, [phase, autoTourActive]);

  // Handler for category filtering in Cosmic Explorer
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setAutoTourActive(false); // User selected manually
    if (!canvasRef.current) return;

    const engineInstance = (window as unknown as { _cosmicEngine?: CosmicUniverseEngine })._cosmicEngine;
    const found =
      cat === "Explore Universe"
        ? engineInstance?.celestialObjects[0]
        : engineInstance?.celestialObjects.find(
            (o) => o.category === cat || o.name.toLowerCase().includes(cat.toLowerCase())
          );

    if (found) {
      setSelectedObject(found);
      cameraTargetPos.current = found.targetCameraPos.clone();
      cameraLookTarget.current = found.position.clone();
    } else {
      cameraTargetPos.current = null;
    }
  };

  if (phase === "idle") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] overflow-hidden bg-black select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block cursor-grab active:cursor-grabbing" />

      {/* Relativistic Flash Overlay for Event Horizon Phase */}
      <div
        className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-600 ${
          phase === "horizon" ? "opacity-95" : "opacity-0"
        }`}
      />

      {/* Singularity Void Darkness */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
          phase === "singularity" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Phase 5: Massive Interactive Cosmic Universe HUD */}
      {phase === "universe" && (
        <div
          className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-8 transition-opacity duration-500 ${
            hudVisible ? "opacity-100" : "opacity-35 hover:opacity-100"
          }`}
        >
          {/* Top Bar: Brand, Automated Sequence Telemetry & Return Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Brand + Cosmic Explorer Title */}
            <div className="pointer-events-auto flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/50 bg-zinc-950/90 font-mono text-xs font-bold text-amber-300 shadow-lg shadow-amber-500/20 backdrop-blur-md">
                HS
              </span>
              <div>
                <div className="font-display text-sm font-semibold tracking-[0.2em] text-white">
                  HS COSMIC CONSUMPTION
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-300 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  {currentSceneName}
                </div>
              </div>
            </div>

            {/* Navigation Categories & Auto-Tour Toggle */}
            <div className="pointer-events-auto flex flex-wrap items-center gap-2 rounded-full border border-white/12 bg-black/80 p-1.5 backdrop-blur-xl shadow-2xl">
              <button
                type="button"
                onClick={() => setAutoTourActive(!autoTourActive)}
                className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase transition-all ${
                  autoTourActive
                    ? "bg-gradient-to-r from-amber-500/30 to-cyan-500/30 text-amber-200 border border-amber-400/40"
                    : "bg-white/10 text-white/60 hover:text-white"
                }`}
              >
                {autoTourActive ? "● AUTO TOUR ACTIVE" : "○ MANUAL ORBIT"}
              </button>

              <span className="hidden lg:inline px-2 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400/80">
                EXPLORE:
              </span>

              {["Explore Universe", "Galaxies", "Nebulae", "Black Holes", "Pulsars"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className={`rounded-full px-2.5 py-1 font-mono text-xs transition-all ${
                    activeCategory === cat && !autoTourActive
                      ? "bg-amber-500/30 text-amber-300 font-semibold shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Controls: Countdown, Audio, Fullscreen & Return */}
            <div className="pointer-events-auto flex items-center gap-2.5">
              {/* Automated Return Countdown Telemetry */}
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3 py-1 font-mono text-[11px] text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Auto-Return: {returnCountdown}s</span>
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

              {/* Immediate Return Button */}
              <button
                type="button"
                onClick={exitUniverse}
                className="group relative inline-flex h-9 items-center gap-2 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500/25 via-zinc-900 to-amber-950/40 px-4 font-mono text-xs font-bold uppercase tracking-wider text-amber-200 shadow-xl shadow-amber-500/20 backdrop-blur-md transition-all hover:scale-105 hover:border-amber-300 hover:shadow-amber-500/40 cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>Return to HS AI Studio</span>
                <span className="text-amber-400 transition-transform group-hover:translate-x-0.5">
                  ↩
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Bar: Selected Celestial Object Details & Exploration Controls */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-6">
            {/* Celestial Object Dossier Card */}
            {selectedObject ? (
              <div className="pointer-events-auto max-w-lg rounded-2xl border border-white/12 bg-black/85 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                      {selectedObject.category} · {selectedObject.spectralClass}
                    </span>
                  </div>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-amber-300">
                    AUTOMATIC NAVIGATION
                  </span>
                </div>

                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                  {selectedObject.name}
                </h2>

                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  {selectedObject.description}
                </p>

                {/* Physical Astrophysics Metrics */}
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-2.5 text-[10.5px] font-mono text-white/60">
                  <div>
                    <span className="text-white/40">DISTANCE:</span> {selectedObject.distance}
                  </div>
                  <div>
                    <span className="text-white/40">MASS:</span> {selectedObject.mass}
                  </div>
                  <div>
                    <span className="text-white/40">TEMP:</span> {selectedObject.temperature}
                  </div>
                  <div>
                    <span className="text-white/40">COORDS:</span> {selectedObject.coordinates}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/75 p-4 text-xs font-mono text-white/60 backdrop-blur-md">
                Exploring deep field celestial coordinates...
              </div>
            )}

            {/* Quick Navigation Help Overlay */}
            <div className="pointer-events-auto flex flex-col items-end gap-1.5 text-right font-mono text-[10px] text-white/50">
              <div>AUTOMATIC JOURNEY IN PROGRESS (35-50s)</div>
              <div className="text-amber-400/80">DRAG TO ORBIT · CLICK ANY MESH TO INSPECT</div>
            </div>
          </div>
        </div>
      )}

      {/* Wormhole Transit Indicator */}
      {phase === "wormhole" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-300/90 animate-pulse">
            TRANSCENDING REALITY
          </div>
          <div className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-widest text-white">
            COSMIC WORMHOLE
          </div>
          <div className="mt-4 font-mono text-[11px] text-white/50 tracking-wider">
            CROSSING EVENT HORIZON · TRAVELING THROUGH SPACETIME TUNNEL
          </div>
        </div>
      )}

      {/* Phase 6: Returning Indicator */}
      {phase === "returning" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-300/90 animate-pulse">
            REVERSING SINGULARITY
          </div>
          <div className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-widest text-white">
            RETURNING TO HS AI STUDIO
          </div>
          <div className="mt-4 font-mono text-xs text-amber-300 font-semibold tracking-wider">
            RECONSTRUCTING WEBSITE DOM ELEMENTS &amp; RESTORING SCROLL POSITION...
          </div>
        </div>
      )}
    </div>
  );
}
