"use client";

import HeroSection from "@/components/HeroSection";
import SolutionsShelf from "@/components/SolutionsShelf";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleField from "@/components/ParticleField";
import ConstellationGrid from "@/components/ConstellationGrid";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <AuroraBackground />
      <ParticleField />
      <ConstellationGrid />
      <CursorGlow />

      <Navbar />
      <HeroSection />
      <SolutionsShelf />
      <CTASection />
      <FooterSection />
    </main>
  );
}