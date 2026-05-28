import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Calendar, ChevronRight, ChevronLeft, ZoomIn, X } from "lucide-react";
import { Link } from "react-router-dom";
import sectorsData from "../data/sectors.json";
import newsFeedData from "../data/newsFeed.json";

const carouselImages = [
    {
        src: "/images/HomeMainCrousel/P1.JPG",
        title: "Team URBANBUILD™"
    },
    {
        src: "/images/HomeMainCrousel/P2.jpeg",
        title: "Dignitary Presence",
        desc: "Chief Guest, Ayaz Ahmed, along with AD Naveen Kumar from URBANBUILD™"
    },
    {
        src: "/images/HomeMainCrousel/P3.jpeg",
        title: "Er. G.K. Sahu Visit",
        desc: "Retired Chief Scientist at CRRI (Central Road Research Institute) at our office."
    },
    {
        src: "/images/HomeMainCrousel/P4.png",
        title: "Dignitary Visit",
        desc: "Honored to host Shri Kundan Singh (IES, Retd.), Advisor – Engineering (Uttarakhand), Former Jt. Director General, Ex-MD BRIDCUL"
    },
    {
        src: "/images/HomeMainCrousel/P5.JPG",
        title: "Growth Conclave 1.0",
        desc: " Mr. Ayaz Ahmed,Retired Engineer-in-Chief (EnC), PWD Uttarakhand"
    }
];
const getPortfolioGalleryImages = () => {
    const images: any[] = [];
    sectorsData.forEach((sector) => {
        if (sector.projects && Array.isArray(sector.projects)) {
            sector.projects.forEach((proj) => {
                images.push({
                    src: proj.image || "/images/projects/highway-render.jpg",
                    title: proj.title,
                    desc: proj.category || proj.location || "Featured Portfolio Project"
                });
            });
        }
    });
    return images.length > 0 ? images : [
        { src: "/images/projects/highway-render.jpg", title: "National Highway Expansion", desc: "Premium highway engineering and corridor design." }
    ];
};

const clients = [
    {
        name: "PWD Uttarakhand",
        logo: "/images/clients/pwd_logo.png",
        tagline: "GOVERNMENT DEPT",
        description: "Public Works Department of Uttarakhand, focusing on major road & infrastructure development."
    },
    {
        name: "PWD Uttar Pradesh",
        logo: "/images/clients/up_lok_nirman_logo.png",
        tagline: "GOVERNMENT DEPT",
        description: "Lok Nirman Vibhag UP, developing resilient interstate highway connections."
    },
    {
        name: "Government Of Uttarakhand",
        logo: "/images/clients/Uttrakhand_sarkar.svg",
        tagline: "STATE AUTHORITY",
        description: "Urban planning authorities and civic infrastructural developments."
    },
    {
        name: "UPCL",
        logo: "/images/clients/UPCL_logo.png",
        tagline: "POWER SECTOR",
        description: "Uttarakhand Power Corporation Limited, managing grid structure foundations."
    },
    {
        name: "Nagar Nigam",
        logo: "/images/clients/nagar_nigam_logo.png",
        tagline: "MUNICIPAL BOARD",
        description: "Civic amenities, local roads, and town municipal development works."
    },
    {
        name: "NHAI (Ganesh Builders)",
        logo: "/images/clients/GaneshBuilder.jpg",
        tagline: "INFRASTRUCTURE CO",
        description: "National Highway authority collaborative contracts and bridge projects."
    },
    {
        name: "GMVN",
        logo: "/images/clients/gmvn_logo.png",
        tagline: "TOURISM BOARD",
        description: "Garhwal Mandal Vikas Nigam, building scenic transport facilities."
    },
    {
        name: "URRDA",
        logo: "/images/clients/URRDA_Logo.jpeg",
        tagline: "RURAL ROADS",
        description: "Uttarakhand Rural Road Development Agency, executing major connectivity networks."
    }
];

