import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import { MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WA = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-word', {
        scrollTrigger: { trigger: '.cta-word', start: 'top 85%' },
        y: 100, opacity: 0, duration: 1, stagger: 0.08, ease: 'power4.out',
      })
      gsap.from('.cta-sub', {
        scrollTrigger: { trigger: '.cta-sub', start: 'top 90%' },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
      })
      gsap.from('.cta-btn', {
        scrollTrigger: { trigger: '.cta-btn', start: 'top 92%' },
        scale: 0.8, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: '#080808',
      padding: 'clamp(100px,14vw,180px) clamp(24px,5vw,80px)',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(240,237,230,0.05)',
    }}>
      {/* Big glow */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:700, height:400, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(94,210,156,0.12) 0%, transparent 65%)',
        filter:'blur(60px)', pointerEvents:'none',
      }}/>

      <div style={{ maxWidth:900, margin:'0 auto', position:'relative', zIndex:1 }}>
        <h2 style={{ margin:'0 0 32px', lineHeight:0.95, letterSpacing:'-0.03em' }}>
          {['¿Listo para', 'llevar tu negocio', 'online?'].map((line, li) => (
            <div key={li} style={{ overflow:'hidden' }}>
              <span className="cta-word" style={{
                display:'block',
                fontFamily:'Inter,sans-serif', fontWeight:900,
                fontSize:'clamp(40px,7vw,96px)',
                color: li === 2 ? '#5ed29c' : '#f0ede6',
                textShadow: li === 2 ? '0 0 80px rgba(94,210,156,0.4)' : 'none',
              }}>{line}</span>
            </div>
          ))}
        </h2>

        <p className="cta-sub" style={{
          fontFamily:'Inter,sans-serif', fontSize:16,
          color:'rgba(240,237,230,0.35)', lineHeight:1.7,
          margin:'0 auto 52px', maxWidth:420,
        }}>
          Escribinos hoy y te respondemos antes de las 24 horas. Sin compromiso.
        </p>

        <div className="cta-btn">
          <MagneticButton
            href={WA} target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:10,
              background:'#5ed29c', color:'#080808',
              fontFamily:'Inter,sans-serif', fontWeight:700,
              fontSize:15, padding:'18px 44px', borderRadius:999,
              textDecoration:'none',
              transition:'box-shadow 0.3s',
            }}
          >
            <MessageCircle size={18} />
            Escribinos por WhatsApp
          </MagneticButton>
        </div>

        <p style={{
          fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:600,
          fontSize:10, color:'rgba(240,237,230,0.15)',
          letterSpacing:'0.2em', textTransform:'uppercase',
          marginTop:24,
        }}>Respondemos en menos de 24hs</p>
      </div>
    </section>
  )
}
