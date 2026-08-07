"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/icons";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/8 bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <Link
            href="#home"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-paper text-[11px] font-bold tracking-tight text-ink">
              <span className="absolute -inset-1 -translate-x-6 bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-100" />
              HS
            </span>
            <span className="font-display text-[14px] font-semibold tracking-[0.14em]">
              HS AI Solutions
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[13px] font-medium text-white/55 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#projects"
              className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[12.5px] font-medium text-white/85 transition-all hover:border-white/40 hover:bg-white/5 md:inline-flex"
            >
              Explore
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`h-px w-4 bg-white transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-white transition-all duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-grid-dark absolute inset-0 opacity-40" />
            <nav className="container-x relative mt-24 flex flex-1 flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/8 py-5"
                  >
                    <span className="text-[10px] font-mono text-white/30">
                      0{i + 1}
                    </span>
                    <span className="display-lg text-4xl text-white transition-colors hover:text-lumina">
                      {l.label}
                    </span>
                  </a>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="container-x pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#projects"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink"
              >
                Explore the ecosystem <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}