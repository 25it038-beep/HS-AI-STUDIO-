"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const INTRO_VIDEO = "/videos/intro-hs.mp4";

export function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [needsGesture, setNeedsGesture] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Immediately stop and release the video to prevent any further audio playback
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      } catch {
        // no-op
      }
    }
    setVisible(false);
  }, []);

  // Autoplay on mount (muted so browsers permit it)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setNeedsGesture(false);
        })
        .catch(() => {
          setNeedsGesture(true);
        });
    }

    const onEnded = () => {
      finish();
    };

    const onError = () => {
      finish();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [finish]);

  // Click on the intro video overlay to unmute or play (scoped strictly to this overlay)
  const handleOverlayClick = () => {
    const video = videoRef.current;
    if (!video || finishedRef.current) return;

    if (video.paused) {
      video.play().catch(() => {});
      setNeedsGesture(false);
    }
    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || finishedRef.current) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (video.paused) {
      video.play().catch(() => {});
      setNeedsGesture(false);
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    finish();
  };

  const handleManualPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || finishedRef.current) return;

    video.muted = false;
    setIsMuted(false);
    video
      .play()
      .then(() => {
        setNeedsGesture(false);
      })
      .catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setNeedsGesture(false));
      });
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hs-intro-video-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden select-none cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          onClick={handleOverlayClick}
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src={INTRO_VIDEO}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="h-full w-full max-h-screen object-contain pointer-events-none"
          />

          {/* Manual Play Button if Browser Blocks Autoplay */}
          {needsGesture && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <button
                type="button"
                onClick={handleManualPlay}
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
              <span>{isMuted ? "🔇 SOUND MUTED (TAP TO UNMUTE)" : "🔊 SOUND ON"}</span>
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
