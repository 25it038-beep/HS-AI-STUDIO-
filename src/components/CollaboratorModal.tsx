"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { validateCollaboratorId, COLLABORATOR_SUFFIX } from "@/lib/collaborator";
import { DownloadIcon, ArrowUpRight } from "@/components/ui/icons";

export interface CollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  accent?: string;
  downloadApiPath?: string;
  downloadUrl?: string;
  fileName?: string;
}

export function CollaboratorModal({
  isOpen,
  onClose,
  productId = "gravity-llm",
  productName = "Gravity LLM",
  accent = "#10b981",
  downloadApiPath = "/api/download/verify",
  downloadUrl,
  fileName = "Gravity_LLM_Portable.zip",
}: CollaboratorModalProps) {
  const [mounted, setMounted] = useState(false);
  const [collaboratorId, setCollaboratorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successName, setSuccessName] = useState<string | null>(null);
  const [downloadLinkUrl, setDownloadLinkUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // SSR hydration safety for createPortal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Restore saved collaborator ID if available
  useEffect(() => {
    if (typeof window !== "undefined" && isOpen) {
      const saved = sessionStorage.getItem("hs_collaborator_id");
      if (saved) {
        setCollaboratorId(saved);
      }
    }
  }, [isOpen]);

  // Reset transient feedback when reopening
  useEffect(() => {
    if (!isOpen) {
      setSuccessName(null);
      setError(null);
      setIsLoading(false);
    } else {
      // Focus input upon open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Background scroll lock
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleVerifyAndDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const trimmedId = collaboratorId.trim();
      const clientValidation = validateCollaboratorId(trimmedId);

      if (!clientValidation.valid) {
        setError(
          clientValidation.error ||
            `Invalid Collaborator ID. Suffix must be "${COLLABORATOR_SUFFIX}" (e.g. YourName${COLLABORATOR_SUFFIX}).`
        );
        setIsLoading(false);
        return;
      }

      // Universal endpoint verification
      const verifyEndpoint =
        downloadApiPath && !downloadApiPath.startsWith("http")
          ? downloadApiPath
          : "/api/download/verify";

      const res = await fetch(verifyEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collaboratorId: trimmedId,
          productId,
          downloadUrl,
          fileName,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.success === false) {
        setError(
          data.error ||
            "Verification failed. Collaborator credentials not recognized for this release."
        );
        setIsLoading(false);
        return;
      }

      // Successful verification
      const verifiedName =
        data.collaboratorName ||
        clientValidation.collaboratorName ||
        "Authorized Collaborator";

      const targetUrl =
        data.cloudDownloadUrl || data.downloadUrl || downloadUrl;

      setSuccessName(verifiedName);
      setDownloadLinkUrl(targetUrl);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("hs_collaborator_id", trimmedId);
      }

      // Automatically launch high-speed download link in a separate tab
      if (targetUrl) {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }

      setIsLoading(false);
    } catch {
      setError("Network verification encountered an error. Please check connection and try again.");
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 sm:p-6"
          style={{ isolation: "isolate" }}
        >
          {/* High-contrast Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Centered Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="collab-title"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#090d10] p-6 text-white shadow-2xl sm:p-8"
            style={{
              boxShadow: `0 35px 90px -15px rgba(0, 0, 0, 0.98), 0 0 45px -10px ${accent}35`,
            }}
          >
            {/* Ambient Corner Accent */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px] opacity-25"
              style={{ background: accent }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full animate-ping" style={{ background: accent }} />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest" style={{ color: accent }}>
                Authorized Collaborator Access
              </span>
            </div>

            <h2 id="collab-title" className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {productName}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
              Enter your authorized Collaborator ID to unlock the high-speed download package. The download opens directly from the verified cloud mirror, while HS AI Studio remains open.
            </p>

            {/* Package details banner */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-zinc-300">
              <span className="font-medium text-white/80">Target Package:</span>
              <span className="font-mono font-semibold text-emerald-400">{fileName}</span>
            </div>

            {/* Verification State */}
            {successName ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-emerald-500/35 bg-emerald-950/40 p-5 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-2.5 text-base font-semibold text-emerald-200">
                  Collaborator Verified: {successName}
                </p>
                <p className="mt-1 text-xs text-emerald-300/80">
                  Your authorized download package is ready to proceed.
                </p>

                {downloadLinkUrl && (
                  <div className="mt-5 flex flex-col items-center gap-2.5">
                    <a
                      href={downloadLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-black transition-all hover:bg-emerald-400"
                      style={{
                        boxShadow: "0 0 25px -4px rgba(16, 185, 129, 0.5)",
                      }}
                    >
                      <DownloadIcon className="h-4 w-4" />
                      <span>Download {fileName} (Cloud Mirror) ↗</span>
                    </a>
                    <span className="text-[11px] text-zinc-400">
                      High-speed dedicated cloud mirror powered by Microsoft OneDrive
                    </span>
                  </div>
                )}

                <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <span>Return to HS AI Studio</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleVerifyAndDownload} className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="collab-id-input" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Collaborator ID Input Field
                    </label>
                    <span className="font-mono text-[10.5px] text-zinc-400">
                      Format: [Name]{COLLABORATOR_SUFFIX}
                    </span>
                  </div>

                  <div className="mt-2 relative">
                    <input
                      ref={inputRef}
                      id="collab-id-input"
                      type="text"
                      autoFocus
                      required
                      value={collaboratorId}
                      onChange={(e) => setCollaboratorId(e.target.value)}
                      placeholder={`e.g. Harshan${COLLABORATOR_SUFFIX}`}
                      className="w-full rounded-xl border-2 border-emerald-500/40 bg-black/80 px-4 py-3.5 font-mono text-sm text-white placeholder-zinc-500 transition-all focus:border-emerald-400 focus:bg-black focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                    />
                  </div>

                  <p className="mt-2 text-[11.5px] leading-relaxed text-zinc-400">
                    Collaborator IDs are issued personally by <strong>Harshan Seliyan B S</strong> (Founder &amp; Lead AI Engineer, HS AI Solutions).
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-200"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">⚠️</span>
                      <p className="leading-relaxed">{error}</p>
                    </div>
                  </motion.div>
                )}

                {/* Important usage advisories */}
                <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-emerald-400 font-semibold">⚡ Portable Extract:</span>
                    <span>Extract ZIP to any directory; zero Python or Ollama installation required.</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-amber-400 font-semibold">⚠️ Cold Start:</span>
                    <span>Initial tensor allocation may take a few seconds on first execution.</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !collaboratorId.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-black transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: "0 0 24px -2px rgba(16, 185, 129, 0.45)",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-black" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Verifying Access...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock &amp; Download ZIP</span>
                        <DownloadIcon className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
