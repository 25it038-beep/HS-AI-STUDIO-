"use client";

import { useEffect, useRef } from "react";

const INTRO_AUDIO = "/audio/intro-chime.mp3";

export function AudioIntro() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(INTRO_AUDIO);
    audioRef.current = audio;
    audio.volume = 0.7;
    audio.preload = "auto";

    const tryPlay = () => {
      if (playedRef.current) return;
      audio.play().then(
        () => {
          playedRef.current = true;
        },
        () => {
          /* still blocked — wait for interaction */
        },
      );
    };

    const onIntroFinished = (event: Event) => {
      const { sound } = (event as CustomEvent<{ sound: boolean }>).detail ?? {
        sound: false,
      };
      cleanup();
      if (!sound) tryPlay();
    };

    const onFirstInteraction = () => {
      tryPlay();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("hs-intro-finished", onIntroFinished);
    };

    window.addEventListener("hs-intro-finished", onIntroFinished);
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