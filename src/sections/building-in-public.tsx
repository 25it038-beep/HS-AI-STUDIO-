"use client";

import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: "4", label: "AI Products", note: "live & deployed" },
  { value: "Multiple", label: "AI Models", note: "orchestrated" },
  { value: "∞", label: "Continuous Experiments", note: "always shipping" },
];

export function BuildingInPublic() {
  return (
    <section id="building" className="relative bg-paper py-24 text-ink md:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <Reveal y={16}>
              <p className="eyebrow text-ink/45">Building in public</p>
            </Reveal>
            <Reveal y={24} delay={0.05}>
              <h2 className="display-lg mt-5 text-[clamp(2.2rem,5vw,4rem)]">Still Building.</h2>
            </Reveal>
            <Reveal y={20} delay={0.12}>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/55">
                These applications are part of an ongoing exploration into AI, software
                engineering, intelligent automation, and real-world problem solving. The studio is
                never finished.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} y={30} delay={0.08 + i * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-xl border border-ink/10 bg-white/70 p-6 backdrop-blur-sm">
                  <div>
                    <p className="display-lg text-4xl text-ink">{s.value}</p>
                    <p className="mt-3 text-[14px] font-semibold text-ink/80">{s.label}</p>
                  </div>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                    {s.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}