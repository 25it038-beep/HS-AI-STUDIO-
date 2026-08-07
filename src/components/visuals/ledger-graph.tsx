"use client";

import { motion, useReducedMotion } from "framer-motion";

const LEFT = ["Certificate", "Resume", "Projects", "Portfolio", "Experience"];
const RIGHT = [
  { label: "Skills", meta: "mapped" },
  { label: "Career Matches", meta: "91% nearest" },
  { label: "Skill Gaps", meta: "2 identified" },
  { label: "Opportunities", meta: "3 next moves" },
];

export function LedgerGraph({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const accent = "#8b7cf6";

  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#14112a] to-ink p-5 shadow-card ${className}`}
      style={{ boxShadow: `0 40px 90px -40px ${accent}55` }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, ${accent}12, transparent 70%)` }}
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 rounded-2xl opacity-30" />

      <div className="relative grid min-h-[340px] grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6">
        {/* ingest column */}
        <div className="flex flex-col gap-2.5">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
            Ingest
          </p>
          {LEFT.map((label, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <span className="h-2 w-2 rounded-sm bg-white/20" />
              <span className="text-[13px] font-medium text-white/75">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* spine */}
        <div className="relative flex h-full w-16 flex-col items-center justify-center">
          <svg viewBox="0 0 40 100" className="h-full w-full">
            <line
              x1="20" y1="6" x2="20" y2="94"
              stroke="white" strokeOpacity="0.14" strokeWidth="1"
            />
            <line
              x1="20" y1="6" x2="20" y2="94"
              stroke={accent} strokeOpacity="0.6" strokeWidth="1.4"
              strokeDasharray="4 5"
              className={reduce ? "" : "animate-dash-flow"}
            />
            <motion.circle
              cx="20" cy="0" r="3" fill={accent}
              animate={reduce ? undefined : { cy: [4, 94] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <div
            className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 text-[9px] font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${accent}33, ${accent}0d)`,
              boxShadow: `0 0 44px -4px ${accent}88`,
            }}
          >
            LEDGER
          </div>
        </div>

        {/* right column */}
        <div className="flex flex-col gap-2.5">
          <p className="mb-1 text-right font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
            Intelligence
          </p>
          {RIGHT.map((r, i) => (
            <motion.div
              key={r.label}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
            >
              <span
                className="h-6 w-[3px] rounded-full"
                style={{ background: accent, opacity: 0.35 + i * 0.15 }}
              />
              <span className="flex-1 text-[13px] font-medium text-white/80">{r.label}</span>
              <span className="font-mono text-[10px] text-white/40">{r.meta}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 border-t border-white/8 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/70">
            <span className="mr-2 text-white/35">Ledger AI →</span>
            Personal, connected, career-aware intelligence.
          </p>
          <motion.div
            className="hidden gap-1.5 sm:flex"
            animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            {[accent, "#c4a8ff", accent].map((c, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}