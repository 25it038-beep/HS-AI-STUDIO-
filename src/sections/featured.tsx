"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, DownloadIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Showcase";
import { PendulumPreview } from "@/components/previews/PendulumPreview";

const pendulum = products.find((p) => p.id === "pendulum") ?? products[0]!;

export function Featured() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[540px] w-[620px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(168,85,247,0.18), transparent)" }}
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_55%_55%_at_75%_40%,black,transparent)]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: pendulum.accent, boxShadow: `0 0 10px ${pendulum.accent}` }} />
              01 · Spotlight · {pendulum.category}
            </p>
          </Reveal>

          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(3rem,7vw,6.5rem)]">{pendulum.name}</h2>
          </Reveal>

          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              {pendulum.tagline}
            </p>
          </Reveal>

          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark">
              {pendulum.description}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={pendulum.downloadUrl ?? "/downloads/pendulum-setup.exe"} lg accent={pendulum.accent}>
                Download for Windows
                <DownloadIcon className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                href={`/products/${pendulum.id}`}
                variant="ghost"
                lg
                accent={pendulum.accent}
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal y={18} delay={0.28}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
              AI Agents · Private Browser · Zero Telemetry · Automation
            </p>
          </Reveal>
        </div>

        <Parallax depth={-46}>
          <PendulumPreview className="w-full" />
        </Parallax>
      </div>

      <Link href="/products/pendulum" className="sr-only">
        View Pendulum details
      </Link>
    </section>
  );
}