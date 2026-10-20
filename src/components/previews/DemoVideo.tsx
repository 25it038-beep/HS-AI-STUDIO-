"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";
import { ArrowUpRight, PlayIcon } from "@/components/ui/icons";

const PHISHING_SRC = "/videos/phishing-demo.mp4";
const PHISHING_LINKEDIN = "https://lnkd.in/dRpGMndE";
const LEDGER_SRC = "/videos/ledger-demo.mp4";
const HSBOT_SRC = "/videos/hsbot-demo.mp4";
const ACADEMIA_SRC = "/videos/academia-demo.mp4";
const PENDULUM_SRC = "/videos/pendulum-demo.mp4";

export const DEMO_VIDEOS: Record<
  string,
  {
    src: string;
    label: string;
    caption: string;
    externalLink?: string;
    externalLabel?: string;
  }
> = {
  pendulum: {
    src: PENDULUM_SRC,
    label: "Pendulum · Automated Private Browser Demo",
    caption: "Screen recording · Live Desktop Application",
  },
  phishing: {
    src: PHISHING_SRC,
    label: "Phishing Defence · Live Demo",
    caption: "Screen recording · also on LinkedIn",
    externalLink: PHISHING_LINKEDIN,
    externalLabel: "LinkedIn",
  },
  ledger: {
    src: LEDGER_SRC,
    label: "Ledger · Live Demo",
    caption: "Screen recording",
  },
  hsbot: {
    src: HSBOT_SRC,
    label: "HSBot · Live Demo",
    caption: "Screen recording",
  },
  academia: {
    src: ACADEMIA_SRC,
    label: "Academia AI · Live Demo",
    caption: "Demo video",
  },
};

export function DemoVideo({
  src,
  accent = "#f4495f",
  label = "Product · Live Demo",
  externalLink,
  externalLabel = "LinkedIn",
  caption = "Screen recording",
  className = "",
}: {
  src?: string;
  accent?: string;
  label?: string;
  externalLink?: string;
  externalLabel?: string;
  caption?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const videoSrc = src ?? PHISHING_SRC;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5 sm:mb-4 sm:gap-3">
        <p className="eyebrow flex items-center gap-2 text-white/45 text-[11px] sm:text-xs">
          <PlayIcon className="h-3 w-3 shrink-0" />
          <span>Demo video</span>
        </p>
        {externalLink ? (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white sm:px-3 sm:py-1.5"
          >
            <span>{externalLabel}</span>
            <ArrowUpRight className="h-3 w-3 shrink-0" />
          </a>
        ) : null}
      </div>

      <PreviewFrame label={label} accent={accent} className={className}>
        <div className="group relative aspect-video w-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            className="absolute inset-0 h-full w-full object-contain"
          >
            Your browser does not support video playback.
          </video>

          {!isPlaying && !hasError && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all hover:bg-black/15"
              aria-label="Play demo video"
            >
              <div
                className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/30 bg-black/75 text-white shadow-2xl backdrop-blur transition-transform group-hover:scale-110 active:scale-95"
                style={{ borderColor: accent }}
              >
                <PlayIcon className="ml-1 h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </button>
          )}

          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/85 px-4 text-center text-xs text-white/70">
              <p>Unable to load demo video.</p>
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
      </PreviewFrame>

      <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:mt-3 sm:tracking-[0.22em]">
        {caption}
      </p>
    </motion.div>
  );
}
