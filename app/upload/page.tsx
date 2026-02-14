// app/upload/page.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { 
  FileSpreadsheet, Film, UploadCloud, ArrowLeft, ScanEye, Database, 
  CheckCircle2, Sparkles, Zap, Activity, Brain, Trophy, Share2, 
  Download, Target, Timer, TrendingUp, BarChart3, PieChart, Flame, 
  Battery, Wind, Footprints, Swords, Award, Orbit, X, Maximize2, 
  LineChart, AreaChart, Radar, Users, CircleDot, Move, Gauge, Heart, 
  Shield, Rocket, AlertTriangle, ArrowUp, ArrowDown, Star, Medal, 
  Crown, TargetIcon, Dumbbell, ActivitySquare, PlayCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES & INTERFACES ---
type Phase = "UPLOAD" | "PROCESSING" | "DASHBOARD";

interface PlayerData {
  id: string;
  name: string;
  age: number;
  height: string;
  weight: string;
  dominantHand: string;
  backhand: string;
  imageUrl: string;
  country: string;
  flag: string;
  ranking: number;
  achievements: string[];
  stats: PlayerStats;
  metrics: PerformanceMetrics;
  suggestions: Suggestion[];
}

interface PlayerStats {
  matchDuration: string;
  totalPoints: number;
  totalGames: number;
  setsScore: string;
  surface: string;
  temperature: string;
  humidity: string;
  
  // Advanced metrics
  serve: ServeStats;
  groundstrokes: GroundstrokeStats;
  netPlay: NetPlayStats;
  movement: MovementStats;
  mental: MentalStats;
  physical: PhysicalStats;
  
  // Time-based data
  momentumData: TimeSeriesData[];
  shotPlacementData: ShotPlacementData;
  rallyData: RallyData[];
  energyExpenditure: EnergyData[];
  tacticalPatterns: TacticalPattern[];
}

interface ServeStats {
  firstServeIn: number[];
  firstServeWon: number[];
  secondServeIn: number[];
  secondServeWon: number[];
  aces: number[];
  doubleFaults: number[];
  serveSpeed: {
    average: number;
    max: number;
    byZone: { zone: string; percentage: number; speed: number }[];
  };
  placementAccuracy: { target: string; success: number }[];
  spinRate: { type: string; rpm: number }[];
}

interface GroundstrokeStats {
  forehand: {
    winners: number[];
    errors: number[];
    speed: number[];
    depth: number[];
    crosscourt: number;
    downTheLine: number;
  };
  backhand: {
    winners: number[];
    errors: number[];
    speed: number[];
    depth: number[];
    crosscourt: number;
    downTheLine: number;
  };
  consistency: number[];
  powerIndex: number[];
}

interface NetPlayStats {
  approaches: number[];
  volleyWinners: number[];
  volleyErrors: number[];
  overheadWinners: number[];
  netPointsWon: number[];
  netPointsLost: number[];
  touchRating: number[];
}

interface MovementStats {
  distanceCovered: number[];
  sprintCount: number[];
  recoveryTime: number[];
  courtCoverage: {
    zone: string;
    time: number;
    efficiency: number;
  }[];
  agilityScore: number[];
  reactionTime: number[];
}

interface MentalStats {
  concentration: number[];
  pressurePoints: number[];
  breakPointSaved: number[];
  tieBreakWon: number[];
  clutchRating: number[];
  decisionMaking: number[];
}

interface PhysicalStats {
  heartRate: number[];
  energyLevel: number[];
  fatigueIndex: number[];
  recoveryRate: number[];
  enduranceScore: number[];
}

interface TimeSeriesData {
  timestamp: number;
  value: number;
  metric: string;
}

interface ShotPlacementData {
  forehand: { x: number; y: number; made: boolean; power: number }[];
  backhand: { x: number; y: number; made: boolean; power: number }[];
  serve: { x: number; y: number; made: boolean; speed: number }[];
}

interface RallyData {
  length: number;
  winner: string;
  shots: { type: string; outcome: string }[];
  pattern: string[];
}

interface EnergyData {
  time: number;
  energy: number;
  intensity: number;
  recovery: number;
}

interface TacticalPattern {
  pattern: string;
  frequency: number;
  success: number;
  recommendation: string;
}

interface PerformanceMetrics {
  overall: number;
  technical: number;
  tactical: number;
  physical: number;
  mental: number;
  consistency: number;
  power: number;
  precision: number;
  adaptability: number;
}

interface Suggestion {
  category: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  drills: string[];
  expectedImprovement: number;
  visualData?: any;
}

