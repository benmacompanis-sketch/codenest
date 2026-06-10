import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const WA_HERO = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`

const TICKER_ITEMS = [
  'Páginas Web', 'Menú Digital QR', 'Tienda Online',
  'Landing Pages', 'Branding Digital', 'Blog Personal',
  'E-commerce', 'Diseño Web', 'SEO',
]

const headlineWords = ['Diseño web que', 'convierte visitas', 'en']

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection() {
  const scrollToPortfolio = (e) => {
    e.preventDefault()
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col" style={{ background: '#f8f6f1' }}>
      <div className="flex-1 flex items-center justify-center pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
            {/* Main content */}
            <div className="flex-1 max-w-3xl">
              {/* Label */}
              <motion.div
                className="section-label mb-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                Agencia de Diseño Web · Argentina
              </motion.div>

              {/* Headline */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="font-inter font-black leading-none tracking-tight"
                style={{ fontSize: 'clamp(56px, 7vw, 96px)' }}
              >
                {headlineWords.map((line, i) => (
                  <motion.div key={i} variants={wordVariants} className="block text-[#0a0a0a]">
                    {line}
                  </motion.div>
                ))}
                <motion.div variants={wordVariants} className="block">
                  <span className="text-[#0a0a0a]">en </span>
                  <span className="text-brand">clientes.</span>
                </motion.div>
              </motion.div>

              {/* Description */}
              <motion.p
                className="font-inter text-[#0a0a0a]/55 text-lg mt-8 leading-relaxed"
                style={{ maxWidth: 480 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                Creamos páginas web, tiendas online y soluciones digitales que hacen crecer tu negocio. Diseño que convierte.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <a
                  href={WA_HERO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter font-semibold text-base bg-brand text-[#0a0a0a] px-8 py-4 rounded-full hover:bg-brand/90 transition-all hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5"
                >
                  Quiero mi web
                </a>
                <a
                  href="#portfolio"
                  onClick={scrollToPortfolio}
                  className="font-inter font-medium text-base text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors flex items-center gap-2 group"
                >
                  Ver nuestro trabajo
                  <span className="group-hover:translate-x-1 transition-transform">↓</span>
                </a>
              </motion.div>
            </div>

            {/* Stats card — desktop only */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-2xl p-8 w-64"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
                }}
              >
                <p className="section-label mb-6">Resultados</p>
                <div className="space-y-6">
                  <div>
                    <p className="font-inter font-black text-4xl text-[#0a0a0a]">4+</p>
                    <p className="font-inter text-sm text-[#0a0a0a]/50 mt-0.5">Rubros trabajados</p>
                  </div>
                  <div className="h-px bg-black/06" />
                  <div>
                    <p className="font-inter font-black text-4xl text-[#0a0a0a]">100%</p>
                    <p className="font-inter text-sm text-[#0a0a0a]/50 mt-0.5">Clientes satisfechos</p>
                  </div>
                  <div className="h-px bg-black/06" />
                  <div>
                    <p className="font-inter font-black text-4xl text-brand">48hs</p>
                    <p className="font-inter text-sm text-[#0a0a0a]/50 mt-0.5">Tiempo de respuesta</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="mt-16 py-4 border-t border-b overflow-hidden"
        style={{ borderColor: 'rgba(0,0,0,0.07)' }}
      >
        <div
          className="flex gap-8 animate-ticker ticker-track whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              <span className="font-jakarta font-semibold text-sm text-[#0a0a0a]/60 uppercase tracking-wider">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
