import { useEffect, useRef, useState } from 'react'

const WA = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`

const LINKS = [
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Proceso',    href: '#proceso' },
  { label: 'Nosotros',   href: '#nosotros' },
]

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [isDark,   setIsDark]     = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Hero is 100vh — switch to light nav after hero
      const heroH = window.innerHeight
      setIsDark(y < heroH * 0.7)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scroll = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const textColor   = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
  const logoColor   = isDark ? '#ffffff' : '#0a0a0a'
  const navBg       = scrolled
    ? (isDark ? 'rgba(10,10,10,0.85)' : 'rgba(248,246,241,0.9)')
    : 'transparent'
  const borderColor = scrolled
    ? (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)')
    : 'transparent'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg, backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${borderColor}`,
        transition: 'background 0.4s, border-color 0.4s',
        padding: '0 clamp(20px, 4vw, 60px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <a href="#inicio" onClick={e => scroll(e, '#inicio')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 17, color: logoColor, transition: 'color 0.4s' }}>I.D.E.A</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 17, color: '#5ed29c', marginLeft: 4 }}>Code</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scroll(e, href)} style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14,
              color: textColor, textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = isDark ? '#ffffff' : '#0a0a0a'}
            onMouseLeave={e => e.currentTarget.style.color = textColor}>
              {label}
            </a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
            background: '#5ed29c', color: '#0a0a0a',
            padding: '9px 20px', borderRadius: 999,
            textDecoration: 'none', letterSpacing: '0.03em',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 0 20px rgba(94,210,156,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none' }}>
            Contacto
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, flexDirection: 'column', gap: 5,
          }}
          className="nav-hamburger"
          aria-label="Menú"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 2,
              background: isDark ? '#ffffff' : '#0a0a0a',
              borderRadius: 2, transition: 'background 0.3s',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: '#0a0a0a',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 32,
        }}>
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scroll(e, href)} style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 32,
              color: '#ffffff', textDecoration: 'none',
            }}>{label}</a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16,
            background: '#5ed29c', color: '#0a0a0a',
            padding: '14px 32px', borderRadius: 999, textDecoration: 'none', marginTop: 16,
          }}>Contacto</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
