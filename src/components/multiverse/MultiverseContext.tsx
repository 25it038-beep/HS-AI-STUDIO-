"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
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

  const autoTourTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const currentDimension = DIMENSIONS[currentDimensionIndex % DIMENSIONS.length];

  const clearAllTimers = useCallback(() => {
    autoTourTimersRef.current.forEach((t: ReturnType<typeof setTimeout>) => clearTimeout(t));
    autoTourTimersRef.current = [];
  }, []);

  // --- Return Through The Wormhole (Manual or Automatic) ---
  const exitUniverse = useCallback(() => {
    clearAllTimers();
    setPhase("returning");
    cosmicAudio.playReturnSwell();

    // After reverse wormhole travel and reconstruction (2.6s), return to normal idle website
    const t = setTimeout(() => {
      setPhase("idle");
      setSingularityOrigin(null);
      setCurrentDimensionIndex(0);
      cosmicAudio.stop();
    }, 2600);
    autoTourTimersRef.current.push(t);
  }, [clearAllTimers]);

  // --- Gravitational Consumption & Automated Rapid Multiverse Tour ---
  const openPortal = useCallback((origin?: { x: number; y: number }) => {
    clearAllTimers();

    // Record singularity center (defaults to center of viewport)
    const cx = origin ? origin.x : window.innerWidth / 2;
    const cy = origin ? origin.y : window.innerHeight / 2;
    setSingularityOrigin({ x: cx, y: cy });
    setCurrentDimensionIndex(0);

    // Audio init
    cosmicAudio.start();
    cosmicAudio.playAwakeningPulse();

    // PHASE 1: Awakening (0.6s)
    setPhase("awakening");

    // PHASE 2: Gravitational Collapse (after 600ms)
    autoTourTimersRef.current.push(
      setTimeout(() => {
        setPhase("collapse");
      }, 600)
    );

    // PHASE 3: Event Horizon & Flash (after 2100ms)
    autoTourTimersRef.current.push(
      setTimeout(() => {
        setPhase("horizon");
        cosmicAudio.playSingularityImpact();
      }, 2100)
    );

    // PHASE 4: Singularity & Darkness (after 2800ms)
    autoTourTimersRef.current.push(
      setTimeout(() => {
        setPhase("singularity");
      }, 2800)
    );

    // Initial Hyperspace Wormhole Transit (after 3300ms)
    autoTourTimersRef.current.push(
      setTimeout(() => {
        setPhase("wormhole");
        cosmicAudio.setWormholeIntensity(1.0);
      }, 3300)
    );

    // --- Automated Rapid Multiverse Traversal ---
    // Traverses all 8 procedural dimensions automatically at high speed
    let cumulativeDelay = 4800;
    const WORLD_DURATION = 2400; // 2.4s in each dimension
    const WARP_DURATION = 700;   // 0.7s lightning warp burst

    for (let i = 0; i < DIMENSIONS.length; i++) {
      const dimIndex = i;

      // Enter Dimension i
      autoTourTimersRef.current.push(
        setTimeout(() => {
          setCurrentDimensionIndex(dimIndex);
          setPhase("dimension");
          cosmicAudio.playDimensionTransition();
          cosmicAudio.setWormholeIntensity(0.3);
        }, cumulativeDelay)
      );
      cumulativeDelay += WORLD_DURATION;

      // If not the final dimension, fire a hyper-speed warp burst
      if (i < DIMENSIONS.length - 1) {
        autoTourTimersRef.current.push(
          setTimeout(() => {
            setPhase("warping");
            cosmicAudio.setWormholeIntensity(0.9);
          }, cumulativeDelay)
        );
        cumulativeDelay += WARP_DURATION;
      }
    }

    // Automatically return to HS AI Solutions after all 8 worlds!
    autoTourTimersRef.current.push(
      setTimeout(() => {
        exitUniverse();
      }, cumulativeDelay + 600)
    );
  }, [clearAllTimers, exitUniverse]);

  // --- Manual Warp Jump Override ---
  const warpToNextDimension = useCallback(() => {
    if (phase !== "dimension") return;
    setPhase("warping");
    cosmicAudio.setWormholeIntensity(0.85);

    setTimeout(() => {
      setCurrentDimensionIndex((prev) => (prev + 1) % DIMENSIONS.length);
      setPhase("dimension");
      cosmicAudio.playDimensionTransition();
      cosmicAudio.setWormholeIntensity(0.2);
    }, 700);
  }, [phase]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
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

  // Update website container CSS transform during collapse / reconstruction & suck all elements
  useEffect(() => {
    const rootEl = document.getElementById("website-root");
    if (!rootEl) return;

    if (phase === "idle") {
      rootEl.style.transform = "none";
      rootEl.style.opacity = "1";
      rootEl.style.filter = "none";
      rootEl.style.pointerEvents = "auto";
      rootEl.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 1.0s ease";

      // Clean up and restore any previously sucked elements
      const suckedElements = document.querySelectorAll<HTMLElement>("[data-gravitational-sucked='true']");
      suckedElements.forEach((el) => {
        el.style.transition = "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out, filter 1.2s ease-out";
        el.style.transform = "";
        el.style.opacity = "";
        el.style.filter = "";
        el.removeAttribute("data-gravitational-sucked");
      });
    } else if (phase === "awakening") {
      rootEl.style.transition = "transform 0.8s ease-in, opacity 0.8s ease-in, filter 0.8s ease-in";
      rootEl.style.filter = "contrast(1.25) brightness(0.95)";
      rootEl.style.transform = "scale(0.985)";

      // Subtle gravitational pre-pull on nearby elements
      const targetElements = rootEl.querySelectorAll<HTMLElement>(
        "h1, h2, h3, p, button, a, img, svg, article, .card, [class*='rounded-2xl'], [class*='rounded-xl'], [class*='border-']"
      );
      targetElements.forEach((el, i) => {
        if (i > 80) return;
        el.style.transition = "transform 0.4s ease-in-out";
        const jitterX = (Math.random() - 0.5) * 6;
        const jitterY = (Math.random() - 0.5) * 6;
        el.style.transform = `translate(${jitterX}px, ${jitterY}px)`;
      });
    } else if (phase === "collapse") {
      const ox = singularityOrigin ? singularityOrigin.x : window.innerWidth / 2;
      const oy = singularityOrigin ? singularityOrigin.y : window.innerHeight / 2;

      // 1. Overall coordinate distortion on #website-root
      rootEl.style.transformOrigin = `${ox}px ${oy}px`;
      rootEl.style.transition = "transform 1.9s cubic-bezier(0.55, 0, 1, 0.45), opacity 1.8s ease-in, filter 1.8s ease-in";
      rootEl.style.transform = "scale(0.005) rotate(70deg)";
      rootEl.style.opacity = "0";
      rootEl.style.filter = "blur(14px) brightness(0.2)";
      rootEl.style.pointerEvents = "none";

      // 2. Individual physics-based element suction directly into the black hole!
      const targetElements = rootEl.querySelectorAll<HTMLElement>(
        "h1, h2, h3, p, button, a, img, svg, article, .card, [class*='rounded-2xl'], [class*='rounded-xl'], [class*='border-']"
      );

      targetElements.forEach((el, index) => {
        if (index > 120) return; // performance guard for 60fps
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const dx = ox - elCenterX;
        const dy = oy - elCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Elements closer to the black hole get sucked first!
        const delay = Math.min(dist / 1400, 0.65);
        const swirlAngle = (index % 2 === 0 ? 1 : -1) * (180 + dist / 8);

        el.setAttribute("data-gravitational-sucked", "true");
        el.style.transition = `transform 1.6s cubic-bezier(0.55, 0, 1, 0.45) ${delay}s, opacity 1.3s ease-in ${delay}s, filter 1.3s ease-in ${delay}s`;
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${swirlAngle}deg) scale(0.01)`;
        el.style.opacity = "0";
        el.style.filter = "blur(10px) brightness(2.5)";
      });
    } else if (phase === "returning") {
      const ox = singularityOrigin ? singularityOrigin.x : window.innerWidth / 2;
      const oy = singularityOrigin ? singularityOrigin.y : window.innerHeight / 2;
      rootEl.style.transformOrigin = `${ox}px ${oy}px`;
      rootEl.style.transition = "transform 2.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s ease-out, filter 1.8s ease-out";
      rootEl.style.transform = "scale(1) rotate(0deg)";
      rootEl.style.opacity = "1";
      rootEl.style.filter = "none";
      rootEl.style.pointerEvents = "auto";

      // Restore sucked elements in reverse outward swirl
      const suckedElements = document.querySelectorAll<HTMLElement>("[data-gravitational-sucked='true']");
      suckedElements.forEach((el, index) => {
        const delay = (index % 10) * 0.04;
        el.style.transition = `transform 2.0s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 1.6s ease-out ${delay}s, filter 1.6s ease-out ${delay}s`;
        el.style.transform = "translate(0px, 0px) rotate(0deg) scale(1)";
        el.style.opacity = "1";
        el.style.filter = "none";
      });
    } else {
      // While in multiverse
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
