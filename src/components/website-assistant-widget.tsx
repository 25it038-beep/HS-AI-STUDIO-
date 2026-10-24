"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/icons";

interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
  products?: {
    id: string;
    name: string;
    tagline: string;
    category: string;
    destinationUrl: string;
    downloadUrl?: string | null;
    status: string;
    accent: string;
  }[];
  sources?: { title: string; url: string }[];
  timestamp: string;
}

const SUGGESTED_QUERIES = [
  "What is Lumina?",
  "What is Galaxy Vision?",
  "Where can I find Electron AI?",
  "What products does HS AI Solutions offer?",
];

export function WebsiteAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! I am **HS Solutions Mini Star LLM**, your assistant for HS AI Solutions. Ask me anything about our AI models, applications, or features.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch knowledge freshness status
  useEffect(() => {
    fetch("/api/knowledge/status")
      .then((res) => res.json())
      .then((data) => {
        if (data.lastSync) {
          setLastSync(new Date(data.lastSync).toLocaleDateString());
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: MessageItem = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not generate reply");
      }

      const botMsg: MessageItem = {
        id: `bot_${Date.now()}`,
        sender: "assistant",
        text: data.message,
        products: data.products,
        sources: data.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errMsg: MessageItem = {
        id: `err_${Date.now()}`,
        sender: "assistant",
        text: "I could not retrieve an answer at this moment. Please check your connection or explore our products directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open HS Solutions Mini Star Assistant"
          className="group relative flex h-14 items-center gap-3 rounded-full border border-purple-400/30 bg-[#0d0c14]/90 px-4 shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-xl transition hover:border-purple-400/60 hover:bg-[#12101e] active:scale-95"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-xs font-bold text-white shadow-md">
            ⭐
          </span>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-purple-300">
              Mini Star LLM
            </span>
            <span className="text-[12.5px] font-semibold text-white/90 group-hover:text-white">
              Ask Assistant
            </span>
          </div>
        </motion.button>
      </div>

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-4 sm:left-6 z-50 flex h-[min(82vh,600px)] w-[min(94vw,430px)] flex-col rounded-2xl border border-white/15 bg-[#0e0d16]/98 text-white shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            {/* Ambient Radial Top Glow */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-36 w-64 -translate-x-1/2 rounded-full blur-3xl opacity-35"
              style={{ background: "radial-gradient(circle, #a855f7, #6366f1, transparent)" }}
            />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3.5 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 text-xs font-bold text-white shadow">
                  ⭐
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-semibold text-white">
                      HS Solutions Mini Star
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="font-mono text-[10px] text-white/45">
                    Website Assistant · HS AI Solutions
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/40 hover:text-white hover:bg-white/5 transition"
                aria-label="Close assistant"
              >
                ✕
              </button>
            </div>

            {/* Freshness Bar */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-black/40 border-b border-white/5 text-[9.5px] font-mono text-white/40">
              <span>Verified Knowledge Base</span>
              <span>{lastSync ? `Synced: ${lastSync}` : "Live Connected"}</span>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "border border-white/10 bg-white/[0.04] text-white/90"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {/* Matched Product Cards */}
                    {m.products && m.products.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-white/10 pt-2.5">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-purple-300 font-semibold">
                          Verified Product Link:
                        </span>
                        {m.products.map((p) => (
                          <Link
                            key={p.id}
                            href={p.destinationUrl}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between rounded-xl border border-white/12 bg-black/40 p-2.5 transition hover:border-purple-400/50 hover:bg-purple-950/20"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="font-semibold text-white group-hover:text-purple-300 transition truncate">
                                {p.name}
                              </p>
                              <p className="text-[10px] text-muted-dark truncate">{p.tagline}</p>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-purple-500/20 border border-purple-400/30 px-2 py-1 font-mono text-[9px] text-purple-200">
                              Open <ArrowUpRight className="h-2.5 w-2.5" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="mt-1 font-mono text-[8.5px] text-white/30 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white/50 w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="font-mono text-[10px] ml-1">Searching knowledge...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Queries Chips */}
            {messages.length <= 3 && (
              <div className="px-4 py-1.5 flex flex-wrap gap-1.5 bg-white/[0.01] border-t border-white/5">
                {SUGGESTED_QUERIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/70 hover:border-purple-400/40 hover:text-white transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3 bg-white/[0.02]"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Lumina, Galaxy Vision, models..."
                className="flex-1 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-purple-400/60"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white transition hover:bg-purple-500 disabled:opacity-40"
              >
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
