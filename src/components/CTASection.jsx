import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const ease = [0.25, 0.1, 0.25, 1]
const WA_CTA = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Estoy listo para llevar mi negocio online con I.D.E.A Code. ¿Podemos hablar?')}`

export default function CTASection() {
  return (
    <section
      id="contacto"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Green glow behind button area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(94,210,156,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.p
          className="section-label mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          Hablemos
        </motion.p>

        <motion.h2
          className="font-inter font-black text-white tracking-tight leading-none mb-6"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          ¿Listo para llevar tu<br />
          <span className="text-brand">negocio online?</span>
        </motion.h2>

        <motion.p
          className="font-inter text-white/45 text-[16px] leading-relaxed mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          Tu competencia ya está en internet. Es hora de que vos también destaqués con una presencia digital profesional.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          {/* Glow wrapper */}
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(94,210,156,0.35) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              aria-hidden="true"
            />
            <motion.a
              href={WA_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-3 font-inter font-bold text-[14px] uppercase tracking-wider bg-brand text-[#0a0a0a] rounded-full overflow-hidden"
              style={{ padding: '1.125rem 2.5rem' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(94,210,156,0.5)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            >
              <MessageCircle size={18} strokeWidth={2} />
              Escribinos por WhatsApp
            </motion.a>
          </div>

          <p className="font-inter text-white/30 text-[12px] tracking-wide mt-2">
            Respondemos en menos de 24hs
          </p>
        </motion.div>
      </div>
    </section>
  )
}
