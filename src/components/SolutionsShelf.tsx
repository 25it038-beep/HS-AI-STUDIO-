"use client";

import { motion } from "framer-motion";

const SOLUTIONS = [
  {
    id: "aishield",
    title: "AIShield",
    tagline: "Cyber Threat Intelligence",
    url: "https://efinal-ok77.vercel.app/",
    description:
      "AI threat detection, content forensics, document analysis, and automated cybersecurity reporting.",
    neonColor: "#a855f7",
    glowClass: "shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:border-purple-400/60",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    btnClass: "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-purple-900/40",
    status: "live" as const,
    features: ["Real-Time Packet Forensics", "Auto Incident Reporting", "Document Content Scanner"],
    icon: (
      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "careerai",
    title: "CareerAI",
    tagline: "Career Intelligence Engine",
    url: "https://ledger-1-2ttx.onrender.com/",
    description:
      "ATS resume analytics, skill gap audit, personalized learning roadmaps, and interview coaching.",
    neonColor: "#06b6d4",
    glowClass: "shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-400/60",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    btnClass: "bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 text-white shadow-cyan-900/40",
    status: "live" as const,
    features: ["ATS Score Optimization", "Skill Gap Auditor", "Personalized Learning Paths"],
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m-9.5 3.346c.634-2.112 2.316-3.815 4.405-4.346m0 0a48.168 48.168 0 013.19 0m-3.19 0A48.3 48.3 0 0112 3.319c.92.6 1.78 1.281 2.563 2.042m-2.563 2.043v3.75" />
      </svg>
    ),
  },
  {
    id: "assistant",
    title: "HS AI Assistant",
    tagline: "Multimodal Chatbot & Code AI",
    url: "https://hs-chatbot-3.onrender.com/",
    description:
      "Multimodal AI for complex reasoning, full-stack code synthesis, document parsing, and file understanding.",
    neonColor: "#10b981",
    glowClass: "shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-400/60",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    btnClass: "bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-emerald-900/40",
    status: "live" as const,
    features: ["Multi-Modal File Parsing", "Full-Stack Code Synthesis", "Deep Logical Reasoning"],
    icon: (
      <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    id: "builder",
    title: "AI App Builder",
    tagline: "Autonomous App Studio",
    url: "",
    description:
      "Natural language app specification engine. Describe your vision, and the AI compiles native software.",
    neonColor: "#f59e0b",
    glowClass: "shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:border-amber-400/60",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    btnClass: "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-zinc-950 font-extrabold shadow-amber-900/40",
    status: "development" as const,
    features: ["Prompt-to-Executable", "One-Click Compiler", "Native Desktop Build"],
    icon: (
      <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function SolutionsShelf({ onDownload }: { onDownload?: () => void }) {
  return (
    <section id="solutions" className="relative z-10 py-20 md:py-28 px-4 sm:px-6 lg:px-8 cyber-dots">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
              SOLUTIONS MATRIX V2.0
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Flagship Autonomous <br />
            <span className="cyan-gold-text">Product Suite</span>
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Click any application below to launch directly or download the executable.
          </p>
        </motion.div>

        {/* Clean 4 Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SOLUTIONS.map((solution, i) => (
            <BentoItem key={solution.id} solution={solution} index={i} onDownload={onDownload} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoItem({
  solution,
  index,
  onDownload,
}: {
  solution: (typeof SOLUTIONS)[0];
  index: number;
  onDownload?: () => void;
}) {
  const isDev = solution.status === "development";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="h-full flex flex-col"
    >
      <div className={`bento-card p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden group ${solution.glowClass}`}>
        
        {/* Top Laser Accent */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ background: solution.neonColor }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between gap-5">
          {/* Top Line: Icon Box + Status Pill */}
          <div className="flex items-center justify-between gap-2 h-11">
            <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
              {solution.icon}
            </div>

            <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${solution.badgeBg}`}>
              {isDev ? "In Dev (v0.1.0)" : "Live App"}
            </div>
          </div>

          {/* Title & Tagline Box */}
          <div className="min-h-[52px] flex flex-col justify-center gap-0.5">
            <h3 className="text-xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
              {solution.title}
            </h3>
            <p className="text-[10px] font-mono font-semibold uppercase text-zinc-400 tracking-wider">
              {solution.tagline}
            </p>
          </div>

          <div className="h-px w-full bg-white/10" />

          {/* Description */}
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            {solution.description}
          </p>

          {/* Capability Highlights Checklist */}
          <div className="space-y-1.5 pt-1">
            {solution.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-[10px] text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: solution.neonColor }} />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* Action Button & Windows Notice */}
          <div className="mt-auto pt-3 flex flex-col gap-2">
            {isDev ? (
              <>
                <a
                  href="/downloads/HS CODE_0.1.0_x64-setup.exe"
                  download
                  onClick={onDownload}
                  className={`w-full h-11 inline-flex items-center justify-center gap-2 px-4 rounded-xl ${solution.btnClass} text-[11px] uppercase tracking-wider font-extrabold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all`}
                >
                  <span>Download v0.1.0</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-200/90 leading-tight text-left shadow-inner">
                  <span className="font-extrabold text-amber-300">NOTE:</span> If Windows shows &quot;Don&apos;t run&quot;, select <span className="font-bold text-white">&quot;More info&quot;</span> &amp; <span className="font-bold text-white">&quot;Run anyway&quot;</span>.
                </div>
              </>
            ) : (
              <a
                href={solution.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full h-11 inline-flex items-center justify-center gap-2 px-4 rounded-xl ${solution.btnClass} text-[11px] uppercase tracking-wider font-extrabold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                <span>Launch {solution.title}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}