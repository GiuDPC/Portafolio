import { ThemeProvider, useTheme } from "./components/ThemeProvider"
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/sections/Hero"
import { memo, lazy, Suspense } from "react"
import { useMediaQuery } from "./hooks/useMediaQuery"
import logoSrc from "./assets/GiuDPC-Logo.png"

const SideRays = lazy(() => import("./components/SideRays"))
const Particles = lazy(() => import("./components/Particles"))
const Projects = lazy(() => import("./components/sections/Projects").then(m => ({ default: m.Projects })))
const TechStack = lazy(() => import("./components/sections/TechStack").then(m => ({ default: m.TechStack })))
const Education = lazy(() => import("./components/sections/Experience").then(m => ({ default: m.Education })))

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function SectionDivider() {
  return <div className="section-divider max-w-2xl mx-auto" aria-hidden="true" />
}

const MemoizedParticles = memo(Particles)
const MemoizedSideRays = memo(SideRays)

function DarkEffects({ isDark }: { isDark: boolean }) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div 
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`} 
      aria-hidden="true"
    >
      <div className="absolute inset-0 mix-blend-screen">
        <Suspense fallback={null}>
          <MemoizedSideRays
            isActive={isDark}
            origin="top-left"
            rayColor1="#0ea5e9"
            rayColor2="#8b5cf6"
            intensity={2}
            speed={1}
            blend={0.6}
            pixelRatio={isMobile ? 0.4 : 1.5}
          />
        </Suspense>
      </div>
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <MemoizedParticles
            isActive={isDark}
            particleColors={['#ffffff', '#ffffff']}
            particleCount={isMobile ? 25 : 100}
            particleSpread={10}
            speed={0.08}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={isMobile ? 0.4 : 1.5}
          />
        </Suspense>
      </div>
    </div>
  )
}

function MainContent() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Dark mode effects — permanently mounted, toggled via opacity */}
      <DarkEffects isDark={isDark} />

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          <Hero />
          <SectionDivider />
          <Suspense fallback={<div className="h-24 animate-pulse bg-muted/40 rounded-2xl" />}>
            <TechStack />
          </Suspense>
          <SectionDivider />
          <Suspense fallback={<div className="h-64 animate-pulse bg-muted/40 rounded-2xl" />}>
            <Projects />
          </Suspense>
          <SectionDivider />
          <Suspense fallback={<div className="h-48 animate-pulse bg-muted/40 rounded-2xl" />}>
            <Education />
          </Suspense>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border bg-card/50 dark:bg-transparent backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="" className="footer-logo" draggable={false} aria-hidden="true" />
            <p className="text-sm font-medium text-muted-foreground">
              <a href="https://github.com/GiuDPC" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                {t.footer.github}
              </a>
              <span className="mx-3 opacity-40">•</span>
              © {new Date().getFullYear()} Giuseppe Poliandri
            </p>
          </div>
          <a href="https://github.com/GiuDPC" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-muted/60 dark:bg-white/5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 border border-border dark:border-white/10">
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
