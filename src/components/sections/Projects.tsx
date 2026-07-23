import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, Calendar, Clock, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import StackIcon from "tech-stack-icons"
import { useTheme } from "../ThemeProvider"

import sentinelLogo from "../../assets/LogoSentinelCoreBlanco.png"
import illustrationTwo from "../../assets/Ilustración2.png"
import graphCoreLogo from "../../assets/graph-core-logo.png"
import screenshotSentinel from "../../assets/screenshot-sentinel.png"
import screenshotGraphCore from "../../assets/screenshot-graphcore.png"

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
  readTime: string
  views: string
  comments: string
  image: string
  logo: string
  themeColor: string
  rgb: string
  tech: TechBadge[]
  github: string
  demo?: string
  sections: ArticleSection[]
}

const projects: Project[] = [
  {
    id: "brincapark",
    title: "Brincapark",
    subtitle: "Sistema integral de gestión de reservas para parques de diversiones",
    date: "Ago 2025",
    readTime: "6 min lectura",
    views: "2.8k vistas",
    comments: "89 comentarios",
    image: "https://raw.githubusercontent.com/GiuDPC/brincapark-reservation-system/main/docs/screenshots/Hero-section.png",
    logo: "https://raw.githubusercontent.com/GiuDPC/brincapark-reservation-system/main/frontend/assets/img/Logo.png",
    themeColor: "rgb(55, 14, 236)",
    rgb: "99, 102, 241",
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
        title: "El Problema de Gestión",
        content: (
          <>
            <p>
              Brincapark partió de la necesidad de digitalizar los procesos manuales de un parque de atracciones, donde las reservas, los ingresos y la operación diaria dependían de múltiples pasos y registros dispersos.
            </p>
            <p>
              El resultado era una alta probabilidad de errores operativos, duplicidad de reservas y una visibilidad limitada para la toma de decisiones del equipo administrativo.
            </p>
          </>
        )
      },
      {
        id: "solucion",
        title: "La Solución: Reservas y Operación Centralizada",
        content: (
          <>
            <p>
              Desarrollé una plataforma full stack que permite a los usuarios reservar tickets y paquetes de fiestas de forma sencilla, mientras que los administradores pueden gestionar reservas, visualizar métricas en tiempo real y controlar la operación desde un panel integral.
            </p>
            <ul>
              <li><strong>Reservas públicas:</strong> flujo claro para compra y confirmación de entradas.</li>
              <li><strong>Dashboard administrativo:</strong> métricas, gráficos y control de reservas desde un único lugar.</li>
              <li><strong>Gestión multi-parque:</strong> soporte para diferentes sedes y configuraciones operativas.</li>
            </ul>
          </>
        )
      },
      {
        id: "tecnologia",
        title: "Arquitectura y Stack",
        content: (
          <>
            <p>
              El proyecto fue construido con una arquitectura full stack moderna, separando frontend y backend para facilitar mantenimiento, despliegue y escalabilidad.
            </p>
            <p>
              El frontend se despliega en Vercel, el backend en Render y la base de datos se gestiona con MongoDB Atlas, ofreciendo una solución completa y lista para producción.
            </p>
          </>
        )
      }
    ]
  },
  {
    id: "graph-core",
    title: "GraphCore",
    subtitle: "Entorno Virtual de Aprendizaje Interactivo para Teoría de Grafos",
    date: "Jul 2026",
    readTime: "5 min lectura",
    views: "3.4k vistas",
    comments: "156 comentarios",
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
        title: "Contexto Educativo",
        content: (
          <>
            <p>
              Dentro de la Ingeniería de Sistemas, la <strong>Teoría de Grafos</strong> representa una de las áreas fundamentales de la Matemática Discreta, con aplicaciones críticas en telecomunicaciones, diseño de algoritmos e inteligencia artificial. Sin embargo, su aprendizaje presenta dificultades notables debido al alto nivel de abstracción requerido para comprender estructuras topológicas y rutinas matemáticas complejas.
            </p>
          </>
        )
      },
      {
        id: "propuesta",
        title: "El Entorno Virtual: GraphCore",
        content: (
          <>
            <p>
              Para superar esta barrera académica, desarrollé <strong>GraphCore</strong>, un Entorno Virtual de Aprendizaje (EVA) diseñado como un laboratorio interactivo. Esta herramienta permite a los estudiantes de ingeniería interactuar directamente con representaciones gráficas, simulaciones dinámicas y experimentación práctica.
            </p>
            <p>El sistema se divide en dos módulos de aprendizaje fundamentales:</p>
            <ul>
              <li><strong>Laboratorio Matemático Libre:</strong> Un espacio interactivo destinado a la creación y edición de grafos, facilitando la exploración visual de sus propiedades (ciclos, componentes conexas, caminos).</li>
              <li><strong>Simulación de Redes de Transporte:</strong> Un entorno donde se analiza visualmente el comportamiento de distintos algoritmos clásicos operando sobre estructuras de conexión en tiempo real.</li>
            </ul>
          </>
        )
      },
      {
        id: "tecnologia",
        title: "Tecnología de Alto Rendimiento",
        content: (
          <>
            <p>
              A diferencia de las herramientas educativas basadas en tecnologías web tradicionales, GraphCore fue construido desde cero utilizando <strong>C++17</strong> moderno y <strong>OpenGL</strong>. 
            </p>
            <p>
              Esta decisión arquitectónica de utilizar renderizado acelerado por hardware garantiza que el entorno gráfico pueda manejar simulaciones masivas (como distribuciones orgánicas basadas en algoritmos de atracción/repulsión) a 60 cuadros por segundo sin interrupciones, ofreciendo una retroalimentación visual inmediata y fluida durante el proceso de aprendizaje.
            </p>
          </>
        )
      }
    ]
  },
  {
    id: "sentinel-core",
    title: "Sentinel Core",
    subtitle: "Sistema de Gestión de Incidencias y Monitoreo de ANS (SLA)",
    date: "Jun 2026",
    readTime: "4 min lectura",
    views: "1.2k vistas",
    comments: "42 comentarios",
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
        title: "El Problema Operativo",
        content: (
          <>
            <p>
              En infraestructuras comerciales de gran escala, como el <strong>Centro Comercial Sambil Paraguaná</strong>, la gestión operativa suele verse fragmentada por la dependencia de canales de comunicación informales (como WhatsApp) y registros manuales en papel.
            </p>
            <p>
              Esta desconexión genera "silos de información" donde se pierde por completo la trazabilidad de las tareas. Sin un registro auditable, resulta técnicamente inviable monitorear el desempeño operativo, medir tiempos de respuesta o garantizar la correcta asignación de técnicos a las fallas reportadas.
            </p>
          </>
        )
      },
      {
        id: "solucion",
        title: "La Solución: Sentinel Core",
        content: (
          <>
            <p>
              Para resolver esta problemática, diseñé y desarrollé <strong>Sentinel Core</strong>: un sistema centralizado de gestión de incidencias que sustituye la informalidad por un flujo de trabajo estructurado y completamente auditable.
            </p>
            <ul>
              <li><strong>Trazabilidad Absoluta:</strong> Cada incidencia reportada genera un ticket único, registrando de manera objetiva quién, cómo y cuándo se resolvió el problema.</li>
              <li><strong>Monitoreo de ANS (Acuerdos de Nivel de Servicio):</strong> El sistema estructura parámetros lógicos para medir y evaluar los tiempos de atención, garantizando que se cumplan los estándares operativos del centro comercial.</li>
              <li><strong>Dashboard Gerencial:</strong> Una interfaz analítica en tiempo real que visibiliza la carga de trabajo, tickets abiertos y métricas de desempeño, facilitando la toma de decisiones informadas.</li>
            </ul>
          </>
        )
      },
      {
        id: "arquitectura",
        title: "Arquitectura y Desarrollo",
        content: (
          <>
            <p>
              Sentinel Core está construido sobre una arquitectura moderna que prioriza la automatización y la persistencia segura de la información.
            </p>
            <p>
              El frontend, desarrollado con <strong>React</strong> y estandarizado visualmente con <strong>Tailwind CSS</strong>, ofrece una experiencia de usuario fluida e intuitiva tanto para el personal técnico como administrativo. En el backend, la lógica de negocio y la API están fuertemente tipadas con <strong>TypeScript</strong> y conectadas a una base de datos relacional <strong>PostgreSQL</strong>, asegurando la integridad referencial y la rápida consulta de datos históricos para auditorías.
            </p>
          </>
        )
      }
    ]
  }
]

