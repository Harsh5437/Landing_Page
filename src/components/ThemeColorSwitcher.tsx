import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Check } from "lucide-react";

interface ColorPreset {
    id: string;
    label: string;
    hex: string;
    accentHsl: string;
    foregroundHsl: string;
    secondaryHsl: string;
    secondaryForegroundHsl: string;
}

const colorPresets: ColorPreset[] = [
    {
        id: "gold",
        label: "Luxury Gold",
        hex: "#D4AF37",
        accentHsl: "45 93% 47%",
        foregroundHsl: "222 47% 11%",
        secondaryHsl: "210 90% 50%",
        secondaryForegroundHsl: "0 0% 100%",
    },
    {
        id: "blue",
        label: "Steel Blue",
        hex: "#1A7EFF",
        accentHsl: "210 90% 50%",
        foregroundHsl: "0 0% 100%",
        secondaryHsl: "210 30% 94%",
        secondaryForegroundHsl: "210 80% 12%",
    },
    {
        id: "green",
        label: "Emerald Green",
        hex: "#14A050",
        accentHsl: "145 80% 40%",
        foregroundHsl: "0 0% 100%",
        secondaryHsl: "145 20% 94%",
        secondaryForegroundHsl: "145 80% 12%",
    },
    {
        id: "red",
        label: "Rust Iron Red",
        hex: "#DC3C28",
        accentHsl: "12 80% 48%",
        foregroundHsl: "0 0% 100%",
        secondaryHsl: "12 20% 94%",
        secondaryForegroundHsl: "12 80% 12%",
    },
    {
        id: "slate",
        label: "Monochrome Slate",
        hex: "#646E78",
        accentHsl: "220 10% 45%",
        foregroundHsl: "0 0% 100%",
        secondaryHsl: "220 10% 92%",
        secondaryForegroundHsl: "220 15% 12%",
    },
];

export function ThemeColorSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState("gold");

    // Load active preset on mount
    useEffect(() => {
        const savedColorId = localStorage.getItem("urbanbuild-theme-color-id");
        if (savedColorId) {
            const preset = colorPresets.find((p) => p.id === savedColorId);
            if (preset) {
                setSelectedColor(preset.id);
                applyThemeColor(preset);
            }
        } else {
            // Apply default Luxury Gold HSL values if no preference is saved yet
            const defaultPreset = colorPresets.find((p) => p.id === "gold");
            if (defaultPreset) {
                applyThemeColor(defaultPreset);
            }
        }
    }, []);

    const applyThemeColor = (preset: ColorPreset) => {
        document.documentElement.style.setProperty("--accent", preset.accentHsl);
        document.documentElement.style.setProperty("--ring", preset.accentHsl);
        document.documentElement.style.setProperty("--accent-foreground", preset.foregroundHsl);
        document.documentElement.style.setProperty("--secondary", preset.secondaryHsl);
        document.documentElement.style.setProperty("--secondary-foreground", preset.secondaryForegroundHsl);
        localStorage.setItem("urbanbuild-theme-color-id", preset.id);
    };

    const handleSelect = (preset: ColorPreset) => {
        setSelectedColor(preset.id);
        applyThemeColor(preset);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
            {/* Expanded Palette Tray */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex items-center gap-2.5 bg-white/90 dark:bg-[#0c0c0e]/95 backdrop-blur-xl border border-border/40 dark:border-accent/15 py-2 px-3.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                    >
                        <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase mr-1 select-none">
                            Accent:
                        </span>
                        {colorPresets.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => handleSelect(preset)}
                                className="relative h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
                                style={{ backgroundColor: preset.hex }}
                                title={preset.label}
                            >
                                {selectedColor === preset.id && (
                                    <motion.div
                                        layoutId="activeColorCheck"
                                        className="text-white dark:text-[#0c0c0e]"
                                    >
                                        <Check className="h-3 w-3 stroke-[3]" />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Core Floating Switcher Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 rounded-full bg-card hover:bg-accent border border-border/50 dark:border-accent/20 hover:border-accent flex items-center justify-center text-accent hover:text-background shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_var(--accent)/25] transition-all duration-300 group focus:outline-none"
                title="Customize Theme Color Accent"
            >
                <Paintbrush className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </button>
        </div>
    );
}
