import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
    {
        id: "transportation",
        num: "01",
        title: "Transportation & Urban Mobility",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
        desc1: "At Urbanbuild, we believe that efficient transportation systems are the foundation of sustainable urban growth. Our Transportation & Urban Mobility division focuses on designing, developing, and modernizing infrastructure that enhances connectivity, reduces congestion, improves safety, and supports future-ready cities and communities.",
        desc2: "With expertise in civil engineering, smart infrastructure, and project execution, we deliver integrated mobility solutions that align with modern urban demands and government development goals. From roads and bridges to pedestrian infrastructure and intelligent transport systems, Urbanbuild aims to create mobility networks that are safe, resilient, and environmentally responsible.",
        features: [
            "Project Conceptualization and Master Planning",
            "Preliminary and detailed survey",
            "Feasibility studies",
            "Geometric design",
            "Traffic surveys",
            "Crust design",
            "Overlay design using BBD",
            "Overlay design using FWD",
            "Bypass design",
            "Pavement Condition Assessment",
            "Design of Traffic Management Systems",
            "Road Safety Audits",
            "Soil and CBR testing",
            "Widening of roads",
            "Quality control lab and insitu tests",
            "Tender Documentation and Assistance",
            "Construction Management and Supervision",
            "Asset Management",
            "Institutional Development and Capacity Building"
        ]
    },
    {
        id: "bridges",
        num: "02",
        title: "Bridge & Structures",
        image: "/images/projects/bridge-elevation.jpg",
        desc1: "Our Bridge & Structures division delivers innovative design, engineering consultancy, and technical planning solutions for bridges, transportation structures, and critical civil infrastructure. We specialize in creating structurally efficient, sustainable, and future-ready designs that balance engineering precision with practical functionality.",
        desc2: "We recognize that safety and durability are non-negotiable when it comes to bridge and structural engineering. That is why Urbanbuild places strong emphasis on detailed structural analysis, rigorous design validation, careful material specifications, and strict adherence to IRC, IS, and government engineering standards. Our commitment is not only to design efficient infrastructure, but to develop engineering solutions that stand the test of time — ensuring reliability, resilience, and public safety for generations to come.",
        features: [
            "Project Conceptualization and Master Planning",
            "Topographical Surveys",
            "Geotechnical investigations",
            "Geological studies",
            "Hydrological studies",
            "Economic and Financial Analysis",
            "Feasibility Studies",
            "Environmental studies",
            "Engineering Design",
            "Structural Condition Assessment",
            "Costing and estimation",
            "Quality control lab and insitu tests",
            "Tender Documentation and Assistance",
            "Construction Management and Supervision",
            "Asset Management",
            "Institutional Development and Capacity Building"
        ]
    },
    {
        id: "town-planning",
        num: "03",
        title: "Town Planning & Building Design",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
        desc1: "At urbanbuild, we believe that every successful development begins with intelligent planning and thoughtful design that balances functionality, aesthetics, environmental responsibility, and long-term societal growth.",
        desc2: "Our expertise spans across residential townships, commercial complexes, institutional campuses, mixed-use developments, public infrastructure, and urban redevelopment projects. By integrating engineering precision with innovative architectural concepts, we create spaces that are efficient, safe, visually appealing, and aligned with evolving societal needs.",
        features: [
            "Project Conceptualization and Master Planning",
            "Feasibility Studies and Engineering Design",
            "Topographical surveys",
            "geotechnical investigations",
            "Building plan and elevations",
            "3d views and walkin videos",
            "interior design and material schedules",
            "Structural Condition Assessment",
            "costing and estimation",
            "Earthquake mapping",
            "Tender Documentation and Assistance",
            "Construction Management and Supervision",
            "Asset Management",
            "Institutional Development and Capacity Building"
        ]
    },
    {
        id: "environment",
        num: "04",
        title: "Environment & Sustainability",
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
        desc1: "Our Environment & Sustainability Consultancy sector at Urbanbuild focuses on delivering professional advisory and technical consultancy services that promote sustainable development, environmental responsibility, and climate-resilient infrastructure planning",
        desc2: "We provide expert guidance to government departments, infrastructure developers, institutions, industries, and private clients in achieving environmentally compliant, sustainable, and future-ready project outcomes. Our services emphasize scientific assessment, regulatory compliance, environmental risk mitigation, and sustainable infrastructure planning aligned with modern environmental standards and development policies.",
        features: [
            "rapid environmental assesment (REA)",
            "Environmental and Social Impact Assessments",
            "Environmental clearance",
            "Health, Safety, and Environment Monitoring",
            "Tender Documentation and Assistance",
            "Construction Management and Supervision",
            "Project and Contract Management",
            "Asset Management",
            "Institutional Development and Capacity Building",
            "initial environment examination (IEE)",
            "Noise and vibration Audits",
            "Forest Cases",
            "Stakeholder Engagements",
            "Resettlement Action Plans",
            "pollution control mechanisms",
            "carbon credits consultancy",
            "Climate Change and Resilience Planning",
            "Green Building Certifications"
        ]
    },
    {
        id: "water-waste",
        num: "05",
        title: "Water Resources & Engineering",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
        desc1: "At Urbanbuild, our Water Resources & Engineering Consultancy sector is focused on providing sustainable, efficient, and technically sound consultancy solutions for water infrastructure, wastewater systems, drainage management, and integrated water resources planning.",
        desc2: "As a consultancy-driven division, we assist government agencies, urban local bodies, industries, institutions, and private developers in planning and developing environmentally responsible and resource-efficient infrastructure systems.",
        features: [
            "Project Conceptualization and Master Planning",
            "Feasibility Studies and Engineering Design",
            "levelling surveys",
            "hydrological studies",
            "drainage survey and plans",
            "drain design",
            "complete drainage systme design",
            "treatment plant designs",
            "water supply scheme planning",
            "water supply network design",
            "Construction Management and Supervision",
            "Asset Management",
            "Project and Contract Management",
            "Institutional Development and Capacity Building"
        ]
    }
];

