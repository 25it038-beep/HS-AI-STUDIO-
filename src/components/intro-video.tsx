"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_VIDEO = "/videos/intro-hs.mp4";

export function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const [mutedHint, setMutedHint] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const soundRef = useRef(false);
  const interactedRef = useRef(false);
  const finishedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const finish = useCallback((sound: boolean) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.dispatchEvent(
      new CustomEvent("hs-intro-finished", { detail: { sound } }),
    );
    setVisible(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      finish(false);
      return;
    }

    const tryPlay = () => {
      video
        .play()
        .then(() => {
          soundRef.current = true;
        })
        .catch(() => {
          if (interactedRef.current) {
            video.muted = false;
            video.currentTime = 0;
            soundRef.current = true;
            video.play().catch(() => {});
          } else {
            video.muted = true;
            video
              .play()
              .then(() => setMutedHint(true))
              .catch(() => {
                /* video failed to load — chime will play instead */
              });
          }
        });
    };

    const unlockSound = () => {
      interactedRef.current = true;
      if (video.muted) {
        video.muted = false;
        video.currentTime = 0;
        soundRef.current = true;
        setMutedHint(false);
        video.play().catch(() => {});
      } else {
        video.play().catch(() => {});
      }
    };

    const onEnded = () => finish(soundRef.current);
    const onError = () => finish(false);

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    window.addEventListener("pointerdown", unlockSound);
    window.addEventListener("keydown", unlockSound);
    window.addEventListener("touchstart", unlockSound);
    tryPlay();

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
    };
  }, [finish, reducedMotion]);

  const handleSkip = useCallback(() => {
    videoRef.current?.pause();
    finish(soundRef.current);
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          <video
            ref={videoRef}
            src={INTRO_VIDEO}
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
          <AnimatePresence>
            {mutedHint && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-pulse rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs uppercase tracking-widest text-white/90 backdrop-blur"
              >
                Tap anywhere for sound
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={handleSkip}
            className="absolute bottom-6 right-6 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}