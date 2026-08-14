"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_VIDEO = "/videos/intro-hs.mp4";

export function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const soundRef = useRef(false);
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
          video.muted = true;
          video.play().catch(() => {
            /* video failed to load — chime will play instead */
          });
        });
    };

    const onEnded = () => finish(soundRef.current);
    const onError = () => finish(false);

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    tryPlay();

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
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