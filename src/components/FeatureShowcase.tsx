"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURE_TABS = [
  {
    id: "aishield",
    name: "AIShield",
    subtitle: "AI Cybersecurity & Forensics",
    badge: "Live Protection",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    gradient: "from-purple-500 to-pink-500",
    description: "Enterprise-grade threat intelligence, document forensic analysis, and automated incident reporting powered by neural models.",
    url: "https://efinal-ok77.vercel.app/",
    stats: [
      { label: "Threat Detection Speed", value: "< 50ms" },
      { label: "Accuracy Rate", value: "99.8%" },
      { label: "Forensic Engine", value: "Neural v4" },
    ],
    features: [
      "Real-time packet & file anomaly detection",
      "Automated cybersecurity compliance reporting",
      "Intelligent document & content forensics",
      "Zero-day exploit pattern recognition",
    ],
  },
  {
    id: "careerai",
    name: "CareerAI",
    subtitle: "Career Intelligence Engine",
    badge: "Live Platform",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    gradient: "from-cyan-500 to-blue-600",
    description: "Deep resume analytics, automated skill gap mapping, personalized learning roadmaps, and mock interview coaching.",
    url: "https://ledger-1-2ttx.onrender.com/",
    stats: [
      { label: "Skill Match Index", value: "Real-time" },
      { label: "Roadmap Accuracy", value: "Personalized" },
      { label: "Resume Parse Speed", value: "Instant" },
    ],
    features: [
      "ATS resume optimization & scoring",
      "Skill gap detection against market demand",
      "Custom learning pathway generation",
      "Interactive AI interview simulation",
    ],
  },
  {
    id: "assistant",
    name: "HS AI Assistant",
    subtitle: "Multimodal Chatbot & Code AI",
    badge: "Live Ecosystem",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    gradient: "from-emerald-500 to-teal-600",
    description: "High-level reasoning assistant capable of deep code synthesis, multi-file understanding, and complex problem solving.",
    url: "https://hs-chatbot-3.onrender.com/",
    stats: [
      { label: "Context Window", value: "Multi-Modal" },
      { label: "Code Generation", value: "Full Stack" },
      { label: "Response Latency", value: "Ultra Low" },
    ],
    features: [
      "Multi-modal vision & document parsing",
      "Full-stack code generation & debugging",
      "Deep logical reasoning & multi-step planning",
      "Custom system persona configuration",
    ],
  },
  {
    id: "builder",
    name: "AI Application Builder",
    subtitle: "Autonomous App Studio",
    badge: "Active Dev (v0.1.0)",
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    gradient: "from-amber-400 to-orange-600",
    description: "Describe any software application in natural language, and the autonomous AI architecture engine wires, compiles, and ships it.",
    url: "/downloads/HS CODE_0.1.0_x64-setup.exe",
    isDownload: true,
    stats: [
      { label: "Generation Mode", value: "Prompt to Code" },
      { label: "Build Output", value: "Native Windows App" },
      { label: "Development Status", value: "v0.1.0 Released" },
    ],
    features: [
      "Natural language app specification parser",
      "Automatic component wiring & state management",
      "One-click executable compilation",
      "Integrated live sandbox preview",
    ],
  },
];

export default function FeatureShowcase({ onDownload }: { onDownload?: () => void }) {
  const [activeTabId, setActiveTabId] = useState("aishield");
  const activeTab = FEATURE_TABS.find((t) => t.id === activeTabId) || FEATURE_TABS[0];

  return (
    <section className="relative z-10 py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-b border-white/[0.06] bg-[#07080d]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200">
              Interactive Suite Deep-Dive
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Select a Tool to <span className="gradient-text">Inspect Capabilities</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Click through the flagship applications below to explore real-time performance metrics and key features.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-3xl bg-[#0e0f18] border border-white/10 max-w-4xl mx-auto shadow-xl">
          {FEATURE_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-zinc-950 shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tool Interactive Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-3xl bg-gradient-to-b from-[#12131e] via-[#0d0e17] to-[#08090e] border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden grid lg:grid-cols-2 gap-10 items-center"
          >
            {/* Top Accent Glow */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            {/* Left Info Column */}
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold ${activeTab.badgeColor} border`}>
                  {activeTab.badge}
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {activeTab.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-300">
                  {activeTab.subtitle}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal pt-2">
                  {activeTab.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Key Capabilities</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeTab.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                {activeTab.isDownload ? (
                  <div className="flex flex-col gap-3 w-full sm:w-auto">
                    <a
                      href={activeTab.url}
                      download
                      onClick={onDownload}
                      className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all"
                    >
                      <span>Download HS CODE (v0.1.0)</span>
                      <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </a>
                    <p className="text-[11px] text-amber-200/90 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl leading-snug">
                      <span className="font-bold text-amber-300">NOTE:</span> If Windows shows &quot;Don&apos;t run&quot;, select <span className="font-bold text-white">&quot;More info&quot;</span> &amp; <span className="font-bold text-white">&quot;Run anyway&quot;</span>.
                    </p>
                  </div>
                ) : (
                  <a
                    href={activeTab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all"
                  >
                    <span>Launch {activeTab.name}</span>
                    <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Right Stats & HUD Preview Box */}
            <div className="bg-[#090a10] rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-inner relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  HUD STATS DIAGNOSTIC
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeTab.stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <span className="text-xs text-zinc-400 font-medium block">{stat.label}</span>
                    <span className="text-lg font-bold text-amber-300 block">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>[STATUS OK] {activeTab.name} Core initialized.</span>
                </div>
                <p className="text-zinc-500 leading-relaxed">
                  &gt; Architecture: Multi-tenant neural runtime
                  <br />
                  &gt; Security Protocol: TLS 1.3 + Encrypted Storage
                  <br />
                  &gt; Ecosystem Status: 100% Operational
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
