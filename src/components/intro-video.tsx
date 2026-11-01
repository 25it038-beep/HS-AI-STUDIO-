"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const INTRO_VIDEO = "/videos/intro-hs.mp4";

export function triggerIntroVideo() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("hs-open-intro-video"));
}

export function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);

  const finish = useCallback((sound: boolean) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.dispatchEvent(
      new CustomEvent("hs-intro-finished", { detail: { sound } }),
    );
    setVisible(false);
  }, []);

  // Listen for manual trigger to watch intro video anytime
  useEffect(() => {
    const handleOpen = () => {
      finishedRef.current = false;
      setVisible(true);
      setIsMuted(false);
      setShowPlayOverlay(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            videoRef.current!.muted = true;
            setIsMuted(true);
            videoRef.current!.play().catch(() => setShowPlayOverlay(true));
          });
      }
    };

    window.addEventListener("hs-open-intro-video", handleOpen);
    return () => window.removeEventListener("hs-open-intro-video", handleOpen);
  }, []);

  // Autoplay handling on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start with muted=true so modern browsers NEVER block video playback
    video.muted = true;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowPlayOverlay(false);
      })
      .catch((err) => {
        console.warn("[IntroVideo] Autoplay blocked, awaiting user click", err);
        setShowPlayOverlay(true);
      });

    // Tap/click anywhere to unmute
    const unmuteOnGesture = () => {
      if (video && video.muted) {
        video.muted = false;
        setIsMuted(false);
      }
    };

    const onEnded = () => finish(!isMuted);
    const onError = (e: any) => {
      console.warn("[IntroVideo] Video error:", e);
      setShowPlayOverlay(true);
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    window.addEventListener("pointerdown", unmuteOnGesture);
    window.addEventListener("keydown", unmuteOnGesture);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", unmuteOnGesture);
      window.removeEventListener("keydown", unmuteOnGesture);
    };
  }, [finish, isMuted]);

  const handleSkip = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    finish(!isMuted);
  }, [finish, isMuted]);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPlayOverlay(false);
        })
        .catch(() => {
          videoRef.current!.muted = true;
          setIsMuted(true);
          videoRef.current!.play().then(() => setShowPlayOverlay(false));
        });
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
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
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Manual Play Button if Browser Blocks Autoplay */}
          {showPlayOverlay && (
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
                Click to Watch Studio Intro
              </p>
            </div>
          )}

          {/* Top Branding & Sound Indicator */}
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

          {/* Bottom Bar: Audio Toggle & Skip */}
          <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between pointer-events-auto">
            {/* Audio State Button */}
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 font-mono text-xs text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10 cursor-pointer"
            >
              <span>{isMuted ? "🔇 SOUND MUTED (TAP TO UNMUTE)" : "🔊 SOUND ON"}</span>
            </button>

            {/* Skip Button */}
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
