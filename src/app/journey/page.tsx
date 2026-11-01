"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { DownloadIcon, ArrowUpRight } from "@/components/ui/icons";

export default function JourneyPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"oneliner" | "local">("oneliner");

  const oneLinerCmd = `powershell -ExecutionPolicy Bypass -Command "irm https://hs-ai-studio.vercel.app/api/journey | iex"`;
  const localFileCmd = `powershell -ExecutionPolicy Bypass -File .\\hs-cinematic-journey-v2.ps1`;

  const handleCopy = async (cmd: string, id: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 2500);
    } catch {
      // Fallback if navigator.clipboard is unavailable
      const textArea = document.createElement("textarea");
      textArea.value = cmd;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-ink text-paper pt-24 pb-20 selection:bg-cyan-500 selection:text-ink">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[900px] rounded-full bg-gradient-to-b from-cyan-600/15 via-indigo-600/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-48 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-20 -right-48 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="container-x relative z-10 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-white/50">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-cyan-400">Endless Journey v2</span>
        </div>

        {/* Header */}
        <Reveal>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>TERMINAL CINEMATIC EXPERIENCE</span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">60 FPS TRUE-COLOUR</span>
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Endless Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">v2</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
              A 60 FPS, 24-bit True-Colour procedural terminal animation compiled in-memory via C# and .NET inside Windows PowerShell.
              The living eye opens, the pupil dilates, you dive into the singularity, and explore over 520 procedural world recipes.
            </p>
          </div>
        </Reveal>

        {/* Command Runner Card (Preview Removed) */}
        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/90 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
            {/* Top Bar with Tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-zinc-900/60 px-5 py-3.5 gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 font-mono text-xs text-white/60">
                  powershell — hs-cinematic-journey-v2
                </span>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center rounded-lg border border-white/10 bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("oneliner")}
                  className={`rounded px-3 py-1 text-xs font-mono transition-all ${
                    activeTab === "oneliner"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  🌐 One-Liner (Web)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("local")}
                  className={`rounded px-3 py-1 text-xs font-mono transition-all ${
                    activeTab === "local"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  📁 Local .ps1
                </button>
              </div>
            </div>

            {/* Command Display & One-Click Copy */}
            <div className="p-6 sm:p-8 space-y-6">
              {activeTab === "oneliner" ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      Direct PowerShell One-Liner (Zero Download Needed)
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      Streams directly from /api/journey
                    </span>
                  </div>

                  <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-cyan-500/30 bg-black/80 p-4 transition-all hover:border-cyan-400/60">
                    <div className="overflow-x-auto font-mono text-xs sm:text-sm text-cyan-200 selection:bg-cyan-600 selection:text-white whitespace-pre sm:whitespace-normal py-1">
                      <span className="text-emerald-400 font-bold select-none">&gt;&nbsp;</span>
                      {oneLinerCmd}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(oneLinerCmd, "oneliner")}
                      className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                        copiedCmd === "oneliner"
                          ? "bg-emerald-500 text-black shadow-emerald-500/30"
                          : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/20 active:scale-95"
                      }`}
                    >
                      {copiedCmd === "oneliner" ? (
                        <>
                          <span>✓</span>
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" strokeWidth="2" />
                            <path strokeWidth="2" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                          <span>Copy Command</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      Local File Execution Command
                    </span>
                    <span className="text-[11px] font-mono text-white/40">
                      Run inside directory with hs-cinematic-journey-v2.ps1
                    </span>
                  </div>

                  <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-cyan-500/30 bg-black/80 p-4 transition-all hover:border-cyan-400/60">
                    <div className="overflow-x-auto font-mono text-xs sm:text-sm text-cyan-200 selection:bg-cyan-600 selection:text-white whitespace-pre sm:whitespace-normal py-1">
                      <span className="text-emerald-400 font-bold select-none">&gt;&nbsp;</span>
                      {localFileCmd}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(localFileCmd, "local")}
                      className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                        copiedCmd === "local"
                          ? "bg-emerald-500 text-black shadow-emerald-500/30"
                          : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/20 active:scale-95"
                      }`}
                    >
                      {copiedCmd === "local" ? (
                        <>
                          <span>✓</span>
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" strokeWidth="2" />
                            <path strokeWidth="2" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                          <span>Copy Command</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons: Direct Download + Raw API Stream */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/8">
                <a
                  href="/scripts/hs-cinematic-journey-v2.ps1"
                  download="hs-cinematic-journey-v2.ps1"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-mono font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Download hs-cinematic-journey-v2.ps1</span>
                </a>

                <a
                  href="/api/journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  <span>View Raw Endpoint</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <span className="text-xs font-mono text-white/40 ml-auto">
                  Press any key inside the terminal to exit smoothly.
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Quick Instructions & Architecture Specs */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              01 · The Living Eye
            </div>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              Blinking procedural eyelids, animated iris fibers, dynamic pupil dilation, and glowing specular reflection in pure ANSI.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              02 · 520 World Recipes
            </div>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              13 patterns × 8 space-warps × 5 colour looks × overlays. No recipe repeats until all 520 combinations have been generated.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              03 · Special Universes
            </div>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              Every 5th dive unlocks a cosmic realm: Ringed Saturn, Spiral Galaxy, Electric Storm, Cyber City, Burning Star, or Alien Sunset.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              04 · In-Memory .NET CLR
            </div>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              Zero package installs, zero temp files. Compiles C# dynamically inside the PowerShell session with 60 FPS direct VT stream.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 font-mono text-xs text-white/80 transition-all hover:border-white/35 hover:bg-white/10 hover:text-white"
          >
            <span>← Back to HS AI Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
