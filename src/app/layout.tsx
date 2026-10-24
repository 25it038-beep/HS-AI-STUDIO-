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
    default: "HS AI Solutions — Building AI That Does More",
    template: "%s — HS AI Solutions",
  },
  description:
    "A growing collection of intelligent applications built to create, communicate, protect, and unlock human potential. Electron AI · Galaxy Vision · Pendulum · Lumina · HSBot · Ledger · Phishing Defence · HS CODE · Academia AI.",
  keywords: [
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
    "HS AI Solutions",
  ],
  openGraph: {
    title: "HS AI Solutions — Building AI That Does More",
    description:
      "Nine systems. Nine problems. One AI-driven ecosystem of real, deployed applications.",
    type: "website",
  },
  verification: {
    google: "m5kChTz1e6OpOtRi-ndPdFEFuxipn0EZRx4-ncJpm8k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-paper">
        <AudioIntro />
        <IntroVideo />
        <FullscreenExploreVideo />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <ContributorFloatingBadge />
        <WebsiteAssistantWidget />
      </body>
    </html>
  );
}
