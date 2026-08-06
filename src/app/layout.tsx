import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hs-ai-solutions.vercel.app"),
  title: "HS AI Solutions - One Ecosystem. Infinite AI Possibilities.",
  description:
    "Build, secure, automate, learn, and innovate with a growing collection of AI-powered solutions designed to solve real-world problems.",
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "HS AI Solutions - One Ecosystem. Infinite AI Possibilities.",
    description:
      "Build, secure, automate, learn, and innovate with a growing collection of AI-powered solutions.",
    images: ["/logo.jpeg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased dark">
      <body>{children}</body>
    </html>
  );
}