// --- MOCK DATA GENERATOR ---
const generateMockPlayerData = (playerId: string, name: string): PlayerData => {
  const generateTimeSeries = (length: number, base: number, volatility: number) => {
    return Array.from({ length }, (_, i) => ({
      timestamp: i,
      value: Math.min(100, Math.max(0, base + (Math.random() - 0.5) * volatility))
    }));
  };

  const serveStats: ServeStats = {
    firstServeIn: Array.from({ length: 12 }, () => Math.floor(55 + Math.random() * 25)),
    firstServeWon: Array.from({ length: 12 }, () => Math.floor(65 + Math.random() * 20)),
    secondServeIn: Array.from({ length: 12 }, () => Math.floor(85 + Math.random() * 10)),
    secondServeWon: Array.from({ length: 12 }, () => Math.floor(45 + Math.random() * 20)),
    aces: Array.from({ length: 12 }, () => Math.floor(Math.random() * 4)),
    doubleFaults: Array.from({ length: 12 }, () => Math.floor(Math.random() * 2)),
    serveSpeed: {
      average: 185 + Math.random() * 15,
      max: 215 + Math.random() * 15,
      byZone: [
        { zone: "Wide", percentage: 35, speed: 190 },
        { zone: "Body", percentage: 30, speed: 185 },
        { zone: "T", percentage: 35, speed: 195 }
      ]
    },
    placementAccuracy: [
      { target: "Wide Deuce", success: 72 },
      { target: "T Deuce", success: 68 },
      { target: "Body Deuce", success: 82 },
      { target: "Wide Ad", success: 70 },
      { target: "T Ad", success: 74 },
      { target: "Body Ad", success: 78 }
    ],
    spinRate: [
      { type: "Flat", rpm: 80 },
      { type: "Kick", rpm: 2200 },
      { type: "Slice", rpm: 1500 }
    ]
  };

  const groundstrokeStats: GroundstrokeStats = {
    forehand: {
      winners: Array.from({ length: 12 }, () => Math.floor(3 + Math.random() * 8)),
      errors: Array.from({ length: 12 }, () => Math.floor(1 + Math.random() * 4)),
      speed: Array.from({ length: 12 }, () => Math.floor(110 + Math.random() * 20)),
      depth: Array.from({ length: 12 }, () => Math.floor(60 + Math.random() * 30)),
      crosscourt: 65 + Math.random() * 15,
      downTheLine: 35 + Math.random() * 15
    },
    backhand: {
      winners: Array.from({ length: 12 }, () => Math.floor(2 + Math.random() * 6)),
      errors: Array.from({ length: 12 }, () => Math.floor(1 + Math.random() * 3)),
      speed: Array.from({ length: 12 }, () => Math.floor(95 + Math.random() * 15)),
      depth: Array.from({ length: 12 }, () => Math.floor(55 + Math.random() * 25)),
      crosscourt: 70 + Math.random() * 15,
      downTheLine: 30 + Math.random() * 15
    },
    consistency: Array.from({ length: 12 }, () => Math.floor(70 + Math.random() * 20)),
    powerIndex: Array.from({ length: 12 }, () => Math.floor(75 + Math.random() * 20))
  };

  const generateSuggestions = (): Suggestion[] => {
    return [
      {
        category: "Serve",
        priority: "high",
        title: "Improve Second Serve Consistency",
        description: "Your second serve win percentage drops significantly after long rallies. Focus on adding more spin and varying placement.",
        drills: [
          "Practice serving to specific targets under fatigue",
          "Use the '3-ball drill' with different spins",
          "Incorporate serve +1 drills with movement"
        ],
        expectedImprovement: 15
      },
      {
        category: "Movement",
        priority: "medium",
        title: "Optimize Recovery Position",
        description: "Analysis shows you're often 0.3 seconds late recovering to the center after wide shots.",
        drills: [
          "Split-step timing exercises",
          "Lateral shuffle with directional changes",
          "Reaction ball drills"
        ],
        expectedImprovement: 22
      },
      {
        category: "Tactical",
        priority: "high",
        title: "Vary Shot Patterns",
        description: "Your crosscourt forehand pattern is too predictable (78% of shots). Mix in more down-the-line shots.",
        drills: [
          "Pattern play: 2 crosscourt then 1 down line",
          "Target practice with random calls",
          "Pressure drills with pattern variation"
        ],
        expectedImprovement: 18
      },
      {
        category: "Mental",
        priority: "low",
        title: "Break Point Conversion",
        description: "Convert only 42% of break points. Work on aggressive shot selection in big moments.",
        drills: [
          "Pressure point simulation games",
          "Visualization exercises",
          "'Must-win' point practice matches"
        ],
        expectedImprovement: 12
      }
    ];
  };

  return {
    id: playerId,
    name: name,
    age: playerId === "P1" ? 28 : 24,
    height: playerId === "P1" ? "188 cm" : "185 cm",
    weight: playerId === "P1" ? "85 kg" : "78 kg",
    dominantHand: "Right",
    backhand: playerId === "P1" ? "Two-handed" : "One-handed",
    imageUrl: playerId === "P1" 
      ? "https://images.unsplash.com/photo-1543322748-33dfc0a8d8c8?w=400&h=400&fit=crop"
      : "https://images.unsplash.com/photo-1596282200457-79b55253558d?w=400&h=400&fit=crop",
    country: playerId === "P1" ? "Serbia" : "Spain",
    flag: playerId === "P1" ? "🇷🇸" : "🇪🇸",
    ranking: playerId === "P1" ? 1 : 2,
    achievements: playerId === "P1" 
      ? ["24 Grand Slams", "40 Masters", "ATP Finals"]
      : ["2 Grand Slams", "5 Masters", "Olympic Silver"],
    stats: {
      matchDuration: "2h 48m",
      totalPoints: 187,
      totalGames: 32,
      setsScore: "6-4, 3-6, 7-6",
      surface: "Clay Court",
      temperature: "24°C",
      humidity: "62%",
      serve: serveStats,
      groundstrokes: groundstrokeStats,
      netPlay: {
        approaches: Array.from({ length: 12 }, () => Math.floor(2 + Math.random() * 5)),
        volleyWinners: Array.from({ length: 12 }, () => Math.floor(1 + Math.random() * 3)),
        volleyErrors: Array.from({ length: 12 }, () => Math.floor(0 + Math.random() * 2)),
        overheadWinners: Array.from({ length: 12 }, () => Math.floor(0 + Math.random() * 2)),
        netPointsWon: Array.from({ length: 12 }, () => Math.floor(3 + Math.random() * 4)),
        netPointsLost: Array.from({ length: 12 }, () => Math.floor(1 + Math.random() * 3)),
        touchRating: Array.from({ length: 12 }, () => Math.floor(70 + Math.random() * 20))
      },
      movement: {
        distanceCovered: Array.from({ length: 12 }, () => Math.floor(40 + Math.random() * 15)),
        sprintCount: Array.from({ length: 12 }, () => Math.floor(4 + Math.random() * 6)),
        recoveryTime: Array.from({ length: 12 }, () => Math.floor(8 + Math.random() * 5)),
        courtCoverage: [
          { zone: "Forehand Corner", time: 18, efficiency: 85 },
          { zone: "Backhand Corner", time: 22, efficiency: 72 },
          { zone: "Mid-Court", time: 12, efficiency: 88 },
          { zone: "Net", time: 8, efficiency: 76 }
        ],
        agilityScore: Array.from({ length: 12 }, () => Math.floor(75 + Math.random() * 18)),
        reactionTime: Array.from({ length: 12 }, () => Math.floor(65 + Math.random() * 25))
      },
      mental: {
        concentration: Array.from({ length: 12 }, () => Math.floor(70 + Math.random() * 25)),
        pressurePoints: Array.from({ length: 12 }, () => Math.floor(60 + Math.random() * 30)),
        breakPointSaved: Array.from({ length: 12 }, () => Math.floor(65 + Math.random() * 25)),
        tieBreakWon: Array.from({ length: 12 }, () => Math.floor(50 + Math.random() * 35)),
        clutchRating: Array.from({ length: 12 }, () => Math.floor(60 + Math.random() * 30)),
        decisionMaking: Array.from({ length: 12 }, () => Math.floor(70 + Math.random() * 20))
      },
      physical: {
        heartRate: Array.from({ length: 12 }, () => Math.floor(130 + Math.random() * 40)),
        energyLevel: Array.from({ length: 12 }, () => Math.floor(70 + Math.random() * 25)),
        fatigueIndex: Array.from({ length: 12 }, () => Math.floor(20 + Math.random() * 30)),
        recoveryRate: Array.from({ length: 12 }, () => Math.floor(60 + Math.random() * 25)),
        enduranceScore: Array.from({ length: 12 }, () => Math.floor(75 + Math.random() * 20))
      },
      momentumData: generateTimeSeries(40, 100, 30).map(d => ({ ...d, metric: "momentum" })),
      shotPlacementData: {
        forehand: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          made: Math.random() > 0.3,
          power: Math.floor(50 + Math.random() * 50)
        })),
        backhand: Array.from({ length: 30 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          made: Math.random() > 0.4,
          power: Math.floor(40 + Math.random() * 50)
        })),
        serve: Array.from({ length: 40 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          made: Math.random() > 0.2,
          speed: Math.floor(170 + Math.random() * 40)
        }))
      },
      rallyData: Array.from({ length: 10 }, (_, i) => ({
        length: Math.floor(2 + Math.random() * 10),
        winner: Math.random() > 0.5 ? "forehand" : "backhand",
        shots: Array.from({ length: 5 }, () => ({
          type: Math.random() > 0.5 ? "forehand" : "backhand",
          outcome: Math.random() > 0.7 ? "winner" : "neutral"
        })),
        pattern: ["crosscourt", "down-line", "crosscourt", "crosscourt", "winner"]
      })),
      energyExpenditure: Array.from({ length: 20 }, (_, i) => ({
        time: i * 30,
        energy: Math.floor(50 + Math.random() * 40 + Math.sin(i / 3) * 15),
        intensity: Math.floor(30 + Math.random() * 50 + Math.cos(i / 2) * 20),
        recovery: Math.floor(40 + Math.random() * 30 - Math.sin(i / 4) * 10)
      })),
      tacticalPatterns: [
        {
          pattern: "Forehand Crosscourt Rally",
          frequency: 45,
          success: 65,
          recommendation: "Mix in more down-the-line shots"
        },
        {
          pattern: "Serve +1 Forehand",
          frequency: 32,
          success: 78,
          recommendation: "Continue this effective pattern"
        },
        {
          pattern: "Drop Shot Approach",
          frequency: 15,
          success: 42,
          recommendation: "Improve disguise and execution"
        }
      ]
    },
    metrics: {
      overall: 86,
      technical: 88,
      tactical: 82,
      physical: 84,
      mental: 79,
      consistency: 85,
      power: 87,
      precision: 83,
      adaptability: 81
    },
    suggestions: generateSuggestions()
  };
};

