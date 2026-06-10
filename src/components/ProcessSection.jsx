import { motion } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Consulta',
    description: 'Nos contás tu proyecto, entendemos tus objetivos y te damos un presupuesto claro.',
  },
  {
    number: '02',
    title: 'Diseño',
    description: 'Creamos el diseño visual de tu web para que lo apruebes antes de desarrollar.',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description: 'Construimos tu web con tecnología moderna, rápida y optimizada para Google.',
  },
  {
    number: '04',
    title: 'Lanzamiento',
    description: 'Publicamos tu web y te entregamos todo. Soporte incluido.',
  },
]

const ease = [0.25, 0.1, 0.25, 1]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export default function ProcessSection() {
  return (
    <section id="proceso" className="relative py-28 md:py-36 overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-label mb-4">Cómo trabajamos</p>
          <h2 className="section-heading mb-5">Simple, claro y sin vueltas.</h2>
          <p className="font-inter text-[#0a0a0a]/50 text-[15px] leading-relaxed">
            Un proceso diseñado para que te sientas cómodo en cada etapa y sepas exactamente qué esperar.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Dashed connector line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{
              borderTop: '1.5px dashed rgba(0,0,0,0.12)',
            }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative flex flex-col gap-4"
            >
              {/* Number bg decorative */}
              <div className="relative">
                <span
                  className="absolute -top-4 -left-2 font-inter font-black select-none pointer-events-none leading-none"
                  style={{
                    fontSize: 'clamp(72px, 8vw, 96px)',
                    color: 'rgba(0,0,0,0.04)',
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(94,210,156,0.12)', border: '1px solid rgba(94,210,156,0.3)' }}
                >
                  <span className="font-inter font-black text-brand text-sm">{i + 1}</span>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-inter font-extrabold text-[#0a0a0a] text-lg mb-2">{step.title}</h3>
                <p className="font-inter text-[#0a0a0a]/50 text-[14px] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
