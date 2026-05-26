import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Mouse, ChevronDown } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import heroVideo from "@/assets/hero-video.mp4";
import logo from "@/assets/logo-optimized.png";
import LoadingScreen from "./LoadingScreen";

const rotatingWords = [
  "Design",
  "Consultancy",
  "Construction",
  "Training",
  "Planning",
  "Quality Control",
  "Real Estate",
  "Automation"
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const hasReadyFired = useRef(false);

  // Mouse tilt effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 30, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mark video as ready (only once)
  const handleVideoReady = useCallback(() => {
    if (hasReadyFired.current) return;
    hasReadyFired.current = true;
    setIsVideoLoading(false);
  }, []);

  // Lock body scroll while loading
  useEffect(() => {
    if (isVideoLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoLoading]);

  // Mobile fix: manually trigger play() and add fallback timeout
  useEffect(() => {
    const video = videoRef.current;

    // Fallback: dismiss loading screen after 3s even if video hasn't loaded
    // (mobile browsers may not pre-buffer video at all)
    const fallbackTimer = setTimeout(() => {
      handleVideoReady();
    }, 3000);

    if (video) {
      // Try to force play on mobile (autoplay can silently fail)
      const tryPlay = () => {
        video.play().catch(() => {
          // Autoplay blocked — dismiss loading screen anyway
          handleVideoReady();
        });
      };

      // Listen to multiple events — whichever fires first on this device
      video.addEventListener("canplaythrough", handleVideoReady);
      video.addEventListener("playing", handleVideoReady);

      // If video data is already loaded (cached), fire immediately
      if (video.readyState >= 3) {
        handleVideoReady();
      } else {
        video.addEventListener("loadeddata", tryPlay);
      }

      // Also try playing immediately
      tryPlay();

      return () => {
        clearTimeout(fallbackTimer);
        video.removeEventListener("canplaythrough", handleVideoReady);
        video.removeEventListener("playing", handleVideoReady);
        video.removeEventListener("loadeddata", tryPlay);
      };
    }

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [handleVideoReady]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax — uses GPU-composited transforms only (translateY + opacity)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.1]);

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")?.slice(1);
    const targetElement = document.getElementById(targetId || "");

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isVideoLoading} />
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-screen w-full overflow-hidden bg-charcoal perspective-[1000px]"
      >
        {/* Video Background — will-change hint for GPU compositing */}
        <motion.video
          ref={videoRef as React.Ref<HTMLVideoElement>}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ y, opacity, willChange: "transform, opacity" }}
          className="absolute inset-0 h-[120%] w-full object-cover blur-[1px]"
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>

        {/* Soft glassmorphic blur backdrop for premium readability */}
        <div className="absolute inset-0 z-10 bg-charcoal/20 backdrop-blur-[2px] bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        {/* Technical Grid Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }}
        />

        {/* Ambient Floating Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-accent"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                x: [null, Math.random() * 100 - 50],
                opacity: [null, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Center Content — single animation group instead of nested */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 pointer-events-none">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="text-center pointer-events-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ transform: "translateZ(40px)" }}
              className="mb-8 inline-flex items-center justify-center"
            >
              <img
                src={logo}
                alt="UrbanBuild Logo"
                className="h-32 w-32 object-contain invert mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] md:h-40 md:w-40"
              />
            </motion.div>

            {/* Title with staggered characters */}
            <motion.div
              style={{ transform: "translateZ(80px)" }}
              className="mb-1 text-center"
            >
              <h1 className="font-space text-4xl font-extrabold tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70 md:text-5xl lg:text-7xl" style={{ textShadow: "0 6px 40px rgba(0,0,0,0.5)" }}>
                {"URBANBUILD".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + index * 0.05,
                      type: "spring",
                      damping: 12,
                      stiffness: 100
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.sup
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-light text-white realative relative top-[-2px] -mt-2 -translate-x-[10%]"
                >
                  ™
                </motion.sup>
              </h1>
            </motion.div>

            {/* Rotating Words */}
            <div
              className="mb-8 flex h-16 items-center justify-center overflow-hidden md:h-20"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="relative px-10 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-lg shadow-black/20">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="block font-space text-2xl font-bold tracking-widest text-accent uppercase md:text-4xl"
                    style={{ textShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Decorative Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40 rounded-tl-sm" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40 rounded-br-sm" />
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              style={{ transform: "translateZ(40px)" }}
              className="mb-12 text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] lg:tracking-[0.3em] text-white/70 font-light uppercase px-6 w-full max-w-4xl mx-auto leading-relaxed whitespace-nowrap"
            >
              Engineering Progress With Precision
            </motion.p>

            {/* CTA — Premium Pill Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transform: "translateZ(80px)" }}
              transition={{ duration: 0.8, delay: 1.7, type: "spring", bounce: 0.4 }}
            >
              <Link
                to="/home"
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:border-white/50 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] focus:outline-none"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />
                <span className="relative z-10 font-bold">GO To Homepage</span>
                <div className="relative z-10 rounded-full bg-white/10 p-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/20">
                  <ArrowRight className="h-4 w-4 text-accent" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </section>
    </>
  );
};

export default Hero;