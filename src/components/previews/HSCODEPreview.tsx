"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#4ade80";

const LINES: { t: string; c: string }[] = [
  { t: 'import { CodeAssistant } from "hs-code";', c: "text-sky-300" },
  { t: "", c: "" },
  { t: "const assistant = new CodeAssistant({", c: "text-white/70" },
  { t: '  mode: "local",', c: "text-amber-300" },
  { t: "  context: workspace,", c: "text-white/70" },
  { t: '  version: "0.1.0",', c: "text-amber-300" },
  { t: "});", c: "text-white/70" },
  { t: "", c: "" },
  { t: "assistant.answer({", c: "text-white/70" },
  { t: '  question: "explain this diff",', c: "text-amber-300" },
  { t: '  scope: "current-branch",', c: "text-amber-300" },
  { t: "});", c: "text-white/70" },
];

export function HSCODEPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame label="HS CODE · Desktop App · v0.1.0" accent={accent} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#0c1410] to-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(50% 45% at 30% 0%, ${accent}12, transparent 70%)` }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-[0.35]" />

        <div className="relative flex h-full flex-col">
          {/* native window chrome */}
          <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-black/30 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/80" />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${accent}80` }} />
            </div>
            <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1">
              <span
                className="flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-bold text-black"
                style={{ background: accent }}
              >
                H
              </span>
              <span className="text-[9px] font-medium text-white/70">hs-code · main</span>
            </div>
            <span className="rounded border border-amber-300/25 bg-amber-300/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.18em] text-amber-300/90">
              v0.1.0
            </span>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* sidebar */}
            <div className="hidden w-[20%] shrink-0 flex-col gap-1 border-r border-white/[0.06] bg-black/25 p-2.5 sm:flex">
              {[
                { label: "Chat", active: true },
                { label: "Code", active: false },
                { label: "Snippets", active: false },
                { label: "Settings", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${
                    item.active
                      ? "border border-white/12 bg-white/[0.06]"
                      : "border border-transparent"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${item.active ? "" : "bg-white/20"}`}
                    style={item.active ? { background: accent } : undefined}
                  />
                  <span
                    className={`text-[9px] font-medium ${
                      item.active ? "text-white/90" : "text-white/40"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
              <div className="mt-auto rounded-lg border border-white/8 bg-white/[0.03] p-2">
                <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/35">
                  Build
                </p>
                <p className="mt-1 text-[8px] leading-relaxed text-white/55">
                  Early access milestone — installable today.
                </p>
                <span className="mt-1.5 inline-block rounded bg-white/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-wider text-white/70">
                  In development
                </span>
              </div>
            </div>

            {/* editor */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
                <div className="flex items-center gap-2">
                  {["assistant.ts", "main.ts", "prompt.ts"].map((f, i) => (
                    <span
                      key={f}
                      className={`rounded-md px-2 py-1 font-mono text-[8px] ${
                        i === 0
                          ? "border border-white/12 bg-white/[0.06] text-white/85"
                          : "text-white/35"
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[8px] text-white/30">TypeScript · 0 errors</span>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden px-3 py-3">
                {LINES.map((line, i) => (
                  <div
                    key={i}
                    className="flex gap-3 leading-[1.7]"
                    style={{ opacity: line.t ? 1 : 0.35 }}
                  >
                    <span className="w-4 shrink-0 text-right font-mono text-[9px] text-white/25">
                      {i + 1}
                    </span>
                    <span className={`truncate font-mono text-[9.5px] ${line.c}`}>
                      {line.t || "\u00A0"}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div
                className="border-t border-white/[0.06] p-2.5"
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                  <span className="flex-1 truncate text-[10px] text-white/45">
                    Ask HS CODE anything about your code…
                  </span>
                  <span
                    className="shrink-0 rounded-md px-2.5 py-1 text-[9px] font-semibold text-black"
                    style={{ background: accent }}
                  >
                    Ask
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* status bar */}
          <div className="flex shrink-0 items-center justify-between border-t border-white/[0.06] bg-black/30 px-3 py-1.5">
            <span className="font-mono text-[7.5px] uppercase tracking-[0.18em] text-white/35">
              HS CODE — AI Code Companion
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.18em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Development build
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}