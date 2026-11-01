"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { DIMENSIONS, DimensionConfig } from "./world-generator";
import { cosmicAudio } from "./audio-engine";

export type MultiversePhase =
  | "idle"
  | "awakening"
  | "collapse"
  | "horizon"
  | "singularity"
  | "wormhole"
  | "dimension"
  | "warping"
  | "returning";

interface MultiverseContextValue {
  phase: MultiversePhase;
  currentDimensionIndex: number;
  currentDimension: DimensionConfig;
  audioEnabled: boolean;
  singularityOrigin: { x: number; y: number } | null;
  openPortal: (origin?: { x: number; y: number }) => void;
  exitUniverse: () => void;
  warpToNextDimension: () => void;
  toggleAudio: () => void;
  toggleFullscreen: () => void;
}

const MultiverseContext = createContext<MultiverseContextValue | null>(null);

export function MultiverseProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<MultiversePhase>("idle");
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [singularityOrigin, setSingularityOrigin] = useState<{ x: number; y: number } | null>(null);

  const currentDimension = DIMENSIONS[currentDimensionIndex % DIMENSIONS.length];

  // --- Gravitational Consumption Sequence ---
  const openPortal = useCallback((origin?: { x: number; y: number }) => {
    // Record singularity center (defaults to center of viewport)
    const cx = origin ? origin.x : window.innerWidth / 2;
    const cy = origin ? origin.y : window.innerHeight / 2;
    setSingularityOrigin({ x: cx, y: cy });

    // Audio init
    cosmicAudio.start();
    cosmicAudio.playAwakeningPulse();

    // PHASE 1: Awakening (0.8s)
    setPhase("awakening");

    // PHASE 2: Gravitational Collapse (after 800ms)
    setTimeout(() => {
      setPhase("collapse");
    }, 800);

    // PHASE 3: Event Horizon & Flash (after 2600ms)
    setTimeout(() => {
      setPhase("horizon");
      cosmicAudio.playSingularityImpact();
    }, 2600);

    // PHASE 4: Singularity & Darkness (after 3600ms)
    setTimeout(() => {
      setPhase("singularity");
    }, 3600);

    // Enter Wormhole (after 4200ms)
    setTimeout(() => {
      setPhase("wormhole");
      cosmicAudio.setWormholeIntensity(1.0);
    }, 4200);

    // Transition into First Dimension (after 7000ms)
    setTimeout(() => {
      setPhase("dimension");
      cosmicAudio.playDimensionTransition();
      cosmicAudio.setWormholeIntensity(0.2);
    }, 7000);
  }, []);

  // --- Dimension Warp Jump ---
  const warpToNextDimension = useCallback(() => {
    if (phase !== "dimension") return;
    setPhase("warping");
    cosmicAudio.setWormholeIntensity(0.85);

    setTimeout(() => {
      setCurrentDimensionIndex((prev) => (prev + 1) % DIMENSIONS.length);
      setPhase("dimension");
      cosmicAudio.playDimensionTransition();
      cosmicAudio.setWormholeIntensity(0.2);
    }, 2200);
  }, [phase]);

  // --- Return Through The Wormhole ---
  const exitUniverse = useCallback(() => {
    setPhase("returning");
    cosmicAudio.playReturnSwell();

    // After reverse wormhole travel and reconstruction (3.2s), return to normal idle website
    setTimeout(() => {
      setPhase("idle");
      setSingularityOrigin(null);
      cosmicAudio.stop();
    }, 3200);
  }, []);

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

  // Update website container CSS transform during collapse / reconstruction
  useEffect(() => {
    const rootEl = document.getElementById("website-root");
    if (!rootEl) return;

    if (phase === "idle") {
      rootEl.style.transform = "none";
      rootEl.style.opacity = "1";
      rootEl.style.filter = "none";
      rootEl.style.pointerEvents = "auto";
      rootEl.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 1.0s ease";
    } else if (phase === "awakening") {
      rootEl.style.transition = "transform 0.8s ease-in, opacity 0.8s ease-in, filter 0.8s ease-in";
      rootEl.style.filter = "contrast(1.2) brightness(0.95)";
      rootEl.style.transform = "scale(0.98)";
    } else if (phase === "collapse") {
      const ox = singularityOrigin ? singularityOrigin.x : window.innerWidth / 2;
      const oy = singularityOrigin ? singularityOrigin.y : window.innerHeight / 2;
      rootEl.style.transformOrigin = `${ox}px ${oy}px`;
      rootEl.style.transition = "transform 1.8s cubic-bezier(0.55, 0, 1, 0.45), opacity 1.8s ease-in, filter 1.8s ease-in";
      rootEl.style.transform = "scale(0.005) rotate(45deg)";
      rootEl.style.opacity = "0";
      rootEl.style.filter = "blur(18px) brightness(0.2)";
      rootEl.style.pointerEvents = "none";
    } else if (phase === "returning") {
      const ox = singularityOrigin ? singularityOrigin.x : window.innerWidth / 2;
      const oy = singularityOrigin ? singularityOrigin.y : window.innerHeight / 2;
      rootEl.style.transformOrigin = `${ox}px ${oy}px`;
      rootEl.style.transition = "transform 2.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s ease-out, filter 1.8s ease-out";
      rootEl.style.transform = "scale(1) rotate(0deg)";
      rootEl.style.opacity = "1";
      rootEl.style.filter = "none";
      rootEl.style.pointerEvents = "auto";
    } else {
      // While in multiverse (horizon, singularity, wormhole, dimension, warping)
      rootEl.style.opacity = "0";
      rootEl.style.pointerEvents = "none";
    }
  }, [phase, singularityOrigin]);

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
        warpToNextDimension,
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
