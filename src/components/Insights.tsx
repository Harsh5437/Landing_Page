import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  BarChart3, 
  Award, 
  Zap, 
  Activity, 
  TrendingUp, 
  Building2, 
  Calendar, 
  ChevronRight, 
  X, 
  Info,
  Layers,
  MapPin
} from "lucide-react";



const Insights = () => {

  // Math wave settings
  const waveCount = 10;

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 relative overflow-hidden transition-colors duration-300 select-none">
      
      {/* Mathematical Undulating Ripple Wave Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <svg className="w-full h-full opacity-40 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: waveCount }).map((_, i) => {
            const yOffset = i * 90 + 60;
            const pathData = `M 0,${yOffset} Q 200,${yOffset - 35} 400,${yOffset} T 800,${yOffset} T 1200,${yOffset} T 1600,${yOffset} T 2000,${yOffset}`;
            return (
              <motion.path
                key={i}
                d={pathData}
                fill="none"
                strokeWidth="1.2"
                className="stroke-accent/10 dark:stroke-[#1A7EFF]/10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.08,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </svg>
      </div>

      <div className="max-w-6xl w-full mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Section Header (Matches Team Page Style) */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-space text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-3 max-w-4xl transition-all duration-300"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">Insights</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed max-w-2xl"
          >
            High-fidelity analytics, structural engineering calculations, and rigorous technical methodologies that validate Urbanbuild's public infrastructure excellence.
          </motion.p>
        </div>



        {/* 1. Sleek HUD Statistics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mx-auto mb-8">
          {[
            { value: "336+", label: "Projects Handled", icon: BarChart3, color: "from-[#1A7EFF] to-[#1A7EFF]/60", bg: "rgba(26,126,255,0.03)", border: "border-[#1A7EFF]/25" },
            { value: "5Cr+", label: "Total Cost", icon: Award, color: "from-accent to-accent/60", bg: "rgba(212,175,55,0.03)", border: "border-accent/25" },
            { value: "40+", label: "Expert Engineers", icon: Zap, color: "from-emerald-500 to-emerald-500/60", bg: "rgba(16,185,129,0.03)", border: "border-emerald-500/25" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{ backgroundColor: stat.bg }}
                className={`relative p-6 rounded-2xl border ${stat.border} shadow-lg backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all duration-300 group`}
              >
                {/* Tech Corners Decoration */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-foreground/30 rounded-tl" />
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-foreground/30 rounded-tr" />
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-foreground/30 rounded-bl" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-foreground/30 rounded-br" />

                {/* Soft Icon Ring */}
                <div className="h-12 w-12 rounded-xl bg-card border border-border flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                  <Icon className="h-5 w-5 stroke-[1.8]" />
                </div>

                <span className="text-4xl md:text-5xl font-space font-black tracking-tight text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                  {stat.value}
                </span>
                
                <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.22em] text-muted-foreground uppercase">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* 2. Lifecycle Distribution Card */}
        <div className="w-full max-w-5xl bg-white/85 dark:bg-[#060c1d]/90 border border-gray-200/80 dark:border-accent/25 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl backdrop-blur-2xl mb-8 relative overflow-hidden flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-gray-200/60 dark:border-border/40 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs md:text-sm font-space font-black tracking-widest text-foreground uppercase">LIFECYCLE DISTRIBUTION</h3>
            </div>
            <span className="text-[10px] md:text-xs font-mono text-accent">231 WORKS ACTIVE // 69% DONE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
            {/* Left Side: Concentric Donut / Progress Ring (4 Columns) */}
            <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG Donut Chart for Lifecycle */}
                <svg width="170" height="170" viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* Outer circle: Completed (69%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 0.69)}
                    className="opacity-15"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 0.69)}
                    className="filter drop-shadow-[0_0_6px_rgba(16,185,129,0.5)] transition-all duration-500"
                  />
                  {/* Middle circle: Running (23%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="transparent"
                    stroke="#1A7EFF"
                    strokeWidth="7"
                    strokeDasharray="188.4"
                    strokeDashoffset={188.4 - (188.4 * 0.23)}
                    className="opacity-15"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="transparent"
                    stroke="#1A7EFF"
                    strokeWidth="7"
                    strokeDasharray="188.4"
                    strokeDashoffset={188.4 - (188.4 * 0.23)}
                    className="filter drop-shadow-[0_0_4px_rgba(26,126,255,0.5)] transition-all duration-500"
                  />
                  {/* Inner circle: Pipeline (8%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="21"
                    fill="transparent"
                    stroke="#D4AF37"
                    strokeWidth="6"
                    strokeDasharray="131.9"
                    strokeDashoffset={131.9 - (131.9 * 0.08)}
                    className="opacity-15"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="21"
                    fill="transparent"
                    stroke="#D4AF37"
                    strokeWidth="6"
                    strokeDasharray="131.9"
                    strokeDashoffset={131.9 - (131.9 * 0.08)}
                    className="filter drop-shadow-[0_0_3px_rgba(212,175,55,0.5)] transition-all duration-500"
                  />
                </svg>

                {/* Central Stats readout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-2xl font-space font-black text-foreground leading-none">231</span>
                  <span className="text-[7.5px] font-mono tracking-widest text-muted-foreground uppercase mt-1">TOTAL WORKS</span>
                </div>
              </div>
            </div>

            {/* Right Side: Process bars & Detailed break-down (6 Columns) */}
            <div className="col-span-1 md:col-span-6 flex flex-col gap-5">
              
              {/* Category: Completed */}
              <div className="flex flex-col gap-1.5 bg-gray-50/50 dark:bg-[#0c1631]/40 border border-gray-200/50 dark:border-[#1A7EFF]/10 p-4 rounded-2xl">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="font-space font-bold uppercase tracking-wider">Completed</span>
                  </div>
                  <div className="font-mono font-bold">
                    <span className="text-foreground">160 Works</span>
                    <span className="text-emerald-500 ml-2">69%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "69%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>

              {/* Category: Running */}
              <div className="flex flex-col gap-1.5 bg-gray-50/50 dark:bg-[#0c1631]/40 border border-gray-200/50 dark:border-[#1A7EFF]/10 p-4 rounded-2xl">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1A7EFF] shadow-[0_0_8px_rgba(26,126,255,0.6)]" />
                    <span className="font-space font-bold uppercase tracking-wider">Running</span>
                  </div>
                  <div className="font-mono font-bold">
                    <span className="text-foreground">53 Works</span>
                    <span className="text-[#1A7EFF] ml-2">23%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "23%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
                    className="h-full bg-[#1A7EFF] rounded-full shadow-[0_0_8px_rgba(26,126,255,0.5)]"
                  />
                </div>
              </div>

              {/* Category: Pipeline */}
              <div className="flex flex-col gap-1.5 bg-gray-50/50 dark:bg-[#0c1631]/40 border border-gray-200/50 dark:border-[#1A7EFF]/10 p-4 rounded-2xl">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                    <span className="font-space font-bold uppercase tracking-wider">Pipeline</span>
                  </div>
                  <div className="font-mono font-bold">
                    <span className="text-foreground">18 Works</span>
                    <span className="text-[#D4AF37] ml-2">8%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "8%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
