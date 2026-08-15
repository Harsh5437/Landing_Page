import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IndependenceDayBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Show banner only until August 17, 2026
    const endDate = new Date('2026-08-17T00:00:00+05:30');
    if (new Date() < endDate) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-full z-50 overflow-hidden bg-gradient-to-r from-[#FF9933] via-[#ffeedd] to-[#138808] animate-live-gradient"
        >
          <style>{`
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-live-gradient {
              background-size: 200% 200%;
              animation: gradient-shift 6s ease infinite;
            }
          `}</style>
          {/* Subtle animated overlay for premium feel */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-center min-h-[40px]">
            <div className="flex-1 flex flex-row items-center justify-center gap-3 md:gap-6 text-[#060c1d] font-bold text-xs sm:text-sm md:text-[15px] tracking-wide text-center drop-shadow-sm">
              <span className="text-lg md:text-xl transform hover:scale-110 transition-transform duration-300">🇮🇳</span>
              <span className="uppercase tracking-widest font-extrabold flex items-center gap-2">
                Happy Independence Day
                <span className="hidden sm:inline font-medium capitalize text-[#060c1d]/80 text-xs md:text-sm tracking-normal">
                  — Celebrating the spirit of freedom and unity
                </span>
              </span>
              <span className="text-lg md:text-xl transform hover:scale-110 transition-transform duration-300">🇮🇳</span>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-3 sm:right-6 p-1.5 rounded-full hover:bg-black/10 transition-all duration-300 text-[#060c1d]/70 hover:text-black group active:scale-95"
              aria-label="Close banner"
            >
              <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IndependenceDayBanner;
