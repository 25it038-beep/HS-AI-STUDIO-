"use client";

import { motion } from "framer-motion";
import { Download, Cpu, Wrench, Zap } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { DOWNLOAD_URL } from "@/lib/data";

const CHIPS = [
  { icon: Cpu, label: "Windows x64" },
  { icon: Zap, label: "v0.1.0" },
  { icon: Wrench, label: "Active Development" },
];

export default function DownloadBand() {
  return (
    <section id="download" className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative glass-card gradient-ring overflow-hidden rounded-[2rem] px-8 py-12 sm:px-14 sm:py-14"
        >
          {/* Ambient glows */}
          <div
            aria-hidden
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.14),transparent_65%)] blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_65%)] blur-2xl"
          />

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-5">
              <motion.span variants={fadeUp} className="section-kicker">
                <span className="kicker-dot" />
                HS CODE · AI Application Builder
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl"
              >
                <span className="text-white">Build apps with</span>{" "}
                <span className="text-gradient">plain language.</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="text-zinc-400 max-w-xl text-sm sm:text-base leading-relaxed">
                Early access installer for Windows. Describe the application —
                HS CODE assembles, wires, and ships it. Now in active
                development and improving every week.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
                {CHIPS.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <span
                      key={chip.label}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 glass"
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-300" />
                      {chip.label}
                    </span>
                  );
                })}
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="flex flex-col items-stretch gap-4 lg:items-end">
              <a
                href={DOWNLOAD_URL}
                download
                className="btn-primary sheen !px-9 !py-4 !text-base"
              >
                <Download className="w-5 h-5" />
                Download Installer
              </a>
              <p className="text-xs text-zinc-600 lg:text-right">
                ~4.5 MB · Windows 10/11 · Free early access
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
