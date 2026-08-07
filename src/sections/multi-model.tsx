"use client";

import { products } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Showcase } from "@/components/ui/Showcase";
import { HSBotPreview } from "@/components/previews/HSBotPreview";
import { DemoVideo, DEMO_VIDEOS } from "@/components/previews/DemoVideo";

const hsbot = products[1]!;

export function MultiModel() {
  return (
    <section className="relative overflow-hidden bg-paper py-28 text-ink md:py-40">
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[520px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.16), transparent)" }}
      />
      <Showcase product={hsbot} renderPreview={() => <HSBotPreview />}>
        <Reveal y={20} delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {hsbot.features.slice(0, 5).map((f) => (
              <span
                key={f}
                className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1.5 text-[11px] font-medium text-ink/60"
              >
                {f}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal y={20} delay={0.16}>
          <div className="mt-8">
            <MagneticButton
              href={hsbot.url}
              external
              accent={hsbot.accent}
              variant="inverse"
            >
              Launch HSBot
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </Reveal>
      </Showcase>

      <Reveal y={30} className="container-x relative mt-24 md:mt-32">
        <div className="mx-auto max-w-3xl rounded-3xl bg-ink p-4 ring-1 ring-white/10 sm:p-6">
          <DemoVideo
            src={DEMO_VIDEOS.hsbot.src}
            label={DEMO_VIDEOS.hsbot.label}
            accent={hsbot.accent}
            caption={DEMO_VIDEOS.hsbot.caption}
          />
        </div>
      </Reveal>
    </section>
  );
}