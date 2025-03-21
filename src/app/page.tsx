"use client";

import {
  HeroSection,
  FeatureSection,
  PageDecorations,
  StatsSection,
  CallToAction,
  HowItWorksSection,
} from "@/components/landing";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden font-sans">
      <PageDecorations />

      <div className="z-10 max-w-6xl mx-auto px-4 relative">
        <Navbar />
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <StatsSection />
        <Footer />
      </div>
    </div>
  );
}
