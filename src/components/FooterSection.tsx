"use client";

import { motion } from "framer-motion";
import { Globe, Mail, Download } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { DOWNLOAD_URL } from "@/lib/data";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/yourusername",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harshan-seliyan-b-s-5339b4282",
    icon: LinkedInIcon,
  },
  {
    label: "Portfolio",
    href: "https://yourportfolio.com",
    icon: Globe,
  },
  {
    label: "Email",
    href: "mailto:harshanseliyan28@gmail.com",
    icon: Mail,
  },
];

export default function FooterSection() {
  return (
    <footer id="contact" className="relative z-10 mt-8">
      <div className="hairline mx-auto max-w-6xl" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Logo + brand */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_0_40px_-8px_rgba(139,92,246,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpeg" alt="HS AI Solutions logo" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-zinc-500">Designed &amp; Developed by</p>
              <p className="font-display text-lg font-semibold text-gradient-static">
                Harshan Seliyan B.S.
              </p>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={fadeUp} className="text-sm text-zinc-500 italic max-w-md">
            &ldquo;Engineering the Future Through Artificial Intelligence.&rdquo;
          </motion.p>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-400/40 hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(139,92,246,0.5)] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>

          {/* Download */}
          <motion.div variants={fadeUp}>
            <a
              href={DOWNLOAD_URL}
              download
              className="btn-ghost !py-2.5 !px-5 !text-[13px]"
            >
              <Download className="w-4 h-4" />
              Download HS CODE (v0.1.0)
            </a>
          </motion.div>

          {/* Bottom */}
          <motion.div variants={fadeUp} className="w-full pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
            <span>© {new Date().getFullYear()} HS AI Solutions. All rights reserved.</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
