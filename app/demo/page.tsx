// app/demo/page.tsx

import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Navbar } from "@/components/Navbar"; 
import { Footer } from "@/components/Footer"; // <--- 1. Import Footer

export default function DemoPage() {
  return (
    // Added flex flex-col to ensure proper vertical stacking
    <main className="min-h-screen w-full bg-slate-50 selection:bg-blue-500/20 flex flex-col">
      
      {/* Navbar Component */}
      <Navbar />

      {/* Background Gradients (adjusted for light mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-32 pb-20 flex-grow">
        
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Demo v1.0
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Football Analytics</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 mb-8 leading-relaxed">
            Experience the future of fantasy football. Our AI-driven engine processes over 5,000 data points per match to give you the winning edge.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {/* Dark button for contrast */}
            <InteractiveHoverButton className="w-40 rounded-full font-bold bg-slate-900 text-white hover:bg-slate-800 border-none">
              Get Started
            </InteractiveHoverButton>
            
            <Link href="/" className="flex items-center justify-center w-40 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-sm transition-all">
              Back Home
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">xG Analytics</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-time expected goals (xG) models updated every 30 seconds during live matches.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Flash Trends</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Spot rising stars before the market catches on with our momentum tracking algorithm.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Squad Health</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Direct feeds from club physios to predict injury returns with 94% accuracy.
            </p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 md:p-12 relative overflow-hidden shadow-lg">
           {/* Subtle gradient overlay */}
           <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to dominate your league?</h2>
                <p className="text-slate-600">Join 50,000+ managers using Football Hub today.</p>
              </div>
              <button className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                Start Free Trial
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

      </div>

      {/* 2. Add Footer Component */}
      <Footer />

    </main>
  );
}