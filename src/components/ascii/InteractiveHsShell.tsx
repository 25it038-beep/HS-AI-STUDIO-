"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ASCII_ANIMATIONS,
  getCurlCommand,
  type AsciiAnimation,
} from "@/data/ascii-animations";

interface InteractiveHsShellProps {
  initialSlug?: string;
  onSlugChange?: (slug: string) => void;
}

type TerminalTheme = "matrix" | "purple" | "amber" | "cyan" | "white";
type FontSize = "xs" | "sm" | "base";

const THEME_STYLES: Record<
  TerminalTheme,
  {
    bg: string;
    text: string;
    accent: string;
    glow: string;
    border: string;
    name: string;
  }
> = {
  matrix: {
    bg: "bg-[#040d06]",
    text: "text-emerald-400",
    accent: "#10b981",
    glow: "rgba(16, 185, 129, 0.25)",
    border: "border-emerald-500/30",
    name: "Matrix Green",
  },
  purple: {
    bg: "bg-[#0b0714]",
    text: "text-purple-300",
    accent: "#c084fc",
    glow: "rgba(192, 132, 252, 0.25)",
    border: "border-purple-500/30",
    name: "Cyber Violet",
  },
  amber: {
    bg: "bg-[#0f0b04]",
    text: "text-amber-400",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.25)",
    border: "border-amber-500/30",
    name: "Amber CRT",
  },
  cyan: {
    bg: "bg-[#040d12]",
    text: "text-cyan-300",
    accent: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.25)",
    border: "border-cyan-500/30",
    name: "Cyan Terminal",
  },
  white: {
    bg: "bg-[#0a0c10]",
    text: "text-zinc-200",
    accent: "#e2e8f0",
    glow: "rgba(226, 232, 240, 0.15)",
    border: "border-white/20",
    name: "Monochrome",
  },
};

const FONT_CLASSES: Record<FontSize, string> = {
  xs: "text-[9.5px] sm:text-[11px] leading-[1.05] tracking-tight",
  sm: "text-[11.5px] sm:text-[13px] leading-[1.15]",
  base: "text-[13px] sm:text-[15px] leading-relaxed",
};

