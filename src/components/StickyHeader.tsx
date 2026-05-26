import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import logo from "@/assets/logo-optimized.png";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { href: "/home", label: "HOME" },
    {
        href: "/about",
        label: "ABOUT",
        subLinks: [
            { href: "/about", label: "OVERVIEW" },
            { href: "/about#partners", label: "OUR ASSOCIATES" },
            { href: "/about#verticals", label: "OTHER VERTICALS" }
        ]
    },
    {
        href: "/services",
        label: "SERVICES",
        subLinks: [
            { href: "/services#transportation", label: "Transportation and urban mobility" },
            { href: "/services#bridges", label: "Bridge and structures" },
            { href: "/services#town-planning", label: "Town planning and building design" },
            { href: "/services#environment", label: "Environment and sustainability" },
            { href: "/services#water-waste", label: "Water Resources & Engineering" }
        ]
    },
    {
        href: "/projects",
        label: "PORTFOLIO",
        subLinks: [
            { href: "/projects#transportation", label: "Transportation and urban mobility" },
            { href: "/projects#bridges", label: "Bridge and structures" },
            { href: "/projects#town-planning", label: "Town planning and building design" },
            { href: "/projects#environment", label: "Environment and sustainability" },
            { href: "/projects#water-waste", label: "Water Resources & Engineering" }
        ]
    },
    { href: "/insights", label: "INSIGHTS" },
    { href: "/team", label: "TEAM" },
    { href: "/staff-login", label: "STAFF LOGIN" },
];

const StickyHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
    const location = useLocation();

    const isLandingPage = location.pathname === "/";

    useEffect(() => {
        // If not on landing page, navbar is always "scrolled" (solid) to prevent text overlap
        if (!isLandingPage) {
            setIsScrolled(true);
        } else {
            setIsScrolled(window.scrollY > 50);
        }
    }, [isLandingPage]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (isLandingPage) {
            setIsScrolled(latest > 50);
        }
    });

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-white/90 dark:bg-[#060c1d]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#1A7EFF]/15 shadow-sm"
                : "bg-transparent border-transparent"
                }`}
        >
            <div className="w-full px-6 md:px-12">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 bg-transparent border-none cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                    >
                        <img
                            src={logo}
                            alt="UrbanBuild"
                            className={`object-contain transition-all duration-300 ${isScrolled ? "h-10 w-10 brightness-0 dark:invert" : "h-12 w-12 brightness-0 invert"}`}
                        />
                        <div className="flex flex-col items-start justify-center">
                            <span className={`text-lg font-bold tracking-normal leading-none transition-colors ${isScrolled ? "text-charcoal dark:text-white" : "text-white"}`}>
                                URBANBUILD<sup className="relative top-[-6px] text-[1rem]">™</sup>
                            </span>
                            <div className="text-[9px] md:text-[10px] font-semibold text-[#1A7EFF] mt-1.5 tracking-wider uppercase flex items-center gap-1.5 leading-none">
                                <span>DESIGN</span>
                                <span className="w-1 h-1 rounded-full bg-[#1A7EFF] opacity-80 self-center" />
                                <span>Consultancy</span>
                                <span className="w-1 h-1 rounded-full bg-[#1A7EFF] opacity-80 self-center" />
                                <span>Construction</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    {!isLandingPage && (
                        <nav className="hidden md:flex items-center gap-8 h-full">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.href;

                                if (link.subLinks) {
                                    return (
                                        <div
                                            key={link.href}
                                            className="relative group flex items-center h-16"
                                        >
                                            <div className="flex items-center gap-1 cursor-pointer py-2">
                                                <span
                                                    className={`text-xs font-bold tracking-widest transition-all duration-200 flex items-center gap-1 uppercase ${isActive
                                                        ? isScrolled
                                                            ? "text-charcoal dark:text-white"
                                                            : "text-white"
                                                        : isScrolled
                                                            ? "text-charcoal/70 hover:text-charcoal dark:text-white/80 dark:hover:text-white"
                                                            : "text-white/80 hover:text-white"
                                                        }`}
                                                >
                                                    {link.label}
                                                    <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180 text-accent" />
                                                </span>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeNavBar"
                                                        className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isScrolled ? "bg-charcoal dark:bg-white" : "bg-white"}`}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 350,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            {/* Premium Hover Dropdown */}
                                            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-2 w-max min-w-[260px] rounded-2xl bg-[#0c1631]/95 dark:bg-[#060c1d]/95 backdrop-blur-xl border border-[#1A7EFF]/20 dark:border-[#1A7EFF]/35 p-2 shadow-[0_20px_50px_rgba(26,126,255,0.12)] dark:shadow-[0_20px_50px_rgba(26,126,255,0.25)] opacity-0 pointer-events-none scale-95 origin-top group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50">
                                                <div className="flex flex-col gap-1">
                                                    {link.subLinks.map((sub) => (
                                                        <Link
                                                            key={sub.href}
                                                            to={sub.href}
                                                            className="flex items-center justify-between gap-6 rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wider text-white/80 dark:text-white/90 hover:text-accent dark:hover:text-accent hover:bg-white/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200 group/item uppercase whitespace-nowrap"
                                                        >
                                                            <span>{sub.label}</span>
                                                            <span className="h-1.5 w-1.5 rounded-full bg-accent scale-0 opacity-0 group-hover/item:scale-100 group-hover/item:opacity-100 transition-all duration-300 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        className={`relative text-xs font-bold tracking-widest transition-all duration-200 bg-transparent border-none cursor-pointer py-2 hover:-translate-y-0.5 uppercase ${isActive
                                            ? isScrolled
                                                ? "text-charcoal font-bold dark:text-white"
                                                : "text-white font-bold"
                                            : isScrolled
                                                ? "text-charcoal/70 hover:text-charcoal dark:text-white/80 dark:hover:text-white"
                                                : "text-white/80 hover:text-white"
                                            }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNavBar"
                                                className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isScrolled ? "bg-charcoal dark:bg-white" : "bg-white"
                                                    }`}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 350,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/contact"
                            className={`px-6 py-2.5 text-xs font-bold tracking-[0.15em] rounded-full transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98] border ${isScrolled
                                ? "bg-accent text-background border-accent hover:bg-background hover:text-accent"
                                : "bg-white/10 text-white border-white/30 hover:bg-white hover:text-black backdrop-blur-sm"
                                }`}
                        >
                            CONTACT US
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    {!isLandingPage && (
                        <div className="flex items-center gap-4 md:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <button className={`p-2 transition-colors ${isScrolled ? "text-charcoal dark:text-white" : "text-white"}`}>
                                        <Menu className="h-6 w-6" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#0c1631] dark:bg-[#060c1d] border-l border-[#1A7EFF]/20 text-white dark:text-white overflow-y-auto h-full max-h-screen pr-4 scrollbar-thin">
                                    <nav className="mt-8 flex flex-col gap-6 pb-12">
                                        {navLinks.map((link) => {
                                            const isActive = location.pathname === link.href;
                                            return (
                                                <div key={link.href} className="flex flex-col text-left">
                                                    {link.subLinks ? (
                                                        <div className="flex flex-col">
                                                            <button
                                                                onClick={() => {
                                                                    setExpandedMenus(prev => ({
                                                                        ...prev,
                                                                        [link.label]: !prev[link.label]
                                                                    }));
                                                                }}
                                                                className="flex items-center justify-between w-full text-lg font-bold tracking-wide text-accent/70 pb-1 uppercase border-b border-[#1A7EFF]/15 text-left group"
                                                            >
                                                                <span>{link.label}</span>
                                                                <ChevronDown
                                                                    className={`w-4 h-4 text-accent transition-transform duration-300 ${
                                                                        expandedMenus[link.label] ? "rotate-180" : ""
                                                                    }`}
                                                                />
                                                            </button>
                                                            <AnimatePresence initial={false}>
                                                                {expandedMenus[link.label] && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="pl-4 mt-2 flex flex-col gap-3.5 border-l border-accent/30 py-1">
                                                                            {link.subLinks.map((sub) => (
                                                                                <Link
                                                                                    key={sub.href}
                                                                                    to={sub.href}
                                                                                    onClick={() => setIsOpen(false)}
                                                                                    className="text-sm font-semibold tracking-wider text-white/80 hover:text-accent transition-colors text-left uppercase flex items-center gap-2"
                                                                                >
                                                                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                                                    {sub.label}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            to={link.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className={`text-lg font-bold tracking-wide transition-colors text-left flex items-center gap-3 ${isActive
                                                                ? "text-accent font-bold"
                                                                : "text-white/80 hover:text-accent"
                                                                }`}
                                                        >
                                                            {isActive && (
                                                                <motion.span
                                                                    layoutId="activeMobileDot"
                                                                    className="w-2 h-2 rounded-full bg-accent shrink-0"
                                                                    transition={{
                                                                        type: "spring",
                                                                        stiffness: 350,
                                                                        damping: 30,
                                                                    }}
                                                                />
                                                            )}
                                                            {link.label}
                                                        </Link>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <Link
                                            to="/contact"
                                            onClick={() => setIsOpen(false)}
                                            className="mt-4 w-full px-5 py-3.5 text-center bg-accent text-background font-bold rounded-full hover:bg-accent/80 transition-all block text-xs tracking-widest uppercase"
                                        >
                                            CONTACT US
                                        </Link>
                                        <div className="mt-6 flex justify-center">
                                            <ModeToggle />
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Full-width Running Announcement Strip (Hidden on Landing page to prevent overlap) */}
            {!isLandingPage && (
                <div className="w-full bg-[#0a122c] dark:bg-[#02050c] border-t border-b border-[#1A7EFF]/15 py-1.5 px-4 flex items-center justify-between text-xs overflow-hidden relative select-none">
                    <style>{`
                        @keyframes marquee-scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-scroll {
                            display: inline-flex;
                            white-space: nowrap;
                            animation: marquee-scroll 25s linear infinite;
                        }
                        @keyframes text-blink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.3; }
                        }
                        .animate-text-blink {
                            animation: text-blink 1s infinite ease-in-out;
                        }
                    `}</style>
                    {/* Blinking Head */}
                    <div className="z-10 bg-[#0a122c] dark:bg-[#02050c] pr-3 flex items-center gap-1.5 font-bold uppercase tracking-wider text-accent border-r border-[#1A7EFF]/20 shrink-0">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="animate-text-blink text-[#D4AF37] text-[9.5px] tracking-widest font-extrabold">NEW</span>
                    </div>
                    
                    {/* Running Ticker Content */}
                    <Link to="/news" className="flex-1 overflow-hidden relative flex items-center px-3">
                        <div className="animate-marquee-scroll hover:[animation-play-state:paused] flex items-center gap-12 font-mono text-[10px] text-zinc-300 dark:text-zinc-200">
                            <span>
                                UrbanBuild is proud to announce its empanelment with the Uttarakhand Rural Road Development Agency (URRDA) — strengthening our commitment to delivering quality infrastructure consultancy across Uttarakhand.
                            </span>
                            <span>
                                UrbanBuild is proud to announce its empanelment with the Uttarakhand Rural Road Development Agency (URRDA) — strengthening our commitment to delivering quality infrastructure consultancy across Uttarakhand.
                            </span>
                        </div>
                    </Link>

                    {/* Right Side static projects badge */}
                    <Link to="/projects" className="z-10 bg-[#0a122c] dark:bg-[#02050c] pl-3 flex items-center gap-1.5 font-bold uppercase tracking-wider text-accent border-l border-[#1A7EFF]/20 shrink-0 hover:text-white transition-colors duration-300">
                        <span className="text-[10px] md:text-[10.5px] font-space font-black text-[#D4AF37] tracking-tight">336+</span>
                        <span className="text-[7.5px] font-mono text-zinc-300 tracking-wider">Projects Handled</span>
                    </Link>
                </div>
            )}
        </motion.header>
    );
};

export default StickyHeader;
