"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      setIsOpen(false);

      if (href === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: "Home", href: isHomePage ? "#hero" : "/" },
    { name: "What We Do", href: isHomePage ? "#what-we-do" : "/#what-we-do" },
    { name: "Transfers", href: "/transfers" },
    { name: "Demo", href: "/demo" },
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 md:gap-4">
        
        {/* Capsule 1: Brand Identity */}
        <div className="flex items-center rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2.5 md:px-6 md:py-3 backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02]">
          <Link href="/" className="group flex items-center gap-2 md:gap-3 text-base md:text-xl font-bold tracking-tight">
            <div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-blue-500"></span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-zinc-100">FOOTBALL</span>
              <span className="text-zinc-600 group-hover:text-blue-400 transition-colors">HUB</span>
            </div>
          </Link>
        </div>

        {/* Capsule 2: Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex items-center rounded-full border border-white/10 bg-zinc-950/80 p-2 backdrop-blur-md shadow-lg">
          {navItems.map((item) => (
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

        {/* Capsule 3: Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop Sign In */}
          <div className="hidden md:block">
            <InteractiveHoverButton className="h-12 w-36 rounded-full border border-white/10 bg-zinc-950/80 text-sm font-bold shadow-lg hover:bg-zinc-900">
              Sign In
            </InteractiveHoverButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 bg-zinc-950/80 text-zinc-400 hover:text-white backdrop-blur-md shadow-lg transition-all active:scale-95"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute top-20 left-4 right-4 flex flex-col gap-2 rounded-3xl border border-white/10 bg-zinc-950/95 p-4 backdrop-blur-xl shadow-2xl transition-all duration-300 origin-top md:hidden ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleScroll(e, item.href)}
            className="w-full rounded-2xl px-4 py-3.5 text-center text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white active:bg-white/5"
          >
            {item.name}
          </Link>
        ))}
        
        <div className="mt-2 pt-2 border-t border-white/5">
          <InteractiveHoverButton className="w-full h-12 rounded-2xl border border-white/10 bg-zinc-900 text-sm font-bold shadow-lg active:scale-[0.98]">
            Sign In
          </InteractiveHoverButton>
        </div>
      </div>
    </nav>
  );
}