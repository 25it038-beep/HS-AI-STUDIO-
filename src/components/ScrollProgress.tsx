"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[90] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #8b5cf6, #22d3ee, #34d399)",
        boxShadow: "0 0 12px rgba(139,92,246,0.6)",
      }}
      aria-hidden
    />
  );
}
