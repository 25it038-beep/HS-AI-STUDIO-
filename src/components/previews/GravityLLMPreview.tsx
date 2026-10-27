"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#10b981";

export function GravityLLMPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame
      label="Gravity LLM 1.0.0 · Autonomous Agent Suite · 44 Active Tools · Native GGUF"
      accent={accent}
      className={className}
    >
      <div className="group relative aspect-[16/10] overflow-hidden bg-[#070c09]">
        {/* Actual Gravity LLM Workspace Interface Screenshot */}
        <Image
          src="/images/gravity-preview.png"
          alt="Gravity LLM Autonomous AI Workspace Interface"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] font-medium text-white/90">
              Gravity LLM 1.0 · Online &amp; Connected · 44 Tools
            </span>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-950/80 px-3 py-1.5 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-[9px] text-emerald-300">
              ✦ Live Reasoning (▌) · PDF/DOCX · Whisper Voice · Sandboxed Python
            </span>
          </motion.div>
        </div>
      </div>
    </PreviewFrame>
  );
}
