import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
    isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [shouldShow, setShouldShow] = useState(true);

    const statuses = [
        "INITIALIZING CORE SYSTEM",
        "LOADING ARCHITECTURAL ASSETS",
        "RENDERING SPATIAL MODELS",
        "OPTIMIZING VIEWPORT",
        "SYSTEM READY"
    ];

    useEffect(() => {
        // Start progress bar immediately on mount
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setAnimationFinished(true);
                    return 100;
                }
                const increment = Math.random() * 18 + 2;
                const next = Math.min(prev + increment, 100);
                if (next >= 100) {
                    setAnimationFinished(true);
                }
                return next;
            });
        }, 150);

        const statusInterval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 600);

        return () => {
            clearInterval(interval);
            clearInterval(statusInterval);
        };
    }, []);

    useEffect(() => {
        // Only hide screen when both the video isLoading prop is false AND the progress reaches 100%
        if (!isLoading && animationFinished) {
            const timeout = setTimeout(() => {
                setShouldShow(false);
            }, 600); // slight premium delay for absolute visual confirmation
            return () => clearTimeout(timeout);
        }
    }, [isLoading, animationFinished]);

    const logoLetters = "URBANBUILD".split("");

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal overflow-hidden"
                    style={{ background: "hsl(0, 0%, 6%)" }}
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                        {/* Animated Grid */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.05 }}
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                                    linear-gradient(hsla(0,0%,100%,0.1) 1px, transparent 1px), 
                                    linear-gradient(90deg, hsla(0,0%,100%,0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: "40px 40px",
                            }}
                        />
                        
                        {/* Moving Scanning Line */}
                        <motion.div 
                            animate={{ 
                                top: ["-10%", "110%"],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                ease: "linear" 
                            }}
                            className="absolute left-0 right-0 h-[1px] bg-white/10 z-10"
                        />

                        {/* Radial Glows */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[800px] h-[800px] bg-steel/5 rounded-full blur-[120px] animate-pulse" />
                        </div>

                        {/* Jittering Coordinates */}
                        <div className="absolute top-10 right-10 flex flex-col items-end font-mono text-[0.5rem] text-white/10 select-none">
                            <motion.span animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 0.5 }}>LAT: 28.6139° N</motion.span>
                            <motion.span animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}>LNG: 77.2090° E</motion.span>
                            <motion.span animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}>ALT: 216.0m</motion.span>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="relative z-20 flex flex-col items-center">
                        
                        {/* Logo Animation */}
                        <div className="flex mb-16">
                            {logoLetters.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: i * 0.05,
                                        ease: [0.2, 0.65, 0.3, 0.9]
                                    }}
                                    className="text-3xl md:text-5xl font-bold tracking-[0.2em] text-white"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                            <motion.sup 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ delay: 1 }}
                                className="relative top-[-10px] text-[0.6rem] font-medium ml-2"
                            >
                                ™
                            </motion.sup>
                        </div>

                        {/* Technical Progress Section */}
                        <div className="w-64 md:w-80 flex flex-col gap-4">
                            
                            {/* Status and Percentage */}
                            <div className="flex justify-between items-end">
                                <motion.div
                                    key={statusIndex}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[0.6rem] tracking-[0.2em] text-white/40 font-mono uppercase"
                                >
                                    {statuses[statusIndex]}
                                </motion.div>
                                <div className="text-[0.7rem] font-mono text-steel-light font-bold">
                                    {Math.round(progress)}%
                                </div>
                            </div>

                            {/* Multi-layered Progress Bar */}
                            <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                {/* Ghost Fill */}
                                <motion.div 
                                    className="absolute inset-y-0 left-0 bg-steel/20"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                                {/* Main Fill */}
                                <motion.div 
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-steel/60 to-steel shadow-[0_0_10px_rgba(71,133,184,0.5)]"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                                {/* Shimmer Effect on bar */}
                                <motion.div 
                                    animate={{ left: ["-100%", "100%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                />
                            </div>

                            {/* Bottom Metadata */}
                            <div className="flex justify-between items-start mt-2">
                                <div className="flex flex-col gap-1">
                                    <div className="w-12 h-[1px] bg-steel/30" />
                                    <span className="text-[0.5rem] text-white/20 font-mono text-balance">PRECISION ENGINEERING</span>
                                </div>
                                <div className="text-[0.5rem] text-white/20 font-mono text-right">
                                    CORE_INIT_SECURE<br/>
                                    EST. 2024
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Corner Elements (Blueprint style) */}
                    <div className="absolute top-10 left-10 w-24 h-24 pointer-events-none opacity-20">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-white" />
                        <div className="absolute top-0 left-0 w-[1px] h-full bg-white" />
                        <span className="absolute top-2 left-2 font-mono text-[10px] text-white rotate-90 origin-top-left">0.00mm</span>
                    </div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 pointer-events-none opacity-20">
                        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white" />
                        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white" />
                        <span className="absolute bottom-2 right-2 font-mono text-[10px] text-white">X-742_Y-901</span>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;

