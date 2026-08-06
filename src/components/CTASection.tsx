"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

export default function CTASection() {
  return (
    <section id="about" className="relative z-10 py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="os-card p-8 sm:p-14 lg:p-16 text-center space-y-8 relative overflow-hidden"
        >
          {/* Top Hairline Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400" />
          
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                ENTERPRISE READY
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Ready to Deploy Next-Gen <br className="hidden sm:inline" />
              <span className="hero-gradient-text">
                Autonomous AI Systems?
              </span>
            </h2>
            
            <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed font-normal">
              Join forward-thinking engineers, researchers, and innovators building with the HS AI Operating System ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 relative z-10">
            <a
              href="#solutions"
              className="h-14 px-9 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest inline-flex items-center gap-3 shadow-[0_0_35px_rgba(0,240,255,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <Layers className="w-4 h-4 text-zinc-950" />
              <span>Explore Product Matrix</span>
            </a>

            <a
              href="#dashboard"
              className="h-14 px-8 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs uppercase tracking-widest border border-white/15 hover:border-cyan-400/50 inline-flex items-center gap-2 transition-all shadow-lg"
            >
              <span>View Control Telemetry</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}