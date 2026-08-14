"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_VIDEO = "/videos/intro-hs.mp4";

export function IntroVideo() {
  const [entered, setEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const finish = useCallback((sound: boolean) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.dispatchEvent(
      new CustomEvent("hs-intro-finished", { detail: { sound } }),
    );
    setEntered(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
    }

    return () => {
      video.pause();
    };
  }, [reducedMotion]);

  const handleEnter = useCallback(() => {
    const video = videoRef.current;
    if (video && !reducedMotion) {
      video.loop = false;
      video.muted = false;
      video.currentTime = 0;
      video.play().then(
        () => finish(true),
        () => finish(false),
      );
    } else {
      finish(false);
    }
  }, [finish, reducedMotion]);

  const handleSkip = useCallback(() => {
    videoRef.current?.pause();
    finish(false);
  }, [finish]);

  return (
    <AnimatePresence>
      {!entered && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          {!reducedMotion && (
            <video
              ref={videoRef}
              src={INTRO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <motion.div
            className="relative flex flex-col items-center gap-6 px-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-center text-[11px] uppercase tracking-[0.35em] text-white/60">
              HS AI Solutions
            </p>
            <button
              type="button"
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-10 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white backdrop-blur transition hover:border-white/60 hover:bg-white/20"
            >
              <span className="flex h-6 w-6 items-center justify-center">
                <span className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white transition group-hover:scale-110" />
              </span>
              Enter with sound
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="text-[11px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white/80"
            >
              Skip intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}