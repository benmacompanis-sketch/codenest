import { useState } from 'react'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    name: 'Ovelar Propiedades',
    category: 'Inmobiliaria',
    bg: '#1a1a2e',
    link: 'https://benmacompanis-sketch.github.io/ovelar-propiedades/',
  },
  {
    name: 'Veterinaria',
    category: 'Salud Animal',
    bg: '#1a3a2a',
    link: 'https://benmacompanis-sketch.github.io/Veterinaria/',
  },
  {
    name: 'Cucha del Pari',
    category: 'Gastronomía',
    bg: '#2a1a0a',
    link: 'https://benmacompanis-sketch.github.io/Cuchadelpari/',
  },
  {
    name: 'Barre Estudio',
    category: 'Fitness & Danza',
    bg: '#1a1a3a',
    link: 'https://benmacompanis-sketch.github.io/barre-estudio/',
  },
]

const ease = [0.25, 0.1, 0.25, 1]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="rounded-2xl overflow-hidden relative"
      style={{ aspectRatio: '4/3', background: project.bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p
          className="font-jakarta font-bold text-[11px] uppercase tracking-widest mb-1"
          style={{ color: '#5ed29c' }}
        >
          {project.category}
        </p>
        <p className="font-inter font-black text-white text-xl leading-tight">{project.name}</p>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        }}
      />

      {/* Hover button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter font-semibold text-sm bg-white text-[#0a0a0a] px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Ver proyecto →
        </a>
      </motion.div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-28 md:py-36 overflow-hidden" style={{ background: '#f8f6f1' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-label mb-4">Portfolio</p>
          <h2 className="section-heading mb-5">
            Proyectos que hablan<br />por sí solos.
          </h2>
          <p className="font-inter text-[#0a0a0a]/50 text-[15px] leading-relaxed">
            Trabajamos con negocios de distintos rubros. Cada proyecto es único.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
