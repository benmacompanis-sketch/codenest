import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const STATS = [
  { value: '4+', label: 'Rubros trabajados' },
  { value: '100%', label: 'Clientes satisfechos' },
  { value: '48hs', label: 'Tiempo de respuesta' },
]

function AnimatedNumber({ end, suffix }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (isInView) {
      animate(count, end, { duration: 2, ease: 'easeOut' })
    }
  }, [isInView, count, end])

  return (
    <span ref={ref} className="font-inter font-black text-[#0a0a0a] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}>
      <motion.span>{rounded}</motion.span>
      <span className="text-brand">{suffix}</span>
    </span>
  )
}

function StatBlock({ stat }) {
  // Parse value into number + suffix for animation when possible
  const match = stat.value.match(/^(\d+)(.*)$/)
  if (match) {
    return (
      <div className="flex flex-col gap-1">
        <AnimatedNumber end={parseInt(match[1])} suffix={match[2]} />
        <p className="font-inter text-[#0a0a0a]/50 text-sm">{stat.label}</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-1">
      <span className="font-inter font-black text-[#0a0a0a] leading-none" style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}>
        {stat.value}
      </span>
      <p className="font-inter text-[#0a0a0a]/50 text-sm">{stat.label}</p>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="nosotros" className="relative py-28 md:py-36 overflow-hidden" style={{ background: '#f8f6f1' }}>
      {/* Decorative large text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-inter font-black"
          style={{ fontSize: 'clamp(140px, 20vw, 280px)', color: '#0a0a0a', opacity: 0.04, letterSpacing: '-0.04em' }}
        >
          I.D.E.A
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="section-label mb-4">Nosotros</p>
            <h2 className="section-heading mb-6">
              Somos <span className="text-brand">I.D.E.A Code.</span>
            </h2>
            <p className="font-inter text-[#0a0a0a]/60 text-[15px] leading-[1.85] mb-5">
              Un equipo de 2-3 apasionados del diseño web y la tecnología. Creemos que cada negocio, sin importar su tamaño, merece una presencia digital profesional y efectiva.
            </p>
            <p className="font-inter text-[#0a0a0a]/45 text-[15px] leading-[1.85]">
              Trabajamos desde Argentina para todo el mundo. Cada proyecto es único y lo tratamos como si fuera nuestro propio negocio.
            </p>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            className="flex flex-col gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
              >
                <StatBlock stat={stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