const ProjectCounter = () => {
    return (
        <div className="perspective-[1000px] inline-block">
            <motion.div
                animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.03, 1],
                    boxShadow: [
                        "0 0 8px rgba(212,175,55,0.15), inset 0 0 8px rgba(212,175,55,0.05)",
                        "0 0 20px rgba(212,175,55,0.4), inset 0 0 12px rgba(212,175,55,0.15)",
                        "0 0 8px rgba(212,175,55,0.15), inset 0 0 8px rgba(212,175,55,0.05)"
                    ]
                }}
                transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 4.5
                }}
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                className="relative bg-[#081020]/95 border-2 border-accent rounded-xl px-4 py-1.5 flex flex-col items-center justify-center gap-0.5 shadow-[inset_0_0_10px_rgba(212,175,55,0.1)]"
            >
                {/* Tech corners decoration */}
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-accent/75" />
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-accent/75" />
                <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-accent/75" />
                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-accent/75" />

                <span className="text-[20px] md:text-[23px] lg:text-[25px] font-space font-black text-accent tracking-tighter leading-none drop-shadow-[0_0_5px_rgba(212,175,55,0.4)]">
                    336+
                </span>
                <span className="text-[7.5px] md:text-[8.5px] lg:text-[9.5px] font-mono font-black text-white/90 tracking-[0.18em] leading-none uppercase">
                    Projects Handled
                </span>
            </motion.div>
        </div>
    );
};

