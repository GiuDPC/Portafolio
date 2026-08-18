import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, Calendar, Clock, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TechIcon } from "../TechIcon"
import { useTheme } from "../ThemeProvider"
import { useLanguage } from "../../contexts/LanguageContext"

import sentinelLogo from "../../assets/LogoSentinelCoreBlanco.png"
import illustrationTwo from "../../assets/Ilustración2.png"
import graphCoreLogo from "../../assets/graph-core-logo.png"
import screenshotSentinel from "../../assets/screenshot-sentinel.png"
import screenshotGraphCore from "../../assets/screenshot-graphcore.png"
import brincaparkHero from "../../assets/Hero-section.png"
import tasaVerdeLogo from "../../assets/Logo_TasaVerde.png"
import tasaVerdeScreenshot from "../../assets/TasaVerde_Pantallas.png"

interface TechBadge {
  id: string
  name: string
}

interface ArticleSection {
  id: string
  title: string
  content: React.ReactNode
}

interface Project {
  id: string
  title: string
  subtitle: string
  date: string
  image: string
  logo: string
  themeColor: string
  rgb: string
  tech: TechBadge[]
  github: string
  demo?: string
  sections: ArticleSection[]
}

const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as any).props.children);
  }
  return '';
};

const calculateReadTime = (project: Project, t: any): string => {
  const text = project.subtitle + ' ' + project.sections.map(s => s.title + ' ' + extractText(s.content)).join(' ');
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} ${t.projects.readTime}`;
};

const getProjects = (t: any): Project[] => [
  {
    id: "brincapark",
    title: "Brincapark",
    subtitle: t.projects.items.brincapark.subtitle,
    date: t.language === 'en' ? "DEC 2025" : "DIC 2025",
    image: brincaparkHero,
    logo: "https://raw.githubusercontent.com/GiuDPC/brincapark-reservation-system/main/frontend/assets/img/Logo.png",
    themeColor: "rgb(56, 189, 248)",
    rgb: "56, 189, 248",
    tech: [
      { id: "typescript", name: "TypeScript" },
      { id: "nodejs", name: "Node.js" },
      { id: "express", name: "Express" },
      { id: "mongodb", name: "MongoDB" },
      { id: "vercel", name: "Vercel" }
    ],
    github: "https://github.com/GiuDPC/brincapark-reservation-system",
    demo: "https://brincapark-reservation-system.vercel.app/",
    sections: [
      {
        id: "problema",
        title: t.projects.items.brincapark.sections.s1Title,
        content: (
          <>
            <p>{t.projects.items.brincapark.sections.s1P1}</p>
            <p>{t.projects.items.brincapark.sections.s1P2}</p>
          </>
        )
      },
      {
        id: "solucion",
        title: t.projects.items.brincapark.sections.s2Title,
        content: (
          <>
            <p>{t.projects.items.brincapark.sections.s2P1}</p>
            <ul>
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.brincapark.sections.s2L1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.brincapark.sections.s2L2 }} />
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.brincapark.sections.s2L3 }} />
            </ul>
          </>
        )
      },
      {
        id: "tecnologia",
        title: t.projects.items.brincapark.sections.s3Title,
        content: (
          <>
            <p>{t.projects.items.brincapark.sections.s3P1}</p>
            <p>{t.projects.items.brincapark.sections.s3P2}</p>
          </>
        )
      }
    ]
  },
  {
    id: "graph-core",
    title: "GraphCore",
    subtitle: t.projects.items.graphCore.subtitle,
    date: t.language === 'en' ? "Jul 2026" : "Jul 2026",
    image: screenshotGraphCore,
    logo: graphCoreLogo,
    themeColor: "rgba(16, 185, 129, 1)",
    rgb: "16, 185, 129",
    tech: [
      { id: "c++", name: "C++17" },
      { id: "linux", name: "OpenGL" },
      { id: "bash", name: "CMake" }
    ],
    github: "https://github.com/GiuDPC/graph-core",
    sections: [
      {
        id: "contexto",
        title: t.projects.items.graphCore.sections.s1Title,
        content: (
          <>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.graphCore.sections.s1P1 }} />
          </>
        )
      },
      {
        id: "propuesta",
        title: t.projects.items.graphCore.sections.s2Title,
        content: (
          <>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.graphCore.sections.s2P1 }} />
            <p>{t.projects.items.graphCore.sections.s2P2}</p>
            <ul>
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.graphCore.sections.s2L1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.graphCore.sections.s2L2 }} />
            </ul>
          </>
        )
      },
      {
        id: "tecnologia",
        title: t.projects.items.graphCore.sections.s3Title,
        content: (
          <>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.graphCore.sections.s3P1 }} />
            <p>{t.projects.items.graphCore.sections.s3P2}</p>
          </>
        )
      }
    ]
  },
  {
    id: "sentinel-core",
    title: "Sentinel Core",
    subtitle: t.projects.items.sentinelCore.subtitle,
    date: t.language === 'en' ? "Jun 2026" : "Jun 2026",
    image: screenshotSentinel,
    logo: sentinelLogo,
    themeColor: "rgba(59, 130, 246, 1)",
    rgb: "59, 130, 246",
    tech: [
      { id: "react", name: "React 19" },
      { id: "typescript", name: "TypeScript" },
      { id: "nodejs", name: "Node.js" },
      { id: "postgresql", name: "PostgreSQL" },
      { id: "tailwindcss", name: "Tailwind CSS" }
    ],
    github: "https://github.com/GiuDPC/sentinel-core",
    demo: "https://sentinel-core.vercel.app/",
    sections: [
      {
        id: "introduccion",
        title: t.projects.items.sentinelCore.sections.s1Title,
        content: (
          <>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.sentinelCore.sections.s1P1 }} />
            <p>{t.projects.items.sentinelCore.sections.s1P2}</p>
          </>
        )
      },
      {
        id: "solucion",
        title: t.projects.items.sentinelCore.sections.s2Title,
        content: (
          <>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.sentinelCore.sections.s2P1 }} />
            <ul>
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.sentinelCore.sections.s2L1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.sentinelCore.sections.s2L2 }} />
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.sentinelCore.sections.s2L3 }} />
            </ul>
          </>
        )
      },
      {
        id: "arquitectura",
        title: t.projects.items.sentinelCore.sections.s3Title,
        content: (
          <>
            <p>{t.projects.items.sentinelCore.sections.s3P1}</p>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.sentinelCore.sections.s3P2 }} />
          </>
        )
      }
    ]
  },
  {
    id: "tasaverde",
    title: "TasaVerde",
    subtitle: t.projects.items.tasaVerde.subtitle,
    date: t.language === 'en' ? "Aug 2026" : "Ago 2026",
    image: tasaVerdeScreenshot,
    logo: tasaVerdeLogo,
    themeColor: "rgb(4, 255, 242)",
    rgb: "0, 255, 242",
    tech: [
      { id: "react", name: "React Native" },
      { id: "typescript", name: "TypeScript" },
      { id: "nodejs", name: "Node.js" },
      { id: "express", name: "Express" }
    ],
    github: "https://github.com/GiuDPC/TasaVerde-app.git",
    sections: [
      {
        id: "problema",
        title: t.projects.items.tasaVerde.sections.s1Title,
        content: (
          <>
            <p>{t.projects.items.tasaVerde.sections.s1P1}</p>
            <p>{t.projects.items.tasaVerde.sections.s1P2}</p>
          </>
        )
      },
      {
        id: "solucion",
        title: t.projects.items.tasaVerde.sections.s2Title,
        content: (
          <>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.tasaVerde.sections.s2P1 }} />
            <ul>
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.tasaVerde.sections.s2L1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.tasaVerde.sections.s2L2 }} />
              <li dangerouslySetInnerHTML={{ __html: t.projects.items.tasaVerde.sections.s2L3 }} />
            </ul>
          </>
        )
      },
      {
        id: "tecnologia",
        title: t.projects.items.tasaVerde.sections.s3Title,
        content: (
          <>
            <p dangerouslySetInnerHTML={{ __html: t.projects.items.tasaVerde.sections.s3P1 }} />
            <p>{t.projects.items.tasaVerde.sections.s3P2}</p>
          </>
        )
      }
    ]
  }
]

/* ──── Project Card ──── */
function ProjectCard({ project, onClick, t }: { project: Project; onClick: () => void; t: any }) {
  const { resolvedTheme } = useTheme()
  const isLightMode = resolvedTheme === "light"
  const logoSrc = project.id === "sentinel-core" && isLightMode ? illustrationTwo : project.logo

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group cursor-pointer relative z-10"
    >
      <div className="relative rounded-2xl overflow-hidden transition-transform duration-500 ease-smooth hover:-translate-y-1.5">
        {/* Outer ambient glow on hover */}
        <div 
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl"
          style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(${project.rgb}, ${isLightMode ? 0.12 : 0.25}) 0%, transparent 70%)` }}
        />

        <div className="card-elevated relative overflow-hidden flex flex-col md:flex-row group-hover:shadow-[var(--card-shadow-hover)]">
          
          {/* Image — full bleed */}
          <div className="relative md:w-[44%] overflow-hidden bg-muted/30 dark:bg-black/20">
            {/* Glow behind image */}
            <div 
              className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, rgba(${project.rgb}, ${isLightMode ? 0.3 : 0.6}) 0%, transparent 70%)` }}
            />
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              width={600}
              height={338}
              decoding="async"
              className="w-full h-full object-cover aspect-video md:aspect-auto md:min-h-[200px] relative z-10 transition-transform duration-700 ease-smooth will-change-transform group-hover:scale-[1.03]"
            />
            {/* Edge blending */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[hsl(225,20%,9%)] to-transparent z-20 md:hidden pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[hsl(225,20%,9%)] to-transparent z-20 hidden md:block pointer-events-none" />
          </div>

          {/* Content */}
          <div className="flex-1 p-5 md:p-7 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 font-medium tracking-wide uppercase">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.date}</span>
              <span className="opacity-25">•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {calculateReadTime(project, t)}</span>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={logoSrc} 
                alt="" 
                width={28}
                height={28}
                decoding="async"
                className="w-7 h-7 object-contain"
                style={{ filter: `drop-shadow(0 0 6px rgba(${project.rgb}, 0.35))` }}
              />
              <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                {project.title}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-1">
              {project.subtitle}
            </p>

            {/* Subtle CTA */}
            <div className="mt-4 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0" style={{ color: project.themeColor }}>
              <span>{t.projects.viewProject}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ──── Scroll-spy: tracks which section is in view inside a scroll container ──── */
function useScrollSpy(containerRef: React.RefObject<HTMLDivElement | null>, sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "")

  useEffect(() => {
    const container = containerRef.current
    if (!container || sectionIds.length === 0) return

    let ticking = false

    const update = () => {
      const containerTop = container.getBoundingClientRect().top
      // The "trigger line" is 120px below the top of the container
      const offset = 120
      
      let current = sectionIds[0]
      
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        // Distance from the section to the top of the visible container area
        const distFromTop = el.getBoundingClientRect().top - containerTop
        // If the section has scrolled above the trigger line, it's the current one
        if (distFromTop <= offset) {
          current = id
        }
      }

      // Check if we reached the absolute bottom of the scroll container
      // This fixes the bug where the last section is too short to reach the trigger line
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5
      if (isAtBottom && sectionIds.length > 0) {
        current = sectionIds[sectionIds.length - 1]
      }
      
      setActiveId(current)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    // Run once on mount
    update()

    container.addEventListener("scroll", onScroll, { passive: true })
    return () => container.removeEventListener("scroll", onScroll)
  }, [containerRef, sectionIds])

  return activeId
}

/* ──── Fullscreen Article View ──── */
function ArticleView({ project, onClose, t }: { project: Project; onClose: () => void; t: any }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const isLightMode = resolvedTheme === "light"
  const logoSrc = project.id === "sentinel-core" && isLightMode ? illustrationTwo : project.logo

  const sectionIds = project.sections.map(s => s.id)
  const activeSection = useScrollSpy(contentRef, sectionIds)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => { 
      document.body.style.overflow = '' 
    }
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el && contentRef.current) {
      const containerTop = contentRef.current.getBoundingClientRect().top
      const elementTop = el.getBoundingClientRect().top
      const scrollTop = contentRef.current.scrollTop
      contentRef.current.scrollTo({
        top: scrollTop + elementTop - containerTop - 80,
        behavior: "smooth"
      })
    }
  }, [])

  const bgColor = isDark ? 'hsl(225, 20%, 7%)' : 'hsl(220, 20%, 97%)'

  const modalContent = (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
      {/* Ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-[0.06] dark:opacity-[0.12] blur-[100px] pointer-events-none rounded-full"
        style={{ background: `rgba(${project.rgb}, 1)` }}
      />

      <div className="w-full max-w-7xl mx-auto flex-1 overflow-hidden flex flex-col relative h-full z-10">
        
        {/* Top bar */}
        <div 
          className="h-14 flex items-center px-4 md:px-6 shrink-0 z-20 backdrop-blur-2xl border-b border-border/30 dark:border-white/5"
          style={{ backgroundColor: isDark ? 'hsla(225,20%,7%,0.85)' : 'hsla(220,20%,97%,0.85)' }}
        >
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-card dark:bg-white/5 hover:bg-secondary dark:hover:bg-white/10 rounded-xl transition-all duration-200 border border-border dark:border-white/5 outline-none shadow-sm dark:shadow-none"
          >
            <ChevronLeft className="w-4 h-4" /> {t.projects.back}
          </button>
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 lg:px-12 pb-32">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14 pt-8">
            
            {/* Main content */}
            <div className="lg:w-[68%] relative">
              {/* Hero image — clean, full width */}
              <div className="relative w-full rounded-xl mb-10 overflow-hidden">
                <div 
                  className="absolute -inset-6 opacity-15 dark:opacity-25 blur-3xl pointer-events-none -z-10"
                  style={{ background: `rgba(${project.rgb}, 0.5)` }}
                />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  width={800}
                  height={450}
                  decoding="async"
                  className="w-full h-auto object-cover rounded-xl relative z-10 shadow-lg dark:shadow-2xl dark:shadow-black/30" 
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground mb-5 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {project.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {calculateReadTime(project, t)}</span>
              </div>

              {/* Title with logo */}
              <div className="flex items-center gap-4 md:gap-5 mb-3">
                <img 
                  src={logoSrc} 
                  alt="Logo" 
                  width={48}
                  height={48}
                  decoding="async"
                  className="w-11 h-11 md:w-12 md:h-12 object-contain"
                  style={{ filter: `drop-shadow(0 0 10px rgba(${project.rgb}, 0.35))` }}
                />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                  {project.title}
                </h1>
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground italic mb-5">
                "{project.subtitle}"
              </p>

              {/* Stats & links */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end text-xs font-medium text-muted-foreground mb-8 pb-5 border-b border-border dark:border-white/10 gap-4">
                
                <div className="flex items-center gap-2.5">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 text-foreground bg-card dark:bg-white/5 hover:bg-secondary dark:hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 outline-none hover:-translate-y-0.5 border border-border dark:border-white/10 shadow-sm dark:shadow-none"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {t.projects.code}
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-1.5 text-white px-4 py-2 rounded-lg transition-all duration-200 outline-none hover:-translate-y-0.5"
                      style={{ backgroundColor: project.themeColor, boxShadow: `0 4px 16px rgba(${project.rgb}, 0.35)` }}
                    >
                      <ExternalLink className="w-4 h-4" /> {t.projects.demo}
                    </a>
                  )}
                </div>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2.5 mb-10">
                {project.tech.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 px-3.5 py-2 bg-card dark:bg-white/[0.04] border border-border dark:border-white/[0.06] rounded-lg transition-colors duration-200 hover:bg-secondary dark:hover:bg-white/[0.08] shadow-sm dark:shadow-none">
                    <div className="w-5 h-5 shrink-0">
                      <TechIcon name={t.id} className="w-full h-full" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{t.name}</span>
                  </div>
                ))}
              </div>

              {/* Article sections */}
              <div className="prose prose-neutral dark:prose-invert prose-base md:prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-img:rounded-xl">
                {project.sections.map((section) => (
                  <div key={section.id} id={section.id} data-section-id={section.id} className="scroll-mt-20 mb-12">
                    <h2 className="text-xl md:text-2xl mb-5 flex items-center gap-3 not-prose">
                      <span className="w-1 h-6 rounded-full shrink-0" style={{ backgroundColor: project.themeColor }} />
                      <span className="text-foreground font-bold">{section.title}</span>
                    </h2>
                    {section.content}
                  </div>
                ))}
              </div>
            </div>

            {/* TOC sidebar — desktop */}
            <div className="hidden lg:block lg:w-[32%] relative">
              <div className="sticky top-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-4 ml-4">
                  {t.projects.toc}
                </h4>
                <nav className="flex flex-col gap-1 relative">
                  {project.sections.map((section) => {
                    const isActive = activeSection === section.id
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left text-[13px] transition-all duration-200 relative px-4 py-2.5 outline-none rounded-lg flex items-center ${
                          isActive 
                            ? "text-foreground font-semibold" 
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 dark:hover:bg-white/5"
                        }`}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="tocActive" 
                            className="absolute inset-0 rounded-lg"
                            style={{ 
                              backgroundColor: `rgba(${project.rgb}, 0.12)`,
                              border: `1px solid rgba(${project.rgb}, 0.2)`
                            }}
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10">{section.title}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile TOC — floating bottom */}
        <div 
          className="lg:hidden fixed bottom-0 left-0 right-0 z-[10000] backdrop-blur-2xl border-t border-border/30 dark:border-white/10 px-3 py-2.5"
          style={{ backgroundColor: isDark ? 'hsla(225,20%,7%,0.92)' : 'hsla(220,20%,97%,0.92)' }}
        >
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {project.sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`whitespace-nowrap text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 shrink-0 outline-none ${
                    isActive 
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground"
                  }`}
                  style={isActive ? { 
                    backgroundColor: `rgba(${project.rgb}, 0.12)`,
                    border: `1px solid rgba(${project.rgb}, 0.2)`
                  } : { border: '1px solid transparent' }}
                >
                  {section.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (!mounted) return null
  return createPortal(modalContent, document.body)
}

/* ──── Main Component ──── */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const { t } = useLanguage()
  const projectsList = useMemo(() => getProjects(t), [t])

  return (
    <>
      <section id="projects" className="flex flex-col items-center space-y-10 relative z-10 pt-8">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="section-title"
        >
          {t.projects.title}
        </motion.h2>

        <div className="w-full max-w-4xl space-y-5">
          {projectsList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
              t={t}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ArticleView
            project={selected}
            onClose={() => setSelected(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  )
}
