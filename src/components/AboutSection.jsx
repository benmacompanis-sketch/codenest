import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Counter({ to, suffix = '', label }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ n: 0 }, {
          n: to, duration: 1.6, ease: 'power3.out',
          onUpdate() { setVal(Math.round(this.targets()[0].n)) },
        })
      },
    })
    return () => trigger.kill()
  }, [to])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 900,
        fontSize: 'clamp(44px, 6vw, 72px)', color: '#0a0a0a', lineHeight: 1,
      }}>
        {val}{suffix}
      </div>
      <p style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600,
        fontSize: 12, color: 'rgba(0,0,0,0.4)',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        margin: '10px 0 0',
      }}>{label}</p>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      })
      gsap.from('.about-stats', {
        scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="nosotros"
      style={{ background: '#f8f6f1', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)', overflow: 'hidden', position: 'relative' }}>

      {/* Decorative background text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Inter, sans-serif', fontWeight: 900,
        fontSize: 'clamp(100px, 18vw, 220px)', color: '#0a0a0a', opacity: 0.03,
        whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        letterSpacing: '-0.04em',
      }}>I.D.E.A</div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>

          <div className="about-text">
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
              fontSize: 11, color: '#5ed29c',
              letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20,
            }}>Nosotros</p>
            <h2 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 900,
              fontSize: 'clamp(32px, 4vw, 52px)', color: '#0a0a0a',
              lineHeight: 1.1, margin: '0 0 24px',
            }}>
              Somos<br /><span style={{ color: '#5ed29c' }}>I.D.E.A Code.</span>
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15,
              color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, margin: '0 0 16px',
            }}>
              Un equipo apasionado del diseño web y la tecnología. Creemos que cada negocio, sin importar su tamaño, merece una presencia digital profesional y efectiva.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15,
              color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, margin: 0,
            }}>
              Trabajamos desde Argentina, con clientes de todos los rubros. Rápidos, directos y comprometidos con el resultado.
            </p>
          </div>

          <div className="about-stats" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
          }}>
            <Counter to={4} suffix="+" label="Rubros trabajados" />
            <Counter to={100} suffix="%" label="Clientes satisfechos" />
            <Counter to={48} suffix="hs" label="Tiempo de respuesta" />
            <Counter to={30} suffix="+" label="Proyectos entregados" />
          </div>
        </div>
      </div>
    </section>
  )
}
