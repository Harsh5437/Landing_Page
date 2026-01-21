import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { useState, useRef } from "react";
import logo from "@/assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", label: "ABOUT" },
  { href: "#services", label: "SERVICES" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

const Hero = () => {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.2]);

  return <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Video Background with Parallax */}
      <motion.video 
        autoPlay 
        muted 
        loop 
        playsInline 
        style={{ y, opacity }}
        className="absolute inset-0 h-[120%] w-full object-cover blur-[2px]"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </motion.video>


      {/* Minimal Header */}
      <motion.nav initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 0.5
    }} className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-16 md:py-8">
        <div />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm tracking-widest text-white/50 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-charcoal/95 backdrop-blur-md border-white/10">
            <nav className="flex flex-col gap-6 mt-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg tracking-widest text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </motion.nav>

      {/* Centered Logo & Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1.2,
        delay: 0.2
      }} className="text-center">
          {/* Logo */}
          <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 0.4
        }} className="mb-8 inline-flex items-center justify-center">
            <img alt="Urban Build Logo" className="h-32 w-32 object-contain invert mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] md:h-40 md:w-40" src="/lovable-uploads/03c3abb7-8884-42cd-90d9-4ab589e8c893.png" />
          </motion.div>

          {/* Brand Name */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          delay: 0.6
        }} className="mb-4 text-4xl font-extralight tracking-[0.3em] text-white md:text-5xl lg:text-6xl">
            URBANBUILD
          </motion.h1>

          {/* Tagline */}
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 0.9
        }} className="mb-12 text-sm tracking-[0.2em] text-white/40 md:text-base">
            ENGINEERING PROGRESS WITH PRECISION
          </motion.p>

          {/* Single CTA */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1.2
        }}>
            <a href="#projects" className="group inline-flex items-center gap-3 border-b border-white/30 pb-2 text-sm tracking-widest text-white transition-all hover:border-white hover:gap-4">
              VIEW PROJECTS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Line */}
      <motion.div initial={{
      scaleY: 0
    }} animate={{
      scaleY: 1
    }} transition={{
      duration: 1,
      delay: 1.5
    }} className="absolute bottom-0 left-1/2 z-20 h-20 w-[1px] origin-top bg-gradient-to-b from-white/30 to-transparent" />
    </section>;
};
export default Hero;