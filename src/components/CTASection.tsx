"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export default function CTASection() {
  return (
    <section id="about" className="relative z-10 py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-8"
        >
          <motion.span variants={fadeUp} className="section-kicker">
            <span className="kicker-dot" />
            Ready when you are
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.08]"
          >
            <span className="text-white">Ready to experience the</span>
            <br />
            <span className="text-gradient">future of AI?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base">
            Explore the ecosystem or grab the builder — every solution is one
            click away.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <a href="#solutions" className="btn-primary sheen group">
              Explore Products
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#download" className="btn-ghost">
              <Cpu className="w-4 h-4 text-purple-300" />
              Launch Dashboard
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
