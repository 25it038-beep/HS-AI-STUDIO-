"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const EXPLORE_VIDEO_SRC = "/videos/explore-hs.mp4";
export const EXPLORE_POSTER_SRC = "/videos/explore-poster.jpg";

export function triggerFullscreenExploreVideo(destinationUrl?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("hs-open-fullscreen-explore-video", {
      detail: destinationUrl ? { destinationUrl } : undefined,
    })
  );
}

export const triggerExploreVideo = triggerFullscreenExploreVideo;

export function FullscreenExploreVideo() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [destination, setDestination] = useState<string | null>(null);
  const destinationRef = useRef<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openVideo = useCallback((targetUrl?: string | null) => {
    destinationRef.current = targetUrl ?? null;
    setDestination(targetUrl ?? null);
    setSoundBlocked(false);
    setIsOpen(true);
  }, []);

  const closeVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    destinationRef.current = null;
    setDestination(null);
    setIsOpen(false);
  }, []);

  const handleGoToProjects = useCallback(() => {
    closeVideo();
    if (typeof window !== "undefined") {
      setTimeout(() => {
        if (window.location.pathname === "/") {
          const el = document.getElementById("projects");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = "#projects";
          }
        } else {
          window.location.href = "/#projects";
        }
      }, 80);
    }
  }, [closeVideo]);

  const handleProceed = useCallback(() => {
    const target = destinationRef.current;
    if (target) {
      closeVideo();
      router.push(target);
    } else {
      handleGoToProjects();
    }
  }, [closeVideo, handleGoToProjects, router]);

  const handleVideoEnded = useCallback(() => {
    // Graceful brief moment on the final logo screen before automatic navigation
    setTimeout(() => {
      handleProceed();
    }, 350);
  }, [handleProceed]);

  // Listen for global open event
  useEffect(() => {
    const onOpen = (e: Event) => {
      const custom = e as CustomEvent<{ destinationUrl?: string }>;
      const target = custom?.detail?.destinationUrl || null;
      openVideo(target);
    };
    window.addEventListener("hs-open-fullscreen-explore-video", onOpen);
    return () => {
      window.removeEventListener("hs-open-fullscreen-explore-video", onOpen);
    };
  }, [openVideo]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeVideo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeVideo]);

  // Play video automatically on open
  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setSoundBlocked(false);
        })
        .catch(() => {
          // Fallback to muted playback if browser blocks unmuted audio
          setSoundBlocked(true);
          video.muted = true;
          video.play().catch(() => {});
        });
    }
  }, [isOpen]);

  const unmuteOnTap = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      setSoundBlocked(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Explore HS AI Studio Video"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black overflow-hidden select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          onClick={unmuteOnTap}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(34,211,238,0.18), transparent 70%)",
            }}
          />

          {/* Top Bar with Badge and Close Button */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[11px] font-bold text-black">
                HS
              </span>
              <span className="font-display text-xs sm:text-sm font-semibold tracking-wider text-white">
                HS AI SOLUTIONS
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] text-cyan-300 border border-cyan-400/30 rounded-full px-2 py-0.5">
                Studio Reel
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeVideo();
              }}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur transition hover:border-white/50 hover:bg-white/10 active:scale-95"
              aria-label="Close video player"
            >
              <span>✕</span>
              <span>Close</span>
            </button>
          </div>

          {/* Full Screen Video Element */}
          <video
            ref={videoRef}
            src={EXPLORE_VIDEO_SRC}
            poster={EXPLORE_POSTER_SRC}
            playsInline
            controls
            preload="auto"
            onEnded={handleVideoEnded}
            className="h-full w-full max-h-screen object-contain"
          >
            Your browser does not support video playback.
          </video>

          {/* Tap Anywhere for Sound Prompt */}
          {soundBlocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-full border border-cyan-400/40 bg-black/85 px-4 py-2 text-[11px] sm:text-xs uppercase tracking-widest text-cyan-200 backdrop-blur shadow-2xl"
            >
              🔊 Tap anywhere for sound
            </motion.div>
          )}

          {/* Skip button: to destination product details or applications list */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleProceed();
            }}
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white active:scale-95"
          >
            {destination ? "Skip to Details →" : "Skip to Applications →"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
