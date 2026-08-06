import { motion } from "framer-motion"

const skills = [
  "TypeScript", "Node.js", "React", "C++", "PostgreSQL",
  "MongoDB", "Express", "Docker", "Git", "Linux"
]

export function Education() {
  return (
    <section id="education" className="flex flex-col items-center space-y-10 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="section-title"
      >
        Educación
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl"
      >
        <div className="card-elevated p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <img
              src="/logo-unefa.png"
              alt="UNEFA"
              className="w-14 h-14 rounded-xl object-contain bg-white p-1.5 shadow-sm border border-border"
            />
            <div>
              <h3 className="text-lg font-bold text-foreground leading-snug">
                UNEFA — Universidad Nacional Experimental Politécnica de la Fuerza Armada
              </h3>
              <p className="text-amber-700 dark:text-yellow-400 text-sm font-semibold mt-1">Ingeniería de Sistemas</p>
              <p className="text-muted-foreground text-xs mt-1 tracking-wide">
                2023 — Actualidad (6to Semestre)
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Formación en <span className="tech-blue">algoritmos y estructuras de datos</span>,{" "}
              <span className="tech-green">bases de datos relacionales y NoSQL</span>,{" "}
              <span className="tech-purple">ingeniería de software</span> y{" "}
              <span className="tech-orange">redes de computadoras</span>.
            </p>
            <p>
              Desarrollo de proyectos académicos aplicando <span className="tech-cyan">patrones de diseño</span>,{" "}
              <span className="tech-cyan">arquitectura limpia</span> y buenas prácticas de desarrollo
              con <span className="tech-blue">TypeScript</span>, <span className="tech-orange">C++</span>,{" "}
              <span className="tech-green">PostgreSQL</span> y <span className="tech-purple">React</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-mono rounded-lg bg-muted/60 dark:bg-white/[0.04] text-muted-foreground border border-border dark:border-white/[0.06] transition-all duration-200 hover:text-foreground hover:bg-muted hover:shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
