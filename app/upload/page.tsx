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
  Orbit,
  X,
  Maximize2,
  LineChart,
  AreaChart,
  Radar,
  Users,
  CircleDot,
  Move,
  Gauge,
  Heart,
  Shield,
  Rocket
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES & CONSTANTS ---
type Phase = "UPLOAD" | "PROCESSING" | "DASHBOARD";
type ActivePlayer = "djokovic" | "alcaraz";

const PROCESSING_STEPS = [
  "INITIALIZING NEURAL NETWORKS...",
  "PARSING MATCH TELEMETRY...",
  "CALCULATING BALL TRAJECTORIES...",
  "GENERATING 3D BIOMECHANICS...",
  "FINALIZING INSIGHTS..."
];

// Player Types
interface Player {
  name: string;
  shortName: string;
  firstName: string;
  lastName: string;
  image: string;
  imageUrl: string;
  country: string;
  flag: string;
  color: string;
  colorHex: string;
  secondaryColor: string;
  bgGradient: string;
  lightBg: string;
  borderColor: string;
  textColor: string;
  darkText: string;
  achievements: string[];
  ranking: number;
  age: number;
  height: string;
  weight: string;
  plays: string;
}

interface PlayerMetrics {
  aggression: number;
  consistency: number;
  power: number;
  speed: number;
  endurance: number;
  technique: number;
}

// Player Data for Comparison with Image Paths
const PLAYER1: Player = {
  name: "NOVAK DJOKOVIC",
  shortName: "DJOKOVIC",
  firstName: "Novak",
  lastName: "Djokovic",
  image: "/images/players/djokovic.png",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6FAaejcvbwHBDdu5THWnzx2Ldr20tRp0Tw&s",
  country: "Serbia",
  flag: "🇷🇸",
  color: "blue",
  colorHex: "#3b82f6",
  secondaryColor: "#60a5fa",
  bgGradient: "from-blue-500 to-blue-600",
  lightBg: "bg-blue-50",
  borderColor: "border-blue-200",
  textColor: "text-blue-600",
  darkText: "text-blue-700",
  achievements: ["24x Grand Slam", "40x Masters", "98x Titles"],
  ranking: 1,
  age: 36,
  height: "188 cm",
  weight: "77 kg",
  plays: "Right-handed"
};

