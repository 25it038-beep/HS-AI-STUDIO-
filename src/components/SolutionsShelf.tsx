"use client";

import { useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { SOLUTIONS, DOWNLOAD_URL, type Solution } from "@/lib/data";

export default function SolutionsShelf() {
  return (
    <section id="solutions" className="relative z-10 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          <motion.span variants={fadeUp} className="section-kicker">
            <span className="kicker-dot" />
            One Place. Infinite Power.
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl"
          >
            <span className="text-white">Your AI</span>{" "}
            <span className="text-gradient">Shelf</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-400 max-w-md text-sm sm:text-base">
            All your AI tools in one place — instantly accessible,
            continuously evolving.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SOLUTIONS.map((solution, i) => (
            <SolutionCard key={solution.title} solution={solution} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Icon = solution.icon;
  const isDev = solution.status === "development";

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card || reduced) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--spot-x", `${x}px`);
      card.style.setProperty("--spot-y", `${y}px`);
      card.style.transform = `perspective(900px) rotateY(${(x / rect.width - 0.5) * 3}deg) rotateX(${-(y / rect.height - 0.5) * 3}deg)`;
    },
    [reduced]
  );

  const onLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay: index * 0.02 }}
      className="group gradient-ring"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="glass-card relative h-full overflow-hidden p-6 flex flex-col gap-5 cursor-pointer"
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(139,92,246,0.10), transparent 65%)",
          }}
        />
        {/* Reflection sheen */}
        <div className="absolute -top-1/2 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.045] to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: solution.gradient,
                boxShadow: `0 8px 28px -6px ${solution.glow}`,
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <StatusBadge status={solution.status} />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-display text-lg font-semibold text-white">
              {solution.title}
            </h3>
            <p
              className="text-xs font-medium"
              style={{
                background: solution.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {solution.tagline}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />

          <p className="text-[13px] text-zinc-400 leading-relaxed flex-1">
            {solution.description}
          </p>

          {isDev ? (
            <a
              href={DOWNLOAD_URL}
              download
              className="btn-primary w-full justify-center !py-3 !text-[13px] group/btn"
            >
              <Download className="w-4 h-4" />
              Download v0.1.0
            </a>
          ) : (
            <a
              href={solution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full justify-center !py-3 !text-[13px] group/btn"
            >
              Launch Application
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Solution["status"] }) {
  const isDev = status === "development";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
        isDev
          ? "text-amber-300 bg-amber-500/10 border-amber-500/25"
          : "text-emerald-300 bg-emerald-500/10 border-emerald-500/25"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
          isDev ? "bg-amber-400" : "bg-emerald-400"
        }`}
      />
      {isDev ? "In Development" : "Live"}
    </span>
  );
}
