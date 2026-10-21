"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, PlayIcon } from "@/components/ui/icons";

export const EXPLORE_VIDEO_SRC = "/videos/explore-hs.mp4";
export const EXPLORE_POSTER_SRC = "/videos/explore-poster.jpg";

export function triggerFullscreenExploreVideo() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("hs-open-fullscreen-explore-video"));
}

// Alias for convenience
export const triggerExploreVideo = triggerFullscreenExploreVideo;

export function FullscreenExploreVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEndCard, setShowEndCard] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openVideo = useCallback(() => {
    setShowEndCard(false);
    setSoundBlocked(false);
    setIsOpen(true);
  }, []);

  const closeVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
    setShowEndCard(false);
  }, []);

  const handleGoToProjects = useCallback(() => {
    closeVideo();
    // Navigate / scroll to Explore the Applications section (#projects)
    if (typeof window !== "undefined") {
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
    }
  }, [closeVideo]);

  const handleReplay = useCallback(() => {
    setShowEndCard(false);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  // Listen for global open event
  useEffect(() => {
    const onOpen = () => openVideo();
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
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
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
            controls={!showEndCard}
            preload="auto"
            onEnded={() => setShowEndCard(true)}
            className="h-full w-full max-h-screen object-contain"
          >
            Your browser does not support video playback.
          </video>

          {/* Tap Anywhere for Sound Prompt */}
          {soundBlocked && !showEndCard && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-full border border-cyan-400/40 bg-black/85 px-4 py-2 text-[11px] sm:text-xs uppercase tracking-widest text-cyan-200 backdrop-blur shadow-2xl"
            >
              🔊 Tap anywhere for sound
            </motion.div>
          )}

          {/* Bottom Skip Button during playback */}
          {!showEndCard && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowEndCard(true);
              }}
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white active:scale-95"
            >
              Skip →
            </button>
          )}

          {/* End Screen: "Explore the Applications" */}
          <AnimatePresence>
            {showEndCard && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/92 p-6 text-center backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex flex-col items-center max-w-lg">
                  {/* Glowing Logo Icon */}
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 backdrop-blur"
                    style={{ boxShadow: "0 0 40px rgba(34,211,238,0.4)" }}
                  >
                    <span className="font-display text-2xl font-bold tracking-tight">HS</span>
                  </div>

                  {/* Subtitle */}
                  <p className="eyebrow mt-6 text-[11px] tracking-[0.25em] text-cyan-300">
                    Intelligence Powers Possibility
                  </p>

                  {/* Headline: Explore the Applications */}
                  <h2 className="display-lg mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                    Explore the Applications
                  </h2>

                  <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-white/65">
                    Eight intelligent systems — seven live, one in development — built to create, communicate, protect, and solve real-world problems.
                  </p>

                  {/* Call to Actions */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                    <button
                      type="button"
                      onClick={handleGoToProjects}
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-7 text-sm font-semibold text-black transition-all hover:bg-cyan-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(34,211,238,0.55)]"
                    >
                      <span>Explore the Applications</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleReplay}
                      className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/10 active:scale-95"
                    >
                      <PlayIcon className="h-3.5 w-3.5" />
                      <span>Replay Reel</span>
                    </button>
                  </div>

                  {/* Close link */}
                  <button
                    type="button"
                    onClick={closeVideo}
                    className="mt-6 text-xs text-white/40 transition hover:text-white/80"
                  >
                    Close and return to page
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
