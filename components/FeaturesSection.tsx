"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Eye, Trophy, Zap, Crosshair, BarChart2, ChevronRight, Brain } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==========================================
// 1. CLEAN LAB / SCHEMATIC VISUALS
// ==========================================

const VelocityVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 rounded-full border border-slate-200" />
    <div className="absolute inset-2 rounded-full border border-dashed border-slate-300 animate-[spin_10s_linear_infinite]" />
    {/* Speedometer Arc */}
    <svg viewBox="0 0 100 100" className="w-full h-full rotate-[135deg]">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="251" strokeDashoffset="60" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Zap className="w-5 h-5 text-emerald-500 fill-emerald-100" />
      <span className="text-[10px] font-mono font-bold text-emerald-600 mt-1">VEL</span>
    </div>
  </div>
);

const TacticalVisual = () => (
  <div className="relative w-full h-full bg-white rounded-lg overflow-hidden border border-slate-200 shadow-inner">
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px opacity-30">
      {[...Array(16)].map((_,i) => <div key={i} className="border border-indigo-200" />)}
    </div>
    {/* Moving Dots */}
    <motion.div 
      className="absolute w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
      animate={{ x: [10, 40, 20, 50], y: [10, 30, 50, 20] }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.div 
      className="absolute w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]"
      animate={{ x: [50, 20, 40, 10], y: [50, 20, 10, 40] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
    />
  </div>
);

const ScoutingVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 border border-emerald-500/10 rounded-full bg-emerald-50/30" />
    <div className="absolute w-[80%] h-[80%] border border-emerald-500/20 rounded-full" />
    {/* Radar Sweep */}
    <motion.div 
      className="absolute w-full h-full rounded-full origin-center"
      style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(16, 185, 129, 0.1) 60deg, transparent 60deg)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <Crosshair className="w-5 h-5 text-emerald-600 relative z-10" />
  </div>
);

const VisionVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
    <Eye className="w-6 h-6 text-blue-500" />
    {/* Scan Line */}
    <motion.div 
      className="absolute top-0 w-full h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute bottom-1 right-1 text-[8px] font-mono font-bold text-blue-500">REC</div>
  </div>
);

const HealthVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <Activity className="w-8 h-8 text-rose-500" />
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <circle cx="50%" cy="50%" r="28" stroke="#cbd5e1" strokeWidth="1" fill="none" />
        <motion.circle 
          cx="50%" cy="50%" r="28" 
          stroke="#f43f5e" strokeWidth="2" fill="none" 
          strokeDasharray="175" strokeDashoffset="175"
          animate={{ strokeDashoffset: [175, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
    </svg>
  </div>
);

const PredictionVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <Trophy className="w-6 h-6 text-amber-500 relative z-10" />
    {/* Orbit */}
    <motion.div 
      className="absolute w-full h-full border border-amber-500/30 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-sm" />
    </motion.div>
  </div>
);

// ==========================================
// 2. PRO FEATURE CARD (Mirrored Layout)
// ==========================================

const FeatureCard = ({ title, description, visual, color, delay, side, stats }: any) => {
  const isLeft = side === "left";
  
  const colors = {
    cyan: "border-blue-200 shadow-blue-500/5 text-blue-600 bg-blue-50/50",
    indigo: "border-indigo-200 shadow-indigo-500/5 text-indigo-600 bg-indigo-50/50",
    emerald: "border-emerald-200 shadow-emerald-500/5 text-emerald-600 bg-emerald-50/50",
    sky: "border-sky-200 shadow-sky-500/5 text-sky-600 bg-sky-50/50",
    rose: "border-rose-200 shadow-rose-500/5 text-rose-600 bg-rose-50/50",
    amber: "border-amber-200 shadow-amber-500/5 text-amber-600 bg-amber-50/50",
  };

  // @ts-ignore
  const theme = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group w-full"
    >
      <div className={cn(
        "flex items-center gap-5 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200",
        "transition-all duration-300 hover:bg-white hover:border-slate-300",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]",
        // Mobile: Always left aligned text, visual on right
        // Desktop: Mirrored (Left cards have visual on right, Right cards on left)
        "flex-row text-left lg:flex-row",
        isLeft ? "lg:flex-row-reverse lg:text-right" : "lg:flex-row lg:text-left"
      )}>
        
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className={cn("flex items-center gap-2 mb-1", isLeft && "lg:justify-end")}>
            <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
            {/* HUD Status Dot */}
            <div className={cn("w-2 h-2 rounded-full", theme.split(" ")[2].replace("text", "bg"))} />
          </div>
          
          <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
          
          {/* Tech Stats */}
          <div className={cn(
            "mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-slate-100",
            theme.split(" ")[3] // bg color
          )}>
            <span className={cn("text-[10px] font-mono font-bold uppercase tracking-wider", theme.split(" ")[2])}>{stats}</span>
            <BarChart2 className={cn("w-3 h-3", theme.split(" ")[2])} />
          </div>
        </div>

        {/* Visual Container */}
        <div className={cn(
          "relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white border p-2 overflow-hidden shadow-sm",
          "group-hover:shadow-md transition-all duration-300",
          theme.split(" ")[0] // Border color
        )}>
          {visual}
        </div>

        {/* Connection Anchor Point (Hidden on Mobile) */}
        <div className={cn(
          "hidden lg:block absolute top-1/2 w-2.5 h-2.5 rounded-full bg-white border-[3px] border-slate-300 z-20 shadow-sm",
          isLeft ? "-right-1.5" : "-left-1.5"
        )} />

      </div>
    </motion.div>
  );
};

