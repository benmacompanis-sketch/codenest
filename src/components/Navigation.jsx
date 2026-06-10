import { useEffect, useState } from 'react'
import MagneticButton from './MagneticButton'
import Logo from './Logo'

const WA = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`
const LINKS = [
  { label:'Servicios', href:'#servicios' },
  { label:'Portfolio',  href:'#portfolio' },
  { label:'Proceso',   href:'#proceso' },
  { label:'Nosotros',  href:'#nosotros' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scroll = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        padding:'0 clamp(20px,4vw,60px)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:64,
        background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,237,230,0.06)' : '1px solid transparent',
        transition:'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}>
        <a href="#inicio" onClick={e => scroll(e,'#inicio')} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
          <img src="/codenest/logo-icon.png" alt="" style={{ height:34, width:'auto' }} />
          <Logo size={17} />
        </a>

        <div style={{ display:'flex', alignItems:'center', gap:32 }} className="nav-desktop">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scroll(e,href)} style={{
              fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:14,
              color:'rgba(240,237,230,0.5)', textDecoration:'none', transition:'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color='#f0ede6'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(240,237,230,0.5)'}>
              {label}
            </a>
          ))}
          <MagneticButton href={WA} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13,
              background:'rgba(94,210,156,0.1)', color:'#5ed29c',
              border:'1px solid rgba(94,210,156,0.25)',
              padding:'9px 20px', borderRadius:999, textDecoration:'none',
              transition:'background 0.2s, border-color 0.2s',
            }}>
            Contacto
          </MagneticButton>
        </div>

        <button onClick={() => setMenuOpen(o => !o)} className="nav-mobile"
          style={{ display:'none', background:'none', border:'none', cursor:'pointer', padding:8, flexDirection:'column', gap:5 }}>
          {[0,1].map(i => (
            <span key={i} style={{ display:'block', width:22, height:1.5, background:'#f0ede6', borderRadius:2 }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position:'fixed', inset:0, zIndex:999, background:'#080808',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:36,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position:'absolute', top:24, right:24,
            background:'none', border:'none', cursor:'pointer',
            fontFamily:'Inter,sans-serif', fontSize:13, color:'rgba(240,237,230,0.4)',
          }}>cerrar ✕</button>
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scroll(e,href)} style={{
              fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:36,
              color:'#f0ede6', textDecoration:'none',
            }}>{label}</a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:15,
            background:'#5ed29c', color:'#080808',
            padding:'14px 36px', borderRadius:999, textDecoration:'none', marginTop:12,
          }}>Contacto</a>
        </div>
      )}

      <style>{`
        @media (max-width:768px) {
          .nav-desktop { display:none !important; }
          .nav-mobile { display:flex !important; }
        }
      `}</style>
    </>
  )
}
