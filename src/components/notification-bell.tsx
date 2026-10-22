"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { urlBase64ToUint8Array } from "@/lib/web-push-client";

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  category: "Product Release" | "AI Model" | "Feature Update" | "Announcement";
  imageUrl?: string;
  destinationUrl: string;
  publishedAt: string;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  "AI Model": { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-400/30" },
  "Product Release": { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-400/30" },
  "Feature Update": { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-400/30" },
  Announcement: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-400/30" },
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Push notification state
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [pushLoading, setPushLoading] = useState(false);
  const [pushMessage, setPushMessage] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);

  // Load read and dismissed IDs from localStorage
  useEffect(() => {
    try {
      const storedRead = localStorage.getItem("hs_notifications_read");
      if (storedRead) setReadIds(JSON.parse(storedRead));

      const storedDismissed = localStorage.getItem("hs_notifications_dismissed");
      if (storedDismissed) setDismissedIds(JSON.parse(storedDismissed));
    } catch {}
  }, []);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/announcements");
      if (!res.ok) throw new Error("Failed to load notifications");
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        setAnnouncements(data.announcements);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load updates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // Poll every 45 seconds for real-time live releases
    const interval = setInterval(fetchAnnouncements, 45000);
    return () => clearInterval(interval);
  }, []);

  // Check Web Push support and current subscription state
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window) {
      setPushSupported(true);
      setPushPermission(Notification.permission);

      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          return registration.pushManager.getSubscription();
        })
        .then((sub) => {
          setIsSubscribed(!!sub);
        })
        .catch(() => {});
    }
  }, []);

  // Close panel on outside click or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Push Subscription Toggle (opt-in / opt-out)
  const handleTogglePush = async () => {
    if (!pushSupported) {
      setPushMessage("Web push is not supported on this browser.");
      return;
    }

    const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!VAPID_KEY) {
      setPushMessage("VAPID public key not configured.");
      return;
    }

    try {
      setPushLoading(true);
      setPushMessage(null);

      const registration = await navigator.serviceWorker.ready;

      if (isSubscribed) {
        // Unsubscribe
        const currentSub = await registration.pushManager.getSubscription();
        if (currentSub) {
          await currentSub.unsubscribe();
          await fetch("/api/push/subscribe", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ endpoint: currentSub.endpoint }),
          });
        }
        setIsSubscribed(false);
        setPushMessage("You have unsubscribed from release notifications.");
      } else {
        // Request explicit user permission
        const perm = await Notification.requestPermission();
        setPushPermission(perm);

        if (perm !== "granted") {
          setPushMessage("Notification permission was denied in your browser.");
          return;
        }

        const convertedKey = urlBase64ToUint8Array(VAPID_KEY);
        const newSub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });

        // Store subscription on server backend
        const rawKey = newSub.getKey ? newSub.getKey("p256dh") : null;
        const rawAuth = newSub.getKey ? newSub.getKey("auth") : null;

        const p256dh = rawKey ? btoa(String.fromCharCode(...new Uint8Array(rawKey))) : "";
        const auth = rawAuth ? btoa(String.fromCharCode(...new Uint8Array(rawAuth))) : "";

        const res = await fetch("/api/push/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint: newSub.endpoint,
            keys: { p256dh, auth },
          }),
        });

        const resData = await res.json();
        if (!resData.success) throw new Error(resData.error || "Subscription failed");

        setIsSubscribed(true);
        setPushMessage("Subscribed! You will receive new AI model & release alerts.");
      }
    } catch (err: any) {
      setPushMessage(err.message || "Could not toggle notifications.");
    } finally {
      setPushLoading(false);
    }
  };

  const handleMarkAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem("hs_notifications_read", JSON.stringify(updated));
    }
  };

  const handleMarkAllAsRead = () => {
    const allIds = announcements.map((a) => a.id);
    setReadIds(allIds);
    localStorage.setItem("hs_notifications_read", JSON.stringify(allIds));
  };

  const handleDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    localStorage.setItem("hs_notifications_dismissed", JSON.stringify(updated));
  };

  const visibleAnnouncements = announcements.filter((a) => !dismissedIds.includes(a.id));
  const unreadCount = visibleAnnouncements.filter((a) => !readIds.includes(a.id)).length;

  const formatRelativeTime = (isoString: string) => {
    try {
      const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
      if (diffSec < 60) return "Just now";
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      return `${Math.floor(diffSec / 86400)}d ago`;
    } catch {
      return "";
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Header Notification Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications and release updates"
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform group-hover:rotate-12"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Unread Badge Counter */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-1 text-[9px] font-bold text-black shadow-[0_0_10px_rgba(34,211,238,0.7)]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-[min(92vw,400px)] rounded-2xl border border-white/15 bg-[#0e0d16]/95 p-4 text-white shadow-2xl backdrop-blur-2xl sm:p-5 z-50 overflow-hidden"
          >
            {/* Subtle Top Glow */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-36 w-64 -translate-x-1/2 rounded-full blur-3xl opacity-35"
              style={{ background: "radial-gradient(circle, #22d3ee, #818cf8, transparent)" }}
            />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold tracking-wider text-white">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-cyan-400/15 border border-cyan-400/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="font-mono text-[11px] text-white/50 transition-colors hover:text-cyan-300"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Push Permission Opt-in Banner */}
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-white/90">Browser Push Updates</p>
                  <p className="text-[11px] text-muted-dark">
                    {isSubscribed
                      ? "Notifications enabled for this browser."
                      : "Get instant alerts when new AI models drop."}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={pushLoading}
                  onClick={handleTogglePush}
                  className={`shrink-0 rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-semibold transition active:scale-95 ${
                    isSubscribed
                      ? "border border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                      : "bg-cyan-400 text-black hover:bg-cyan-300"
                  }`}
                >
                  {pushLoading ? "..." : isSubscribed ? "Mute" : "Enable"}
                </button>
              </div>
              {pushMessage && (
                <p className="mt-2 text-[10.5px] font-mono text-cyan-300 leading-tight">
                  {pushMessage}
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="mt-3 max-h-[380px] overflow-y-auto space-y-2.5 pr-1">
              {loading && visibleAnnouncements.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-white/40">
                  Checking for latest releases...
                </div>
              ) : error ? (
                <div className="py-6 text-center text-xs text-rose-300">
                  {error}
                  <button
                    onClick={fetchAnnouncements}
                    className="block mx-auto mt-2 font-mono text-[11px] underline text-white/60 hover:text-white"
                  >
                    Retry
                  </button>
                </div>
              ) : visibleAnnouncements.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-dark">
                  <span className="block text-xl mb-1">🎉</span>
                  You're all caught up! No unread releases.
                </div>
              ) : (
                visibleAnnouncements.map((item) => {
                  const isRead = readIds.includes(item.id);
                  const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES["Announcement"];

                  return (
                    <Link
                      key={item.id}
                      href={item.destinationUrl}
                      onClick={() => {
                        handleMarkAsRead(item.id);
                        setIsOpen(false);
                      }}
                      className={`group relative flex gap-3 rounded-xl border p-3 transition-all duration-300 ${
                        isRead
                          ? "border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03]"
                          : "border-cyan-500/25 bg-cyan-950/20 hover:border-cyan-400/40 hover:bg-cyan-950/30"
                      }`}
                    >
                      {/* Image Thumbnail if available */}
                      {item.imageUrl ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black">
                          <Image
                            src={item.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-base">
                          ✨
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span
                            className={`rounded-md border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider font-semibold ${style.bg} ${style.text} ${style.border}`}
                          >
                            {item.category}
                          </span>
                          <span className="font-mono text-[10px] text-white/40">
                            {formatRelativeTime(item.publishedAt)}
                          </span>
                        </div>

                        <p className="mt-1.5 text-xs font-semibold text-white/90 group-hover:text-white truncate">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-dark line-clamp-2">
                          {item.message}
                        </p>
                      </div>

                      {/* Dismiss button */}
                      <button
                        type="button"
                        onClick={(e) => handleDismiss(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 rounded-full p-1 text-white/40 hover:text-white transition"
                        title="Dismiss"
                        aria-label="Dismiss notification"
                      >
                        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                          <path d="M4 4l8 8m0-8l-8 8" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Footer with Admin Shortcut link */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[10px] font-mono text-white/40">
              <span>HS AI Solutions Realtime</span>
              <Link
                href="/admin/releases"
                onClick={() => setIsOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                Admin Area →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
