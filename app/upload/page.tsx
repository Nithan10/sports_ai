// app/upload/page.tsx
"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { 
  FileSpreadsheet, 
  Film, 
  UploadCloud, 
  ArrowLeft,
  ScanEye,
  Database,
  CheckCircle2,
  Sparkles,
  Zap,
  Activity,
  Brain,
  Trophy,
  Share2,
  Download,
  Target,
  Timer,
  TrendingUp,
  BarChart3,
  PieChart,
  Flame,
  Battery,
  Wind,
  Footprints,
  Swords,
  Award,
  Orbit
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES & CONSTANTS ---
type Phase = "UPLOAD" | "PROCESSING" | "DASHBOARD";

const PROCESSING_STEPS = [
  "INITIALIZING NEURAL NETWORKS...",
  "PARSING MATCH TELEMETRY...",
  "CALCULATING BALL TRAJECTORIES...",
  "GENERATING 3D BIOMECHANICS...",
  "FINALIZING INSIGHTS..."
];

// Player Data for Comparison with Image Paths
const PLAYER1 = {
  name: "NOVAK DJOKOVIC",
  shortName: "DJOKOVIC",
  firstName: "Novak",
  lastName: "Djokovic",
  image: "/images/players/djokovic.png",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6FAaejcvbwHBDdu5THWnzx2Ldr20tRp0Tw&s",
  country: "Serbia",
  flag: "🇷🇸",
  color: "indigo",
  colorHex: "#6366f1",
  secondaryColor: "#818cf8",
  bgGradient: "from-indigo-500 to-indigo-600",
  lightBg: "bg-indigo-50",
  borderColor: "border-indigo-200",
  textColor: "text-indigo-600",
  darkText: "text-indigo-700",
  achievements: ["24x Grand Slam", "40x Masters", "98x Titles"],
  ranking: 1,
  age: 36,
  height: "188 cm",
  weight: "77 kg",
  plays: "Right-handed"
};

const PLAYER2 = {
  name: "CARLOS ALCARAZ",
  shortName: "ALCARAZ",
  firstName: "Carlos",
  lastName: "Alcaraz",
  image: "/images/players/alcaraz.png",
  imageUrl: "https://resources.prod.atpmedia.pulselive.com/photo-resources/2024/03/01/9834c1a7-ecd4-402e-b8e1-84d3dbd983d8/Alcaraz-Australian-Open-Photoshoot-2024-2.jpg?height=172&width=172",
  country: "Spain",
  flag: "🇪🇸",
  color: "amber",
  colorHex: "#f59e0b",
  secondaryColor: "#fbbf24",
  bgGradient: "from-amber-500 to-yellow-500",
  lightBg: "bg-amber-50",
  borderColor: "border-amber-200",
  textColor: "text-amber-600",
  darkText: "text-amber-700",
  achievements: ["2x Grand Slam", "5x Masters", "12x Titles"],
  ranking: 2,
  age: 20,
  height: "185 cm",
  weight: "74 kg",
  plays: "Right-handed"
};

// Match Stats
const MATCH_STATS = {
  duration: "2h 48m",
  points: 187,
  games: 32,
  sets: "6-4, 3-6, 7-6",
  surface: "Clay Court",
  temperature: "24°C",
  humidity: "62%"
};

