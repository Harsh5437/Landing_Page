import { useState, useEffect } from "react";
import { MapPin, ArrowRight, ArrowUpRight, X, Briefcase, Ruler, Award, Settings, Plus, Trash2, Edit, RefreshCw, Upload, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import sectorsData from "../data/sectors.json";
import newsFeedData from "../data/newsFeed.json";
import galleryImagesData from "../data/galleryImages.json";

const INITIAL_SECTORS = sectorsData;

// Dynamic helper to generate ultra-realistic blueprint specification details for projects
const getProjectDetails = (project: any) => {
    if (!project) return { ubqn: "", client: "", scope: "", carouselImages: [] };

    // Generate UBQN Code
    const cleanCat = (project.category || "GEN").toUpperCase().replace(/\s+/g, "").substring(0, 4);
    const cleanLoc = (project.location || "IND").toUpperCase().replace(/[^A-Z]/g, "").substring(0, 3);
    const ubqn = project.ubqn || `UBQN-${cleanCat}-${cleanLoc}-0${(project.title.length % 9) + 1}`;

    // Get Client
    let client = project.client || "State Government Authority";
    if (!project.client) {
        const cat = (project.category || "").toLowerCase();
        if (cat.includes("highway") || cat.includes("transit") || cat.includes("infrastructure") || cat.includes("logistics")) {
            client = "National Highways & Infrastructure Development Corp (NHIDCL)";
        } else if (cat.includes("bridge") || cat.includes("structure") || cat.includes("civil")) {
            client = "Public Works Department (PWD), Uttarakhand";
        } else if (cat.includes("planning") || cat.includes("town") || cat.includes("urban")) {
            client = "Urban Development Directorate (UDD), Uttarakhand";
        } else if (cat.includes("sustainable") || cat.includes("environment") || cat.includes("conservation")) {
            client = "State Environment Impact Assessment Authority (SEIAA)";
        } else if (cat.includes("water") || cat.includes("waste") || cat.includes("treatment")) {
            client = "Uttarakhand Jal Sansthan (UJS)";
        }
    }

    // Get Scope of Work
    let scope = project.scope || "Engineering design, sub-surface grading, and safety audit reporting.";
    if (!project.scope) {
        const title = (project.title || "").toLowerCase();
        if (title.includes("highway") || title.includes("road") || title.includes("bypass") || title.includes("corridor")) {
            scope = "Feasibility studies, Detailed Project Report (DPR) formulation, topographic survey using LiDAR, geometric design of 4/6 lane highway corridors, design of flexible pavements, integrated storm water drainage network, and utility relocation planning.";
        } else if (title.includes("bridge") || title.includes("flyover") || title.includes("viaduct") || title.includes("overbridge") || title.includes("girder") || title.includes("truss")) {
            scope = "Geotechnical sub-surface investigation, deep pile foundation analysis, finite element modeling (FEM) of superstructure, seismic response spectrum analysis, design of prestressed concrete girders, tension calibration of stay cables, and safety monitoring protocols.";
        } else if (title.includes("guest house") || title.includes("office") || title.includes("building") || title.includes("facility")) {
            scope = "Architectural planning, building information modeling (BIM), structural concrete frame design, mechanical, electrical, and plumbing (MEP) layouts, HVAC load estimation, and interior space utilization planning.";
        } else if (title.includes("township") || title.includes("masterplan") || title.includes("junction") || title.includes("layout") || title.includes("terminal")) {
            scope = "Socio-economic impact surveys, land-use zoning allocation, integrated transit-oriented development (TOD) master planning, layout drafting of residential and commercial nodes, water distribution grid routing, and environmental green space planning.";
        } else if (title.includes("drainage") || title.includes("hydrology") || title.includes("environment") || title.includes("water") || title.includes("harvesting") || title.includes("recycling") || title.includes("waste")) {
            scope = "Hydraulic modeling of watershed runoff, water channel routing design, rainwater harvesting structures specification, waste sorting and disposal plant layouts, environmental risk mitigation planning, and green buffer zoning.";
        }
    }

    // Carousel Images
    const carouselImages = project.carouselImages && project.carouselImages.length > 0
        ? project.carouselImages
        : [
            project.image,
            "/images/projects/highway-render.jpg",
            "/images/projects/road-section.jpg",
            "/images/projects/bridge-elevation.jpg"
        ];

    return { ubqn, client, scope, carouselImages };
};

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
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


    // Dynamic database-free project storage state
    const [sectors, setSectors] = useState<any[]>(() => {
        const saved = localStorage.getItem("urbanbuild_projects");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Check if the cached storage is outdated compared to sectors.json
                let isOutdated = false;
                for (const defaultSector of INITIAL_SECTORS) {
                    const cachedSector = parsed.find((s: any) => s.id === defaultSector.id);
                    if (!cachedSector) {
                        isOutdated = true;
                        break;
                    }
                    for (const defaultProj of defaultSector.projects) {
                        const cachedProj = cachedSector.projects.find((p: any) => p.title === defaultProj.title);
                        if (!cachedProj || cachedProj.image !== defaultProj.image) {
                            isOutdated = true;
                            break;
                        }
                    }
                    if (isOutdated) break;
                }

                if (!isOutdated) {
                    return parsed;
                }
                // Outdated cache detected, clear it so fresh sectors.json is loaded
                localStorage.removeItem("urbanbuild_projects");
            } catch (e) {
                console.error("Failed to parse saved projects, reverting to default.", e);
            }
        }
        return INITIAL_SECTORS;
    });

    const handleNavClick = (id: string, index: number) => {
        setCurrentIndex(index);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const index = sectors.findIndex((s) => s.id === id);
                    if (index !== -1) {
                        setCurrentIndex(index);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectors.forEach((sector) => {
            const el = document.getElementById(sector.id);
            if (el) observer.observe(el);
        });

        return () => {
            sectors.forEach((sector) => {
                const el = document.getElementById(sector.id);
                if (el) observer.unobserve(el);
            });
        };
    }, [sectors]);

    return (
        <div id="projects" className="min-h-screen bg-background selection:bg-accent selection:text-background pt-16">
            {/* Split Screen Container */}
            <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-4rem)] border-b border-accent/30 dark:border-accent/20">

                {/* Left Sidebar Navigation (Reduced width, compact margins, and sticky) */}
                <div className="w-full lg:w-[20%] dark bg-[#060c1d] lg:border-r border-b lg:border-b-0 border-accent/20 dark:border-accent/15 flex flex-col p-4 md:p-6 lg:px-4 lg:py-8 shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-space font-black tracking-tight text-foreground uppercase">
                            PORTFOLIO
                        </h2>
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase block mb-1">
                            FEATURED PROJECTS
                        </span>
                    </div>

                    {/* Vertical Links List */}
                    <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-4 scrollbar-none pb-4 lg:pb-0">
                        {sectors.map((item, index) => {
                            const isActive = currentIndex === index;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id, index)}
                                    className={`flex items-center gap-4 text-left p-4 rounded-xl border transition-all duration-300 min-w-[200px] lg:min-w-0 group shrink-0 ${isActive
                                        ? "bg-accent/15 border-accent text-foreground shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                        : "bg-transparent border-accent/15 dark:border-accent/10 text-muted-foreground hover:border-accent/40 hover:text-foreground"
                                        }`}
                                >
                                    <span className={`font-mono text-xs font-black tracking-wider ${isActive ? "text-accent" : "text-muted-foreground/60 group-hover:text-accent"}`}>
                                        {item.num}
                                    </span>
                                    <span className="font-space font-bold text-[11px] md:text-xs tracking-wider uppercase leading-snug flex-1 truncate">
                                        {item.title}
                                    </span>
                                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 shrink-0 ${isActive ? "text-accent translate-x-1" : "text-muted-foreground/35 group-hover:text-accent group-hover:translate-x-1"}`} />
                                </button>
                            );
                        })}
                    </div>

                </div>

                {/* Right Main Content Pane */}
                <div className="flex-1 px-6 md:px-10 lg:px-16 pt-4 md:pt-6 lg:pt-8 pb-16 md:pb-24 lg:pb-32 relative flex flex-col gap-16 lg:gap-24 overflow-hidden">
                    {/* Technical Grid Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015]"
                        style={{
                            backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: '2.5rem 2.5rem',
                        }}
                    />



                    {/* Grouped Sectors Stack */}
                    {sectors.map((sector, sIdx) => {
                        const isActiveSector = currentIndex === sIdx;
                        return (
                            <div
                                key={sector.id}
                                id={sector.id}
                                className={`relative z-10 w-full border-b last:border-b-0 border-accent/15 dark:border-accent/10 pb-24 last:pb-0 scroll-mt-24 min-h-[60vh] flex flex-col justify-center transition-all duration-[0.8s] ease-in-out ${isActiveSector ? "opacity-100 scale-100" : "opacity-40 dark:opacity-20 scale-[0.99] hover:opacity-100 hover:scale-100"} ${sIdx === 0 ? "pt-0 lg:pt-4" : "pt-24 -mt-20"}`}
                            >
                                {/* Sector Title Heading */}
                                <div className="mb-10 flex flex-col items-start gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-mono text-xs font-black tracking-widest ${isActiveSector ? "text-accent" : "text-muted-foreground/60"}`}>
                                            SEC. 0{sIdx + 1}
                                        </span>
                                        <div className={`h-[1px] transition-all duration-700 ${isActiveSector ? "w-12 bg-accent" : "w-6 bg-accent/20"}`} />
                                    </div>
                                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-space font-black tracking-tight uppercase leading-none transition-colors duration-500 ${isActiveSector ? "text-foreground" : "text-muted-foreground"}`}>
                                        {sector.title}
                                    </h3>
                                    {/* Active Underline Glow */}
                                    <div className={`h-1 rounded-full transition-all duration-700 shadow-md ${isActiveSector ? "w-28 bg-accent shadow-[0_0_12px_rgba(212,175,55,0.6)]" : "w-12 bg-accent/15"}`} />
                                </div>

                                {/* Project Cards Grid under this sector */}
                                {sector.projects.length === 0 ? (
                                    <div className="col-span-full py-16 px-8 flex flex-col items-center justify-center text-center bg-card/15 dark:bg-card/5 border border-dashed border-accent/25 dark:border-accent/15 rounded-[32px] relative overflow-hidden group select-none min-h-[280px]">
                                        {/* Golden Dynamic Laser Header Line on hover */}
                                        <div className="absolute top-0 left-0 h-[2.5px] w-0 bg-accent transition-all duration-700 group-hover:w-full shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
                                        <div className="flex flex-col items-center gap-5">
                                            <div className="h-14 w-14 rounded-full border border-accent/25 flex items-center justify-center bg-background/50 text-accent/80 animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-xl font-space font-black tracking-widest uppercase text-foreground">
                                                    Coming Soon
                                                </h4>
                                                <p className="text-sm text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
                                                    We are currently compiling authentic engineering datasets and drone photography for this sector. Stay tuned.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {sector.projects.map((project, pIdx) => (
                                            <div
                                                key={pIdx}
                                                onClick={() => setSelectedProject(project)}
                                                className="group relative flex flex-col w-full bg-card/20 dark:bg-card/10 border border-accent/20 dark:border-accent/15 rounded-3xl p-4 transition-all duration-500 hover:border-accent/50 hover:bg-card/30 hover:shadow-2xl hover:shadow-accent/5 overflow-hidden cursor-pointer select-none"
                                            >
                                                {/* Golden Dynamic Laser Header Line on hover */}
                                                <div className="absolute top-0 left-0 h-[2.5px] w-0 bg-accent transition-all duration-700 group-hover:w-full shadow-[0_0_12px_rgba(212,175,55,0.8)]" />

                                                {/* Image Window (Inside rounded card) */}
                                                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-background border border-accent/10 transition-all duration-500">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 brightness-[0.95] dark:brightness-[0.85]"
                                                    />
                                                    {/* Blueprint fine frame corners */}
                                                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </div>

                                                {/* Technical Spec details below the image */}
                                                <div className="pt-5 pb-1 px-1 flex flex-col justify-between flex-1 w-full gap-4">
                                                    <div className="space-y-3 min-w-0">
                                                        {/* Category badge */}
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-accent/5 border border-accent/25 text-[8px] md:text-[9px] font-mono font-bold tracking-widest text-accent uppercase leading-none">
                                                            {project.category}
                                                        </span>

                                                        {/* Project Title */}
                                                        <h4 className="font-space font-black text-foreground text-base md:text-lg leading-snug uppercase group-hover:text-accent transition-colors duration-300 truncate">
                                                            {project.title}
                                                        </h4>
                                                    </div>

                                                    {/* Footer row inside the card */}
                                                    <div className="flex items-center justify-between border-t border-accent/15 dark:border-accent/10 pt-3 w-full gap-4">
                                                        <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-light min-w-0">
                                                            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                                                            <span className="truncate">{project.location}</span>
                                                        </div>

                                                        {/* Action Arrow Button */}
                                                        <div className="h-8 w-8 rounded-full border border-accent/30 bg-background text-muted-foreground flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (() => {
                    const details = getProjectDetails(selectedProject);
                    return (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/95 backdrop-blur-lg overflow-y-auto">
                            <div
                                className="relative w-full max-w-4xl bg-card border border-accent/30 dark:border-accent/20 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-300 my-auto"
                            >
                                {/* Blueprint Top Header Glow Line */}
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-accent shadow-[0_0_15px_rgba(212,175,55,0.8)]" />

                                {/* Modal Close Button */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full border border-accent/30 bg-background text-muted-foreground flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 shadow-md group"
                                    title="Close Blueprint Details"
                                >
                                    <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                                </button>

                                {/* 1. ID, Work Name, Client & Scope Section */}
                                <div className="space-y-4 mt-2">
                                    {/* Project UBQN (First) */}
                                    <div className="flex items-center">
                                        <span className="text-[10px] font-mono tracking-wider text-muted-foreground font-black uppercase">
                                            #UBQN: <span className="text-accent">{details.ubqn}</span>
                                        </span>
                                    </div>

                                    {/* Main Project Title as Work Name (Second) */}
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-mono tracking-widest text-accent font-black uppercase block">
                                            # WORK NAME
                                        </span>
                                        <h3 className="font-space font-black text-foreground text-xl md:text-2xl lg:text-3xl uppercase leading-tight tracking-tight">
                                            {selectedProject.title}
                                        </h3>
                                    </div>

                                    {/* Details Panels Stack */}
                                    <div className="flex flex-col gap-4">
                                        {/* Client Info block (Third) */}
                                        <div className="w-full space-y-1">
                                            <span className="text-[9px] font-mono tracking-widest text-accent font-black uppercase block">
                                                # CLIENT
                                            </span>
                                            <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                                                {details.client}
                                            </p>
                                        </div>

                                        {/* Dynamic Intervening Separation Line */}
                                        <div className="h-[1px] bg-accent/15 dark:bg-accent/10 w-full" />

                                        {/* Scope of Work block */}
                                        <div className="w-full rounded-2xl border border-accent/15 bg-muted/20 p-4 space-y-1.5 hover:border-accent/30 transition-colors">
                                            <span className="text-[9px] font-mono tracking-widest text-accent font-black uppercase block">
                                                # SCOPE OF WORK
                                            </span>
                                            <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                                                {details.scope}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Separation Line */}
                                <div className="relative w-full py-1">
                                    <div className="h-[1px] bg-accent/30 dark:bg-accent/20 w-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent animate-pulse" />
                                </div>

                                {/* 3. Images Carousel at the Bottom */}
                                <div className="space-y-2.5">
                                    <span className="text-[9px] font-mono tracking-widest text-accent font-black uppercase block">
                                        # IMAGES
                                    </span>

                                    <div className="relative w-full h-36 md:h-44 rounded-2xl overflow-hidden bg-background border border-accent/20 shadow-inner group/carousel">
                                        {/* Infinite running marquee wrapper */}
                                        <div className="flex overflow-hidden h-full w-full">
                                            <div className="flex animate-infinite-marquee-images h-full hover:[animation-play-state:paused] cursor-pointer">
                                                {[...details.carouselImages, ...details.carouselImages, ...details.carouselImages].map((imgSrc, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex-shrink-0 w-56 md:w-72 h-full pr-4 relative group/img cursor-zoom-in"
                                                        onClick={() => setEnlargedImage(imgSrc)}
                                                    >
                                                        <img
                                                            src={imgSrc}
                                                            alt={`Running Slide ${index + 1}`}
                                                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover/img:scale-105"
                                                        />
                                                        {/* Click to Enlarge premium overlay */}
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl mr-4">
                                                            <span className="text-[9px] font-mono tracking-widest text-white font-bold bg-accent/90 border border-accent/25 px-3 py-1.5 rounded-lg uppercase flex items-center gap-1.5 shadow-lg backdrop-blur-sm animate-in fade-in zoom-in-90 duration-200">
                                                                <ZoomIn className="w-3.5 h-3.5 text-background animate-pulse" />
                                                                Click to Enlarge
                                                            </span>
                                                        </div>
                                                        {/* Fine corner marks inside each image */}
                                                        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-accent/40" />
                                                        <div className="absolute top-2 right-6 w-2 h-2 border-t border-r border-accent/40" />
                                                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-accent/40" />
                                                        <div className="absolute bottom-2 right-6 w-2 h-2 border-b border-r border-accent/40" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Technical alignment grids overlay */}
                                        <div className="absolute inset-0 pointer-events-none border border-accent/10 grid grid-cols-3 grid-rows-3 opacity-20">
                                            <div className="border-r border-b border-accent/20" />
                                            <div className="border-r border-b border-accent/20" />
                                            <div className="border-b border-accent/20" />
                                            <div className="border-r border-b border-accent/20" />
                                            <div className="border-r border-b border-accent/20" />
                                            <div className="border-b border-accent/20" />
                                        </div>

                                        {/* Overlay Fine Frame Corners */}
                                        <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-accent" />
                                        <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-accent" />
                                        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-accent" />
                                        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-accent" />

                                        {/* Location tag floating */}
                                        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md border border-accent/20 px-3 py-1 rounded-lg z-10 shadow-sm flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3 text-accent" />
                                            <span className="text-[10px] font-bold tracking-wider text-foreground">
                                                {selectedProject.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Inline CSS styling block for infinite running marquee of images */}
                                    <style>{`
                                        @keyframes infinite-marquee-images {
                                            0% { transform: translateX(0); }
                                            100% { transform: translateX(-33.33%); }
                                        }
                                        .animate-infinite-marquee-images {
                                            animation: infinite-marquee-images 15s linear infinite;
                                            width: max-content;
                                            display: flex;
                                        }
                                    `}</style>
                                </div>


                            </div>
                        </div>
                    );
                })()}
            </AnimatePresence>

            {/* Enlarged Image Lightbox Overlay Modal */}
            <AnimatePresence>
                {enlargedImage && (
                    <div
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 bg-background/95 backdrop-blur-xl"
                        onClick={() => setEnlargedImage(null)}
                    >
                        <div
                            className="relative w-full max-w-5xl max-h-[90vh] bg-card border border-accent/30 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Blueprint Top Header Glow Line */}
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent shadow-[0_0_15px_rgba(212,175,55,0.8)]" />

                            {/* Lightbox Close Button */}
                            <button
                                onClick={() => setEnlargedImage(null)}
                                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full border border-accent/30 bg-background text-muted-foreground flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 shadow-md group"
                                title="Close Enlarged Image"
                            >
                                <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                            </button>

                            {/* Image Container */}
                            <div className="relative w-full h-full max-h-[78vh] rounded-2xl overflow-hidden border border-accent/15 flex items-center justify-center bg-background/50">
                                <img
                                    src={enlargedImage}
                                    alt="Enlarged Blueprint Specification"
                                    className="w-auto h-auto max-w-full max-h-[78vh] object-contain rounded-2xl"
                                />

                                {/* Fine corner marks around the photo */}
                                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-accent" />
                                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-accent" />
                                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-accent" />
                                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-accent" />
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
