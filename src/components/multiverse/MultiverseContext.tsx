"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { DIMENSIONS, DimensionConfig } from "./world-generator";
import { cosmicAudio } from "./audio-engine";
import { DomSuctionEngine, DiagnosticStats } from "./dom-suction-engine";

export type MultiversePhase =
  | "idle"
  | "black_hole_activation"
  | "element_attraction"
  | "element_detachment"
  | "spiral_absorption"
  | "website_collapse"
  | "final_element_absorption"
  | "event_horizon_expansion"
  | "camera_entry"
  | "wormhole"
  | "cosmic_sequence"
  | "automatic_return"
  | "website_reconstruction"
  | "complete";

interface MultiverseContextValue {
  phase: MultiversePhase;
  currentDimensionIndex: number;
  currentDimension: DimensionConfig;
  audioEnabled: boolean;
  singularityOrigin: { x: number; y: number } | null;
  diagnosticStats: DiagnosticStats;
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
  const [diagnosticStats, setDiagnosticStats] = useState<DiagnosticStats>(DomSuctionEngine.getStats());

  const actionTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const currentDimension = DIMENSIONS[currentDimensionIndex % DIMENSIONS.length];

  const clearAllTimers = useCallback(() => {
    actionTimersRef.current.forEach((t) => clearTimeout(t));
    actionTimersRef.current = [];
  }, []);

  // --- Reversible Return: Reverse Wormhole & Reconstruct DOM Elements ---
  const exitUniverse = useCallback(() => {
    clearAllTimers();
    setPhase("automatic_return");
    cosmicAudio.playReturnSwell();

    // Reconstruct original website from singularity particles & restore scroll
    const tReconstruct = setTimeout(() => {
      setPhase("website_reconstruction");
      DomSuctionEngine.restoreWebsite();
    }, 1200);
    actionTimersRef.current.push(tReconstruct);

    // Complete return transition and reset to idle after reverse wormhole flight
    const tComplete = setTimeout(() => {
      setPhase("complete");
      const tIdle = setTimeout(() => {
        setPhase("idle");
        setSingularityOrigin(null);
        cosmicAudio.stop();
      }, 500);
      actionTimersRef.current.push(tIdle);
    }, 3800);
    actionTimersRef.current.push(tComplete);
  }, [clearAllTimers]);

  // --- Strict Sequential Physical Absorption State Machine ---
  const openPortal = useCallback((origin?: { x: number; y: number }) => {
    clearAllTimers();

    const cx = origin ? origin.x : window.innerWidth - 70;
    const cy = origin ? origin.y : window.innerHeight / 2;
    const singularityPos = { x: cx, y: cy };
    setSingularityOrigin(singularityPos);

    // Audio initialization
    cosmicAudio.start();
    cosmicAudio.playAwakeningPulse();

    // 1. BLACK_HOLE_ACTIVATION
    setPhase("black_hole_activation");

    // After 600ms of activation, start physical element suction
    const tSuction = setTimeout(() => {
      setPhase("element_attraction");

      DomSuctionEngine.initiateSuction(
        singularityPos,
        // Live progress telemetry callback
        (stats) => {
          setDiagnosticStats(stats);
          if (stats.absorptionPercentage >= 95) {
            setPhase("final_element_absorption");
          } else if (stats.absorptionPercentage >= 65) {
            setPhase("website_collapse");
          } else if (stats.absorptionPercentage >= 25) {
            setPhase("spiral_absorption");
          } else if (stats.absorbedCount > 0) {
            setPhase("element_detachment");
          }
        },
        // STRICT COMPLETION CALLBACK:
        // The wormhole MUST NOT start while even one website element remains unconsumed!
        (stats) => {
          setDiagnosticStats(stats);
          setPhase("final_element_absorption");

          // Event Horizon Expansion: black hole engulfs the entire screen
          const tExpand = setTimeout(() => {
            setPhase("event_horizon_expansion");
            cosmicAudio.playSingularityImpact();

            // Camera Entry into singularity
            const tCamera = setTimeout(() => {
              setPhase("camera_entry");

              // ONLY NOW: Enter 3D Spacetime Wormhole!
              const tWormhole = setTimeout(() => {
                setPhase("wormhole");
                cosmicAudio.setWormholeIntensity(1.0);

                // Cosmic Journey: Galaxies -> Pulsars -> Supernova -> Deep Cosmos
                const tUniverse = setTimeout(() => {
                  setPhase("cosmic_sequence");
                  cosmicAudio.playDimensionTransition();
                  cosmicAudio.setWormholeIntensity(0.25);

                  // Automatic return after ~28 seconds of cosmic sequence
                  const tAutoReturn = setTimeout(() => {
                    exitUniverse();
                  }, 28000);
                  actionTimersRef.current.push(tAutoReturn);
                }, 6000);
                actionTimersRef.current.push(tUniverse);
              }, 900);
              actionTimersRef.current.push(tWormhole);
            }, 1200);
            actionTimersRef.current.push(tCamera);
          }, 400);
          actionTimersRef.current.push(tExpand);
        }
      );
    }, 600);

    actionTimersRef.current.push(tSuction);
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
      DomSuctionEngine.cleanup();
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
        diagnosticStats,
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
