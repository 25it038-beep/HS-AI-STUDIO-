"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { DIMENSIONS, DimensionConfig } from "./world-generator";
import { cosmicAudio } from "./audio-engine";
import { DomSuctionEngine } from "./dom-suction-engine";

export type MultiversePhase =
  | "idle"
  | "awakening"
  | "collapse"
  | "horizon"
  | "singularity"
  | "wormhole"
  | "universe"
  | "returning";

interface MultiverseContextValue {
  phase: MultiversePhase;
  currentDimensionIndex: number;
  currentDimension: DimensionConfig;
  audioEnabled: boolean;
  singularityOrigin: { x: number; y: number } | null;
  openPortal: (origin?: { x: number; y: number }) => void;
  exitUniverse: () => void;
  toggleAudio: () => void;
  toggleFullscreen: () => void;
}

const MultiverseContext = createContext<MultiverseContextValue | null>(null);

export function MultiverseProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<MultiversePhase>("idle");
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [singularityOrigin, setSingularityOrigin] = useState<{ x: number; y: number } | null>(null);

  const actionTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const currentDimension = DIMENSIONS[currentDimensionIndex % DIMENSIONS.length];

  const clearAllTimers = useCallback(() => {
    actionTimersRef.current.forEach((t) => clearTimeout(t));
    actionTimersRef.current = [];
  }, []);

  // --- Reversible Return: Reverse Wormhole & Reconstruct DOM Elements ---
  const exitUniverse = useCallback(() => {
    clearAllTimers();
    setPhase("returning");
    cosmicAudio.playReturnSwell();

    // Reconstruct original website from singularity particles & restore scroll
    DomSuctionEngine.restoreWebsite();

    // Complete return transition and reset to idle after reverse wormhole flight
    const t = setTimeout(() => {
      setPhase("idle");
      setSingularityOrigin(null);
      cosmicAudio.stop();
    }, 3800);
    actionTimersRef.current.push(t);
  }, [clearAllTimers]);

  // --- Complete Automated Cinematic Journey: 35-50s Total ---
  const openPortal = useCallback((origin?: { x: number; y: number }) => {
    clearAllTimers();

    const cx = origin ? origin.x : window.innerWidth - 64;
    const cy = origin ? origin.y : window.innerHeight / 2;
    const singularityPos = { x: cx, y: cy };
    setSingularityOrigin(singularityPos);

    // Audio initialization
    cosmicAudio.start();
    cosmicAudio.playAwakeningPulse();

    // PHASE 1: Awakening (0.0s - 0.5s)
    setPhase("awakening");

    // PHASE 2: Element-by-Element Gravitational Suction (0.5s - 4.2s)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("collapse");
        DomSuctionEngine.initiateSuction(singularityPos);
      }, 500)
    );

    // PHASE 3: Event Horizon Plunge & Relativistic Flash (4.2s - 6.0s)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("horizon");
        cosmicAudio.playSingularityImpact();
      }, 4200)
    );

    // PHASE 4: Singularity Void (6.0s - 6.8s)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("singularity");
      }, 6000)
    );

    // PHASE 5: 3D Cosmic Spacetime Wormhole (6.8s - 13.0s)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("wormhole");
        cosmicAudio.setWormholeIntensity(1.0);
      }, 6800)
    );

    // PHASE 6: Infinite Multiverse Cosmic Journey (13.0s - 37.0s)
    // Automated flight across Galaxies, Pulsars, Supernovae, and Deep Universe
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("universe");
        cosmicAudio.playDimensionTransition();
        cosmicAudio.setWormholeIntensity(0.25);
      }, 13000)
    );

    // PHASE 7: AUTOMATIC RETURN TO HS AI STUDIO (at 37.0s, total duration ~43s)
    actionTimersRef.current.push(
      setTimeout(() => {
        exitUniverse();
      }, 37000)
    );
  }, [clearAllTimers, exitUniverse]);

  const toggleAudio = useCallback(() => {
    const isMuted = cosmicAudio.toggleMute();
    setAudioEnabled(!isMuted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return (
    <MultiverseContext.Provider
      value={{
        phase,
        currentDimensionIndex,
        currentDimension,
        audioEnabled,
        singularityOrigin,
        openPortal,
        exitUniverse,
        toggleAudio,
        toggleFullscreen,
      }}
    >
      {children}
    </MultiverseContext.Provider>
  );
}

export function useMultiverse() {
  const ctx = useContext(MultiverseContext);
  if (!ctx) {
    throw new Error("useMultiverse must be used within a MultiverseProvider");
  }
  return ctx;
}
