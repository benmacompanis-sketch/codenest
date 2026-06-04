import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const ease = [0.25, 0.1, 0.25, 1]
const WA_CTA = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Estoy listo para dar el salto digital con I.D.E.A Code. ¿Podemos hablar?')}`

export default function CTASection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section id="contacto" ref={ref} className="relative py-28 md:py-40 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(94,210,156,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Moving glow orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-brand/[0.07] blur-[80px] pointer-events-none"
        style={{ y }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-brand/[0.05] blur-[100px] pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 40]) }}
        aria-hidden="true"
      />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.p
          className="section-label mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          Hablemos
        </motion.p>

        <motion.h2
          className="font-inter font-black text-white tracking-tight leading-none mb-6"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          ¿Listo para dar el<br />
          <span className="gradient-text">salto digital</span>?
        </motion.h2>

        <motion.p
          className="font-inter text-white/45 text-[16px] leading-relaxed mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          Tu competencia ya está en internet. Es hora de que vos también destaqués con una presencia digital profesional.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          {/* Main WhatsApp CTA */}
          <motion.a
            href={WA_CTA}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-3 font-inter font-bold text-[14px] uppercase tracking-wider bg-[#25D366] text-white px-9 py-4.5 rounded-full overflow-hidden group"
            style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(37,211,102,0.5)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          >
            {/* Shimmer on hover */}
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            <MessageCircle size={18} strokeWidth={2} className="relative z-10" />
            <span className="relative z-10">Contactar por WhatsApp</span>
          </motion.a>

          {/* Secondary */}
          <motion.a
            href={`https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me gustaría ver algunos ejemplos de trabajo de I.D.E.A Code. ¿Podemos hablar?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-inter font-semibold text-[13px] text-white/45 hover:text-white border border-white/10 hover:border-white/25 px-7 py-4 rounded-full transition-all duration-250 group"
          >
            Ver ejemplos de trabajo
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        {/* Trust badge */}
        <motion.p
          className="mt-10 font-inter text-white/22 text-[12px] tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Sin compromiso · Respuesta en menos de 24 horas · Presupuesto gratis
        </motion.p>
      </div>
    </section>
  )
}
