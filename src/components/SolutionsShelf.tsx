"use client";

import { motion } from "framer-motion";
import { Shield, Briefcase, Bot, Cpu, ExternalLink, Download, CheckCircle2 } from "lucide-react";

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
    icon: <Shield className="w-6 h-6 text-purple-300" />,
  },
  {
    id: "careerai",
    title: "CareerAI",
    tagline: "Career Intelligence Engine",
    url: "https://ledger-1-2ttx.onrender.com/",
    description:
      "ATS resume analytics, skill gap audit, personalized learning roadmaps, and interview coaching.",
    neonColor: "#00f0ff",
    glowClass: "shadow-[0_0_25px_rgba(0,240,255,0.15)] hover:border-cyan-400/60",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    btnClass: "bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 text-white shadow-cyan-900/40",
    status: "live" as const,
    features: ["ATS Score Optimization", "Skill Gap Auditor", "Personalized Learning Paths"],
    icon: <Briefcase className="w-6 h-6 text-cyan-300" />,
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
    icon: <Bot className="w-6 h-6 text-emerald-300" />,
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
    icon: <Cpu className="w-6 h-6 text-amber-300" />,
  },
];

export default function SolutionsShelf({ onDownload }: { onDownload?: () => void }) {
  return (
    <section id="solutions" className="relative z-10 py-20 md:py-28 px-4 sm:px-6 lg:px-8 os-dots">
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
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
              FLAGSHIP SOLUTIONS MATRIX
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Autonomous Enterprise <br />
            <span className="cyan-purple-text">AI Product Suite</span>
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Every product is custom-crafted to deliver enterprise-grade performance and effortless sophistication.
          </p>
        </motion.div>

        {/* 4 Glass Bento Cards Grid */}
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
      <div className={`os-card p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden group ${solution.glowClass}`}>
        
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
              {isDev ? "In Dev (v0.1.0)" : "Live Portal"}
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
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: solution.neonColor }} />
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
                  <Download className="w-3.5 h-3.5" />
                  <span>Download v0.1.0</span>
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
                <span>Launch Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}