"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadIcon, ArrowUpRight } from "@/components/ui/icons";
import {
  triggerOSNotification,
  requestOSNotificationPermission,
} from "@/lib/os-notification";

interface DownloadCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  version?: string;
  downloadUrl: string;
  localBackupUrl?: string;
  accent?: string;
  fileName?: string;
}

export function DownloadCompanionModal({
  isOpen,
  onClose,
  productName,
  version = "1.0.0",
  downloadUrl,
  localBackupUrl,
  accent = "#c084fc",
  fileName = "Galaxy-Vision-v1.0.0-Standalone.zip",
}: DownloadCompanionModalProps) {
  const [notificationStatus, setNotificationStatus] = useState<
    "idle" | "granted" | "prompted" | "denied"
  >("idle");

  useEffect(() => {
    if (!isOpen) return;

    // Check permission state
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        setNotificationStatus("granted");
      } else if (Notification.permission === "denied") {
        setNotificationStatus("denied");
      } else {
        setNotificationStatus("prompted");
        requestOSNotificationPermission().then((perm) => {
          setNotificationStatus(perm === "granted" ? "granted" : "denied");
        });
      }
    }

    // Schedule OS Desktop Notification to pop up even when the user switches to OneDrive
    triggerOSNotification({
      title: `${productName} v${version} · Download Started`,
      body: `Your download was initiated from OneDrive! Click here to return to HS AI Solutions.`,
      icon: "/icon.svg",
      targetUrl: window.location.href,
      delayMs: 2500,
    });
  }, [isOpen, productName, version]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleManualOSAlert = async () => {
    await requestOSNotificationPermission();
    await triggerOSNotification({
      title: `${productName} · HS AI Solutions`,
      body: `Download is active in OneDrive tab. Click here to return to HS AI Solutions!`,
      icon: "/icon.svg",
      targetUrl: window.location.href,
      delayMs: 500,
    });
  };

  const handleReopen = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-[#0b0e14] p-6 text-white shadow-2xl sm:p-8"
            style={{
              boxShadow: `0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 50px -10px ${accent}30`,
            }}
          >
            {/* Ambient Lighting */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px] opacity-30"
              style={{ background: accent }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span
                className="flex h-2.5 w-2.5 rounded-full animate-ping"
                style={{ background: accent }}
              />
              <span
                className="font-mono text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Download Initiated · OS Alert Active
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {productName}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
              We redirected your download link to Microsoft OneDrive in a dedicated tab.
              When the download starts, you are always welcome back to <strong>HS AI Solutions</strong>.
            </p>

            {/* OS Notification Box */}
            <div className="mt-5 rounded-2xl border border-purple-500/25 bg-purple-950/20 p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔔</span>
                <div className="text-xs">
                  <p className="font-semibold text-purple-200">
                    System Desktop OS Notification
                  </p>
                  <p className="mt-1 text-zinc-300 leading-relaxed">
                    An OS notification pops up on your Windows desktop even while you are viewing OneDrive or another site. Clicking that notification returns you right back to this tab.
                  </p>
                  {notificationStatus === "denied" && (
                    <p className="mt-2 text-amber-300 font-medium">
                      ⚠️ Notifications are blocked in browser settings. Enable notifications for HS AI Solutions to receive desktop alerts.
                    </p>
                  )}
                  {notificationStatus !== "denied" && (
                    <button
                      type="button"
                      onClick={handleManualOSAlert}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-purple-300 underline underline-offset-4 hover:text-purple-200"
                    >
                      Test OS Notification Now →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full font-semibold text-black text-[13.5px] shadow-lg transition-transform duration-200 hover:scale-[1.02]"
                style={{ background: accent }}
              >
                <span>Return to HS AI Solutions</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleReopen}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-[13px] font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <span>Reopen OneDrive Link</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {localBackupUrl && (
              <div className="mt-4 border-t border-white/10 pt-3 text-center">
                <a
                  href={localBackupUrl}
                  download={fileName}
                  className="inline-flex items-center gap-1.5 text-[12px] text-zinc-400 hover:text-white transition-colors"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Direct Download Backup ({fileName})</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
