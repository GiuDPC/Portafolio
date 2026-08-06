import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const toggleTheme = (e: React.MouseEvent) => {
    const currentTheme = theme === 'system' ? 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme
      
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    setTheme(currentTheme === "light" ? "dark" : "light", pos)
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted dark:border-white/10 dark:bg-white/10 dark:shadow-none dark:hover:bg-white/20"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className={`h-5 w-5 transition-all duration-500 ease-smooth ${isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-500 ease-smooth ${isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
    </motion.button>
  )
}
