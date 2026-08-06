"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SolutionsShelf from "@/components/SolutionsShelf";
import DownloadBand from "@/components/DownloadBand";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import Atmosphere from "@/components/Atmosphere";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen noise overflow-x-clip">
      <Atmosphere />
      <Preloader />
      <ScrollProgress />
      <CustomCursor />

      <Navbar />
      <HeroSection />
      <SolutionsShelf />
      <DownloadBand />
      <CTASection />
      <FooterSection />
    </main>
  );
}
