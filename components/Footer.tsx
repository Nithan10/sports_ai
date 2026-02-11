import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Send, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-zinc-950 pt-24 overflow-hidden border-t border-white/10">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-y-1/2 rounded-full bg-purple-600/10 blur-[100px]" />

      {/* --- Main Content --- */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
          
          {/* Column 1: Brand & Newsletter (Span 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white w-fit">
              <span className="text-blue-500">FOOTBALL</span>HUB
            </Link>
            
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              The ultimate platform for fantasy managers and transfer addicts. 
              Get the data that matters, before the kick-off.
            </p>

            {/* Newsletter Input */}
            <div className="flex w-full max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pl-4 backdrop-blur-sm transition-all focus-within:border-blue-500/50 focus-within:bg-white/10">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-500 hover:scale-105">
                <Send size={16} className="ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links (Span 7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Group 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
              <ul className="flex flex-col gap-2">
                {["Home", "Transfers", "Fantasy", "Live Scores", "Analytics"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-blue-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Group 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
              <ul className="flex flex-col gap-2">
                {["About Us", "Careers", "Press", "Contact", "Partners"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-blue-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Group 3: Socials */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-2">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white hover:scale-110"
                  >
                    <social.icon size={18} />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 md:flex-row">
          <p className="text-xs text-zinc-500">
            © {currentYear} Football Hub Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-300">Privacy Policy</Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-300">Terms of Service</Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-300">Cookie Settings</Link>
          </div>
        </div>
      </div>

      {/* --- Giant Background Text --- */}
      {/* This sits behind everything at the bottom as a watermark */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.03]">
        <h1 className="text-[15vw] font-black leading-[0.75] text-white tracking-tighter whitespace-nowrap">
          FOOTBALL HUB
        </h1>
      </div>

    </footer>
  );
}