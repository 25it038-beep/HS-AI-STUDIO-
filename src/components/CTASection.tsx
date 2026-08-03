"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function CTASection() {
  return (
    <section id="about" className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="glass rounded-3xl p-12 sm:p-16 lg:p-20 text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="gradient-text">
                Ready to Experience the Future of AI?
              </span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto">
              Join thousands of users already leveraging the HS AI Solutions ecosystem
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Explore Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass glass-hover text-white font-medium text-sm transition-all duration-300"
              >
                Launch Dashboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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