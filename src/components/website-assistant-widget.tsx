"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/icons";

interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
  provider?: string;
  webSearched?: boolean;
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
  "What is Python?",
  "What is Lumina?",
  "Write factorial in Python",
  "Latest AI news",
];

export function WebsiteAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const [clientLLMActive, setClientLLMActive] = useState(false);
  const [clientLLMLoading, setClientLLMLoading] = useState(false);
  const [engineInitProgress, setEngineInitProgress] = useState("");
  const [webGPUSupported, setWebGPUSupported] = useState(false);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! I am **HS Solutions Mini Star LLM**. I can answer general programming questions (Python, algorithms), search the live web, or guide you through HS AI Solutions tools.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const webllmEngineRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check WebGPU compatibility and automatically load the in-browser model
  useEffect(() => {
    let isCancelled = false;

    async function autoLoadModel() {
      if (typeof window === "undefined" || !(navigator as any).gpu) {
        return;
      }
      setWebGPUSupported(true);

      try {
        setClientLLMLoading(true);
        setEngineInitProgress("Auto-loading in-browser 650MB model...");

        const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

        if (isCancelled) return;

        const engine = await CreateMLCEngine("Qwen2.5-0.5B-Instruct-q4f16_1-MLC", {
          initProgressCallback: (report) => {
            if (!isCancelled) {
              setEngineInitProgress(report.text);
            }
          },
        });

        if (isCancelled) return;

        webllmEngineRef.current = engine;
        setClientLLMActive(true);
        setClientLLMLoading(false);
        setEngineInitProgress("");

        setMessages((prev) => [
          ...prev,
          {
            id: `sys_${Date.now()}`,
            sender: "assistant",
            text: "⚡ **In-Browser WebGPU LLM Loaded!** HS Solutions Mini Star is running directly inside your browser GPU with zero cloud latency.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } catch (err) {
        console.warn("WebGPU in-browser LLM auto-load skipped or unsupported:", err);
        if (!isCancelled) {
          setClientLLMLoading(false);
          setEngineInitProgress("");
        }
      }
    }

    autoLoadModel();

    return () => {
      isCancelled = true;
    };
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
      // 1. If Client-side WebGPU Engine is loaded, run inference directly in the browser with REAL-TIME STREAMING!
      if (clientLLMActive && webllmEngineRef.current) {
        const sysPrompt = `You are HS Solutions Mini Star LLM, an intelligent, helpful conversational AI assistant customized and maintained by HS AI Solutions.
CRITICAL RULES:
- Answer the user's specific prompt directly, helpfully, accurately, and concisely.
- Do NOT mention, plug, or link to HS AI Solutions products or navigation unless the user specifically asks for products or navigation.
- If asked general questions (Python, coding, math, general science, logic), answer directly with clear explanations and code. Never mention studio products for general questions.
- If asked your name: you are HS Solutions Mini Star LLM by HS AI Solutions.`;

        const botId = `bot_${Date.now()}`;
        const initialBotMsg: MessageItem = {
          id: botId,
          sender: "assistant",
          text: "",
          provider: "In-Browser WebGPU LLM (⚡ Real-time GPU)",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, initialBotMsg]);

        try {
          const stream = await webllmEngineRef.current.chat.completions.create({
            messages: [
              { role: "system", content: sysPrompt },
              { role: "user", content: text },
            ],
            stream: true,
            temperature: 0.6,
            max_tokens: 512,
          });

          let accumulated = "";
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content || "";
            accumulated += delta;
            setMessages((prev) =>
              prev.map((m) => (m.id === botId ? { ...m, text: accumulated } : m))
            );
          }
        } catch (streamErr) {
          console.warn("WebGPU streaming failed, falling back to non-stream:", streamErr);
          const completion = await webllmEngineRef.current.chat.completions.create({
            messages: [
              { role: "system", content: sysPrompt },
              { role: "user", content: text },
            ],
            temperature: 0.6,
            max_tokens: 512,
          });
          const reply = completion.choices[0]?.message?.content || "No response generated.";
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, text: reply } : m))
          );
        }

        setIsLoading(false);
        return;
      }

      // 2. Otherwise run through Next.js server endpoint (which connects to Ollama, Web Tool, and Studio RAG)
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          enableWebSearch: webSearchEnabled,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Could not generate reply");
      }

      const botMsg: MessageItem = {
        id: `bot_${Date.now()}`,
        sender: "assistant",
        text: data.message,
        webSearched: data.webSearched,
        products: data.products,
        sources: data.sources,
        provider: data.provider,
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
              Mini Star LLM {clientLLMActive ? "• WebGPU Active" : ""}
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
                    {clientLLMActive ? "Running inside browser GPU (WebGPU)" : "HS AI Solutions Assistant"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Web Tool Toggle */}
                <button
                  type="button"
                  onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                  title={webSearchEnabled ? "Web Tool Active" : "Web Tool Disabled"}
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] transition ${
                    webSearchEnabled
                      ? "border border-cyan-400/40 bg-cyan-500/15 text-cyan-300"
                      : "border border-white/10 bg-white/5 text-white/40"
                  }`}
                >
                  <span>🌐</span>
                  <span>{webSearchEnabled ? "Web ON" : "Web OFF"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-white/40 hover:text-white hover:bg-white/5 transition"
                  aria-label="Close assistant"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* In-Browser WebGPU Auto-Loading Status Bar */}
            {clientLLMLoading && (
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-950/50 border-b border-purple-500/20 text-xs">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-purple-200 text-[11px] truncate">Auto-loading 650MB Model into Browser GPU...</p>
                  <p className="text-[9.5px] font-mono text-purple-300/80 truncate">
                    {engineInitProgress || "Initializing WebGPU runtime and caching weights..."}
                  </p>
                </div>
              </div>
            )}

            {clientLLMActive && (
              <div className="flex items-center justify-between px-4 py-1.5 bg-emerald-950/30 border-b border-emerald-500/20 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-emerald-300 font-medium">
                    ⚡ In-Browser WebGPU LLM Active
                  </span>
                </div>
                <span className="font-mono text-[9px] text-white/40">100% Client-Side GPU</span>
              </div>
            )}

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
                    {/* Web Searched Badge */}
                    {m.webSearched && (
                      <div className="mb-2 flex items-center gap-1 rounded-md border border-cyan-400/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[8.5px] text-cyan-300 w-fit">
                        <span>🌐</span>
                        <span>Researched via Live Web Tool</span>
                      </div>
                    )}

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

                    {/* Sources */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1 border-t border-white/5 pt-2">
                        {m.sources.slice(0, 2).map((s, idx) => (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-[8.5px] text-cyan-300 hover:text-white transition truncate max-w-[180px]"
                          >
                            🔗 {s.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="mt-1 font-mono text-[8.5px] text-white/30 px-1">
                    {m.timestamp} {m.provider ? `• ${m.provider}` : ""}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white/50 w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="font-mono text-[10px] ml-1">Generating response...</span>
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
                placeholder="Ask anything, code in Python, search web..."
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
