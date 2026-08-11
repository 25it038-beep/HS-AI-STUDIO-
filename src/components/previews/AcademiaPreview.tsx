"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#60a5fa";

const ROADMAP = [
  { step: "Week 1–2", topic: "Foundations", done: true },
  { step: "Week 3–5", topic: "Core concepts", done: true },
  { step: "Week 6–7", topic: "Advanced topics", done: false },
  { step: "Week 8–9", topic: "Practice & papers", done: false },
];

const GRAPH = [
  { cx: 50, cy: 18, r: 6, label: "Roots", color: accent },
  { cx: 22, cy: 44, r: 5, label: "Trees", color: "#8b7cf6" },
  { cx: 78, cy: 44, r: 5, label: "Graphs", color: "#22d3ee" },
  { cx: 50, cy: 70, r: 5, label: "DP", color: "#f5a623" },
];

export function AcademiaPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame label="Academia AI · Learning Operating System" accent={accent} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#0b1020] to-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(50% 45% at 30% 0%, ${accent}12, transparent 70%)` }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-[0.35]" />

        <div className="relative flex h-full">
          {/* roadmap rail */}
          <div className="hidden w-[24%] shrink-0 flex-col border-r border-white/8 bg-black/25 p-3 sm:flex">
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold text-black"
                style={{ background: accent }}
              >
                A
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white/90">Academia AI</p>
                <p className="text-[8px] font-mono text-emerald-400/80">Semester roadmap</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {ROADMAP.map((r) => (
                <div
                  key={r.step}
                  className={`rounded-lg border px-2.5 py-2 ${
                    r.done
                      ? "border-white/12 bg-white/[0.06]"
                      : "border-white/8 bg-white/[0.02] opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-mono uppercase tracking-wider text-white/35">
                      {r.step}
                    </p>
                    {r.done ? (
                      <span
                        className="rounded px-1 py-0.5 text-[7px] font-mono uppercase tracking-wider text-black"
                        style={{ background: `${accent}cc` }}
                      >
                        Done
                      </span>
                    ) : (
                      <span className="rounded bg-white/10 px-1 py-0.5 text-[7px] font-mono uppercase tracking-wider text-white/60">
                        Up next
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[10px] font-medium text-white/85">{r.topic}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
              <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">
                Mastery
              </p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accent }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "62%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <p className="mt-1 text-[8px] text-white/50">62% across 4 chapters</p>
            </div>
          </div>

          {/* tutor conversation */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
              <p className="text-[10px] font-medium text-white/85">AI Tutor — Data Structures</p>
              <span className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[9px] font-medium text-white/70">Online</span>
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3">
              <div className="max-w-[82%] self-start rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/85">
                Explain recursion with a visual I can actually follow.
              </div>

              <div className="max-w-[86%] self-start">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-white/40">
                    AI Tutor
                  </span>
                </div>
                <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/85">
                  Think of a function that calls itself on a smaller input — like stacking boxes
                  until you hit the base case, then unwinding. Here is the visual…
                </div>
              </div>

              {/* knowledge graph card */}
              <div className="self-end rounded-2xl rounded-br-md bg-white/[0.09] px-3.5 py-2.5">
                <p className="mb-1.5 text-[9px] font-mono uppercase tracking-widest text-white/45">
                  Knowledge graph — recursion
                </p>
                <svg viewBox="0 0 100 88" className="w-40">
                  {GRAPH.map((n, i) => {
                    const links = [
                      [0, 1],
                      [0, 2],
                      [1, 3],
                      [2, 3],
                    ];
                    return links
                      .filter(([a]) => a === i || i === 0)
                      .map(([a, b]) => (
                        <line
                          key={`${a}-${b}`}
                          x1={GRAPH[a].cx}
                          y1={GRAPH[a].cy}
                          x2={GRAPH[b].cx}
                          y2={GRAPH[b].cy}
                          stroke={GRAPH[b].color}
                          strokeOpacity="0.45"
                          strokeWidth="1"
                          strokeDasharray="2.5 2.5"
                          className={reduce ? "" : "animate-dash-flow"}
                        />
                      ));
                  })}
                  {GRAPH.map((n) => (
                    <g key={n.label}>
                      <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} fillOpacity="0.9" />
                      <text
                        x={n.cx}
                        y={n.cy + n.r + 7}
                        textAnchor="middle"
                        fontSize="4.5"
                        fill="#ffffff"
                        fillOpacity="0.55"
                      >
                        {n.label}
                      </text>
                    </g>
                  ))}
                </svg>
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
                  <span className="ml-1 text-[9px] text-white/45">generating quiz…</span>
                </div>
              </motion.div>
            </div>

            <div className="border-t border-white/[0.06] p-2.5">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="flex-1 truncate text-[10px] text-white/45">
                  Ask anything — or talk to your tutor…
                </span>
                <span
                  className="shrink-0 rounded-md px-2.5 py-1 text-[9px] font-semibold text-black"
                  style={{ background: accent }}
                >
                  Ask
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}