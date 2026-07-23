import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (e: React.MouseEvent) => {
    // Determine the new theme. If system, evaluate it.
    const currentTheme = theme === 'system' ? 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme
      
    setTheme(currentTheme === "light" ? "dark" : "light", e)
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/10 backdrop-blur-md text-foreground transition-all hover:bg-black/20 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