// ==========================================
// 3. THE QUANTUM CORE (Light Mode Reactor)
// ==========================================

const QuantumCore = () => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            
            {/* Reactor Housing */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                
                {/* Outer Rotating Shield */}
                <motion.div 
                    className="absolute inset-0 rounded-full border border-slate-200 border-t-blue-400 border-b-blue-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner Counter-Rotating Shield */}
                <motion.div 
                    className="absolute inset-3 md:inset-4 rounded-full border border-slate-200 border-l-emerald-400 border-r-emerald-400"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Core Glow (Soft) */}
                <div className="absolute inset-0 bg-blue-100/50 blur-3xl rounded-full" />
                <div className="absolute inset-14 md:inset-20 bg-emerald-100/50 blur-2xl rounded-full" />

                {/* The Brain */}
                <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full border border-slate-100 flex items-center justify-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-slate-50" />
                    
                    {/* Hologram Effect */}
                    <div className="relative z-20">
                        <Brain className="w-10 h-10 md:w-14 md:h-14 text-slate-700" />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-400/20 to-transparent"
                            animate={{ top: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>

            {/* Pedestal UI */}
            <div className="mt-8 md:mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-slate-500 tracking-[0.2em]">SYSTEM ONLINE</span>
                </div>
                <div className="mt-2 md:mt-3 text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    QUANTUM<span className="text-blue-600">CORE</span>
                </div>
            </div>

        </div>
    );
}

// ==========================================
// 4. ALIGNED CONNECTION LINES (Fiber Optics)
// ==========================================

const ConnectionLines = () => {
    // Only visible on Desktop (lg and up)
    const lines = [
        // Left Side
        { d: "M 400 150 C 500 150, 500 400, 600 400", color: "#3b82f6", delay: 0 },   // Top
        { d: "M 400 400 C 500 400, 500 400, 600 400", color: "#6366f1", delay: 1 },   // Mid
        { d: "M 400 650 C 500 650, 500 400, 600 400", color: "#10b981", delay: 2 },   // Bot
        // Right Side
        { d: "M 800 150 C 700 150, 700 400, 600 400", color: "#0ea5e9", delay: 0.5 }, // Top
        { d: "M 800 400 C 700 400, 700 400, 600 400", color: "#f43f5e", delay: 1.5 }, // Mid
        { d: "M 800 650 C 700 650, 700 400, 600 400", color: "#f59e0b", delay: 2.5 }, // Bot
    ];

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
                <filter id="glow-light" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            {lines.map((line, i) => (
                <g key={i}>
                    <path d={line.d} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                    <motion.circle r="4" fill={line.color} filter="url(#glow-light)">
                        <animateMotion 
                            repeatCount="indefinite"
                            dur="3s"
                            path={line.d}
                            keyPoints={i < 3 ? "0;1" : "1;0"}
                            keyTimes="0;1"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1"
                            begin={`${line.delay}s`}
                        />
                    </motion.circle>
                </g>
            ))}
        </svg>
    )
}

// ==========================================
// 5. MAIN PAGE
// ==========================================

