"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Zap, Trophy, Target, BarChart3, Users, Clock, 
  Shield, Timer, Award, ChevronRight, PlayCircle, Wifi, Battery
} from "lucide-react";

// --- 1. Content Configuration ---
const STEPS = [
  {
    id: "step-1",
    stepLabel: "Step 1",
    title: "Import Match Data",
    description: "Sync data directly from wearable vests, video feeds, and official league APIs in real-time.",
    content: <ScreenMatchData />,
  },
  {
    id: "step-2",
    stepLabel: "Step 2",
    title: "Analyze Performance",
    description: "Track player heatmaps, sprint speeds, and passing accuracy with granular precision.",
    content: <ScreenPlayerStats />,
  },
  {
    id: "step-3",
    stepLabel: "Step 3",
    title: "AI Strategy Tips",
    description: "Get predictive insights on opponent weaknesses and substitution timings to win the game.",
    content: <ScreenAIStrategy />,
  },
];

// --- 2. Main Component ---
export default function NovaScrollSection() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="bg-white font-sans w-full">
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        
        <div className="flex items-start">
          
          {/* --- Left Column: Scrolling Text --- */}
          <div className="w-full md:w-1/2 py-[20vh] pb-[50vh]">
            {STEPS.map((step, index) => (
              <div 
                key={step.id} 
                className="flex h-[80vh] flex-col justify-center p-4"
              >
                <motion.div
                  initial={{ opacity: 0.2, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.5, margin: "-100px 0px -100px 0px" }} 
                  transition={{ duration: 0.5 }}
                  onViewportEnter={() => setActiveCard(index)} 
                >
                  <span className="mb-4 block text-lg font-medium text-blue-600">
                    {step.stepLabel}
                  </span>
                  <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                    {step.title}
                  </h2>
                  <p className="max-w-md text-lg leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* --- Right Column: Realistic iPhone Mockup --- */}
          {/* FIXED: Changed top-0 to top-24 and h-screen to calculated height to clear the Navbar */}
          <div className="hidden w-1/2 sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center md:flex">
            
            {/* Phone Container - Scaled slightly to fit 100vh comfortably */}
            <div className="relative h-[720px] w-[350px] scale-90 xl:scale-100 origin-center transition-transform duration-300">
              
              {/* --- 1. Titanium Frame Body --- */}
              <div className="absolute inset-0 z-10 rounded-[55px] border-[1px] border-slate-700/40 bg-[#1c1c1e] shadow-2xl">
                 {/* Matte Texture Overlay */}
                 <div className="absolute inset-0 rounded-[55px] bg-[#222] opacity-80 mix-blend-multiply" />
                 
                 {/* Side Metallic Shine */}
                 <div className="absolute inset-0 rounded-[55px] ring-1 ring-inset ring-slate-500/20" />
              </div>

              {/* --- 2. Screen Bezel (Black Border) --- */}
              <div className="absolute inset-[3px] z-20 rounded-[52px] bg-black border-[6px] border-[#121212]" />

              {/* --- 3. Buttons --- */}
              {/* Action Button */}
              <div className="absolute top-28 -left-[6px] h-7 w-[3px] rounded-l-md bg-[#2d2d30] shadow-sm z-0" />
              {/* Volume Up */}
              <div className="absolute top-44 -left-[6px] h-12 w-[3px] rounded-l-md bg-[#2d2d30] shadow-sm z-0" />
              {/* Volume Down */}
              <div className="absolute top-60 -left-[6px] h-12 w-[3px] rounded-l-md bg-[#2d2d30] shadow-sm z-0" />
              {/* Power Button */}
              <div className="absolute top-48 -right-[6px] h-20 w-[3px] rounded-r-md bg-[#2d2d30] shadow-sm z-0" />

              {/* --- 4. Dynamic Island --- */}
              <div className="absolute top-7 left-1/2 z-50 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black flex items-center justify-end pr-3">
                  {/* Selfie Cam & FaceID Sensors */}
                  <div className="h-3 w-3 rounded-full bg-[#1a1a1a]" />
              </div>

              {/* --- 5. Screen Content --- */}
              <div className="absolute inset-[10px] z-30 overflow-hidden rounded-[44px] bg-slate-50">
                
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 z-50 flex justify-between px-8 pt-4 text-slate-900 font-semibold text-[13px]">
                   <span>9:41</span>
                   <div className="flex gap-2 items-center">
                      <Activity size={14} />
                      <Wifi size={14} />
                      <Battery size={20} />
                   </div>
                </div>

                {/* Main Content Animation Area */}
                <div className="h-full w-full pt-14 pb-8 px-5 overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCard}
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="h-full w-full"
                    >
                      {STEPS[activeCard].content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* Background Glow Effect */}
            <AnimatePresence mode="wait">
                 <motion.div 
                    key={activeCard}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-25 ${
                        activeCard === 0 ? "bg-blue-400" :
                        activeCard === 1 ? "bg-purple-400" :
                        "bg-teal-400"
                    }`} 
                 />
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- 3. Screen Components (Sports Analytics Themed) ---

// SCREEN 1: Match Data Import
function ScreenMatchData() {
  return (
    <div className="flex flex-col h-full space-y-6 pt-2">
      {/* Live Match Card */}
      <div className="w-full rounded-[32px] bg-slate-900 p-6 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10" />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <span className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            Live
          </span>
          <span className="text-[10px] text-slate-400 font-mono border border-slate-700 px-2 py-1 rounded-full">GW 24</span>
        </div>
        
        <div className="flex items-center justify-between mb-4 relative z-10 px-2">
            <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-slate-900 font-black">MU</span>
                </div>
                <h3 className="text-lg font-bold">MUN</h3>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-4xl font-black text-white tracking-tighter">2 : 1</div>
                <div className="text-[10px] text-slate-400 mt-1">45+2'</div>
            </div>
            <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-white font-black">CH</span>
                </div>
                <h3 className="text-lg font-bold">CHE</h3>
            </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-blue-500 h-1.5 rounded-full w-[65%]" />
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-2">Possession</p>
      </div>

      {/* Data Sources List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Active Streams</h3>
        
        {/* Source 1 */}
        <div className="flex items-center justify-between rounded-[24px] bg-white p-4 shadow-sm border border-slate-100/60">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">GPS Vests</p>
              <p className="text-[11px] text-slate-400 font-medium">Receiving telemetry...</p>
            </div>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        </div>

        {/* Source 2 */}
        <div className="flex items-center justify-between rounded-[24px] bg-white p-4 shadow-sm border border-slate-100/60">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <PlayCircle size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Opta Vision</p>
              <p className="text-[11px] text-slate-400 font-medium">Event Stream 4K</p>
            </div>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        </div>
        
        <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-[20px] border border-dashed border-slate-300 py-4 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
          + Add Source
        </button>
      </div>
    </div>
  );
}

// SCREEN 2: Player Analysis
function ScreenPlayerStats() {
  return (
    <div className="flex flex-col h-full pt-2">
      <div className="mb-6 flex justify-between items-end">
        <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Analytics</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Real-time player tracking</p>
        </div>
        <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                <ChevronRight size={16} />
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Player 1 */}
        <div className="flex items-center justify-between rounded-[24px] bg-white p-3 pr-5 shadow-sm border border-slate-100/60">
          <div className="flex items-center gap-4">
            <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                    {/* Placeholder Avatar */}
                    <div className="h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-bold border-2 border-white">10</div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">M. Rashford</p>
              <p className="text-[11px] text-slate-400 font-medium">Forward • 11.2km</p>
            </div>
          </div>
          <div className="text-right">
             <span className="block text-lg font-black text-green-600">9.2</span>
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex items-center justify-between rounded-[24px] bg-white p-3 pr-5 shadow-sm border border-slate-100/60">
          <div className="flex items-center gap-4">
            <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-bold border-2 border-white">8</div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">B. Fernandes</p>
              <p className="text-[11px] text-slate-400 font-medium">Midfielder • 10.8km</p>
            </div>
          </div>
          <div className="text-right">
             <span className="block text-lg font-black text-green-600">8.7</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-[24px] bg-orange-50/50 p-4 border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-orange-100 rounded-lg">
                         <Zap size={14} className="text-orange-600" />
                    </div>
                    <span className="text-[11px] font-bold text-orange-800 uppercase">Speed</span>
                </div>
                <p className="text-2xl font-black text-slate-900">34.2 <span className="text-xs font-bold text-slate-400">km/h</span></p>
            </div>
            <div className="rounded-[24px] bg-blue-50/50 p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                         <Target size={14} className="text-blue-600" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-800 uppercase">xG</span>
                </div>
                <p className="text-2xl font-black text-slate-900">2.45</p>
            </div>
        </div>
      </div>
    </div>
  );
}

// SCREEN 3: AI Strategy Tips
function ScreenAIStrategy() {
  return (
    <div className="flex flex-col h-full relative items-center justify-center pt-8">
      
      {/* Central Animated Orb */}
      <div className="relative mb-14 scale-110">
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-20px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 blur-2xl"
        />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-slate-100">
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent bg-gradient-to-tr from-indigo-500 to-blue-600 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]" />
            <Trophy className="h-14 w-14 text-indigo-600 drop-shadow-sm" />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
             <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">AI Coach Active</span>
        </div>
      </div>

      {/* Floating Chat Bubbles */}
      <div className="w-full space-y-4 px-1">
        
        {/* Tip 1 */}
        <motion.div 
            initial={{ opacity: 0, y: 20, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="ml-auto w-full"
        >
            <div className="rounded-[24px] rounded-tr-md bg-white p-5 shadow-lg shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">Tactical Alert</span>
                </div>
                <p className="text-sm font-medium text-slate-700 leading-snug">
                    Opponent's left flank is tiring. Recommend subbing in a winger now.
                </p>
            </div>
        </motion.div>

        {/* Tip 2 */}
        <motion.div 
            initial={{ opacity: 0, y: 20, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="ml-auto w-full"
        >
            <div className="rounded-[24px] rounded-tr-md bg-white p-5 shadow-lg shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wide">Prediction</span>
                </div>
                <p className="text-sm font-medium text-slate-700 leading-snug">
                    High probability of conceding from set-pieces in next 10 mins.
                </p>
            </div>
        </motion.div>
        
        {/* Bot Response indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2 }}
           className="mr-auto mt-6 flex items-center gap-3 pl-2"
        >
            <div className="flex space-x-1.5">
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="h-2 w-2 rounded-full bg-indigo-400" />
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="h-2 w-2 rounded-full bg-indigo-400" />
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="h-2 w-2 rounded-full bg-indigo-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400">Analyzing...</span>
        </motion.div>
      </div>
    </div>
  );
}