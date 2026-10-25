"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/icons";
import { products } from "@/data/products";

interface SiteTelemetry {
  pathname: string;
  pageTitle: string;
  activeProduct?: {
    id: string;
    name: string;
    number?: string;
    tagline: string;
    category: string;
    description: string;
    features: string[];
  } | null;
  currentSection?: string;
  device: "desktop" | "mobile";
  scrollPercent: number;
}

function getLiveSiteTelemetry(): SiteTelemetry {
  if (typeof window === "undefined") {
    return { pathname: "/", pageTitle: "HS AI Solutions", device: "desktop", scrollPercent: 0 };
  }

  const pathname = window.location.pathname;
  let activeProduct = null;
  if (pathname.startsWith("/products/")) {
    const slug = pathname.replace("/products/", "").split("/")[0];
    const found = products.find((p) => p.id === slug);
    if (found) {
      activeProduct = {
        id: found.id,
        name: found.name,
        number: found.number,
        tagline: found.tagline,
        category: found.category,
        description: found.description,
        features: found.features,
      };
    }
  }

  let currentSection = "Main Studio View";
  if (typeof document !== "undefined") {
    const scrollY = window.scrollY || 0;
    const projects = document.getElementById("projects");
    const announcements = document.getElementById("announcements");
    const models = document.getElementById("models");

    if (projects && scrollY >= projects.offsetTop - 200) {
      currentSection = "Projects & Ecosystem Showcase";
    } else if (announcements && scrollY >= announcements.offsetTop - 200) {
      currentSection = "Latest Announcements & Releases";
    } else if (models && scrollY >= models.offsetTop - 200) {
      currentSection = "AI Models & Architectures";
    } else if (pathname.startsWith("/products/")) {
      currentSection = `Product Detail: ${activeProduct?.name || "Product"}`;
    } else if (pathname.startsWith("/admin")) {
      currentSection = "Administration Portal";
    }
  }

  const maxScroll = typeof document !== "undefined" ? Math.max(document.body.scrollHeight - window.innerHeight, 1) : 1;
  const scrollPercent = typeof window !== "undefined" ? Math.round(((window.scrollY || 0) / maxScroll) * 100) : 0;

  return {
    pathname,
    pageTitle: typeof document !== "undefined" ? document.title : "HS AI Solutions",
    activeProduct,
    currentSection,
    device: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
    scrollPercent,
  };
}

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
  "Who is the CM of Tamil Nadu?",
  "What is today's date?",
];

