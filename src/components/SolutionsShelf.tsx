"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const SOLUTIONS = [
  {
    title: "AIShield",
    tagline: "AI Cyber Security Platform",
    url: "https://efinal-ok77.vercel.app/",
    description:
      "AI-powered threat detection, content forensics, document analysis, intelligent reporting, and cybersecurity automation.",
    gradient: "from-purple-600 to-pink-500",
    status: "live" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "CareerAI",
    tagline: "AI Career Intelligence",
    url: "https://ledger-1-2ttx.onrender.com/",
    description:
      "Resume analysis, skill gap detection, personalized learning roadmaps, interview preparation, and career growth.",
    gradient: "from-cyan-500 to-blue-600",
    status: "live" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m-9.5 3.346c.634-2.112 2.316-3.815 4.405-4.346m0 0a48.168 48.168 0 013.19 0m-3.19 0A48.3 48.3 0 0112 3.319c.92.6 1.78 1.281 2.563 2.042m-2.563 2.043v3.75" />
      </svg>
    ),
  },
  {
    title: "HS AI Assistant",
    tagline: "AI Powered Chatbot",
    url: "https://hs-chatbot-3.onrender.com/",
    description:
      "Multimodal AI assistant for reasoning, coding, document analysis, file understanding, and intelligent conversations.",
    gradient: "from-emerald-500 to-teal-600",
    status: "live" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: "AI Application Builder",
    tagline: "AI Powered Application Builder",
    url: "",
    description:
      "Build full applications with natural language prompts. Describe it, and the AI assembles, wires, and ships it. Currently in active development.",
    gradient: "from-amber-500 to-orange-600",
    status: "development" as const,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function SolutionsShelf() {
  return (
    <section id="solutions" className="relative z-10 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-zinc-400">
            One Place. Infinite Power.
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="gradient-text">Your AI Shelf</span>
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm">
            All your AI tools in one place. Instantly accessible.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {SOLUTIONS.map((solution, i) => (
            <ShelfItem key={solution.title} solution={solution} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShelfItem({
  solution,
  index,
}: {
  solution: (typeof SOLUTIONS)[0];
  index: number;
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
      card.style.transform = `perspective(1000px) rotateY(${x * 1.5}deg) rotateX(${-y * 1.5}deg)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
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
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={cardRef}
        className="group relative glass rounded-2xl p-7 h-full overflow-hidden cursor-pointer"
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(168,85,247,0.08), rgba(6,182,212,0.08))`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${solution.gradient})`,
              }}
            >
              {solution.icon}
            </div>
            {isDev ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] text-amber-400 uppercase tracking-wider font-medium">
                  In Development
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-medium">
                  Live
                </span>
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-white">{solution.title}</h3>
            <p
              className="text-sm font-medium"
              style={{
                background: `linear-gradient(135deg, ${solution.gradient})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {solution.tagline}
            </p>
          </div>

          <div className="h-px w-full bg-white/10" />

          <p className="text-sm text-zinc-400 leading-relaxed">
            {solution.description}
          </p>

          {isDev ? (
            <a
              href="/downloads/HS CODE_0.1.0_x64-setup.exe"
              download
              className="mt-auto w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-white text-sm font-medium transition-all duration-300 group/btn"
            >
              Download v0.1.0
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          ) : (
            <a
              href={solution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-white text-sm font-medium transition-all duration-300 group/btn"
            >
              Launch Application
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
    </motion.div>
  );
}