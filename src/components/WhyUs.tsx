import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Cpu, MessageSquare, Target, ArrowRight, Layers, Layout, Share2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Premium Mesh Gradient Background
const MeshBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animated Mesh Orbs */}
    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full"
      style={{
        background: "radial-gradient(circle, hsla(210, 45%, 45%, 0.3) 0%, transparent 70%)",
        top: "-20%",
        right: "-10%",
        filter: "blur(60px)",
      }}
      animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{
        background: "radial-gradient(circle, hsla(160, 45%, 45%, 0.2) 0%, transparent 70%)",
        bottom: "-10%",
        left: "-10%",
        filter: "blur(50px)",
      }}
      animate={{
        x: [0, -40, 0],
        y: [0, -50, 0],
        scale: [1.2, 1, 1.2],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Floating Technical Symbols */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-steel/20 dark:text-steel/10"
        style={{
          left: `${10 + i * 15}%`,
          top: `${20 + (i % 3) * 30}%`,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5 + i,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
      >
        {i % 3 === 0 ? <Layers size={40} /> : i % 3 === 1 ? <Layout size={40} /> : <Share2 size={40} />}
      </motion.div>
    ))}
  </div>
);

interface FeatureCardProps {
  reason: {
    title: string;
    description: string;
    image: string;
    icon: any;
    index: number;
    isInView: boolean;
  };
}

const FeatureCard = ({ reason }: FeatureCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col h-full perspective-[1000px]"
    >
      {/* Decorative Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 rounded-[32px]"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(71,124,175,0.15), transparent 40%)`
          ),
        }}
      />

      {/* Main Card */}
      <div className="relative flex flex-col h-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:shadow-2xl">
        
        {/* Card Image Area */}
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="relative h-48 overflow-hidden w-full"
        >
          <img
            src={reason.image}
            alt={reason.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Floating Icon Over Image */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel/20 backdrop-blur-xl border border-white/20 shadow-lg">
              <reason.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
              Phase 0{reason.index + 1}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ transform: "translateZ(40px)" }} className="p-8 flex flex-col h-full">
          <h3 className="mb-4 text-2xl font-bold text-foreground group-hover:text-steel transition-colors duration-300">
            {reason.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm mb-8 flex-grow">
            {reason.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-xs font-black text-steel tracking-[0.2em] group/btn cursor-pointer py-2 px-4 rounded-full border border-steel/20 hover:bg-steel hover:text-white transition-all duration-300">
              READ CASE STUDY
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </div>
            
            {/* Minimal indicator */}
            <div className="h-2 w-2 rounded-full bg-steel shadow-[0_0_10px_rgba(71,124,175,0.5)]" />
          </div>
        </div>

        {/* Interactive Bottom Accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-steel/60 to-steel"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "left", width: "100%" }}
        />
      </div>
    </motion.div>
  );
};

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      title: "Modern Management",
      description: "Structured processes and data-driven decision-making ensure transparency, accountability, and project excellence through every stage of development.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      icon: Layout
    },
    {
      title: "Digital Monitoring",
      description: "Leveraging advanced real-time tracking and technical dashboards to optimize resources and maintain the highest precision and quality standards.",
      image: "https://images.unsplash.com/photo-1581094794329-cd1096d7a43f?q=80&w=2070&auto=format&fit=crop",
      icon: Cpu
    },
    {
      title: "Coordination Expert",
      description: "Seamless collaboration across multi-disciplinary teams and stakeholders, ensuring projects stay aligned, efficient, and perfectly on schedule.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
      icon: ShieldCheck
    },
    {
      title: "Client-Centric Results",
      description: "Proactive engagement and adaptive problem-solving tailored to client expectations, delivering solutions that create long-term structural value.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
      icon: Target
    }
  ];

  return (
    <section id="why-us" className="relative bg-muted/30 py-24 md:py-40 overflow-hidden border-t border-border/50">
      {/* Premium Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary dark:bg-charcoal transition-colors duration-700" />
        <MeshBackground />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24 flex flex-col items-center text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-steel/10 p-3"
          >
            <ShieldCheck className="h-8 w-8 text-steel" />
          </motion.div>
          
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-section mb-6 max-w-3xl text-balance"
          >
            Why Choose <span className="gradient-text">URBANBUILD™</span>
          </motion.h2>

          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 h-1.5 w-32 rounded-full bg-steel"
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-large mx-auto max-w-2xl text-muted-foreground/80"
          >
            We combine decades of engineering heritage with modern digital innovation 
            to redefine infrastructure quality and sustainability.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              }
            }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative px-4"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-10">
              {reasons.map((reason, index) => (
                <CarouselItem key={reason.title} className="pl-6 basis-full md:basis-1/2">
                  <div className="h-[400px] w-full">
                    <FeatureCard 
                      reason={{ ...reason, index, isInView }} 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center gap-6 mt-12">
              <CarouselPrevious className="static translate-y-0 h-14 w-14 border-steel/60 bg-white dark:bg-black/40 text-steel shadow-lg hover:bg-steel hover:text-white transition-all duration-300 ring-1 ring-steel/10" />
              <CarouselNext className="static translate-y-0 h-14 w-14 border-steel/60 bg-white dark:bg-black/40 text-steel shadow-lg hover:bg-steel hover:text-white transition-all duration-300 ring-1 ring-steel/10" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