const Services = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const location = useLocation();

    // 1. Initial Hash Route Support
    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const cleanHash = hash.replace("#", "");
            const index = services.findIndex((s) => s.id === cleanHash);
            if (index !== -1) {
                setCurrentIndex(index);
                const timer = setTimeout(() => {
                    const el = document.getElementById(cleanHash);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
                return () => clearTimeout(timer);
            }
        }
    }, [location.hash]);

    // 2. Click Navigation Handler
    const handleNavClick = (id: string, index: number) => {
        setCurrentIndex(index);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // 3. Scrollspy Intersection Observer
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -60% 0px", // Focus region for scroll detection
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const index = services.findIndex((s) => s.id === id);
                    if (index !== -1) {
                        setCurrentIndex(index);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        services.forEach((service) => {
            const el = document.getElementById(service.id);
            if (el) observer.observe(el);
        });

        return () => {
            services.forEach((service) => {
                const el = document.getElementById(service.id);
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-background selection:bg-accent selection:text-background pt-24">
            {/* Split Screen Container */}
            <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-6rem)] border-b border-accent/30 dark:border-accent/20">

                {/* Left Sidebar Navigation (Reduced width, compact margins, and sticky) */}
                <div className="w-full lg:w-[20%] dark bg-[#060c1d] lg:border-r border-b lg:border-b-0 border-accent/20 dark:border-accent/15 flex flex-col p-4 md:p-6 lg:px-4 lg:py-8 shrink-0 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
                    <div className="mb-8">
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase block mb-1">
                            SERVICES LIST
                        </span>
                        <h2 className="text-2xl md:text-3xl font-space font-black tracking-tight text-foreground uppercase">
                            ALL SECTORS
                        </h2>
                    </div>

                    {/* Vertical Links List */}
                    <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-4 scrollbar-none pb-4 lg:pb-0">
                        {services.map((item, index) => {
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
                                    <span className="font-space font-bold text-[11px] md:text-xs tracking-wider uppercase leading-snug flex-1">
                                        {item.title}
                                    </span>
                                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 shrink-0 ${isActive ? "text-accent translate-x-1" : "text-muted-foreground/35 group-hover:text-accent group-hover:translate-x-1"}`} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Main Content Pane (All services stacked vertically) */}
                <div className="flex-1 p-6 md:p-10 lg:p-16 relative flex flex-col gap-24 lg:gap-32 overflow-hidden">
                    {/* Technical Grid Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015]"
                        style={{
                            backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: '2.5rem 2.5rem',
                        }}
                    />

                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            id={service.id}
                            className="relative z-10 w-full pt-20 -mt-20 border-b last:border-b-0 border-accent/15 dark:border-accent/10 pb-20 last:pb-0 scroll-mt-24 min-h-[80vh] flex flex-col justify-center"
                        >
                            {/* Service Content */}
                            <div className="space-y-10">
                                {/* Top Description & Showcase Image Block */}
                                <div className="flex flex-col lg:flex-row gap-8 items-start">
                                    {/* Left Text Block */}
                                    <div className="flex-1 space-y-6">
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                            {service.title}
                                        </h3>
                                        <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-xs md:text-sm lg:text-base">
                                            <p>{service.desc1}</p>
                                            <p>{service.desc2}</p>
                                        </div>
                                    </div>

                                    {/* Right Showcase Image */}
                                    <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0">
                                        <div className="relative rounded-2xl overflow-hidden border border-accent/30 dark:border-accent/20 shadow-xl group aspect-[4/3] lg:aspect-square bg-card">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95] dark:brightness-[0.85]"
                                            />
                                            {/* Blueprint fine frame corners */}
                                            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent/60" />
                                            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/60" />
                                            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent/60" />
                                            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent/60" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Services List - Styled as elegant Bullet Points */}
                                <div className="space-y-6 pt-6 border-t border-accent/20 dark:border-accent/15">
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-accent uppercase font-black">
                                            SERVICES
                                        </span>
                                    </div>

                                    {/* Responsive 3-Column Bullet Points */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 w-full pt-2">
                                        {service.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-3 group py-1.5 transition-all duration-300"
                                            >
                                                <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                                                <span className="text-xs md:text-sm font-light text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Services;
