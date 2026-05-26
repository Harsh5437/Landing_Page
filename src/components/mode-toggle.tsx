import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <motion.button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
            <span className="sr-only">Toggle theme</span>
        </motion.button>
    )
}
