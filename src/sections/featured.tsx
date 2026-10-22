"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, DownloadIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Showcase";
import { GalaxyVisionPreview } from "@/components/previews/GalaxyVisionPreview";
import { ElectronPreview } from "@/components/previews/ElectronPreview";

export function Featured() {
  const galaxy = products.find((p) => p.id === "galaxy-vision")!;
  const electron = products.find((p) => p.id === "electron")!;

  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[560px] w-[640px] rounded-full blur-[140px] opacity-25"
        style={{ background: "radial-gradient(closest-side, rgba(192,132,252,0.3), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-[50%] h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.25), transparent)" }}
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      {/* ========================================================= */}
      {/* SPOTLIGHT 01: GALAXY VISION (Multimodal Vision-Language AI) */}
      {/* ========================================================= */}
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: galaxy.accent, boxShadow: `0 0 10px ${galaxy.accent}` }}
              />
              {galaxy.number} · Spotlight · {galaxy.category}
            </p>
          </Reveal>

          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.4rem,7vw,6.5rem)]">{galaxy.name}</h2>
          </Reveal>

          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              {galaxy.tagline}
            </p>
          </Reveal>

          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark">
              {galaxy.description}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={galaxy.downloadUrl ?? "/downloads/galaxy-vision-v1.0.0-portable.zip"}
                lg
                accent={galaxy.accent}
              >
                Download Portable ZIP
                <DownloadIcon className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                href={`/products/${galaxy.id}`}
                variant="ghost"
                lg
                accent={galaxy.accent}
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>

          {/* Quick Start pill instructions */}
          <Reveal y={18} delay={0.26}>
            <div className="mt-7 inline-flex flex-wrap items-center gap-2 rounded-xl border border-purple-400/25 bg-purple-950/20 px-3.5 py-2 text-xs text-purple-200/90 backdrop-blur-sm">
              <span className="font-semibold text-purple-300">Quick Start:</span>
              <span>1. Download ZIP</span>
              <span className="text-white/30">→</span>
              <span>2. Extract</span>
              <span className="text-white/30">→</span>
              <span className="font-mono font-semibold text-white">3. Run start_desktop.bat</span>
            </div>
          </Reveal>

          <Reveal y={18} delay={0.3}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
              100% Local GPU · Vision & OCR · Document AI · Pronoun Memory · OpenAI API
            </p>
          </Reveal>
        </div>

        <Parallax depth={-46}>
          <GalaxyVisionPreview className="w-full" />
        </Parallax>
      </div>

      {/* ========================================================= */}
      {/* SPOTLIGHT 02: ELECTRON AI (Proprietary Distilled Offline AI) */}
      {/* ========================================================= */}
      <div className="container-x relative mt-24 border-t border-white/8 pt-24 md:mt-32 md:pt-32 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Parallax depth={-46} className="order-2 lg:order-1">
          <ElectronPreview className="w-full" />
        </Parallax>

        <div className="order-1 lg:order-2">
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: electron.accent, boxShadow: `0 0 10px ${electron.accent}` }}
              />
              {electron.number} · Spotlight · {electron.category}
            </p>
          </Reveal>

          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.4rem,7vw,6.5rem)]">{electron.name}</h2>
          </Reveal>

          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              {electron.tagline}
            </p>
          </Reveal>

          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark">
              {electron.description}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={electron.downloadUrl ?? "/downloads/Electron-AI-Standalone-NoOllama.zip"}
                lg
                accent={electron.accent}
              >
                Download Standalone ZIP
                <DownloadIcon className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                href={`/products/${electron.id}`}
                variant="ghost"
                lg
                accent={electron.accent}
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
      </div>

      <Link href="/products/galaxy-vision" className="sr-only">
        View Galaxy Vision details
      </Link>
      <Link href="/products/electron" className="sr-only">
        View Electron AI details
      </Link>
    </section>
  );
}
