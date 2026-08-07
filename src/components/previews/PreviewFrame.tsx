"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PreviewFrame({
  label,
  url,
  accent,
  children,
  className = "",
  chrome = "dark",
}: {
  label: string;
  url?: string;
  accent: string;
  children: React.ReactNode;
  className?: string;
  chrome?: "dark" | "light";
}) {
  const reduce = useReducedMotion();
  const isLight = chrome === "light";

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden rounded-2xl border shadow-card ${className} ${
        isLight ? "border-ink/10 bg-paper" : "border-white/10 bg-onyx"
      }`}
      style={{ boxShadow: `0 30px 80px -30px ${accent}33` }}
    >
      <div
        className={`flex h-10 items-center gap-3 border-b px-4 ${
          isLight ? "border-ink/10 bg-mist/60" : "border-white/8 bg-sleet/60"
        }`}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div
          className={`mx-auto flex h-5.5 min-w-0 max-w-[70%] items-center gap-1.5 rounded-md px-3 text-[10px] font-mono tracking-wide ${
            isLight ? "bg-ink/5 text-ink/60" : "bg-white/5 text-white/50"
          }`}
        >
          <svg viewBox="0 0 10 10" className="h-2 w-2 shrink-0" aria-hidden="true">
            <path
              d="M5 8.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
              fill={accent}
              opacity="0.7"
            />
          </svg>
          <span className="truncate">{url ?? label}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="hidden text-[9px] font-mono uppercase tracking-widest text-white/40 sm:block">
            Live
          </span>
        </div>
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}