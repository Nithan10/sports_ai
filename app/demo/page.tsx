// app/demo/page.tsx
"use client";

import Link from "next/link";
import { 
  ArrowUpRight,
  Cpu, 
  PlayCircle,
  Activity
} from "lucide-react";
import { Navbar } from "@/components/Navbar"; 
import { Footer } from "@/components/Footer";

export default function SportModePage() {
  const sports = [
    {
      id: "tennis",
      title: "Tennis",
      image: "https://tennisgoldcoast.com/wp-content/uploads/2024/11/tournaments-1024x585.jpg",
      desc: "Serve biomechanics & shot heatmaps.",
      stat: "98% Accuracy",
      delay: "delay-0"
    },
    {
      id: "cricket",
      title: "Cricket",
      image: "https://static.vecteezy.com/system/resources/thumbnails/035/017/122/small/ai-generated-cricket-player-background-photo.jpeg",
      desc: "Delivery kinematics & wagon wheels.",
      stat: "140kph Tracking",
      delay: "delay-100"
    },
    {
      id: "football",
      title: "Football",
      image: "https://media.istockphoto.com/id/484868394/photo/soccer-players-in-action.jpg?s=612x612&w=0&k=20&c=XhNsaGAfJYUxRhvA0WY4oXSXmy2kOIr8gOmuHfTgRPk=",
      desc: "Passing networks & xG performance.",
      stat: "22 Players Live",
      delay: "delay-200"
    },
    {
      id: "basketball",
      title: "Basketball",
      image: "https://media.istockphoto.com/id/535814795/photo/basketball-player-in-jump-shot.jpg?s=612x612&w=0&k=20&c=S4VnlfAMf9Tlndky4yEHZZQm3DqqDjFyCXuOYZezHHU=",
      desc: "Dink patterns & kitchen zone analysis.",
      stat: "0.4s Reaction",
      delay: "delay-300"
    }
  ];

  return (
    <main className="min-h-screen w-full bg-[#F2F4F8] text-slate-900 selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
      
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-b from-blue-100/50 to-purple-100/50 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-t from-emerald-100/50 to-teal-100/50 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-24">
        
        <div className="text-center mb-20 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)] border border-slate-100 text-xs font-bold tracking-widest text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM ONLINE // V2.4.0
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
            INITIALIZE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500">SPORT ENGINE</span>
          </h1>
          
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
            Select a discipline to load the 3D biomechanical environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-[1400px]">
          {sports.map((sport, index) => (
            // --- UPDATED: WRAPPED IN LINK ---
            <Link 
              href="/upload" 
              key={sport.id}
              className={`group relative h-[480px] bg-white rounded-[32px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out cursor-pointer overflow-hidden border border-white ${sport.delay} animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards`}
            >
              
              <div className="absolute top-2 left-2 right-2 h-[65%] rounded-[24px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:top-0 group-hover:left-0 group-hover:right-0 group-hover:h-full group-hover:rounded-none z-0">
                <img 
                  src={sport.image} 
                  alt={sport.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500" />
                <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/60 transition-colors duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              <div className="absolute top-6 left-6 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold tracking-widest text-slate-900 transition-all duration-500 group-hover:bg-white/20 group-hover:text-white">
                 0{index + 1} / {sport.id.toUpperCase()}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-6 flex flex-col justify-between transition-all duration-500 group-hover:bg-transparent group-hover:bottom-4 group-hover:translate-y-0 z-10">
                <div className="relative">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2 transition-colors duration-500 group-hover:text-white">
                    {sport.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed transition-colors duration-500 group-hover:text-slate-300">
                    {sport.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-indigo-500 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-300 transition-colors uppercase">
                      {sport.stat}
                    </span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 transition-all duration-500 group-hover:bg-white group-hover:scale-110">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

               <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite]" />
            </Link>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap gap-6 justify-center animate-in fade-in zoom-in duration-1000 delay-500">
           <button className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:shadow-2xl hover:shadow-slate-900/30 transition-all hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2">
               <PlayCircle size={20} />
               Start Session
            </span>
          </button>
        </div>

      </div>

      <Footer />
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </main>
  );
}