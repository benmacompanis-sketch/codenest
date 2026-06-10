import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 12, suffix: '+', label: 'Proyectos entregados' },
  { value: 100, suffix: '%', label: 'Clientes satisfechos' },
  { value: 7,  suffix: '',  label: 'Tipos de soluciones' },
  { value: 48, suffix: 'hs', label: 'Tiempo de respuesta' },
]

const QA = [
  {
    q: '¿Quiénes son?',
    a: 'Somos Benicio Nasello Bruno y Andrés Mayo, dos estudiantes de ORT apasionados por el desarrollo web y la tecnología. Armamos I.D.E.A Code con una misión clara: que cualquier negocio pueda tener una presencia digital profesional sin pagar una fortuna.',
  },
  {
    q: '¿Qué significa I.D.E.A?',
    a: 'Innovación Digital para Empresas y Agencias. Creemos que una buena idea, bien ejecutada, puede transformar un negocio — y eso es exactamente lo que hacemos.',
  },
  {
    q: '¿Cómo trabajan?',
    a: 'Tenemos demos funcionales listas para cada rubro. Las personalizamos con los colores, logo y datos de tu negocio. Así el cliente ve algo funcionando desde el primer día y el proceso es rápido y transparente.',
  },
  {
    q: '¿Dónde están?',
    a: 'Somos 100% remotos y trabajamos desde Argentina para todo el país. Nos manejamos por WhatsApp, video llamada o donde te sea más cómodo.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Cada proyecto es distinto, por eso los precios se hablan por privado. Escribinos por WhatsApp y te damos un presupuesto sin compromiso en menos de 24 horas.',
  },
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

function QACard({ q, a }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!bodyRef.current) return
    if (open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
      )
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.28, ease: 'power3.in' })
    }
  }, [open])

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderTop: '1px solid rgba(240,237,230,0.07)',
        padding: '20px 0', cursor: 'pointer',
        background: open ? 'rgba(94,210,156,0.02)' : 'transparent',
        transition: 'background 0.3s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{
          fontFamily: 'Inter,sans-serif', fontWeight: 700,
          fontSize: 'clamp(14px,1.4vw,17px)',
          color: open ? '#ffffff' : '#f0ede6', transition: 'color 0.25s',
        }}>{q}</span>
        <span style={{
          color: '#5ed29c', fontSize: 20, lineHeight: 1, flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'inline-block',
        }}>+</span>
      </div>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p style={{
          fontFamily: 'Inter,sans-serif', fontSize: 14,
          color: 'rgba(240,237,230,0.55)', lineHeight: 1.75,
          margin: '14px 0 4px', maxWidth: 620,
        }}>{a}</p>
      </div>
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
      gsap.from('.about-qa-label', {
        scrollTrigger: { trigger: '.about-qa-label', start: 'top 88%' },
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
      gsap.utils.toArray('.about-qa-item').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%' },
          x: -24, opacity: 0, duration: 0.6, delay: i * 0.07, ease: 'power3.out',
        })
      })
      // Parallax watermark
      gsap.to('.about-watermark', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        y: -60,
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
      <div className="about-watermark" style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        fontFamily:'Inter,sans-serif', fontWeight:900,
        fontSize:'clamp(120px,20vw,260px)',
        color:'#f0ede6', opacity:0.02,
        whiteSpace:'nowrap', pointerEvents:'none', userSelect:'none',
        letterSpacing:'-0.05em',
      }}>IDEA</div>

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* Top: texto + stats */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap:'clamp(40px,8vw,100px)',
          alignItems:'start',
          marginBottom: 'clamp(60px,8vw,100px)',
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
              color:'rgba(240,237,230,0.5)', lineHeight:1.8, margin:'0 0 20px',
            }}>
              Dos estudiantes de ORT que creen que cada negocio merece una presencia digital profesional y efectiva — sin importar el tamaño.
            </p>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:15,
              color:'rgba(240,237,230,0.5)', lineHeight:1.8, margin:'0 0 32px',
            }}>
              Trabajamos con demos funcionales listas para cada rubro: el cliente ve algo real desde el primer día y el proceso es rápido y transparente.
            </p>

            {/* Redes sociales */}
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {[
                { label:'@ideacode._', href:'https://instagram.com/ideacode._', platform:'Instagram' },
                { label:'@idea.code',  href:'https://tiktok.com/@idea.code',    platform:'TikTok' },
              ].map(({ label, href, platform }) => (
                <a key={platform} href={href} target="_blank" rel="noopener noreferrer" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:12,
                  color:'rgba(94,210,156,0.7)', textDecoration:'none',
                  border:'1px solid rgba(94,210,156,0.2)',
                  borderRadius:999, padding:'8px 16px',
                  transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='#5ed29c'; e.currentTarget.style.borderColor='rgba(94,210,156,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(94,210,156,0.7)'; e.currentTarget.style.borderColor='rgba(94,210,156,0.2)' }}
                >
                  <span style={{ fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.6 }}>{platform}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="about-right" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            {STATS.map((s, i) => <AnimatedStat key={i} {...s} />)}
          </div>
        </div>

        {/* Q&A personal */}
        <div>
          <p className="about-qa-label" style={{
            fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
            color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:32,
          }}>Preguntas frecuentes</p>
          {QA.map((item, i) => (
            <div key={i} className="about-qa-item">
              <QACard {...item} />
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(240,237,230,0.07)' }} />
        </div>

      </div>
    </section>
  )
}