export default function UploadPage() {
  const [phase, setPhase] = useState<Phase>("UPLOAD");
  
  // Upload State
  const videoInputRef = useRef<HTMLInputElement>(null);
  const dataInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Processing State
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // --- HANDLERS ---
  const handleVideoClick = () => videoInputRef.current?.click();
  const handleDataClick = () => dataInputRef.current?.click();

  const handleFileSelect = (file: File, type: 'video' | 'data') => {
    if (type === 'video') setVideoFile(file);
    else setDataFile(file);
  };

  const onVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0], 'video');
  };

  const onDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0], 'data');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.includes("video")) setVideoFile(file);
      else setDataFile(file);
    }
  };

  const startAnalysis = () => {
    setPhase("PROCESSING");
  };

  // Processing Simulation
  useEffect(() => {
    if (phase === "PROCESSING") {
      const stepInterval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < PROCESSING_STEPS.length - 1) return prev + 1;
          return prev;
        });
      }, 1200);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
            setTimeout(() => setPhase("DASHBOARD"), 600);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
      };
    }
  }, [phase]);

  return (
    <main 
      className="min-h-screen w-full font-sans relative overflow-x-hidden bg-[#F8FAFC] text-slate-900 transition-colors duration-1000"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* --- PHASE 1: UPLOAD SCREEN --- */}
      {phase === "UPLOAD" && (
        <UploadView 
          videoFile={videoFile}
          dataFile={dataFile}
          videoInputRef={videoInputRef}
          dataInputRef={dataInputRef}
          onVideoChange={onVideoChange}
          onDataChange={onDataChange}
          handleVideoClick={handleVideoClick}
          handleDataClick={handleDataClick}
          dragActive={dragActive}
          startAnalysis={startAnalysis}
        />
      )}

      {/* --- PHASE 2: PROCESSING SCREEN --- */}
      {phase === "PROCESSING" && (
        <ProcessingView 
          progress={progress} 
          currentStep={PROCESSING_STEPS[processingStep]} 
        />
      )}

      {/* --- PHASE 3: DASHBOARD SCREEN --- */}
      {phase === "DASHBOARD" && (
        <DashboardView />
      )}

      {phase !== "DASHBOARD" && <Footer />}
    </main>
  );
}

