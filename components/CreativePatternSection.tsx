"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, Zap, MessageSquare, Calendar, 
  Target, TrendingUp
} from "lucide-react";

// --- 1. Zone Efficiency ---
const ZoneEfficiency = () => {
  const zones = [
    { label: "Penalty", val: "88%", size: "w-[240px] h-[120px]", color: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", z: 10 },
    { label: "Inside Box", val: "65%", size: "w-[180px] h-[90px]", color: "bg-emerald-100", border: "border-emerald-300", text: "text-emerald-900", z: 20 },
    { label: "Outside Box", val: "42%", size: "w-[120px] h-[60px]", color: "bg-emerald-500", border: "border-emerald-600", text: "text-white", z: 30 },
    { label: "Free Kick", val: "31%", size: "w-[60px] h-[30px]", color: "bg-lime-400", border: "border-lime-500", text: "text-slate-900", z: 40 },
  ];

  return (
    <div className="relative h-48 w-full flex items-end justify-center overflow-hidden mb-2">
      {zones.map((zone, i) => (
        <motion.div
          key={i}
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.15, type: "spring" }}
          style={{ zIndex: zone.z }}
          className={`absolute rounded-t-full flex flex-col items-center justify-start pt-2 border-t border-l border-r shadow-sm ${zone.size} ${zone.color} ${zone.border} ${zone.text}`}
        >
          <span className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">{zone.label}</span>
          <span className="text-sm font-black">{zone.val}</span>
        </motion.div>
      ))}
      <div className="absolute bottom-0 text-xs font-bold text-slate-400 mb-1 tracking-widest opacity-50">SHOOTING ZONES</div>
    </div>
  );
};

// --- 2. Win Probability Gauge ---
const WinProbability = () => {
  const radius = 70;
  const circumference = Math.PI * radius; 
  const progress = 0.84; // 84%

  return (
    <div className="relative flex flex-col items-center justify-center pt-4">
      <svg width="160" height="90" viewBox="0 0 160 90">
        {/* Background Track */}
        <path
          d="M 10 80 A 70 70 0 0 1 150 80"
          fill="none"
          stroke="#e2e8f0" // Slate-200
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Fill Track */}
        <motion.path
          d="M 10 80 A 70 70 0 0 1 150 80"
          fill="none"
          stroke="#10b981" // Emerald-500
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - progress) }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute top-10 text-center">
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex flex-col"
        >
            <span className="text-4xl font-black text-slate-900 leading-none tracking-tighter">84<span className="text-base text-emerald-600">%</span></span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Win Chance</span>
        </motion.div>
      </div>
    </div>
  );
};

// --- 3. Momentum Chart ---
const MatchMomentumChart = () => {
  return (
    <div className="relative h-48 w-full mt-2 bg-slate-50 rounded-2xl p-4 border border-slate-200">
      <div className="absolute top-4 right-4 text-right">
        <div className="flex items-center gap-2 text-rose-500">
            <Activity size={14} className="animate-pulse" />
            <p className="text-xs font-bold">178 BPM</p>
        </div>
        <p className="text-[10px] text-slate-400 font-medium">Peak Intensity</p>
      </div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-5 pointer-events-none">
         <div className="border-b border-slate-900 w-full h-full"></div>
         <div className="border-b border-slate-900 w-full h-full"></div>
         <div className="border-b border-slate-900 w-full h-full"></div>
      </div>

      <svg className="h-full w-full pt-6" viewBox="0 0 400 120" preserveAspectRatio="none">
        <defs>
            <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
        </defs>
        <motion.path
          d="M0,80 L40,75 L80,90 L120,40 L160,50 L200,20 L240,45 L280,30 L320,60 L360,10 L400,50"
          fill="none"
          stroke="url(#gradientLine)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="400" cy="50" r="5" fill="#f43f5e"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="shadow-md"
        />
        <motion.path
           d="M0,80 L40,75 L80,90 L120,40 L160,50 L200,20 L240,45 L280,30 L320,60 L360,10 L400,50 V150 H0 Z"
           fill="url(#gradientLine)"
           className="opacity-5"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 0.05 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5, duration: 1 }}
        />
      </svg>
      <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mt-2 uppercase">
        <span>0'</span><span>15'</span><span>30'</span><span>45'</span><span>60'</span><span>75'</span><span>90'</span>
      </div>
    </div>
  );
};

