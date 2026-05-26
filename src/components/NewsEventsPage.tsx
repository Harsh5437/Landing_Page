import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, Search, Filter, Newspaper, ArrowRight, X } from "lucide-react";

// Robust mock news feed database
const newsArticles = [
  {
    id: 1,
    title: "UrbanBuild™ Growth Conclave 1.0, held at Hotel Ramada, Dehradun",
    category: "Event",
    date: "Oct 12, 2025",
    readTime: "3 min read",
    summary: "Our inaugural Growth Conclave gathered engineering experts, infrastructure planners, and regional leaders to map the future of public works and sustainable development across Dehradun.",
    content: "The UrbanBuild™ Growth Conclave 1.0 served as a highly successful collaborative hub for highlighting regional growth strategies and modern engineering trends. Er. G.K. Sahu and other notable dignitaries shared their extensive road construction knowledge and structural analysis insights, shaping the next era of development. Participants engaged in in-depth panels concerning next-generation project engineering and civil structural systems.",
    img: "/images/projects/highway-render.jpg"
  },
  {
    id: 3,
    title: "Er. G.K. Sahu, Principal Scientist at CRRI, Visited URBANBUILD™ Office",
    category: "Visit",
    date: "Aug 15, 2025",
    readTime: "2 min read",
    summary: "Honored to host the senior structural scientist from the Central Road Research Institute (CRRI) to review our technical blueprints and highway junction systems.",
    content: "During his technical visit, Er. G.K. Sahu evaluated UrbanBuild's digital road design solutions and public safety structures. His high-level feedback strengthens our ongoing integration of CRRI guidelines, ensuring state-of-the-art highway systems that exceed public safety benchmarks.",
    img: "/images/projects/govt-building.jpg"
  },
  {
    id: 4,
    title: "National Highway Expansion Corridor Blueprint Finalized",
    category: "Announcement",
    date: "Jul 10, 2025",
    readTime: "5 min read",
    summary: "The master blueprints for the state highway corridor expansion have been finalized, leveraging our premium traffic-flow automation models.",
    content: "Our civil drafting and high-capacity engineering teams have officially completed the technical blueprints for the highway expansion program. Utilizing modern 3D topographic mapping and traffic-flow simulation software, the corridor is fully optimized for maximum volume, seamless junction merging, and minimum environmental impact.",
    img: "/images/projects/highway-render.jpg"
  },
  {
    id: 5,
    title: "Implementation of Sustainable Civil Structural Systems",
    category: "Insights",
    date: "Jun 05, 2025",
    readTime: "6 min read",
    summary: "A deep dive into how green architectural design and reduced carbon concrete formulations are driving sustainable government construction projects.",
    content: "Sustainability is no longer an optional feature—it is the foundation of civil structural engineering. This analytical article details how green design, renewable energy integration, and state-of-the-art drainage networks are being integrated across our modern institutional developments, creating high-performance buildings with minimal structural footprints.",
    img: "/images/projects/bridge-elevation.jpg"
  },
  {
    id: 6,
    title: "Civil Structural Survey Completed for Bageshwar Circuit House",
    category: "Announcement",
    date: "Nov 20, 2025",
    readTime: "3 min read",
    summary: "Our structural engineering team has finalized comprehensive soil mechanics audits and architectural drafting for the Bageshwar Circuit House development project.",
    content: "Following intensive site selection reviews and geotechnical surveys, UrbanBuild has officially delivered the technical foundation designs and structural blueprints for the Bageshwar Circuit House. This eco-friendly administrative facility integrates local stone aesthetics with modern green concrete systems, ensuring a state-of-the-art structure designed for strategic public utility.",
    img: "/images/projects/govt-building.jpg"
  },
  {
    id: 7,
    title: "Mudiyani Bridge Structural Safety Consultation & Load Modeling",
    category: "Insights",
    date: "Dec 05, 2025",
    readTime: "4 min read",
    summary: "UrbanBuild finishes static and dynamic load simulations for the Mudiyani Bridge superstructure, matching international structural reliability guidelines.",
    content: "Leveraging finite element analysis models, our bridge engineering division successfully resolved complex pier foundation parameters for the Mudiyani Bridge. This major public works corridor is designed to sustain high traffic volume and extreme meteorological forces, establishing absolute safety benchmarks.",
    img: "/images/projects/bridge-elevation.jpg"
  },
  {
    id: 8,
    title: "Pavement Distress Audit Delivered for Khatima Overlay Survey",
    category: "Visit",
    date: "Jan 12, 2026",
    readTime: "3 min read",
    summary: "Senior engineers visited the Khatima bypass segment to complete ultrasonic pavement thickness tests and inspect overlay design overlays.",
    content: "Using ground-penetrating radar and modern distress index formulas, UrbanBuild's survey team executed a comprehensive road surface diagnostic scan. The resulting rehabilitation blueprint specifies a high-performance asphalt overlay, extending the bypass road's operational lifespan by another 15 years.",
    img: "/images/projects/highway-render.jpg"
  },
  {
    id: 9,
    title: "Haldwani Traffic Management Drone Topography Mapping Completed",
    category: "Event",
    date: "Feb 18, 2026",
    readTime: "4 min read",
    summary: "Collaborative workshop highlights traffic-flow micro-simulation models and drone corridor mapping to eliminate Haldwani gridlocks.",
    content: "UrbanBuild planners gathered municipal administrators and transportation engineers in Haldwani to present drone-mapped corridor models. The resulting junction redesign blueprint integrates signal synchronization algorithms with widened physical turning radius lines, easing daily commuter bottlenecks.",
    img: "/images/projects/junction-plan.jpg"
  },
  {
    id: 10,
    title: "Dhunaghat Road Improvement Geogrid Reinforcement Installation",
    category: "Announcement",
    date: "Mar 02, 2026",
    readTime: "5 min read",
    summary: "Official commencement of landslide prevention geogrid placement and retaining wall engineering along the mountain pass route.",
    content: "To guarantee long-term stability across mountainous terrain, UrbanBuild has begun structural geogrid slope reinforcement and custom masonry retaining wall works along Dhunaghat Road. Our engineering reports outline full environmental compliance and maximum regional safety standards.",
    img: "/images/projects/highway-render.jpg"
  }
];

