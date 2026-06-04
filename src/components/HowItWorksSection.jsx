import { motion } from 'framer-motion'
import { MessageCircle, Paintbrush, Code2, Rocket } from 'lucide-react'

const ease = [0.25, 0.1, 0.25, 1]

const STEPS = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Consulta gratuita',
    description: 'Hablamos sobre tu negocio, objetivos y lo que necesitás. Sin compromisos, sin costos ocultos.',
  },
  {
    number: '02',
    icon: Paintbrush,
    title: 'Diseño personalizado',
    description: 'Creamos un diseño único y adaptado a tu marca que refleja la identidad de tu negocio.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Desarrollo técnico',
    description: 'Construimos tu presencia digital con tecnología moderna, rápida y segura.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Lanzamiento y soporte',
    description: 'Tu web sale al mundo y te acompañamos en cada paso del proceso posterior.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export default function HowItWorksSection() {
  return (
    <section id="proceso" className="relative py-28 md:py-36 overflow-hidden">
      {/* Right glow */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand/[0.05] blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Horizontal grid line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.04] pointer-events-none hidden lg:block" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-label mb-4">Cómo funciona</p>
          <h2 className="section-heading mb-5">
            Del concepto a la web<br />
            en <span className="gradient-text">4 pasos</span>
          </h2>
          <p className="font-inter text-white/45 text-[15px] max-w-md mx-auto leading-relaxed">
            Un proceso claro, transparente y diseñado para que el resultado supere tus expectativas.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={stepVariants}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative card-surface rounded-2xl p-7 flex flex-col gap-5 group"
              >
                {/* Connector line (desktop only) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-[52px] left-[calc(100%+10px)] w-[30px] h-px bg-brand/20 z-10"
                    aria-hidden="true"
                  />
                )}

                {/* Number + icon row */}
                <div className="flex items-start justify-between">
                  <span className="font-inter font-black text-brand/30 text-[40px] leading-none tracking-tight">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-brand/10 group-hover:border-brand/25 transition-all duration-300">
                    <Icon size={18} className="text-white/50 group-hover:text-brand transition-colors duration-300" strokeWidth={1.7} />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-inter font-bold text-white text-[17px] mb-2.5 leading-snug">{step.title}</h3>
                  <p className="font-inter text-white/45 text-[14px] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom prompt */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          <p className="font-inter text-white/35 text-[14px] mb-2">¿Listo para empezar?</p>
          <motion.a
            href={`https://wa.me/541134076364?text=${encodeURIComponent('Hola! Quiero comenzar el proceso con I.D.E.A Code. ¿Por dónde empezamos?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-bold text-brand text-[14px] hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
          >
            Comenzá hoy mismo
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