const Home = () => {
    // Dynamic database-free states for News and Gallery
    const [newsFeed, setNewsFeed] = useState<any[]>(() => {
        const saved = localStorage.getItem("urbanbuild_news_feed");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const hasOldData = parsed.some(art => art && art.date && art.date.includes("2024"));
                    const hasDifferentCount = parsed.length <= 5;
                    const hasUrrda = parsed.some(art => art && art.title === "URRDA Empanelment");
                    if (!hasOldData && !hasDifferentCount && hasUrrda) {
                        return parsed;
                    }
                }
            } catch (e) {
                console.error("Failed to parse saved news feed", e);
            }
        }
        const initialNews = newsFeedData;
        localStorage.setItem("urbanbuild_news_feed", JSON.stringify(initialNews));
        return initialNews;
    });

    const [galleryImages, setGalleryImages] = useState<any[]>(() => {
        const saved = localStorage.getItem("urbanbuild_gallery_images");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved gallery images", e);
            }
        }
        return getPortfolioGalleryImages();
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [miniIndex, setMiniIndex] = useState(0);

    // Dynamic hot-reload event listener from admin panel
    useEffect(() => {
        const loadNews = () => {
            const saved = localStorage.getItem("urbanbuild_news_feed");
            if (saved) {
                try {
                    setNewsFeed(JSON.parse(saved));
                } catch (e) {
                    console.error(e);
                }
            } else {
                setNewsFeed([
                    { title: "November in Review", category: "Event", date: "Nov 12, 2025", img: "/images/HomeMainCrousel/P5.JPG" },
                    { title: "Er. G.K. Sahu Sir, Chief Project Coordinator (Bridges), Visited URBANBUILD™ Office", category: "Visit", date: "Aug 15, 2025", img: "/images/HomeMainCrousel/P3.jpeg" },
                    { title: "Civil Structural Survey Completed for Bageshwar Circuit House", category: "Announcement", date: "Nov 20, 2025", img: "/images/projects/govt-building.jpg" },
                ]);
            }
        };

        const loadGallery = () => {
            const saved = localStorage.getItem("urbanbuild_gallery_images");
            if (saved) {
                try {
                    setGalleryImages(JSON.parse(saved));
                } catch (e) {
                    console.error(e);
                }
            } else {
                setGalleryImages(getPortfolioGalleryImages());
            }
        };

        window.addEventListener("urbanbuild-news-updated", loadNews);
        window.addEventListener("urbanbuild-gallery-updated", loadGallery);
        return () => {
            window.removeEventListener("urbanbuild-news-updated", loadNews);
            window.removeEventListener("urbanbuild-gallery-updated", loadGallery);
        };
    }, []);
    const [isHovered, setIsHovered] = useState(false);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    // Escape listener for premium lightbox closes
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setEnlargedImage(null);
            }
        };
        if (enlargedImage) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [enlargedImage]);
    const clientsRef = useRef(null);
    const isClientsInView = useInView(clientsRef, { once: true, margin: "-100px" });

    // Auto-play main featured carousel
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    // Auto-play mini gallery carousel
    useEffect(() => {
        if (galleryImages.length === 0) return;
        const timer = setInterval(() => {
            setMiniIndex((prev) => (prev + 1) % galleryImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [galleryImages.length]);

    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        if (swipe < -10000) setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
        else if (swipe > 10000) setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-background pb-10 pt-24">

            {/* Split Hero Section: 70% Image Carousel & 30% Split News & Gallery */}
            <div className="relative grid grid-cols-1 lg:grid-cols-10 w-full border-b border-border/50 overflow-hidden">

                {/* Left Side: 70% Main Featured Image Carousel */}
                <div className="col-span-1 lg:col-span-7 h-[40vh] md:h-[52vh] lg:h-[80vh] p-3 flex flex-col">
                    <div
                        className="flex-1 w-full relative group bg-background dark:bg-black overflow-hidden border-2 border-[#1A7EFF]/50 rounded-2xl flex flex-col shadow-[0_0_20px_rgba(26,126,255,0.1)]"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >


                        {/* Carousel Content Area */}
                        <div className="relative flex-1 w-full overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={handleDragEnd}
                                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                                >
                                    <img
                                        src={carouselImages[currentIndex].src}
                                        alt={carouselImages[currentIndex].title}
                                        className="w-full h-full object-cover opacity-100"
                                    />

                                    {/* Overlay Content with localized protection gradient constrained to bottom 20% */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[20%] p-4 md:p-6 bg-gradient-to-t from-[#040814]/95 via-[#040814]/80 to-transparent flex items-center select-none">
                                        <div className="w-full">
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4, duration: 1 }}
                                                className="max-w-3xl flex flex-col justify-center"
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 rounded bg-accent text-background text-[7px] md:text-[8px] font-bold tracking-[0.15em] uppercase">
                                                        Highlights
                                                    </span>
                                                </div>
                                                <h2 className="text-sm md:text-base lg:text-lg font-space font-black text-white tracking-tight leading-tight mb-1 uppercase">
                                                    {carouselImages[currentIndex].title}
                                                </h2>
                                                <p className="text-white/80 max-w-2xl text-[9px] md:text-[10px] lg:text-[11px] font-light leading-normal line-clamp-2">
                                                    {carouselImages[currentIndex].desc}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Grand Technical Navigation Controls */}
                            <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
                                    }}
                                    className="h-12 w-12 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 pointer-events-auto shadow-[0_4px_30px_rgba(0,0,0,0.3)] group/btn"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover/btn:-translate-x-0.5" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
                                    }}
                                    className="h-12 w-12 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0 pointer-events-auto shadow-[0_4px_30px_rgba(0,0,0,0.3)] group/btn"
                                    aria-label="Next slide"
                                >
                                    <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                                </button>
                            </div>

                            {/* Vertical Progress Indicator (Desktop) */}
                            <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2.5">
                                {carouselImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className="relative w-1 rounded-full overflow-hidden transition-all duration-500 bg-foreground/20 dark:bg-white/20"
                                        style={{ height: currentIndex === idx ? '48px' : '16px' }}
                                    >
                                        {currentIndex === idx && (
                                            <motion.div
                                                initial={{ height: "0%" }}
                                                animate={{ height: "100%" }}
                                                transition={{ duration: 5, ease: "linear" }}
                                                className="absolute inset-0 bg-accent"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: 30% Split Column containing Broadcast Feed (top 50%) & Gallery Carousel (bottom 50%) */}
                <div className="col-span-1 lg:col-span-3 h-auto lg:h-[80vh] flex flex-col gap-3 p-3">

                    {/* Top 50%: Broadcast Feed / News & Events (PERMANENTLY DARK) */}
                    <div className="h-[380px] lg:h-1/2 flex flex-col overflow-hidden bg-zinc-950 border-2 border-[#1A7EFF]/50 rounded-2xl shadow-[0_0_20px_rgba(26,126,255,0.1)] relative">
                        {/* Header */}
                        <div className="py-2.5 px-4 border-b border-[#1A7EFF]/20 bg-zinc-900/60 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="text-sm md:text-base font-space font-black text-white tracking-tight">
                                    News & Events
                                </h3>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                </span>
                            </div>
                        </div>

                        {/* Static Pinned Featured Update */}
                        {(() => {
                            const featuredArticle = newsFeed.find(item => item.title === "URRDA Empanelment");
                            return featuredArticle && (
                                <div className="p-3.5 border-b border-accent/20 bg-accent/[0.04] dark:bg-accent/[0.02] relative overflow-hidden select-none shrink-0 shadow-sm">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[8px] font-bold tracking-wider text-accent uppercase bg-accent/15 px-1.5 py-0.5 rounded">
                                                {featuredArticle.category || "Announcement"}
                                            </span>
                                            <span className="text-[7.5px] font-extrabold text-[#D4AF37] tracking-wider bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-1.5 py-0.5 rounded animate-pulse">
                                                ⭐ FEATURED UPDATE
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                                            <Calendar className="w-2.5 h-2.5 text-accent/60" /> {featuredArticle.date}
                                        </span>
                                    </div>
                                    <Link to="/news" className="block group">
                                        <h4 className="text-[12px] md:text-[13px] font-space font-black text-white group-hover:text-accent transition-colors duration-300 leading-snug uppercase tracking-tight line-clamp-1 mb-1">
                                            {featuredArticle.title}
                                        </h4>
                                        <p className="text-[9.5px] text-zinc-400 leading-relaxed font-light line-clamp-2">
                                            {featuredArticle.summary}
                                        </p>
                                    </Link>
                                </div>
                            );
                        })()}

                        {/* Scrollable list of news */}
                        <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-zinc-950 to-black">
                            <style>{`
                                @keyframes home-news-scroll {
                                    0% {
                                        transform: translateY(0);
                                    }
                                    100% {
                                        transform: translateY(-50%);
                                    }
                                }
                                .animate-home-news-scroll {
                                    animation: home-news-scroll 45s linear infinite;
                                }
                            `}</style>
                            {/* Top & Bottom elegant visual fades */}
                            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-zinc-950 via-zinc-950/40 to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

                            <Link to="/news" className="absolute inset-0 p-4 overflow-hidden block">
                                <div className="flex flex-col gap-3 animate-home-news-scroll hover:[animation-play-state:paused] cursor-pointer">
                                    {(() => {
                                        const otherNews = newsFeed.filter(item => item.title !== "URRDA Empanelment");
                                        const loopList = otherNews.length > 0 ? otherNews : newsFeed;
                                        return [...loopList, ...loopList, ...loopList, ...loopList].map((item, idx) => {
                                            const artCategory = item.category || "News";
                                            const artDate = item.date || "Recent";
                                            const artTitle = item.title || "News Update";
                                            return (
                                                <div
                                                    key={idx}
                                                    className="group flex flex-col gap-2 p-3.5 rounded-xl border border-white/5 hover:border-accent/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 shadow-sm"
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-[9px] md:text-[10px] font-bold tracking-wider text-accent uppercase bg-accent/10 px-2 py-0.5 rounded">
                                                            {artCategory}
                                                        </span>
                                                        <span className="text-[10px] md:text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                                                            <Calendar className="w-2.5 h-2.5 text-accent/60" /> {artDate}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-[13px] md:text-[14px] font-space font-bold text-white/95 group-hover:text-accent transition-colors duration-300 leading-normal line-clamp-2">
                                                        {artTitle}
                                                    </h4>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </Link>
                        </div>

                        {/* Footer - Shifted View More to Bottom Right */}
                        <div className="p-3 border-t border-[#1A7EFF]/20 bg-zinc-900/40 flex items-center justify-end shrink-0">
                            <Link
                                to="/news"
                                className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-accent/40 bg-zinc-950 hover:bg-accent text-accent hover:text-black font-bold text-[9px] tracking-widest uppercase transition-all duration-300 shadow-sm"
                            >
                                <span>View More</span>
                                <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Bottom 50%: Gallery Carousel (PERMANENTLY DARK ROYAL BLUEPRINT THEME) */}
                    <div className="h-[320px] lg:h-1/2 flex flex-col bg-[#060c1d] border-2 border-[#1A7EFF]/50 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(26,126,255,0.1)] relative">
                        {/* Header */}
                        <div className="py-2.5 px-4 border-b border-[#1A7EFF]/20 bg-[#0c1631]/60 flex items-center justify-between shrink-0">
                            <div>
                                <h3 className="text-sm md:text-base font-space font-black text-blue-100 tracking-tight uppercase">
                                    Gallery
                                </h3>
                            </div>
                        </div>

                        {/* Carousel Wrapper with Reduced Top Margin/Padding & Rounding */}
                        <div className="flex-1 pt-1.5 px-4 pb-4 relative overflow-hidden bg-[#060c1d]">
                            <div
                                className="h-full w-full relative rounded-2xl overflow-hidden border border-[#1A7EFF]/25 group/gallery bg-[#0c1631] cursor-pointer"
                                onClick={() => setEnlargedImage(galleryImages[miniIndex].src)}
                            >
                                {/* Auto-playing mini Gallery Carousel */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={miniIndex}
                                        initial={{ opacity: 0, scale: 1.03 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={galleryImages[miniIndex].src}
                                            alt={galleryImages[miniIndex].title}
                                            className="w-full h-full object-cover opacity-90 transition-transform duration-[4s] scale-100 group-hover/gallery:scale-105"
                                        />

                                        {/* HUD Technical Grid Overlay */}
                                        <div className="absolute inset-0 z-10 pointer-events-none opacity-25 group-hover/gallery:opacity-45 transition-opacity duration-500 bg-[linear-gradient(rgba(26,126,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(26,126,255,0.12)_1px,transparent_1px)] bg-[size:15px_15px]" />

                                        {/* Zoom Indicator on Hover */}
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#060c1d]/35 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300">
                                            <div className="h-10 w-10 rounded-full bg-[#1A7EFF]/20 backdrop-blur-md border border-[#1A7EFF]/40 text-[#1A7EFF] flex items-center justify-center shadow-lg transform scale-90 group-hover/gallery:scale-100 transition-all duration-300">
                                                <ZoomIn className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* Info Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-[#060c1d] via-[#060c1d]/90 to-transparent pt-10">
                                            <span className="text-[8px] font-black tracking-[0.2em] text-[#1A7EFF] uppercase block mb-1">
                                                Gallery Showcase
                                            </span>
                                            <h4 className="text-sm font-space font-extrabold text-blue-50 tracking-tight leading-tight">
                                                {galleryImages[miniIndex].title}
                                            </h4>
                                            <p className="text-[10px] text-blue-200/70 font-light mt-0.5 line-clamp-1">
                                                {galleryImages[miniIndex].desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Slide dots overlay */}
                                <div className="absolute top-4 right-4 flex gap-1 z-30">
                                    {galleryImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setMiniIndex(idx);
                                            }}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${miniIndex === idx ? 'w-4 bg-[#1A7EFF]' : 'w-1.5 bg-blue-900/40'}`}
                                        />
                                    ))}
                                </div>

                                {/* Interactive Manual Arrows */}
                                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMiniIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                                        }}
                                        className="h-7 w-7 rounded-lg border border-[#1A7EFF]/20 bg-[#060c1d]/75 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#1A7EFF] hover:text-white hover:border-[#1A7EFF] transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 translate-x-[-5px] group-hover/gallery:translate-x-0 pointer-events-auto shadow-md"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMiniIndex((prev) => (prev + 1) % galleryImages.length);
                                        }}
                                        className="h-7 w-7 rounded-lg border border-[#1A7EFF]/20 bg-[#060c1d]/75 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#1A7EFF] hover:text-white hover:border-[#1A7EFF] transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 translate-x-[5px] group-hover/gallery:translate-x-0 pointer-events-auto shadow-md"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Premium Welcome / Overview Section - Seamless Full-Width Flow */}
            <div className="w-full bg-gradient-to-b from-background via-muted/15 to-background dark:from-[#08080a] dark:via-[#0c0c0e] dark:to-[#08080a] border-t border-border/10 py-16 md:py-20 relative overflow-hidden">

                {/* Animated Scroll Prompt - Positioned at the Top of Welcome Section */}
                <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
                    onClick={() => {
                        window.scrollTo({ top: window.innerHeight - 64, behavior: "smooth" });
                    }}
                >
                    <span className="text-[7px] md:text-[8px] font-mono tracking-[0.3em] text-[#08080a] dark:text-white/60 uppercase select-none font-bold animate-pulse">
                        Scroll to Explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-5 w-3 rounded-full border border-[#08080a]/40 dark:border-white/40 flex justify-center p-0.5"
                    >
                        <div className="h-1.5 w-0.5 rounded-full bg-[#08080a] dark:bg-accent" />
                    </motion.div>
                </div>
                {/* Technical Structural Blueprint Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(var(--accent) 1px, transparent 1px),
                            linear-gradient(90deg, var(--accent) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Glowing radial gradient backdrop */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10"
                    >
                        {/* Left Side: Brand Statement */}
                        <div className="flex flex-col items-start">
                            <span
                                className="text-accent text-4xl lg:text-5xl mb-1"
                                style={{ fontFamily: "'Great Vibes', cursive" }}
                            >
                                Welcome to
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-black tracking-tight text-foreground uppercase leading-none">
                                URBANBUILD
                            </h2>
                            <div className="h-1 w-16 bg-accent mt-4 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" />

                            <p className="text-muted-foreground font-light leading-relaxed mt-8 text-sm md:text-base max-w-xl">
                                A multidisciplinary civil engineering consultancy and infrastructure development firm committed to delivering comprehensive engineering solutions — from design and consultancy to quality control, construction and project management.
                            </p>

                            <Link
                                to="/projects"
                                className="group relative inline-flex items-center gap-2.5 px-6 py-3 mt-8 rounded-full border border-accent/40 hover:bg-accent text-accent hover:text-background font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.08)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] cursor-pointer"
                            >
                                <span>Portfolio</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Right Side: Detailed Narrative & ISO Certifications */}
                        <div className="flex flex-col justify-between h-full lg:pt-8">
                            <div className="space-y-6">
                                <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                                    With a team of experienced engineers, technical experts and field professionals, Urbanbuild delivers reliable, efficient and innovative solutions tailored to each project. We are actively involved in planning, designing and implementing roads, bridges, buildings and other civil infrastructure.
                                </p>
                                <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                                    The company emphasizes high engineering standards, strict quality control, and the adoption of modern technologies and automation in civil engineering processes. Beyond consultancy and construction, we contribute to capacity building in the sector by promoting knowledge sharing and modern engineering practices.
                                </p>
                            </div>

                            {/* Divider Line */}
                            <div className="h-px bg-border/40 w-full my-8 lg:my-10" />

                            {/* ISO Certifications */}
                            <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                                <div
                                    onClick={() => setEnlargedImage("/images/iso-certificate.jpg")}
                                    className="flex items-center gap-4 border border-accent/20 hover:border-accent bg-accent/[0.03] hover:bg-accent/[0.08] px-5 py-3 rounded-2xl cursor-pointer transition-all duration-300 group/iso shadow-sm"
                                >
                                    <div className="flex flex-col pl-1">
                                        <span className="font-space font-black text-foreground text-sm md:text-base lg:text-lg tracking-tight uppercase leading-none">
                                            ISO 9001:2015
                                        </span>
                                        <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase mt-1.5">
                                            Quality Management System
                                        </span>
                                    </div>
                                    <div className="relative h-12 w-9 rounded border border-border/50 overflow-hidden bg-card shrink-0 shadow-sm transition-transform duration-300 group-hover/iso:scale-105">
                                        <img
                                            src="/images/iso-certificate.jpg"
                                            alt="ISO 9001:2015 Certificate"
                                            className="w-full h-full object-cover opacity-80 group-hover/iso:opacity-100 transition-opacity duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/iso:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <ZoomIn className="w-3.5 h-3.5 text-accent" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </div>

            {/* Infinite scrolling Clients Marquee matching Global Associates exactly */}
            <section className="relative bg-background py-8 md:py-12 overflow-hidden border-t border-border/50">
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
                            ref={clientsRef}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isClientsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start"
                        >
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                <span className="text-black dark:text-white mr-3 md:mr-4">OUR</span>
                                <span className="text-accent italic font-light">CLIENTS</span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* Technical Infinite Marquee Area - framed by top/bottom lines and using a single vertical separating line */}
                    <div className="relative w-full flex flex-col select-none overflow-hidden border-y border-accent/30 dark:border-accent/20 py-8 bg-card/5">
                        {/* Prestigious Dark/Light Gradient Fades on edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                        {/* Infinite Marquee Track scrolling at standard cinematic velocity */}
                        <div className="flex overflow-hidden marquee-container">
                            <div className="flex marquee-track animate-infinite-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                                {[...clients, ...clients, ...clients, ...clients].map((item, index) => (
                                    <div
                                        key={`${item.name}-${index}`}
                                        className="flex-shrink-0 w-[290px] md:w-[350px] lg:w-[380px] mx-4 p-6 rounded-2xl border border-border/50 dark:border-accent/10 bg-card/40 backdrop-blur-md hover:border-accent/40 dark:hover:border-accent/30 hover:bg-card/85 dark:hover:bg-[#0c0c0e]/80 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        {/* Title Header with minimal monochrome logo that lights up on hover */}
                                        <div>
                                            <span className="text-[8px] font-black tracking-[0.2em] text-accent uppercase block mb-1.5">
                                                {item.tagline}
                                            </span>
                                            <div className="flex items-center gap-3.5 mb-3">
                                                <div className="h-10 w-10 flex items-center justify-center shrink-0 bg-background/50 rounded-xl p-1 border border-border/20 group-hover:border-accent/20 transition-colors">
                                                    <img
                                                        src={item.logo}
                                                        alt={item.name}
                                                        className="max-h-full max-w-full object-contain opacity-95 group-hover:scale-105 transition-all duration-300 drop-shadow-sm"
                                                    />
                                                </div>
                                                <h3 className="text-xs md:text-sm font-space font-black text-foreground tracking-tight group-hover:text-accent transition-colors duration-300 uppercase leading-snug">
                                                    {item.name}
                                                </h3>
                                            </div>
                                        </div>
                                        {/* Description */}
                                        <p className="text-[11px] md:text-xs text-muted-foreground font-light leading-relaxed">
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

            {/* Architectural Blueprint Lightbox Preview Modal */}
            <AnimatePresence>
                {enlargedImage && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#030712]/98 backdrop-blur-md"
                        onClick={() => setEnlargedImage(null)}
                    >
                        <div
                            className="relative max-w-5xl w-full h-full max-h-[85vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Blueprint Top Header Glow Line */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent shadow-[0_0_15px_rgba(212,175,55,0.8)]" />

                            {/* Modal Close Button */}
                            <button
                                onClick={() => setEnlargedImage(null)}
                                className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full border border-accent/30 bg-[#030712]/85 text-muted-foreground flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 shadow-md group"
                                title="Close Blueprint Details"
                            >
                                <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                            </button>

                            {/* Main Blueprint Image Area */}
                            <div className="relative w-full h-full border border-accent/20 dark:border-accent/15 bg-background rounded-[2rem] overflow-hidden flex items-center justify-center shadow-2xl">
                                {/* Technical grid background inside blueprint */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
                                        backgroundSize: '20px 20px',
                                    }}
                                />
                                <img
                                    src={enlargedImage}
                                    alt="Enlarged Architectural Blueprint Showcase"
                                    className="max-w-full max-h-full object-contain p-4 rounded-2xl relative z-10"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Home;
