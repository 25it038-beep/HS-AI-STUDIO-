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
      <nav className="max-w-6xl mx-auto glass rounded-2xl px-4 sm:px-6 h-14 flex items-center justify-between border border-white/10 backdrop-blur-xl shadow-xl pointer-events-auto">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden ring-1 ring-white/20 group-hover:ring-purple-500/50 transition-all flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="HS AI Solutions Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
              HS AI Solutions
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">
              Ecosystem
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          <a
            href="#solutions"
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Solutions
          </a>
          <a
            href="#about"
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            About
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            Contact
          </a>
        </div>

        <a
          href="#solutions"
          className="h-9 inline-flex items-center justify-center px-4 sm:px-5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
        >
          Get Started
        </a>
      </nav>
    </motion.header>
  );
}