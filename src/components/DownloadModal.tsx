"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldAlert, Sparkles, X } from "lucide-react";

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

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-[#090d1a]/95 border border-cyan-500/40 p-8 sm:p-10 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-3xl"
          >
            {/* Top Laser Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Checkmark Icon */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Thank You for Downloading!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Your download has started. Stay tuned for more innovative products coming soon to the HS AI Ecosystem.
                </p>
              </div>

              {/* Windows Notice Badge */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 text-left leading-snug flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="font-extrabold text-amber-300">NOTE:</strong> If Windows displays &quot;Don&apos;t run&quot;, click <span className="font-bold text-white">&quot;More info&quot;</span> and select <span className="font-bold text-white">&quot;Run anyway&quot;</span>.
                </span>
              </div>

              {/* Close Action Button */}
              <button
                onClick={onClose}
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Continue Exploring</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
