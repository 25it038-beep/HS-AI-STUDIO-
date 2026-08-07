"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = [
  { word: "CREATE", color: "#f5a623", desc: "AI-powered presentation and content generation." },
  { word: "CONVERSE", color: "#22d3ee", desc: "Multi-model intelligent communication." },
  { word: "PROTECT", color: "#f4495f", desc: "AI-powered phishing and threat detection." },
  { word: "UNDERSTAND", color: "#8b7cf6", desc: "Documents, credentials, skills, and personal data transformed into intelligence." },
  { word: "AUTOMATE", color: "#34d399", desc: "Systems that do the work behind the scenes." },
  { word: "ANALYZE", color: "#fbbf24", desc: "Raw inputs scored, matched, and explained." },
];

export function WhatIBuild() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % WORDS.length);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  const cur = WORDS[active]!;

  return (
    <section id="about" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,black,transparent)]" />
      <div className="container-x relative">
        <div className="flex items-end justify-between">
          <p className="eyebrow text-white/45">What I build</p>
          <p className="hidden font-mono text-[11px] text-white/25 sm:block">
            6 modes · {String(active + 1).padStart(2, "0")}/06
          </p>
        </div>

        <h2 className="display-lg mt-5 text-[clamp(2.2rem,5.6vw,4.6rem)]">
          AI Across Different
          <br className="hidden md:block" /> Problems.
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="relative flex min-h-[220px] flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="display-xl block text-[clamp(3rem,9vw,6rem)] leading-none"
                  style={{ color: cur.color }}
                >
                  {cur.word}
                </span>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-dark">
                  {cur.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center border-l border-white/8 pl-2">
            {WORDS.map((w, i) => (
              <button
                key={w.word}
                onClick={() => setActive(i)}
                className="group flex items-center gap-4 border-b border-white/8 py-3 text-left transition-colors"
              >
                <span
                  className={`font-mono text-[10px] ${i === active ? "text-white" : "text-white/25"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 font-display text-2xl font-medium uppercase tracking-tight transition-colors sm:text-3xl ${
                    i === active ? "text-white" : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  {w.word}
                </span>
                <AnimatePresence>
                  {i === active ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="h-2 w-2 rounded-full"
                      style={{ background: w.color, boxShadow: `0 0 14px ${w.color}` }}
                    />
                  ) : null}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}