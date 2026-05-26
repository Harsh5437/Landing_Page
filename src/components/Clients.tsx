import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, ShieldCheck, Award } from "lucide-react";

const clients = [
    {
        name: "PWD Uttarakhand",
        logo: "/images/clients/pwd_logo.png",
        color: "#1e40af",
    },
    {
        name: "Uttar Pradesh PWD",
        logo: "/images/clients/up_lok_nirman_logo.png",
        color: "#7c3aed",
    },
    {
        name: "Uttarakhand Government",
        logo: "/images/clients/Uttrakhand_sarkar.svg",
        color: "#059669",
    },
    {
        name: "UPCL",
        logo: "/images/clients/UPCL_logo.png",
        color: "#d97706",
    },
    {
        name: "Nagar Nigam",
        logo: "/images/clients/nagar_nigam_logo.png",
        color: "#dc2626",
    },
    {
        name: "NHAI (Ganesh Builders)",
        logo: "/images/clients/GaneshBuilder.jpg",
        color: "#0891b2",
    },
    {
        name: "GMVN",
        logo: "/images/clients/gmvn_logo.png",
        color: "#dc2626",
    },
];

const ClientLogo = ({ client }: { client: typeof clients[0] }) => {
    return (
        <div className="flex-shrink-0 px-4 md:px-6 group">
            <div className="relative flex flex-col items-center justify-center p-6 rounded-[24px] border border-border/50 bg-card backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 w-[200px] md:w-[260px] h-[140px] md:h-[180px] cursor-pointer overflow-hidden">
                {/* Background Accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4 md:gap-6">
                    {/* Logos - Full Color */}
                    <div className="h-12 md:h-16 w-auto flex items-center justify-center">
                        <img
                            src={client.logo}
                            alt={client.name}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain transition-transform duration-500 transform group-hover:scale-110 drop-shadow-sm"
                        />
                    </div>

                    <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground/50 group-hover:text-accent transition-colors duration-500 text-center uppercase">
                        {client.name}
                    </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
            </div>
        </div>
    );
};

const Clients = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="partners" className="relative bg-background min-h-screen lg:h-screen w-full flex flex-col justify-center overflow-hidden border-t border-border pt-16 md:pt-20 pb-4 lg:py-0 py-12">
            {/* Unified Mesh Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Technical Graph Lines - Primary Structural Background */}
                <motion.div
                    animate={{
                        backgroundPosition: ["0px 0px", "60px 60px"],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `
                          linear-gradient(var(--accent) 1px, transparent 1px),
                          linear-gradient(90deg, var(--accent) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Ambient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center max-h-full">
                <div className="container mx-auto px-4 md:px-8 mb-8 md:mb-16">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            className="mb-3 flex h-10 w-10 items-center justify-center rounded-[14px] bg-accent/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            <ShieldCheck className="h-5 w-5 text-accent" />
                        </motion.div>

                        <h2 className="font-space text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-3 max-w-4xl transition-all duration-300">
                            Collaborating with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">Industry Leaders</span>
                        </h2>

                        <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed max-w-xl hidden md:block">
                            Trusted by leading government departments and private infrastructure
                            pioneers to deliver resilient civil engineering solutions across India.
                        </p>
                    </motion.div>
                </div>

                {/* High-Impact Single Row Marquee System */}
                <div className="relative flex flex-col select-none py-2 md:py-4">
                    {/* Prestigious Gradient Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Infinite Technical Scroll */}
                    <div className="flex overflow-hidden clients-marquee-container">
                        <div className="flex clients-marquee-track animate-infinite-scroll hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                            {[...clients, ...clients].map((client, index) => (
                                <ClientLogo key={`r1-${client.name}-${index}`} client={client} />
                            ))}
                        </div>
                    </div>

                    <style>{`
                        @keyframes infinite-scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-infinite-scroll {
                            animation: infinite-scroll 120s linear infinite;
                            width: max-content;
                            display: flex;
                        }
                    `}</style>
                </div>

                {/* Footer Metrics */}
                <div className="container mx-auto px-4 mt-8 md:mt-16 flex flex-wrap justify-center gap-12 md:gap-24">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">50+</span>
                        <span className="text-[8px] md:text-[10px] font-black tracking-widest text-accent uppercase py-2">Clients Served</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