export default function SportsFeaturesSection() {
  const features = [
    // Left Column Data
    { id: "l1", title: "Velocity Tracking", description: "Real-time sprint metrics & load analysis.", visual: <VelocityVisual />, color: "cyan", stats: "36 KM/H" },
    { id: "l2", title: "Tactical Matrix", description: "Spatial dominance heatmaps.", visual: <TacticalVisual />, color: "indigo", stats: "98% ACC" },
    { id: "l3", title: "Global Scouting", description: "AI talent identification.", visual: <ScoutingVisual />, color: "emerald", stats: "50K DB" },
    // Right Column Data
    { id: "r1", title: "Computer Vision", description: "Auto-tagging match events.", visual: <VisionVisual />, color: "sky", stats: "10MS LAT" },
    { id: "r2", title: "Injury Guard", description: "Workload risk prediction.", visual: <HealthVisual />, color: "rose", stats: "LOW RISK" },
    { id: "r3", title: "Match Sim", description: "Predictive outcome engine.", visual: <PredictionVisual />, color: "amber", stats: "95% CONF" },
  ];

  return (
    <section className="relative w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Schematic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          {/* Soft Gradient Spots - Adjusted for mobile */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-100/40 rounded-full blur-[80px] md:blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-100/40 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-[1400px]">
        
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16 text-center">
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative z-10"
            >
                {/* Tech Label Top */}
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="h-px w-6 md:w-8 bg-slate-300" />
                    <span className="text-[9px] md:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.25em]">
                        System Architecture v3.0
                    </span>
                    <div className="h-px w-6 md:w-8 bg-slate-300" />
                </div>

                {/* Main Title */}
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                    The Nervous System of <br className="hidden md:block" />
                    <span className="relative px-2 md:px-3 inline-block whitespace-nowrap mt-1 md:mt-0">
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-emerald-100/50 -skew-x-6 rounded-sm border border-white/50 shadow-sm" />
                        <span className="relative z-10 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                            Modern Sports
                        </span>
                    </span>
                </h2>
                
                {/* Tech Label Bottom */}
                <div className="mt-4 flex justify-center">
                    <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-semibold text-slate-500 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        DATA STREAM ACTIVE
                    </div>
                </div>
            </motion.div>
        </div>

        {/* MAIN GRID LAYOUT */}
        {/* Mobile: 1 Col (Stack), Desktop: 3 Col (Left - Center - Right) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-x-12 gap-y-12 items-center">
            
            {/* SVG Connections Layer (Desktop Only) */}
            <div className="hidden lg:block absolute inset-0 -mx-10 -my-10 z-0">
                <ConnectionLines />
            </div>

            {/* Left Column (Aligned Right on Desktop) */}
            {/* Mobile: Order 2 (Below Core) */}
            <div className="flex flex-col gap-5 relative z-10 lg:pl-10 order-2 lg:order-1">
                {features.slice(0,3).map((f, i) => (
                    <FeatureCard key={i} {...f} delay={i * 0.15} side="left" />
                ))}
            </div>

            {/* Center Column (Fixed Width) */}
            {/* Mobile: Order 1 (Top) */}
            <div className="order-1 lg:order-2 relative z-10 w-full lg:w-[400px] h-[350px] md:h-[450px] lg:h-[600px] flex items-center justify-center shrink-0">
                 <QuantumCore />
            </div>

            {/* Right Column (Aligned Left on Desktop) */}
            {/* Mobile: Order 3 */}
            <div className="flex flex-col gap-5 relative z-10 lg:pr-10 order-3 lg:order-3">
                {features.slice(3,6).map((f, i) => (
                    <FeatureCard key={i} {...f} delay={0.4 + (i * 0.15)} side="right" />
                ))}
            </div>
        </div>

        {/* BOTTOM CTA */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 md:mt-24 text-center"
        >
            <button className="group relative px-10 py-4 md:px-12 md:py-5 bg-slate-900 text-white font-bold text-base md:text-lg rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 w-full md:w-auto max-w-xs md:max-w-none mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-3">
                    INITIALIZE SYSTEM <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-bold text-slate-400 tracking-wider">
                <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full" /> ENCRYPTED</span>
                <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full" /> 5MS LATENCY</span>
                <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> ONLINE</span>
            </div>
        </motion.div>

      </div>
    </section>
  );
}