"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#f59e0b";

export function DomcodeLLMPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame
      label="Domcode LLM 1.0.0 · Native Engine · CORE Tech Core · GPU/CPU Ready"
      accent={accent}
      className={className}
    >
      <div className="group relative aspect-[16/10] overflow-hidden bg-[#0d1117]">
        {/* Domcode LLM Interface Screenshot */}
        <Image
          src="/images/domcode-preview.png"
          alt="Domcode LLM AI Coding Assistant Interface"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Ambient Gradient Overlays */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: `radial-gradient(ellipse at 50% 10%, ${accent}25, transparent 65%)` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Floating status badges overlay */}
        <div className="pointer-events-none absolute bottom-3 inset-x-3 flex items-center justify-between gap-2">
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/80 px-3 py-1.5 backdrop-blur-md"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
            />
            <span className="font-mono text-[10px] font-semibold tracking-wide" style={{ color: accent }}>
              Domcode Engine Ready
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 backdrop-blur-md"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <svg className="h-3 w-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            <span className="font-mono text-[10px] text-white/60">GPU/CPU · Native C++</span>
          </motion.div>
        </div>

        {/* Top-left mode badge */}
        <motion.div
          className="pointer-events-none absolute top-3 left-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/75 px-2.5 py-1 backdrop-blur-md"
          initial={reduce ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span
            className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest"
            style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}
          >
            CORE
          </span>
          <span className="text-[10px] font-medium text-white/70">Tech Core</span>
        </motion.div>

        {/* Top-right version badge */}
        <motion.div
          className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/75 px-2.5 py-1 backdrop-blur-md"
          initial={reduce ? false : { opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <span className="font-mono text-[9px] text-white/50">v1.0.0 · Air-Gapped · Zero Cloud</span>
        </motion.div>
      </div>
    </PreviewFrame>
  );
}
