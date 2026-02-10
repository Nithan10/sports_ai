"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// --- Components ---
import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import WhatWeDo from "@/components/WhatWeDo"; 

// UI Components
import FeaturesSection from "@/components/FeaturesSection";
import EmpowerSection from "@/components/EmpowerSection";
import BentoGrid from "@/components/BentoGrid"; 
import BoostSection from "@/components/BoostSection"; // <--- Imported New Section

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
            
            {/* 3. Features (Phone Scroll) */}
            <FeaturesSection />

            {/* 4. Empower (Orbiting Users) */}
            <EmpowerSection />

            {/* 5. Bento Grid */}
            <BentoGrid />

            {/* 6. NEW: Boost Section (Floating Icons) */}
            <BoostSection />
            
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}