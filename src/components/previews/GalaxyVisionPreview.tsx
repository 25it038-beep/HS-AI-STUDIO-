"use client";

import { motion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#c084fc";

export function GalaxyVisionPreview({ className = "" }: { className?: string }) {
  return (
    <PreviewFrame
      label="Galaxy Vision 1.0.0 · Local Multimodal Vision-Language AI"
      accent={accent}
      className={className}
    >
      <div className="relative overflow-hidden bg-[#0c0a14] p-4 text-white sm:p-5">
        {/* Ambient Nebula Glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #e879f9, #818cf8, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
        />

        {/* Top Control Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
            </span>
            <span className="font-mono text-[11px] font-semibold text-fuchsia-300">
              GALAXY VISION 1.0.0
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9.5px] text-white/70">
              Q4_K_M · RTX LOCAL
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-white/45">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Air-Gapped Privacy</span>
          </div>
        </div>

        {/* Dual Panel Layout: Visual Document Scan (Left) + Multi-Turn Chat (Right) */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          {/* Left: Multimodal Vision & OCR Viewport */}
          <div className="relative flex flex-col justify-between rounded-xl border border-white/10 bg-black/60 p-3.5 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between text-[10px] text-white/50">
                <span className="font-mono uppercase tracking-wider text-fuchsia-300">
                  Visual Document OCR & Bounding Box
                </span>
                <span className="rounded bg-fuchsia-500/20 px-1.5 py-0.5 font-mono text-[9px] text-fuchsia-200">
                  99.8% Conf
                </span>
              </div>

              {/* Simulated Document / Image Preview with Detected Zones */}
              <div className="relative mt-3 h-36 overflow-hidden rounded-lg border border-white/8 bg-[#120f22] p-2.5">
                {/* Scanner Grid Lines */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(192,132,252,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(192,132,252,0.06)_1px,transparent_1px)] bg-[size:16px_16px]" />

                {/* Animated Scan Line */}
                <motion.div
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent"
                  animate={{ y: [0, 130, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Bounding Box 1: Invoice Header */}
                <div className="relative rounded border border-fuchsia-400/60 bg-fuchsia-400/10 p-1.5 text-[9px] font-mono text-fuchsia-200">
                  <span className="block font-bold">INVOICE #48209 · ACME CORP</span>
                  <span className="text-[8px] text-white/60">Date: 2026-10-22 · Vendor ID: 8941</span>
                </div>

                {/* Bounding Box 2: Table Extraction */}
                <div className="mt-2 rounded border border-sky-400/50 bg-sky-400/10 p-1.5 text-[8.5px] font-mono text-sky-200">
                  <div className="flex justify-between border-b border-sky-400/20 pb-0.5">
                    <span>Item: Neural Accelerator Unit</span>
                    <span>$14,250.00</span>
                  </div>
                  <div className="mt-1 flex justify-between text-[8px] text-white/70">
                    <span>Due: Nov 15, 2026</span>
                    <span className="text-emerald-400">Status: Verified</span>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-fuchsia-400" />
                <div className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r border-t border-fuchsia-400" />
                <div className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b border-l border-fuchsia-400" />
                <div className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b border-r border-fuchsia-400" />
              </div>
            </div>

            {/* Bottom Capabilities Tags */}
            <div className="mt-3 flex flex-wrap gap-1 font-mono text-[8.5px]">
              <span className="rounded bg-white/5 px-2 py-0.5 text-white/60">Table OCR</span>
              <span className="rounded bg-white/5 px-2 py-0.5 text-white/60">Video Frames</span>
              <span className="rounded bg-white/5 px-2 py-0.5 text-white/60">Live Screenshot</span>
            </div>
          </div>

          {/* Right: Multi-Turn Context Aware Chat */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-black/60 p-3.5 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between text-[10px] text-white/50">
                <span className="font-mono uppercase tracking-wider text-fuchsia-300">
                  Multi-Turn Context & Pronoun Memory
                </span>
                <span className="text-[9px] text-emerald-400">Context: 8,192</span>
              </div>

              {/* Chat Thread */}
              <div className="mt-2.5 space-y-2.5 text-[11px]">
                {/* User Message 1 */}
                <div className="rounded-lg bg-white/8 p-2 text-white/80">
                  <span className="block font-mono text-[8.5px] uppercase text-white/40">You</span>
                  Extract key-value pairs from this invoice and check the due date.
                </div>

                {/* AI Response 1 */}
                <div className="rounded-lg border border-fuchsia-400/20 bg-fuchsia-950/30 p-2 text-white/90">
                  <span className="block font-mono text-[8.5px] uppercase text-fuchsia-300">
                    Galaxy Vision
                  </span>
                  Invoice #48209 · Total: $14,250.00 · Due: Nov 15, 2026. Extracted 8 structured JSON fields.
                </div>

                {/* User Message 2 (Pronoun resolution) */}
                <div className="rounded-lg bg-white/8 p-2 text-white/80">
                  <span className="block font-mono text-[8.5px] uppercase text-white/40">You</span>
                  Is it overdue?
                </div>

                {/* AI Response 2 */}
                <div className="rounded-lg border border-fuchsia-400/20 bg-fuchsia-950/30 p-2 text-white/90">
                  <span className="block font-mono text-[8.5px] uppercase text-fuchsia-300">
                    Galaxy Vision
                  </span>
                  No, it is current. The payment deadline is in 24 days.
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-white/40 font-mono">
              <span className="truncate">Ask about document, screenshot or web...</span>
              <span className="rounded bg-fuchsia-500/20 px-1.5 py-0.5 text-[8.5px] text-fuchsia-300">
                DuckDuckGo ON
              </span>
            </div>
          </div>
        </div>

        {/* Launchers Strip: One-Click BAT Files */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-2.5 text-[10px] font-mono">
          <span className="text-white/45">Launch via BAT files:</span>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-0.5 text-fuchsia-200">
              start_desktop.bat
            </span>
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-white/70">
              start_web_ui.bat
            </span>
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-white/70">
              start_cli.bat
            </span>
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-white/70">
              start_api.bat
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