/* ──── Project Card ──── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { resolvedTheme } = useTheme()
  const isLightMode = resolvedTheme === "light"
  const logoSrc = project.id === "sentinel-core" && isLightMode ? illustrationTwo : project.logo

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group cursor-pointer relative z-10"
    >
      <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
        {/* Outer ambient glow on hover */}
        <div 
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"
          style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(${project.rgb}, 0.2) 0%, transparent 70%)` }}
        />

        <div className="relative bg-card/80 dark:bg-card/50 backdrop-blur-md border border-border/60 dark:border-white/[0.06] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm dark:shadow-black/20 group-hover:shadow-xl group-hover:shadow-black/5 dark:group-hover:shadow-black/30 transition-shadow duration-500">
          
          {/* Image — full bleed */}
          <div className="relative md:w-[44%] overflow-hidden bg-secondary/20 dark:bg-black/20">
            {/* Glow behind image */}
            <div 
              className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, rgba(${project.rgb}, 0.6) 0%, transparent 70%)` }}
            />
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover aspect-video md:aspect-auto md:min-h-[200px] relative z-10 transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
            />
            {/* Edge blending */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/80 dark:from-card/50 to-transparent z-20 md:hidden pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-card/80 dark:from-card/50 to-transparent z-20 hidden md:block pointer-events-none" />
          </div>

          {/* Content */}
          <div className="flex-1 p-5 md:p-7 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 font-medium tracking-wide uppercase">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.date}</span>
              <span className="opacity-25">•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {project.readTime}</span>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={logoSrc} 
                alt="" 
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
            <div className="mt-4 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: project.themeColor }}>
              <span>Ver proyecto</span>
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
function ArticleView({ project, onClose }: { project: Project; onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

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

  const bgColor = isDark ? 'hsl(225, 20%, 7%)' : 'hsl(40, 25%, 97.5%)'

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
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-[0.08] dark:opacity-[0.12] blur-[100px] pointer-events-none rounded-full"
        style={{ background: `rgba(${project.rgb}, 1)` }}
      />

      <div className="w-full max-w-7xl mx-auto flex-1 overflow-hidden flex flex-col relative h-full z-10">
        
        {/* Top bar */}
        <div 
          className="h-14 flex items-center px-4 md:px-6 shrink-0 z-20 backdrop-blur-2xl border-b border-border/20 dark:border-white/5"
          style={{ backgroundColor: isDark ? 'hsla(225,20%,7%,0.85)' : 'hsla(40,25%,97.5%,0.85)' }}
        >
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary/60 dark:bg-white/5 hover:bg-secondary dark:hover:bg-white/10 rounded-xl transition-all duration-200 border border-border/40 dark:border-white/5 outline-none"
          >
            <ChevronLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 lg:px-12 pb-32">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14 pt-8">
            
            {/* Main content */}
            <div className="lg:w-[68%] relative">
              {/* Hero image — clean, full width */}
              <div className="relative w-full rounded-xl mb-10 overflow-hidden">
                <div 
                  className="absolute -inset-6 opacity-20 dark:opacity-25 blur-3xl pointer-events-none -z-10"
                  style={{ background: `rgba(${project.rgb}, 0.5)` }}
                />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-auto object-cover rounded-xl relative z-10 shadow-xl dark:shadow-2xl dark:shadow-black/30" 
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground mb-5 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {project.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {project.readTime}</span>
              </div>

              {/* Title with logo */}
              <div className="flex items-center gap-4 md:gap-5 mb-3">
                <img 
                  src={project.logo} 
                  alt="Logo" 
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-medium text-muted-foreground mb-8 pb-5 border-b border-border/30 dark:border-white/10 gap-4">
                <div className="flex items-center gap-3">
                  <span>{project.views}</span>
                  <span className="opacity-20">|</span>
                  <span>{project.comments}</span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 text-foreground bg-secondary/60 dark:bg-white/5 hover:bg-secondary dark:hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 outline-none hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Código
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-1.5 text-white px-4 py-2 rounded-lg transition-all duration-200 outline-none hover:-translate-y-0.5"
                      style={{ backgroundColor: project.themeColor, boxShadow: `0 4px 16px rgba(${project.rgb}, 0.35)` }}
                    >
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2.5 mb-10">
                {project.tech.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 px-3.5 py-2 bg-secondary/60 dark:bg-white/[0.04] border border-border/40 dark:border-white/[0.06] rounded-lg transition-colors duration-200 hover:bg-secondary dark:hover:bg-white/[0.08]">
                    <div className="w-5 h-5 shrink-0">
                      <StackIcon name={t.id as any} className="w-full h-full" />
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
                  Tabla de Contenidos
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
          style={{ backgroundColor: isDark ? 'hsla(225,20%,7%,0.92)' : 'hsla(40,25%,97.5%,0.92)' }}
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
          Proyectos Destacados
        </motion.h2>

        <div className="w-full max-w-4xl space-y-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ArticleView
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
