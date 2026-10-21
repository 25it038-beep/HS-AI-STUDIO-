"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, PlayIcon } from "@/components/ui/icons";
import { triggerFullscreenExploreVideo } from "@/components/fullscreen-explore-video";

export const EXPLORE_VIDEO_SRC = "/videos/explore-hs.mp4";
export const EXPLORE_POSTER_SRC = "/videos/explore-poster.jpg";

export function triggerExploreVideo() {
  triggerFullscreenExploreVideo();
}

export function StudioExploreVideo({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showEndCard, setShowEndCard] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handlePlayEvent = () => {
      const video = videoRef.current;
      if (!video) return;

      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 2400);

      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowEndCard(false);
        })
        .catch(() => {
          video.muted = true;
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setShowEndCard(false);
            })
            .catch(() => {});
        });
    };

    window.addEventListener("hs-play-explore-video", handlePlayEvent);

    if (typeof window !== "undefined" && window.location.hash === "#explore-video") {
      const timer = setTimeout(handlePlayEvent, 700);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("hs-play-explore-video", handlePlayEvent);
      };
    }

    return () => {
      window.removeEventListener("hs-play-explore-video", handlePlayEvent);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowEndCard(false);
        })
        .catch(() => {
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
            setShowEndCard(false);
          });
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleGoToProjects = () => {
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
  };

  const handleReplay = () => {
    setShowEndCard(false);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = false;
      video.play().then(() => setIsPlaying(true)).catch(() => {
        video.muted = true;
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      });
    }
  };

  return (
    <motion.div
      ref={containerRef}
      id="explore-video"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`scroll-mt-28 w-full ${className}`}
    >
      <div className="mx-auto max-w-4xl">
        {/* Top Header Tag */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2 text-white/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="eyebrow text-[11px] text-cyan-300">Explore HS AI Studio</span>
          </div>
          <button
            type="button"
            onClick={triggerFullscreenExploreVideo}
            className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-300 hover:text-white transition-colors"
          >
            <span>Watch Fullscreen</span>
            <span className="text-xs">⛶</span>
          </button>
        </div>

        {/* Player Container */}
        <div
          className={`relative overflow-hidden rounded-2xl border transition-all duration-700 ${
            isHighlighted
              ? "border-cyan-400/80 shadow-[0_0_50px_rgba(34,211,238,0.4)]"
              : "border-white/12 bg-onyx shadow-2xl hover:border-white/25"
          }`}
          style={{
            boxShadow: isHighlighted
              ? "0 0 60px rgba(34,211,238,0.35)"
              : "0 25px 70px -20px rgba(0,0,0,0.8), 0 0 40px -10px rgba(34,211,238,0.15)",
          }}
        >
          {/* Mac-style Window Chrome */}
          <div className="flex h-11 items-center justify-between border-b border-white/8 bg-sleet/70 px-4 backdrop-blur">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            </div>

            <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 font-mono text-[10.5px] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="truncate">HS AI SOLUTIONS · Intelligence Powers Possibility</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={triggerFullscreenExploreVideo}
                className="rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-cyan-300 hover:bg-white/10 transition"
                title="Open in Fullscreen"
              >
                Fullscreen ⛶
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="group relative aspect-video w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={EXPLORE_VIDEO_SRC}
              poster={EXPLORE_POSTER_SRC}
              controls={!showEndCard}
              playsInline
              preload="metadata"
              onPlay={() => {
                setIsPlaying(true);
                setShowEndCard(false);
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                setShowEndCard(true);
              }}
              onError={() => setHasError(true)}
              className="absolute inset-0 h-full w-full object-contain"
            >
              Your browser does not support video playback.
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && !hasError && !showEndCard && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all hover:bg-black/20"
                aria-label="Play Studio Reel video"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan-400/80 bg-black/80 text-white shadow-2xl backdrop-blur transition-transform duration-300 group-hover:scale-110 active:scale-95 sm:h-20 sm:w-20"
                  style={{ boxShadow: "0 0 35px rgba(34,211,238,0.5)" }}
                >
                  <PlayIcon className="ml-1 h-6 w-6 text-cyan-300 sm:h-8 sm:w-8" />
                </div>
                <span className="mt-4 rounded-full border border-white/20 bg-black/75 px-4 py-1.5 font-display text-xs font-medium tracking-wide text-white/90 backdrop-blur">
                  Click to Explore Studio Reel
                </span>
              </button>
            )}

            {/* End Card: Explore the Applications */}
            <AnimatePresence>
              {showEndCard && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-6 text-center backdrop-blur-md"
                >
                  <p className="eyebrow text-[10px] tracking-[0.25em] text-cyan-300">
                    Intelligence Powers Possibility
                  </p>
                  <h3 className="display-lg mt-2 text-2xl sm:text-4xl text-white">
                    Explore the Applications
                  </h3>
                  <p className="mt-2 max-w-md text-xs sm:text-sm text-white/60">
                    Eight intelligent systems built to solve real-world problems.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleGoToProjects}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-cyan-400 px-6 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-cyan-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                    >
                      <span>Explore the Applications</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleReplay}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-xs sm:text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      <span>Replay ↺</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Fallback */}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/90 p-4 text-center text-xs text-white/70">
                <p>Unable to load studio reel video.</p>
                <button
                  type="button"
                  onClick={() => {
                    setHasError(false);
                    videoRef.current?.load();
                  }}
                  className="mt-1 rounded-full border border-white/20 px-3.5 py-1 text-[11px] uppercase tracking-wider text-white transition hover:bg-white/10"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
