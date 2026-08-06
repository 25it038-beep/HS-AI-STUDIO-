"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const SOLUTIONS = [
  {
    title: "AIShield",
    tagline: "Cyber Security Platform",
    url: "https://efinal-ok77.vercel.app/",
    description:
      "AI-powered threat detection, content forensics, document analysis, intelligent reporting, and cybersecurity automation.",
    accentColor: "#a855f7", // Royal Amethyst
    gradient: "from-purple-500 via-indigo-500 to-violet-600",
    badgeBorder: "border-purple-500/30",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-300",
    dotBg: "bg-purple-400",
    status: "live" as const,
    highlights: ["Threat Forensics", "Cyber Automation", "Smart Reports"],
    icon: (
      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "CareerAI",
    tagline: "Career Intelligence Platform",
    url: "https://ledger-1-2ttx.onrender.com/",
    description:
      "Resume analysis, skill gap detection, personalized learning roadmaps, interview preparation, and career growth.",
    accentColor: "#06b6d4", // Royal Cyan / Sapphire
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    badgeBorder: "border-cyan-500/30",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-300",
    dotBg: "bg-cyan-400",
    status: "live" as const,
    highlights: ["Resume Analysis", "Skill Gap Audit", "Personalized Maps"],
    icon: (
      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m-9.5 3.346c.634-2.112 2.316-3.815 4.405-4.346m0 0a48.168 48.168 0 013.19 0m-3.19 0A48.3 48.3 0 0112 3.319c.92.6 1.78 1.281 2.563 2.042m-2.563 2.043v3.75" />
      </svg>
    ),
  },
  {
    title: "HS AI Assistant",
    tagline: "Multimodal AI Chatbot",
    url: "https://hs-chatbot-3.onrender.com/",
    description:
      "Multimodal AI assistant for reasoning, coding, document analysis, file understanding, and intelligent conversations.",
    accentColor: "#10b981", // Royal Emerald / Jade
    gradient: "from-emerald-500 via-teal-500 to-green-600",
    badgeBorder: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-300",
    dotBg: "bg-emerald-400",
    status: "live" as const,
    highlights: ["Vision & Doc Parse", "Full Stack Coding", "Deep Reasoning"],
    icon: (
      <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: "AI Application Builder",
    tagline: "Autonomous App Studio",
    url: "",
    description:
      "Build full applications with natural language prompts. Describe it, and the AI assembles, wires, and ships it.",
    accentColor: "#f59e0b", // Royal Gold / Amber
    gradient: "from-amber-400 via-amber-500 to-orange-600",
    badgeBorder: "border-amber-500/30",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-300",
    dotBg: "bg-amber-400",
    status: "development" as const,
    highlights: ["Prompt-to-Code Engine", "One-Click Executable", "Live Sandbox"],
    icon: (
      <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function SolutionsShelf({ onDownload }: { onDownload?: () => void }) {
  return (
    <section id="solutions" className="relative z-10 py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-200">
              The Flagship Suite
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Curated Intelligence. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-white to-purple-300 bg-clip-text text-transparent">
              Engineered for Perfection.
            </span>
          </h2>

          <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-normal">
            Every tool in the HS AI Ecosystem is custom-crafted to deliver enterprise-grade performance and effortless sophistication.
          </p>
        </motion.div>

        {/* 4-Card Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {SOLUTIONS.map((solution, i) => (
            <ShelfItem key={solution.title} solution={solution} index={i} onDownload={onDownload} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShelfItem({
  solution,
  index,
  onDownload,
}: {
  solution: (typeof SOLUTIONS)[0];
  index: number;
  onDownload?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDev = solution.status === "development";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 3.5}deg) rotateX(${-y * 3.5}deg) translateY(-4px)`;
    };

    const onLeave = () => {
      card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="h-full flex flex-col"
    >
      <div
        ref={cardRef}
        className="group relative rounded-3xl p-7 sm:p-8 h-full flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 bg-gradient-to-b from-[#13141f]/95 via-[#0e0f18]/95 to-[#090a10] border border-white/[0.08] hover:border-amber-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        {/* Top Metallic Accent Line */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${solution.accentColor}, transparent)`,
          }}
        />

        {/* Ambient Radial Hover Lighting */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
          style={{ background: solution.accentColor }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
          {/* Header Line: Icon Box + Status Badge */}
          <div className="flex items-center justify-between gap-3 h-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.02] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-white/25 transition-all duration-300">
              {solution.icon}
            </div>

            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${solution.badgeBg} border ${solution.badgeBorder} shadow-inner`}>
              <span className={`w-1.5 h-1.5 rounded-full ${solution.dotBg} animate-pulse`} />
              <span className={`text-[10px] ${solution.badgeText} uppercase tracking-[0.15em] font-bold`}>
                {isDev ? "In Development" : "Live"}
              </span>
            </div>
          </div>

          {/* Title & Tagline Box (Equal min-height for horizontal alignment) */}
          <div className="min-h-[64px] flex flex-col justify-center gap-1">
            <h3 className="text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
              {solution.title}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {solution.tagline}
            </p>
          </div>

          {/* Hairline Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Description Text Container */}
          <div className="flex-1 flex flex-col justify-between gap-4 py-1">
            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              {solution.description}
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {solution.highlights.map((item) => (
                <span key={item} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] text-zinc-300 font-medium">
                  • {item}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action Container & Windows Setup Note */}
          <div className="mt-auto pt-2 flex flex-col gap-2.5">
            {isDev ? (
              <>
                <a
                  href="/downloads/HS CODE_0.1.0_x64-setup.exe"
                  download
                  onClick={onDownload}
                  className="w-full h-12 inline-flex items-center justify-center gap-2.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-600/20 hover:from-amber-400/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-200 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 group/btn shadow-md"
                >
                  <span>Download v0.1.0</span>
                  <svg
                    className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover/btn:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
                
                {/* Windows SmartScreen Installation Note */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200/90 leading-snug text-left shadow-inner">
                  <span className="font-extrabold text-amber-300">NOTE:</span> After downloading it, if Windows shows &quot;Don&apos;t run&quot;, select <span className="font-bold text-white">&quot;More info&quot;</span> and select <span className="font-bold text-white">&quot;Run anyway&quot;</span>.
                </div>
              </>
            ) : (
              <a
                href={solution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 inline-flex items-center justify-center gap-2.5 px-5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 group/btn shadow-md"
              >
                <span>Launch Application</span>
                <svg
                  className="w-4 h-4 text-zinc-400 group-hover/btn:text-white transition-all duration-300 group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}