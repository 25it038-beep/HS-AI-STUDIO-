"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SolutionsShelf from "@/components/SolutionsShelf";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import ConstellationGrid from "@/components/ConstellationGrid";
import CursorGlow from "@/components/CursorGlow";
import DownloadModal from "@/components/DownloadModal";

export default function Home() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleDownload = () => {
    setIsDownloadModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#07070b] overflow-hidden">
      <AuroraBackground />
      <ParticleField />
      <ConstellationGrid />
      <CursorGlow />

      <Navbar />
      <HeroSection />
      <SolutionsShelf onDownload={handleDownload} />
      <CTASection />
      <FooterSection onDownload={handleDownload} />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </main>
  );
}