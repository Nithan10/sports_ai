import React from "react";
import { cn } from "@/lib/utils";

export const Iphone = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative z-0 h-[650px] w-[320px] shrink-0", // Adjusted dimensions for realistic aspect ratio
          className
        )}
        {...props}
      >
        {/* --- SHADOWS & OUTER GLOW --- */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-[80%] bg-black/40 blur-[80px] -z-10"></div>

        {/* --- CHASSIS (TITANIUM FRAME) --- */}
        <div className="absolute inset-0 z-10 rounded-[55px] bg-[#282828] shadow-[inset_0_0_4px_2px_rgba(255,255,255,0.1),0_0_0_1px_rgba(0,0,0,1)] ring-1 ring-white/10">
          
          {/* Subtle metallic gradient on the frame */}
          <div className="absolute inset-0 rounded-[55px] bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-800 opacity-80"></div>
          
          {/* Antenna Lines (The plastic breaks in the metal) */}
          <div className="absolute top-20 -left-[1px] h-3 w-[2px] bg-zinc-900/40"></div>
          <div className="absolute top-20 -right-[1px] h-3 w-[2px] bg-zinc-900/40"></div>
          <div className="absolute bottom-20 -left-[1px] h-3 w-[2px] bg-zinc-900/40"></div>
          <div className="absolute bottom-20 -right-[1px] h-3 w-[2px] bg-zinc-900/40"></div>
        </div>

        {/* --- PHYSICAL BUTTONS --- */}
        {/* Left Side: Action Button + Volume */}
        <div className="absolute top-28 -left-[4px] h-8 w-[4px] rounded-l-md bg-zinc-600 shadow-sm border-r border-zinc-800"></div> {/* Action Btn */}
        <div className="absolute top-44 -left-[4px] h-12 w-[4px] rounded-l-md bg-zinc-600 shadow-sm border-r border-zinc-800"></div> {/* Vol Up */}
        <div className="absolute top-60 -left-[4px] h-12 w-[4px] rounded-l-md bg-zinc-600 shadow-sm border-r border-zinc-800"></div> {/* Vol Down */}

        {/* Right Side: Power Button */}
        <div className="absolute top-48 -right-[4px] h-20 w-[4px] rounded-r-md bg-zinc-600 shadow-sm border-l border-zinc-800"></div>

        {/* --- BEZEL & SCREEN CONTAINER --- */}
        <div className="absolute inset-[4px] z-20 rounded-[50px] border-[6px] border-[#121212] bg-black overflow-hidden shadow-2xl">
          
          {/* --- DYNAMIC ISLAND --- */}
          <div className="absolute top-3 left-1/2 z-50 h-[30px] w-[110px] -translate-x-1/2 rounded-[24px] bg-black flex items-center justify-end pr-3 group cursor-pointer transition-all duration-300 hover:w-[130px]">
            {/* Selfie Camera Lens */}
            <div className="h-3 w-3 rounded-full bg-[#1a1a1a] ring-1 ring-white/5 flex items-center justify-center overflow-hidden">
               <div className="h-1.5 w-1.5 rounded-full bg-[#0f0f2da0] shadow-[inset_0_0_2px_rgba(255,255,255,0.3)]"></div>
            </div>
            {/* FaceID Sensor (Hidden/Subtle) */}
            <div className="absolute left-4 h-2 w-2 rounded-full bg-[#111] opacity-60"></div>
          </div>

          {/* --- SCREEN CONTENT AREA --- */}
          <div className="relative h-full w-full bg-zinc-950 rounded-[44px] overflow-hidden">
             {/* Content Scroll Wrapper */}
             <div className="h-full w-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-8">
                {children}
             </div>

             {/* --- HOME INDICATOR --- */}
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 h-1.5 w-32 rounded-full bg-white/40 backdrop-blur-md shadow-sm"></div>
          </div>

          {/* --- SCREEN REFLECTIONS (The "Glass" Look) --- */}
          {/* Top Right Glare */}
          <div className="pointer-events-none absolute -top-20 -right-20 z-40 h-[200px] w-[200px] bg-white/5 blur-[60px] rounded-full mix-blend-overlay"></div>
          {/* Overall Glass Sheen */}
          <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent rounded-[44px]"></div>
          {/* Inner Bezel Shadow for depth */}
          <div className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-[44px]"></div>
        </div>
      </div>
    );
  }
);
Iphone.displayName = "Iphone";