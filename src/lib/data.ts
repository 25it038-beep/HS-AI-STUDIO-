import {
  ShieldCheck,
  GraduationCap,
  Bot,
  Code2,
  Presentation,
  type LucideIcon,
} from "lucide-react";

export interface Solution {
  title: string;
  tagline: string;
  url: string;
  description: string;
  gradient: string;
  glow: string;
  status: "live" | "development";
  icon: LucideIcon;
}

export const SOLUTIONS: Solution[] = [
  {
    title: "AIShield",
    tagline: "AI Cyber Security Platform",
    url: "https://efinal-ok77.vercel.app/",
    description:
      "AI-powered threat detection, content forensics, document analysis, intelligent reporting, and cybersecurity automation.",
    gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
    glow: "rgba(168, 85, 247, 0.35)",
    status: "live",
    icon: ShieldCheck,
  },
  {
    title: "CareerAI",
    tagline: "AI Career Intelligence",
    url: "https://ledger-1-2ttx.onrender.com/",
    description:
      "Resume analysis, skill gap detection, personalized learning roadmaps, interview preparation, and career growth.",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    glow: "rgba(6, 182, 212, 0.35)",
    status: "live",
    icon: GraduationCap,
  },
  {
    title: "HS AI Assistant",
    tagline: "AI Powered Chatbot",
    url: "https://hs-chatbot-3.onrender.com/",
    description:
      "Multimodal AI assistant for reasoning, coding, document analysis, file understanding, and intelligent conversations.",
    gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
    glow: "rgba(16, 185, 129, 0.35)",
    status: "live",
    icon: Bot,
  },
  {
    title: "AI Application Builder",
    tagline: "AI Powered Application Builder",
    url: "",
    description:
      "Describe an app in plain language — the AI assembles, wires, and ships it. Currently in active development.",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    glow: "rgba(245, 158, 11, 0.35)",
    status: "development",
    icon: Code2,
  },
  {
    title: "Lumina",
    tagline: "AI Presentation Studio",
    url: "https://lumina-pghe.onrender.com/",
    description:
      "Turn ideas into beautiful, on-brand presentations in seconds — AI-crafted slides, layouts, and visual storytelling.",
    gradient: "linear-gradient(135deg, #d946ef, #6366f1)",
    glow: "rgba(217, 70, 239, 0.35)",
    status: "live",
    icon: Presentation,
  },
];

export interface Stat {
  label: string;
  value?: number;
  text?: string;
  suffix?: string;
}

export const STATS: Stat[] = [
  { label: "AI Products", value: 5, suffix: "+" },
  { label: "AI Operations", value: 10000, suffix: "+" },
  { label: "Always Growing", text: "∞" },
  { label: "Lightning Fast", text: "≤1s" },
];

export const DOWNLOAD_URL = "/downloads/HS CODE_0.1.0_x64-setup.exe";
