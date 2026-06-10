import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num:'01', title:'Consulta',    desc:'Nos contás tu proyecto, entendemos tus objetivos y te damos un presupuesto claro.' },
  { num:'02', title:'Diseño',      desc:'Creamos el diseño visual para que lo apruebes antes de escribir una línea de código.' },
  { num:'03', title:'Desarrollo',  desc:'Construimos tu web con tecnología moderna, rápida y optimizada para Google.' },
  { num:'04', title:'Lanzamiento', desc:'Publicamos tu web y te entregamos todo. Soporte incluido los primeros 30 días.' },
]

export default function ProcessSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-title', {
        scrollTrigger: { trigger: '.proc-title', start: 'top 85%' },
        y: 70, opacity: 0, duration: 1, ease: 'power4.out',
      })
      gsap.utils.toArray('.proc-step').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 87%' },
          y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="proceso" style={{
      background: '#0d0d0d',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.05)',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <p style={{
          fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
          color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:16,
        }}>Cómo trabajamos</p>
        <h2 className="proc-title" style={{
          fontFamily:'Inter,sans-serif', fontWeight:900,
          fontSize:'clamp(36px,5vw,64px)', color:'#f0ede6',
          lineHeight:1.05, margin:'0 0 72px', letterSpacing:'-0.02em', maxWidth:560,
        }}>
          Simple, claro<br />y <span style={{ color:'#5ed29c' }}>sin vueltas.</span>
        </h2>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))',
          gap:'clamp(32px,4vw,56px)',
        }}>
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="proc-step">
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <span style={{
                  fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:11,
                  color:'#5ed29c', letterSpacing:'0.15em',
                }}>{num}</span>
                <div style={{ flex:1, height:1, background:'rgba(94,210,156,0.2)' }} />
              </div>
              <h3 style={{
                fontFamily:'Inter,sans-serif', fontWeight:700,
                fontSize:20, color:'#f0ede6', margin:'0 0 12px',
                letterSpacing:'-0.01em',
              }}>{title}</h3>
              <p style={{
                fontFamily:'Inter,sans-serif', fontSize:14,
                color:'rgba(240,237,230,0.4)', lineHeight:1.7, margin:0,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
