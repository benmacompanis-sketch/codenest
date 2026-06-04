import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const WA_URL = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa saber más sobre I.D.E.A Code. ¿Podemos hablar?')}`

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 320) setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative glass-card rounded-xl px-4 py-3 mr-1"
              >
                <button
                  onClick={() => setDismissed(true)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={10} />
                </button>
                <p className="font-inter font-semibold text-white text-[13px] whitespace-nowrap">¡Hablemos de tu proyecto!</p>
                <p className="font-inter text-white/45 text-[11px] mt-0.5">Respuesta en menos de 24h</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <div className="relative">
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" aria-hidden="true" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring [animation-delay:0.6s]" aria-hidden="true" />

            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] z-10"
              onHoverStart={() => setShowTooltip(true)}
              onHoverEnd={() => setShowTooltip(false)}
              whileHover={{ scale: 1.12, boxShadow: '0 6px 28px rgba(37,211,102,0.6)' }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 280, damping: 16 }}
            >
              <MessageCircle size={24} className="text-white" strokeWidth={2} />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
