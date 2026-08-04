"use client";

import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/yourusername",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harshan-seliyan-b-s-5339b4282",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Portfolio",
    href: "https://yourportfolio.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:harshanseliyan28@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function FooterSection({ onDownload }: { onDownload?: () => void }) {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/[0.08] bg-[#07070b]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-amber-400/30 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="HS AI Solutions Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-bold text-amber-300/80 uppercase tracking-[0.2em]">
              Designed & Developed by
            </p>
            <p className="text-xl font-extrabold text-white tracking-tight">
              Harshan Seliyan B.S.
            </p>
          </div>

          <p className="text-sm text-zinc-400 italic max-w-md leading-relaxed font-normal">
            &quot;Engineering the Future Through Artificial Intelligence.&quot;
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-amber-300 hover:border-amber-400/40 hover:bg-amber-400/10 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/10 shadow-md"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            <a
              href="/downloads/HS CODE_0.1.0_x64-setup.exe"
              download
              onClick={onDownload}
              className="h-11 inline-flex items-center justify-center gap-2.5 px-7 rounded-2xl bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-600/20 hover:from-amber-400/30 hover:to-amber-600/30 text-amber-200 text-xs font-bold uppercase tracking-wider border border-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md w-full sm:w-auto"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download HS CODE (v0.1.0)</span>
            </a>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200/90 leading-snug text-center shadow-inner w-full">
              <span className="font-extrabold text-amber-300">NOTE:</span> After downloading it, if Windows shows &quot;Don&apos;t run&quot;, select <span className="font-bold text-white">&quot;More info&quot;</span> and select <span className="font-bold text-white">&quot;Run anyway&quot;</span>.
            </div>
          </div>

          <p className="text-xs text-zinc-500 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} HS AI Solutions. All rights reserved.
          </p>

          <div className="h-px w-36 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </motion.div>
      </div>
    </footer>
  );
}