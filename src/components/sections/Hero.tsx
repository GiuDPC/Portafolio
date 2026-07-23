import { useState, useEffect } from "react"
import { Check, Mail } from "lucide-react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

/* ── Floating Toast ── */
function CopyToast({ show, onDone }: { show: boolean; onDone: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 2200)
      return () => clearTimeout(timer)
    }
  }, [show, onDone])

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/20 dark:shadow-black/40">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Email copied!</p>
              <p className="text-xs text-muted-foreground">giuseppe.dpc.05@gmail.com</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("giuseppe.dpc.05@gmail.com")
    setCopied(true)
  }

  return (
    <>
      <section id="about" className="flex flex-col items-center text-center space-y-8 pt-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Backend Developer
          </h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.16, duration: 0.35 }}
            className="mt-3 h-[3px] w-40 mx-auto bg-yellow-400 rounded-full origin-center"
          />
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.42 }}
          className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm"
        >
          <a
            href="https://github.com/GiuDPC"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors duration-200"
          >
            <GithubIcon className="w-[18px] h-[18px]" />
            <span>Github</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-foreground transition-colors duration-200 opacity-40 cursor-not-allowed"
            title="Coming soon"
          >
            <LinkedinIcon className="w-[18px] h-[18px]" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={copyEmail}
            className="group flex items-center gap-2 hover:text-foreground transition-all duration-300 cursor-pointer relative"
            title="Copy email"
          >
            <span className="relative w-[18px] h-[18px]">
              <Mail className={`w-[18px] h-[18px] absolute inset-0 transition-all duration-300 ${copied ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'}`} />
              <Check className={`w-[18px] h-[18px] absolute inset-0 text-emerald-400 transition-all duration-300 ${copied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'}`} />
            </span>
            <span className="transition-colors duration-300">
              {copied ? <span className="text-emerald-400 font-medium">Copied!</span> : "Email"}
            </span>
          </button>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
          className="max-w-3xl mt-6 text-left space-y-4"
        >
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Ingeniero de Sistemas especializado en <span className="tech-yellow">Backend Development</span> y{" "}
            <span className="tech-green">Arquitectura de Software</span>. Construyo sistemas robustos
            enfocados en rendimiento y escalabilidad, aunque también poseo fuertes habilidades en el desarrollo web integral.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Mi stack principal incluye <span className="tech-blue">Go</span>,{" "}
            <span className="tech-blue">TypeScript</span>,{" "}
            <span className="tech-yellow">JavaScript</span>,{" "}
            <span className="tech-purple">Node.js</span>,{" "}
            <span className="tech-green">PostgreSQL</span> y{" "}
            <span className="tech-cyan">SQL</span>.
          </p>
        </motion.div>
      </section>

      <CopyToast show={copied} onDone={() => setCopied(false)} />
    </>
  )
}
