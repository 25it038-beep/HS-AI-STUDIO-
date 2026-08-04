"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function CTASection() {
  return (
    <section id="about" className="relative z-10 py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="glass rounded-3xl p-8 sm:p-14 lg:p-16 text-center space-y-8 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 border border-cyan-500/20">
              Transform Your Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="gradient-text">
                Ready to Experience the Future of AI?
              </span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
              Join the growing ecosystem of next-generation AI tools built for developers, cybersecurity experts, and innovators.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 relative z-10">
            <MagneticButton>
              <a
                href="#solutions"
                className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Explore Products</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#solutions"
                className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full glass glass-hover text-white font-semibold text-sm border border-white/10 hover:border-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Launch Dashboard</span>
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const onMouseLeave = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <div ref={ref} className="magnetic-button inline-block" style={{ willChange: "transform" }}>{children}</div>;
}