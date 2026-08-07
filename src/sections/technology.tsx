"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const GROUPS = [
  {
    label: "AI Layer",
    accent: "#f5a623",
    items: ["AI / LLM APIs", "RAG", "Vector Search", "AI Agents"],
  },
  {
    label: "Backend & Data",
    accent: "#8b7cf6",
    items: ["Python", "FastAPI", "Node.js", "PostgreSQL"],
  },
  {
    label: "Frontend & Ship",
    accent: "#22d3ee",
    items: ["React", "Next.js", "TypeScript", "Cloud Deployment"],
  },
];

export function Technology() {
  return (
    <section id="technology" className="relative overflow-hidden bg-paper py-28 text-ink md:py-40">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,black,transparent)]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={16}>
            <p className="eyebrow text-ink/45">Under the hood</p>
          </Reveal>
          <Reveal y={24} delay={0.05}>
            <h2 className="display-lg mt-5 text-[clamp(2.2rem,5vw,4.2rem)]">
              Built With AI + Engineering.
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.12}>
            <p className="mt-6 text-[17px] leading-relaxed text-ink/55">
              No imagined stacks — every technology below runs inside one of the four products,
              from orchestration to vector search to deployment.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.label} y={30} delay={gi * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: g.accent, boxShadow: `0 0 12px ${g.accent}88` }}
                  />
                  <p className="eyebrow text-ink/50">{g.label}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {g.items.map((t, ti) => (
                    <motion.span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-[13px] font-medium text-ink/75 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + ti * 0.06 }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: g.accent }}
                      />
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}