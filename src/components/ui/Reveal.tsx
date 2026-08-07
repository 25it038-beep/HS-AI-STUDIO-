"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  once?: boolean;
  className?: string;
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  blur = false,
  once = true,
  className,
  duration = 0.9,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: reduce ? 0 : y,
        x: reduce ? 0 : x,
        filter: blur && !reduce ? "blur(10px)" : "none",
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "none" }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}