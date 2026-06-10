import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hls from 'hls.js'

const HLS_SRC = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'
const WA_HERO = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`

const TICKER_ITEMS = [
  'Páginas Web', 'Menú Digital QR', 'Tienda Online',
  'Landing Pages', 'Branding Digital', 'Blog Personal',
  'Páginas Web', 'Menú Digital QR', 'Tienda Online',
  'Landing Pages', 'Branding Digital', 'Blog Personal',
]

const HEADLINE_WORDS = ['TU', 'NEGOCIO', 'MERECE', 'EXISTIR', 'EN', 'INTERNET']

const ease = [0.25, 0.1, 0.25, 1]

function BackgroundVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
    return () => { if (hls) hls.destroy() }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0.5 }}
      autoPlay muted loop playsInline crossOrigin="anonymous"
      aria-hidden="true"
    />
  )
}

function GlassCard() {
  return (
    <div className="animate-float glass-card rounded-2xl p-5 text-left" style={{ width: 204, height: 204 }}>
      <div className="relative z-10 flex flex-col justify-between h-full">
        <span className="font-jakarta font-bold text-brand/80 tracking-[0.18em] uppercase" style={{ fontSize: 11 }}>
          I.D.E.A Code
        </span>
        <div>
          <p className="text-white font-inter font-semibold leading-snug mb-2.5" style={{ fontSize: 17 }}>
            Diseño web que convierte visitas en{' '}
            <em className="font-instrument italic text-brand/90">clientes reales.</em>
          </p>
          <p className="text-white/40 font-inter leading-relaxed" style={{ fontSize: 11 }}>
            Webs · QR · E-commerce · Branding
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-label="Inicio">
      {/* Background video */}
      <BackgroundVideo />

      {/* Left gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #070b0a 0%, rgba(7,11,10,0.6) 55%, transparent 75%)' }} />

      {/* Bottom gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #070b0a 0%, rgba(7,11,10,0.5) 35%, transparent 60%)' }} />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #070b0a 0%, transparent 100%)' }} />

      {/* Vertical grid lines */}
      <div className="absolute inset-0 z-10 hidden md:block pointer-events-none" aria-hidden="true">
        <div className="absolute inset-y-0 left-1/4 w-px bg-white/[0.07]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.07]" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-white/[0.07]" />
      </div>

      {/* Central ellipse glow */}
      <div className="absolute top-0 inset-x-0 z-10 flex justify-center pointer-events-none" aria-hidden="true">
        <svg width="1200" height="320" viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="hero-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>
          <ellipse cx="600" cy="100" rx="480" ry="130" fill="rgba(20,200,140,0.18)" filter="url(#hero-glow)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 md:px-12 w-full max-w-5xl mx-auto">

        {/* Floating glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <GlassCard />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="section-label mt-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
        >
          Innovación Digital
        </motion.p>

        {/* Animated headline — word by word */}
        <h1
          className="font-inter font-extrabold uppercase tracking-tight leading-none text-white mb-6"
          style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}
          aria-label="Tu negocio merece existir en internet."
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7 + i * 0.09, ease }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            className="inline-block text-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 + HEADLINE_WORDS.length * 0.09 }}
          >
            .
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p
          className="font-inter mb-9"
          style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', maxWidth: 520, lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease }}
        >
          Creamos páginas web profesionales, tiendas online y soluciones digitales que hacen crecer tu negocio. Diseño que convierte.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease }}
        >
          <motion.a
            href={WA_HERO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full font-inter font-bold uppercase text-[13px] tracking-wider px-8 py-4"
            style={{ background: '#5ed29c', color: '#070b0a' }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 28px rgba(94,210,156,0.5)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          >
            Quiero mi web
            <ArrowRight size={15} strokeWidth={2.5} />
          </motion.a>

          <motion.a
            href="#servicios"
            className="flex items-center gap-2 font-inter font-semibold text-[13px] text-white/55 hover:text-white transition-colors duration-200 group"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Ver servicios
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        {/* Ticker */}
        <motion.div
          className="w-full overflow-hidden mt-16 opacity-0"
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <div className="flex ticker-track animate-ticker whitespace-nowrap">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="flex items-center gap-3 mr-10 font-jakarta font-semibold text-white/20 text-[11px] uppercase tracking-[0.2em] shrink-0">
                <span className="text-brand/50 text-base">✦</span>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
