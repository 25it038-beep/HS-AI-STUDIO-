"use client";

import { products } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { LedgerGraph } from "@/components/visuals/ledger-graph";
import { DemoVideo, DEMO_VIDEOS } from "@/components/previews/DemoVideo";

const ledger = products[2]!;

export function DigitalIdentity() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(139,124,246,0.14), transparent)" }}
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-ledger" />
              03 · {ledger.category}
            </p>
          </Reveal>
          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.2rem,4.6vw,4rem)]">Ledger</h2>
          </Reveal>
          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              Your Digital Identity, Made Intelligent.
            </p>
          </Reveal>
          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted-dark">
              Credentials, projects, documents, skills, and career goals become connected pieces of
              a personal intelligence system — one living archive that understands what you have
              done and what you could do next.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Document ingestion", "Knowledge graph", "Skill-gap analysis", "Career Copilot"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/60"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal y={20} delay={0.28}>
            <div className="mt-9">
              <MagneticButton href={ledger.url} external lg accent={ledger.accent}>
                Explore Ledger
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal y={40} delay={0.1}>
          <LedgerGraph />
        </Reveal>
      </div>

      <div className="container-x relative mt-24 md:mt-32">
        <div className="mx-auto max-w-3xl">
          <DemoVideo
            src={DEMO_VIDEOS.ledger.src}
            label={DEMO_VIDEOS.ledger.label}
            accent={ledger.accent}
            caption={DEMO_VIDEOS.ledger.caption}
          />
        </div>
      </div>
    </section>
  );
}