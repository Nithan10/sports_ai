"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// --- Components ---
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import WhatWeDo from "@/components/WhatWeDo"; 
import FeaturesSection from "@/components/FeaturesSection";
import CreativePatternSection from "@/components/CreativePatternSection"; // Changed from NovaScrollSection
import NovaScrollSection from "@/components/NovaScrollSection";
import EmpowerSection from "@/components/EmpowerSection";
import BentoGrid from "@/components/BentoGrid"; 
import BoostSection from "@/components/BoostSection"; 

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Lock body scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <main className="flex min-h-screen flex-col bg-black"> 
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full"
          >
            <Navbar />
            
            {/* 1. Hero Section */}
            <Hero />
            
            {/* 2. What We Do */}
            <WhatWeDo />
            {/* 3. Features */}
            <FeaturesSection />
            <CreativePatternSection />
            <NovaScrollSection /> {/* This is the renamed component, previously NovaScrollSection, now imported as CreativePatternSection */}

            {/* 4. Empower (Orbiting Users) */}
            <EmpowerSection />

            {/* 5. Bento Grid */}
            <BentoGrid />

            <BoostSection />

            {/* 7. Footer */}
            <Footer />
            
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
