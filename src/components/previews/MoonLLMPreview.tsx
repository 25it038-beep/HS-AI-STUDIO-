"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PreviewFrame } from "@/components/previews/PreviewFrame";

const accent = "#f59e0b";

export function MoonLLMPreview({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"terminal" | "gateways" | "hardware">("terminal");
  const [screenOff, setScreenOff] = useState(false);

  return (
    <PreviewFrame
      label="MOON LLM · Huawei P20 Lite (Kirin 659) · 24/7 Dedicated Edge Server"
      accent={accent}
      className={className}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#07070a] select-none text-white">
        {/* Ambient Golden Lunar Lighting */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 65% 50% at 50% -10%, ${accent}25, transparent 70%)`,
          }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-20" />

        {/* Outer Phone / Server Container */}
        <div className="relative flex h-full flex-col">
          {/* Top Edge Server Header Bar */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-black/60 px-3 py-2 sm:px-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-xs text-amber-300 font-bold border border-amber-400/30">
                🌕
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] font-bold tracking-wider text-amber-200">
                  MOON-LLM · KIRIN 659
                </span>
                <span className="text-[8.5px] font-mono text-white/45">
                  ANE-LX1 · 4GB RAM · ARM64 NEON
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Battery Hysteresis Guard Badge */}
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/40 px-2.5 py-0.5 font-mono text-[9px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>58% (Guarded 50-60%)</span>
              </div>

              {/* Tap to Toggle Screen Off simulation */}
              <button
                type="button"
                onClick={() => setScreenOff(!screenOff)}
                className="hidden sm:inline-flex rounded border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-white/70 hover:bg-white/10 transition-colors"
                title="Simulate MOON Dark Screen Mode"
              >
                {screenOff ? "Wake Screen" : "Dark Screen (0% GPU)"}
              </button>
            </div>
          </div>

          {/* Simulated Dark Screen Mode Overlay */}
          {screenOff ? (
            <div
              onClick={() => setScreenOff(false)}
              className="flex flex-1 flex-col items-center justify-center bg-black p-6 text-center cursor-pointer transition-colors"
            >
              <span className="text-3xl opacity-40">🌙</span>
              <p className="mt-3 font-mono text-xs text-zinc-500">
                MOON Dark Screen Active · 0% GPU · Backlight 1%
              </p>
              <p className="mt-1 font-mono text-[10px] text-amber-400/80">
                [Tap anywhere to wake dashboard]
              </p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Tab Selector */}
              <div className="flex border-b border-white/[0.06] bg-black/30 px-3 pt-1 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("terminal")}
                  className={`border-b-2 px-3 py-1.5 font-medium transition-colors ${
                    activeTab === "terminal"
                      ? "border-amber-400 text-amber-300 bg-white/[0.03]"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  ⚡ Inference Stream
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("gateways")}
                  className={`border-b-2 px-3 py-1.5 font-medium transition-colors ${
                    activeTab === "gateways"
                      ? "border-amber-400 text-amber-300 bg-white/[0.03]"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  🌐 Global Gateways
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("hardware")}
                  className={`border-b-2 px-3 py-1.5 font-medium transition-colors ${
                    activeTab === "hardware"
                      ? "border-amber-400 text-amber-300 bg-white/[0.03]"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  🏎️ Kirin 659 Specs
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-hidden p-3 sm:p-4">
                {activeTab === "terminal" && (
                  <div className="flex h-full flex-col justify-between font-mono text-[11px] leading-relaxed">
                    <div className="space-y-1.5 text-zinc-300">
                      <div className="flex items-center gap-2 text-white/50 text-[10px]">
                        <span className="text-emerald-400">[BOOT]</span>
                        <span>taskset 0xf0: Cores 4,5,6,7 pinned @ 2.36GHz</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-[10px]">
                        <span className="text-amber-400">[KV_CACHE]</span>
                        <span>q4_0 attention cache allocated (slashed RAM by 75%)</span>
                      </div>
                      <div className="rounded border border-amber-400/20 bg-amber-500/10 p-2 text-amber-100 text-[11px]">
                        <span className="text-amber-400 font-bold">Query:</span> &quot;Explain quantum tunneling in Kirin 659 transistor gates&quot;
                      </div>
                      <div className="text-zinc-200 text-[11px]">
                        <span className="text-emerald-400 font-bold">MOON:</span> At sub-16nm gate dimensions in the HiSilicon Kirin 659, electron wavefunctions penetrate finite potential barriers...
                        <span className="inline-block h-3.5 w-1.5 bg-amber-400 animate-pulse translate-y-0.5 ml-1" />
                      </div>
                    </div>

                    {/* Bottom Status Ticker */}
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-2 text-[10px] text-white/50">
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-semibold">3.05 tok/sec</span>
                        <span>TTFT: 4.4s (Prewarmed)</span>
                        <span>Context: 4,096 / max_tokens: ∞</span>
                      </div>
                      <a
                        href="https://dtjfnm-ip-103-197-113-82.tunnelmole.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 text-amber-300 hover:bg-amber-500/30 transition-colors font-semibold"
                      >
                        1-Click Live Server ↗
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === "gateways" && (
                  <div className="space-y-2.5 font-mono text-[10.5px]">
                    <div className="rounded-lg border border-emerald-400/30 bg-emerald-950/20 p-2.5">
                      <div className="flex items-center justify-between text-emerald-300 font-bold">
                        <span>Direct 1-Click Worldwide Tunnel</span>
                        <span className="text-[9px] rounded bg-emerald-500/20 px-1.5 py-0.5">Zero Prompt</span>
                      </div>
                      <a
                        href="https://dtjfnm-ip-103-197-113-82.tunnelmole.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-white/90 hover:underline truncate"
                      >
                        https://dtjfnm-ip-103-197-113-82.tunnelmole.net
                      </a>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
                      <div className="flex items-center justify-between text-amber-300 font-semibold">
                        <span>Branded Public Gateway</span>
                        <span className="text-[9px] text-white/40">Localtunnel</span>
                      </div>
                      <div className="mt-1 text-white/80 truncate">
                        https://hsserverai.loca.lt
                      </div>
                      <div className="mt-0.5 text-[9px] text-zinc-400">
                        1-Time Verification IP: <code className="text-amber-200">103.197.113.82</code>
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
                      <div className="flex items-center justify-between text-sky-300 font-semibold">
                        <span>Local Wi-Fi Gateway</span>
                        <span className="text-[9px] text-emerald-400 font-bold">2ms Latency</span>
                      </div>
                      <div className="mt-1 text-white/80">
                        http://192.168.0.104:8080
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "hardware" && (
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                    <div className="rounded border border-white/10 bg-white/[0.02] p-2">
                      <span className="text-white/40 block">SoC & CPU:</span>
                      <span className="text-white font-bold">HiSilicon Kirin 659</span>
                      <span className="text-emerald-400 block text-[9px]">4× A53 @ 2.36GHz (Cores 4-7)</span>
                    </div>
                    <div className="rounded border border-white/10 bg-white/[0.02] p-2">
                      <span className="text-white/40 block">Memory & Cache:</span>
                      <span className="text-white font-bold">4GB LPDDR3 RAM</span>
                      <span className="text-amber-300 block text-[9px]">q4_0 Attention Quantization</span>
                    </div>
                    <div className="rounded border border-white/10 bg-white/[0.02] p-2">
                      <span className="text-white/40 block">Battery Guard:</span>
                      <span className="text-emerald-400 font-bold">50%–60% Hysteresis</span>
                      <span className="text-white/60 block text-[9px]">Thermals: 35°C–40°C Safe</span>
                    </div>
                    <div className="rounded border border-white/10 bg-white/[0.02] p-2">
                      <span className="text-white/40 block">Foundation Model:</span>
                      <span className="text-amber-300 font-bold">moon-llm:latest</span>
                      <span className="text-white/60 block text-[9px]">Llama 3.2 1.2B Q8_0 GGUF</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}
