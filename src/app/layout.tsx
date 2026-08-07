import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

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
    "A growing collection of intelligent applications built to create, communicate, protect, and unlock human potential. Lumina · HSBot · Ledger · Phishing Defence.",
  keywords: [
    "AI products",
    "AI applications",
    "Lumina",
    "HSBot",
    "Ledger",
    "Phishing Defence",
    "AI portfolio",
    "AI solutions",
    "HS AI Solutions",
  ],
  openGraph: {
    title: "HS AI Solutions — Building AI That Does More",
    description:
      "Four systems. Four problems. One AI-driven ecosystem of real, deployed applications.",
    type: "website",
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
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