export function WebsiteAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const [clientLLMActive, setClientLLMActive] = useState(false);
  const [clientLLMLoading, setClientLLMLoading] = useState(false);
  const [engineInitProgress, setEngineInitProgress] = useState("");
  const [webGPUSupported, setWebGPUSupported] = useState(false);
  const [telemetry, setTelemetry] = useState<SiteTelemetry>({
    pathname: "/",
    pageTitle: "HS AI Solutions",
    device: "desktop",
    scrollPercent: 0,
  });

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! I am **HS Solutions Mini Star LLM**. I can answer general programming questions, search live real-time information, and help you navigate the HS AI Solutions ecosystem.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const webllmEngineRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync live site telemetry on modal open or navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTelemetry(getLiveSiteTelemetry());
    }
  }, [isOpen]);

  // Fast background auto-load for in-browser WebGPU model (non-blocking)
  useEffect(() => {
    let isCancelled = false;

    async function autoLoadModel() {
      if (typeof window === "undefined" || !(navigator as any).gpu) {
        return;
      }
      setWebGPUSupported(true);

      try {
        setClientLLMLoading(true);
        setEngineInitProgress("Initializing local WebGPU engine...");

        const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

        if (isCancelled) return;

        // Load compact model directly into browser VRAM with instant local caching
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
            text: "⚡ **In-Browser WebGPU GPU Model Active!** Responses now stream directly from your device.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } catch (err) {
        console.warn("WebGPU in-browser LLM background load skipped, using server engine:", err);
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

    const liveTel = getLiveSiteTelemetry();
    setTelemetry(liveTel);

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
        let studioContext = "";
        let webContext = "";
        let matchedProducts: any[] = [];
        let sources: { title: string; url: string }[] = [];
        let webSearched = false;

        try {
          const ctxRes = await fetch("/api/assistant/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: text,
              enableWebSearch: webSearchEnabled,
              telemetry: liveTel,
              contextOnly: true,
            }),
          });
          if (ctxRes.ok) {
            const ctxData = await ctxRes.json();
            if (ctxData.success) {
              matchedProducts = ctxData.matchedProducts || [];
              sources = ctxData.sources || [];
              webSearched = ctxData.webResults && ctxData.webResults.length > 0;
              if (ctxData.retrievedPassages?.length > 0) {
                studioContext = `VERIFIED LIVE HS AI SOLUTIONS KNOWLEDGE:\n${ctxData.retrievedPassages.join("\n\n")}`;
              }
              if (ctxData.webContext) {
                webContext = ctxData.webContext;
              }
            }
          }
        } catch (e) {
          console.warn("Context fetch error:", e);
        }

        const sysPrompt = `You are HS Solutions Mini Star LLM, the lightweight conversational AI model developed, customized, and maintained completely by HS AI Solutions.

STRICT IDENTITY RULES:
- Your name is exclusively HS Solutions Mini Star LLM.
- You were developed, created, and maintained by HS AI Solutions.
- You are HS AI Solutions' own AI model. Never identify as Qwen, Alibaba, OpenAI, ChatGPT, or any other entity.

VISITOR SITE TELEMETRY:
• Visitor's Current Page: ${liveTel.pathname} (${liveTel.pageTitle})
${liveTel.activeProduct ? `• Currently Inspecting Product: ${liveTel.activeProduct.name} (${liveTel.activeProduct.category}) — ${liveTel.activeProduct.tagline}` : ""}
• Visible Section: ${liveTel.currentSection} (${liveTel.scrollPercent}% down the page on ${liveTel.device})
INSTRUCTION: Proactively use this site telemetry to assist and guide the visitor with questions about this specific page, active product features, or site navigation.

KNOWLEDGE SOURCES:
${studioContext ? `${studioContext}\n(Use the verified HS AI Solutions knowledge above to answer accurately about HS AI Solutions products and services.)\n` : ""}
${webContext ? `${webContext}\n(Synthesize the live web research above into a clear, direct, accurate answer. Do NOT output a raw list of search snippets or say "Here is what I found". Give the exact real-world answer directly.)\n` : ""}

CONVERSATION RULES:
- If asked about current events, date, politics, or facts with web research above, give a direct, accurate, and live answer.
- If asked about HS AI Solutions, use the verified knowledge and site telemetry above to guide the visitor.
- For coding, math, programming, logic, and general topics, provide clear explanations and code.
- Do NOT mention or plug other products unless the user specifically asks for products or navigation.`;

        const botId = `bot_${Date.now()}`;
        const initialBotMsg: MessageItem = {
          id: botId,
          sender: "assistant",
          text: "",
          provider: "In-Browser WebGPU LLM (⚡ Real-time GPU)",
          webSearched,
          products: matchedProducts,
          sources,
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
              prev.map((m) =>
                m.id === botId
                  ? {
                      ...m,
                      text: accumulated,
                      webSearched,
                      products: matchedProducts,
                      sources,
                    }
                  : m
              )
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
            prev.map((m) =>
              m.id === botId
                ? {
                    ...m,
                    text: reply,
                    webSearched,
                    products: matchedProducts,
                    sources,
                  }
                : m
            )
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
          telemetry: liveTel,
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
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-xs font-bold text-white shadow-md">
            <span>⭐</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-purple-300">
              Mini Star LLM {clientLLMActive ? "• WebGPU Active" : "• Live Assistant"}
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
            <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
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
                  title={webSearchEnabled ? "Live Web Search Active" : "Web Tool Disabled"}
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

            {/* Live Site Telemetry Pill */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-white/[0.02] border-b border-white/5 text-[10px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[11px]">📍</span>
                <span className="text-white/40">Location:</span>
                <span className="font-semibold text-purple-200 truncate max-w-[210px]">
                  {telemetry.activeProduct
                    ? `${telemetry.activeProduct.name} (#${telemetry.activeProduct.number || ""})`
                    : telemetry.pathname === "/"
                    ? "HS AI Studio Home"
                    : telemetry.pathname}
                </span>
              </div>
              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                Live Telemetry
              </span>
            </div>

            {/* In-Browser WebGPU Fast Background Warming Bar */}
            {clientLLMLoading && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-purple-950/40 border-b border-purple-500/20 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[9.5px] font-mono text-purple-200/90 truncate">
                    ⚡ Accelerating in-browser GPU: {engineInitProgress || "Caching local weights..."}
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
                <span className="font-mono text-[9px] text-white/40">100% Client GPU</span>
              </div>
            )}

            {/* Chat Body */}
            <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">
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
                          <span>Live Web Research Synthesized</span>
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
                    <span className="font-mono text-[10px] ml-1">Synthesizing live response...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
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
                disabled={isLoading}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything, site navigation, code, or live web..."
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
