"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { MoonLLMPreview } from "@/components/previews/MoonLLMPreview";
import { ArrowUpRight } from "@/components/ui/icons";
import { triggerFullscreenExploreVideo } from "@/components/fullscreen-explore-video";

const PILLARS = [
  {
    icon: "🌐",
    title: "Worldwide Remote Gateways",
    desc: "Zero-port-forwarding tunneling via Tunnelmole & Localtunnel, paired with instant dynamic pairing QR codes on the smartphone display.",
  },
  {
    icon: "🏎️",
    title: "Kirin 659 Core Pinning (0xf0)",
    desc: "Locks inference worker threads to Cores 4-7 (2.36 GHz big cluster) and pairs with 4-bit quantized attention caching (q4_0) for ~3.05 tok/s.",
  },
  {
    icon: "🧠",
    title: "4,096-Token Expanded Context",
    desc: "Unbounded completion (max_tokens: -1) with rolling conversation history keeping prompt evaluation latency under 1.5 seconds.",
  },
  {
    icon: "🛡️",
    title: "Dual-Threshold Battery Guard",
    desc: "50%–60% charge hysteresis protects physical lithium cells during continuous 24/7 plugged operation, with live 35°C–40°C thermal monitoring.",
  },
  {
    icon: "🌙",
    title: "MOON Dark Screen (0% GPU)",
    desc: "Dims LCD backlight to 1% and halts canvas animation loops for zero GPU load and rapid tap-to-wake responsiveness.",
  },
  {
    icon: "💬",
    title: "Mobile-First Group Chat & Vault",
    desc: "Full-width responsive timeline with auto-closing drawers and zero-RAM streaming storage written straight to internal flash.",
  },
];

export function Experiments() {
  return (
    <section id="experiments" className="relative overflow-hidden bg-[#09090d] py-28 md:py-36 text-white border-t border-white/[0.06]">
      {/* Ambient Lunar Lighting */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[560px] w-[640px] rounded-full blur-[160px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(245,158,11,0.35), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[560px] w-[640px] rounded-full blur-[160px] opacity-15"
        style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.25), transparent)" }}
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-25" />

      <div className="container-x relative">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <p className="eyebrow text-amber-400">Hardware Lab & Experiments</p>
              </div>
              <h2 className="display-xl mt-4 text-[clamp(2.2rem,5.5vw,4.8rem)]">
                Physical Edge AI: MOON LLM
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-base leading-relaxed text-white/60">
              Beyond pure software, HS AI Solutions pioneers embedded hardware experiments — converting a physical Huawei P20 Lite smartphone into a 24/7 dedicated, screen-off, headless edge AI server.
            </p>
          </Reveal>
        </div>

        {/* Hero Spotlight Grid */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: Technical Story & Gateways */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-mono text-amber-300">
                <span>🌕 EMBEDDED MOBILE INTELLIGENCE</span>
                <span className="text-white/40">·</span>
                <span>KIRIN 659 SILICON</span>
              </div>

              <h3 className="display-lg mt-4 text-3xl sm:text-4xl">
                Zero Cloud Reliance. Real Silicon. 24/7 Always-On.
              </h3>

              <p className="mt-4 text-[15px] leading-relaxed text-muted-dark">
                MOON LLM transforms an unrooted Huawei P20 Lite (HiSilicon Kirin 659 octa-core, 4GB RAM) into an enterprise-grade private communication hub. By locking ARM64 NEON threads to high-performance cores and quantizing the KV cache to 4-bit, it achieves ~3.05 tok/s with zero cloud subscriptions.
              </p>
            </Reveal>

            {/* Quick Live Access Cards */}
            <div className="mt-8 space-y-3 font-mono text-xs">
              {/* Direct 1-Click Gateway */}
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/20 p-4 transition-all hover:border-emerald-400/60">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-300 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Direct 1-Click Worldwide Gateway (Zero Prompts)
                  </span>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                    Live
                  </span>
                </div>
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <a
                    href="https://dtjfnm-ip-103-197-113-82.tunnelmole.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:underline truncate text-[13px]"
                  >
                    https://dtjfnm-ip-103-197-113-82.tunnelmole.net
                  </a>
                  <a
                    href="https://dtjfnm-ip-103-197-113-82.tunnelmole.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-1.5 text-[12px] font-bold text-black hover:bg-emerald-300 transition-colors shrink-0"
                  >
                    Launch Live Server <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Branded & Local Wi-Fi Info */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-amber-300/80 block font-semibold">
                    Branded Localtunnel
                  </span>
                  <a
                    href="https://hsserverai.loca.lt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-white/90 hover:underline truncate"
                  >
                    https://hsserverai.loca.lt
                  </a>
                  <span className="mt-1 block text-[10px] text-white/45">
                    1-Time IP: <code className="text-amber-200">103.197.113.82</code>
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-sky-300/80 block font-semibold">
                    Local Wi-Fi (Sub-2ms)
                  </span>
                  <span className="mt-1 block text-white/90 font-medium">
                    http://192.168.0.104:8080
                  </span>
                  <span className="mt-1 block text-[10px] text-white/45">
                    Kirin big cluster @ 2.36 GHz
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products/moon-llm"
                onClick={(e) => {
                  e.preventDefault();
                  triggerFullscreenExploreVideo("/products/moon-llm");
                }}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-6 text-sm font-semibold text-amber-200 hover:bg-amber-500/20 transition-colors"
              >
                <span>View Full Specifications & APK Specs</span>
                <span className="text-amber-400">→</span>
              </Link>
            </div>
          </div>

          {/* Right: Live Telemetry Preview Component */}
          <div>
            <Reveal delay={0.2}>
              <div className="relative">
                <MoonLLMPreview />
                <div className="mt-3 flex items-center justify-between text-xs text-white/40 font-mono px-2">
                  <span>Deliverable: MoonServer-HS-AI-Solutions.apk (58.69 MB)</span>
                  <span className="text-amber-400/80">EMUI 9 Unrooted Compatible</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="mt-20">
          <Reveal>
            <p className="eyebrow text-white/45">Architecture Breakdown</p>
            <h3 className="display-lg mt-3 text-2xl sm:text-3xl">
              Engineered for 24/7 Unattended Reliability
            </h3>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-amber-400/30 hover:bg-white/[0.04]"
              >
                <span className="text-2xl">{p.icon}</span>
                <h4 className="mt-3 text-base font-semibold text-white group-hover:text-amber-200 transition-colors">
                  {p.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
