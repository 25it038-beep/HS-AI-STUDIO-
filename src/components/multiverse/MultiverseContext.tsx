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

  // --- Phase 6: Return Through The Wormhole & Reconstruct Website ---
  const exitUniverse = useCallback(() => {
    clearAllTimers();
    setPhase("returning");
    cosmicAudio.playReturnSwell();

    // Reconstruct original website from accretion particles
    DomSuctionEngine.restoreWebsite();

    // After reverse wormhole travel and reconstruction (2.8s), return to normal idle website
    const t = setTimeout(() => {
      setPhase("idle");
      setSingularityOrigin(null);
      cosmicAudio.stop();
    }, 2800);
    actionTimersRef.current.push(t);
  }, [clearAllTimers]);

  // --- Phase 1 to Phase 5: Black Hole Widget Click -> Website Consumption -> Wormhole -> Universe ---
  const openPortal = useCallback((origin?: { x: number; y: number }) => {
    clearAllTimers();

    const cx = origin ? origin.x : window.innerWidth - 64;
    const cy = origin ? origin.y : window.innerHeight / 2;
    const singularityPos = { x: cx, y: cy };
    setSingularityOrigin(singularityPos);

    // Audio initialization
    cosmicAudio.start();
    cosmicAudio.playAwakeningPulse();

    // PHASE 1: Awakening (0.5s)
    setPhase("awakening");

    // PHASE 2: Progressive Gravitational Consumption of Website Elements (after 500ms)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("collapse");
        DomSuctionEngine.initiateSuction(singularityPos);
      }, 500)
    );

    // PHASE 3: Event Horizon Absorption & Relativistic Flash (after 2200ms)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("horizon");
        cosmicAudio.playSingularityImpact();
      }, 2200)
    );

    // PHASE 4: Singularity Void (after 3000ms)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("singularity");
      }, 3000)
    );

    // Enter 3D Cosmic Wormhole (after 3500ms)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("wormhole");
        cosmicAudio.setWormholeIntensity(1.0);
      }, 3500)
    );

    // PHASE 5: Arrive and Explore the Infinite Cosmic Universe (after 5800ms)
    actionTimersRef.current.push(
      setTimeout(() => {
        setPhase("universe");
        cosmicAudio.playDimensionTransition();
        cosmicAudio.setWormholeIntensity(0.2);
      }, 5800)
    );
  }, [clearAllTimers]);

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
