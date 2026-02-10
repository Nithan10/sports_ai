"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ripple } from "@/components/ui/ripple";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Iphone } from "@/components/ui/iphone";
import {
  ChevronLeft,
  Bell,
  Home,
  Activity,
  User,
  Zap,
  Trophy,
  Star,
  Battery,
  Flame,
  Target,
  Gauge
} from "lucide-react";

const HERO_DATA = [
  {
    id: 1,
    firstName: "Football",
    fullName: "Bruno F.",
    teamCode: "MUN",
    opponent: "Man Utd",
    image: "/p1.png",
    energy: 87,
    color: "#9333ea", // Purple
    gradient: "from-purple-600 to-blue-600",
    shadowColor: "shadow-purple-500/25",
    stats: { speed: "34.2 km/h", accuracy: "94%", mom: "12" }
  },
  {
    id: 2,
    firstName: "Cricket",
    fullName: "Erling H.",
    teamCode: "MCI",
    opponent: "Man City",
    image: "/p4.png", 
    energy: 92,
    color: "#3b82f6", // Blue
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/25",
    stats: { speed: "36.5 km/h", accuracy: "88%", mom: "18" }
  },
  {
    id: 3,
    firstName: "Tennis",
    fullName: "Kylian M.",
    teamCode: "RMA",
    opponent: "Real Madrid",
    image: "/p5.png",
    energy: 90,
    color: "#f59e0b", // Amber
    gradient: "from-amber-400 to-orange-600",
    shadowColor: "shadow-orange-500/25",
    stats: { speed: "37.9 km/h", accuracy: "91%", mom: "15" }
  },
  {
    id: 4,
    firstName: "Hockey",
    fullName: "Lionel M.",
    teamCode: "BAR",
    opponent: "Barcelona",
    image: "/p6.png",
    energy: 93,
    color: "#ec48a2", // Pink
    gradient: "from-pink-500 to-rose-600",
    shadowColor: "shadow-pink-500/25",
    stats: { speed: "32.5 km/h", accuracy: "96%", mom: "22" }
  },
  {
    id: 5,
    firstName: "Basketball",
    fullName: "Bukayo S.",
    teamCode: "ARS",
    opponent: "Arsenal",
    image: "/p7.png",
    energy: 85,
    color: "#ef4444", // Red
    gradient: "from-red-600 to-orange-500",
    shadowColor: "shadow-red-500/25",
    stats: { speed: "33.8 km/h", accuracy: "89%", mom: "08" }
  },
  {
    id: 6,
    firstName: "Swimming",
    fullName: "Jude B.",
    teamCode: "RMA",
    opponent: "Dortmund",
    image: "/p8.png",
    energy: 89,
    color: "#6366f1", // Indigo
    gradient: "from-indigo-600 to-purple-700",
    shadowColor: "shadow-indigo-500/25",
    stats: { speed: "34.1 km/h", accuracy: "92%", mom: "10" }
  },
  {
    id: 7,
    firstName: "Volleyball",
    fullName: "Mohamed S.",
    teamCode: "LIV",
    opponent: "Liverpool",
    image: "/p9.png",
    energy: 88,
    color: "#10b981", // Emerald
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/25",
    stats: { speed: "35.2 km/h", accuracy: "87%", mom: "14" }
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const active = HERO_DATA[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_DATA.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  // Early return if no active data
  if (!active) {
    return (
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-12 md:py-24 font-sans bg-slate-50">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-12 md:py-24 font-sans bg-slate-50 selection:bg-purple-100">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence mode="wait">
             <motion.div 
                key={`glow-1-${active.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className={`absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br ${active?.gradient || "from-purple-600 to-blue-600"} blur-[120px] mix-blend-multiply`}
             />
             <motion.div 
                key={`glow-2-${active.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className={`absolute bottom-[-10%] right-[-5%] h-[700px] w-[700px] rounded-full bg-gradient-to-tl ${active?.gradient || "from-purple-600 to-blue-600"} blur-[140px] mix-blend-multiply`}
             />
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center justify-center text-slate-900/5"> 
             <Ripple className="-z-0" mainCircleSize={300} numCircles={6} mainCircleOpacity={0.15} />
        </div>
      </div>

      <div className="z-10 grid w-full max-w-[1400px] grid-cols-1 gap-y-12 px-6 lg:grid-cols-3 lg:gap-x-8 items-center">
        
        {/* COL 1: Typography */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>Official Partner</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-slate-900 uppercase leading-[0.9]">
                    sports <br/>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={active.id}
                        initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${active?.gradient || "from-purple-600 to-blue-600"} pb-2 block drop-shadow-sm`}
                      >
                        {active?.firstName || "Loading"}
                      </motion.span>
                    </AnimatePresence>
                </h1>

                <p className="max-w-[400px] text-slate-500 text-sm lg:text-base leading-relaxed font-medium">
                    Track performance and dominate the pitch with real-time analytics for <span className="text-slate-900 font-bold">{active?.fullName || "Player"}</span>.
                </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <InteractiveHoverButton className={`w-40 bg-slate-900 text-white border-none shadow-xl ${active?.shadowColor || "shadow-purple-500/25"} transition-shadow duration-500 hover:bg-slate-800`}>
                    Get Started
                </InteractiveHoverButton>
            </div>
        </div>

        {/* COL 2: Player Image & LINE ANIMATION */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 h-[450px] md:h-[600px]">
          <AnimatePresence mode="wait">
            
            {/* --- TECH LINE ANIMATION (Behind Image) --- */}
            <motion.div 
              key={`lines-${active.id}`}
              className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg className="w-[140%] h-[140%] absolute opacity-40" viewBox="0 0 400 400">
                {/* 1. Outer Rotating Dashed Ring (Now with Fading Pulse) */}
                <motion.circle 
                  cx="200" cy="200" r="180" 
                  fill="none" 
                  stroke={active.color} 
                  strokeWidth="1" 
                  strokeDasharray="10 10"
                  initial={{ rotate: 0, scale: 0.9, opacity: 0 }}
                  // Animation: Rotate 360 + Opacity Pulse [0.2 -> 0.6 -> 0.2]
                  animate={{ rotate: 360, scale: 1, opacity: [0.2, 0.6, 0.2] }}
                  transition={{ 
                    rotate: { duration: 10, ease: "linear", repeat: Infinity },
                    scale: { duration: 0.5 },
                    // Pulse Transition
                    opacity: { duration: 3, ease: "easeInOut", repeat: Infinity } 
                  }}
                />

                {/* 2. Drawing Inner Ring (Now with Fading Pulse) */}
                <motion.circle 
                  cx="200" cy="200" r="140" 
                  fill="none" 
                  stroke={active.color} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                  // Animation: Draw Path + Opacity Pulse [0.4 -> 1 -> 0.4]
                  animate={{ pathLength: 1, opacity: [0.4, 1, 0.4], rotate: -90 }}
                  transition={{ 
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    // Pulse Transition
                    opacity: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.5 } 
                  }}
                />

                {/* 3. Pulsing Core */}
                <motion.circle 
                  cx="200" cy="200" r="120" 
                  fill="none" 
                  stroke={active.color} 
                  strokeWidth="1" 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1, 0.8], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                />
                
                {/* 4. Crosshairs (Fading In/Out slightly) */}
                <motion.line 
                   x1="200" y1="20" x2="200" y2="40" 
                   stroke={active.color} strokeWidth="2"
                   initial={{ y: -20, opacity: 0 }}
                   animate={{ y: 0, opacity: [0.5, 1, 0.5] }}
                   transition={{ y: { duration: 0.5 }, opacity: { duration: 3, repeat: Infinity } }}
                />
                 <motion.line 
                   x1="200" y1="360" x2="200" y2="380" 
                   stroke={active.color} strokeWidth="2"
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: [0.5, 1, 0.5] }}
                   transition={{ y: { duration: 0.5 }, opacity: { duration: 3, repeat: Infinity } }}
                />
                <motion.line 
                   x1="20" y1="200" x2="40" y2="200" 
                   stroke={active.color} strokeWidth="2"
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: [0.5, 1, 0.5] }}
                   transition={{ x: { duration: 0.5 }, opacity: { duration: 3, repeat: Infinity } }}
                />
                <motion.line 
                   x1="360" y1="200" x2="380" y2="200" 
                   stroke={active.color} strokeWidth="2"
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: [0.5, 1, 0.5] }}
                   transition={{ x: { duration: 0.5 }, opacity: { duration: 3, repeat: Infinity } }}
                />
              </svg>
            </motion.div>

            {/* --- PLAYER IMAGE (Updated with Floating Animation) --- */}
            <motion.img 
              key={`img-${active.id}`}
              src={active?.image || "/placeholder.png"}
              alt={active?.fullName || "Player"}
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              
              // Initial Entry State
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              
              // Combined Animation: Slide to center + Continuous Floating
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                y: [0, -20, 0] // Vertical Floating Keyframes
              }}
              
              // Exit State
              exit={{ opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3 } }}
              
              // Specific Transitions
              transition={{ 
                // Entrance Transitions
                opacity: { duration: 0.5, ease: "easeOut" },
                x: { duration: 0.5, ease: "easeOut" },
                scale: { duration: 0.5, ease: "easeOut" },
                
                // Floating Loop Transition (Specific to 'y')
                y: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatType: "mirror" 
                }
              }}
            />
          </AnimatePresence>
        </div>

        {/* COL 3: Compact iPhone Interface */}
        <div className="flex justify-center lg:justify-end order-3">
          <Iphone className="h-[550px] w-[300px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] bg-transparent">
            <AnimatePresence mode="wait">
              <motion.div 
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col bg-slate-50 text-zinc-900 h-full w-full overflow-hidden"
              >
                
                {/* --- APP HEADER - Compact --- */}
                <div className="flex items-center justify-between px-5 pb-3 pt-12 sticky top-0 bg-slate-50/90 backdrop-blur-xl z-20 border-b border-slate-100/50">
                  <button className="h-7 w-7 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                    <ChevronLeft className="h-3.5 w-3.5 text-slate-600" />
                  </button>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Profile</span>
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={active.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm font-bold text-slate-900"
                      >
                        {active?.fullName || "Player"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <button className="h-7 w-7 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                    <Bell className="h-3.5 w-3.5 text-slate-600" />
                  </button>
                </div>

                {/* --- SCROLLABLE CONTENT - Compact --- */}
                <div className="px-4 space-y-3 pb-20 pt-2 overflow-y-auto h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  
                  {/* Energy Level Bar Graph - Replaces Rating */}
                  <div className="rounded-[20px] bg-white p-4 border border-slate-100 shadow-[0_4px_8px_-2px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-xs font-bold text-slate-900">Energy Level</span>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={active.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-sm font-bold text-slate-900"
                        >
                          {active?.energy || 0}%
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    
                    {/* Main Energy Bar */}
                    <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={active.id}
                          initial={{ width: 0 }}
                          animate={{ width: `${active?.energy || 0}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`absolute h-full rounded-full bg-gradient-to-r ${active?.gradient || "from-purple-600 to-blue-600"}`}
                        />
                      </AnimatePresence>
                    </div>
                    
                    {/* Energy Indicators */}
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                      <span>Peak</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="rounded-[20px] bg-white p-4 border border-slate-100 shadow-[0_4px_8px_-2px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-900">Performance</span>
                      <Gauge className="h-4 w-4 text-slate-400" />
                    </div>
                    
                    <div className="space-y-3">
                      {/* Stamina */}
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                          <span>Stamina</span>
                          <span className="font-bold">{Math.min(100, (active?.energy || 0) + 5)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            key={active.id}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (active?.energy || 0) + 5)}%` }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                          />
                        </div>
                      </div>
                      
                      {/* Focus */}
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                          <span>Focus</span>
                          <span className="font-bold">{Math.min(100, (active?.energy || 0) + 3)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            key={active.id}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (active?.energy || 0) + 3)}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                          />
                        </div>
                      </div>
                      
                      {/* Power */}
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                          <span>Power</span>
                          <span className="font-bold">{Math.min(100, (active?.energy || 0) + 2)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            key={active.id}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (active?.energy || 0) + 2)}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Grid - 3 Columns */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-[16px] bg-white p-3 border border-slate-100 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                      <Battery className="h-4 w-4 text-emerald-500 mb-1" />
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={`speed-${active.id}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-base font-bold text-slate-900 leading-none"
                        >
                          {active?.stats?.speed?.split(" ")[0] || "0"}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">Speed</div>
                    </div>
                    
                    <div className="rounded-[16px] bg-white p-3 border border-slate-100 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                      <Trophy className="h-4 w-4 text-amber-500 mb-1" />
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={`mom-${active.id}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-base font-bold text-slate-900 leading-none"
                        >
                          {active?.stats?.mom || "0"}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">MOM</div>
                    </div>
                    
                    <div className="rounded-[16px] bg-white p-3 border border-slate-100 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                      <Target className="h-4 w-4 text-blue-500 mb-1" />
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={`accuracy-${active.id}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-base font-bold text-slate-900 leading-none"
                        >
                          {active?.stats?.accuracy || "0%"}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">Accuracy</div>
                    </div>
                  </div>

                  {/* Match Card - Compact */}
                  <div className="rounded-[20px] bg-white p-3 border border-slate-100 shadow-[0_4px_8px_-2px_rgba(0,0,0,0.03)] flex items-center gap-3">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="h-9 w-9 shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black tracking-widest"
                      >
                        {active?.teamCode || "TEA"}
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={`opponent-${active.id}`}
                          initial={{ opacity: 0, x: 5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          className="text-sm font-bold text-slate-900 truncate"
                        >
                          vs {active?.opponent || "Opponent"}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-[10px] text-red-500 flex items-center gap-1.5 font-semibold mt-0.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        Live Match
                      </div>
                    </div>
                  </div>

                  {/* Sport Type Badge */}
                  <div className={`rounded-[20px] bg-gradient-to-r ${active?.gradient || "from-purple-600 to-blue-600"} p-3 flex items-center justify-between`}>
                    <div>
                      <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Sport</div>
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={`sport-${active.id}`}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 5 }}
                          className="text-base font-black text-white mt-0.5"
                        >
                          {active?.firstName || "Sport"}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <Flame className="h-4 w-4 text-white/80" />
                  </div>
                </div>

                {/* --- BOTTOM FLOATING NAV - Compact --- */}
                <div className="absolute bottom-4 left-4 right-4 h-[48px] rounded-[18px] bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-around z-30">
                  <button className="p-2 rounded-full text-purple-600 bg-purple-50">
                    <Home className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <button className="p-2 rounded-full text-slate-300 hover:text-slate-500 transition-colors">
                    <Activity className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <button className="p-2 rounded-full text-slate-300 hover:text-slate-500 transition-colors">
                    <User className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </Iphone>
        </div>
      </div>
    </section>
  );
}