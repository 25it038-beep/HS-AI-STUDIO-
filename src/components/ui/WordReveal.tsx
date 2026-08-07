"use client";

import { motion, useReducedMotion } from "framer-motion";

const splitWords = (text: string) => text.split(/(\s+)/);

export function WordReveal({
  text,
  className,
  stagger = 0.035,
  delay = 0,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = splitWords(text);

  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, i) =>
        word === " " ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: "115%" }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: "0%" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.7,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        )
      )}
    </span>
  );
}