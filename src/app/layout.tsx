import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AudioIntro } from "@/components/audio-intro";
import { IntroVideo } from "@/components/intro-video";
import { FullscreenExploreVideo } from "@/components/fullscreen-explore-video";
import { ContributorFloatingBadge } from "@/components/contributor-floating-badge";
import { WebsiteAssistantWidget } from "@/components/website-assistant-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HS AI Solutions — Building AI That Does More · Harshan Seliyan B S",
    template: "%s — HS AI Solutions · Harshan Seliyan B S",
  },
  authors: [
    {
      name: "Harshan Seliyan B S",
      url: "https://www.linkedin.com/in/harshan-seliyan-b-s-5339b4282",
    },
  ],
  creator: "Harshan Seliyan B S",
  publisher: "Harshan Seliyan B S",
  description:
    "A growing collection of intelligent applications built by Harshan Seliyan B S to create, communicate, protect, and unlock human potential. Gravity LLM · Galaxy Vision · Electron AI · Pendulum · Lumina · HSBot · Ledger · Phishing Defence · HS CODE · Academia AI.",
  keywords: [
    "Harshan Seliyan B S",
    "Harshan Seliyan",
    "HS AI Solutions",
    "Gravity LLM",
    "Autonomous Local AI Suite",
    "GGUF Runtime",
    "Local AI Tools",
    "Electron AI",
    "Galaxy Vision",
    "Multimodal AI",
    "Vision Language Model",
    "Offline AI",
    "Standalone AI Model",
    "Real-Time Web Search",
    "Pendulum",
    "AI products",
    "AI applications",
    "Lumina",
    "HSBot",
    "Ledger",
    "Phishing Defence",
    "HS CODE",
    "Academia AI",
    "AI portfolio",
    "AI solutions",
  ],
  openGraph: {
    title: "HS AI Solutions — Building AI That Does More · Harshan Seliyan B S",
    description:
      "A growing collection of intelligent applications built by Harshan Seliyan B S to create, communicate, protect, and unlock human potential.",
    url: "https://hs-ai-studio-4i7i-git-main-harshanseliyan28-1638s-projects.vercel.app/",
    siteName: "HS AI Solutions · Harshan Seliyan B S",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HS AI Solutions — Building AI That Does More · Harshan Seliyan B S",
    description:
      "A growing collection of intelligent applications built by Harshan Seliyan B S to create, communicate, protect, and unlock human potential.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} min-h-screen bg-ink text-paper antialiased selection:bg-lumina selection:text-ink font-sans`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
        <AudioIntro />
        <IntroVideo />
        <FullscreenExploreVideo />
        <ContributorFloatingBadge />
        <WebsiteAssistantWidget />
      </body>
    </html>
  );
}
