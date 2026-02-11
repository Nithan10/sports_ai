"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// --- Configuration ---
// "Pro" Layout: varying sizes, angles, AND distances (radius) for a 3D depth effect.
const USERS = [
  // 1. Top Left (Main Focus) - Large, Close
  { id: 1, src: "/pos1.jpg", alt: "Star Striker", angle: 220, initialRotation: 0, size: 290, distance: 550 },
  // 2. Top Right - Medium, Far
  { id: 2, src: "/pos2.jpg", alt: "Head Coach", angle: 310, initialRotation: 2, size: 190, distance: 500 },
  // 3. Right - Medium, Close
  { id: 3, src: "/pos3.jpeg", alt: "Team Captain", angle: 10, initialRotation: -2, size: 240, distance: 600 },
  // 4. Bottom Right - Small, Far
  { id: 4, src: "/pos4.jpeg", alt: "Academy Prospect", angle: 50, initialRotation: 1, size: 180, distance: 450 },
  // 5. Bottom Left - Large, Close
  { id: 5, src: "/pos5.jpeg", alt: "Goalkeeper", angle: 140, initialRotation: -1, size: 260, distance: 580 },
  // 6. Left - Smallest, Very Far
  { id: 6, src: "/pos6.jpeg", alt: "Data Analyst", angle: 185, initialRotation: 3, size: 160, distance: 480 },
  // 7. NEW: Top Center-Right - Small, Floating High
  { id: 7, src: "/pos1.jpg", alt: "Scout", angle: 280, initialRotation: -3, size: 150, distance: 650 },
  // 8. NEW: Bottom Center - Medium, Low
  { id: 8, src: "/pos2.jpg", alt: "Physio", angle: 100, initialRotation: 2, size: 210, distance: 520 },
];

export default function EmpowerSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  // Content Animation
  const contentOpacity = useTransform(smoothProgress, [0.05, 0.45], [0, 1]);
  const contentScale = useTransform(smoothProgress, [0.05, 0.45], [0.8, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#F8F9FB]">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* --- Background Concentric Circles --- */}
        {/* Made these slightly larger to accommodate the "Galaxy" spread */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div className="absolute w-[650px] h-[650px] md:w-[1000px] md:h-[1000px] rounded-full border-[1.5px] border-blue-200 shadow-[0_0_60px_rgba(59,130,246,0.1)] opacity-60" />
          <div className="absolute w-[500px] h-[500px] md:w-[750px] md:h-[750px] rounded-full border-[1.5px] border-blue-300 shadow-[0_0_40px_rgba(59,130,246,0.15)] opacity-70" />
          <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border-[2px] border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] opacity-80" />
        </div>

        {/* --- Center Content (Orb + Text) --- */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl px-4 pointer-events-none">
            <motion.div 
                style={{ opacity: contentOpacity, scale: contentScale }}
                className="flex flex-col items-center"
            >
                {/* 3D Orb */}
                <div className="w-20 h-20 mb-6 rounded-full relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-blue-600 shadow-[0_10px_30px_rgba(59,130,246,0.4)]" />
                    <div className="absolute top-2 left-4 w-6 h-4 rounded-full bg-white/40 blur-[2px]" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20 opacity-80" />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-[#1a1a1a] tracking-tight leading-[1.1] mb-6">
                    Empowering <br /> Every Match
                </h1>
                
                <p className="text-gray-500 text-xl md:text-2xl max-w-xl mx-auto leading-relaxed">
                    From grassroots talents to elite managers, Football Hub provides the data to win.
                </p>
            </motion.div>
        </div>

        {/* --- Orbiting User Images --- */}
        <div className="absolute flex items-center justify-center z-20 w-full h-full pointer-events-none">
          {USERS.map((user, index) => (
            <OrbitingItem
              key={user.id}
              user={user}
              index={index}
              total={USERS.length}
              progress={smoothProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Component for individual items ---
interface OrbitingItemProps {
  user: typeof USERS[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const OrbitingItem = ({ user, index, total, progress }: OrbitingItemProps) => {
  // 1. Calculate Offset based on THIS SPECIFIC image size
  const offset = user.size / 2;

  // 2. Calculate Target Position using the UNIQUE DISTANCE for each user
  const angleRad = (user.angle * Math.PI) / 180;
  // Use user.distance instead of a global constant
  const orbitX = Math.cos(angleRad) * user.distance - offset;
  const orbitY = Math.sin(angleRad) * user.distance - offset;

  // 3. Timing Window
  // Stagger slightly so smaller/further items might arrive a split second later for "depth"
  const start = 0;
  const end = 0.45 + (index * 0.015);

  // 4. Map Scroll Progress
  const x = useTransform(progress, [start, end], [-offset, orbitX]);
  const y = useTransform(progress, [start, end], [-offset, orbitY]);

  // Rotation
  const rotate = useTransform(progress, [start, end], [user.initialRotation, 0]);

  // Scale (Start small in stack, grow to full size)
  const scale = useTransform(progress, [start, end], [0.5, 1]);
  
  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        width: user.size, 
        height: user.size, 
        left: "50%",
        top: "50%",
        zIndex: total - index, 
      }}
      className="absolute will-change-transform"
    >
      <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-white border-[6px] border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)]">
        <Image
          src={user.src}
          alt={user.alt}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
};