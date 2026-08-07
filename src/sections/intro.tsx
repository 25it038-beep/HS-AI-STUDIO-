"use client";

import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="products" className="relative overflow-hidden bg-paper py-32 text-ink md:py-40">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />
      <div className="container-x relative">
        <Reveal y={16}>
          <p className="eyebrow text-ink/45">The Studio, in one line</p>
        </Reveal>

        <div className="display-lg mt-10 text-[clamp(2.4rem,6.5vw,5.6rem)]">
          <WordReveal text="Four Systems." className="block text-ink" />
          <WordReveal text="Four Problems." className="block text-ink" stagger={0.04} delay={0.1} />
          <WordReveal
            text="One AI-Driven Ecosystem."
            className="block bg-gradient-to-r from-[#f5a623] via-[#8b7cf6] to-[#22d3ee] bg-clip-text text-transparent"
            stagger={0.055}
            delay={0.22}
          />
        </div>

        <Reveal y={26} delay={0.35}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/55 md:text-xl">
            From generating presentations to orchestrating multiple AI models, building digital
            career intelligence, and defending users from phishing threats, each application
            explores a different way AI can solve real-world problems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}