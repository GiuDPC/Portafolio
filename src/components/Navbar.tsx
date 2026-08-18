import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useActiveSection } from "../hooks/useActiveSection"
import { useLanguage } from "../contexts/LanguageContext"
import logoSrc from "../assets/GiuDPC-Logo.png"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#tech", label: t.navbar.tech, id: "tech" },
    { href: "#projects", label: t.navbar.projects, id: "projects" },
    { href: "#education", label: t.navbar.education, id: "education" },
  ]

  const sectionIds = useMemo(() => ["tech", "projects", "education"], [])
  const activeSection = useActiveSection(sectionIds)

  const handleMobileNav = useCallback((sectionId: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.getElementById(sectionId)
      if (el) {
        const navHeight = 80
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: "smooth" })
      }
    }, 50)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-smooth ${
        scrolled
          ? "top-3 mx-4 md:mx-auto md:max-w-3xl rounded-2xl navbar-glass px-5 py-2.5"
          : "top-0 bg-transparent px-6 py-4"
      }`}
    >
      <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "" : "max-w-5xl mx-auto"}`}>
        <a
          href="#"
          className="group flex items-center gap-2.5 hover:opacity-90 transition-all duration-300"
          aria-label="Go to top"
        >
          <img
            src={logoSrc}
            alt="GiuDPC Logo"
            width={36}
            height={36}
            decoding="async"
            className={`transition-all duration-500 ease-out dark:brightness-[1.6] dark:contrast-[1.1] ${
              scrolled ? "w-7 h-7" : "w-9 h-9"
            }`}
            draggable={false}
          />
          <span
            className={`font-bold tracking-tight text-foreground transition-all duration-500 ease-smooth ${
              scrolled ? "text-sm opacity-0 w-0 overflow-hidden" : "text-base opacity-100"
            }`}
          >
            Giuseppe Poliandri
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium relative">
          {links.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl transition-colors duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navActiveIndicator"
                    className="absolute inset-0 bg-black/[0.05] dark:bg-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 pb-3 border-t border-border/20 pt-3 mt-3">
              {links.map((link, i) => {
                const isActive = activeSection === link.id
                return (
                  <motion.button
                    key={link.id}
                    type="button"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleMobileNav(link.id)}
                    className={`text-left text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-foreground bg-black/[0.05] dark:bg-white/10"
                        : "text-muted-foreground active:bg-muted/40"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

