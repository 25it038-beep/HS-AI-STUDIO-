"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validateCollaboratorId } from "@/lib/collaborator";
import { DownloadIcon } from "@/components/ui/icons";

interface CollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  accent?: string;
}

export function CollaboratorModal({
  isOpen,
  onClose,
  accent = "#10b981",
}: CollaboratorModalProps) {
  const [collaboratorId, setCollaboratorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successName, setSuccessName] = useState<string | null>(null);
  const [downloadLinkUrl, setDownloadLinkUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("hs_collaborator_id");
      if (saved) {
        setCollaboratorId(saved);
      }
    }
  }, [isOpen]);

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
      const clientValidation = validateCollaboratorId(collaboratorId);
      if (!clientValidation.valid) {
        setError(clientValidation.error || "Invalid Collaborator ID. Access denied.");
        setIsLoading(false);
        return;
      }

      // Verify with backend
      const res = await fetch("/api/download/gravity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collaboratorId: collaboratorId.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Verification failed. Access is reserved for authorized collaborators.");
        setIsLoading(false);
        return;
      }

      // Successful verification
      const verifiedName = data.collaboratorName || clientValidation.collaboratorName || "Authorized Collaborator";
      setSuccessName(verifiedName);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("hs_collaborator_id", collaboratorId.trim());
      }

      const targetUrl = data.cloudDownloadUrl || data.downloadUrl;
      setDownloadLinkUrl(targetUrl);

      // Attempt opening high-speed download link in new tab
      if (targetUrl) {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }

      setIsLoading(false);
    } catch {
      setError("Network or verification error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#0a0f0d] p-6 text-white shadow-2xl sm:p-8"
            style={{
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px -10px rgba(16, 185, 129, 0.2)",
            }}
          >
            {/* Ambient Lighting */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px] opacity-25"
              style={{ background: accent }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="flex h-7 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3 font-mono text-[11px] font-semibold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Collaborator Edition · Restricted Access
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Download Gravity LLM Suite
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Gravity LLM is an autonomous local AI system distributed directly to authorized research and engineering collaborators. Enter your verified Collaborator ID below to unlock and download <span className="font-mono text-emerald-300">Gravity_LLM_HS_AI_Solutions_Portable.zip</span> (6.12 GB).
            </p>

            {/* Critical Notes & Operational Guidance */}
            <div className="mt-5 space-y-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 text-amber-400 font-bold">⚠️ Note:</span>
                <span className="text-zinc-300">
                  After ZIP extraction, launch your preferred interface simply by double-clicking the BAT file (<span className="font-mono text-emerald-200">gravity_desktop.bat</span>, <span className="font-mono text-emerald-200">gravity.bat</span>, or <span className="font-mono text-emerald-200">gravity.bat --cli</span>).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 text-sky-400 font-bold">⏱️ Latency:</span>
                <span className="text-zinc-300">
                  First token generation may experience an initial initialization delay while tensors and KV caches are dynamically allocated into VRAM/RAM.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 text-purple-400 font-bold">🖥️ Hardware:</span>
                <span className="text-zinc-300">
                  Operate according to your hardware specifications. Model throughput and autonomous agent latency may scale down based on available GPU VRAM and CPU core limits.
                </span>
              </div>
            </div>

            {/* Form & Verification State */}
            {successName ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-5 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-2.5 text-base font-semibold text-emerald-200">
                  Collaborator Verified: {successName}
                </p>
                <p className="mt-1 text-xs text-emerald-300/80">
                  Your 6.12 GB portable package is ready for high-speed download.
                </p>

                {downloadLinkUrl && (
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <a
                      href={downloadLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-black transition-all hover:bg-emerald-400"
                      style={{
                        boxShadow: "0 0 25px -4px rgba(16, 185, 129, 0.5)",
                      }}
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                      Download Gravity_LLM_Portable.zip (6.12 GB) ↗
                    </a>
                    <span className="text-[11px] text-zinc-400">
                      Direct cloud mirror powered by Microsoft OneDrive
                    </span>
                  </div>
                )}
              </motion.div>
            ) : (
              <form onSubmit={handleVerifyAndDownload} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="collab-id-input" className="block text-xs font-medium text-zinc-300">
                    Collaborator ID
                  </label>
                  <div className="mt-1.5 relative">
                    <input
                      id="collab-id-input"
                      type="text"
                      required
                      value={collaboratorId}
                      onChange={(e) => setCollaboratorId(e.target.value)}
                      placeholder="Enter your personal Collaborator ID..."
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 font-mono text-sm text-white placeholder-zinc-500 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-zinc-400">
                    Collaborator IDs are issued personally by HS AI Solutions for research & engineering partners.
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !collaboratorId.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: "0 0 20px -3px rgba(16, 185, 129, 0.4)",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-black" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Verifying Access...
                      </>
                    ) : (
                      <>
                        Verify &amp; Download Suite
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
}
