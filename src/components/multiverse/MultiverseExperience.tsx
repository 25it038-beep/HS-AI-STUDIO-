"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useMultiverse, MultiversePhase } from "./MultiverseContext";
import { BlackHoleEngine } from "./black-hole-engine";
import { WormholeEngine } from "./wormhole-engine";
import { CosmicUniverseEngine, CelestialObjectData } from "./cosmic-universe-engine";
import { DomSuctionEngine } from "./dom-suction-engine";

export function MultiverseExperience() {
  const {
    phase,
    audioEnabled,
    diagnosticStats,
    exitUniverse,
    toggleAudio,
    toggleFullscreen,
  } = useMultiverse();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Selected celestial object & automated tour tracking in cosmic sequence
  const [selectedObject, setSelectedObject] = useState<CelestialObjectData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Explore Universe");
  const [autoTourActive, setAutoTourActive] = useState(true);
  const [currentSceneName, setCurrentSceneName] = useState("SCENE C · GALAXY TRAVEL (ANDROMEDA-IX)");
  const [returnCountdown, setReturnCountdown] = useState(28);

  const universeEnterTimeRef = useRef<number>(0);

  // Camera target controls for smooth fly-to
  const cameraTargetPos = useRef<THREE.Vector3 | null>(null);
  const cameraLookTarget = useRef<THREE.Vector3 | null>(null);

  // Mouse kinematics & orbit drag controls
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const orbitAngle = useRef({ theta: 0, phi: Math.PI * 0.45, radius: 55 });
  const mouseInertia = useRef({ x: 0, y: 0 });

  const isAbsorptionPhase =
    phase === "black_hole_activation" ||
    phase === "element_attraction" ||
    phase === "element_detachment" ||
    phase === "spiral_absorption" ||
    phase === "website_collapse" ||
    phase === "final_element_absorption";

  // Three.js Lifecycle
  useEffect(() => {
    if (phase === "idle") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer: alpha is TRUE so the website and sucking elements remain 100% visible!
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

    // 1. Black Hole Engine (Active during absorption & expansion)
    const blackHole = new BlackHoleEngine();
    scene.add(blackHole.group);

    // 2. 3D Cylindrical Wormhole Engine
    const wormhole = new WormholeEngine();
    scene.add(wormhole.group);

    // 3. Massive Interactive Cosmic Universe Engine
    const cosmicUniverse = new CosmicUniverseEngine();
    scene.add(cosmicUniverse.group);

    // Raycaster for celestial picking in cosmic sequence
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    if (cosmicUniverse.celestialObjects.length > 0) {
      setSelectedObject(cosmicUniverse.celestialObjects[0]);
    }

    // Pointer events for orbit control
    const handlePointerDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevPointer.current = { x: e.clientX, y: e.clientY };

      if (phase === "cosmic_sequence") {
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
            setAutoTourActive(false);
          }
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      mouseInertia.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseInertia.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (!isDragging.current || phase !== "cosmic_sequence") return;
      const dx = e.clientX - prevPointer.current.x;
      const dy = e.clientY - prevPointer.current.y;
      prevPointer.current = { x: e.clientX, y: e.clientY };

      orbitAngle.current.theta -= dx * 0.005;
      orbitAngle.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, orbitAngle.current.phi - dy * 0.005));

      cameraTargetPos.current = null;
      setAutoTourActive(false);
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (phase !== "cosmic_sequence") return;
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

      const vpW = window.innerWidth;
      const vpH = window.innerHeight;

      // ── ABSORPTION PHASES: Align 3D Black Hole with 2D Singularity ────────
      if (
        phase === "black_hole_activation" ||
        phase === "element_attraction" ||
        phase === "element_detachment" ||
        phase === "spiral_absorption" ||
        phase === "website_collapse" ||
        phase === "final_element_absorption"
      ) {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = false;

        // Convert current 2D screen singularity coordinates to 3D camera coordinates
        const sPos = DomSuctionEngine.getSingularityPosition();
        const vFovRad = (camera.fov * Math.PI) / 180;
        const visibleHeightAtZero = 2 * Math.tan(vFovRad / 2) * camera.position.z;
        const visibleWidthAtZero = visibleHeightAtZero * (vpW / vpH);

        const worldX = (sPos.x / vpW - 0.5) * visibleWidthAtZero;
        const worldY = -(sPos.y / vpH - 0.5) * visibleHeightAtZero;
        blackHole.group.position.set(worldX, worldY, 0);

        // GROW BLACK HOLE AS ELEMENTS ARE CONSUMED
        const progress = diagnosticStats.absorptionPercentage / 100;
        const massScale = 0.85 + progress * 1.35;
        blackHole.group.scale.set(massScale, massScale, massScale);

        // Rotational acceleration
        const accel = 0.5 + progress * 3.5;
        blackHole.update(time, delta, accel, mouseInertia.current.x, mouseInertia.current.y);

        camera.position.set(0, 0, 32);
        camera.lookAt(0, 0, 0);
      }
      // ── EVENT HORIZON EXPANSION: Black hole engulfs entire screen ─────────
      else if (phase === "event_horizon_expansion") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = false;

        // Exponential expansion to swallow viewport
        const expandScale = 2.2 + (time % 1.5) * 22.0;
        blackHole.group.scale.set(expandScale, expandScale, expandScale);
        blackHole.update(time, delta, 5.0, 0, 0);

        camera.position.set(0, 0, Math.max(3.0, 32 - (time % 1.5) * 20.0));
        camera.lookAt(0, 0, 0);
      }
      // ── CAMERA ENTRY INTO SINGULARITY ─────────────────────────────────────
      else if (phase === "camera_entry") {
        blackHole.group.visible = true;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = false;

        camera.position.z = 2.0;
        camera.lookAt(0, 0, 0);
      }
      // ── 3D SPACETIME WORMHOLE & REVERSE RETURN ─────────────────────────────
      else if (phase === "wormhole" || phase === "automatic_return") {
        blackHole.group.visible = false;
        wormhole.group.visible = true;
        cosmicUniverse.group.visible = false;

        const isReturning = phase === "automatic_return";
        const speed = isReturning ? -3.8 : 3.2;

        wormhole.update(time, delta, speed);
        camera.fov = 75;
        camera.updateProjectionMatrix();
        camera.position.set(mouseInertia.current.x * 2.5, mouseInertia.current.y * 2.5, 0);
        camera.lookAt(mouseInertia.current.x * 0.8, mouseInertia.current.y * 0.8, -50);
      }
      // ── COSMIC SEQUENCE: Galaxies, Pulsars, Supernova, Deep Universe ───────
      else if (phase === "cosmic_sequence") {
        blackHole.group.visible = false;
        wormhole.group.visible = false;
        cosmicUniverse.group.visible = true;

        if (universeEnterTimeRef.current === 0) {
          universeEnterTimeRef.current = time;
        }

        const elapsedInCosmic = time - universeEnterTimeRef.current;
        setReturnCountdown(Math.max(0, Math.ceil(28 - elapsedInCosmic)));

        cosmicUniverse.update(time, delta);
        camera.fov = 60;
        camera.updateProjectionMatrix();

        // Automated flight choreography across 4 celestial spectacles
        if (autoTourActive) {
          // Scene C: Galaxy Travel (0s - 7s)
          if (elapsedInCosmic < 7) {
            const andromeda = cosmicUniverse.celestialObjects[0];
            if (andromeda) {
              setSelectedObject(andromeda);
              setCurrentSceneName("SCENE C · GALAXY TRAVEL (ANDROMEDA-IX)");
              cameraTargetPos.current = andromeda.targetCameraPos;
              cameraLookTarget.current = andromeda.position;
            }
          }
          // Scene D1: Relativistic Pulsar (7s - 14s)
          else if (elapsedInCosmic < 14) {
            const pulsar = cosmicUniverse.celestialObjects.find((o) => o.category === "Pulsars") || cosmicUniverse.celestialObjects[2];
            if (pulsar) {
              setSelectedObject(pulsar);
              setCurrentSceneName("SCENE D1 · RELATIVISTIC PULSAR BEAMS (VELA PSR)");
              cameraTargetPos.current = pulsar.targetCameraPos;
              cameraLookTarget.current = pulsar.position;
            }
          }
          // Scene D2: Supernova Explosion & Singularity (14s - 21s)
          else if (elapsedInCosmic < 21) {
            const supernova = cosmicUniverse.celestialObjects.find((o) => o.name.includes("Crab")) || cosmicUniverse.celestialObjects[5];
            if (supernova) {
              setSelectedObject(supernova);
              setCurrentSceneName("SCENE D2 · SUPERNOVA BLAST SHELL (CRAB REMNANT)");
              cameraTargetPos.current = supernova.targetCameraPos;
              cameraLookTarget.current = supernova.position;
            }
          }
          // Scene E: Deep Universe & Exoplanet (21s - 28s)
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

        // Camera flight interpolation
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
  }, [phase, autoTourActive, diagnosticStats.absorbedCount, diagnosticStats.absorptionPercentage]);

  if (phase === "idle") return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 select-none ${
        isAbsorptionPhase
          ? "pointer-events-none z-[99995] bg-transparent"
          : "z-[99999] bg-black"
      }`}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full block ${
          phase === "cosmic_sequence" ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"
        }`}
      />

      {/* ── LIVE DIAGNOSTIC HUD DURING PHYSICAL ABSORPTION ─────────────────── */}
      {isAbsorptionPhase && (
        <div
          data-multiverse-hud="true"
          className="pointer-events-none fixed top-5 left-1/2 -translate-x-1/2 z-[99998] flex flex-col items-center gap-2 max-w-xl w-[92%] sm:w-auto"
        >
          <div className="flex items-center gap-3 rounded-full border border-amber-400/60 bg-black/90 px-4 py-2 shadow-2xl backdrop-blur-xl">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-200">
              HS COSMIC CONSUMPTION
            </span>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-300 font-semibold border border-amber-400/30">
              {diagnosticStats.currentStageName}
            </span>
          </div>

          {/* Diagnostic Telemetry Panel */}
          <div className="rounded-xl border border-white/15 bg-black/85 px-4 py-2.5 shadow-2xl backdrop-blur-xl font-mono text-[11px] text-white/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <div>
              <span className="text-white/40">CAPTURED:</span>{" "}
              <span className="text-cyan-300 font-semibold">{diagnosticStats.capturedCount}</span>
            </div>
            <div>
              <span className="text-white/40">ABSORBED:</span>{" "}
              <span className="text-amber-300 font-bold">{diagnosticStats.absorbedCount}</span>
            </div>
            <div>
              <span className="text-white/40">REMAINING:</span>{" "}
              <span className="text-white font-bold">{diagnosticStats.remainingCount}</span>
            </div>
            <div>
              <span className="text-white/40">MASS:</span>{" "}
              <span className="text-amber-400 font-semibold">+{diagnosticStats.singularityMassSolar.toFixed(1)} M☉</span>
            </div>
            <div className="flex items-center gap-2 w-full mt-1.5 pt-1.5 border-t border-white/10">
              <span className="text-white/50 text-[10px]">PROGRESS:</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 transition-all duration-150"
                  style={{ width: `${diagnosticStats.absorptionPercentage}%` }}
                />
              </div>
              <span className="text-cyan-300 font-bold text-[10.5px]">
                {diagnosticStats.absorptionPercentage}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Relativistic Flash Overlay for Event Horizon Phase */}
      <div
        className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-500 ${
          phase === "event_horizon_expansion" ? "opacity-95" : "opacity-0"
        }`}
      />

      {/* Singularity Void Darkness */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
          phase === "camera_entry" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── COSMIC SEQUENCE HUD ───────────────────────────────────────────── */}
      {phase === "cosmic_sequence" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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

            {/* Auto-Tour Toggle & Categories */}
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
                  onClick={() => {
                    setActiveCategory(cat);
                    setAutoTourActive(false);
                  }}
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

            {/* Right Controls */}
            <div className="pointer-events-auto flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3 py-1 font-mono text-[11px] text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Auto-Return: {returnCountdown}s</span>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 text-xs font-mono text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white cursor-pointer"
                title={audioEnabled ? "Mute Cosmic Audio" : "Unmute Audio"}
              >
                <span>{audioEnabled ? "♫ AUDIO" : "✕ MUTED"}</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 text-xs font-mono text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white cursor-pointer"
                title="Toggle Fullscreen"
              >
                <span>⛶</span>
              </button>

              <button
                type="button"
                onClick={exitUniverse}
                className="group relative inline-flex h-9 items-center gap-2 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500/25 via-zinc-900 to-amber-950/40 px-4 font-mono text-xs font-bold uppercase tracking-wider text-amber-200 shadow-xl shadow-amber-500/20 backdrop-blur-md transition-all hover:scale-105 hover:border-amber-300 hover:shadow-amber-500/40 cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>Return to HS AI Studio</span>
                <span className="text-amber-400 transition-transform group-hover:translate-x-0.5">↩</span>
              </button>
            </div>
          </div>

          {/* Bottom Dossier */}
          {selectedObject && (
            <div className="pointer-events-auto max-w-lg rounded-2xl border border-white/12 bg-black/85 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                    {selectedObject.category} · {selectedObject.spectralClass}
                  </span>
                </div>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-amber-300">
                  AUTOMATIC SPECTACLE
                </span>
              </div>

              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
                {selectedObject.name}
              </h2>

              <p className="mt-2 text-xs text-white/70 leading-relaxed">
                {selectedObject.description}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-2.5 text-[10.5px] font-mono text-white/60">
                <div><span className="text-white/40">DISTANCE:</span> {selectedObject.distance}</div>
                <div><span className="text-white/40">MASS:</span> {selectedObject.mass}</div>
                <div><span className="text-white/40">TEMP:</span> {selectedObject.temperature}</div>
                <div><span className="text-white/40">COORDS:</span> {selectedObject.coordinates}</div>
              </div>
            </div>
          )}
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
            ALL WEBSITE ELEMENTS CONSUMED · ENTERING CURVED SPACETIME TUNNEL
          </div>
        </div>
      )}

      {/* Return Indicator */}
      {phase === "automatic_return" && (
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
