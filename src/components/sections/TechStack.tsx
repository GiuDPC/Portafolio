import { motion } from "framer-motion"
import StackIcon from "tech-stack-icons"
import LogoLoop from "../LogoLoop"

const techStack = [
  { id: "go", name: "Go" },
  { id: "typescript", name: "TypeScript" },
  { id: "js", name: "JavaScript" },
  { id: "nodejs", name: "Node.js" },
  { id: "react", name: "React" },
  { id: "c++", name: "C++" },
  { id: "python", name: "Python" },
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
  node: <StackIcon name={tech.id as any} className="h-7 w-7" />,
  href: undefined,
}))

export function TechStack() {
  return (
    <section id="tech" className="flex flex-col items-center space-y-8 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="section-title"
      >
        Tecnologías
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
          speed={90}
          direction="left"
          logoHeight={44}
          gap={24}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="var(--background)"
          scaleOnHover
          ariaLabel="Tecnologías"
          className="h-[96px] px-4 py-4"
          style={{ backgroundColor: "transparent" }}
        />
      </motion.div>
    </section>
  )
}
