"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const MODELS = [
  { name: "Model A", note: "Fast", color: "#22d3ee" },
  { name: "Model B", note: "Balanced", color: "#818cf8" },
  { name: "Model C", note: "Deep", color: "#f0abfc" },
];

export function HSBotPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const accent = "#22d3ee";

  return (
    <PreviewFrame label="HSBot · Multi-Model Workspace" accent={accent} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#0d1620] to-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(50% 45% at 30% 0%, ${accent}12, transparent 70%)` }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-[0.35]" />

        <div className="relative flex h-full">
          {/* model rail */}
          <div className="hidden w-[24%] shrink-0 flex-col border-r border-white/8 bg-black/25 p-3 sm:flex">
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold text-black"
                style={{ background: accent }}
              >
                H
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/90">HSBot</p>
                <p className="text-[8px] font-mono text-emerald-400/80">3 models online</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {MODELS.map((m, i) => (
                <div
                  key={m.name}
                  className={`group flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors ${
                    i === 1 ? "border-white/15 bg-white/[0.06]" : "border-white/8 bg-white/[0.02]"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute h-full w-full rounded-full opacity-50"
                      style={{ background: m.color }}
                    />
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: m.color }}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-white/85">{m.name}</p>
                    <p className="text-[8px] font-mono text-white/35">{m.note}</p>
                  </div>
                  {i === 1 ? (
                    <span className="rounded bg-white/10 px-1 py-0.5 text-[7px] font-mono uppercase tracking-wider text-white/70">
                      Active
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            {/* routing diagram */}
            <div className="mt-auto rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
              <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
                Routing
              </p>
              <svg viewBox="0 0 160 56" className="mt-1 w-full">
                <line
                  x1="80" y1="6" x2="80" y2="22"
                  stroke={accent} strokeOpacity="0.5" strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className={reduce ? "" : "animate-dash-flow"}
                />
                <line x1="28" y1="26" x2="72" y2="26" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="1.2" />
                <line x1="80" y1="26" x2="80" y2="50" stroke="#f0abfc" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 3" className={reduce ? "" : "animate-dash-flow"} />
                <line x1="132" y1="26" x2="88" y2="26" stroke="#818cf8" strokeOpacity="0.5" strokeWidth="1.2" />
                <g>
                  <circle cx="28" cy="26" r="4" fill="#22d3ee" fillOpacity="0.9" />
                  <circle cx="80" cy="26" r="5" fill="#ffffff" fillOpacity="0.12" stroke="#ffffff" strokeOpacity="0.4" />
                  <circle cx="132" cy="26" r="4" fill="#818cf8" fillOpacity="0.9" />
                  <circle cx="80" cy="50" r="4" fill="#f0abfc" fillOpacity="0.9" />
                  <circle cx="80" cy="6" r="3.5" fill={accent} />
                </g>
              </svg>
              <p className="mt-1 text-[8px] text-white/40">
                One question → many intelligences → one answer.
              </p>
            </div>
          </div>

          {/* conversation */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
              <p className="text-[10px] font-medium text-white/85">Q3 strategy brief — compare models</p>
              <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[9px] font-medium text-white/70">All Models</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3">
              <div className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-white/[0.09] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/90">
                Summarize our Q3 growth plan in under 40 words — then critique it.
              </div>

              <div className="max-w-[85%] self-start">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#818cf8" }} />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-white/40">
                    Model B · Balanced
                  </span>
                </div>
                <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/85">
                  Q3: expand onboarding, ship two features, and double activated users. Strong
                  plan — but it risks bandwidth; I would trim one feature or shift it to Q4.
                </div>
              </div>

              <div className="max-w-[85%] self-start">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#f0abfc" }} />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-white/40">
                    Model C · Deep
                  </span>
                </div>
                <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/85">
                  The plan optimizes for volume, not sequencing. I would front-load retention
                  instrumentation in July so August experiments have signal.
                </div>
              </div>

              <motion.div
                className="max-w-[40%] self-start"
                animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="ml-1 text-[9px] text-white/45">routing…</span>
                </div>
              </motion.div>
            </div>

            <div className="border-t border-white/[0.06] p-2.5">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="flex-1 truncate text-[10px] text-white/45">
                  Ask across all models…
                </span>
                <span
                  className="shrink-0 rounded-md px-2.5 py-1 text-[9px] font-semibold text-black"
                  style={{ background: accent }}
                >
                  Send
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}