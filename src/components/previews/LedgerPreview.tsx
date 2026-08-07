"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const INPUTS = ["Certificate", "Resume", "Projects", "Portfolio"];
const OUTPUTS = ["Skills", "Career Matches", "Skill Gaps", "Opportunities"];

export function LedgerPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const accent = "#8b7cf6";

  return (
    <PreviewFrame label="Ledger · Personal Intelligence Layer" accent={accent} className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#14112a] to-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: `radial-gradient(60% 50% at 50% 0%, ${accent}1c, transparent 70%)` }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative flex h-full">
          {/* left / right columns + spine */}
          <div className="flex w-[40%] max-w-[210px] flex-col justify-center gap-2 px-3">
            {INPUTS.map((it) => (
              <div
                key={it}
                className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-[9px] font-medium text-white/70"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-sm bg-white/25 align-middle" />
                {it}
              </div>
            ))}
          </div>

          {/* core spine */}
          <div className="flex flex-1 flex-col items-center px-2">
            <p className="pt-2 text-[7px] font-mono uppercase tracking-[0.3em] text-white/35">
              Ingest
            </p>
            <svg viewBox="0 0 60 150" className="mt-1 h-[38%] w-14 shrink-0">
              <line
                x1="30" y1="4" x2="30" y2="146"
                stroke="white" strokeOpacity="0.14" strokeWidth="1"
              />
              <motion.circle
                cx="30" cy="0" r="3"
                fill={accent}
                animate={reduce ? undefined : { cy: [0, 146] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.line
                x1="30" y1="4" x2="30" y2="146"
                stroke={accent} strokeWidth="1.4" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8 }}
              />
            </svg>

            <div
              className="relative -mt-1 z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 text-[11px] font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${accent}2e, ${accent}10)`,
                boxShadow: `0 0 40px -6px ${accent}66`,
              }}
            >
              LEDGER
            </div>

            <svg viewBox="0 0 60 150" className="mt-1 h-[38%] w-14 shrink-0">
              <line
                x1="30" y1="4" x2="30" y2="146"
                stroke="white" strokeOpacity="0.14" strokeWidth="1"
              />
              <motion.circle
                cx="30" cy="146" r="3"
                fill="#c4a8ff"
                animate={reduce ? undefined : { cy: [146, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            <p className="pt-1 pb-2 text-[7px] font-mono uppercase tracking-[0.3em] text-white/35">
              Intelligence
            </p>
          </div>

          {/* right side — identity card */}
          <div className="flex w-[46%] max-w-[250px] flex-col gap-1.5 py-3 pr-3">
            <motion.div
              className="rounded-xl border border-white/12 bg-white/[0.05] p-3"
              animate={reduce ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[13px] font-bold text-white"
                  style={{ background: `radial-gradient(${accent}40, ${accent}08)` }}
                >
                  A
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white/95">Active Profile</p>
                  <p className="text-[8px] font-mono text-white/40">Linked to 14 sources</p>
                </div>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {["FastAPI", "RAG", "LLMs", "Vectors"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[8px] font-mono text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {OUTPUTS.map((o, i) => (
              <div
                key={o}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5"
              >
                <span
                  className="h-5 w-1 rounded-full"
                  style={{ background: accent, opacity: 0.4 + i * 0.15 }}
                />
                <span className="flex-1 text-[9px] font-medium text-white/75">{o}</span>
                <span className="text-[8px] font-mono text-white/40">
                  {["+32", "match 91%", "2 gaps", "3 next"][i]}
                </span>
              </div>
            ))}

            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/45">
                  Career Readiness
                </span>
                <span className="text-[10px] font-semibold" style={{ color: accent }}>
                  91%
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${accent}, #c4a8ff)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "91%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}