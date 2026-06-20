import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, CheckCircle2, Compass, ZoomIn, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Partners from "@/components/Partners";

const verticals = [
    {
        id: "v1",
        tagline: "V.01",
        name: "BEAVERS",
        description: "Construction and execution arm for infrastructure projects."
    },
    {
        id: "v2",
        tagline: "V.02",
        name: "LABORATORY",
        description: "In-house testing and quality control facilities."
    },
    {
        id: "v3",
        tagline: "V.03",
        name: "QUEST",
        description: "Research and development for engineering innovation."
    },
    {
        id: "v4",
        tagline: "V.04",
        name: "AILTREX AUTOMATION",
        description: "Automation and digital solutions for civil engineering processes."
    }
];

const About = () => {
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-background pt-28">

            {/* Stacked Layout with High-Contrast Golden Blueprint Lines - One by One, Full Width */}
            <div className="flex flex-col w-full border-y border-accent/30 dark:border-accent/20 bg-background overflow-hidden divide-y divide-accent/30 dark:divide-accent/20">

                {/* Box 1: Full Width - Overview (ABOUT URBANBUILD) */}
                <div className="w-full flex flex-col py-6 px-6 md:py-8 md:px-10 lg:py-10 lg:px-14 relative overflow-hidden bg-card/10">
                    {/* Technical Grid Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015]"
                        style={{
                            backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: '2.5rem 2.5rem',
                        }}
                    />

                    <div className="relative z-10 flex flex-col gap-6">
                        {/* Top Header Section */}
                        <div>

                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-space font-black tracking-tight text-foreground uppercase leading-none">
                                ABOUT <span className="text-[#1A7EFF]">URBANBUILD</span>
                            </h2>
                            <div className="h-1 w-16 bg-accent mt-4 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                        </div>

                        {/* Narrative */}
                        <div className="text-muted-foreground font-light leading-relaxed text-sm md:text-base lg:text-lg w-full space-y-4">
                            <p>
                                Founded by Er. Ritambhra Thakur in April 2024 and
                                incorporated as Pvt. Ltd. on May 1, 2025,  <span className="text-[#1A7EFF] font-bold">Urbanbuild</span> is a multidisciplinary civil engineering consultancy and infrastructure development firm committed to delivering comprehensive engineering solutions. The company provides a wide range of professional services including engineering design and consultancy, quality testing and quality control, construction services, and project management for infrastructure and development projects. With a team of experienced engineers, technical experts, and field professionals, the company focuses on delivering reliable, efficient, and innovative solutions tailored to the requirements of each project. <span className="text-[#1A7EFF] font-bold">Urbanbuild</span> is actively involved in planning, designing, and implementing projects related to roads, bridges, buildings, and other civil infrastructure. The company emphasizes maintaining high engineering standards, strict quality control practices, and the adoption of modern technologies and automation in civil engineering processes. By combining technical expertise with practical field experience, In addition to consultancy and construction services, the company also contributes to capacity building in the civil engineering sector by promoting knowledge sharing, modern engineering practices, and the use of advanced tools and technologies.
                            </p>
                        </div>


                    </div>
                </div>

                {/* Row: Services Offered & Accreditation - Side-by-Side in One Line */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 bg-card/5 divide-y lg:divide-y-0 lg:divide-x divide-accent/30 dark:divide-accent/20 relative overflow-hidden">

                    {/* Left Panel: Services Offered */}
                    <div className="flex flex-col py-6 px-6 md:py-8 md:px-10 lg:py-10 lg:px-14 bg-transparent relative overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between border-b border-accent/25 pb-4 mb-6">
                            <div>

                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-space font-black text-foreground tracking-tight mt-1 uppercase">
                                    Services Offered
                                </h3>
                            </div>
                            <Compass className="w-8 h-8 text-accent opacity-60" />
                        </div>
                        <div className="w-full">
                            <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
                                The services offered by <span className="text-[#1A7EFF] font-bold">urbanbuild</span> include engineering design, geotechnical studies and investigations, topographical and cadastral surveys, hydrological and hydraulic studies, environmental and sociological studies, institutional and capacity building, financial & economic studies, feasibility studies, master planning, construction supervision, procurement and project management for roads & bridges, civil engineering structures, institutional & industrial buildings, irrigation systems, asset management, water supply and sewage as well as hydraulic structures and plants, railways, harbours and airport infrastructure projects and other structures including oil production well pads, etc.
                            </p>
                            <div className="mt-6 flex justify-end">
                                <Link
                                    to="/services"
                                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1A7EFF]/35 bg-[#1A7EFF]/5 hover:bg-[#1A7EFF] text-[#1A7EFF] hover:text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-sm"
                                >
                                    <span>Explore Services</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Accreditation */}
                    <div className="flex flex-col py-6 px-6 md:py-8 md:px-10 lg:py-10 lg:px-14 bg-card/15 relative overflow-hidden">
                        <div className="shrink-0 flex items-center justify-between border-b border-accent/25 pb-4 mb-6">
                            <div>

                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-space font-black text-foreground tracking-tight mt-1 uppercase">
                                    Accreditation
                                </h3>
                            </div>
                            <Award className="w-8 h-8 text-accent opacity-60" />
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start w-full">
                            <div className="flex flex-col gap-4">
                                <div
                                    onClick={() => setEnlargedImage("/images/iso-certificate.jpg")}
                                    className="flex gap-4 items-center bg-muted/20 border border-accent/20 dark:border-accent/15 rounded-2xl p-4 shadow-sm relative overflow-hidden group cursor-pointer hover:border-accent hover:bg-accent/[0.04] transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] to-transparent pointer-events-none" />
                                    <div className="h-12 w-12 rounded bg-accent text-background flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="text-[10px] font-mono tracking-widest text-accent uppercase block leading-none mb-1">System Certified</span>
                                        <h4 className="font-space font-black text-foreground text-base md:text-lg leading-none uppercase">
                                            ISO 9001: 2015
                                        </h4>
                                        <span className="text-xs text-muted-foreground font-light block mt-1">
                                            Quality Management System
                                        </span>
                                    </div>
                                    {/* Miniature physical preview of the certificate */}
                                    <div className="relative h-12 w-9 rounded border border-border/50 overflow-hidden bg-card shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 self-center">
                                        <img
                                            src="/images/iso-certificate.jpg"
                                            alt="ISO 9001:2015 Certificate"
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <ZoomIn className="w-3.5 h-3.5 text-accent" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                                    Accredited and conforming to <strong className="text-accent cursor-pointer hover:underline" onClick={() => setEnlargedImage("/images/iso-certificate.jpg")}>ISO 9001: 2015</strong>, our Integrated Management System is strictly followed from project acquisition to final handover. Compliance is maintained through periodic internal & external audits.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h4 className="font-space font-bold text-foreground text-base uppercase tracking-wide leading-none">
                                    Strict Compliance Ecosystem
                                </h4>
                                <div className="flex flex-wrap gap-2.5">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-[10px] md:text-xs text-foreground/80 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                                        Indigenous Management Information System
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-[10px] md:text-xs text-foreground/80 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                                        Structured Checklist for Efficient Execution
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-[10px] md:text-xs text-foreground/80 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                                        Efficient Documentation & Workflow Control
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seamless Transition to Global Associates (Partners) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mt-8"
            >
                <Partners />
            </motion.div>

            {/* Other Verticals (Ecosystem) Section - Re-engineered as a scrolling Marquee adjacent to Global */}
            <section id="verticals" className="relative bg-background py-16 md:py-24 overflow-hidden border-t border-accent/30 dark:border-accent/20">
                {/* Technical Structural Background Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
                </div>

                <div className="w-full relative z-10">
                    {/* Header shifted towards left side with luxury Outfit font */}
                    <div className="w-full pl-6 md:pl-10 lg:pl-16 mb-12">
                        <div className="flex flex-col items-start">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                OTHER <span className="text-accent italic font-light">VERTICALS</span>
                            </h2>
                        </div>
                    </div>

                    {/* Technical Infinite Marquee Area - framed by top/bottom lines and using a single vertical separating line */}
                    <div className="relative w-full flex flex-col select-none overflow-hidden border-y border-accent/30 dark:border-accent/20 py-8 bg-card/5">
                        {/* Prestigious Dark Gradient Fades on edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                        {/* Infinite Marquee Track scrolling at same cinematic velocity */}
                        <div className="flex overflow-hidden marquee-container">
                            <div className="flex marquee-track animate-infinite-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
                                {[...verticals, ...verticals, ...verticals, ...verticals, ...verticals, ...verticals].map((item, index) => (
                                    <div
                                        key={`${item.id}-${index}`}
                                        className="flex-shrink-0 w-[300px] md:w-[380px] lg:w-[420px] px-8 md:px-10 lg:px-12 border-r border-accent/30 dark:border-accent/20 flex flex-col justify-between group"
                                    >
                                        {/* Title Header */}
                                        <div>
                                            <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] text-accent uppercase block mb-2">
                                                {item.tagline}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-space font-black text-foreground tracking-tight mb-2.5 group-hover:text-accent transition-colors duration-300">
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

            {/* Expanded Image Lightbox Modal */}
            <AnimatePresence>
                {enlargedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setEnlargedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
                    >
                        {/* Technical HUD Borders inside lightbox */}
                        <div className="absolute inset-4 border border-white/5 pointer-events-none" />
                        <div className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer z-50">
                            <button
                                onClick={() => setEnlargedImage(null)}
                                className="h-10 w-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#030712] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={enlargedImage}
                                alt="Enlarged Showcase"
                                className="max-w-full max-h-[85vh] object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default About;
