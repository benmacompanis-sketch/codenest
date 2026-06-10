import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { name: 'Ovelar Propiedades', cat: 'Inmobiliaria',     bg: '#111827', accent: '#6366f1', url: 'https://benmacompanis-sketch.github.io/ovelar-propiedades/' },
  { name: 'Veterinaria',        cat: 'Salud Animal',     bg: '#052e16', accent: '#4ade80', url: 'https://benmacompanis-sketch.github.io/Veterinaria/' },
  { name: 'Cucha del Pari',     cat: 'Gastronomía',      bg: '#1c0a00', accent: '#fb923c', url: 'https://benmacompanis-sketch.github.io/Cuchadelpari/' },
  { name: 'Barre Estudio',      cat: 'Fitness & Danza',  bg: '#0f0a1e', accent: '#c084fc', url: 'https://benmacompanis-sketch.github.io/barre-estudio/' },
]

export default function PortfolioSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-heading', {
        scrollTrigger: { trigger: '.port-heading', start: 'top 85%' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
      })

      // Cards alternate left/right entrance
      gsap.utils.toArray('.port-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0, duration: 0.9, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio"
      style={{ background: '#0a0a0a', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
          fontSize: 11, color: '#5ed29c',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20,
        }}>Portfolio</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 16 }}>
          <h2 className="port-heading" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 64px)', color: '#ffffff',
            lineHeight: 1.05, margin: 0, maxWidth: 600,
          }}>
            Proyectos que<br />hablan por sí <span style={{ color: '#5ed29c' }}>solos.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            color: 'rgba(255,255,255,0.35)', maxWidth: 260, lineHeight: 1.65, margin: 0,
          }}>
            Cada web, diseñada a medida para el rubro y los objetivos del cliente.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: 16 }}>
          {PROJECTS.map(({ name, cat, bg, accent, url }, i) => (
            <a key={i} className="port-card" href={url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', textDecoration: 'none',
                background: bg, borderRadius: 20,
                aspectRatio: '16/10', position: 'relative', overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = `0 24px 60px ${accent}33`
                e.currentTarget.querySelector('.port-arrow').style.opacity = '1'
                e.currentTarget.querySelector('.port-arrow').style.transform = 'scale(1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.querySelector('.port-arrow').style.opacity = '0'
                e.currentTarget.querySelector('.port-arrow').style.transform = 'scale(0.8)'
              }}>

              {/* Accent glow */}
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 200, height: 200, borderRadius: '50%',
                background: accent, opacity: 0.12, filter: 'blur(40px)',
              }} />

              {/* Grid lines decoration */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.04,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />

              {/* Content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 28px 24px' }}>
                <span style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
                  fontSize: 10, color: accent,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  display: 'block', marginBottom: 8,
                }}>{cat}</span>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 800,
                  fontSize: 22, color: '#ffffff', margin: 0,
                }}>{name}</p>
              </div>

              {/* Arrow */}
              <div className="port-arrow" style={{
                position: 'absolute', top: 20, right: 20,
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transform: 'scale(0.8)',
                transition: 'opacity 0.25s, transform 0.25s',
              }}>
                <ArrowUpRight size={18} color="#ffffff" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
