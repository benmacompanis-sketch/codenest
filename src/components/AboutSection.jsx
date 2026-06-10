import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 30, suffix: '+', label: 'Proyectos entregados' },
  { value: 100, suffix: '%', label: 'Clientes satisfechos' },
  { value: 4, suffix: '+', label: 'Rubros distintos' },
  { value: 48, suffix: 'hs', label: 'Tiempo de respuesta' },
]

function AnimatedStat({ value, suffix, label }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ n: 0 }, {
          n: value, duration: 1.8, ease: 'power3.out',
          onUpdate() { setDisplay(Math.round(this.targets()[0].n)) },
        })
      },
    })
    return () => trigger.kill()
  }, [value])

  return (
    <div ref={ref} style={{ borderTop: '1px solid rgba(240,237,230,0.08)', paddingTop: 28 }}>
      <div style={{
        fontFamily: 'Inter,sans-serif', fontWeight: 900,
        fontSize: 'clamp(44px,5vw,64px)', color: '#f0ede6',
        lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        {display}<span style={{ color: '#5ed29c' }}>{suffix}</span>
      </div>
      <p style={{
        fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600,
        fontSize: 11, color: 'rgba(240,237,230,0.3)',
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
      gsap.from('.about-left', {
        scrollTrigger: { trigger: '.about-left', start: 'top 80%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      })
      gsap.from('.about-right', {
        scrollTrigger: { trigger: '.about-right', start: 'top 80%' },
        x: 60, opacity: 0, duration: 1, delay: 0.15, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="nosotros" style={{
      background: '#080808',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.05)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Giant background text */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        fontFamily:'Inter,sans-serif', fontWeight:900,
        fontSize:'clamp(120px,20vw,260px)',
        color:'#f0ede6', opacity:0.02,
        whiteSpace:'nowrap', pointerEvents:'none', userSelect:'none',
        letterSpacing:'-0.05em',
      }}>IDEA</div>

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'clamp(40px,8vw,100px)',
          alignItems:'start',
        }}>
          <div className="about-left">
            <p style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
              color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:20,
            }}>Nosotros</p>
            <h2 style={{
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(32px,4vw,52px)', color:'#f0ede6',
              lineHeight:1.1, margin:'0 0 28px', letterSpacing:'-0.02em',
            }}>
              Somos<br /><span style={{ color:'#5ed29c' }}>I.D.E.A Code.</span>
            </h2>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:15,
              color:'rgba(240,237,230,0.5)', lineHeight:1.8,
              margin:'0 0 20px',
            }}>
              Un equipo apasionado del diseño web y la tecnología. Creemos que cada negocio, sin importar su tamaño, merece una presencia digital profesional y efectiva.
            </p>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:15,
              color:'rgba(240,237,230,0.5)', lineHeight:1.8, margin:0,
            }}>
              Trabajamos desde Argentina para todo el país. Rápidos, directos y comprometidos con el resultado.
            </p>
          </div>

          <div className="about-right" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            {STATS.map((s, i) => <AnimatedStat key={i} {...s} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
