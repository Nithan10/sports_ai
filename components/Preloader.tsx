"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Fake percentage counter logic
    const duration = 3000; // Total load time (3 seconds)
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // 2. Trigger the "onComplete" callback after duration + buffer
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, duration + 800); // 800ms buffer for user to see "100%"

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      // CHANGED: Animation properties for Fade In / Fade Out
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 overflow-hidden"
    >
      {/* --- BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          {/* Ensure your video file is named 'preloader.mp4' in the public folder */}
          <source src="/preloader.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
      </div>

      {/* --- CONTENT OVERLAY --- */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 w-full max-w-[500px] px-6">
        
        {/* Animated Percentage */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-end">
             <span className="text-8xl font-black text-white tracking-tighter tabular-nums">
              {Math.round(count)}
            </span>
            <span className="text-4xl font-bold text-blue-500 mb-2">%</span>
          </div>
          
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>

        {/* Loading Status Text */}
        <div className="grid grid-cols-3 gap-4 w-full text-xs font-medium text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <Activity className={`w-3 h-3 ${count > 30 ? "text-emerald-500" : "text-zinc-700"}`} />
                <span>Analytics</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
                <Zap className={`w-3 h-3 ${count > 60 ? "text-amber-500" : "text-zinc-700"}`} />
                <span>Live Data</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
                <ShieldCheck className={`w-3 h-3 ${count > 90 ? "text-blue-500" : "text-zinc-700"}`} />
                <span>Security</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}