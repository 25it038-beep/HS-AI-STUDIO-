"use client";

import { useState } from "react";
import Link from "next/link";
import { products, type ProductDetail } from "@/data/products";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, DownloadIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Showcase";
import { GravityLLMPreview } from "@/components/previews/GravityLLMPreview";
import { DomcodeLLMPreview } from "@/components/previews/DomcodeLLMPreview";
import { GalaxyVisionPreview } from "@/components/previews/GalaxyVisionPreview";
import { ElectronPreview } from "@/components/previews/ElectronPreview";
import { JulyLLMPreview } from "@/components/previews/JulyLLMPreview";
import { CollaboratorModal } from "@/components/CollaboratorModal";
import { DownloadCompanionModal } from "@/components/DownloadCompanionModal";
import { triggerFullscreenExploreVideo } from "@/components/fullscreen-explore-video";

export function Featured() {
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [activeCollabProduct, setActiveCollabProduct] = useState<ProductDetail | null>(null);
  const [downloadCompanionProduct, setDownloadCompanionProduct] = useState<ProductDetail | null>(null);
  const [downloadToast, setDownloadToast] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const gravity = products.find((p) => p.id === "gravity-llm")!;
  const domcode = products.find((p) => p.id === "domcode-llm")!;
  const galaxy = products.find((p) => p.id === "galaxy-vision")!;
  const electron = products.find((p) => p.id === "electron")!;
  const july = products.find((p) => p.id === "july-llm")!;

  const handleOpenCollab = (p: ProductDetail) => {
    setActiveCollabProduct(p);
    setCollabModalOpen(true);
  };

  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[560px] w-[640px] rounded-full blur-[140px] opacity-25"
        style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.3), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-[26%] h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(245,158,11,0.25), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -left-40 top-[52%] h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(168,85,247,0.25), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.2), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-32 h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(6,182,212,0.22), transparent)" }}
      />

      {/* ========================================================= */}
      {/* SPOTLIGHT 01: GRAVITY LLM (Flagship Autonomous Local AI)  */}
      {/* ========================================================= */}
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: gravity.accent, boxShadow: `0 0 10px ${gravity.accent}` }}
              />
              {gravity.number} · Flagship Local AI · {gravity.category}
            </p>
          </Reveal>

          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.4rem,7vw,6.5rem)]">{gravity.name}</h2>
          </Reveal>

          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              {gravity.tagline}
            </p>
          </Reveal>

          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark">
              {gravity.description}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenCollab(gravity)}
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: gravity.accent,
                  color: "#000",
                  boxShadow: `0 0 25px -4px ${gravity.accent}80`,
                }}
              >
                <span>Download Collaborator Suite</span>
                <DownloadIcon className="h-4 w-4" />
              </button>
              <MagneticButton
                href={`/products/${gravity.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerFullscreenExploreVideo(`/products/${gravity.id}`);
                }}
                variant="ghost"
                lg
                accent={gravity.accent}
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>

          {/* Quick Start pill instructions */}
          <Reveal y={18} delay={0.26}>
            <div className="mt-7 inline-flex flex-wrap items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-950/20 px-3.5 py-2 text-xs text-emerald-200/90 backdrop-blur-sm">
              <span className="font-semibold text-emerald-300">Quick Start:</span>
              <span>1. Extract ZIP</span>
              <span className="text-white/30">→</span>
              <span>2. Click Any Interface BAT</span>
              <span className="text-white/30">→</span>
              <span className="font-mono font-semibold text-white">3. Prompt Away</span>
            </div>
          </Reveal>

          {/* Hardware notice alert */}
          <Reveal y={18} delay={0.28}>
            <div className="mt-3 space-y-1.5 text-xs text-white/55">
              <p className="flex items-start gap-1.5 text-amber-300/90">
                <span className="font-bold">⚠️ Important:</span>
                <span>First token generation may experience initial warmup delay while neural layers allocate into VRAM.</span>
              </p>
              <p className="text-white/45">
                Ensure usage matches your hardware specifications; performance scales dynamically based on VRAM capacity.
              </p>
            </div>
          </Reveal>

          <Reveal y={18} delay={0.3}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
              44 Integrated Tools · PDF/Office Docs · Web Search · Python Sandbox · Edge-TTS
            </p>
          </Reveal>
        </div>

        <Parallax depth={-40}>
          <GravityLLMPreview className="w-full" />
        </Parallax>
      </div>

      {/* ========================================================= */}
      {/* SPOTLIGHT 02: DOMCODE LLM (Air-Gapped AI Coding Assistant) */}
      {/* ========================================================= */}
      <div className="container-x relative mt-24 border-t border-white/8 pt-24 md:mt-32 md:pt-32 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Parallax depth={40} className="order-2 lg:order-1">
          <DomcodeLLMPreview className="w-full" />
        </Parallax>

        <div className="order-1 lg:order-2">
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: domcode.accent, boxShadow: `0 0 10px ${domcode.accent}` }}
              />
              {domcode.number} · Collaborator Spotlight · {domcode.category}
            </p>
          </Reveal>

          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.4rem,7vw,6.5rem)]">{domcode.name}</h2>
          </Reveal>

          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              {domcode.tagline}
            </p>
          </Reveal>

          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark">
              {domcode.description}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenCollab(domcode)}
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: domcode.accent,
                  color: "#000",
                  boxShadow: `0 0 25px -4px ${domcode.accent}80`,
                }}
              >
                <span>Download Collaborator Setup</span>
                <DownloadIcon className="h-4 w-4" />
              </button>
              <MagneticButton
                href={`/products/${domcode.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerFullscreenExploreVideo(`/products/${domcode.id}`);
                }}
                variant="ghost"
                lg
                accent={domcode.accent}
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>

          {/* Quick Start pill instructions */}
          <Reveal y={18} delay={0.26}>
            <div className="mt-7 inline-flex flex-wrap items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-950/20 px-3.5 py-2 text-xs text-amber-200/90 backdrop-blur-sm">
              <span className="font-semibold text-amber-300">Quick Start:</span>
              <span>1. Run DomcodeLLM-Setup.exe</span>
              <span className="text-white/30">→</span>
              <span>2. 1-Click Install</span>
              <span className="text-white/30">→</span>
              <span className="font-mono font-semibold text-white">3. Launch & Code</span>
            </div>
          </Reveal>

          <Reveal y={18} delay={0.3}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
              Zero Ollama · In-Process C++ llama.cpp · AVX2/AVX-512 · 3.56 GB GGUF Q4_0 · Air-Gapped
            </p>
          </Reveal>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SPOTLIGHT 03: GALAXY VISION (Self-Hosted Vision & Voice)  */}
      {/* ========================================================= */}
      <div className="container-x relative mt-24 border-t border-white/8 pt-24 md:mt-32 md:pt-32 grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
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
              <button
                type="button"
                onClick={() => handleOpenCollab(galaxy)}
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: galaxy.accent,
                  color: "#000",
                  boxShadow: `0 0 25px -4px ${galaxy.accent}80`,
                }}
              >
                <span>Download Standalone ZIP</span>
                <DownloadIcon className="h-4 w-4" />
              </button>
              <MagneticButton
                href={`/products/${galaxy.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerFullscreenExploreVideo(`/products/${galaxy.id}`);
                }}
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
              100% Local GPU · Vision &amp; OCR · Document AI · Pronoun Memory · OpenAI API
            </p>
          </Reveal>
        </div>

        <Parallax depth={-40}>
          <GalaxyVisionPreview className="w-full" />
        </Parallax>
      </div>

      {/* ========================================================= */}
      {/* SPOTLIGHT 04: ELECTRON AI (Proprietary Distilled Offline AI) */}
      {/* ========================================================= */}
      <div className="container-x relative mt-24 border-t border-white/8 pt-24 md:mt-32 md:pt-32 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Parallax depth={40} className="order-2 lg:order-1">
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
              <button
                type="button"
                onClick={() => handleOpenCollab(electron)}
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: electron.accent,
                  color: "#000",
                  boxShadow: `0 0 25px -4px ${electron.accent}80`,
                }}
              >
                <span>Download Standalone ZIP</span>
                <DownloadIcon className="h-4 w-4" />
              </button>
              <MagneticButton
                href={`/products/${electron.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerFullscreenExploreVideo(`/products/${electron.id}`);
                }}
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

      {/* ========================================================= */}
      {/* SPOTLIGHT 05: JULY LLM (Autonomous Multi-Model CLI Tool) */}
      {/* ========================================================= */}
      <div className="container-x relative mt-24 border-t border-white/8 pt-24 md:mt-32 md:pt-32 grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal y={18}>
            <p className="eyebrow flex items-center gap-3 text-white/45">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: july.accent, boxShadow: `0 0 10px ${july.accent}` }}
              />
              {july.number} · Spotlight · {july.category}
            </p>
          </Reveal>

          <Reveal y={26} delay={0.05}>
            <h2 className="display-lg mt-6 text-[clamp(2.4rem,7vw,6.5rem)]">{july.name}</h2>
          </Reveal>

          <Reveal y={22} delay={0.1}>
            <p className="mt-3 font-display text-xl font-medium text-white/85">
              {july.tagline}
            </p>
          </Reveal>

          <Reveal y={22} delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark">
              {july.description}
            </p>
          </Reveal>

          {/* 1-Liner PowerShell Command Box */}
          <Reveal y={20} delay={0.2}>
            <div className="mt-7 max-w-xl rounded-2xl border border-cyan-500/35 bg-black/85 p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 font-mono">
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Instant PowerShell 1-Liner Launch
                </span>
                <span className="text-[10px] text-zinc-500">Zero Setup Required</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-mono text-xs text-white">
                <span className="truncate select-all text-cyan-200">
                  irm https://raw.githubusercontent.com/25it038-beep/julyllm/main/july_distribution/installer/start.ps1 | iex
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(
                        "irm https://raw.githubusercontent.com/25it038-beep/julyllm/main/july_distribution/installer/start.ps1 | iex"
                      );
                      setDownloadToast({
                        title: "Command Copied to Clipboard!",
                        message: "Paste into Windows PowerShell to launch July Multi-Model CLI.",
                      });
                      setTimeout(() => setDownloadToast(null), 3500);
                    }
                  }}
                  className="shrink-0 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-bold text-black transition-all hover:bg-cyan-400 active:scale-95"
                >
                  Copy Command
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(
                      "irm https://raw.githubusercontent.com/25it038-beep/julyllm/main/july_distribution/installer/start.ps1 | iex"
                    );
                    setDownloadToast({
                      title: "1-Liner Copied!",
                      message: "Open PowerShell (Win + X) and press Ctrl + V to run.",
                    });
                    setTimeout(() => setDownloadToast(null), 3500);
                  }
                }}
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: july.accent,
                  color: "#000",
                  boxShadow: `0 0 25px -4px ${july.accent}80`,
                }}
              >
                <span>Launch in PowerShell</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <MagneticButton
                href={`/products/${july.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerFullscreenExploreVideo(`/products/${july.id}`);
                }}
                variant="ghost"
                lg
                accent={july.accent}
              >
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>

          {/* Quick Start pill instructions */}
          <Reveal y={18} delay={0.28}>
            <div className="mt-7 inline-flex flex-wrap items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-950/20 px-3.5 py-2 text-xs text-cyan-200/90 backdrop-blur-sm">
              <span className="font-semibold text-cyan-300">Quick Start:</span>
              <span>1. Open PowerShell</span>
              <span className="text-white/30">→</span>
              <span>2. Paste irm Command</span>
              <span className="text-white/30">→</span>
              <span className="font-mono font-semibold text-white">3. Multi-Model Chat in RAM</span>
            </div>
          </Reveal>

          <Reveal y={18} delay={0.32}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
              July LLM + Gravity LLM · Auto-Router · Ephemeral RAM Privacy · Clerk IAM
            </p>
          </Reveal>
        </div>

        <Parallax depth={-40}>
          <JulyLLMPreview className="w-full" />
        </Parallax>
      </div>

      <CollaboratorModal
        isOpen={collabModalOpen}
        onClose={() => setCollabModalOpen(false)}
        productId={activeCollabProduct?.id}
        productName={activeCollabProduct?.name || "Gravity LLM"}
        accent={activeCollabProduct?.accent || gravity.accent}
        downloadApiPath={activeCollabProduct?.downloadUrl || "/api/download/gravity"}
        downloadUrl={
          activeCollabProduct?.id === "domcode-llm"
            ? "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBE8mmADSXtS6polDPwwbUmAXJTbzfIjNdAWDn2Z0to1VM?e=korcxj"
            : activeCollabProduct?.id === "galaxy-vision"
            ? "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBxmNpxxijbRrZxRbr2j7i6AddHgte4YOJ7o-aURM3-nFk?e=v6QdYB"
            : activeCollabProduct?.id === "electron"
            ? "https://1drv.ms/u/c/A4DE4F83095B15B0/IQDY8K9iXhZkQayEL_CMStd_AU2Kq61gd1RgfIles4t9BrE?e=76ltt3"
            : activeCollabProduct?.id === "july-llm"
            ? "https://raw.githubusercontent.com/25it038-beep/julyllm/main/july_distribution/installer/start.ps1"
            : "https://1drv.ms/u/c/A4DE4F83095B15B0/IQDBJNvSemwQRIDCxrLUYtxqAURTChIN5YXmYrolDeUgh1U?e=SKWsrl"
        }
        fileName={
          activeCollabProduct?.id === "domcode-llm"
            ? "DomcodeLLM-Setup.exe"
            : activeCollabProduct?.id === "galaxy-vision"
            ? "Galaxy-Vision-v1.0.0-Standalone.zip"
            : activeCollabProduct?.id === "electron"
            ? "Electron-AI-Standalone-NoOllama.zip"
            : activeCollabProduct?.id === "july-llm"
            ? "start.ps1"
            : "Gravity_LLM_HS_AI_Solutions_Portable.zip"
        }
      />

      <DownloadCompanionModal
        isOpen={Boolean(downloadCompanionProduct)}
        onClose={() => setDownloadCompanionProduct(null)}
        productName={downloadCompanionProduct?.name || "Galaxy Vision"}
        downloadUrl={
          downloadCompanionProduct?.downloadUrl ||
          "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBxmNpxxijbRrZxRbr2j7i6AddHgte4YOJ7o-aURM3-nFk?e=v6QdYB"
        }
        localBackupUrl={
          downloadCompanionProduct?.id === "galaxy-vision"
            ? "/downloads/Galaxy-Vision-v1.0.0-Standalone.zip"
            : undefined
        }
        accent={downloadCompanionProduct?.accent || "#c084fc"}
        fileName={
          downloadCompanionProduct?.id === "galaxy-vision"
            ? "Galaxy-Vision-v1.0.0-Standalone.zip"
            : "Electron-AI-Standalone-NoOllama.zip"
        }
        onOpenCollaboratorModal={() => {
          if (downloadCompanionProduct) {
            handleOpenCollab(downloadCompanionProduct);
          }
        }}
      />

      <Link href="/products/gravity-llm" className="sr-only">
        View Gravity LLM details
      </Link>
      <Link href="/products/domcode-llm" className="sr-only">
        View Domcode LLM details
      </Link>
      <Link href="/products/galaxy-vision" className="sr-only">
        View Galaxy Vision details
      </Link>
      <Link href="/products/electron" className="sr-only">
        View Electron AI details
      </Link>
      <Link href="/products/july-llm" className="sr-only">
        View July LLM details
      </Link>

      {downloadToast && (
        <aside
          aria-label="Download Status"
          className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="rounded-2xl border border-purple-500/30 bg-ink/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full border border-purple-400/40 bg-purple-950/40 px-2.5 py-0.5 text-[11px] font-semibold text-purple-300">
                  {downloadToast.title}
                </span>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/90">
                  {downloadToast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDownloadToast(null)}
                className="rounded-full p-1 text-white/40 hover:text-white"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[11.5px] text-white/50">
                You are on HS AI Solutions
              </span>
              <button
                type="button"
                onClick={() => setDownloadToast(null)}
                className="text-[12px] font-semibold text-purple-400 hover:text-purple-300"
              >
                Return & Continue →
              </button>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
