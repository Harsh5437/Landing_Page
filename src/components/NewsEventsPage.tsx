import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, Search, Filter, Newspaper, ArrowRight, X } from "lucide-react";
import newsFeedData from "../data/newsFeed.json";

// Dynamic news feed database
const newsArticles = newsFeedData;

const categories = ["All", "Event", "Visit", "Announcement", "Insights"];

const NewsEventsPage = () => {
  const ensureUrrdaFirst = (list: any[]) => {
    if (!Array.isArray(list)) return list;
    const urrdaIndex = list.findIndex(item => item && item.title === "URRDA Empanelment");
    if (urrdaIndex > 0) {
      const urrdaItem = list[urrdaIndex];
      const newList = [...list];
      newList.splice(urrdaIndex, 1);
      newList.unshift(urrdaItem);
      return newList;
    }
    return list;
  };

  const [newsArticlesState, setNewsArticles] = useState<any[]>(() => {
    const saved = localStorage.getItem("urbanbuild_news_feed");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasOldData = parsed.some(art => art && art.date && art.date.includes("2024"));
          const hasDifferentCount = parsed.length !== newsArticles.length;
          const hasUrrda = parsed.some(art => art && art.title === "URRDA Empanelment");
          if (!hasOldData && !hasDifferentCount && hasUrrda) {
            return ensureUrrdaFirst(parsed);
          }
        }
      } catch (e) {
        console.error("Failed to parse news articles", e);
      }
    }
    const initialArticles = ensureUrrdaFirst(newsArticles);
    localStorage.setItem("urbanbuild_news_feed", JSON.stringify(initialArticles));
    return initialArticles;
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
            setNewsArticles(ensureUrrdaFirst(parsed));
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
      setNewsArticles(ensureUrrdaFirst(newsArticles));
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
    <div className="min-h-screen bg-background text-foreground pt-32 pb-16 transition-colors duration-300">
      
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
                const isHighlighted = artTitle === "URRDA Empanelment";
                
                return (
                  <motion.div
                    key={artId}
                    layoutId={`card-${artId}`}
                    onClick={() => setActiveArticle(article)}
                    className={`group w-full md:w-[90%] mx-auto py-8 transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                      isHighlighted 
                        ? "border-2 border-accent/60 bg-accent/[0.03] px-6 md:px-8 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:border-accent hover:shadow-[0_0_25px_rgba(212,175,55,0.18)] my-4" 
                        : "border-t border-b border-border/60 hover:bg-[#0c1631]/[0.01] dark:hover:bg-[#060c1d]/10"
                    }`}
                  >
                    <div>
                      {/* Header: Category & Date */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono tracking-widest text-accent uppercase bg-accent/10 px-2 py-0.5 rounded font-bold">
                            {artCategory}
                          </span>
                          {isHighlighted && (
                            <span className="text-[7.5px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-1.5 py-0.5 rounded font-extrabold animate-pulse">
                              ⭐ Highlighted Milestone
                            </span>
                          )}
                        </div>
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
              
              return (
                <motion.div
                  layoutId={`card-${artId}`}
                  className="relative bg-background border border-border/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col pt-12"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-background/80 hover:bg-background text-foreground hover:scale-105 border border-border/40 transition-all cursor-pointer z-20"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Text Area */}
                  <div className="p-6 md:p-8 overflow-y-auto max-h-[65vh] custom-scrollbar">
                    
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
