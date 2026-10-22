"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdminReleasesPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<"Product Release" | "AI Model" | "Feature Update" | "Announcement">("Product Release");
  const [imageUrl, setImageUrl] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("/#projects");
  const [channels, setChannels] = useState<"in_app" | "push" | "both">("both");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishFeedback, setPublishFeedback] = useState<string | null>(null);

  // Dashboard Stats & Lists
  const [stats, setStats] = useState<{ totalAnnouncements: number; totalSubscribers: number; totalDeliveries: number } | null>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  // Load key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("hs_admin_secret_key");
    if (savedKey) {
      setAdminKey(savedKey);
      verifyAndLoad(savedKey);
    }
  }, []);

  const verifyAndLoad = async (key: string) => {
    try {
      setAuthError(null);
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${key}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }
      setIsAuthenticated(true);
      setStats(data.stats);
      setAnnouncements(data.announcements || []);
      setLogs(data.deliveryLogs || []);
      localStorage.setItem("hs_admin_secret_key", key);
    } catch (err: any) {
      setIsAuthenticated(false);
      setAuthError(err.message || "Invalid Admin Key");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    verifyAndLoad(adminKey.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem("hs_admin_secret_key");
    setIsAuthenticated(false);
    setAdminKey("");
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    try {
      setIsSubmitting(true);
      setPublishFeedback(null);

      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey.trim()}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          category,
          imageUrl: imageUrl.trim() || undefined,
          destinationUrl: destinationUrl.trim() || "/#projects",
          channels,
          status: "published",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to publish announcement");
      }

      setPublishFeedback(`✅ Successfully published "${data.announcement.title}"! (Delivered to ${data.delivery?.successful ?? 0} active push subscribers).`);
      
      // Clear form
      setTitle("");
      setMessage("");
      setImageUrl("");
      setDestinationUrl("/#projects");

      // Refresh dashboard
      verifyAndLoad(adminKey.trim());
    } catch (err: any) {
      setPublishFeedback(`❌ Error: ${err.message || "Could not publish"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09080e] p-4 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12111b] p-8 shadow-2xl"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-black">
              HS
            </span>
            <span className="font-display text-sm font-semibold tracking-wider text-white">
              HS AI Solutions Admin
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Release Management
          </h1>
          <p className="mt-2 text-xs text-muted-dark">
            Enter the administrator secret key to manage releases and web push notifications.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                Admin Secret Key
              </label>
              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter secret key..."
                className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-mono">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95"
            >
              Authenticate & Access
            </button>
          </form>

          <div className="mt-6 border-t border-white/8 pt-4 text-center">
            <Link href="/" className="font-mono text-xs text-white/40 hover:text-white transition">
              ← Return to Studio Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09080e] pb-24 pt-28 text-white">
      <div className="container-x">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-300">
                Live Admin Portal
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-bold text-white">Release Management & Web Push</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/5 transition"
            >
              View Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        {stats && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">Total Announcements</span>
              <p className="mt-2 text-3xl font-bold text-white">{stats.totalAnnouncements}</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-300">Active Push Subscribers</span>
              <p className="mt-2 text-3xl font-bold text-cyan-300">{stats.totalSubscribers}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">Successful Push Deliveries</span>
              <p className="mt-2 text-3xl font-bold text-emerald-400">{stats.totalDeliveries}</p>
            </div>
          </div>
        )}

        {/* Publish Form + Live Preview */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <div className="rounded-2xl border border-white/12 bg-[#12111b] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Create New Release Announcement</h2>
            <p className="mt-1 text-xs text-muted-dark">
              Publishing will update the website notification dropdown and dispatch browser push notifications to eligible subscribers.
            </p>

            <form onSubmit={handlePublish} className="mt-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                  Release Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. New AI Model Released!"
                  className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Discover our latest multimodal AI model from HS AI Solutions..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-[#1a1826] px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400"
                  >
                    <option value="Product Release">Product Release</option>
                    <option value="AI Model">AI Model</option>
                    <option value="Feature Update">Feature Update</option>
                    <option value="Announcement">Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                    Channels
                  </label>
                  <select
                    value={channels}
                    onChange={(e: any) => setChannels(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-[#1a1826] px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400"
                  >
                    <option value="both">In-App + Web Push (Both)</option>
                    <option value="push">Browser Push Only</option>
                    <option value="in_app">In-App Notification Center Only</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                    placeholder="/products/galaxy-vision"
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                    Image Thumbnail (Optional)
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/galaxy-vision-preview.png"
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3 text-sm font-semibold text-black shadow-lg transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? "Publishing & Delivering Push..." : "Publish Release Announcement"}
                </button>
              </div>

              {publishFeedback && (
                <p className="mt-3 text-xs font-mono text-cyan-300">{publishFeedback}</p>
              )}
            </form>
          </div>

          {/* Live Previews */}
          <div className="space-y-6">
            {/* Push Notification Preview */}
            <div className="rounded-2xl border border-white/10 bg-[#12111b] p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                System Push Notification Preview
              </span>
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-white/15 bg-black/80 p-3.5 shadow-2xl backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-black">
                  HS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-cyan-300">
                      HS AI Solutions · Now
                    </span>
                    <span className="text-[10px] text-white/30">Chrome · Windows</span>
                  </div>
                  <p className="mt-1 font-semibold text-sm text-white truncate">
                    {title || "New AI Model Released!"}
                  </p>
                  <p className="text-xs text-white/70 line-clamp-2">
                    {message || "Discover our latest AI model from HS AI Solutions."}
                  </p>
                </div>
              </div>
            </div>

            {/* In-App Notification Center Card Preview */}
            <div className="rounded-2xl border border-white/10 bg-[#12111b] p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                In-App Notification Center Card Preview
              </span>
              <div className="mt-3 flex gap-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5">
                {imageUrl ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-black">
                    <Image src={imageUrl} alt="" fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-base">
                    ✨
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase text-cyan-300 font-semibold border border-cyan-400/30">
                      {category}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">Just now</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-white truncate">
                    {title || "New AI Model Released!"}
                  </p>
                  <p className="text-[11px] text-muted-dark line-clamp-2">
                    {message || "Discover our latest AI model from HS AI Solutions."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements History & Delivery Logs */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#12111b] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">Recent Announcements & Delivery Logs</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Channels</th>
                  <th className="py-3 px-4">Published At</th>
                  <th className="py-3 px-4">Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {announcements.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{a.title}</td>
                    <td className="py-3 px-4">{a.category}</td>
                    <td className="py-3 px-4 uppercase text-cyan-300">{a.channels}</td>
                    <td className="py-3 px-4 text-white/50">{new Date(a.publishedAt).toLocaleString()}</td>
                    <td className="py-3 px-4 text-white/50">{a.destinationUrl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
