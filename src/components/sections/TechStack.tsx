import { motion } from "framer-motion"
import { TechIcon } from "../TechIcon"
import LogoLoop from "../LogoLoop"
import { useLanguage } from "../../contexts/LanguageContext"

const techStack = [
  { id: "typescript", name: "TypeScript" },
  { id: "js", name: "JavaScript" },
  { id: "nodejs", name: "Node.js" },
  { id: "react", name: "React" },
  { id: "c++", name: "C++" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "mongodb", name: "MongoDB" },
  { id: "docker", name: "Docker" },
  { id: "git", name: "Git" },
  { id: "linux", name: "Linux" },
  { id: "html5", name: "HTML" },
  { id: "css3", name: "CSS" },
  { id: "tailwindcss", name: "Tailwind" },
  { id: "bash", name: "Bash" },
  { id: "vitejs", name: "Vite" }
]

const techLogos = techStack.map((tech) => ({
  title: tech.name,
  node: <TechIcon name={tech.id} className="h-9 w-9" />,
  href: undefined,
}))

export function TechStack() {
  const { t } = useLanguage()

  return (
    <section id="tech" className="flex flex-col items-center space-y-8 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.50, ease: [0.16, 1, 0.3, 1] }}
        className="section-title"
      >
        {t.techStack.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl"
      >
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={44}
          gap={24}
          hoverSpeed={0}
          fadeOut={false}
          scaleOnHover
          ariaLabel="Tecnologías"
          className="h-[96px] px-4 py-4"
          style={{ backgroundColor: "transparent" }}
        />
      </motion.div>
    </section>
  )
}
