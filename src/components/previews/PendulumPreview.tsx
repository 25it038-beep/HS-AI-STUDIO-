"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#a855f7";

export function PendulumPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame label="Pendulum · Automated Private Browser · Windows x64" accent={accent} className={className}>
      <div className="group relative aspect-[16/10] overflow-hidden bg-black">
        {/* Actual Pendulum Browser Screenshot */}
        <Image
          src="/images/pendulum-preview.jpg"
          alt="Pendulum Automated Private Browser Interface"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Ambient Gradient Overlays */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: `radial-gradient(ellipse at 50% 10%, ${accent}25, transparent 60%)` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Floating status badges overlay */}
        <div className="pointer-events-none absolute bottom-3 inset-x-3 flex items-center justify-between gap-2">
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/70 px-3 py-1.5 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[9px] font-medium text-white/90">
              Private Mode · Encrypted Vault
            </span>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center gap-2 rounded-lg border border-purple-400/30 bg-purple-950/70 px-3 py-1.5 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-[9px] text-purple-300">
              ✦ AI Cursor & Automated Search
            </span>
          </motion.div>
        </div>
      </div>
    </PreviewFrame>
  );
}
