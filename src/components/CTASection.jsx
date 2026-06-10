import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WA = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-line', {
        scrollTrigger: { trigger: '.cta-line', start: 'top 85%' },
        y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
      })
      gsap.from('.cta-btn', {
        scrollTrigger: { trigger: '.cta-btn', start: 'top 90%' },
        scale: 0.85, opacity: 0, duration: 0.7, ease: 'back.out(1.4)',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef}
      style={{
        background: '#0a0a0a', position: 'relative', overflow: 'hidden',
        padding: 'clamp(100px, 14vw, 180px) clamp(24px, 5vw, 80px)',
        textAlign: 'center',
      }}>

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(94,210,156,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <h2 className="cta-line" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 88px)', color: '#ffffff',
            lineHeight: 1.0, margin: 0,
          }}>¿Listo para llevar</h2>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <h2 className="cta-line" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 88px)',
            lineHeight: 1.0, margin: 0,
            background: 'linear-gradient(90deg, #5ed29c, #a8f0cc)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>tu negocio online?</h2>
        </div>

        <p className="cta-line" style={{
          fontFamily: 'Inter, sans-serif', fontSize: 16,
          color: 'rgba(255,255,255,0.4)', lineHeight: 1.7,
          margin: '28px auto 48px', maxWidth: 440,
        }}>
          Escribinos y te respondemos en menos de 24 horas. Sin compromiso.
        </p>

        <a className="cta-btn" href={WA} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#5ed29c', color: '#0a0a0a',
            fontFamily: 'Inter, sans-serif', fontWeight: 700,
            fontSize: 15, padding: '18px 40px', borderRadius: 999,
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='scale(1.06)'; e.currentTarget.style.boxShadow='0 0 50px rgba(94,210,156,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none' }}>
          <MessageCircle size={18} />
          Escribinos por WhatsApp
        </a>

        <p style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600,
          fontSize: 11, color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          marginTop: 20,
        }}>Respondemos en menos de 24hs</p>
      </div>
    </section>
  )
}
