import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

const skills = [
  "TypeScript", "Node.js", "React", "C++", "PostgreSQL",
  "MongoDB", "Express", "Docker", "Git", "Linux"
]

export function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="flex flex-col items-center space-y-10 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="section-title"
      >
        {t.education.title}
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
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="w-14 h-14 rounded-xl object-contain bg-white p-1.5 shadow-sm border border-border"
            />
            <div>
              <h3 className="text-lg font-bold text-foreground leading-snug">
                {t.education.university}
              </h3>
              <p className="text-amber-700 dark:text-yellow-400 text-sm font-semibold mt-1">{t.education.degree}</p>
              <p className="text-muted-foreground text-xs mt-1 tracking-wide">
                {t.education.date}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: t.education.desc1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.education.desc2 }} />
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
