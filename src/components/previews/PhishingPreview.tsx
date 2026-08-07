"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

export function PhishingPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const accent = "#f4495f";

  return (
    <PreviewFrame label="Phishing Defence · Threat Operations" accent={accent} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#170c0e] to-black">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: `radial-gradient(55% 50% at 70% 0%, ${accent}14, transparent 70%)` }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-25" />

        <div className="relative flex h-full flex-col gap-2 p-3 font-mono">
          {/* header strip */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/15 text-[10px] text-white"
                style={{ background: `${accent}1f` }}
              >
                ⛨
              </span>
              <span className="text-[10px] font-semibold tracking-wide text-white/90">
                Threat Operations
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-red-400/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-white/40">Analysing</span>
            </div>
          </div>

          {/* url under analysis */}
          <div className="relative overflow-hidden rounded-lg border border-white/12 bg-black/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 14 14" className="h-3 w-3 shrink-0" aria-hidden="true">
                <path
                  d="M11 6H3.5a1 1 0 00-1 1v3a1 1 0 001 1H11a1 1 0 001-1V7a1 1 0 00-1-1z"
                  stroke="white" strokeOpacity="0.7" strokeWidth="1.2"
                />
              </svg>
              <span className="min-w-0 truncate text-[10px] text-white/85">
                https://<span className="text-red-400">secure-login-verify</span>.example/bounce
              </span>
            </div>
            {!reduce ? (
              <span
                className="animate-scan pointer-events-none absolute left-0 h-px w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />
            ) : null}
          </div>

          {/* analysis checks */}
          <div className="flex flex-1 flex-col gap-1.5">
            {[
              { label: "DOMAIN CHECK", progress: 100, state: "warn", detail: "new domain · 4 days old" },
              { label: "URL SIGNALS", progress: 100, state: "warn", detail: "lookalike · long path · chars" },
              { label: "EMAIL ANALYSIS", progress: 82, state: "scan", detail: "scanning header + content" },
            ].map((r, i) => (
              <div
                key={r.label}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-semibold tracking-[0.15em] text-white/60">
                    {r.label}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[8px] text-white/40">{r.detail}</span>
                    {r.state === "warn" ? (
                      <span className="rounded bg-amber-400/15 px-1 py-0.5 text-[7px] font-semibold text-amber-300">
                        ⚠
                      </span>
                    ) : (
                      <span
                        className="rounded px-1 py-0.5 text-[7px] font-semibold text-white/70"
                        style={{ background: `${accent}22` }}
                      >
                        …
                      </span>
                    )}
                  </span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        r.state === "warn"
                          ? "linear-gradient(90deg,#f59e0b,#fb923c)"
                          : `linear-gradient(90deg, ${accent}, #f472a0)`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.15, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* threat score + verdict */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-white/12 bg-black/40 px-3 py-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-semibold tracking-[0.2em] text-white/50">
                  THREAT SCORE
                </span>
                <motion.span
                  className="text-[13px] font-bold text-amber-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  78 / 100
                </motion.span>
              </div>
              <div className="mt-1.5 flex h-1.5 gap-0.5">
                {[...Array(20)].map((_, ix) => (
                  <motion.span
                    key={ix}
                    className="h-full flex-1 rounded-full"
                    style={{
                      background:
                        ix < 14 ? "linear-gradient(90deg,#f59e0b,#fb923c)" : "rgba(255,255,255,0.08)",
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + ix * 0.03, duration: 0.3 }}
                  />
                ))}
              </div>
            </div>

            <motion.div
              className="flex flex-col items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <span className="text-[8px] font-mono font-semibold tracking-[0.2em] text-amber-300">
                ⚠ SUSPICIOUS
              </span>
              <span className="mt-0.5 text-[7px] text-amber-200/70">
                do not proceed
              </span>
            </motion.div>
          </div>

          {/* log tail */}
          <div className="hidden gap-x-3 text-[8px] leading-relaxed text-white/30 sm:flex">
            <span>&gt; resolving domain → 4 redirects</span>
            <span>&gt; entropy high in path segment</span>
            <span>&gt; matches 2 known patterns</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}