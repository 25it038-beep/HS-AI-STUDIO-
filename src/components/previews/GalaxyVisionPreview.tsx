"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#c084fc";

export function GalaxyVisionPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame
      label="Galaxy Vision 1.0.0 · Local Multimodal Vision-Language Workspace"
      accent={accent}
      className={className}
    >
      <div className="group relative aspect-[16/10] overflow-hidden bg-[#0c0a14]">
        {/* Actual Galaxy Vision Workspace Interface Screenshot */}
        <Image
          src="/images/galaxy-vision-preview.png"
          alt="Galaxy Vision Multimodal AI Workspace Interface"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Ambient Gradient Overlays */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35 transition-opacity duration-500 group-hover:opacity-15"
          style={{ background: `radial-gradient(ellipse at 50% 10%, ${accent}25, transparent 60%)` }}
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
              galaxy-vision:1.0 · Online & Ready · 100% Local GPU
            </span>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center gap-2 rounded-lg border border-fuchsia-400/30 bg-fuchsia-950/80 px-3 py-1.5 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-[9px] text-fuchsia-300">
              ✦ Vision Chat · Image Analysis · Documents · Web Research
            </span>
          </motion.div>
        </div>
      </div>
    </PreviewFrame>
  );
}
