import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { User, Award, Building2, MapPin, Compass, Crown, Leaf, Briefcase, Scale, ArrowRight } from "lucide-react";

const teamMembers = [
    {
        name: "Maa Vidyawati",
        role: "Honorary Patron",
        description: "Guides team with cultural and moral values; fosters inclusivity and motivation within Urban Build.",
        icon: Crown,
        color: "from-amber-500 to-orange-600",
    },
    {
        name: "Er. P.C. Sharma",
        role: "Patron / Structural Consultant",
        description: "40+ years in civil engineering; ex-AIT Bangkok consultant; leads innovation in construction materials.",
        icon: Award,
        color: "from-blue-500 to-indigo-600",
    },
    {
        name: "Er. Gulshan Kumar",
        role: "Geotech Engineer / Retrofitting Expert",
        description: "35+ years in bridge design, instrumentation and PMC for nuclear, thermal and public infrastructure.",
        icon: Building2,
        color: "from-teal-500 to-cyan-600",
    },
    {
        name: "Er. Binod Kumar",
        role: "Transportation Engineering Expert",
        description: "Expert in rigid pavement, PQC, white topping, and instrumentation for airports and highways.",
        icon: MapPin,
        color: "from-green-500 to-emerald-600",
    },
    {
        name: "Dr. Partho Sen",
        role: "Senior Architect",
        description: "20+ years in luxury, healthcare & urban architecture; expert in design coordination and handover.",
        icon: Compass,
        color: "from-purple-500 to-violet-600",
    },
    {
        name: "Ritambhra Thakur",
        role: "Managing Director",
        description: "Leadership in roads, bridges, buildings; specialist in BOQ, DPR, sustainability and EPC alignment.",
        icon: User,
        color: "from-rose-500 to-pink-600",
    },
    {
        name: "Er. Ajay Kumar Singh",
        role: "Assistant Director Design and Planning",
        description: "Designs robust systems, plans layouts, coordinates architectural alignment and structural engineering.",
        icon: Compass,
        color: "from-emerald-400 to-green-600",
    },
    {
        name: "Er. Naveen Kumar",
        role: "Assistant Director Business Growth",
        description: "Drives business growth, manages client acquisition, oversees project feasibility and market expansion.",
        icon: Briefcase,
        color: "from-sky-500 to-blue-600",
    },
    {
        name: "Adv. Lakshay Kumar",
        role: "Assistant Director Tender & Legal",
        description: "Legal advisor, contract management, tendering coordination, and strategic legal compliance.",
        icon: Scale,
        color: "from-slate-500 to-gray-700",
    },
    {
        name: "Ms. Shivani Raj",
        role: "Manager (Admin)",
        description: "Oversees daily office administration, coordinate human resources, public relations and operational support.",
        icon: User,
        color: "from-indigo-400 to-purple-600",
    },
    {
        name: "Mr. Ashish Kumar",
        role: "Manager (Accounts)",
        description: "Directs financial accounts, budget planning, invoice audits, tax compliance, and commercial operations.",
        icon: Building2,
        color: "from-amber-400 to-orange-600",
    },
    {
        name: "Mr. Harsh Soni",
        role: "Manager (IT)",
        description: "Supervises corporate IT infrastructure, data security, design automation systems, and technical support.",
        icon: Award,
        color: "from-teal-400 to-emerald-600",
    },
    {
        name: "Mr. Akash",
        role: "Executive Assistant",
        description: "Supports executive office coordination, strategic calendar planning, communication flows and meeting management.",
        icon: Briefcase,
        color: "from-rose-400 to-red-600",
    },
    {
        name: "Er. Krishna Joshi",
        role: "Bridge Engineer",
        description: "Specialist in reinforced concrete bridge designs, substructure analysis, and structural drafting.",
        icon: Building2,
        color: "from-blue-500 to-indigo-600",
    },
    {
        name: "Er. Manish Tiwari",
        role: "Estimation & Costing",
        description: "Directs cost estimation, quantity surveying, project budgeting, and material procurement analysis.",
        icon: Scale,
        color: "from-teal-500 to-cyan-600",
    },
    {
        name: "Er. C. Chandrasekhar",
        role: "Highway Engineer",
        description: "Expert in geometric highway designs, horizontal & vertical alignment, and road safety infrastructure.",
        icon: MapPin,
        color: "from-green-500 to-emerald-600",
    },
    {
        name: "Ar. Manthan Singh",
        role: "Architect",
        description: "Integrates high-end spatial aesthetics, 3D elevation modeling, and sustainable architectural drafting.",
        icon: Compass,
        color: "from-purple-500 to-violet-600",
    },
    {
        name: "Er. Siddhant Raj",
        role: "Highway Engineer",
        description: "Specializes in pavement engineering, flexible crust designs, overlay survey assessment, and highway drainage.",
        icon: MapPin,
        color: "from-sky-500 to-blue-600",
    },
    {
        name: "Mr. Manish Singh Danu",
        role: "Area Coordinator",
        description: "Coordinates local on-site utility shifting, liaison services, stakeholder mapping, and project delivery.",
        icon: User,
        color: "from-slate-500 to-gray-700",
    },
    {
        name: "Mr. Niranjan Bhandari",
        role: "Surveyor",
        description: "Conducts high-precision topographic surveys, GPS coordinate mapping, and drone-based photogrammetry scans.",
        icon: Compass,
        color: "from-yellow-500 to-amber-600",
    },
    {
        name: "Mr. Ankit Mehra",
        role: "Surveyor",
        description: "Leads land reconnaissance, mapping leveling grids, alignment surveys, and geological data capture.",
        icon: Compass,
        color: "from-blue-400 to-indigo-600",
    },
];

const MemberCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    }

    function onMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    const Icon = member.icon;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.05 }
                }
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-full perspective-[1000px]"
        >
            <div className="relative h-full flex flex-col p-6 rounded-[24px] border border-border/50 bg-card shadow-lg hover:shadow-xl hover:shadow-accent/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-accent/30">

                {/* Header Area */}
                <div className="flex items-center gap-4 mb-4" style={{ transform: "translateZ(30px)" }}>
                    <div className={`p-3 md:p-4 rounded-[16px] bg-gradient-to-br ${member.color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-accent/20`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                            {member.name}
                        </h3>
                        <p className="text-[9px] md:text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-70">
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Sub-header Line */}
                <div className={`h-0.5 w-12 mb-4 bg-gradient-to-r ${member.color} rounded-full opacity-60`} style={{ transform: "translateZ(20px)" }} />

                {/* Description */}
                <p
                    style={{ transform: "translateZ(20px)" }}
                    className="text-muted-foreground text-xs md:text-sm leading-relaxed flex-grow font-light"
                >
                    {member.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[8px] md:text-[9px] font-bold tracking-widest text-muted-foreground uppercase">Expertise Verified</span>
                    </div>
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-accent/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Corner Decorative Icon Overlay */}
                <div className="absolute -bottom-6 -right-6 p-4 opacity-[0.02] dark:opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none text-foreground">
                    <Icon className="w-32 h-32 rotate-12" />
                </div>
            </div>
        </motion.div>
    );
};

const MarqueeRow = ({ items, direction = "left", speed = 40 }: { items: typeof teamMembers, direction?: "left" | "right", speed?: number }) => {
    // Dynamically guarantee at least 10 items in the marquee loop to avoid layout gaps on very wide viewports
    const repeatCount = Math.max(2, Math.ceil(10 / items.length));
    const marqueeItems = Array(repeatCount).fill(items).flat();

    return (
        <div className="relative w-full flex flex-col select-none overflow-hidden py-2 md:py-4 team-marquee-container">
            <div className="flex overflow-hidden">
                <div
                    className={`flex gap-6 md:gap-8 px-4 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"} hover:[animation-play-state:paused]`}
                    style={{ animationDuration: `${speed}s` }}
                >
                    {marqueeItems.map((member, idx) => (
                        <div key={`${member.name}-${idx}`} className="w-[280px] md:w-[355px] lg:w-[410px] h-[230px] md:h-[270px] shrink-0 whitespace-normal member-card-wrapper">
                            <MemberCard member={member} index={idx} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Team = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Split team into three specialized rows for the marquees
    const expertAdvisors = teamMembers.slice(0, 5);
    const managementTeam = teamMembers.slice(5, 13);
    const technical = teamMembers.slice(13);

    return (
        <section id="team" className="relative bg-background min-h-screen w-full flex flex-col justify-center overflow-y-auto border-t border-border pt-32 md:pt-36 pb-12">
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

                <motion.div
                    animate={{
                        x: [0, 80, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-20 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="w-full relative z-10 flex-1 flex flex-col justify-center max-h-full">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center mb-8 md:mb-12 px-4"
                >
                    <h2 className="font-space text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-3 max-w-4xl transition-all duration-300">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">Teams</span>
                    </h2>

                    <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed max-w-3xl hidden md:block">
                        Urbanbuild is powered by a multidisciplinary team of engineers, planners, consultants, and professionals<br />committed to delivering innovative, sustainable, and high-quality infrastructure solutions
                    </p>
                </motion.div>

                {/* Infinite Marquee Rows */}
                <div className="w-full flex flex-col gap-10 md:gap-14 mt-4 relative">
                    {/* Faded edges to blend marquee into background */}
                    <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                    {/* Category 1: Expert / Advisors */}
                    <div className="flex flex-col">
                        <div className="flex justify-center mb-5 md:mb-6">
                            <span className="text-[11px] md:text-[13px] font-black tracking-[0.3em] text-accent uppercase bg-accent/5 border border-accent/15 px-5 py-2 rounded-full inline-block shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                                Expert / Advisors
                            </span>
                        </div>
                        <MarqueeRow items={expertAdvisors} direction="left" speed={40} />
                    </div>

                    {/* Category 2: Management */}
                    <div className="flex flex-col">
                        <div className="flex justify-center mb-5 md:mb-6">
                            <span className="text-[11px] md:text-[13px] font-black tracking-[0.3em] text-accent uppercase bg-accent/5 border border-accent/15 px-5 py-2 rounded-full inline-block shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                                Management
                            </span>
                        </div>
                        <MarqueeRow items={managementTeam} direction="right" speed={45} />
                    </div>

                    {/* Category 3: Technical */}
                    <div className="flex flex-col">
                        <div className="flex justify-center mb-5 md:mb-6">
                            <span className="text-[11px] md:text-[13px] font-black tracking-[0.3em] text-accent uppercase bg-accent/5 border border-accent/15 px-5 py-2 rounded-full inline-block shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                                Technical
                            </span>
                        </div>
                        <MarqueeRow items={technical} direction="left" speed={40} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes team-marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes team-marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-left {
                    animation: team-marquee-left 45s linear infinite;
                    width: max-content;
                    display: flex;
                }
                .animate-marquee-right {
                    animation: team-marquee-right 45s linear infinite;
                    width: max-content;
                    display: flex;
                }
                .team-marquee-container:hover .member-card-wrapper {
                    opacity: 0.35;
                }
                .team-marquee-container .member-card-wrapper:hover {
                    opacity: 1 !important;
                }
                .member-card-wrapper {
                    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </section>
    );
};

export default Team;
