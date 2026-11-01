"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const INTRO_VIDEO = "/videos/intro-hs.mp4";

export function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);

  const finish = useCallback((soundPlayed: boolean) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.dispatchEvent(
      new CustomEvent("hs-intro-finished", { detail: { sound: soundPlayed } }),
    );
    setVisible(false);
  }, []);

  // Initialize and attempt muted autoplay immediately on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Guaranteed autoplay compliance across all browsers
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch((err) => {
          console.warn("[IntroVideo] Autoplay blocked, awaiting tap:", err);
          setNeedsGesture(true);
        });
    }

    const onEnded = () => {
      finish(!video.muted);
    };

    const onError = (e: Event) => {
      console.warn("[IntroVideo] Error event:", e);
      setNeedsGesture(true);
    };

    // Unmute on first user touch / key / click anywhere
    const onUserInteraction = () => {
      if (video) {
        if (video.paused) {
          video.play().catch(() => {});
          setIsPlaying(true);
          setNeedsGesture(false);
        }
        if (video.muted) {
          video.muted = false;
          setIsMuted(false);
        }
      }
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    window.addEventListener("pointerdown", onUserInteraction);
    window.addEventListener("keydown", onUserInteraction);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };
  }, [finish]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    finish(!isMuted);
  };

  const handleTapToPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setNeedsGesture(false);
      })
      .catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        });
      });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hs-intro-video-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src={INTRO_VIDEO}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="h-full w-full max-h-screen object-contain"
            onPlay={() => {
              setIsPlaying(true);
              setNeedsGesture(false);
            }}
          />

          {/* Fallback button if browser blocked autoplay */}
          {needsGesture && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <button
                type="button"
                onClick={handleTapToPlay}
                className="group flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/20 text-white shadow-2xl transition hover:scale-110 hover:bg-amber-500/30 cursor-pointer"
              >
                <svg className="h-8 w-8 translate-x-0.5 fill-white text-amber-300" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-amber-300">
                Tap to Play Intro
              </p>
            </div>
          )}

          {/* Top Branding */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3 pointer-events-none">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 font-mono text-xs font-bold text-white backdrop-blur">
              HS
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xs font-bold tracking-widest text-white uppercase">
                HS AI Solutions
              </span>
              <span className="font-mono text-[10px] tracking-wider text-white/50">
                Studio Introduction
              </span>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between pointer-events-auto">
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 font-mono text-xs text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10 cursor-pointer"
            >
              <span>{isMuted ? "🔇 SOUND MUTED (TAP FOR SOUND)" : "🔊 SOUND ON"}</span>
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-white backdrop-blur transition hover:bg-white/25 hover:text-white active:scale-95 cursor-pointer shadow-lg"
            >
              Skip Intro ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
