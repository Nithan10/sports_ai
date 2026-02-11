"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, Trophy, Send, Sparkles, 
  Target, Flame, Activity, Wifi, Battery
} from "lucide-react";

export default function SportsPerformanceDashboard() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F8FAFC] p-4 font-sans">
      
      {/* --- Main Layout Container --- */}
      <div className="relative flex h-[850px] w-full max-w-[1400px] items-center justify-center">
        
        {/* --- 1. Performance Goals (Floating Left) --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-[2%] xl:left-[5%] top-[10%] z-40 w-[340px] rounded-[40px] bg-white/90 p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl border border-slate-100"
        >
          <h3 className="mb-8 text-2xl font-bold text-slate-900 tracking-tight">Active Goals</h3>
          
          <div className="space-y-6">
            <div className="group rounded-[32px] bg-white p-6 shadow-sm border border-slate-50 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">Endurance</p>
                  <p className="mt-1 text-3xl font-black text-slate-900">42.2 <span className="text-sm font-medium text-slate-400">km</span></p>
                  <p className="mt-1 text-xs text-slate-400">Marathon Prep • Week 8</p>
                </div>
                <GoalProgressIcon progress={85} color="#3B82F6" icon={<Activity size={24}/>} />
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-6 shadow-sm border border-slate-50 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-orange-500 uppercase tracking-wider">Strength</p>
                  <p className="mt-1 text-3xl font-black text-slate-900">120 <span className="text-sm font-medium text-slate-400">kg</span></p>
                  <p className="mt-1 text-xs text-slate-400">Deadlift Target • 1RM</p>
                </div>
                <GoalProgressIcon progress={60} color="#F97316" icon={<Trophy size={24}/>} />
              </div>
            </div>

            <div className="flex h-24 w-full items-center justify-center gap-3 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-100 cursor-pointer transition-colors">
               <Plus size={20} className="text-slate-400" />
               <span className="text-sm font-bold text-slate-400 uppercase tracking-tight">Add Routine</span>
            </div>
          </div>
        </motion.div>

        {/* --- 2. Real iPhone Pro Mockup (The Hub) --- */}
        <div className="relative z-10 h-[780px] w-[380px] flex items-center justify-center">
          
          {/* Hardware: Outer Titanium Frame */}
          <div className="absolute inset-0 rounded-[60px] border-[1px] border-slate-400/30 bg-[#1c1c1e] shadow-2xl shadow-black/40">
            {/* Side Buttons (Physical) */}
            <div className="absolute top-32 -left-[3px] h-8 w-[3px] rounded-l-md bg-slate-700" /> {/* Action Button */}
            <div className="absolute top-48 -left-[3px] h-14 w-[3px] rounded-l-md bg-slate-700" /> {/* Vol Up */}
            <div className="absolute top-64 -left-[3px] h-14 w-[3px] rounded-l-md bg-slate-700" /> {/* Vol Down */}
            <div className="absolute top-52 -right-[3px] h-24 w-[3px] rounded-r-md bg-slate-700" /> {/* Power */}
          </div>

          {/* Hardware: Inner Display Bezel */}
          <div className="absolute inset-[4px] rounded-[56px] bg-black p-[10px]">
            
            {/* The Screen Area */}
            <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-white">
              
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 z-50 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black flex items-center justify-end pr-3">
                <div className="h-3 w-3 rounded-full bg-[#1a1a1a] border border-slate-800" />
              </div>

              {/* Status Bar */}
              <div className="flex justify-between px-8 pt-5 text-slate-900 font-bold text-[13px]">
                <span>9:41</span>
                <div className="flex gap-1.5 items-center">
                  <Wifi size={14} />
                  <Battery size={18} />
                </div>
              </div>

              {/* App Content */}
              <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center pb-20">
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="mb-6 flex h-24 w-24 items-center justify-center rounded-[30%] bg-blue-600 text-white shadow-2xl shadow-blue-400/40"
                >
                  <Trophy size={48} />
                </motion.div>
                <h1 className="text-6xl font-black text-slate-900 tracking-tighter">ULTRA</h1>
                <p className="mt-3 text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] bg-blue-50 px-3 py-1 rounded-full">Performance Lab</p>
                
                {/* Visual Glass Reflection Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. Intensity Card (Floating Right Top) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-[2%] xl:right-[5%] top-[15%] z-40 w-[440px] rounded-[40px] bg-white p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-slate-50"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-500">
              <Flame size={20} />
            </div>
            <p className="text-xl font-bold text-slate-900 tracking-tight">Weekly Intensity</p>
          </div>
          
          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-5xl font-black text-slate-900 tracking-tight">3,840</p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Active Calories (kcal)</p>
            </div>
            
            <div className="flex items-end gap-3 h-32">
              <Bar height="30%" color="#F1F5F9" />
              <Bar height="90%" color="#3B82F6" />
              <Bar height="55%" color="#F1F5F9" />
              <Bar height="75%" color="#34D399" isGradient />
              <Bar height="40%" color="#F1F5F9" />
              <Bar height="100%" color="#1D4ED8" />
            </div>
          </div>
        </motion.div>

        {/* --- 4. AI Coach Card (Floating Right Bottom) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-[10%] bottom-[12%] z-50 w-[300px] rounded-[40px] bg-slate-900 p-8 shadow-2xl border border-slate-800"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white">
                <Sparkles size={28} />
              </div>
            </div>
            
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-6 opacity-50">AI Coach Active</p>
            
            <div className="flex w-full items-center justify-between rounded-full bg-slate-800 border border-slate-700 p-1.5 pl-4 shadow-inner">
              <span className="text-xs text-slate-500 font-medium tracking-tight">Analyze form...</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                <Send size={16} fill="currentColor" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// --- Sub-components ---

function GoalProgressIcon({ progress, color, icon }: { progress: number; color: string; icon: React.ReactNode }) {
  const dash = 150;
  const offset = dash - (dash * progress) / 100;
  
  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg className="absolute h-full w-full -rotate-90">
        <circle cx="32" cy="32" r="28" fill="transparent" stroke="#F1F5F9" strokeWidth="6" />
        <circle 
          cx="32" cy="32" r="28" fill="transparent" 
          stroke={color} strokeWidth="6" 
          strokeDasharray={dash} strokeDashoffset={offset} 
          strokeLinecap="round" 
        />
      </svg>
      <div className="z-10 text-slate-800">{icon}</div>
    </div>
  );
}

function Bar({ height, color, isGradient = false }: { height: string; color: string; isGradient?: boolean }) {
  return (
    <div 
      className="w-8 rounded-full transition-all duration-700 ease-out" 
      style={{ 
        height: height, 
        backgroundColor: isGradient ? undefined : color,
        backgroundImage: isGradient ? 'linear-gradient(to top, #059669, #10B981)' : undefined
      }} 
    />
  );
}