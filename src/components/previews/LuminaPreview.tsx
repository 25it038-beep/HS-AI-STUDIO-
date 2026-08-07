"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

export function LuminaPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const accent = "#f5a623";

  return (
    <PreviewFrame label="Lumina · Presentation Studio" accent={accent} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#1a150e] to-ink">
        {/* ambience */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(60% 50% at 70% 0%, ${accent}14, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full blur-3xl"
          style={{ background: `${accent}18` }}
        />

        <div className="relative flex h-full">
          {/* outline rail */}
          <div className="hidden w-[17%] shrink-0 flex-col gap-1 border-r border-white/8 bg-black/20 p-2.5 sm:flex">
            <p className="px-1 pb-1 text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
              Structure
            </p>
            {[
              "Hook",
              "The Problem",
              "Our Approach",
              "Features",
              "Vision",
            ].map((s, i) => (
              <div
                key={s}
                className={`rounded-md px-2 py-1.5 text-[9px] ${
                  i === 2
                    ? "bg-white/[0.07] text-white ring-1 ring-white/10"
                    : "text-white/40"
                }`}
              >
                <span className="mr-1.5 font-mono text-white/25">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>

          {/* canvas */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-black"
                  style={{ background: accent }}
                >
                  L
                </div>
                <span className="text-[10px] font-medium text-white/80">Launch Deck</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-md bg-white/[0.05] px-2.5 py-1 sm:flex">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-white/40">
                    Layout
                  </span>
                  <span className="h-2 w-2 rounded-sm bg-white/50" />
                  <span className="h-2 w-2 rounded-sm bg-white/20" />
                  <span className="h-2 w-2 rounded-sm bg-white/20" />
                </div>
                <div
                  className="rounded-md px-2.5 py-1 text-[9px] font-semibold text-black"
                  style={{ background: accent }}
                >
                  Export ▸
                </div>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center p-3 sm:p-4">
              <motion.div
                className="relative w-full max-w-[340px] rounded-xl border border-white/10 bg-mist text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
                animate={reduce ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between px-3.5 pt-3">
                  <span
                    className="rounded-full px-2 py-0.5 text-[7px] font-mono font-semibold uppercase tracking-widest text-black"
                    style={{ background: accent }}
                  >
                    AI Plan · Slide 03
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="px-3.5 pb-3.5 pt-2">
                  <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-ink/40">
                    Approach
                  </p>
                  <p className="mt-1 text-xl font-semibold leading-tight tracking-tight">
                    Generative slides,
                    <br />
                    designed by AI.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { label: "Plan", v: "w-4/5" },
                      { label: "Structure", v: "w-3/4" },
                      { label: "Design", v: "w-2/3" },
                    ].map((b) => (
                      <div key={b.label} className="rounded-md border border-ink/10 bg-white p-1.5">
                        <p className="text-[7px] font-mono uppercase tracking-wider text-ink/45">
                          {b.label}
                        </p>
                        <div className="mt-1 h-4 w-full">
                          <div
                            className={`h-full ${b.v} rounded-sm`}
                            style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-ink/10 bg-white/70 p-1.5">
                      <div className="mb-1 h-1.5 w-2/3 rounded bg-ink/15" />
                      <div className="h-1.5 w-5/6 rounded bg-ink/10" />
                      <div className="mt-1 h-1.5 w-1/2 rounded bg-ink/10" />
                    </div>
                    <div className="rounded-md border border-ink/10 bg-white/70 p-1.5">
                      <div className="mb-1 h-1.5 w-1/2 rounded bg-ink/15" />
                      <div className="h-1.5 w-4/5 rounded bg-ink/10" />
                      <div className="mt-1 h-1.5 w-3/5 rounded bg-ink/10" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* prompt bar */}
            <div className="border-t border-white/[0.06] p-2.5">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="shimmer h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                <span className="min-w-0 flex-1 truncate text-[10px] text-white/45">
                  Generate slides about e-commerce growth strategy…
                </span>
                <span
                  className="shrink-0 rounded-md px-2.5 py-1 text-[9px] font-semibold text-black"
                  style={{ background: accent }}
                >
                  Generate
                </span>
              </div>
            </div>
          </div>

          {/* design rail */}
          <div className="hidden w-[20%] shrink-0 flex-col border-l border-white/8 bg-black/20 p-2.5 lg:flex">
            <p className="px-1 pb-2 text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
              Design
            </p>
            <div className="flex gap-1.5 px-1">
              {[accent, "#ffffff", "#3d3d3d", "#7c6cf0", "#14b8a6"].map((c) => (
                <span
                  key={c}
                  className="h-4 w-4 rounded-full ring-2 ring-transparent"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              {[
                { l: "Display", c: "w-3/4" },
                { l: "Body", c: "w-full" },
                { l: "Mono", c: "w-1/2" },
              ].map((r) => (
                <div key={r.l} className="px-1">
                  <p className="text-[7px] font-mono uppercase tracking-wider text-white/35">{r.l}</p>
                  <div className="mt-0.5 h-1.5">
                    <div className="h-full rounded-full bg-white/15" style={{ width: r.c.replace("w-", "%") }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md border border-white/10 bg-white/[0.04] p-2">
              <p className="text-[7px] font-mono uppercase tracking-widest text-white/45">Theme</p>
              <p className="mt-1 text-[10px] font-medium text-white/85">Studio · Warm</p>
              <div className="mt-1.5 flex gap-1">
                <span className="h-1.5 flex-1 rounded-full bg-white/20" />
                <span className="h-1.5 flex-1 rounded-full" style={{ background: accent }} />
                <span className="h-1.5 flex-1 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}