"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-b from-[#181926] via-[#10111a] to-[#0a0b10] border border-amber-400/40 p-8 sm:p-10 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Metallic Border Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            
            {/* Ambient Background Light */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Animated Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Thank You for Downloading!
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  Your download has started. Stay tuned for more innovative products coming soon to the HS AI Ecosystem.
                </p>
              </div>

              {/* Windows SmartScreen reminder badge inside modal */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 text-left leading-snug">
                <span className="font-extrabold text-amber-300">NOTE:</span> If Windows displays &quot;Don&apos;t run&quot;, click <span className="font-bold text-white">&quot;More info&quot;</span> and select <span className="font-bold text-white">&quot;Run anyway&quot;</span>.
              </div>

              <button
                onClick={onClose}
                className="w-full h-11 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
