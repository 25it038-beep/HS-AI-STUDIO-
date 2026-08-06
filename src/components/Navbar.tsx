"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none"
    >
      <nav className="max-w-6xl mx-auto rounded-2xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between bg-[#0e0f18]/85 border border-white/[0.1] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] pointer-events-auto relative">
        {/* Brand Logo & Title */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden ring-1 ring-amber-400/40 group-hover:ring-amber-400/80 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="HS AI Solutions Logo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="leading-tight flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight group-hover:text-amber-200 transition-colors">
              HS AI Solutions
            </span>
            <span className="text-[9px] sm:text-[10px] text-amber-300/80 font-bold uppercase tracking-[0.2em]">
              Ecosystem
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.06]">
          <a
            href="#solutions"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-amber-200 hover:bg-white/[0.08] rounded-full transition-all duration-200"
          >
            Solutions
          </a>
          <a
            href="#about"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-amber-200 hover:bg-white/[0.08] rounded-full transition-all duration-200"
          >
            About
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-amber-200 hover:bg-white/[0.08] rounded-full transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#solutions"
            className="h-9 sm:h-10 inline-flex items-center justify-center px-4 sm:px-6 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 text-xs sm:text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            Get Started
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white"
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
              className="absolute top-full left-0 right-0 mt-3 p-4 rounded-2xl bg-[#0e0f18]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 md:hidden z-50"
            >
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-amber-500/10 hover:text-amber-300 transition-colors"
              >
                Solutions
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-amber-500/10 hover:text-amber-300 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-amber-500/10 hover:text-amber-300 transition-colors"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}