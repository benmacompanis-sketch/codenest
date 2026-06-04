import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'

const ease = [0.25, 0.1, 0.25, 1]

const STATS = [
  { value: 50, suffix: '+', label: 'Proyectos entregados' },
  { value: 100, suffix: '%', label: 'Compromiso con el cliente' },
  { value: 24, suffix: 'h', label: 'Tiempo máximo de respuesta' },
  { value: 3, suffix: '+', label: 'Años de experiencia digital' },
]

const VALUES = [
  { name: 'Innovación', desc: 'Siempre buscamos nuevas formas de resolver problemas digitales.' },
  { name: 'Calidad', desc: 'Cada pixel importa, cada línea de código cuenta.' },
  { name: 'Compromiso', desc: 'Tu éxito es nuestro éxito. Nos involucramos en tu proyecto.' },
  { name: 'Transparencia', desc: 'Comunicación clara y honesta en cada etapa del proceso.' },
]

function AnimatedCounter({ value, suffix }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2.2, ease: 'easeOut' })
    }
  }, [isInView, count, value])

  return (
    <span ref={ref} className="font-inter font-black text-white leading-none" style={{ fontSize: 'clamp(44px, 5vw, 56px)' }}>
      <motion.span>{rounded}</motion.span>
      <span className="text-brand">{suffix}</span>
    </span>
  )
}

export default function AboutSection() {
  return (
    <section id="nosotros" className="relative py-28 md:py-36 overflow-hidden">
      {/* Side glow */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand/[0.06] blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="section-label mb-4">Quiénes somos</p>
              <h2 className="section-heading mb-6">
                Somos <span className="gradient-text">I.D.E.A Code</span>
              </h2>
              <p className="font-inter text-white/55 text-[15px] leading-[1.85] mb-5">
                Una agencia digital apasionada por transformar negocios a través de tecnología y diseño. Creemos que cada empresa, sin importar su tamaño, merece una presencia digital profesional.
              </p>
              <p className="font-inter text-white/40 text-[15px] leading-[1.85] mb-10">
                Nuestro enfoque combina diseño cuidadoso con desarrollo técnico sólido, para entregar proyectos que no solo se ven bien, sino que trabajan para vos todos los días.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <p className="section-label mb-5">Nuestros valores</p>
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.name}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                >
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
                  <div>
                    <span className="font-inter font-bold text-white text-[14px]">{v.name} — </span>
                    <span className="font-inter text-white/45 text-[14px]">{v.desc}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — stats */}
          <div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="card-surface rounded-2xl p-7 flex flex-col gap-3"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease }}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="font-inter text-white/40 text-[13px] leading-snug">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission box */}
            <motion.div
              className="mt-4 card-surface rounded-2xl p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              <p className="section-label mb-3">Nuestra misión</p>
              <p className="font-instrument italic text-white/80 text-[18px] leading-relaxed">
                "Ayudar a negocios y emprendedores a tener una presencia digital profesional que les permita crecer y destacarse en un mundo cada vez más conectado."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
