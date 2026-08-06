"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, Briefcase, Bot, Cpu, Terminal, Download, ArrowRight, X } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onDownload }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const COMMAND_ITEMS = [
    {
      id: "aishield",
      title: "AIShield - Cyber Threat Intelligence",
      category: "Flagship Tool",
      icon: <Shield className="w-4 h-4 text-purple-400" />,
      action: () => {
        window.open("https://efinal-ok77.vercel.app/", "_blank");
        onClose();
      },
    },
    {
      id: "careerai",
      title: "CareerAI - Resume & Career Engine",
      category: "Flagship Tool",
      icon: <Briefcase className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.open("https://ledger-1-2ttx.onrender.com/", "_blank");
        onClose();
      },
    },
    {
      id: "assistant",
      title: "HS AI Assistant - Multimodal Chatbot",
      category: "Flagship Tool",
      icon: <Bot className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.open("https://hs-chatbot-3.onrender.com/", "_blank");
        onClose();
      },
    },
    {
      id: "builder",
      title: "AI Application Builder - Download Desktop App",
      category: "Native Windows Software",
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      action: () => {
        onDownload?.();
        const a = document.createElement("a");
        a.href = "/downloads/HS CODE_0.1.0_x64-setup.exe";
        a.download = "";
        a.click();
        onClose();
      },
    },
    {
      id: "dashboard",
      title: "Launch Live AI OS Control Dashboard",
      category: "System Command",
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      action: () => {
        const el = document.getElementById("dashboard");
        el?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
  ];

  const filteredItems = COMMAND_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#090c16]/95 border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl"
          >
            {/* Top Laser Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400" />

            {/* Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, launch apps, run OS commands..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-medium"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-3 space-y-1.5">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full p-3.5 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 flex items-center justify-between group transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 group-hover:border-cyan-400/40">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No matching tools or OS commands found.
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-5 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Navigation: Use arrow keys &amp; Enter</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-400 font-bold">ESC to Close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
