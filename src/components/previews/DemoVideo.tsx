"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";
import { ArrowUpRight, PlayIcon } from "@/components/ui/icons";

const PHISHING_SRC = "/videos/phishing-demo.mp4";
const PHISHING_LINKEDIN = "https://lnkd.in/dRpGMndE";
const LEDGER_SRC = "/videos/ledger-demo.mp4";
const HSBOT_SRC = "/videos/hsbot-demo.mp4";

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

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow flex items-center gap-2.5 text-white/45">
          <PlayIcon className="h-3 w-3" />
          Demo video
        </p>
        {externalLink ? (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            {externalLabel}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : null}
      </div>

      <PreviewFrame label={label} accent={accent} className={className}>
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <video
            src={videoSrc}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-contain"
          >
            Your browser does not support video playback.
          </video>
        </div>
      </PreviewFrame>

      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
        {caption}
      </p>
    </motion.div>
  );
}