// --- Main Dashboard Layout ---
export default function SportsAnalyticsDashboardLight() {
  return (
    <section className="w-full bg-[#F8FAFC] font-sans flex text-slate-900 selection:bg-emerald-100 pb-20 pt-8">
      
      {/* Hide Scrollbar Style Injection */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main Content Container - Centered */}
      <div className="w-full max-w-[1400px] mx-auto p-4 lg:p-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Matchday Analysis</h1>
                <p className="text-slate-500 text-sm font-medium">Real-time telemetry • Final vs. Rivals FC</p>
            </div>
            
            {/* CLEAN ACTION AREA (Removed Search & Toolbar) */}
            <div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white pl-4 pr-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2 active:scale-95">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Live Feed
                </button>
            </div>
        </header>

        {/* Top Metric Bar */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {['Pitch Control: 62%', 'xG: 2.45', 'Distance: 112km', 'Passing: 89%'].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm whitespace-nowrap text-xs font-bold text-slate-600">
              <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-indigo-500'} animate-pulse`} />
              {feature}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Column 1: Efficiency & Probability */}
          <div className="lg:col-span-4 space-y-6">
            {/* Zone Efficiency Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/60 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6 relative z-10">
                  <h3 className="font-bold text-slate-900">Shot Accuracy</h3>
                  <Target size={18} className="text-emerald-500" />
              </div>
              <ZoneEfficiency />
            </div>

            {/* Win Probability Card */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/60">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="font-bold text-slate-900">Match Prediction</h3>
                 <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 border border-slate-200 font-bold">AI Model v2.1</span>
              </div>
              <WinProbability />
              <div className="mt-4 flex justify-center gap-8 text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Win</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300" /> Draw</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-900" /> Loss</div>
              </div>
            </div>
          </div>

          {/* Column 2: AI Coach & Momentum */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI Coach Chat Interface */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/60 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200">
                   <MessageSquare size={18} />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 leading-tight">AI Tactician</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Online • Analysis Mode</p>
                 </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <motion.div 
                    initial={{x: -20, opacity: 0}} whileInView={{x: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.2}}
                    className="bg-slate-100 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-700 w-[90%]"
                >
                  <p>Right flank is exposed. Opponent #7 is fatigued. Suggest swapping Wingers to exploit space?</p>
                </motion.div>
                <motion.div 
                    initial={{x: 20, opacity: 0}} whileInView={{x: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.5}}
                    className="bg-indigo-600 p-4 rounded-2xl rounded-tr-sm text-sm text-white w-[85%] ml-auto shadow-md shadow-indigo-200"
                >
                  Confirm sub. Analyze potential impact on defense?
                </motion.div>
              </div>

              <div className="relative">
                <input className="w-full bg-slate-50 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-900 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400" placeholder="Ask for tactical insights..." />
                <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                    <TrendingUp size={16} />
                </button>
              </div>
            </div>

            {/* Momentum Chart */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/60">
              <div className="flex justify-between items-end mb-2">
                 <h3 className="font-bold text-slate-900">Team Momentum</h3>
                 <div className="flex gap-2 text-[10px] font-bold">
                    <span className="text-emerald-500">ATT</span>
                    <span className="text-rose-500">DEF</span>
                    <span className="text-blue-500">MID</span>
                 </div>
              </div>
              <MatchMomentumChart />
            </div>
          </div>

          {/* Column 3: Schedule & Status */}
          <div className="lg:col-span-3 space-y-6">
              {/* Fixture Calendar */}
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/60">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-slate-400"/> Upcoming
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">October</span>
                  <span className="text-[10px] text-emerald-600 font-bold cursor-pointer hover:underline">View All</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                   {[12, 13, 14, 15].map((d, i) => (
                      <div key={i} className={`flex flex-col items-center p-2 rounded-xl border transition-all ${i === 2 ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-300 scale-110 z-10' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                         <p className={`text-[9px] uppercase font-bold mb-1 ${i===2?'opacity-70':'opacity-50'}`}>{['Sat', 'Sun', 'Mon', 'Tue'][i]}</p>
                         <p className="text-lg font-black">{d}</p>
                         {i===2 && <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1" />}
                      </div>
                   ))}
                </div>
                {/* Upcoming Match Mini-Card */}
                <div className="mt-4 bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">U</div>
                        <span className="text-xs font-bold text-slate-700">vs United</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">20:45</span>
                </div>
              </div>

              {/* Player Status / Automation Card */}
              <div className="bg-slate-900 p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl shadow-slate-300">
                <div className="relative z-10">
                   <div className="flex justify-between items-start">
                        <Activity className="text-rose-400 mb-6" size={32} />
                        <span className="bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold px-2 py-1 rounded">HIGH RISK</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Physio Report</p>
                   <h3 className="text-2xl font-bold mb-4 leading-tight">Load Mgmt <br/>Required</h3>
                   <button className="bg-white hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold text-xs transition-colors w-full shadow-lg">View Medical</button>
                </div>
                {/* Abstract Visuals */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
                    <Activity size={120} />
                </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}