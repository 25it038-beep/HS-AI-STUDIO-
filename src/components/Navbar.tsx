"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <nav className="max-w-6xl mx-auto glass rounded-2xl px-5 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="HS AI Solutions Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <span className="text-sm font-bold text-white block">
              HS AI Solutions
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Ecosystem
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          <a
            href="#solutions"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            Solutions
          </a>
          <a
            href="#about"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            Contact
          </a>
        </div>

        <a
          href="#solutions"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </a>
      </nav>
    </motion.header>
  );
}