// ============================================================================
// UPLOAD VIEW
// ============================================================================
function UploadView({ 
  videoFile, dataFile, videoInputRef, dataInputRef, 
  onVideoChange, onDataChange, handleVideoClick, handleDataClick, 
  dragActive, startAnalysis 
}: any) {
  return (
    <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-24 min-h-[85vh]">
      
      {/* Light Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-100/60 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-100/60 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Drag Overlay */}
      <AnimatePresence>
        {dragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none border-4 border-dashed border-indigo-400 m-8 rounded-[3rem]"
          >
            <UploadCloud size={80} className="text-indigo-600 mb-6 animate-bounce" />
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">DROP FILES HERE</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-xs font-bold tracking-widest text-indigo-600">
             <Sparkles size={14} />
             INTELLIGENT INGESTION
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
             UPLOAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">MATCH DATA</span>
           </h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
             Drag and drop match footage or telemetry logs to initialize the biomechanical analysis engine.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UploadCard 
            title="Upload Footage"
            subtitle=".MP4 .MOV (Max 4GB)"
            icon={<Film size={40} />}
            file={videoFile}
            onClick={handleVideoClick}
            color="indigo"
            tag="AI VISION ANALYSIS"
          >
            <input type="file" ref={videoInputRef} onChange={onVideoChange} className="hidden" accept="video/*"/>
          </UploadCard>

          <UploadCard 
            title="Upload Data Sheet"
            subtitle=".CSV .XLSX (Auto-Parse)"
            icon={<FileSpreadsheet size={40} />}
            file={dataFile}
            onClick={handleDataClick}
            color="emerald"
            tag="TELEMETRY IMPORT"
          >
            <input type="file" ref={dataInputRef} onChange={onDataChange} className="hidden" accept=".csv,.xlsx"/>
          </UploadCard>
        </div>

        <AnimatePresence>
          {(videoFile || dataFile) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 flex justify-center"
            >
              <button 
                onClick={startAnalysis}
                className="group relative flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                   <Zap className="fill-yellow-400 text-yellow-400 group-hover:animate-pulse" />
                   INITIALIZE ENGINE
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UploadCard({ title, subtitle, icon, file, onClick, children, color, tag }: any) {
  const isSelected = !!file;
  
  const containerStyle = isSelected 
    ? (color === 'indigo' ? 'bg-indigo-50 border-indigo-200 ring-4 ring-indigo-100' : 'bg-emerald-50 border-emerald-200 ring-4 ring-emerald-100')
    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl';
    
  const iconStyle = isSelected
    ? (color === 'indigo' ? 'bg-indigo-600 text-white scale-110 shadow-indigo-200' : 'bg-emerald-600 text-white scale-110 shadow-emerald-200')
    : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:scale-105';

  return (
    <div 
      onClick={onClick}
      className={`group relative h-[380px] rounded-[2.5rem] border-2 ${containerStyle} transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center justify-center shadow-sm`}
    >
      {children}
      
      {!isSelected && (
         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className={`absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-to-b ${color === 'indigo' ? 'from-indigo-50/50' : 'from-emerald-50/50'} to-transparent rounded-full blur-3xl`} />
         </div>
      )}

      <div className={`relative mb-8 h-24 w-24 rounded-3xl shadow-lg flex items-center justify-center transition-all duration-500 ${iconStyle}`}>
        {isSelected ? <CheckCircle2 size={40} strokeWidth={3} /> : icon}
      </div>
      
      <div className="relative z-10 text-center">
         <h3 className={`text-2xl font-bold mb-2 ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
            {isSelected ? "File Selected" : title}
         </h3>
         <p className={`font-medium mb-8 max-w-[200px] mx-auto truncate ${isSelected ? (color === 'indigo' ? 'text-indigo-600' : 'text-emerald-600') : 'text-slate-400'}`}>
            {isSelected ? file.name : subtitle}
         </p>
         
         <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-colors
            ${isSelected 
               ? (color === 'indigo' ? 'bg-indigo-200 text-indigo-700' : 'bg-emerald-200 text-emerald-700')
               : 'bg-slate-100 text-slate-500'
            }`}>
            {color === 'indigo' ? <ScanEye size={12} /> : <Database size={12} />}
            {tag}
         </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROCESSING VIEW
// ============================================================================
function ProcessingView({ progress, currentStep }: { progress: number, currentStep: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col items-center justify-center">
      <div className="relative mb-16">
        <div className="absolute inset-[-20px] rounded-full border border-slate-200" />
        <div className="absolute inset-[-40px] rounded-full border border-slate-100" />
        
        <div className="relative h-48 w-48">
           <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
             <circle className="text-slate-200" strokeWidth="4" stroke="currentColor" fill="transparent" r="46" cx="50" cy="50" />
             <circle 
               className="text-blue-600 transition-all duration-300 ease-out" 
               strokeWidth="4" 
               strokeDasharray={289.027}
               strokeDashoffset={289.027 - (progress / 100) * 289.027}
               strokeLinecap="round" 
               stroke="currentColor" 
               fill="transparent" 
               r="46" 
               cx="50" 
               cy="50" 
             />
           </svg>
           
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900">{progress}%</span>
              <span className="text-xs font-bold text-slate-400 tracking-widest mt-1">PROCESSING</span>
           </div>
        </div>
      </div>

      <div className="w-full max-w-md text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
           <span className="text-xs font-bold text-slate-600 tracking-wider">{currentStep}</span>
        </div>
        
        <p className="text-slate-400 text-sm">
           Analyzing {(progress * 62)} data points...
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// DASHBOARD VIEW - ENHANCED PLAYER COMPARISON WITH IMAGES
// ============================================================================
function DashboardView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#F1F5F9] text-slate-900 p-6 pt-24 pb-20"
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
           <div className="flex items-center gap-3 mb-3">
             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-600 text-[10px] font-black tracking-widest border border-indigo-200">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                PLAYER STYLE ANALYSIS
             </span>
             <span className="text-slate-400 text-xs font-mono font-medium">SESSION ID: #8823-XJ</span>
           </div>
           <h1 className="text-4xl font-black tracking-tight text-slate-900">Style & Energy Comparison</h1>
           <p className="text-slate-500 text-sm mt-2">Real-time biomechanical analysis | {MATCH_STATS.surface} | {MATCH_STATS.duration}</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
            <Share2 size={16} /> Share
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* VS BANNER - MAIN COMPARISON HEADER WITH PLAYER IMAGES */}
      <div className="max-w-[1400px] mx-auto mb-8">
        <div className="relative bg-gradient-to-r from-indigo-600 via-slate-900 to-amber-600 rounded-3xl p-1 shadow-2xl overflow-hidden">
          {/* Simple background pattern - fixed version */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-[22px] p-6 relative z-10">
            <div className="grid grid-cols-5 items-center gap-4">
              {/* Player 1 */}
              <div className="col-span-2 text-right">
                <div className="flex items-center justify-end gap-4">
                  {/* Player 1 Image */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-indigo-600 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-200 shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={PLAYER1.imageUrl}
                        alt={PLAYER1.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <span className="text-white font-bold text-xs">#1</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <span className="text-sm font-bold text-indigo-600">{PLAYER1.flag}</span>
                      <span className="text-xs font-bold text-indigo-600 tracking-widest">WORLD #1</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">{PLAYER1.firstName}</h2>
                    <h2 className="text-3xl font-black text-slate-900 -mt-1">{PLAYER1.lastName}</h2>
                    <div className="flex gap-1 mt-2 justify-end">
                      {PLAYER1.achievements.slice(0, 3).map((ach, i) => (
                        <span key={i} className="text-[8px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-bold border border-indigo-200">
                          {ach}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* VS Badge */}
              <div className="col-span-1 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-amber-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-2xl transform rotate-0 hover:rotate-180 transition-transform duration-500">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-600 font-black text-2xl tracking-tighter">VS</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white">
                    LIVE
                  </div>
                </div>
              </div>
              
              {/* Player 2 */}
              <div className="col-span-2">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-amber-600 tracking-widest">WORLD #2</span>
                      <span className="text-sm font-bold text-amber-600">{PLAYER2.flag}</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">{PLAYER2.firstName}</h2>
                    <h2 className="text-3xl font-black text-slate-900 -mt-1">{PLAYER2.lastName}</h2>
                    <div className="flex gap-1 mt-2">
                      {PLAYER2.achievements.slice(0, 3).map((ach, i) => (
                        <span key={i} className="text-[8px] bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-bold border border-amber-200">
                          {ach}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Player 2 Image */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-amber-200 shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={PLAYER2.imageUrl}
                        alt={PLAYER2.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <span className="text-white font-bold text-xs">#2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID - STYLE & ENERGY FOCUS */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        
        {/* ===== LEFT COLUMN - PLAYER 1 STYLE METRICS WITH IMAGE ===== */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <PlayerStyleCard 
            player={PLAYER1}
            metrics={{
              aggression: 82,
              consistency: 94,
              power: 88,
              agility: 86,
              endurance: 96,
              technique: 98
            }}
          />
          
          <EnergyMeterCard 
            player={PLAYER1}
            energy={87}
            peakSpeed="34.2 km/h"
            distance="4.2 km"
            sprints={42}
            recovery="1.8s"
          />
        </div>

        {/* ===== CENTER - 3D COURT & PLAYING STYLE VISUALIZATION ===== */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          {/* 3D Court with Player Heatmap */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Orbit size={14} /> POSITIONAL HEATMAP
              </h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-indigo-200">
                    <Image src={PLAYER1.imageUrl} alt="" width={16} height={16} className="object-cover object-top" />
                  </div>
                  <span className="text-[8px] font-bold text-indigo-600">DJOKOVIC</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-200">
                    <Image src={PLAYER2.imageUrl} alt="" width={16} height={16} className="object-cover object-top" />
                  </div>
                  <span className="text-[8px] font-bold text-amber-600">ALCARAZ</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100 overflow-hidden">
              {/* Tennis Court SVG Overlay */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid meet">
                <rect x="50" y="50" width="300" height="500" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="50" y1="300" x2="350" y2="300" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="200" y1="50" x2="200" y2="550" stroke="#e2e8f0" strokeWidth="2" />
                
                {/* Heatmap Points - Player 1 (Indigo) */}
                <g className="player1-heat">
                  {[...Array(40)].map((_, i) => (
                    <circle 
                      key={`p1-${i}`}
                      cx={100 + Math.random() * 200} 
                      cy={100 + Math.random() * 400} 
                      r={3 + Math.random() * 5}
                      fill="#6366f1"
                      opacity={0.2 + Math.random() * 0.4}
                    />
                  ))}
                </g>
                
                {/* Heatmap Points - Player 2 (Amber) */}
                <g className="player2-heat">
                  {[...Array(40)].map((_, i) => (
                    <circle 
                      key={`p2-${i}`}
                      cx={80 + Math.random() * 240} 
                      cy={80 + Math.random() * 440} 
                      r={3 + Math.random() * 5}
                      fill="#f59e0b"
                      opacity={0.2 + Math.random() * 0.4}
                    />
                  ))}
                </g>
                
                {/* Animated Movement Trails with Player Images */}
                <motion.g
                  animate={{ 
                    x: [0, 70, -50, 20, 0],
                    y: [0, -50, 30, -20, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <foreignObject x="160" y="280" width="40" height="40">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-400 shadow-lg">
                      <Image src={PLAYER1.imageUrl} alt="" width={40} height={40} className="object-cover object-top" />
                    </div>
                  </foreignObject>
                </motion.g>
                
                <motion.g
                  animate={{ 
                    x: [0, -60, 40, -20, 0],
                    y: [0, 40, -30, 20, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <foreignObject x="200" y="260" width="40" height="40">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg">
                      <Image src={PLAYER2.imageUrl} alt="" width={40} height={40} className="object-cover object-top" />
                    </div>
                  </foreignObject>
                </motion.g>
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 border border-slate-200 text-[10px] font-bold text-slate-500">
                <div className="flex items-center gap-3">
                  <span>🏃 MOVEMENT INTENSITY</span>
                  <div className="flex gap-1">
                    <div className="w-8 h-2 bg-indigo-200 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-indigo-600"></div>
                    </div>
                    <div className="w-8 h-2 bg-amber-200 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-amber-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Playing Style Radar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
              <Brain size={14} /> PLAYING STYLE SIGNATURE
            </h3>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Player 1 Style */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-indigo-200">
                    <Image src={PLAYER1.imageUrl} alt="" width={24} height={24} className="object-cover object-top" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{PLAYER1.shortName}</span>
                </div>
                <div className="space-y-3">
                  <StyleBar label="Defensive" value={92} color="indigo" />
                  <StyleBar label="Offensive" value={78} color="indigo" />
                  <StyleBar label="Net Play" value={65} color="indigo" />
                  <StyleBar label="Baseline" value={95} color="indigo" />
                  <StyleBar label="Slice" value={88} color="indigo" />
                  <StyleBar label="Topspin" value={84} color="indigo" />
                </div>
              </div>
              
              {/* Player 2 Style */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-200">
                    <Image src={PLAYER2.imageUrl} alt="" width={24} height={24} className="object-cover object-top" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{PLAYER2.shortName}</span>
                </div>
                <div className="space-y-3">
                  <StyleBar label="Defensive" value={76} color="amber" />
                  <StyleBar label="Offensive" value={94} color="amber" />
                  <StyleBar label="Net Play" value={82} color="amber" />
                  <StyleBar label="Baseline" value={88} color="amber" />
                  <StyleBar label="Slice" value={72} color="amber" />
                  <StyleBar label="Topspin" value={96} color="amber" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT COLUMN - PLAYER 2 STYLE METRICS WITH IMAGE ===== */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <PlayerStyleCard 
            player={PLAYER2}
            metrics={{
              aggression: 96,
              consistency: 82,
              power: 94,
              agility: 92,
              endurance: 84,
              technique: 91
            }}
          />
          
          <EnergyMeterCard 
            player={PLAYER2}
            energy={92}
            peakSpeed="36.8 km/h"
            distance="4.8 km"
            sprints={58}
            recovery="1.4s"
          />
        </div>

        {/* BOTTOM ROW - DIRECT COMPARISON METRICS */}
        <div className="col-span-12 mt-4">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 mb-8 uppercase tracking-widest flex items-center gap-2">
              <Swords size={14} /> DIRECT COMPARISON
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ComparisonMeter 
                label="Aggression" 
                player1Value={82} 
                player2Value={96} 
                player1Color="indigo"
                player2Color="amber"
                icon={<Flame size={16} />}
              />
              <ComparisonMeter 
                label="Consistency" 
                player1Value={94} 
                player2Value={82} 
                player1Color="indigo"
                player2Color="amber"
                icon={<Activity size={16} />}
              />
              <ComparisonMeter 
                label="Power" 
                player1Value={88} 
                player2Value={94} 
                player1Color="indigo"
                player2Color="amber"
                icon={<Zap size={16} />}
              />
              <ComparisonMeter 
                label="Agility" 
                player1Value={86} 
                player2Value={92} 
                player1Color="indigo"
                player2Color="amber"
                icon={<Wind size={16} />}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// COMPARISON COMPONENTS
// ============================================================================

function PlayerStyleCard({ player, metrics }: { player: any, metrics: any }) {
  return (
    <div className={`bg-white rounded-3xl p-6 border ${player.borderColor} shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${player.bgGradient} rounded-xl blur-md opacity-50`}></div>
          <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-lg">
            <Image
              src={player.imageUrl}
              alt={player.name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
        <div>
          <span className={`text-xs font-bold ${player.textColor}`}>{player.country} {player.flag}</span>
          <h3 className="text-lg font-black text-slate-900">{player.shortName}</h3>
        </div>
      </div>
      
      <div className="space-y-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-slate-500 uppercase">{key}</span>
              <span className={`font-black ${player.darkText}`}>{value}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-full rounded-full bg-gradient-to-r ${player.bgGradient}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnergyMeterCard({ player, energy, peakSpeed, distance, sprints, recovery }: any) {
  return (
    <div className={`bg-white rounded-3xl p-6 border ${player.borderColor} shadow-sm`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200">
          <Image src={player.imageUrl} alt="" width={24} height={24} className="object-cover object-top" />
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Energy Systems</span>
      </div>
      
      {/* Main Energy Meter */}
      <div className="relative mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="font-bold text-slate-600">Current Energy</span>
          <span className={`font-black ${player.darkText}`}>{energy}%</span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${energy}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full rounded-full bg-gradient-to-r ${player.bgGradient}`}
          />
        </div>
        <div className="absolute -top-1 left-0 right-0 flex justify-between text-[8px] font-bold text-slate-400 px-1">
          <span>LOW</span>
          <span>OPTIMAL</span>
          <span>PEAK</span>
        </div>
      </div>
      
      {/* Energy Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl p-3">
          <span className="text-[10px] font-bold text-slate-400 block">PEAK SPEED</span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-black text-slate-900">{peakSpeed}</span>
            <span className="text-[8px] font-bold text-slate-400 mb-1">km/h</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <span className="text-[10px] font-bold text-slate-400 block">DISTANCE</span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-black text-slate-900">{distance}</span>
            <span className="text-[8px] font-bold text-slate-400 mb-1">km</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <span className="text-[10px] font-bold text-slate-400 block">SPRINTS</span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-black text-slate-900">{sprints}</span>
            <span className="text-[8px] font-bold text-slate-400 mb-1">total</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <span className="text-[10px] font-bold text-slate-400 block">RECOVERY</span>
          <div className="flex items-end gap-1">
            <span className="text-lg font-black text-slate-900">{recovery}</span>
            <span className="text-[8px] font-bold text-slate-400 mb-1">avg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StyleBar({ label, value, color }: { label: string, value: number, color: string }) {
  const colorClass = color === 'indigo' ? 'bg-indigo-600' : 'bg-amber-500';
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-slate-500">{label}</span>
        <span className={`font-bold ${color === 'indigo' ? 'text-indigo-600' : 'text-amber-600'}`}>{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full rounded-full ${colorClass}`}
        />
      </div>
    </div>
  );
}

function ComparisonMeter({ label, player1Value, player2Value, player1Color, player2Color, icon }: any) {
  const total = player1Value + player2Value;
  const p1Percent = (player1Value / total) * 100;
  const p2Percent = (player2Value / total) * 100;
  
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      
      <div className="relative h-16 flex items-center">
        {/* Player 1 Bar */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${p1Percent}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-l-xl flex items-center justify-end pr-2"
            style={{ width: `${p1Percent}%` }}
          >
            <span className="text-white font-bold text-sm">{player1Value}</span>
          </motion.div>
        </div>
        
        {/* Player 2 Bar */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${p2Percent}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-r-xl flex items-center pl-2"
            style={{ width: `${p2Percent}%` }}
          >
            <span className="text-white font-bold text-sm">{player2Value}</span>
          </motion.div>
        </div>
        
        {/* Middle Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white border-l border-dashed border-slate-300"></div>
      </div>
      
      <div className="flex justify-between mt-2">
        <span className="text-xs font-bold text-indigo-600">DJOKOVIC</span>
        <span className="text-xs font-bold text-amber-600">ALCARAZ</span>
      </div>
    </div>
  );
}