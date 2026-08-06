"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function CTASection() {
  return (
    <section id="about" className="relative z-10 py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-3xl p-8 sm:p-14 lg:p-16 text-center space-y-8 bg-gradient-to-b from-[#13141f] via-[#0e0f18] to-[#090a10] border border-white/[0.1] hover:border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden transition-all duration-500"
        >
          {/* Top Hairline Accent Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
          
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200">
                Next-Gen Ecosystem
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Ready to Experience the <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Future of AI?
              </span>
            </h2>
            
            <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed font-normal">
              Join forward-thinking developers, security researchers, and innovators leveraging the HS AI Solutions ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 relative z-10">
            <MagneticButton>
              <a
                href="#solutions"
                className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Explore Products</span>
                <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#solutions"
                className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-amber-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
              >
                <span>Launch Dashboard</span>
                <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
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

  return (
    <div ref={ref} className="magnetic-button inline-block" style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}