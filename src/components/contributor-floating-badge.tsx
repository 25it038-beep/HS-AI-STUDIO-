"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContributorFloatingBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    role: "Multimodal AI & Computer Vision",
    github: "",
    message: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;

    const messageLines = [
      "👋 *New Contributor Registration — HS AI Solutions*",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `👤 *Name:* ${formData.name.trim()}`,
      `📞 *Contact / Email:* ${formData.contact.trim()}`,
      `🎯 *Role / Interest:* ${formData.role}`,
    ];

    if (formData.github.trim()) {
      messageLines.push(`💻 *Portfolio / GitHub:* ${formData.github.trim()}`);
    }

    if (formData.message.trim()) {
      messageLines.push(`📝 *Contribution Note:*`);
      messageLines.push(formData.message.trim());
    }

    messageLines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    messageLines.push("🚀 *Sent via HS AI Solutions Portfolio*");

    const fullMessage = messageLines.join("\n");
    const waUrl = `https://wa.me/919629263719?text=${encodeURIComponent(fullMessage)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      contact: "",
      role: "Multimodal AI & Computer Vision",
      github: "",
      message: "",
    });
  };

  return (
    <>
      {/* Floating Trigger in Bottom-Right Corner */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Sleek Callout Pill (Desktop & Tablet) */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group hidden sm:flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-[#0e0d16]/90 py-2 pl-4 pr-3.5 text-left shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-cyan-400/70 hover:bg-[#131120]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">
              Looking for Contributors
            </span>
            <span className="text-[12.5px] font-semibold text-white/90 group-hover:text-white">
              Become a Part <span className="text-cyan-400 transition-transform group-hover:translate-x-1 inline-block">→</span>
            </span>
          </div>
        </motion.button>

        {/* Small Glowing Floating Circle Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative flex h-14 w-14 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-[1.5px] shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
          aria-label="Open Contributor Registration Form"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-sm animate-ping pointer-events-none" />

          {/* Inner circle body */}
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#0a0a10]">
            <svg
              className="h-6 w-6 text-cyan-300 transition-transform group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>

          {/* Mobile Badge Label indicator */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:hidden">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-400 text-[9px] font-bold text-black items-center justify-center">
              +
            </span>
          </span>
        </motion.button>
      </div>

      {/* Contributor Registration Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Dialog Box */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contributor-modal-title"
              className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0f0e17] p-6 text-white shadow-2xl sm:p-8 z-10 overflow-hidden"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtle Ambient Radial Highlight */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(circle, #22d3ee, #818cf8, transparent)" }}
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 rounded-full border border-white/10 p-1.5 text-white/50 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
                aria-label="Close dialog"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                  <path d="M4 4l8 8m0-8l-8 8" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              {!submitted ? (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Open Collaboration
                    </span>
                    <span className="font-mono text-[10px] text-white/40">
                      HS AI Solutions
                    </span>
                  </div>

                  <h3
                    id="contributor-modal-title"
                    className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                  >
                    Become a Part.
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-dark">
                    We&apos;re looking for developers, AI researchers, designers, and open-source contributors to build next-generation multimodal models and tools. Submitting this directly messages{" "}
                    <a
                      href="https://hs-prot-z1ti-qtj2izn1p-harshanseliyan28-1638s-projects.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 font-medium underline underline-offset-4 hover:text-white transition-colors"
                    >
                      Harshan Seliyan B S (Portfolio)
                    </a>{" "}
                    on WhatsApp.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Harshan Seliyan B S"
                        className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400/60 focus:bg-white/[0.07]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                          WhatsApp / Phone / Email <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          placeholder="+91 ... or email"
                          className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400/60 focus:bg-white/[0.07]"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                          Domain / Interest
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-white/12 bg-[#161524] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/60"
                        >
                          <option>Multimodal AI & Computer Vision</option>
                          <option>Offline GGUF & Tensor Engineering</option>
                          <option>Web Intelligence & Agent Automation</option>
                          <option>Frontend / Generative UI & Design</option>
                          <option>Security & Defense Systems</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                        Portfolio / GitHub / LinkedIn (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        placeholder="https://github.com/your-username"
                        className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400/60 focus:bg-white/[0.07]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                        What would you like to collaborate on? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you'd like to build, models you work with, or ideas for HS AI Solutions..."
                        className="mt-1.5 w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400/60 focus:bg-white/[0.07]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                      >
                        <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>Send Registration to WhatsApp (9629263719)</span>
                      </button>
                      <p className="mt-2 text-center font-mono text-[10.5px] text-white/40">
                        Direct WhatsApp dispatch to Harshan Seliyan B S (+91 9629263719)
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-400">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <h4 className="mt-4 text-xl font-bold text-white">Opening WhatsApp...</h4>
                  <p className="mt-2 text-sm text-muted-dark max-w-sm mx-auto">
                    Your details were formatted and forwarded to <span className="text-white font-medium">+91 9629263719</span>. If WhatsApp did not open automatically, click the button below:
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const messageLines = [
                          "👋 *New Contributor Registration — HS AI Solutions*",
                          "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                          `👤 *Name:* ${formData.name.trim()}`,
                          `📞 *Contact / Email:* ${formData.contact.trim()}`,
                          `🎯 *Role / Interest:* ${formData.role}`,
                        ];
                        if (formData.github.trim()) messageLines.push(`💻 *Portfolio / GitHub:* ${formData.github.trim()}`);
                        if (formData.message.trim()) messageLines.push(`📝 *Contribution Note:*\n${formData.message.trim()}`);
                        messageLines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                        messageLines.push("🚀 *Sent via HS AI Solutions Portfolio*");
                        const fullMessage = messageLines.join("\n");
                        const waUrl = `https://wa.me/919629263719?text=${encodeURIComponent(fullMessage)}`;
                        window.open(waUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-black hover:bg-emerald-400 transition"
                    >
                      <span>Open WhatsApp Again</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-white/80 hover:bg-white/5 transition"
                    >
                      Register Another Contributor
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
