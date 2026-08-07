"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";

const NODES = [
  { ...products[0]!, x: 50, y: 8 },
  { ...products[1]!, x: 6, y: 46 },
  { ...products[2]!, x: 94, y: 46 },
  { ...products[3]!, x: 50, y: 92 },
];

export function Ecosystem() {
  const reduce = useReducedMotion();

  return (
    <section id="ecosystem" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)" }}
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <p className="eyebrow text-white/45">One ecosystem</p>
          </Reveal>
          <Reveal y={24} delay={0.05}>
            <h2 className="display-lg mt-5 text-[clamp(2.2rem,5vw,4.2rem)]">
              Four Products. One Core: AI.
            </h2>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-20 aspect-[4/3] max-w-3xl sm:aspect-[16/11]">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {NODES.map((n) => (
              <g key={n.id}>
                <line
                  x1="50" y1="50" x2={n.x} y2={n.y}
                  stroke={n.accent} strokeOpacity="0.35" strokeWidth="0.35"
                  strokeDasharray="2 2.5"
                  className={reduce ? "" : "animate-dash-flow"}
                />
              </g>
            ))}
          </svg>

          {/* center */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] font-display text-xl font-bold text-white backdrop-blur-md sm:h-24 sm:w-24 sm:text-2xl"
              style={{ boxShadow: "0 0 70px -10px rgba(255,255,255,0.35)" }}
            >
              AI
            </div>
            <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
              Core
            </span>
          </motion.div>

          {/* product nodes */}
          {NODES.map((n, i) => (
            <motion.div
              key={n.id}
              className="absolute w-[44%] max-w-[240px] -translate-x-1/2 -translate-y-1/2 sm:w-[36%]"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                href={`/products/${n.id}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-onyx/90 px-4 py-3 backdrop-blur-md transition-colors duration-300 hover:border-white/30"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: n.accent, boxShadow: `0 0 14px ${n.accent}` }}
                />
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-white">{n.name}</span>
                  <span
                    className="block truncate font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: n.accent }}
                  >
                    {n.category}
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Reveal y={20} delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl text-center text-[15px] leading-relaxed text-muted-dark">
            Every node is live and clickable — each system is a different answer to the same
            question: <span className="text-white/90">what can AI actually do?</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}