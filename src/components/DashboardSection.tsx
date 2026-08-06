"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Cpu, Zap, ArrowUpRight, Terminal, BarChart2, Layers, CheckCircle2, RefreshCw } from "lucide-react";

export default function DashboardSection({ onDownload }: { onDownload?: () => void }) {
  const [activeMetricTab, setActiveMetricTab] = useState<"security" | "career" | "chatbot" | "builder">("security");

  const SYSTEM_METRICS = [
    { label: "Active Neural Nodes", value: "1,024", change: "+12.4%", icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { label: "Threats Mitigated", value: "99.98%", change: "Real-time", icon: <ShieldCheck className="w-4 h-4 text-purple-400" /> },
    { label: "Avg Stream Latency", value: "8.4 ms", change: "Optimal", icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { label: "Uptime Reliability", value: "99.999%", change: "SLA Guaranteed", icon: <Activity className="w-4 h-4 text-emerald-400" /> },
  ];

  const ACTIVITY_LOGS = [
    { time: "19:42:04", title: "AIShield Packet Forensics", detail: "Scanned 14,200 requests • 0 vulnerabilities", status: "Secure", statusBg: "bg-purple-500/10 text-purple-300 border-purple-500/30" },
    { time: "19:41:18", title: "CareerAI Skill Gap Analysis", detail: "Personalized roadmap updated for Senior Engineer", status: "Updated", statusBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
    { time: "19:40:02", title: "HS AI Assistant Reasoning Core", detail: "Processed 850k tokens • Multimodal code stream", status: "Active", statusBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
    { time: "19:38:45", title: "AI Application Builder Studio", detail: "Executable v0.1.0 setup package ready for download", status: "v0.1.0 Ready", statusBg: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  ];

  return (
    <section id="dashboard" className="relative z-10 py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-b border-white/[0.06] bg-[#04060d] os-grid">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
              ENTERPRISE CONTROL HUD
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Live Ecosystem <span className="hero-gradient-text">Telemetry &amp; Activity</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Monitor real-time security posture, AI token streams, career diagnostics, and executable build readiness.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SYSTEM_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="os-card p-6 flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10">
                  {metric.icon}
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {metric.change}
                </span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium block">{metric.label}</span>
                <span className="text-2xl font-black text-white tracking-tight block mt-1">{metric.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Panel: Activity Log + Live Status Panel */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Activity Log Feed (2 Cols) */}
          <div className="lg:col-span-2 os-card p-7 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">Live Activity Timeline Log</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Auto-refreshing</span>
              </div>
            </div>

            <div className="space-y-3">
              {ACTIVITY_LOGS.map((log, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500">{log.time}</span>
                      <span className="text-xs font-bold text-white">{log.title}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{log.detail}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${log.statusBg} w-fit`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Launcher & Software Installer Panel (1 Col) */}
          <div className="os-card p-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Layers className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white tracking-tight">Quick Launcher OS</h3>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Directly access enterprise web portals or deploy the native Windows setup installer package.
              </p>

              <div className="space-y-2.5">
                <a
                  href="https://efinal-ok77.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/40 flex items-center justify-between text-xs font-bold text-zinc-200 hover:text-white transition-all group"
                >
                  <span>Launch AIShield Portal</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://ledger-1-2ttx.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 flex items-center justify-between text-xs font-bold text-zinc-200 hover:text-white transition-all group"
                >
                  <span>Launch CareerAI Platform</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://hs-chatbot-3.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 flex items-center justify-between text-xs font-bold text-zinc-200 hover:text-white transition-all group"
                >
                  <span>Launch HS AI Assistant</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Desktop App Installer Section */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href="/downloads/HS CODE_0.1.0_x64-setup.exe"
                download
                onClick={onDownload}
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Download HS CODE (v0.1.0)</span>
              </a>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-200/90 leading-tight text-left">
                <span className="font-extrabold text-amber-300">NOTE:</span> If Windows displays &quot;Don&apos;t run&quot;, select <span className="font-bold text-white">&quot;More info&quot;</span> &amp; <span className="font-bold text-white">&quot;Run anyway&quot;</span>.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
