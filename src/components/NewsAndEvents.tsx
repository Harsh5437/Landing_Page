import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight, Newspaper, Bell, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const newsItems = [
    {
        id: 1,
        title: "UrbanBuild™ Growth Conclave 1.0, held at Hotel Ramada, Dehradun",
        category: "Event",
        date: "May 2026",
    },
    {
        id: 2,
        title: "UrbanBuild™ Growth Conclave 1.0, highlighting Strategic Resilience",
        category: "Event",
        date: "May 2026",
    },
    {
        id: 3,
        title: "Er. G.K. Sahu, Principal Scientist at CRRI, Visited URBANBUILD™ Office",
        category: "Visit",
        date: "April 2026",
    },
];

const NewsAndEvents = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Multiply associate elements to guarantee infinite loop height
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
                    animation: marquee-vertical 18s linear infinite;
                }
            `}</style>

            {/* Background elements matched with other sections */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L0 0 0 60' fill='none' stroke='currentColor' stroke-width='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                />

                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-steel/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <motion.div
                        variants={{
                            hidden: { scale: 0 },
                            visible: { scale: 1 }
                        }}
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15"
                    >
                        <Newspaper className="h-6 w-6 text-accent" />
                    </motion.div>

                    <span 
                        className="text-accent text-3xl lg:text-4xl mb-1 block"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        Updates Feed
                    </span>

                    <h2 className="font-space text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase">
                        News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-light">Recent Events</span>
                    </h2>

                    <div className="mt-4 mb-4 h-1 w-20 bg-accent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                </motion.div>

                {/* Big Ticker Terminal Display Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full max-w-4xl mx-auto rounded-[32px] border border-border/50 bg-card/45 backdrop-blur-xl p-5 md:p-7 shadow-2xl overflow-hidden"
                >
                    {/* Blinking Live indicator */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-5">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                            </span>
                            <span className="text-[10px] font-black tracking-[0.25em] text-accent uppercase">REAL-TIME BROADCAST FEED</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-muted-foreground text-[9px] font-bold tracking-widest uppercase">
                            <Clock className="w-3.5 h-3.5 text-accent/60 animate-spin" style={{ animationDuration: "12s" }} /> UTC +5:30
                        </div>
                    </div>

                    {/* Scroll Container */}
                    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-background/35 p-1">
                        {/* Top & Bottom elegant visual dark fades */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-card/40 via-card/10 to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/40 via-card/10 to-transparent z-10 pointer-events-none" />

                        {/* The scrolling track */}
                        <div className="flex flex-col gap-4 animate-marquee-vertical hover:[animation-play-state:paused]">
                            {scrollingItems.map((item, index) => (
                                <div 
                                    key={`${item.id}-${index}`}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 shadow-sm cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 rounded-lg bg-accent/15 text-accent shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                                            <Newspaper className="w-4 h-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-full bg-accent/15 text-[8px] font-black tracking-widest text-accent uppercase">
                                                    {item.category}
                                                </span>
                                                <span className="text-[9px] text-muted-foreground flex items-center gap-1 font-medium">
                                                    <Calendar className="w-3 h-3 text-muted-foreground/60" /> {item.date}
                                                </span>
                                            </div>
                                            <h4 className="text-xs md:text-sm font-semibold text-foreground/90 leading-relaxed max-w-2xl group-hover:text-accent transition-colors duration-300">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex shrink-0 pr-2">
                                        <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-300" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* View More Blogs Button */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-end max-w-4xl mx-auto mt-6 w-full px-2"
                >
                    <Link
                        to="/news"
                        className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-accent/40 bg-card hover:bg-accent text-foreground hover:text-background font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-accent/20 cursor-pointer overflow-hidden"
                    >
                        <span>View More Blogs</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Newsletter Signup Mini Component */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="mt-20 p-8 md:p-12 rounded-[40px] border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-lg flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative group shadow-lg"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Bell size={120} className="text-accent" />
                    </div>

                    <div className="relative z-10 flex flex-col gap-2">
                        <h4 className="text-xl md:text-2xl font-bold">Stay connected with our progress</h4>
                        <p className="text-muted-foreground text-sm">Join our newsletter to receive the latest structural insights and site updates.</p>
                    </div>

                    <div className="relative z-10 flex w-full md:w-auto gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-background/50 border border-accent/20 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/40 min-w-0 md:min-w-[300px]"
                        />
                        <button className="bg-accent text-background px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                            JOIN
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsAndEvents;
