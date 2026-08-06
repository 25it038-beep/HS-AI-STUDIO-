"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { EASE } from "@/lib/motion";

const LINKS = [
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : 0.15 }}
      className="fixed top-0 inset-x-0 z-[80] px-4 pt-4"
    >
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]" : "glass"
        }`}
        aria-label="Main navigation"
      >
        <a href="#" className="flex items-center gap-3 group" aria-label="HS AI Solutions home">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">
              HS AI Solutions
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Ecosystem
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#solutions" className="btn-primary sheen hidden sm:inline-flex !py-2.5 !px-5">
            <Rocket className="w-4 h-4" />
            Get Started
          </a>
          <button
            className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-zinc-300"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="md:hidden max-w-6xl mx-auto mt-2 glass-strong rounded-2xl p-3 flex flex-col"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3, ease: EASE }}
                className="px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#solutions"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              <Rocket className="w-4 h-4" />
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
