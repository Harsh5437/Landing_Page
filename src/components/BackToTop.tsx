import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Throttled scroll handler for better performance
    useEffect(() => {
        let ticking = false;

        const toggleVisibility = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    setIsVisible(window.scrollY > 400);
                    ticking = false;
                });
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
                    aria-label="Back to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
