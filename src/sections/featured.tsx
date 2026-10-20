"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, DownloadIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Showcase";
import { ElectronPreview } from "@/components/previews/ElectronPreview";

const spotlight = products.find((p) => p.id === "electron") ?? products[0]!;

export function Featured() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[540px] w-[620px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.18), transparent)" }}
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_55%_55%_at_75%_40%,black,transparent)]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: spotlight.accent, boxShadow: `0 0 10px ${spotlight.accent}` }} />
              {spotlight.number} · Spotlight · {spotlight.category}
            </p>
          </Reveal>

          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.4rem,7vw,6.5rem)]">{spotlight.name}</h2>
          </Reveal>

          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              {spotlight.tagline}
            </p>
          </Reveal>

          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark">
              {spotlight.description}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={spotlight.downloadUrl ?? "/downloads/Electron-AI-Standalone-NoOllama.zip"} lg accent={spotlight.accent}>
                Download Standalone ZIP
                <DownloadIcon className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                href={`/products/${spotlight.id}`}
                variant="ghost"
                lg
                accent={spotlight.accent}
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>

          {/* Quick Start pill instructions */}
          <Reveal y={18} delay={0.26}>
            <div className="mt-7 inline-flex flex-wrap items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-950/20 px-3.5 py-2 text-xs text-sky-200/90 backdrop-blur-sm">
              <span className="font-semibold text-sky-300">Quick Start:</span>
              <span>1. Download ZIP</span>
              <span className="text-white/30">→</span>
              <span>2. Extract files</span>
              <span className="text-white/30">→</span>
              <span className="font-mono font-semibold text-white">3. Click Start-Electron.bat</span>
            </div>
          </Reveal>

          <Reveal y={18} delay={0.3}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
              100% Offline · Real-Time Web Search · 4GB RAM Ready · Zero Ollama
            </p>
          </Reveal>
        </div>

        <Parallax depth={-46}>
          <ElectronPreview className="w-full" />
        </Parallax>
      </div>

      <Link href="/products/electron" className="sr-only">
        View Electron AI details
      </Link>
    </section>
  );
}