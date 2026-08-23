"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#a855f7";

const LOGS = [
  { text: "Shield active · 0 WebRTC leaks · Canvas spoofed", tag: "PRIVACY", color: "text-emerald-400" },
  { text: "Executing autonomous task: Competitive Market Scan", tag: "AGENT", color: "text-purple-300" },
  { text: "Blocked 37 tracking scripts & fingerprint beacons", tag: "BLOCK", color: "text-sky-300" },
  { text: "Structured session payload stored in local vault", tag: "VAULT", color: "text-amber-300" },
];

export function PendulumPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <PreviewFrame label="Pendulum · Automated Private Browser · v0.1.0" accent={accent} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#11071F] via-[#090514] to-ink">
        {/* ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: `radial-gradient(55% 50% at 50% 0%, ${accent}22, transparent 75%)` }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-[0.35]" />

        <div className="relative flex h-full flex-col">
          {/* Browser Window Chrome & Tabs */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/80" />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${accent}99` }} />
              </div>
              <div className="ml-2 flex items-center gap-1">
                <div className="flex items-center gap-1.5 rounded-t-md border-t border-x border-white/12 bg-white/[0.08] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-white/90">Autonomous Session #1</span>
                </div>
                <div className="hidden items-center gap-1 rounded-t-md px-2.5 py-1 text-white/35 sm:flex font-mono text-[9px]">
                  <span>+ Stealth Tab</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 font-mono text-[7.5px] uppercase tracking-wider text-purple-300">
                Stealth Mode
              </span>
              <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[7px] text-white/60">
                v0.1.0
              </span>
            </div>
          </div>

          {/* URL & Controls Bar */}
          <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-black/25 px-3 py-2">
            <div className="flex items-center gap-1 text-white/40">
              <span className="cursor-default text-xs">‹</span>
              <span className="cursor-default text-xs">›</span>
              <span className="cursor-default text-xs">⟳</span>
            </div>

            <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-500/20 text-[9px] text-purple-300">
                🛡
              </span>
              <span className="font-mono text-[9.5px] text-purple-200">
                pendulum://private-automation/session-stealth-88
              </span>
              <span className="ml-auto hidden rounded bg-emerald-500/15 px-1.5 py-0.2 font-mono text-[7.5px] text-emerald-300 md:inline-block">
                Zero Trackers
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[8.5px] font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${accent}, #6366f1)` }}
              >
                <span>⚡ Auto</span>
              </span>
            </div>
          </div>

          {/* Browser Workspace */}
          <div className="flex min-h-0 flex-1">
            {/* Automation Task Pipeline & Privacy Telemetry */}
            <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
                  <p className="font-mono text-[7.5px] uppercase tracking-wider text-white/40">Shield Status</p>
                  <p className="mt-1 font-display text-sm font-semibold text-emerald-400">100% Isolated</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
                  <p className="font-mono text-[7.5px] uppercase tracking-wider text-white/40">Trackers Blocked</p>
                  <p className="mt-1 font-display text-sm font-semibold text-white">48 Telemetry</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
                  <p className="font-mono text-[7.5px] uppercase tracking-wider text-white/40">Agent State</p>
                  <p className="mt-1 font-display text-sm font-semibold text-purple-300">Automating</p>
                </div>
              </div>

              {/* Live Terminal / Automation Stream */}
              <div className="mt-3 flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/50 p-3">
                <div className="flex items-center justify-between border-b border-white/8 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                    <span className="font-mono text-[8.5px] font-medium text-white/80">
                      Browser Agent Workflow Execution
                    </span>
                  </div>
                  <span className="font-mono text-[7.5px] text-white/35">Local Sandboxed Worker</span>
                </div>

                <div className="mt-2.5 space-y-2">
                  {LOGS.map((log, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2.5 leading-relaxed"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.12 }}
                    >
                      <span className="shrink-0 rounded bg-white/10 px-1 py-0.5 font-mono text-[7px] text-white/60">
                        {log.tag}
                      </span>
                      <span className={`truncate font-mono text-[9px] ${log.color}`}>
                        {log.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Natural language automation input prompt */}
              <motion.div
                className="mt-3 rounded-lg border border-purple-500/30 bg-purple-950/20 p-2"
                animate={reduce ? undefined : { borderColor: ["rgba(168,85,247,0.3)", "rgba(168,85,247,0.7)", "rgba(168,85,247,0.3)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-[9px] text-white/60">
                    ⚡ &quot;Scrape market insights, bypass fingerprinting, and export summary&quot;
                  </span>
                  <span
                    className="shrink-0 rounded px-2 py-0.5 font-mono text-[8px] font-semibold text-black"
                    style={{ background: accent }}
                  >
                    RUNNING
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* bottom status */}
          <div className="flex shrink-0 items-center justify-between border-t border-white/[0.06] bg-black/40 px-3 py-1.5">
            <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-white/35">
              Pendulum — Automated Private Browser
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.2em] text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Windows Native (x64) · Private & Secure
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
