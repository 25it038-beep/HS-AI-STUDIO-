"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DashboardSection from "@/components/DashboardSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import SolutionsShelf from "@/components/SolutionsShelf";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import ConstellationGrid from "@/components/ConstellationGrid";
import CursorGlow from "@/components/CursorGlow";
import DownloadModal from "@/components/DownloadModal";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleDownload = () => {
    setIsDownloadModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#03050c] overflow-hidden">
      {/* GPU Background & Lighting Layers */}
      <AuroraBackground />
      <ParticleField />
      <ConstellationGrid />
      <CursorGlow />

      {/* Floating Header Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Operating System Stages */}
      <HeroSection onOpenSearch={() => setIsSearchOpen(true)} />
      <DashboardSection onDownload={handleDownload} />
      <FeatureShowcase onDownload={handleDownload} />
      <SolutionsShelf onDownload={handleDownload} />
      <CTASection />
      <FooterSection onDownload={handleDownload} />

      {/* Interactive Modals */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onDownload={handleDownload}
      />
    </main>
  );
}