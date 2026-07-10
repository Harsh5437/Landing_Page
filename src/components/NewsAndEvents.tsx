import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight, Bell, Clock, Megaphone, MapPin, Lightbulb, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const newsItems = [
    {
        id: 4,
        title: "UrbanBuild Signs MoU with Graphic Era Hill University",
        category: "Announcement",
        date: "July 2026",
    },
    {
        id: 2,
        title: "URRDA Empanelment",
        category: "Announcement",
        date: "May 2026",
    },
    {
        id: 1,
        title: "November in Review",
        category: "Event",
        date: "Nov 2025",
    },
    {
        id: 3,
        title: "Er. G.K. Sahu Sir, Chief Project Coordinator (Bridges), Visited URBANBUILD™ Office",
        category: "Visit",
        date: "April 2026",
    },
];

const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
        case "announcement":
            return <Megaphone className="w-4 h-4 md:w-4.5 md:h-4.5" />;
        case "visit":
            return <MapPin className="w-4 h-4 md:w-4.5 md:h-4.5" />;
        case "insights":
            return <Lightbulb className="w-4 h-4 md:w-4.5 md:h-4.5" />;
        case "event":
        default:
            return <Calendar className="w-4 h-4 md:w-4.5 md:h-4.5" />;
    }
};

const NewsAndEvents = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Multiply elements to guarantee infinite loop height
    const scrollingItems = [...newsItems, ...newsItems, ...newsItems, ...newsItems];

    return (
        <section id="news" className="relative bg-secondary dark:bg-charcoal py-20 md:py-28 overflow-hidden border-t border-border/50">
            {/* Inline stylesheet for modular self-contained keyframe animations */}
            <style>{`
                @keyframes marquee-vertical {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-50%);
                    }
                }
                .animate-marquee-vertical {
                    animation: marquee-vertical 20s linear infinite;
                }
            `}</style>

            {/* Background elements matched with other sections */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L0 0 0 60' fill='none' stroke='currentColor' stroke-width='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                />

                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-steel/5 dark:bg-steel/10 rounded-full blur-[130px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <motion.div
                        variants={{
                            hidden: { scale: 0, rotate: -10 },
                            visible: { scale: 1, rotate: 0 }
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/25 shadow-lg shadow-accent/5"
                    >
                        <Newspaper className="h-6 w-6 text-accent" />
                    </motion.div>

                    <span 
                        className="text-accent text-3xl lg:text-4xl mb-2 block"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        Updates Feed
                    </span>

                    <h2 className="font-space text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase">
                        News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">Recent Events</span>
                    </h2>

                    <div className="mt-5 mb-4 h-1.5 w-24 bg-gradient-to-r from-accent/40 via-accent to-accent/40 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                </motion.div>

                {/* Big Ticker Terminal Display Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full max-w-4xl mx-auto rounded-[32px] border border-border/60 bg-card/45 dark:bg-charcoal-light/30 backdrop-blur-xl p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-white/10 dark:border-t-white/5 overflow-hidden"
                >
                    {/* Blinking Live indicator */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
                        <div className="flex items-center gap-3">
                            {/* macOS style buttons */}
                            <div className="flex gap-1.5 mr-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                            </div>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="text-[10px] font-black tracking-[0.25em] text-accent uppercase font-mono">REAL-TIME BROADCAST FEED</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-muted-foreground text-[9px] font-bold tracking-widest uppercase font-mono">
                            <Clock className="w-3.5 h-3.5 text-accent/60 animate-spin" style={{ animationDuration: "12s" }} /> UTC +5:30
                        </div>
                    </div>

                    {/* Scroll Container */}
                    <div className="relative h-[380px] w-full overflow-hidden rounded-2xl bg-zinc-950/20 dark:bg-black/35 border border-border/30 p-2">
                        {/* Soft Scanlines pattern overlay for structural sci-fi visual */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-20" />
                        
                        {/* Top & Bottom elegant visual dark fades */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-card/60 via-card/10 to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/60 via-card/10 to-transparent z-10 pointer-events-none" />

                        {/* The scrolling track */}
                        <div className="flex flex-col gap-4 animate-marquee-vertical hover:[animation-play-state:paused] px-1 py-4">
                            {scrollingItems.map((item, index) => {
                                const isLatest = index % newsItems.length === 0;
                                return (
                                    <div 
                                        key={`${item.id}-${index}`}
                                        className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-2xl border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                                            isLatest 
                                            ? "border-accent/40 bg-gradient-to-r from-accent/[0.08] via-accent/[0.01] to-transparent shadow-[0_4px_20px_rgba(212,175,55,0.1)] hover:border-accent hover:shadow-[0_4px_25px_rgba(212,175,55,0.2)]" 
                                            : "border-border/40 bg-card/65 backdrop-blur-sm hover:bg-accent/[0.02] hover:border-accent/30 hover:shadow-md"
                                        }`}
                                    >
                                        {/* Hover Side Accent Bar */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-transform duration-300 ${
                                            isLatest ? "bg-accent scale-y-100" : "bg-accent/40 scale-y-0 group-hover:scale-y-100"
                                        }`} />

                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 ${
                                                isLatest 
                                                ? "bg-accent text-background shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                                                : "bg-accent/10 text-accent group-hover:bg-accent/20"
                                            }`}>
                                                {getCategoryIcon(item.category)}
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    <span className={`px-2.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase transition-all duration-300 ${
                                                        isLatest 
                                                        ? "bg-accent text-background animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.3)]" 
                                                        : "bg-accent/10 text-accent group-hover:bg-accent/20"
                                                    }`}>
                                                        {isLatest ? "HIGHLIGHTED MILESTONE" : item.category}
                                                    </span>
                                                    <span className={`text-[9.5px] flex items-center gap-1 font-mono tracking-wider ${isLatest ? "text-accent/90" : "text-muted-foreground"}`}>
                                                        <Calendar className={`w-3.5 h-3.5 ${isLatest ? "text-accent" : "text-accent/60"}`} /> {item.date}
                                                    </span>
                                                </div>
                                                <h4 className={`text-xs md:text-sm lg:text-base font-space font-bold leading-snug max-w-2xl transition-colors duration-300 ${
                                                    isLatest ? "text-accent font-black" : "text-foreground/90 group-hover:text-accent"
                                                }`}>
                                                    {item.title}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex shrink-0 pr-2">
                                            <ArrowRight className={`w-5 h-5 transition-all duration-300 group-hover:translate-x-2 ${
                                                isLatest ? "text-accent" : "text-muted-foreground/30 group-hover:text-accent"
                                            }`} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* View More Blogs Button */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-end max-w-4xl mx-auto mt-8 w-full px-2"
                >
                    <Link
                        to="/news"
                        className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-accent/40 bg-card hover:bg-accent text-foreground hover:text-background font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-accent/20 cursor-pointer overflow-hidden"
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        <span className="relative z-10">View All Updates</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10" />
                    </Link>
                </motion.div>

                {/* Newsletter Signup Component */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-20 p-8 md:p-14 rounded-[40px] border border-accent/20 bg-gradient-to-br from-accent/5 via-transparent to-transparent backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative group shadow-lg hover:shadow-accent/[0.02] transition-all duration-500"
                >
                    {/* Glowing back decoration */}
                    <div className="absolute -top-12 -right-12 p-4 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                        <Bell size={180} className="text-accent" />
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 max-w-xl">
                        <h4 className="text-xl md:text-3xl font-space font-black tracking-tight text-foreground uppercase">Stay connected with our progress</h4>
                        <p className="text-muted-foreground text-xs md:text-sm font-light leading-relaxed">Join our newsletter to receive the latest structural insights, project case studies, and engineering updates directly to your inbox.</p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="bg-background/40 border border-border focus:border-accent focus:ring-1 focus:ring-accent/20 px-6 py-3.5 rounded-full text-xs font-mono focus:outline-none min-w-0 md:min-w-[280px] placeholder:text-muted-foreground/50 transition-all"
                        />
                        <button className="bg-accent text-background px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all shrink-0">
                            SUBSCRIBE
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsAndEvents;
