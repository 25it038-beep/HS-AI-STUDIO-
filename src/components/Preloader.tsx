"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 200 : 1100);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
          style={{ background: "#05070f" }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 rounded-2xl border border-purple-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              style={{ borderTopColor: "rgba(167,139,250,0.9)" }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl border border-cyan-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              style={{ borderBottomColor: "rgba(34,211,238,0.9)" }}
            />
            <motion.div
              className="absolute inset-3 rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpeg" alt="" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          <div className="text-center space-y-1">
            <motion.p
              className="text-xs uppercase tracking-[0.35em] text-zinc-400"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              HS AI Solutions
            </motion.p>
            <motion.p
              className="text-[10px] tracking-widest text-zinc-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Powering up the ecosystem…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
