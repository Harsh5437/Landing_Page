import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const associates = [
    {
        name: "EXPERT AE SOLUTIONS",
        tagline: "STRATEGIC DESIGN PARTNER",
        description: "Structural analysis and advanced optimization for complex urban infrastructures.",
        id: "expert-ae"
    },
    {
        name: "Hindustan Consulting Associates(HCA)",
        tagline: "CONSULTING ASSOCIATE",
        description: "AN ENGINEERING CONSULTANCY ORGANIZATION, FOCUSED IN HYDROPOWER/WATER ENGINEERING, UNDERGROUND CAVITIES, TRANSPORTATION ENGINEERING AND SLOPE PROTECTION WORKS.",
        id: "hca"
    },
    {
        name: "CIVIL TECH LABORATORY",
        tagline: "NABL ACCREDITED TESTING",
        description: "State-of-the-art material validation and environmental compliance certification.",
        id: "civil-tech"
    }
];

const Partners = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Repeat associates array multiple times to guarantee a seamless, infinite loop marquee
    const marqueeItems = [...associates, ...associates, ...associates, ...associates, ...associates, ...associates];

    return (
        <section id="partners" className="relative bg-background py-16 md:py-24 overflow-hidden border-t border-border/50">
            {/* Technical Structural Background Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        backgroundPosition: ["0px 0px", "60px 60px"],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02]"
                    style={{
                        backgroundImage: `
                          linear-gradient(var(--accent) 1px, transparent 1px),
                          linear-gradient(90deg, var(--accent) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
            </div>

            <div className="w-full relative z-10">
                {/* Header shifted towards left side with luxury Outfit font */}
                <div className="w-full pl-6 md:pl-10 lg:pl-16 mb-12">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            <span className="text-black dark:text-white mr-3 md:mr-4">OUR</span>
                            <span className="text-accent italic font-light">ASSOCIATES</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Technical Infinite Marquee Area - framed by top/bottom lines and using a single vertical separating line */}
                <div className="relative w-full flex flex-col select-none overflow-hidden border-y border-accent/30 dark:border-accent/20 py-8 bg-card/5">
                    {/* Prestigious Dark Gradient Fades on edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Infinite Marquee Track scrolling at standard cinematic velocity */}
                    <div className="flex overflow-hidden marquee-container">
                        <div className="flex marquee-track animate-infinite-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                            {marqueeItems.map((item, index) => (
                                <div 
                                    key={`${item.id}-${index}`}
                                    className="flex-shrink-0 w-[300px] md:w-[380px] lg:w-[420px] px-8 md:px-10 lg:px-12 border-r border-accent/30 dark:border-accent/20 flex flex-col justify-between group"
                                >
                                    {/* Title Header */}
                                    <div>
                                        <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] text-accent uppercase block mb-2">
                                            {item.tagline}
                                        </span>
                                        <h3 className="text-lg md:text-xl font-space font-black text-foreground tracking-tight mb-2.5 group-hover:text-accent transition-colors duration-300 uppercase">
                                            {item.name}
                                        </h3>
                                    </div>
                                    {/* Description */}
                                    <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes infinite-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-infinite-marquee {
                    animation: infinite-marquee 90s linear infinite;
                    width: max-content;
                    display: flex;
                }
            `}</style>
        </section>
    );
};

export default Partners;
