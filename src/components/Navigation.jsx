import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLenis } from '../context/lenis'

const NAV_LINKS = [
  { label: 'SERVICIOS', href: '#servicios' },
  { label: 'NOSOTROS', href: '#nosotros' },
  { label: 'PROCESO', href: '#proceso' },
  { label: 'CONTACTO', href: '#contacto' },
]

const WA_URL = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Quiero llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`

function Logo() {
  return (
    <span className="font-inter font-black text-white text-[21px] tracking-tight leading-none select-none">
      I.D.E.A<span className="text-brand">Code</span>
    </span>
  )
}

function MagneticLink({ children, href, onClick, className }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    if (lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.2 })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-dark/85 border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <motion.a
          href="/"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          aria-label="I.D.E.A Code home"
        >
          <Logo />
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative group">
              <MagneticLink
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-inter text-[13px] font-semibold tracking-wider text-white/55 hover:text-white transition-colors duration-250 block"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand group-hover:w-full transition-all duration-300 ease-out" />
              </MagneticLink>
            </div>
          ))}

          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-[13px] font-bold bg-brand text-dark px-5 py-2.5 rounded-full tracking-wide"
            whileHover={{ scale: 1.06, boxShadow: '0 0 22px rgba(94,210,156,0.45)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Contactar
          </motion.a>
        </nav>

        {/* Hamburger */}
        <motion.button
          className="md:hidden relative z-50 p-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          whileTap={{ scale: 0.88 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-dark/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-2"
          >
            {/* Decorative glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand/5 blur-3xl pointer-events-none" />

            <nav className="flex flex-col items-center gap-8 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-inter text-[42px] font-black text-white/85 hover:text-brand transition-colors duration-200 leading-none"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.45, delay: NAV_LINKS.length * 0.07 }}
                className="mt-6 font-inter font-bold text-base bg-brand text-dark px-10 py-4 rounded-full tracking-wide"
              >
                Contactar por WhatsApp
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
