"use client";

import { useEffect, useRef } from "react";

const INTRO_AUDIO = "/audio/intro-chime.mp3";

export function AudioIntro() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);
  const retryHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const audio = new Audio(INTRO_AUDIO);
    audioRef.current = audio;
    audio.volume = 0.7;
    audio.preload = "auto";

    const removeRetryListener = () => {
      if (retryHandlerRef.current) {
        window.removeEventListener("pointerdown", retryHandlerRef.current);
        window.removeEventListener("keydown", retryHandlerRef.current);
        window.removeEventListener("touchstart", retryHandlerRef.current);
        retryHandlerRef.current = null;
      }
    };

    const tryPlay = () => {
      if (playedRef.current) return;
      removeRetryListener();
      audio.play().then(
        () => {
          playedRef.current = true;
        },
        () => {
          const onNext = () => {
            removeRetryListener();
            tryPlay();
          };
          retryHandlerRef.current = onNext;
          window.addEventListener("pointerdown", onNext);
          window.addEventListener("keydown", onNext);
          window.addEventListener("touchstart", onNext);
        },
      );
    };

    const onIntroFinished = (event: Event) => {
      const { sound } = (event as CustomEvent<{ sound: boolean }>).detail ?? {
        sound: false,
      };
      if (!sound) tryPlay();
    };

    window.addEventListener("hs-intro-finished", onIntroFinished);

    return () => {
      window.removeEventListener("hs-intro-finished", onIntroFinished);
      removeRetryListener();
      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
}