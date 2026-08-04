"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none"
    >
      <nav className="max-w-6xl mx-auto rounded-2xl px-4 sm:px-6 h-14 flex items-center justify-between bg-[#0e0f18]/80 border border-white/[0.1] backdrop-blur-xl shadow-2xl pointer-events-auto">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden ring-1 ring-amber-400/30 group-hover:ring-amber-400/80 transition-all flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="HS AI Solutions Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
              HS AI Solutions
            </span>
            <span className="text-[9px] sm:text-[10px] text-amber-300/80 font-bold uppercase tracking-[0.2em]">
              Ecosystem
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          <a
            href="#solutions"
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-200 hover:bg-white/[0.06] rounded-full transition-all"
          >
            Solutions
          </a>
          <a
            href="#about"
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-200 hover:bg-white/[0.06] rounded-full transition-all"
          >
            About
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-amber-200 hover:bg-white/[0.06] rounded-full transition-all"
          >
            Contact
          </a>
        </div>

        <a
          href="#solutions"
          className="h-9 inline-flex items-center justify-center px-4 sm:px-5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
        >
          Get Started
        </a>
      </nav>
    </motion.header>
  );
}