const PLAYER1 = generateMockPlayerData("P1", "NOVAK DJOKOVIC");
const PLAYER2 = generateMockPlayerData("P2", "CARLOS ALCARAZ");

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function UploadPage() {
  const [phase, setPhase] = useState<Phase>("UPLOAD");
  const videoInputRef = useRef<HTMLInputElement>(null);
  const dataInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const PROCESSING_STEPS = [
    "INITIALIZING NEURAL NETWORKS...",
    "PARSING MATCH TELEMETRY...",
    "ANALYZING BIOMECHANICS...",
    "CALCULATING PERFORMANCE METRICS...",
    "GENERATING AI INSIGHTS...",
    "CREATING IMPROVEMENT PLAN..."
  ];

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
      className="min-h-screen w-full font-sans relative overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-orange-50/30 to-transparent" />
      </div>

      <AnimatePresence>
        {dragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center border-8 border-dashed border-blue-400/50 m-6 rounded-[4rem]"
          >
            <UploadCloud size={100} className="text-blue-600 mb-6 animate-bounce" />
            <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">DROP FILES HERE</h3>
            <p className="text-slate-500 text-lg">Release to upload match data</p>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "UPLOAD" && (
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-24 min-h-[85vh]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200">
              <Brain size={16} />
              AI-POWERED ANALYSIS
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                UPLOAD & ANALYZE
              </span>
            </h1>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto">
              Upload match footage and telemetry data for comprehensive performance analysis and AI-generated improvement suggestions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <UploadCard 
              title="Match Footage"
              subtitle="MP4, MOV, AVI (Max 2GB)"
              icon={<Film size={40} />}
              file={videoFile}
              onClick={handleVideoClick}
              color="blue"
              tag="VIDEO ANALYSIS"
              features={["Ball tracking", "Movement patterns", "Shot classification"]}
            >
              <input type="file" ref={videoInputRef} onChange={onVideoChange} className="hidden" accept="video/*"/>
            </UploadCard>

            <UploadCard 
              title="Telemetry Data"
              subtitle="CSV, JSON, XLSX"
              icon={<Database size={40} />}
              file={dataFile}
              onClick={handleDataClick}
              color="orange"
              tag="STATS IMPORT"
              features={["Biomechanics", "Heart rate", "Energy expenditure"]}
            >
              <input type="file" ref={dataInputRef} onChange={onDataChange} className="hidden" accept=".csv,.json,.xlsx"/>
            </UploadCard>
          </div>

          <AnimatePresence>
            {(videoFile || dataFile) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <button 
                  onClick={startAnalysis}
                  className="group relative flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Zap className="fill-yellow-300 text-yellow-300 group-hover:animate-pulse" />
                  START AI ANALYSIS
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {phase === "PROCESSING" && (
        <ProcessingView progress={progress} step={PROCESSING_STEPS[processingStep]} />
      )}

      {phase === "DASHBOARD" && (
        <DashboardView 
          player1={PLAYER1}
          player2={PLAYER2}
          onOpenComparison={() => setIsModalOpen(true)}
        />
      )}

      <AnimatePresence>
        {isModalOpen && (
          <ComparisonModal 
            player1={PLAYER1}
            player2={PLAYER2}
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>

      {phase !== "DASHBOARD" && <Footer />}
    </main>
  );
}

function UploadCard({ title, subtitle, icon, file, onClick, children, color, tag, features }: any) {
  const isSelected = !!file;
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`group relative h-[400px] rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden
        ${isSelected 
          ? color === 'blue' 
            ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-xl shadow-blue-200/50' 
            : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300 shadow-xl shadow-orange-200/50'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xl'
        }`}
    >
      {children}
      <div className={`absolute inset-0 opacity-10 ${
        color === 'blue' ? 'bg-[radial-gradient(#3b82f6_1px,transparent_1px)]' : 'bg-[radial-gradient(#f97316_1px,transparent_1px)]'
      } [background-size:16px_16px]`} />

      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        <div className={`mb-6 h-28 w-28 rounded-2xl flex items-center justify-center transition-all duration-500
          ${isSelected 
            ? color === 'blue' 
              ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-300' 
              : 'bg-orange-600 text-white scale-110 shadow-lg shadow-orange-300'
            : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:scale-105'
          }`}>
          {isSelected ? <CheckCircle2 size={48} strokeWidth={2} /> : icon}
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
          {isSelected ? "Ready for Analysis" : title}
        </h3>
        
        <p className={`font-medium mb-4 ${isSelected ? (color === 'blue' ? 'text-blue-700' : 'text-orange-700') : 'text-slate-400'}`}>
          {isSelected ? file.name : subtitle}
        </p>

        {!isSelected && features && (
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {features.map((feature: string, i: number) => (
              <span key={i} className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600">
                {feature}
              </span>
            ))}
          </div>
        )}
        
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase
          ${isSelected 
            ? color === 'blue' 
              ? 'bg-blue-200 text-blue-800' 
              : 'bg-orange-200 text-orange-800'
            : 'bg-slate-100 text-slate-600'
          }`}>
          {color === 'blue' ? <ScanEye size={12} /> : <Database size={12} />}
          {tag}
        </div>
      </div>
    </motion.div>
  );
}

function ProcessingView({ progress, step }: { progress: number, step: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <div className="absolute inset-[-20px] rounded-full border-2 border-blue-400/30 animate-ping" />
        <div className="absolute inset-[-40px] rounded-full border-2 border-orange-400/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        <div className="relative h-64 w-64">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle className="text-slate-700" strokeWidth="3" stroke="currentColor" fill="transparent" r="46" cx="50" cy="50" />
            <circle 
              className="text-blue-400 transition-all duration-300 ease-out" 
              strokeWidth="3" 
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
            <span className="text-5xl font-black text-white">{progress}%</span>
            <span className="text-xs font-bold text-blue-300 tracking-widest mt-2">PROCESSING</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white font-mono text-sm">{step}</span>
        </div>
        
        <p className="mt-4 text-blue-200/70 text-sm">
          Analyzing {Math.floor(progress * 248)} data points...
        </p>
      </motion.div>
    </div>
  );
}

function DashboardView({ player1, player2, onOpenComparison }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('match');

  return (
    <div className="relative pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Activity size={16} />
              <span>Analysis Complete • Match ID: #T2024-8823</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Performance Intelligence Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenComparison}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all text-slate-700 font-bold"
            >
              <Users size={18} />
              Compare Players
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-4">
          {['overview', 'technical', 'tactical', 'physical', 'mental', 'suggestions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all
                ${activeTab === tab 
                  ? 'bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-bold text-slate-400">TIME RANGE:</span>
          {['match', '1st set', '2nd set', '3rd set'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all
                ${timeRange === range 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <OverviewTab player={player1} />}
            {activeTab === 'technical' && <TechnicalTab player={player1} />}
            {activeTab === 'tactical' && <TacticalTab player={player1} />}
            {activeTab === 'physical' && <PhysicalTab player={player1} />}
            {activeTab === 'mental' && <MentalTab player={player1} />}
            {activeTab === 'suggestions' && <SuggestionsTab player={player1} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function OverviewTab({ player }: { player: PlayerData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Overall Performance"
          value={player.metrics.overall}
          icon={<Crown className="text-yellow-500" />}
          color="purple"
          trend={+2.5}
        />
        <MetricCard 
          title="Technical"
          value={player.metrics.technical}
          icon={<Swords className="text-blue-500" />}
          color="blue"
          trend={+1.8}
        />
        <MetricCard 
          title="Physical"
          value={player.metrics.physical}
          icon={<Battery className="text-green-500" />}
          color="green"
          trend={-0.5}
        />
        <MetricCard 
          title="Mental"
          value={player.metrics.mental}
          icon={<Brain className="text-orange-500" />}
          color="orange"
          trend={+3.2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Performance Radar</h3>
          <div className="aspect-square relative">
            <PerformanceRadar metrics={player.metrics} />
          </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-[#2D1B69] to-[#1A103C] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-50">
             <TrendingUp className="text-blue-400 w-24 h-24 opacity-10" />
          </div>
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-black text-blue-300 uppercase tracking-widest flex items-center gap-2">
               <Activity size={16} /> Match Momentum
             </h3>
             <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded">LIVE TRACKING</span>
          </div>
          <div className="h-[300px] relative">
            <MomentumChart data={player.stats.momentumData} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Shot Placement Heatmap</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-2">Forehand Distribution</h4>
            <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl relative">
              <ShotHeatmap data={player.stats.shotPlacementData.forehand} color="blue" />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-2">Backhand Distribution</h4>
            <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl relative">
              <ShotHeatmap data={player.stats.shotPlacementData.backhand} color="orange" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Aces" value={player.stats.serve.aces.reduce((a, b) => a + b, 0)} unit="" icon={<Zap size={16} />} />
        <StatBox label="1st Serve %" value={Math.round(player.stats.serve.firstServeIn.reduce((a, b) => a + b, 0) / player.stats.serve.firstServeIn.length)} unit="%" icon={<Target size={16} />} />
        <StatBox label="Distance" value={Math.round(player.stats.movement.distanceCovered.reduce((a, b) => a + b, 0))} unit="m" icon={<Footprints size={16} />} />
        <StatBox label="Win %" value={65} unit="%" icon={<Trophy size={16} />} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, trend }: any) {
  const colors: any = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} text-white shadow-lg`}>
          {icon}
        </div>
        {trend !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full
            ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h4 className="text-sm text-slate-500 mb-1">{title}</h4>
      <div className="text-3xl font-black text-slate-900">{value}</div>
      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StatBox({ label, value, unit, icon }: any) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        {icon}
        <span className="text-xs font-bold">{label}</span>
      </div>
      <div className="text-2xl font-black text-slate-900">
        {value}{unit}
      </div>
    </div>
  );
}

function TechnicalTab({ player }: { player: PlayerData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
          <Rocket size={16} className="text-blue-600" />
          Serve Performance Analysis
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="h-48">
              <ServeChart data={player.stats.serve} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {player.stats.serve.placementAccuracy.map((item, i) => (
                <div key={i} className="text-center p-2 bg-slate-50 rounded-lg">
                  <div className="text-xs text-slate-500">{item.target}</div>
                  <div className="text-lg font-black text-blue-600">{item.success}%</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-3">Serve Speed Distribution</h4>
            <div className="space-y-3">
              {player.stats.serve.serveSpeed.byZone.map((zone, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{zone.zone}</span>
                    <span className="font-bold">{zone.speed} km/h</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.percentage}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <h4 className="text-xs font-bold text-blue-800 mb-2">💡 RECOMMENDATION</h4>
              <p className="text-sm text-blue-900">
                Increase first serve percentage to wide zones. Current success rate of 72% on wide serves is excellent - use this pattern more frequently on break points.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
            <Swords size={16} className="text-blue-600" />
            Forehand Analysis
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-black text-slate-900">
                  {Math.round(player.stats.groundstrokes.forehand.winners.reduce((a, b) => a + b, 0))}
                </div>
                <div className="text-xs text-slate-500">Total Winners</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">
                  {Math.round(player.stats.groundstrokes.forehand.errors.reduce((a, b) => a + b, 0))}
                </div>
                <div className="text-xs text-slate-500">Unforced Errors</div>
              </div>
            </div>

            <div className="h-32">
              <GroundstrokeChart data={player.stats.groundstrokes.forehand} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500">Crosscourt</div>
                <div className="text-lg font-black text-blue-600">
                  {Math.round(player.stats.groundstrokes.forehand.crosscourt)}%
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500">Down the Line</div>
                <div className="text-lg font-black text-orange-600">
                  {Math.round(player.stats.groundstrokes.forehand.downTheLine)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
            <Swords size={16} className="text-orange-600" />
            Backhand Analysis
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-black text-slate-900">
                  {Math.round(player.stats.groundstrokes.backhand.winners.reduce((a, b) => a + b, 0))}
                </div>
                <div className="text-xs text-slate-500">Total Winners</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">
                  {Math.round(player.stats.groundstrokes.backhand.errors.reduce((a, b) => a + b, 0))}
                </div>
                <div className="text-xs text-slate-500">Unforced Errors</div>
              </div>
            </div>

            <div className="h-32">
              <GroundstrokeChart data={player.stats.groundstrokes.backhand} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500">Crosscourt</div>
                <div className="text-lg font-black text-blue-600">
                  {Math.round(player.stats.groundstrokes.backhand.crosscourt)}%
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500">Down the Line</div>
                <div className="text-lg font-black text-orange-600">
                  {Math.round(player.stats.groundstrokes.backhand.downTheLine)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TacticalTab({ player }: { player: PlayerData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Tactical Patterns</h3>
          <div className="space-y-4">
            {player.stats.tacticalPatterns.map((pattern, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-900">{pattern.pattern}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    pattern.success > 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {pattern.success}% Success
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Activity size={12} />
                  <span>Frequency: {pattern.frequency}%</span>
                </div>
                <p className="text-sm text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                  💡 {pattern.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Rally Analysis</h3>
          <div className="h-64">
            <RallyChart data={player.stats.rallyData} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-500">Avg Length</div>
              <div className="text-lg font-black text-slate-900">5.2</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-500">Longest</div>
              <div className="text-lg font-black text-slate-900">24</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-500">Win %</div>
              <div className="text-lg font-black text-green-600">58%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Shot Selection Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <h4 className="text-xs font-bold text-blue-800 mb-2">AGGRESSIVE SHOTS</h4>
            <div className="text-2xl font-black text-blue-600">156</div>
            <div className="text-xs text-blue-700">42% of total shots</div>
            <div className="mt-2 h-1.5 bg-white/50 rounded-full">
              <div className="h-full w-[42%] bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <h4 className="text-xs font-bold text-green-800 mb-2">NEUTRAL SHOTS</h4>
            <div className="text-2xl font-black text-green-600">178</div>
            <div className="text-xs text-green-700">48% of total shots</div>
            <div className="mt-2 h-1.5 bg-white/50 rounded-full">
              <div className="h-full w-[48%] bg-green-600 rounded-full" />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <h4 className="text-xs font-bold text-orange-800 mb-2">DEFENSIVE SHOTS</h4>
            <div className="text-2xl font-black text-orange-600">37</div>
            <div className="text-xs text-orange-700">10% of total shots</div>
            <div className="mt-2 h-1.5 bg-white/50 rounded-full">
              <div className="h-full w-[10%] bg-orange-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhysicalTab({ player }: { player: PlayerData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Energy & Fatigue Analysis</h3>
        <div className="h-80">
          <EnergyChart data={player.stats.energyExpenditure} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Court Coverage</h3>
          <div className="space-y-4">
            {player.stats.movement.courtCoverage.map((zone, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{zone.zone}</span>
                  <span className="text-slate-500">{zone.time}s | {zone.efficiency}% eff.</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.efficiency}%` }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <h4 className="text-xs font-bold text-orange-800 mb-2">⚠️ AREA FOR IMPROVEMENT</h4>
            <p className="text-sm text-orange-900">
              Backhand corner coverage efficiency is 72% - 13% lower than forehand side. Focus on lateral movement drills.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Physical Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Agility Score</span>
                <span className="font-bold">{Math.round(player.stats.movement.agilityScore.reduce((a, b) => a + b, 0) / player.stats.movement.agilityScore.length)}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${player.stats.movement.agilityScore.reduce((a, b) => a + b, 0) / player.stats.movement.agilityScore.length}%` }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Reaction Time</span>
                <span className="font-bold">{Math.round(player.stats.movement.reactionTime.reduce((a, b) => a + b, 0) / player.stats.movement.reactionTime.length)}ms</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - (player.stats.movement.reactionTime.reduce((a, b) => a + b, 0) / player.stats.movement.reactionTime.length)}%` }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Recovery Rate</span>
                <span className="font-bold">{Math.round(player.stats.physical.recoveryRate.reduce((a, b) => a + b, 0) / player.stats.physical.recoveryRate.length)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${player.stats.physical.recoveryRate.reduce((a, b) => a + b, 0) / player.stats.physical.recoveryRate.length}%` }}
                  className="h-full bg-orange-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MentalTab({ player }: { player: PlayerData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Pressure Points</h3>
          <div className="h-64">
            <PressureChart data={player.stats.mental} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">Mental Metrics</h3>
          <div className="space-y-4">
            <MentalMetric 
              label="Concentration"
              value={Math.round(player.stats.mental.concentration.reduce((a, b) => a + b, 0) / player.stats.mental.concentration.length)}
              color="blue"
            />
            <MentalMetric 
              label="Decision Making"
              value={Math.round(player.stats.mental.decisionMaking.reduce((a, b) => a + b, 0) / player.stats.mental.decisionMaking.length)}
              color="green"
            />
            <MentalMetric 
              label="Clutch Rating"
              value={Math.round(player.stats.mental.clutchRating.reduce((a, b) => a + b, 0) / player.stats.mental.clutchRating.length)}
              color="orange"
            />
          </div>
          <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <h4 className="text-xs font-bold text-purple-800 mb-2">🧠 MENTAL COACH INSIGHT</h4>
            <p className="text-sm text-purple-900">
              Your performance under pressure drops 23% in tiebreaks. Practice pressure situations with consequence training.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MentalMetric({ label, value, color }: any) {
  const colors: any = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600'
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-600">{label}</span>
        <span className="font-bold text-slate-900">{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
}

function SuggestionsTab({ player }: { player: PlayerData }) {
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-black mb-1">
            {player.suggestions.filter((s: Suggestion) => s.priority === 'high').length}
          </div>
          <div className="text-sm opacity-90">High Priority</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-black mb-1">
            {player.suggestions.filter((s: Suggestion) => s.priority === 'medium').length}
          </div>
          <div className="text-sm opacity-90">Medium Priority</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-black mb-1">
            {player.suggestions.filter((s: Suggestion) => s.priority === 'low').length}
          </div>
          <div className="text-sm opacity-90">Low Priority</div>
        </div>
      </div>

      <div className="space-y-4">
        {player.suggestions.map((suggestion: Suggestion, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setExpandedSuggestion(expandedSuggestion === suggestion.category ? null : suggestion.category)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                      suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {suggestion.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-xs text-slate-400">{suggestion.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{suggestion.title}</h3>
                  <p className="text-slate-600 mb-3">{suggestion.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <TrendingUp size={16} />
                      <span>+{suggestion.expectedImprovement}% expected improvement</span>
                    </div>
                  </div>
                </div>
                <div className={`transform transition-transform ${expandedSuggestion === suggestion.category ? 'rotate-180' : ''}`}>
                  <Move size={20} className="text-slate-400" />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedSuggestion === suggestion.category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-200 bg-slate-50"
                >
                  <div className="p-6">
                    <h4 className="text-sm font-black text-slate-400 mb-3 uppercase">Recommended Drills</h4>
                    <div className="space-y-3">
                      {suggestion.drills.map((drill, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </div>
                          <span className="text-slate-700">{drill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ComparisonModal({ player1, player2, onClose }: { player1: PlayerData, player2: PlayerData, onClose: () => void }) {
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
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 rounded-t-3xl p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900">Head-to-Head Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-black text-slate-400 mb-4 uppercase">Overall Performance</h4>
              <div className="grid grid-cols-2 gap-8">
                <ComparisonMetric 
                  label="Overall Rating"
                  value1={player1.metrics.overall}
                  value2={player2.metrics.overall}
                  color1="blue"
                  color2="orange"
                />
                <ComparisonMetric 
                  label="Technical"
                  value1={player1.metrics.technical}
                  value2={player2.metrics.technical}
                  color1="blue"
                  color2="orange"
                />
                <ComparisonMetric 
                  label="Physical"
                  value1={player1.metrics.physical}
                  value2={player2.metrics.physical}
                  color1="blue"
                  color2="orange"
                />
                <ComparisonMetric 
                  label="Mental"
                  value1={player1.metrics.mental}
                  value2={player2.metrics.mental}
                  color1="blue"
                  color2="orange"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black text-slate-400 mb-4 uppercase">Serve Performance</h4>
              <div className="grid grid-cols-2 gap-8">
                <ComparisonMetric 
                  label="1st Serve %"
                  value1={Math.round(player1.stats.serve.firstServeIn.reduce((a, b) => a + b, 0) / player1.stats.serve.firstServeIn.length)}
                  value2={Math.round(player2.stats.serve.firstServeIn.reduce((a, b) => a + b, 0) / player2.stats.serve.firstServeIn.length)}
                  color1="blue"
                  color2="orange"
                />
                <ComparisonMetric 
                  label="1st Serve Won"
                  value1={Math.round(player1.stats.serve.firstServeWon.reduce((a, b) => a + b, 0) / player1.stats.serve.firstServeWon.length)}
                  value2={Math.round(player2.stats.serve.firstServeWon.reduce((a, b) => a + b, 0) / player2.stats.serve.firstServeWon.length)}
                  color1="blue"
                  color2="orange"
                />
                <ComparisonMetric 
                  label="Aces"
                  value1={player1.stats.serve.aces.reduce((a, b) => a + b, 0)}
                  value2={player2.stats.serve.aces.reduce((a, b) => a + b, 0)}
                  color1="blue"
                  color2="orange"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black text-slate-400 mb-4 uppercase">Movement</h4>
              <div className="grid grid-cols-2 gap-8">
                <ComparisonMetric 
                  label="Distance (m)"
                  value1={Math.round(player1.stats.movement.distanceCovered.reduce((a, b) => a + b, 0))}
                  value2={Math.round(player2.stats.movement.distanceCovered.reduce((a, b) => a + b, 0))}
                  color1="blue"
                  color2="orange"
                />
                <ComparisonMetric 
                  label="Agility"
                  value1={Math.round(player1.stats.movement.agilityScore.reduce((a, b) => a + b, 0) / player1.stats.movement.agilityScore.length)}
                  value2={Math.round(player2.stats.movement.agilityScore.reduce((a, b) => a + b, 0) / player2.stats.movement.agilityScore.length)}
                  color1="blue"
                  color2="orange"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComparisonMetric({ label, value1, value2, color1, color2 }: any) {
  const total = value1 + value2;
  const percent1 = (value1 / total) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-600">{label}</span>
        <div className="flex gap-4">
          <span className={`font-bold text-${color1}-600`}>{value1}</span>
          <span className={`font-bold text-${color2}-600`}>{value2}</span>
        </div>
      </div>
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent1}%` }}
          className={`absolute left-0 top-0 bottom-0 bg-${color1}-600 rounded-l-full`}
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${100 - percent1}%` }}
          className={`absolute right-0 top-0 bottom-0 bg-${color2}-600 rounded-r-full`}
        />
      </div>
    </div>
  );
}

function PerformanceRadar({ metrics }: any) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
        <polygon
          key={i}
          points={Array.from({ length: 6 }, (_, i) => {
            const angle = (i * 60 - 30) * Math.PI / 180;
            const x = 50 + 40 * level * Math.cos(angle);
            const y = 50 + 40 * level * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="0.5"
        />
      ))}
      
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60 - 30) * Math.PI / 180;
        const x = 50 + 40 * Math.cos(angle);
        const y = 50 + 40 * Math.sin(angle);
        return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#e2e8f0" strokeWidth="0.5" />;
      })}

      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        points={[
          [50 + 40 * (metrics.overall / 100) * Math.cos((-30) * Math.PI / 180), 50 + 40 * (metrics.overall / 100) * Math.sin((-30) * Math.PI / 180)],
          [50 + 40 * (metrics.technical / 100) * Math.cos((30) * Math.PI / 180), 50 + 40 * (metrics.technical / 100) * Math.sin((30) * Math.PI / 180)],
          [50 + 40 * (metrics.physical / 100) * Math.cos((90) * Math.PI / 180), 50 + 40 * (metrics.physical / 100) * Math.sin((90) * Math.PI / 180)],
          [50 + 40 * (metrics.mental / 100) * Math.cos((150) * Math.PI / 180), 50 + 40 * (metrics.mental / 100) * Math.sin((150) * Math.PI / 180)],
          [50 + 40 * (metrics.consistency / 100) * Math.cos((210) * Math.PI / 180), 50 + 40 * (metrics.consistency / 100) * Math.sin((210) * Math.PI / 180)],
          [50 + 40 * (metrics.power / 100) * Math.cos((270) * Math.PI / 180), 50 + 40 * (metrics.power / 100) * Math.sin((270) * Math.PI / 180)]
        ].map(p => p.join(',')).join(' ')}
        fill="url(#grad)"
        fillOpacity="0.3"
        stroke="url(#grad)"
        strokeWidth="2"
      />
      
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MomentumChart({ data }: any) {
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverData, setHoverData] = useState<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !data.length) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const index = Math.min(data.length - 1, Math.max(0, Math.floor((x / width) * data.length)));
    setHoverX(x);
    setHoverData(data[index]);
  };

  const handleLeave = () => { setHoverX(null); setHoverData(null); };

  const points = data.map((d: any, i: number) => `${(i / (data.length - 1)) * 100},${50 - ((d.value - 100) / 2)}`).join(" ");
  const areaPath = `M 0,50 L ${points} L 100,50 Z`;
  const linePath = `M ${points.replace(/ /g, " L ")}`;

  return (
    <div className="w-full h-full relative cursor-crosshair" ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleLeave}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="cyan" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="cyan" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
        </defs>
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeOpacity="0.2" strokeDasharray="1" strokeWidth="0.2" />
        <path d={areaPath} fill="url(#mGrad)" />
        <path d={linePath} fill="none" stroke="cyan" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      </svg>

      {hoverX !== null && hoverData && (
        <>
          <div className="absolute top-0 bottom-0 w-[1px] bg-white pointer-events-none" style={{ left: hoverX }} />
          <div className="absolute w-3 h-3 bg-white rounded-full shadow-lg border-2 border-cyan-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" 
               style={{ left: hoverX, top: `${50 - ((hoverData.value - 100) / 2)}%` }} />
          <div className="absolute bg-slate-900/90 backdrop-blur border border-slate-700 p-2 rounded-lg shadow-xl text-white text-xs z-30 pointer-events-none whitespace-nowrap"
               style={{ left: Math.min(Math.max(hoverX, 60), (ref.current?.offsetWidth || 0) - 80), top: '10%' }}>
            <div className="font-bold text-lg">{Math.round(hoverData.value)}</div>
            <div className="text-slate-400 text-[10px]">MOMENTUM INDEX</div>
          </div>
        </>
      )}

      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-blue-300 opacity-60">Novak DOMINANT</div>
      <div className="absolute bottom-2 right-2 text-[8px] font-bold text-blue-300 opacity-60">Carlos DOMINANT</div>
    </div>
  );
}

function ShotHeatmap({ data, color }: any) {
  return (
    <svg className="w-full h-full">
      {data.map((point: any, i: number) => (
        <motion.circle
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.01 }}
          cx={`${point.x}%`}
          cy={`${point.y}%`}
          r={point.made ? point.power / 15 : point.power / 20}
          fill={point.made ? (color === 'blue' ? '#3b82f6' : '#f97316') : '#94a3b8'}
          opacity={point.made ? 0.6 : 0.3}
        />
      ))}
    </svg>
  );
}

function ServeChart({ data }: any) {
  return (
    <svg className="w-full h-full">
      {data.firstServeIn.map((value: number, i: number) => (
        <motion.rect
          key={i}
          x={`${i * 8}%`}
          y={`${100 - value}%`}
          width="6%"
          height={`${value}%`}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ delay: i * 0.05 }}
          fill={i % 2 === 0 ? '#3b82f6' : '#60a5fa'}
          rx="2"
        />
      ))}
    </svg>
  );
}

function GroundstrokeChart({ data }: any) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  // Safe Access: Ensure 'winners' and 'errors' exist before mapping.
  // Fallback to empty array to prevent "undefined" error.
  const winners = data?.winners || [];
  const errors = data?.errors || [];

  return (
    <div className="w-full h-full relative">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {winners.map((val: number, i: number) => {
          const x = i * 8.33;
          const w = 5;
          const winHeight = val * 5; 
          const errHeight = (errors[i] || 0) * 5; // Handle potential missing error data index
          return (
            <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
              {/* Winner Bar */}
              <rect x={x} y={100 - winHeight} width={w} height={winHeight} fill="#3b82f6" rx="1" opacity={hoverIndex === i ? 1 : 0.8} />
              
              {/* Error Bar (Stacked) */}
              <rect x={x} y={100 - winHeight - errHeight - 1} width={w} height={errHeight} fill="#f97316" rx="1" opacity={hoverIndex === i ? 1 : 0.8} />
              
              {/* Touch Target */}
              <rect x={x} y="0" width={w} height="100" fill="transparent" />
            </g>
          );
        })}
      </svg>
      {hoverIndex !== null && (
        <div className="absolute bg-slate-800 text-white text-xs p-2 rounded shadow-lg -translate-x-1/2 pointer-events-none z-10 whitespace-nowrap"
             style={{ left: `${hoverIndex * 8.33 + 2.5}%`, top: '0%' }}>
          <div className="flex gap-2">
            <span className="text-blue-400">W: {winners[hoverIndex]}</span>
            <span className="text-orange-400">UE: {errors[hoverIndex]}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function RallyChart({ data }: any) {
  return (
    <svg className="w-full h-full">
      {data.map((rally: any, i: number) => (
        <motion.circle
          key={i}
          cx={`${(i + 1) * 10}%`}
          cy={`${100 - rally.length * 4}%`}
          r={rally.length}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
          fill={rally.winner === 'forehand' ? '#3b82f6' : '#f97316'}
          opacity="0.6"
        />
      ))}
    </svg>
  );
}

function EnergyChart({ data }: any) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {data.map((point: any, i: number) => (
        <g key={i}>
          <motion.circle
            cx={`${(i / (data.length - 1)) * 100}`}
            cy={`${100 - point.energy}`}
            r="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.02 }}
            fill="#3b82f6"
          />
          <motion.circle
            cx={`${(i / (data.length - 1)) * 100}`}
            cy={`${100 - point.intensity}`}
            r="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.02 }}
            fill="#f97316"
          />
        </g>
      ))}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
        d={generateEnergyPath(data)}
        stroke="#3b82f6"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="2,2"
      />
    </svg>
  );
}

function PressureChart({ data }: any) {
  return (
    <svg className="w-full h-full">
      {data.pressurePoints.map((value: number, i: number) => (
        <motion.rect
          key={i}
          x={`${i * 8}%`}
          y={`${100 - value}%`}
          width="6%"
          height={`${value}%`}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ delay: i * 0.05 }}
          fill={`hsl(${value * 1.2}, 70%, 50%)`}
          rx="2"
        />
      ))}
    </svg>
  );
}

function generatePath(data: any[]): string {
  if (!data.length) return '';
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - d.value
  }));
  
  return points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');
}

function generateEnergyPath(data: any[]): string {
  if (!data.length) return '';
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - d.energy
  }));
  
  return points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');
}