export function InteractiveHsShell({
  initialSlug = "mario",
  onSlugChange,
}: InteractiveHsShellProps) {
  const [currentSlug, setCurrentSlug] = useState(initialSlug);
  const [commandInput, setCommandInput] = useState(
    getCurlCommand(initialSlug)
  );
  const [frameContent, setFrameContent] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "connecting" | "streaming" | "paused" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("Ready to stream");
  const [theme, setTheme] = useState<TerminalTheme>("matrix");
  const [fontSize, setFontSize] = useState<FontSize>("xs");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fps, setFps] = useState<number>(0);
  const [bytesReceived, setBytesReceived] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const frameCountRef = useRef(0);
  const lastFpsTimeRef = useRef(Date.now());

  // Clean raw ANSI stream bytes into readable frame text
  const cleanAnsiText = (raw: string): string => {
    // Strip control sequences like \x1b[?25l, \x1b[2J, \x1b[H, \x1b[0m, etc.
    return raw
      .replace(/\x1b\[\??[0-9;]*[a-zA-Z]/g, "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n");
  };

  // Extract slug from user command or raw text
  const parseSlug = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return "mario";

    // 1. Matches: https://hs-ascii-1.onrender.com/<slug>?...
    const urlMatch = trimmed.match(/onrender\.com\/([^?&"\s]+)/i);
    if (urlMatch) return urlMatch[1].toLowerCase();

    // 2. Matches curl command format
    const curlMatch = trimmed.match(/curl(?:\.exe)?\s+.*\/([^?&"\s]+)\?/i);
    if (curlMatch) return curlMatch[1].toLowerCase();

    // 3. User just typed the slug directly e.g. "sonic" or "mario"
    const cleaned = trimmed.replace(/^curl(?:\.exe)?\s*/i, "").replace(/[^\w-]/g, "");
    return cleaned || "mario";
  };

  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus("idle");
    setStatusMessage("Stream stopped");
  }, []);

  const runAnimation = useCallback(
    async (slugToRun: string) => {
      stopStream();

      const slug = parseSlug(slugToRun);
      setCurrentSlug(slug);
      setCommandInput(getCurlCommand(slug));
      onSlugChange?.(slug);

      setStatus("connecting");
      setStatusMessage(`Connecting to stream for [${slug}]...`);
      setFrameContent(`\n  Connecting to HS ASCII Server (Render.com)...\n  Loading: /${slug}?full=true\n  Buffer initializing...\n`);
      setBytesReceived(0);
      frameCountRef.current = 0;
      lastFpsTimeRef.current = Date.now();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // Direct stream with fallback to API proxy
        let res: Response;
        try {
          res = await fetch(
            `https://hs-ascii-1.onrender.com/${encodeURIComponent(slug)}?full=true`,
            { signal: controller.signal }
          );
        } catch {
          // Fallback to internal API route proxy
          res = await fetch(
            `/api/ascii-stream?slug=${encodeURIComponent(slug)}`,
            { signal: controller.signal }
          );
        }

        if (!res.ok || !res.body) {
          throw new Error(`Upstream HTTP error: ${res.status} ${res.statusText}`);
        }

        setStatus("streaming");
        setStatusMessage(`Streaming live animation: ${slug}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let streamBuffer = "";
        let totalBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          totalBytes += value.byteLength;
          setBytesReceived(totalBytes);

          const chunk = decoder.decode(value, { stream: true });
          streamBuffer += chunk;

          // Split buffer by clear screen sequence \x1b[2J or \x1b[H
          const frameDelimiters = [
            "\x1b[2J",
            "\x1b[H\x1b[H",
            "\x1b[?25l\x1b[2J",
          ];

          let delimiterIndex = -1;
          for (const d of frameDelimiters) {
            const idx = streamBuffer.lastIndexOf(d);
            if (idx > delimiterIndex) {
              delimiterIndex = idx;
            }
          }

          if (delimiterIndex > 0) {
            const latestRawFrame = streamBuffer.substring(delimiterIndex);
            streamBuffer = streamBuffer.substring(delimiterIndex); // keep tail

            const cleaned = cleanAnsiText(latestRawFrame);
            if (cleaned.trim().length > 20) {
              setFrameContent(cleaned);
              frameCountRef.current += 1;

              // FPS calculation
              const now = Date.now();
              const elapsed = now - lastFpsTimeRef.current;
              if (elapsed >= 1000) {
                setFps(
                  Math.round(
                    (frameCountRef.current / elapsed) * 1000
                  )
                );
                frameCountRef.current = 0;
                lastFpsTimeRef.current = now;
              }
            }
          }
        }

        setStatus("idle");
        setStatusMessage(`Stream completed for [${slug}]`);
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          setStatus("idle");
          setStatusMessage("Stream stopped by user");
          return;
        }
        const errorMsg =
          err instanceof Error ? err.message : "Unknown stream error";
        setStatus("error");
        setStatusMessage(`Connection failed: ${errorMsg}`);
        setFrameContent(
          `\n  [!] Error connecting to stream:\n  ${errorMsg}\n\n  Tip: You can also copy the command and run it directly in your native Command Prompt or PowerShell:\n  ${getCurlCommand(
            slug
          )}\n`
        );
      }
    },
    [onSlugChange, stopStream]
  );

  // Auto-run initial slug on component mount
  useEffect(() => {
    runAnimation(initialSlug);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [initialSlug, runAnimation]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();

    if (cmd === "clear" || cmd === "cls") {
      setFrameContent("\n  Terminal screen cleared.\n  Type any animation name (e.g. mario, sonic, matrix, random) and hit Enter.\n");
      return;
    }
    if (cmd === "stop") {
      stopStream();
      return;
    }
    if (cmd === "help") {
      setFrameContent(`
  ── HS ASCII SHELL COMMAND GUIDE ──
  • <name>               Run animation (e.g. mario, bowser-fire, sonic, matrix, batman, saturn)
  • random               Stream a random full-screen animation from all 349 entries
  • curl.exe ...         Paste any full curl command from the catalog below
  • clear                Clear terminal display
  • stop                 Stop current streaming animation
  • help                 Show this help manual
      `);
      return;
    }

    runAnimation(commandInput);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const activeTheme = THEME_STYLES[theme];

  return (
    <div
      ref={terminalContainerRef}
      className={`relative transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-black p-2 sm:p-6"
          : "my-8 w-full"
      }`}
    >
      {/* Outer Shell Card */}
      <div
        className={`relative flex flex-col overflow-hidden rounded-2xl border ${activeTheme.border} ${activeTheme.bg} shadow-2xl transition-all duration-300`}
        style={{
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 45px -10px ${activeTheme.glow}`,
        }}
      >
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
          {/* Mac/Linux Style Window Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={stopStream}
              title="Stop stream"
              className="h-3 w-3 rounded-full bg-rose-500/80 transition-transform hover:scale-125"
            />
            <button
              onClick={() => runAnimation("random")}
              title="Surprise me (Random animation)"
              className="h-3 w-3 rounded-full bg-amber-500/80 transition-transform hover:scale-125"
            />
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Toggle fullscreen"
              className="h-3 w-3 rounded-full bg-emerald-500/80 transition-transform hover:scale-125"
            />
            <span className="ml-2 hidden font-mono text-[11px] font-medium tracking-wide text-white/50 sm:inline-block">
              hs-shell v2.4 ~ bash/curl live stream
            </span>
          </div>

          {/* Center Streaming Indicator */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span
              className={`flex h-2 w-2 rounded-full ${
                status === "streaming"
                  ? "animate-ping bg-emerald-400"
                  : status === "connecting"
                  ? "animate-pulse bg-amber-400"
                  : status === "error"
                  ? "bg-rose-500"
                  : "bg-zinc-600"
              }`}
            />
            <span className="hidden text-white/60 sm:inline">
              {status === "streaming" ? (
                <span className="text-emerald-400 font-semibold">
                  LIVE · {fps > 0 ? `${fps} FPS` : "STREAMING"} ·{" "}
                  {Math.round(bytesReceived / 1024)} KB
                </span>
              ) : status === "connecting" ? (
                <span className="text-amber-300">CONNECTING...</span>
              ) : (
                <span className="text-white/40">STANDBY</span>
              )}
            </span>
          </div>

          {/* Quick Toolbar (Theme, Font, Fullscreen) */}
          <div className="flex items-center gap-2">
            {/* Theme selector */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as TerminalTheme)}
              aria-label="Terminal Color Theme"
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-white/80 transition-colors hover:border-white/30 focus:outline-none"
            >
              <option value="matrix">🟢 Matrix Green</option>
              <option value="purple">🟣 Cyber Violet</option>
              <option value="amber">🟠 Amber CRT</option>
              <option value="cyan">🔵 Cyan Neon</option>
              <option value="white">⚪ Monochrome</option>
            </select>

            {/* Font size toggle */}
            <div className="hidden items-center rounded-md border border-white/10 bg-white/5 p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => setFontSize("xs")}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                  fontSize === "xs"
                    ? "bg-white/20 text-white font-bold"
                    : "text-white/40 hover:text-white"
                }`}
                title="Fit full-screen ASCII without wrapping"
              >
                XS
              </button>
              <button
                type="button"
                onClick={() => setFontSize("sm")}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                  fontSize === "sm"
                    ? "bg-white/20 text-white font-bold"
                    : "text-white/40 hover:text-white"
                }`}
                title="Standard font size"
              >
                SM
              </button>
              <button
                type="button"
                onClick={() => setFontSize("base")}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                  fontSize === "base"
                    ? "bg-white/20 text-white font-bold"
                    : "text-white/40 hover:text-white"
                }`}
                title="Large font size"
              >
                MD
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-white/70 hover:bg-white/10 hover:text-white"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>

        {/* Live Monospace Terminal Screen */}
        <div
          className={`relative min-h-[360px] flex-1 overflow-x-auto overflow-y-hidden p-4 sm:p-6 font-mono select-text ${
            isFullscreen ? "h-[calc(100vh-140px)]" : "h-[480px] sm:h-[540px]"
          }`}
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, "Courier New", "Cascadia Code", Consolas, monospace',
          }}
        >
          {/* Subtle CRT Scanline Effect */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />

          {/* Terminal Screen Content */}
          <pre
            className={`whitespace-pre font-mono ${activeTheme.text} ${FONT_CLASSES[fontSize]} transition-colors duration-200 select-text`}
          >
            {frameContent || "\n  [HS-SHELL READY] Enter a command or select an animation below...\n"}
          </pre>
        </div>

        {/* Status & Shorthand Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 bg-black/40 px-4 py-2 font-mono text-[11px] text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-white/40">Status:</span>
            <span className={status === "error" ? "text-rose-400" : "text-white/80"}>
              {statusMessage}
            </span>
          </div>

          {/* Quick Slug Switcher Shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-white/40 hidden md:inline">Quick Jump:</span>
            {["mario", "bowser-fire", "sonic", "matrix", "batman", "blackhole", "f1-racer", "random"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => runAnimation(s)}
                className={`rounded px-2 py-0.5 text-[10.5px] transition-colors ${
                  currentSlug === s
                    ? "bg-white/20 text-white font-semibold"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                /{s}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Command Input Prompt Bar */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-black/80 p-3"
        >
          <span
            className="flex items-center gap-1 font-mono text-[12px] font-bold"
            style={{ color: activeTheme.accent }}
          >
            <span className="hidden sm:inline">harshan@hs-ai:</span>
            <span>~$</span>
          </span>

          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder='Paste your curl command or type an animation slug (e.g. mario, sonic, matrix, random)...'
            className="min-w-[200px] flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-[12.5px] text-white placeholder-white/30 transition-colors focus:border-white/30 focus:bg-white/10 focus:outline-none"
          />

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-mono text-[12px] font-bold text-black transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: activeTheme.accent }}
            >
              <span>ENTER ↵</span>
            </button>

            <button
              type="button"
              onClick={stopStream}
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-[12px] text-white/70 hover:bg-white/10 hover:text-white"
            >
              Stop ⏹
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(commandInput)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-[12px] text-white/80 hover:border-white/40 hover:bg-white/10"
              title="Copy command to clipboard"
            >
              <span>{copied ? "✓ Copied!" : "Copy CMD 📋"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Local Command Prompt Instructions Banner */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-[12.5px] leading-relaxed text-zinc-300">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-2.5">
            <span className="text-base">💡</span>
            <div>
              <p className="font-semibold text-white">
                How to run full-screen inside your native Windows / Mac / Linux terminal:
              </p>
              <p className="text-zinc-400 text-[12px] mt-0.5">
                Click <strong>&quot;Copy Command&quot;</strong> on any item below &rarr; open your Windows{" "}
                <strong>Command Prompt (cmd.exe)</strong> or <strong>PowerShell</strong> &rarr; press{" "}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-white">Ctrl + V</kbd>{" "}
                and hit <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-white">Enter</kbd>{" "}
                &rarr; watch the animation load in full screen!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(getCurlCommand(currentSlug))}
            className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-900/40"
          >
            {copied ? "✓ Copied active curl!" : "Copy Active: " + currentSlug}
          </button>
        </div>
      </div>
    </div>
  );
}
