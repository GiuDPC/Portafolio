import { ThemeToggle } from "./ThemeToggle"
import { useState, useEffect, useMemo } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useActiveSection } from "../hooks/useActiveSection"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (window.scrollY > 40) {
        setMobileOpen(false)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#tech", label: "Tecnologías", id: "tech" },
    { href: "#projects", label: "Proyectos", id: "projects" },
    { href: "#education", label: "Educación", id: "education" },
  ]

  const sectionIds = useMemo(() => links.map(l => l.id), [])
  const activeSection = useActiveSection(sectionIds)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' } as React.CSSProperties}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "top-3 mx-4 md:mx-auto md:max-w-3xl rounded-2xl bg-background/70 backdrop-blur-3xl border border-border/30 shadow-2xl shadow-black/20 dark:shadow-black/50 px-5 py-2.5"
          : "top-0 bg-transparent px-6 py-4"
      }`}
    >
      <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "" : "max-w-5xl mx-auto"}`}>
        <a
          href="#"
          className={`font-bold tracking-tight text-foreground hover:opacity-80 transition-all duration-300 ${
            scrolled ? "text-base" : "text-lg"
          }`}
        >
          Giuseppe Poliandri
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium relative">
          {links.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navActiveIndicator"
                    className="absolute inset-0 bg-secondary/80 dark:bg-white/10 rounded-xl border border-border/50 dark:border-white/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 pb-3 border-t border-border/10 pt-3 mt-3">
              {links.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-foreground bg-secondary/80 dark:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
