"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Showcase";
import { PhishingPreview } from "@/components/previews/PhishingPreview";
import { DemoVideo, DEMO_VIDEOS } from "@/components/previews/DemoVideo";

const phishing = products[3]!;

function FlowDiagram() {
  const steps = [
    { label: "Domain Check", tag: "reputation" },
    { label: "URL Signals", tag: "lookalike" },
    { label: "Email Analysis", tag: "content" },
  ];

  return (
    <div className="mt-6 rounded-xl border border-white/8 bg-black/40 p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
        Analysis pipeline
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-white/70">
          URL
        </span>
        <ArrowUpRight className="h-3 w-3 rotate-90 text-white/40" />
        <span
          className="rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-semibold text-black"
          style={{ background: phishing.accent }}
        >
          AI
        </span>
        <ArrowUpRight className="h-3 w-3 rotate-90 text-white/40" />
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <motion.span
              key={s.label}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12 }}
            >
              <span className="block text-[9px] font-medium text-white/80">{s.label}</span>
              <span className="block font-mono text-[8px] text-white/35">{s.tag}</span>
            </motion.span>
          ))}
        </div>
        <ArrowUpRight className="h-3 w-3 rotate-90 text-white/40" />
        <motion.span
          className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-amber-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          ⚠ SUSPICIOUS
        </motion.span>
      </div>
    </div>
  );
}

export function Security() {
  return (
    <section className="relative overflow-hidden bg-[#0b0405] py-28 md:py-40" id="security">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_80%,transparent)]" />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[460px] w-[520px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(244,73,95,0.15), transparent)" }}
      />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-phishing" />
              04 · {phishing.category}
            </p>
          </Reveal>
          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.2rem,4.6vw,4rem)]">Phishing Defence</h2>
          </Reveal>
          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              Stop Threats Before You Touch Them.
            </p>
          </Reveal>
          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted-dark">
              Analyze suspicious URLs and emails before they become a security problem. Domain
              reputation, URL signals, and message content are scored together and answered with a
              clear verdict — before you click.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-2">
              {phishing.features.slice(0, 5).map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/60"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal y={20} delay={0.28}>
            <div className="mt-9">
              <MagneticButton href={phishing.url} external lg accent={phishing.accent}>
                Launch Phishing Defence
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="lg:order-1">
          <Parallax depth={-40}>
            <PhishingPreview />
          </Parallax>
          <Reveal y={30} delay={0.15}>
            <FlowDiagram />
          </Reveal>
        </div>
      </div>

      <div className="container-x relative mt-24 md:mt-32">
        <div className="mx-auto max-w-3xl">
          <DemoVideo
            src={DEMO_VIDEOS.phishing.src}
            label={DEMO_VIDEOS.phishing.label}
            accent={phishing.accent}
            externalLink={DEMO_VIDEOS.phishing.externalLink}
            externalLabel={DEMO_VIDEOS.phishing.externalLabel}
            caption={DEMO_VIDEOS.phishing.caption}
          />
        </div>
      </div>
    </section>
  );
}