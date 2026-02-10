"use client";

import React, { useRef } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

// --- Data for the Cards ---
const CARDS = [
  {
    id: 1,
    title: "Player Performance Metrics",
    description: "Track athlete output with surgical precision. Our engine processes biometrics and GPS data to optimize training loads and peak condition.",
    checklist: ["Real-time velocity tracking", "Fatigue & injury risk alerts", "VO2 Max estimation"],
    image: "/p12.png" 
  },
  {
    id: 2,
    title: "Tactical Vision Core",
    description: "Deconstruct opponent strategies instantly. We use computer vision to generate heatmaps and predict formation shifts before they happen.",
    checklist: ["Opponent pattern recognition", "Predictive play modeling", "Set-piece success probability"],
    image: "/p11.png" 
  },
  {
    id: 3,
    title: "Scouting Intelligence",
    description: "Uncover the next superstar. Compare global datasets to identify undervalued talent that fits your team's specific DNA and budget.",
    checklist: ["Global talent database", "Comparative radar charts", "Transfer value projection"],
    image: "/p10.png" 
  }
];

export default function SportsLandingPage() {
  const containerRef = useRef(null);

  return (
    <div id="what-we-do" className="bg-[#F8F9FB] font-sans antialiased selection:bg-blue-200 min-h-screen">
      <div ref={containerRef} className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative px-4 sm:px-6 pt-24 pb-48">
        
        {/* --- LEFT SIDE (Sticky Headline) --- */}
        <div className="lg:col-span-5 relative z-0">
          <div className="lg:sticky lg:top-32 flex flex-col items-start pr-4 h-fit">
            
            {/* Decoration Lines */}
            <div className="absolute -top-10 left-0 w-32 h-1 bg-blue-600 blur-[20px] rounded-full opacity-60" />
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600/50 to-indigo-600/0 rounded-full mb-8 blur-[1px]" />

            {/* Headline */}
            <h1 className="text-5xl lg:text-[4rem] font-bold text-[#1a1a1a] leading-[1.1] mb-6 tracking-tight">
              Redefine the <br />
              <span className="text-[#1a1a1a]">Game Plan</span>
            </h1>

            {/* Subhead */}
            <p className="text-gray-500 text-lg lg:text-[1.15rem] leading-relaxed mb-10 max-w-sm font-medium">
              Elevate your team's performance with elite analytics. Turn raw match data into winning strategies.
            </p>

            {/* CTA Button */}
            <button className="
              relative px-10 py-3.5 
              text-white text-lg font-semibold rounded-full 
              bg-gradient-to-b from-[#3b82f6] to-[#2563eb]
              shadow-[0_10px_20px_-5px_rgba(37,99,235,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]
              transition-all transform hover:-translate-y-0.5 active:scale-95
              border-t border-blue-400/30
            ">
              Start Analysis
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE (Scrollable Stacking Cards) --- */}
        <div className="lg:col-span-7 relative z-10 pt-8 lg:pt-0">
          {CARDS.map((card, i) => (
            <Card 
              key={card.id} 
              i={i} 
              data={card} 
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// --- Card Logic Wrapper ---
const Card = ({ i, data }: { i: number, data: any }) => {
  return (
    // Sticky container handles the stacking effect naturally
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        className="relative flex flex-col w-full origin-top"
        // We simply offset the top position based on index so they stack visibly
        style={{ 
           top: `calc(-5vh + ${i * 30}px)` 
        }}
        // Simple entrance animation
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <FeatureCardContent data={data} />
      </motion.div>
    </div>
  );
};

// --- VISUAL CARD DESIGN (LIGHT BLUE THEME) ---
const FeatureCardContent = ({ data }: { data: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        relative w-full h-auto min-h-[450px]
        rounded-[32px]                  
        border border-blue-200       
        shadow-[0_30px_60px_-15px_rgba(30,58,138,0.1)] 
        overflow-hidden 
        bg-blue-50 
      "
    >
      <div className="flex flex-col-reverse lg:flex-row h-full">
        
        {/* --- Text Content (Left Side) --- */}
        <div className="w-full lg:w-[55%] p-8 lg:p-10 flex flex-col justify-center z-20">
          {/* Darker blue title for contrast against light background */}
          <h3 className="text-3xl font-bold text-blue-950 mb-4 tracking-tight">
            {data.title}
          </h3>
          
          {/* Muted dark blue for description */}
          <p className="text-blue-900/80 text-[16px] leading-relaxed mb-8 font-medium">
            {data.description}
          </p>

          <div className="space-y-4">
            {data.checklist.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                {/* Checkbox Icon - Solid Blue Circle, White Check */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                <span className="text-blue-900 font-semibold text-[15px]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Image Area (Right Side) --- */}
        <div className="w-full lg:w-[45%] flex items-center justify-center relative overflow-hidden">
          
          {/* Subtle gradient to give depth to the image area */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50" />

          <motion.div 
            className="relative z-10 w-full h-full flex items-center justify-center p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
             <img 
               src={data.image} 
               alt={data.title} 
               className="w-auto h-auto max-w-full max-h-[300px] object-contain drop-shadow-xl mix-blend-multiply"
             />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};