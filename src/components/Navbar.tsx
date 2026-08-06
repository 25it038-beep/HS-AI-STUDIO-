"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Command, Menu, X, Shield, Briefcase, Bot, Cpu, Layers } from "lucide-react";

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 pt-5 pointer-events-none"
    >
      <nav className="max-w-7xl mx-auto rounded-3xl px-5 h-16 sm:h-18 flex items-center justify-between bg-[#070b16]/85 border border-cyan-500/25 backdrop-blur-3xl shadow-[0_0_35px_rgba(0,240,255,0.15)] pointer-events-auto relative overflow-hidden">
        {/* Top Laser Accent */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-amber-400 opacity-90" />

        {/* Left Brand Identity */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-cyan-400/40 group-hover:ring-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] flex-shrink-0">
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
                HS AI OS
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/30 text-[9px] font-mono text-cyan-300 font-bold uppercase">
                v2.4 PRO
              </span>
            </div>
            <span className="text-[10px] text-amber-300/90 font-bold uppercase tracking-[0.22em]">
              Autonomous Ecosystem
            </span>
          </div>
        </a>

        {/* Center Search Bar Trigger (⌘K) */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 text-xs text-zinc-400 hover:text-white transition-all cursor-pointer shadow-inner w-72"
        >
          <Search className="w-4 h-4 text-cyan-400" />
          <span className="flex-1 text-left font-medium">Search tools &amp; OS commands...</span>
          <div className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-zinc-300 font-bold">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>

        {/* Right Nav Pills & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-2xl border border-white/10">
            <a
              href="#solutions"
              className="px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-cyan-500/20 rounded-xl transition-all"
            >
              Solutions
            </a>
            <a
              href="#dashboard"
              className="px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-purple-500/20 rounded-xl transition-all"
            >
              Telemetry
            </a>
            <a
              href="#features"
              className="px-3.5 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-amber-500/20 rounded-xl transition-all"
            >
              Inspector
            </a>
          </div>

          <a
            href="#solutions"
            className="h-10 inline-flex items-center justify-center gap-2 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explore Suite</span>
          </a>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-2xl bg-white/[0.05] border border-cyan-500/30 flex items-center justify-center text-cyan-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl bg-[#070b16]/95 border border-cyan-500/30 backdrop-blur-3xl shadow-2xl flex flex-col gap-2 lg:hidden z-50"
            >
              <button
                onClick={() => {
                  onOpenSearch?.();
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>Search Commands (⌘K)</span>
                </div>
                <Command className="w-4 h-4" />
              </button>

              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-zinc-200 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors flex items-center gap-3"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Solutions Matrix</span>
              </a>
              <a
                href="#dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-zinc-200 hover:bg-purple-500/20 hover:text-purple-300 transition-colors flex items-center gap-3"
              >
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>Live Control Telemetry</span>
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-zinc-200 hover:bg-amber-500/20 hover:text-amber-300 transition-colors flex items-center gap-3"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Interactive Inspector</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}