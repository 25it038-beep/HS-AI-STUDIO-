"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroCanvas } from "@/components/visuals/hero-canvas";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative min-h-dvh overflow-hidden bg-ink">
      {/* background layers */}
      <HeroCanvas />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(245,166,35,0.14), rgba(34,211,238,0.07), transparent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(closest-side, rgba(139,124,246,0.12), transparent)" }}
      />

      <div className="container-x relative flex min-h-dvh flex-col justify-center pb-28 pt-32">
        <motion.p
          className="eyebrow flex items-center gap-3 text-white/45"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lumina" />
          HS AI Solutions
        </motion.p>

        <h1 className="display-xl mt-7 max-w-5xl text-[clamp(3rem,9vw,7.25rem)]">
          {["Building", "AI", "That", "Does", "More."].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <motion.span
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: "110%" }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: "0%" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
              >
                {word}
                {i < 4 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
        >
          A growing collection of intelligent applications built to{" "}
          <span className="text-white">create</span>,{" "}
          <span className="text-white">communicate</span>,{" "}
          <span className="text-white">protect</span>, and{" "}
          <span className="text-white">unlock human potential</span>.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
        >
          <MagneticButton href="#products" lg>
            Explore My AI Products
          </MagneticButton>
          <MagneticButton href="#projects" variant="ghost" lg>
            View Applications
          </MagneticButton>
        </motion.div>

        {/* product strip */}
        <motion.div
          className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/8 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {[
            { name: "Lumina", c: "#f5a623" },
            { name: "HSBot", c: "#22d3ee" },
            { name: "Ledger", c: "#8b7cf6" },
            { name: "Phishing Defence", c: "#f4495f" },
          ].map((p) => (
            <span key={p.name} className="flex items-center gap-2.5 text-sm text-white/50">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.c }} />
              {p.name}
            </span>
          ))}
          <span className="ml-auto hidden items-center gap-2 text-sm text-white/35 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            4 systems live
          </span>
        </motion.div>
      </div>

      <a
        href="#intro"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/35 transition-colors hover:text-white/70"
        aria-label="Scroll to introduction"
      >
        <motion.svg
          viewBox="0 0 16 24"
          className="h-6 w-4"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M8 2v18M2.5 14.5L8 20l5.5-5.5"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </a>
    </section>
  );
}