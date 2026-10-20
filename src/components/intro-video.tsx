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
          video.defaultMuted = true;
          video.setAttribute("muted", "");
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
      video.removeAttribute("muted");
      soundRef.current = true;
      setSoundBlocked(false);
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden select-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          >
            <video
              ref={videoRef}
              src={INTRO_VIDEO}
              autoPlay
              playsInline
              preload="auto"
              className="h-full w-full max-h-screen object-contain"
            />
            {soundBlocked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-full border border-white/20 bg-black/75 px-4 py-2 text-[11px] sm:text-xs uppercase tracking-widest text-white/90 backdrop-blur shadow-lg"
              >
                🔊 Tap anywhere for sound
              </motion.div>
            )}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleSkip}
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/90 backdrop-blur transition hover:bg-white/25 hover:text-white active:scale-95"
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
            className="fixed bottom-6 left-1/2 z-[100] flex w-[min(92vw,28rem)] -translate-x-1/2 items-start gap-3 rounded-2xl border border-white/10 bg-ink/95 p-4 text-xs sm:text-sm text-paper/90 shadow-2xl backdrop-blur"
          >
            <span aria-hidden className="text-base">🔇</span>
            <p className="flex-1 leading-relaxed">
              Your browser blocked the intro&apos;s sound. To hear it
              automatically, click the{" "}
              <span className="font-medium text-paper">speaker icon</span> in
              the address bar and choose <span className="font-medium text-paper">Allow</span>.
            </p>
            <button
              type="button"
              onClick={() => setHintVisible(false)}
              className="shrink-0 text-xs uppercase tracking-widest text-paper/50 transition hover:text-paper"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
