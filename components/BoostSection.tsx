"use client";

import React, { useEffect, useState } from "react";
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
  const [radius, setRadius] = useState(400); // Default for SSR consistency
  const [isMobile, setIsMobile] = useState(false);

  // Handle Responsive Radius Calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(160); // Smaller radius for mobile (fits vertical screen)
        setIsMobile(true);
      } else {
        setRadius(400); // Large radius for desktop (immersive arc)
        setIsMobile(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] md:h-[90vh] bg-[#F8F9FB] overflow-hidden flex flex-col items-center justify-start md:justify-center pt-16 md:pt-0">
      
      {/* --- BACKGROUND BLOBS (Responsive Sizes) --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[1000px] md:h-[500px] bg-blue-100/50 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[800px] md:h-[400px] bg-purple-100/50 rounded-full blur-[50px] md:blur-[80px] pointer-events-none" />
      
      {/* --- TEXT CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 md:mb-12"
      >
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 md:mb-6 drop-shadow-sm leading-tight">
          Elevate Your Performance <br className="hidden md:block" /> With <br className="md:hidden" />
          <span className="text-blue-600">Smart Analytics</span>
        </h2>
        <p className="text-base md:text-lg text-slate-600 max-w-md md:max-w-2xl mx-auto font-medium leading-relaxed">
          Unlock the data behind every play, optimize your training, and push your limits further than ever before.
        </p>
      </motion.div>

      {/* --- ROTATING WHEEL CONTAINER --- */}
      {/* Mobile: Adjusted margins/heights to bring the wheel "up" or "down" 
          to fit the smaller viewport while keeping the 'arc' effect.
      */}
      <div className="relative w-full flex justify-center items-start h-[300px] md:h-[450px] overflow-visible md:overflow-hidden mt-12 md:mt-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative flex items-center justify-center"
          style={{
            width: radius * 2,
            height: radius * 2,
            // Adjust margin to position the top of the circle in the view
            marginTop: isMobile ? 60 : 80, 
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
                  // The translate Y is negative radius to push items to the edge
                  transform: `rotate(${angle}deg) translate(0, -${radius}px)`,
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
                  // Center the icon relative to the anchor point
                  // Mobile: Smaller offset (-ml-8) vs Desktop (-ml-12)
                  className={`relative ${isMobile ? "-ml-8 -mt-8" : "-ml-12 -mt-12"}`}
                >
                  {/* --- UNIQUE ORB DESIGN --- */}
                  <div className={`
                    /* Responsive Sizing */
                    w-16 h-16 md:w-28 md:h-28
                    rounded-full 
                    ${item.bg}  
                    border-[3px] md:border-4 border-white 
                    shadow-lg ${item.shadow} 
                    flex items-center justify-center 
                    group cursor-pointer
                    /* Hover effect mostly for desktop, active for touch */
                    hover:scale-110 md:hover:-translate-y-2 transition-all duration-300
                  `}>
                    <item.Icon 
                      className="w-7 h-7 md:w-12 md:h-12 text-white drop-shadow-md" 
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