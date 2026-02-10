"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Activity, 
  Timer, 
  Target, 
  Dumbbell, 
  Zap,
  Medal,
  Flame
} from "lucide-react"; 

// --- Configuration: Visuals ---
// Added specific Gradients and Shadows for each icon to make them distinct & vibrant.
const BASE_ICONS = [
  { 
    id: 1, 
    Icon: Activity, 
    bg: "bg-gradient-to-br from-blue-500 to-cyan-400", 
    shadow: "shadow-blue-500/50" 
  },
  { 
    id: 2, 
    Icon: Timer, 
    bg: "bg-gradient-to-br from-indigo-500 to-purple-500", 
    shadow: "shadow-indigo-500/50" 
  },
  { 
    id: 3, 
    Icon: Trophy, 
    bg: "bg-gradient-to-br from-amber-400 to-orange-500", 
    shadow: "shadow-amber-500/50" 
  },
  { 
    id: 4, 
    Icon: Target, 
    bg: "bg-gradient-to-br from-red-500 to-rose-600", 
    shadow: "shadow-red-500/50" 
  },
  { 
    id: 5, 
    Icon: Dumbbell, 
    bg: "bg-gradient-to-br from-emerald-400 to-teal-600", 
    shadow: "shadow-emerald-500/50" 
  },
  { 
    id: 6, 
    Icon: Zap, 
    bg: "bg-gradient-to-br from-yellow-400 to-amber-500", 
    shadow: "shadow-yellow-500/50" 
  },
  { 
    id: 7, 
    Icon: Medal, 
    bg: "bg-gradient-to-br from-orange-500 to-red-500", 
    shadow: "shadow-orange-500/50" 
  },
  { 
    id: 8, 
    Icon: Flame, 
    bg: "bg-gradient-to-br from-rose-500 to-pink-600", 
    shadow: "shadow-rose-500/50" 
  },
];

// Repeat to create a full circle loop
const ICONS = [...BASE_ICONS, ...BASE_ICONS];

export default function BoostSection() {
  const RADIUS = 400; 

  return (
    // Ensure bg-[#F8F9FB] is present for the light gray background
    <section className="relative w-full h-[90vh] bg-[#F8F9FB] overflow-hidden flex flex-col items-center justify-center">
      
      {/* --- BACKGROUND BLOBS --- */}
      {/* Soft pastel glows to support the vibrant icons */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-100/50 rounded-full blur-[80px] pointer-events-none" />
      
      {/* --- TEXT CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-4 md:mb-12 px-4 pt-10"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
          Elevate Your Performance With
          <br />
          <span className="text-blue-600">Smart Analytics</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Unlock the data behind every play, optimize your training, and push your limits further than ever before.
        </p>
      </motion.div>

      {/* --- ROTATING WHEEL --- */}
      <div className="relative w-full flex justify-center items-start h-[450px] overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative flex items-center justify-center"
          style={{
            width: RADIUS * 2,
            height: RADIUS * 2,
            marginTop: 80,
          }}
        >
          {ICONS.map((item, index) => {
            const total = ICONS.length;
            const angle = (360 / total) * index;

            return (
              <div
                key={`${item.id}-${index}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -${RADIUS}px)`,
                }}
              >
                {/* Counter-Rotate Child to keep icons upright */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative -ml-12 -mt-12"
                >
                  {/* --- UNIQUE ORB DESIGN --- */}
                  <div className={`
                    w-24 h-24 md:w-28 md:h-28 
                    rounded-full 
                    ${item.bg}  /* Vibrant Gradient Background */
                    border-4 border-white /* Clean White Border/Ring */
                    shadow-lg ${item.shadow} /* Colored Glow Shadow */
                    flex items-center justify-center 
                    group cursor-pointer
                    hover:scale-110 hover:-translate-y-2 transition-all duration-300
                  `}>
                    {/* Icon floating inside (White for contrast) */}
                    <item.Icon 
                      className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md" 
                      strokeWidth={2.5} 
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}