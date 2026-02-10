"use client";

import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function Navbar() {
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    // Only handle scroll for anchor links
    if (href.startsWith("#")) {
      e.preventDefault();

      if (href === "#hero") {
        // Special case for Home: Scroll to the absolute top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Normal case: Scroll to the element with the ID
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
        
        {/* Capsule 1: Brand Identity */}
        <div className="flex items-center rounded-full border border-white/10 bg-zinc-950/80 px-6 py-3 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
          <Link href="/" className="group flex items-center gap-3 text-xl font-bold tracking-tight">
            {/* Pulsing Live Dot */}
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-zinc-100">FOOTBALL</span>
              <span className="text-zinc-600 group-hover:text-blue-400 transition-colors">HUB</span>
            </div>
          </Link>
        </div>

        {/* Capsule 2: Navigation */}
        <div className="hidden items-center rounded-full border border-white/10 bg-zinc-950/80 p-2 backdrop-blur-md shadow-lg md:flex">
          {[
            { name: "Home", href: "#hero" },          // Updated: Points to top
            { name: "What We Do", href: "#what-we-do" },
            { name: "Transfers", href: "/transfers" },
            { name: "Fantasy", href: "/fantasy" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="relative rounded-full px-6 py-2.5 text-sm font-semibold text-zinc-400 transition-all hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Capsule 3: Sign In Action */}
        <div className="flex items-center">
          <InteractiveHoverButton className="h-12 w-36 rounded-full border border-white/10 bg-zinc-950/80 text-sm font-bold shadow-lg hover:bg-zinc-900">
            Sign In
          </InteractiveHoverButton>
        </div>

      </div>
    </nav>
  );
}