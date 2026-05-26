import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RefreshCw, ExternalLink } from "lucide-react";

const StaffLogin = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] mt-16 bg-background text-foreground flex flex-col relative overflow-hidden">
            {/* Top Minimal Premium Accent Bar */}
            <div className="bg-card border-b border-border/40 px-6 py-2.5 flex items-center justify-between z-10 shrink-0 h-10">
                <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                        Secure Staff Gateway
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="https://urbanbuildmis.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-accent hover:underline uppercase transition-all"
                    >
                        <span>Open Direct</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            {/* Main Interactive Login Iframe Container */}
            <div className="flex-1 w-full relative bg-card/10 overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 z-20 gap-4">
                        <RefreshCw className="w-8 h-8 text-accent animate-spin" />
                        <span className="text-xs font-mono tracking-[0.25em] text-muted-foreground uppercase animate-pulse">
                            Establishing Secure Tunnel...
                        </span>
                    </div>
                )}
                
                <iframe
                    src="https://urbanbuildmis.netlify.app"
                    title="UrbanBuild MIS Portal"
                    className="w-full h-full border-none bg-white dark:bg-[#0c0c0e]"
                    allow="geolocation; microphone; camera; midi; encrypted-media;"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                />
            </div>
        </div>
    );
};

export default StaffLogin;
