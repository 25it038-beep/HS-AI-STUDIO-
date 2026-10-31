"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  ASCII_ANIMATIONS,
  ASCII_CATEGORIES,
  getCurlCommand,
  type AsciiAnimation,
} from "@/data/ascii-animations";
import { InteractiveHsShell } from "@/components/ascii/InteractiveHsShell";
import { ArrowUpRight } from "@/components/ui/icons";

export default function AsciiArcadePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSlug, setActiveSlug] = useState<string>("mario");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const shellRef = useRef<HTMLDivElement>(null);

  // Filter animations based on category and search query
  const filteredAnimations = useMemo(() => {
    return ASCII_ANIMATIONS.filter((anim) => {
      const matchesCategory =
        selectedCategory === "all" || anim.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        anim.title.toLowerCase().includes(q) ||
        anim.slug.toLowerCase().includes(q) ||
        anim.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyCommand = async (id: string, slug: string) => {
    const cmd = getCurlCommand(slug);
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleRunInShell = (slug: string) => {
    setActiveSlug(slug);
    if (shellRef.current) {
      shellRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-ink text-paper selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none fixed -left-40 top-10 h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.35), transparent)",
        }}
      />
      <div
        className="pointer-events-none fixed -right-40 top-1/3 h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, rgba(192,132,252,0.3), transparent)",
        }}
      />
      <div className="bg-grid-dark pointer-events-none fixed inset-0 opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

      {/* Main Container */}
      <main className="container-x relative pb-28 pt-24 sm:pt-32">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-white/45">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">ASCII Arcade &amp; HS Shell</span>
        </nav>

        {/* Hero Header */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>349+ Full-Screen Live Terminal Animations</span>
          </div>

          <h1 className="display-xl mt-4 text-[clamp(2.4rem,7vw,5.5rem)] font-bold tracking-tight text-white leading-tight">
            HS Shell &amp; ASCII Arcade
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Stream live full-screen ASCII animations engineered and hosted on Render by{" "}
            <a
              href="https://hs-prot-z1ti-qtj2izn1p-harshanseliyan28-1638s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:text-emerald-300 transition-colors"
            >
              Harshan Seliyan B S
            </a>
            . Copy any command to run in your local Windows CMD or macOS/Linux terminal, or run it instantly inside the interactive Web Shell below.
          </p>
        </div>

        {/* Interactive HS Shell Terminal Section */}
        <section ref={shellRef} id="terminal" className="mt-10 scroll-mt-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🖥️</span>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                Interactive HS Web Shell
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/60">
              Active Stream: <strong className="text-emerald-300">/{activeSlug}</strong>
            </span>
          </div>

          <InteractiveHsShell
            initialSlug={activeSlug}
            onSlugChange={(slug) => setActiveSlug(slug)}
          />
        </section>

        {/* Command Library Header */}
        <section className="mt-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-emerald-400 font-mono">Animation Command Directory</p>
              <h2 className="display-xl mt-2 text-2xl font-bold text-white sm:text-3xl">
                Ready-to-Paste Terminal Commands
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Click <strong>&quot;Run in Shell&quot;</strong> to watch live in the browser, or click{" "}
                <strong>&quot;Copy Command&quot;</strong> and paste into your local command prompt.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search animations, heroes, games..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 pl-10 text-sm text-white placeholder-white/35 transition-colors focus:border-emerald-400 focus:bg-white/10 focus:outline-none"
                />
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-white/40">
                  🔍
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {ASCII_CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? ASCII_ANIMATIONS.length
                  : ASCII_ANIMATIONS.filter((a) => a.category === cat.id).length;

              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/10 scale-105"
                      : "border border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                      isSelected
                        ? "bg-black/20 text-black font-bold"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between text-xs text-white/45 font-mono">
            <span>
              Showing {filteredAnimations.length} of {ASCII_ANIMATIONS.length} animations
            </span>
            {searchQuery && (
              <span>Filtering by &quot;{searchQuery}&quot;</span>
            )}
          </div>

          {/* Animation Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAnimations.map((anim) => {
              const isCopied = copiedId === anim.id;
              const isActive = activeSlug === anim.slug;

              return (
                <article
                  key={anim.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
                    isActive
                      ? "border-emerald-500/60 bg-emerald-950/20 shadow-xl shadow-emerald-950/30 ring-1 ring-emerald-500/30"
                      : "border-white/10 bg-[#0d1117] hover:border-white/25 hover:bg-[#111722]"
                  }`}
                >
                  <div>
                    {/* Header line with badge and category */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/70">
                        <span>{anim.categoryIcon}</span>
                        <span>/{anim.slug}</span>
                      </span>

                      {anim.badge && (
                        <span className="rounded-full border border-purple-500/30 bg-purple-950/40 px-2 py-0.5 text-[10px] font-semibold text-purple-300">
                          {anim.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 font-semibold text-white text-[15px] group-hover:text-emerald-300 transition-colors">
                      {anim.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      {anim.description}
                    </p>

                    {/* Copyable Code Snippet Block */}
                    <div className="mt-4 relative rounded-xl border border-white/10 bg-black/70 p-3 font-mono text-[11px]">
                      <div className="flex items-center justify-between gap-2 mb-1.5 text-[10px] text-white/40">
                        <span>BASH / CMD COMMAND</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCommand(anim.id, anim.slug)}
                          className="font-sans font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          {isCopied ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                      <code className="block select-all break-all text-emerald-300/90 leading-normal">
                        {getCurlCommand(anim.slug)}
                      </code>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4">
                    <button
                      type="button"
                      onClick={() => handleRunInShell(anim.slug)}
                      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-400 text-black shadow-lg shadow-emerald-400/25"
                          : "bg-white text-black hover:bg-emerald-300 hover:text-black"
                      }`}
                    >
                      <span>⚡ Run in Shell</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyCommand(anim.id, anim.slug)}
                      className={`inline-flex items-center justify-center gap-1 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                        isCopied
                          ? "border-emerald-400 bg-emerald-950/40 text-emerald-300"
                          : "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                      }`}
                      title="Copy curl command to clipboard"
                    >
                      <span>{isCopied ? "✓" : "📋"}</span>
                    </button>

                    <a
                      href={`https://hs-ascii-1.onrender.com/${anim.slug}?full=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white/60 hover:border-white/40 hover:text-white"
                      title="Open raw stream in new tab"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredAnimations.length === 0 && (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <span className="text-3xl">🔍</span>
              <p className="mt-3 text-base font-semibold text-white">
                No animations found matching &quot;{searchQuery}&quot;
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Try searching for a different game, character, space event, or clear your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Terminal Cheatsheet / Instructions Guide */}
        <section className="mt-20 rounded-3xl border border-white/10 bg-[#0a0e17] p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
              Terminal Mastery Guide
            </span>
            <h2 className="display-xl mt-2 text-2xl font-bold text-white sm:text-3xl">
              Running Live ASCII Animations on Any Device
            </h2>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
              Every animation is delivered over HTTP chunks with ANSI control codes that execute smoothly in any standard terminal emulator.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Windows */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span>🪟</span>
                <span>Windows 10 / 11</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Press <kbd className="rounded bg-white/10 px-1 font-mono text-[10px] text-white">Win + R</kbd>, type{" "}
                <code className="text-emerald-300">cmd</code> or open <strong>Windows Terminal</strong>. Paste the command with{" "}
                <kbd className="rounded bg-white/10 px-1 font-mono text-[10px] text-white">Ctrl + V</kbd> and hit Enter.
              </p>
              <div className="mt-3 rounded-lg bg-black p-2 font-mono text-[11px] text-emerald-400">
                curl.exe -s -N &quot;https://hs-ascii-1.onrender.com/mario?full=true&quot;
              </div>
            </div>

            {/* macOS & Linux */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span>🍎 🐧</span>
                <span>macOS &amp; Linux</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Open <strong>Terminal</strong>, <strong>iTerm2</strong>, or your preferred shell (Bash, Zsh, Fish). Paste the standard curl command and hit Enter.
              </p>
              <div className="mt-3 rounded-lg bg-black p-2 font-mono text-[11px] text-emerald-400">
                curl -s -N &quot;https://hs-ascii-1.onrender.com/mario?full=true&quot;
              </div>
            </div>

            {/* Command Flags Explained */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span>⚙️</span>
                <span>Flag Cheatsheet</span>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-zinc-400">
                <li>
                  <code className="text-emerald-300">-s</code>: Silent mode (hides download progress bars)
                </li>
                <li>
                  <code className="text-emerald-300">-N</code>: No-buffer (streams frames in real-time)
                </li>
                <li>
                  <code className="text-emerald-300">?full=true</code>: Full-screen terminal canvas
                </li>
                <li>
                  <code className="text-emerald-300">Ctrl + C</code>: Stop animation playback
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Navigation Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span>Engineered by</span>
            <a
              href="https://hs-prot-z1ti-qtj2izn1p-harshanseliyan28-1638s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-emerald-300 transition-colors"
            >
              Harshan Seliyan B S
            </a>
            <span>· HS AI Solutions</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Studio Home
            </Link>
            <Link href="/#products" className="hover:text-white transition-colors">
              Products
            </Link>
            <a
              href="https://hs-prot-z1ti-qtj2izn1p-harshanseliyan28-1638s-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Portfolio ↗
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
