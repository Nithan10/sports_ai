"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Configuration: Visuals ---
const LANDSCAPES = [
  "https://www.international-football-institute.com/wp-content/uploads/2023/02/KV_Data_Analytics.png",
  "https://hunarho.com/wp-content/uploads/2024/06/Designer-3-1024x585.webp",
  "https://datasportsgroup.com/images/news/97995.png",
  "https://d3.harvard.edu/platform-digit/wp-content/uploads/sites/2/2020/04/Cover-5.png",
  "https://cdn.analyticsvidhya.com/wp-content/uploads/2023/08/fcvx-03-scaled.webp",
  "https://media.licdn.com/dms/image/v2/C4E12AQEu3bwvTVeghA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1605049291127?e=2147483647&v=beta&t=T_fYMX_jubfjXCKqfzGB2EfGI-3u-t2P5GNMJH8-qTQ",
  "https://images.squarespace-cdn.com/content/v1/5b048119f2e6b103db959419/1579768674245-368MA5LJSY7IU4G1VMBK/Sports+Performance+Analysis+-+Golf+Analytics+5.png?format=1000w",
  "https://aycane.com/cdn/shop/articles/Hockey_Analytics.png?v=1690532293",
];

export default function FeaturesSection() {
  const containerRef = useRef(null);

  // Scroll hooks for parallax effect on the phone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Vertical movement for the phone (Floating Effect)
  // Keeps the phone floating up gently as you scroll
  const yPhone = useTransform(scrollYProgress, [0, 1], [-50, -180]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[130vh] bg-gradient-to-b from-white to-[#F8F9FB] overflow-hidden flex flex-col items-center justify-center pt-20 pb-0"
    >
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl" />
      </div>

      {/* --- LAYER 1: AUTO-SCROLLING BACKGROUND GALLERY --- */}
      <div className="absolute inset-0 flex items-center z-0 pointer-events-none">
        <div className="w-full relative">
          {/* Side Fades */}
          <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Infinite Marquee Animation */}
          <motion.div
            className="flex gap-8 px-8 min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40, 
              repeat: Infinity,
            }}
          >
            {/* Duplicated array for seamless looping */}
            {[...LANDSCAPES, ...LANDSCAPES].map((src, i) => (
              <div
                key={i}
                className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-white"
              >
                <Image
                  src={src}
                  alt={`Landscape ${i}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 400px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- VISIBILITY FIX (Studio Light) --- */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-white via-white/90 to-transparent z-10 pointer-events-none" />
      
      {/* --- TITLE SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        // UPDATED: '-mt-48' pulls the text much higher. 'mb-12' pushes the phone down.
        className="relative z-20 text-center mb-12 -mt-48 px-4"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 drop-shadow-sm">
          Elevate Your <span className="text-blue-600">Game</span>
        </h2>
        {/* Restored the subtitle for visual balance */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Advanced analytics to track, analyze, and optimize every move.
        </p>
      </motion.div>

      {/* --- CENTER PHONE/HAND SECTION --- */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-4">
        <motion.div
          style={{ y: yPhone }} // Parallax applied here
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Pulsing Glow Effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/30 to-purple-300/30 blur-[80px] rounded-full z-0 pointer-events-none mix-blend-multiply"
          />

          {/* Phone/Hand Container */}
          <div 
            className="relative w-[380px] md:w-[420px] mx-auto"
            style={{
                maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)"
            }}
          >
            {/* --- HAND OVERLAY --- */}
            <div className="relative z-30 pointer-events-none overflow-hidden">
              <Image
                src="https://framerusercontent.com/images/lN9vLOVnPrNHWk33J7bz1ahyxXs.png"
                alt="Hand holding phone"
                width={840}
                height={1600}
                className="w-full h-auto" 
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}