const PLAYER2: Player = {
  name: "CARLOS ALCARAZ",
  shortName: "ALCARAZ",
  firstName: "Carlos",
  lastName: "Alcaraz",
  image: "/images/players/alcaraz.png",
  imageUrl: "https://resources.prod.atpmedia.pulselive.com/photo-resources/2024/03/01/9834c1a7-ecd4-402e-b8e1-84d3dbd983d8/Alcaraz-Australian-Open-Photoshoot-2024-2.jpg?height=172&width=172",
  country: "Spain",
  flag: "🇪🇸",
  color: "orange",
  colorHex: "#f97316",
  secondaryColor: "#fb923c",
  bgGradient: "from-orange-500 to-orange-600",
  lightBg: "bg-orange-50",
  borderColor: "border-orange-200",
  textColor: "text-orange-600",
  darkText: "text-orange-700",
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

// Player 1 Individual Stats
const PLAYER1_STATS = {
  momentum: [65, 70, 55, 80, 75, 60, 85, 70, 65, 90, 75, 60, 85, 70, 65, 80, 75, 70, 85, 80],
  shotDistribution: {
    forehand: 36,
    backhand: 21,
    serve: 21,
    volley: 22
  },
  servePerformance: {
    firstServeIn: 68,
    firstServeWon: 82,
    secondServeIn: 94,
    secondServeWon: 58,
    aces: 13,
    doubleFaults: 3
  },
  rallyLength: [2, 4, 6, 8, 10, 12, 8, 6, 4, 2],
  pressurePoints: {
    breakPointsSaved: 85,
    tieBreaksWon: 68,
    decidingPoints: 72
  }
};

// Player 2 Individual Stats
const PLAYER2_STATS = {
  momentum: [35, 30, 45, 20, 25, 40, 15, 30, 35, 10, 25, 40, 15, 30, 35, 20, 25, 30, 15, 20],
  shotDistribution: {
    forehand: 42,
    backhand: 18,
    serve: 25,
    volley: 15
  },
  servePerformance: {
    firstServeIn: 62,
    firstServeWon: 76,
    secondServeIn: 88,
    secondServeWon: 52,
    aces: 8,
    doubleFaults: 5
  },
  rallyLength: [3, 5, 7, 9, 11, 13, 9, 7, 5, 3],
  pressurePoints: {
    breakPointsSaved: 72,
    tieBreaksWon: 58,
    decidingPoints: 68
  }
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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <DashboardView 
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}

      {/* --- COMPARISON MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <ComparisonModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>

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
        <div className="absolute bottom-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-orange-100/60 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Drag Overlay */}
      <AnimatePresence>
        {dragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none border-4 border-dashed border-blue-400 m-8 rounded-[3rem]"
          >
            <UploadCloud size={80} className="text-blue-600 mb-6 animate-bounce" />
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">DROP FILES HERE</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-xs font-bold tracking-widest text-blue-600">
             <Sparkles size={14} />
             INTELLIGENT INGESTION
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
             UPLOAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">MATCH DATA</span>
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
            color="blue"
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
            color="orange"
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
    ? (color === 'blue' ? 'bg-blue-50 border-blue-200 ring-4 ring-blue-100' : 'bg-orange-50 border-orange-200 ring-4 ring-orange-100')
    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl';
    
  const iconStyle = isSelected
    ? (color === 'blue' ? 'bg-blue-600 text-white scale-110 shadow-blue-200' : 'bg-orange-600 text-white scale-110 shadow-orange-200')
    : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:scale-105';

  return (
    <div 
      onClick={onClick}
      className={`group relative h-[380px] rounded-[2.5rem] border-2 ${containerStyle} transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center justify-center shadow-sm`}
    >
      {children}
      
      {!isSelected && (
         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className={`absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-to-b ${color === 'blue' ? 'from-blue-50/50' : 'from-orange-50/50'} to-transparent rounded-full blur-3xl`} />
         </div>
      )}

      <div className={`relative mb-8 h-24 w-24 rounded-3xl shadow-lg flex items-center justify-center transition-all duration-500 ${iconStyle}`}>
        {isSelected ? <CheckCircle2 size={40} strokeWidth={3} /> : icon}
      </div>
      
      <div className="relative z-10 text-center">
         <h3 className={`text-2xl font-bold mb-2 ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
            {isSelected ? "File Selected" : title}
         </h3>
         <p className={`font-medium mb-8 max-w-[200px] mx-auto truncate ${isSelected ? (color === 'blue' ? 'text-blue-600' : 'text-orange-600') : 'text-slate-400'}`}>
            {isSelected ? file.name : subtitle}
         </p>
         
         <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-colors
            ${isSelected 
               ? (color === 'blue' ? 'bg-blue-200 text-blue-700' : 'bg-orange-200 text-orange-700')
               : 'bg-slate-100 text-slate-500'
            }`}>
            {color === 'blue' ? <ScanEye size={12} /> : <Database size={12} />}
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
// DASHBOARD VIEW - WITH PLAYER SIDEBAR
// ============================================================================
function DashboardView({ onOpenModal }: any) {
  const [activePlayer, setActivePlayer] = useState<ActivePlayer>("djokovic");

  const currentPlayer = activePlayer === "djokovic" ? PLAYER1 : PLAYER2;
  const currentStats = activePlayer === "djokovic" ? PLAYER1_STATS : PLAYER2_STATS;
  const playerColor = activePlayer === "djokovic" ? "blue" : "orange";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#F8FAFC] text-slate-900 p-6 pt-24 pb-20"
    >
      {/* Header with Session ID */}
      <div className="max-w-[1400px] mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-slate-400">SESSION ID: #8823-XJ</span>
            <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              PLAYER PERFORMANCE DASHBOARD
            </span>
          </div>
          <button 
            onClick={onOpenModal}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            <Users size={16} />
            COMPARE PLAYERS
          </button>
        </div>
      </div>

      {/* Player Sidebar and Main Content */}
      <div className="max-w-[1400px] mx-auto flex gap-6">
        {/* Player Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-xs font-black text-slate-400 mb-4 px-2 uppercase tracking-widest">SELECT PLAYER</h3>
            
            {/* Djokovic Button */}
            <button
              onClick={() => setActivePlayer("djokovic")}
              className={`w-full mb-3 p-4 rounded-2xl transition-all ${
                activePlayer === "djokovic" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-200" 
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`absolute inset-0 ${activePlayer === "djokovic" ? "bg-white" : "bg-blue-500"} rounded-full blur-md opacity-50`}></div>
                  <div className={`relative w-16 h-16 rounded-full overflow-hidden border-3 ${
                    activePlayer === "djokovic" ? "border-white" : "border-blue-400"
                  } shadow-xl`}>
                    <Image src={PLAYER1.imageUrl} alt={PLAYER1.name} fill className="object-cover object-top" />
                  </div>
                </div>
                <div className="text-left">
                  <span className={`text-xs font-bold ${activePlayer === "djokovic" ? "text-white/80" : "text-blue-600"}`}>WORLD #1</span>
                  <h3 className={`text-xl font-black ${activePlayer === "djokovic" ? "text-white" : "text-slate-900"}`}>DJOKOVIC</h3>
                  <span className={`text-xs ${activePlayer === "djokovic" ? "text-white/60" : "text-slate-400"}`}>Serbia 🇷🇸</span>
                </div>
                {activePlayer === "djokovic" && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </button>

            {/* Alcaraz Button */}
            <button
              onClick={() => setActivePlayer("alcaraz")}
              className={`w-full p-4 rounded-2xl transition-all ${
                activePlayer === "alcaraz" 
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-200" 
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`absolute inset-0 ${activePlayer === "alcaraz" ? "bg-white" : "bg-orange-500"} rounded-full blur-md opacity-50`}></div>
                  <div className={`relative w-16 h-16 rounded-full overflow-hidden border-3 ${
                    activePlayer === "alcaraz" ? "border-white" : "border-orange-400"
                  } shadow-xl`}>
                    <Image src={PLAYER2.imageUrl} alt={PLAYER2.name} fill className="object-cover object-top" />
                  </div>
                </div>
                <div className="text-left">
                  <span className={`text-xs font-bold ${activePlayer === "alcaraz" ? "text-white/80" : "text-orange-600"}`}>WORLD #2</span>
                  <h3 className={`text-xl font-black ${activePlayer === "alcaraz" ? "text-white" : "text-slate-900"}`}>ALCARAZ</h3>
                  <span className={`text-xs ${activePlayer === "alcaraz" ? "text-white/60" : "text-slate-400"}`}>Spain 🇪🇸</span>
                </div>
                {activePlayer === "alcaraz" && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </button>

            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <span className="text-xs text-slate-400 block">Age</span>
                  <span className={`text-lg font-black text-${playerColor}-600`}>{currentPlayer.age}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <span className="text-xs text-slate-400 block">Height</span>
                  <span className={`text-lg font-black text-${playerColor}-600`}>{currentPlayer.height}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <span className="text-xs text-slate-400 block">Plays</span>
                  <span className={`text-lg font-black text-${playerColor}-600`}>{currentPlayer.plays}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <span className="text-xs text-slate-400 block">Ranking</span>
                  <span className={`text-lg font-black text-${playerColor}-600`}>#{currentPlayer.ranking}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Active Player Stats */}
        <div className="flex-1">
          {/* Player Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className={`absolute inset-0 bg-${playerColor}-500 rounded-full blur-xl opacity-30`}></div>
              <div className={`relative w-20 h-20 rounded-full overflow-hidden border-3 border-${playerColor}-400 shadow-xl`}>
                <Image src={currentPlayer.imageUrl} alt={currentPlayer.name} fill className="object-cover object-top" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900">{currentPlayer.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className={`text-sm font-bold text-${playerColor}-600`}>WORLD #{currentPlayer.ranking}</span>
                <span className="text-xs font-bold text-slate-400">{currentPlayer.country} {currentPlayer.flag}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Match Momentum */}
            <div className="col-span-12 lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full">
                <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">MATCH MOMENTUM</h3>
                <div className="relative h-[150px] w-full">
                  <div className="absolute -left-4 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-slate-400">
                    <span>100</span>
                    <span>50</span>
                    <span>0</span>
                  </div>
                  <div className="absolute left-4 right-0 top-0 bottom-0">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-slate-100"></div>
                      ))}
                    </div>
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <motion.path
                        key={activePlayer}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                        d={generateLinePath(currentStats.momentum, 500, 150)}
                        stroke={activePlayer === "djokovic" ? "#3b82f6" : "#f97316"}
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-400 pl-4">
                  <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
                </div>
              </div>
            </div>

            {/* Shot Distribution */}
            <div className="col-span-12 lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full">
                <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">SHOT DISTRIBUTION</h3>
                <div className="flex items-center justify-between">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" 
                        strokeDasharray={`${currentStats.shotDistribution.forehand * 2.51} 251`} />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" 
                        strokeDasharray={`${currentStats.shotDistribution.backhand * 2.51} 251`}
                        strokeDashoffset={`-${currentStats.shotDistribution.forehand * 2.51}`} />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" 
                        strokeDasharray={`${currentStats.shotDistribution.serve * 2.51} 251`}
                        strokeDashoffset={`-${(currentStats.shotDistribution.forehand + currentStats.shotDistribution.backhand) * 2.51}`} />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-full"></div><span className="text-xs">Forehand {currentStats.shotDistribution.forehand}%</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-xs">Backhand {currentStats.shotDistribution.backhand}%</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><span className="text-xs">Serve {currentStats.shotDistribution.serve}%</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Serve Performance */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <Rocket size={16} className={`text-${playerColor}-600`} /> SERVE PERFORMANCE
                </h3>
                <div className="space-y-4">
                  <ServeMetric label="1st Serve In" value={currentStats.servePerformance.firstServeIn} color={playerColor} />
                  <ServeMetric label="1st Serve Won" value={currentStats.servePerformance.firstServeWon} color={playerColor} />
                  <ServeMetric label="2nd Serve In" value={currentStats.servePerformance.secondServeIn} color={playerColor} />
                  <ServeMetric label="2nd Serve Won" value={currentStats.servePerformance.secondServeWon} color={playerColor} />
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Aces: {currentStats.servePerformance.aces}</span>
                    <span className="text-xs font-bold text-slate-500">DF: {currentStats.servePerformance.doubleFaults}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rally Length */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">RALLY LENGTH</h3>
                <div className="h-24 flex items-end gap-1">
                  {currentStats.rallyLength.map((value: number, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${value * 8}px` }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex-1 bg-${playerColor}-500 rounded-t-sm`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                  <span>2</span><span>4</span><span>6</span><span>8</span><span>10+</span>
                </div>
              </div>
            </div>

            {/* Pressure Points */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">PRESSURE POINTS</h3>
                <div className="space-y-3">
                  <PressureMetric label="BP Saved" value={currentStats.pressurePoints.breakPointsSaved} color={playerColor} />
                  <PressureMetric label="TB Won" value={currentStats.pressurePoints.tieBreaksWon} color={playerColor} />
                  <PressureMetric label="Deciding Pts" value={currentStats.pressurePoints.decidingPoints} color={playerColor} />
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="col-span-12">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">ACHIEVEMENTS</h3>
                <div className="flex gap-3">
                  {currentPlayer.achievements.map((achievement: string, i: number) => (
                    <span key={i} className={`px-4 py-2 rounded-full bg-${playerColor}-50 text-${playerColor}-700 text-sm font-bold border border-${playerColor}-200`}>
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// COMPARISON MODAL
// ============================================================================
function ComparisonModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 rounded-t-3xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Head-to-Head Comparison</h2>
            <p className="text-sm text-slate-500">Full match analysis & player statistics</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* VS Banner */}
          <div className="relative bg-gradient-to-r from-blue-600 via-slate-900 to-orange-600 rounded-2xl p-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
              <div className="grid grid-cols-5 items-center">
                <div className="col-span-2 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <div>
                      <span className="text-xs font-bold text-blue-600">WORLD #1</span>
                      <h3 className="text-2xl font-black">DJOKOVIC</h3>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400">
                      <Image src={PLAYER1.imageUrl} alt={PLAYER1.name} width={64} height={64} className="object-cover" />
                    </div>
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">VS</span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400">
                      <Image src={PLAYER2.imageUrl} alt={PLAYER2.name} width={64} height={64} className="object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-orange-600">WORLD #2</span>
                      <h3 className="text-2xl font-black">ALCARAZ</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Key Metrics Comparison */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-400 uppercase">Key Metrics</h4>
              <ComparisonBar label="Aggression" player1Value={82} player2Value={96} />
              <ComparisonBar label="Consistency" player1Value={94} player2Value={82} />
              <ComparisonBar label="Power" player1Value={88} player2Value={94} />
              <ComparisonBar label="Speed" player1Value={86} player2Value={94} />
              <ComparisonBar label="Endurance" player1Value={96} player2Value={84} />
              <ComparisonBar label="Technique" player1Value={98} player2Value={91} />
            </div>

            {/* Serve Performance Comparison */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-400 uppercase">Serve Performance</h4>
              <ComparisonBar label="1st Serve %" player1Value={PLAYER1_STATS.servePerformance.firstServeIn} player2Value={PLAYER2_STATS.servePerformance.firstServeIn} />
              <ComparisonBar label="1st Serve Won" player1Value={PLAYER1_STATS.servePerformance.firstServeWon} player2Value={PLAYER2_STATS.servePerformance.firstServeWon} />
              <ComparisonBar label="2nd Serve %" player1Value={PLAYER1_STATS.servePerformance.secondServeIn} player2Value={PLAYER2_STATS.servePerformance.secondServeIn} />
              <ComparisonBar label="2nd Serve Won" player1Value={PLAYER1_STATS.servePerformance.secondServeWon} player2Value={PLAYER2_STATS.servePerformance.secondServeWon} />
              <div className="flex justify-between pt-2">
                <div><span className="text-xs text-slate-500">Aces:</span> <span className="font-bold text-blue-600">{PLAYER1_STATS.servePerformance.aces}</span> vs <span className="font-bold text-orange-600">{PLAYER2_STATS.servePerformance.aces}</span></div>
                <div><span className="text-xs text-slate-500">DF:</span> <span className="font-bold text-blue-600">{PLAYER1_STATS.servePerformance.doubleFaults}</span> vs <span className="font-bold text-orange-600">{PLAYER2_STATS.servePerformance.doubleFaults}</span></div>
              </div>
            </div>

            {/* Shot Distribution */}
            <div className="col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              <div>
                <h4 className="text-sm font-black text-slate-400 mb-3">DJOKOVIC Shot Distribution</h4>
                <div className="space-y-2">
                  <ShotDistBar label="Forehand" value={PLAYER1_STATS.shotDistribution.forehand} color="blue" />
                  <ShotDistBar label="Backhand" value={PLAYER1_STATS.shotDistribution.backhand} color="blue" />
                  <ShotDistBar label="Serve" value={PLAYER1_STATS.shotDistribution.serve} color="blue" />
                  <ShotDistBar label="Volley" value={PLAYER1_STATS.shotDistribution.volley} color="blue" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-400 mb-3">ALCARAZ Shot Distribution</h4>
                <div className="space-y-2">
                  <ShotDistBar label="Forehand" value={PLAYER2_STATS.shotDistribution.forehand} color="orange" />
                  <ShotDistBar label="Backhand" value={PLAYER2_STATS.shotDistribution.backhand} color="orange" />
                  <ShotDistBar label="Serve" value={PLAYER2_STATS.shotDistribution.serve} color="orange" />
                  <ShotDistBar label="Volley" value={PLAYER2_STATS.shotDistribution.volley} color="orange" />
                </div>
              </div>
            </div>

            {/* Pressure Points */}
            <div className="col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              <div>
                <h4 className="text-sm font-black text-slate-400 mb-3">Pressure Points - DJOKOVIC</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500">BP Saved</div>
                    <div className="text-xl font-black text-blue-600">{PLAYER1_STATS.pressurePoints.breakPointsSaved}%</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500">TB Won</div>
                    <div className="text-xl font-black text-blue-600">{PLAYER1_STATS.pressurePoints.tieBreaksWon}%</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500">Dec Pts</div>
                    <div className="text-xl font-black text-blue-600">{PLAYER1_STATS.pressurePoints.decidingPoints}%</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-400 mb-3">Pressure Points - ALCARAZ</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500">BP Saved</div>
                    <div className="text-xl font-black text-orange-600">{PLAYER2_STATS.pressurePoints.breakPointsSaved}%</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500">TB Won</div>
                    <div className="text-xl font-black text-orange-600">{PLAYER2_STATS.pressurePoints.tieBreaksWon}%</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-slate-500">Dec Pts</div>
                    <div className="text-xl font-black text-orange-600">{PLAYER2_STATS.pressurePoints.decidingPoints}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper function to generate line path
function generateLinePath(data: number[], width: number, height: number): string {
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * width,
    y: height - (value / 100) * height
  }));
  
  if (points.length === 0) return '';
  
  let path = `M ${points[0].x},${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x},${points[i].y}`;
  }
  
  return path;
}

// Metric Components
function ServeMetric({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-slate-600">{label}</span>
        <span className={`font-bold text-${color}-600`}>{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full bg-${color}-500`}
        />
      </div>
    </div>
  );
}

function PressureMetric({ label, value, color }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1 }}
            className={`h-full bg-${color}-500 rounded-full`}
          />
        </div>
        <span className="text-xs font-bold text-slate-700">{value}%</span>
      </div>
    </div>
  );
}

function ComparisonBar({ label, player1Value, player2Value }: any) {
  const total = player1Value + player2Value;
  const p1Percent = (player1Value / total) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-slate-600">{label}</span>
        <div className="flex gap-3">
          <span className="font-bold text-blue-600">{player1Value}</span>
          <span className="font-bold text-orange-600">{player2Value}</span>
        </div>
      </div>
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${p1Percent}%` }}
          transition={{ duration: 1 }}
          className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-l-full"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${100 - p1Percent}%` }}
          transition={{ duration: 1 }}
          className="absolute right-0 top-0 bottom-0 bg-orange-500 rounded-r-full"
        />
      </div>
    </div>
  );
}

function ShotDistBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className={`font-bold text-${color}-600`}>{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full bg-${color}-500`}
        />
      </div>
    </div>
  );
}