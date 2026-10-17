"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#38bdf8";

export function ElectronPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame
      label="Electron AI · Standalone Model · Offline & Real-Time Web Search"
      accent={accent}
      className={className}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#0a0d14] via-[#0e131d] to-[#080b10] p-3 text-white sm:p-5">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-[100px] opacity-30"
          style={{ background: accent }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-[90px] opacity-20"
          style={{ background: "#818cf8" }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative flex h-full flex-col justify-between">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                <Image
                  src="/images/electron-logo.jpg"
                  alt="Electron AI Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-sm font-semibold tracking-wide text-white">
                    ELECTRON AI
                  </h4>
                  <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-300">
                    Proprietary Model
                  </span>
                </div>
                <p className="text-[10px] text-white/50">
                  HS AI Solutions · Standalone Lightweight Edition
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                100% Offline Ready
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-1 text-[10px] font-mono text-sky-300">
                🌐 Live Web Search
              </span>
            </div>
          </div>

          {/* Central Workspace / Chat Preview */}
          <div className="my-auto space-y-3 py-2">
            {/* User message */}
            <motion.div
              className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-white/10 bg-white/[0.06] p-3 text-right backdrop-blur-sm sm:max-w-[75%]"
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-xs text-white/90 sm:text-[13px]">
                Can you run offline on my 4GB laptop and also search the web when I connect?
              </p>
            </motion.div>

            {/* Live Web Search Indicator */}
            <motion.div
              className="flex items-center gap-2 rounded-lg border border-sky-400/25 bg-sky-950/40 px-3 py-1.5 font-mono text-[10px] text-sky-300 backdrop-blur-md"
              initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
            >
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-sky-400" />
              <span>DuckDuckGo Real-Time Search Bridge: Query resolved & injected into context</span>
            </motion.div>

            {/* Model Response */}
            <motion.div
              className="mr-auto max-w-[90%] rounded-2xl rounded-tl-sm border border-sky-500/20 bg-black/50 p-3.5 backdrop-blur-md sm:max-w-[85%]"
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-[9px] font-semibold text-sky-400">
                  ELECTRON ENGINE (GGUF)
                </span>
                <span className="text-[9px] text-white/40">· 4GB RAM Optimized · Zero Ollama</span>
              </div>
              <p className="text-xs leading-relaxed text-white/85 sm:text-[12.5px]">
                Yes! I am engineered to run completely standalone without internet, consuming minimal
                memory so any standard laptop with <strong className="text-white">4GB RAM</strong> runs smoothly.
                When you need live data, my integrated search bridge fetches real-time web results automatically.
              </p>
            </motion.div>
          </div>

          {/* Quick Start Guidance Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-[10px] text-white/60">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/20 text-sky-300 font-bold text-[10px]">
                1
              </span>
              <span>Download & Extract ZIP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/20 text-sky-300 font-bold text-[10px]">
                2
              </span>
              <span>Double-click <strong className="text-white">Start-Electron.bat</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                3
              </span>
              <span>Runs in browser (No Ollama needed)</span>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
