"use client";

import { useEffect, useRef } from "react";

const INTRO_AUDIO = "/audio/intro-chime.mp3";

export function AudioIntro() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(INTRO_AUDIO);
    audioRef.current = audio;
    audio.volume = 0.7;
    audio.preload = "auto";

    const tryPlay = () => {
      audio.play().catch(() => {
        /* still blocked — wait for interaction */
      });
    };

    tryPlay();

    const onFirstInteraction = () => {
      tryPlay();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);
    window.addEventListener("touchstart", onFirstInteraction);

    return () => {
      cleanup();
      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
}
