import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', title: 'Consulta',    desc: 'Nos contás tu proyecto, entendemos tus objetivos y te damos un presupuesto claro y sin sorpresas.' },
  { num: '02', title: 'Diseño',      desc: 'Creamos el diseño visual de tu web para que lo apruebes antes de escribir una línea de código.' },
  { num: '03', title: 'Desarrollo',  desc: 'Construimos tu web con tecnología moderna, rápida y optimizada para aparecer en Google.' },
  { num: '04', title: 'Lanzamiento', desc: 'Publicamos tu web y te entregamos todo. Soporte incluido durante los primeros 30 días.' },
]

export default function ProcessSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-heading', {
        scrollTrigger: { trigger: '.proc-heading', start: 'top 85%' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.proc-step', {
        scrollTrigger: { trigger: '.proc-steps', start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
      // Line draws itself
      gsap.from('.proc-line', {
        scrollTrigger: { trigger: '.proc-steps', start: 'top 75%' },
        scaleX: 0, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'left',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="proceso"
      style={{ background: '#ffffff', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
          fontSize: 11, color: '#5ed29c',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20,
        }}>Cómo trabajamos</p>

        <h2 className="proc-heading" style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 64px)', color: '#0a0a0a',
          lineHeight: 1.05, margin: '0 0 80px', maxWidth: 600,
        }}>
          Simple, claro<br />y <span style={{ color: '#5ed29c' }}>sin vueltas.</span>
        </h2>

        {/* Connector line */}
        <div style={{ position: 'relative', marginBottom: 0 }}>
          <div className="proc-line" style={{
            position: 'absolute', top: 22, left: '12.5%', right: '12.5%', height: 1,
            background: 'rgba(0,0,0,0.1)',
            display: 'none',
          }} />
        </div>

        <div className="proc-steps" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 40,
        }}>
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="proc-step">
              <span style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 900,
                fontSize: 52, color: 'rgba(0,0,0,0.06)',
                lineHeight: 1, display: 'block', marginBottom: 12,
              }}>{num}</span>
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: 18, color: '#0a0a0a', margin: '0 0 10px',
              }}>{title}</h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: 'rgba(0,0,0,0.5)', lineHeight: 1.65, margin: 0,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
