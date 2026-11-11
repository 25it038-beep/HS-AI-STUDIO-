"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#06b6d4";
const ONE_LINER_COMMAND =
  "irm https://raw.githubusercontent.com/25it038-beep/julyllm/main/july_distribution/installer/start.ps1 | iex";

export function JulyLLMPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [activeModel, setActiveModel] = useState<"july" | "gravity" | "auto">("auto");

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(ONE_LINER_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <PreviewFrame
      label="July LLM · Autonomous Multi-Model CLI · 1-Liner PowerShell Launch"
      accent={accent}
      className={className}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#06090e] p-4 text-xs font-mono text-zinc-300 sm:p-5">
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-44 w-96 -translate-x-1/2 rounded-full blur-[80px] opacity-25"
          style={{ background: accent }}
        />

        {/* Top Interactive Command Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-cyan-500/30 bg-black/85 px-3 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2 overflow-hidden text-[11px]">
            <span className="shrink-0 text-cyan-400 font-bold">PS &gt;</span>
            <span className="truncate text-white/90 select-all font-mono">
              {ONE_LINER_COMMAND}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-950/40 px-2.5 py-1 text-[10.5px] font-semibold text-cyan-200 transition-all hover:bg-cyan-900/60 hover:text-white"
          >
            {copied ? (
              <>
                <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-3 w-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy 1-Liner</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div className="mt-3.5 space-y-2.5 overflow-hidden font-mono text-[11px] leading-relaxed">
          {/* ASCII Banner & Header */}
          <div className="text-cyan-400 font-bold select-none text-[9px] sm:text-[10.5px] leading-tight">
            <pre className="overflow-hidden">
{`   ██╗██╗   ██╗██╗  ██╗   ██╗   ██╗     ██╗     ███╗   ███╗
   ██║██║   ██║██║  ╚██╗ ██╔╝   ██║     ██║     ████╗ ████║
   ██║██║   ██║██║   ╚████╔╝    ██║     ██║     ██╔████╔██║
██ ██║██║   ██║██║    ╚██╔╝     ██║     ██║     ██║╚██╔╝██║
╚████╔╝╚██████╔╝███████╗██║     ███████╗███████╗██║ ╚═╝ ██║`}
            </pre>
          </div>

          <div className="border-b border-white/10 pb-2 text-[10px] text-zinc-400">
            <span className="text-white font-semibold">HS AI SOLUTIONS</span> • JULY LLM &amp; GRAVITY MULTI-MODEL PLATFORM
          </div>

          {/* Runtime step logs */}
          <div className="space-y-1 text-[10.5px]">
            <div className="flex items-center gap-2 text-emerald-400">
              <span>[⚡] [1/4]</span>
              <span className="text-zinc-200">Hardware acceleration &amp; in-process llama.cpp active</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>[✓] [2/4]</span>
              <span className="text-zinc-200">Clerk IAM Verified · Windows DPAPI Hardware Vault</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>[✓] [3/4]</span>
              <span className="text-zinc-200">Rate Limit Policy · 60s Sliding Window Protection</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <span>[⚡] [4/4]</span>
              <span>Mounted into Ephemeral RAM (Zero-Disk Footprint)</span>
            </div>
          </div>

          {/* Model Selection Tabs */}
          <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-[10px]">
            <span className="text-zinc-400">Active Foundation:</span>
            <button
              type="button"
              onClick={() => setActiveModel("july")}
              className={`rounded-md px-2 py-0.5 font-semibold transition-colors ${
                activeModel === "july"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              [1] July LLM (Code/General)
            </button>
            <button
              type="button"
              onClick={() => setActiveModel("gravity")}
              className={`rounded-md px-2 py-0.5 font-semibold transition-colors ${
                activeModel === "gravity"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/50"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              [2] Gravity LLM (Deep Math)
            </button>
            <button
              type="button"
              onClick={() => setActiveModel("auto")}
              className={`rounded-md px-2 py-0.5 font-semibold transition-colors ${
                activeModel === "auto"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/50"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              [3] Auto-Router ⚡
            </button>
          </div>

          {/* Interactive Chat Prompt line */}
          <div className="mt-3 rounded-lg border border-cyan-500/20 bg-black/60 p-2.5 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">july&gt;</span>
              <span className="text-white">
                {activeModel === "auto"
                  ? "Auto-routing query to optimal foundation engine..."
                  : activeModel === "gravity"
                  ? "Evaluating tensor mathematical proof..."
                  : "Generating high-performance async architecture..."}
              </span>
              <span className="inline-block h-3.5 w-1.5 bg-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Floating Badges */}
        <div className="pointer-events-none absolute bottom-3 inset-x-3 flex items-center justify-between gap-2">
          <motion.div
            className="flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-black/85 px-3 py-1.5 backdrop-blur-md"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-ping"
              style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
            />
            <span className="font-mono text-[9.5px] font-semibold text-cyan-300">
              Multi-Model CLI · Ephemeral RAM Privacy
            </span>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/85 px-3 py-1.5 backdrop-blur-md"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-[9px] text-zinc-400">
              Windows PowerShell · DPAPI Hardware Bound
            </span>
          </motion.div>
        </div>
      </div>
    </PreviewFrame>
  );
}
