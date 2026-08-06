"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Briefcase, Bot, Cpu, CheckCircle2, ArrowRight, Download, Terminal } from "lucide-react";

const FEATURE_TABS = [
  {
    id: "aishield",
    name: "AIShield",
    subtitle: "AI Cybersecurity & Forensics",
    badge: "Live Protection",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    description: "Enterprise-grade threat intelligence, document forensic analysis, and automated incident reporting powered by neural models.",
    url: "https://efinal-ok77.vercel.app/",
    stats: [
      { label: "Threat Detection Latency", value: "< 10ms" },
      { label: "Accuracy Rate", value: "99.9%" },
      { label: "Forensic Core", value: "Neural v4" },
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
    name: "AI App Builder",
    subtitle: "Autonomous App Studio",
    badge: "Active Dev (v0.1.0)",
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    description: "Describe any software application in natural language, and the autonomous AI architecture engine wires, compiles, and ships it.",
    url: "/downloads/HS CODE_0.1.0_x64-setup.exe",
    isDownload: true,
    stats: [
      { label: "Generation Mode", value: "Prompt to Code" },
      { label: "Build Output", value: "Native Executable" },
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
    <section id="features" className="relative z-10 py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-b border-white/[0.06] bg-[#03050c]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
              CAPABILITY INSPECTOR
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Inspect Architecture <span className="hero-gradient-text">&amp; Diagnostic Specs</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Click through the flagship product suites below to inspect deep telemetry and technical specifications.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-3xl bg-[#090d1a] border border-cyan-500/20 max-w-4xl mx-auto shadow-xl">
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
                    layoutId="activeFeaturePill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400"
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
            className="os-card p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden grid lg:grid-cols-2 gap-10 items-center"
          >
            {/* Top Accent Glow */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

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
                <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Key Technical Capabilities</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeTab.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
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
                      className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download HS CODE (v0.1.0)</span>
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
                    className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all"
                  >
                    <span>Launch {activeTab.name} Portal</span>
                    <ArrowRight className="w-4 h-4 text-zinc-950" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Stats & HUD Preview Box */}
            <div className="bg-[#060914] rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-inner relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>DIAGNOSTIC HUD</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeTab.stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <span className="text-xs text-zinc-400 font-medium block">{stat.label}</span>
                    <span className="text-base font-bold text-amber-300 block">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>[STATUS OK] {activeTab.name} Core Active.</span>
                </div>
                <p className="text-zinc-500 leading-relaxed text-[11px]">
                  &gt; Neural Runtime: Encrypted Microservice
                  <br />
                  &gt; Security Shield: Active TLS 1.3
                  <br />
                  &gt; Status: 100% Operational
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
