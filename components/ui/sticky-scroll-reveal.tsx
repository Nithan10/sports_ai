"use client";

import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
  content: {
    title: string;
    description: React.ReactNode | string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div className="h-[800px] flex flex-col lg:flex-row gap-8 relative">
      
      {/* LEFT SIDE: Scrollable Text Content - Hidden Scrollbar */}
      <div 
        className="h-full w-full lg:w-1/2 overflow-y-auto pr-8" 
        ref={ref}
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        <div className="div relative flex flex-col gap-0">
          {content.map((item, index) => (
            <div 
              key={item.title + index} 
              className={cn(
                "min-h-[600px] flex flex-col justify-center px-4 py-12",
                "first:pt-0 last:pb-0",
              )}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.4,
                  y: activeCard === index ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
                className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6"
              >
                {item.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.4,
                  y: activeCard === index ? 0 : 10
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-lg text-slate-600 leading-relaxed mb-8"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
          <div className="h-32" /> {/* Extra space at bottom */}
        </div>
      </div>

      {/* RIGHT SIDE: Sticky Card Display - Full Card Design */}
      <div className={cn(
        "hidden lg:flex w-full lg:w-1/2 h-full sticky top-0",
        contentClassName
      )}>
        <div className="relative w-full h-full flex items-center justify-center">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: activeCard === index ? 1 : 0,
                scale: activeCard === index ? 1 : 0.95,
              }}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-md">
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};