const categories = ["All", "Event", "Visit", "Announcement", "Insights"];

const NewsEventsPage = () => {
  const [newsArticlesState, setNewsArticles] = useState<any[]>(() => {
    const saved = localStorage.getItem("urbanbuild_news_feed");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasOldData = parsed.some(art => art && art.date && art.date.includes("2024"));
          const hasDifferentCount = parsed.length <= 5;
          if (!hasOldData && !hasDifferentCount) {
            return parsed;
          }
        }
      } catch (e) {
        console.error("Failed to parse news articles", e);
      }
    }
    localStorage.setItem("urbanbuild_news_feed", JSON.stringify(newsArticles));
    return newsArticles;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  // Administrative dynamic reload trigger
  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem("urbanbuild_news_feed");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setNewsArticles(parsed);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
      setNewsArticles(newsArticles);
    };
    window.addEventListener("urbanbuild-news-updated", handleUpdate);
    return () => window.removeEventListener("urbanbuild-news-updated", handleUpdate);
  }, []);

  // Filter list based on search query
  const filteredArticles = (newsArticlesState || []).filter((article) => {
    if (!article) return false;
    const titleText = (article.title || "").toLowerCase();
    const summaryText = (article.summary || "").toLowerCase();
    const queryText = (searchQuery || "").toLowerCase();
    const matchesSearch = titleText.includes(queryText) || summaryText.includes(queryText);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 transition-colors duration-300">
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Simple Page Header */}
        <div className="border-b border-border/60 pb-8 mb-12">
          <h1 className="text-3xl md:text-5xl font-space font-black tracking-tight uppercase mb-4">
            News & Events
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-xl">
            Keep track of latest conclaves, official site visits, company publications, and infrastructural blueprints shaping our community.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0c1631]/[0.02] dark:bg-[#060c1d]/30 border border-border/60 rounded-xl py-2 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted-foreground/50"
            />
          </div>

        </div>

        {/* Stacked single card list layout of news */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div 
              layout
              className="flex flex-col items-center gap-8 w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {filteredArticles.map((article, idx) => {
                const artId = article.id || `news-${idx}`;
                const artTitle = article.title || "News Update";
                const artCategory = article.category || "News";
                const artDate = article.date || "Recent";
                const artReadTime = article.readTime || "2 min read";
                const artSummary = article.summary || artTitle;
                
                return (
                  <motion.div
                    key={artId}
                    layoutId={`card-${artId}`}
                    onClick={() => setActiveArticle(article)}
                    className="group w-full md:w-[90%] mx-auto py-8 border-t border-b border-border/60 transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
                  >
                    <div>
                      {/* Header: Category & Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[8px] font-mono tracking-widest text-accent uppercase bg-accent/10 px-2 py-0.5 rounded font-bold">
                          {artCategory}
                        </span>
                        <div className="flex items-center gap-3 text-[9px] font-mono text-muted-foreground">
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3 text-accent/60" /> {artDate}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-accent/60" /> {artReadTime}
                          </span>
                        </div>
                      </div>

                      {/* Heading */}
                      <h3 className="font-space text-lg md:text-xl lg:text-2xl font-black text-foreground group-hover:text-accent transition-colors duration-300 leading-snug mb-3 uppercase tracking-tight">
                        {artTitle}
                      </h3>

                      {/* Content */}
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light mb-6">
                        {artSummary}
                      </p>
                    </div>

                    {/* Read More button */}
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-wider text-accent uppercase mt-auto pt-2 group-hover:gap-2.5 transition-all">
                      <span>Read Article</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              className="py-20 text-center border border-dashed border-border/60 rounded-2xl bg-[#0c1631]/[0.01] dark:bg-[#060c1d]/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Newspaper className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-xs font-mono text-muted-foreground">
                No matching news articles found.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Elegant, Simplistic Article Detail Drawer Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            {(() => {
              const artId = activeArticle.id || "news-modal";
              const artTitle = activeArticle.title || "News Update";
              const artCategory = activeArticle.category || "News";
              const artDate = activeArticle.date || "Recent";
              const artReadTime = activeArticle.readTime || "2 min read";
              const artSummary = activeArticle.summary || artTitle;
              const artContent = activeArticle.content || artTitle;
              const artImg = activeArticle.img || "/images/projects/highway-render.jpg";
              
              return (
                <motion.div
                  layoutId={`card-${artId}`}
                  className="relative bg-background border border-border/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                >
                  {/* Image Preview Header (Simulated High Resolution Render) */}
                  <div className="h-44 md:h-56 relative bg-secondary overflow-hidden">
                    <img 
                      src={artImg} 
                      alt={artTitle} 
                      className="w-full h-full object-cover opacity-90"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/projects/highway-render.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="absolute top-4 right-4 p-2 rounded-xl bg-background/80 hover:bg-background text-foreground hover:scale-105 border border-border/40 transition-all cursor-pointer"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Text Area */}
                  <div className="p-6 md:p-8 overflow-y-auto max-h-[50vh] custom-scrollbar">
                    
                    {/* Meta details */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[8px] font-mono tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded font-bold uppercase">
                        {artCategory}
                      </span>
                      <div className="flex items-center gap-3 text-[9px] font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-accent/60" /> {artDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent/60" /> {artReadTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-space text-xl md:text-2xl font-black text-foreground mb-4 uppercase tracking-tight leading-snug">
                      {artTitle}
                    </h2>

                    {/* Content Details */}
                    <div className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light space-y-4">
                      <p className="font-medium text-foreground">{artSummary}</p>
                      <p>{artContent}</p>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-border/40 bg-[#0c1631]/[0.02] dark:bg-[#060c1d]/30 flex items-center justify-end">
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="px-4 py-1.5 rounded-lg border border-border/60 hover:bg-accent hover:border-accent hover:text-background text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              );
            })()}

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NewsEventsPage;
