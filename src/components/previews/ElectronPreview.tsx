"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#38bdf8";

export function ElectronPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame
      label="Electron AI · Standalone Model · 100% Offline & Universal Web Search"
      accent={accent}
      className={className}
    >
      <div className="group relative aspect-[16/10] overflow-hidden bg-black">
        {/* Actual Electron AI Workspace Interface Screenshot */}
        <Image
          src="/images/electron-preview.png"
          alt="Electron AI Standalone Offline Model Interface"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Ambient Gradient Overlays */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: `radial-gradient(ellipse at 50% 10%, ${accent}25, transparent 60%)` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Floating status badges overlay */}
        <div className="pointer-events-none absolute bottom-3 inset-x-3 flex items-center justify-between gap-2">
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/75 px-3 py-1.5 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] font-medium text-white/90">
              100% Offline · 4GB RAM Ready · Zero Ollama
            </span>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-950/75 px-3 py-1.5 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-[9px] text-sky-300">
              ✦ Real-Time Web Search & Live Context Active
            </span>
          </motion.div>
        </div>
      </div>
    </PreviewFrame>
  );
}
