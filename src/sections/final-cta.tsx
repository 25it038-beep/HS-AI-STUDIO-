"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "@/components/ui/icons";

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-36 md:py-48">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(245,166,35,0.1), rgba(139,124,246,0.08), rgba(34,211,238,0.06), transparent)",
        }}
      />
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-4xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
          animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="container-x relative flex flex-col items-center text-center">
        <motion.p
          className="eyebrow text-white/45"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The door is open
        </motion.p>

        <motion.h2
          className="display-xl mt-8 max-w-5xl text-[clamp(2.8rem,8vw,6.5rem)]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Explore What AI
          <br />
          Can Become.
        </motion.h2>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Four applications. Four different problems. One continuous experiment in building useful
          intelligence.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <MagneticButton href="/products/lumina" lg>
            Explore the Ecosystem
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#projects" variant="ghost" lg>
            View All Projects
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/45"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <a
            href="mailto:harshanseliyan28@gmail.com"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            harshanseliyan28@gmail.com
          </a>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <a
            href="https://www.linkedin.com/in/harshan-seliyan-b-s-5339b4282"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}