"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-5 pointer-events-none"
    >
      <nav className="max-w-6xl mx-auto rounded-3xl px-5 h-16 sm:h-18 flex items-center justify-between bg-[#060812]/90 border border-cyan-500/20 backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] pointer-events-auto relative overflow-hidden">
        {/* Top Laser Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-amber-400 opacity-80" />

        {/* Brand Logo & Interactive Status Badge */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-cyan-400/40 group-hover:ring-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="HS AI Solutions Logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="leading-tight flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                HS AI SOLUTIONS
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/30 text-[9px] font-mono text-cyan-300 font-bold uppercase">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-amber-300/90 font-bold uppercase tracking-[0.22em]">
              Autonomous Ecosystem
            </span>
          </div>
        </a>

        {/* Desktop Navigation Center Pills */}
        <div className="hidden md:flex items-center gap-2 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
          <a
            href="#solutions"
            className="px-4 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-cyan-500/20 rounded-full transition-all duration-200 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Solutions Shelf</span>
          </a>
          <a
            href="#features"
            className="px-4 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-amber-500/20 rounded-full transition-all duration-200 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Interactive HUD</span>
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-purple-500/20 rounded-full transition-all duration-200 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Developer</span>
          </a>
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#solutions"
            className="h-10 inline-flex items-center justify-center px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            <span>Explore Suite</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-2xl bg-white/[0.05] border border-cyan-500/30 flex items-center justify-center text-cyan-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl bg-[#060812]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 md:hidden z-50"
            >
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-zinc-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
              >
                Solutions Shelf
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-zinc-200 hover:bg-amber-500/20 hover:text-amber-300 transition-colors"
              >
                Interactive HUD
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-zinc-200 hover:bg-purple-500/20 hover:text-purple-300 transition-colors"
              >
                Developer
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}