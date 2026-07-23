import StackIcon from "tech-stack-icons"
import { motion } from "framer-motion"

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 24 } 
  },
}

export function TechStack() {
  return (
    <section id="tech" className="flex flex-col items-center space-y-10 relative z-10">
      <h2 className="section-title">Tecnologías</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
      >
        {techStack.map((tech) => (
          <motion.div
            variants={itemVariants}
            key={tech.id}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-card/70 dark:bg-card/50 backdrop-blur-md border border-border/50 dark:border-white/[0.06] hover:bg-card dark:hover:bg-card/80 hover:border-border dark:hover:border-white/15 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 group cursor-default"
          >
            <div className="w-7 h-7 shrink-0 transition-transform duration-400 will-change-transform group-hover:scale-110 group-hover:-translate-y-0.5">
              <StackIcon name={tech.id as any} className="w-full h-full" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
