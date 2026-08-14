"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_VIDEO = "/videos/intro-hs.mp4";

export function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
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
          setSoundBlocked(true);
          video.muted = true;
          video
            .play()
            .then(() => {
              setHintVisible(true);
              window.setTimeout(() => setHintVisible(false), 9000);
            })
            .catch(() => finish(false));
        });
    };

    const unlockOnGesture = () => {
      if (!video.muted) return;
      video.muted = false;
      video.currentTime = 0;
      soundRef.current = true;
      video.play().catch(() => {});
    };

    const onEnded = () => finish(soundRef.current);
    const onError = () => finish(false);

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    window.addEventListener("pointerdown", unlockOnGesture);
    window.addEventListener("keydown", unlockOnGesture);
    window.addEventListener("touchstart", unlockOnGesture);
    tryPlay();

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", unlockOnGesture);
      window.removeEventListener("keydown", unlockOnGesture);
      window.removeEventListener("touchstart", unlockOnGesture);
    };
  }, [finish, reducedMotion]);

  const handleSkip = useCallback(() => {
    videoRef.current?.pause();
    finish(soundRef.current);
  }, [finish]);

  return (
    <>
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
      <AnimatePresence>
        {soundBlocked && hintVisible && !visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 z-[100] flex w-[min(92vw,30rem)] -translate-x-1/2 items-start gap-3 rounded-2xl border border-white/10 bg-ink/90 px-5 py-4 text-sm text-paper/90 shadow-2xl backdrop-blur"
          >
            <span aria-hidden>🔇</span>
            <p className="flex-1">
              Your browser blocked the intro&apos;s sound. To hear it
              automatically on every visit, click the{" "}
              <span className="font-medium text-paper">speaker icon</span> in
              the address bar and choose <span className="font-medium text-paper">Allow</span>.
            </p>
            <button
              type="button"
              onClick={() => setHintVisible(false)}
              className="text-xs uppercase tracking-widest text-paper/50 transition hover:text-paper"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}