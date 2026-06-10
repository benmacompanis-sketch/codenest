import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    name: 'Ovelar Propiedades',
    cat: 'Inmobiliaria',
    year: '2024',
    bg: 'linear-gradient(160deg, #0c1628 0%, #0f2040 50%, #1a3258 100%)',
    accent: '#c9a84c',
    url: 'https://benmacompanis-sketch.github.io/ovelar-propiedades/',
    img: '/codenest/portfolio/ovelar.jpg',
    tag: 'Inmuebles · CABA',
  },
  {
    name: 'La Quinta Pata',
    cat: 'Veterinaria',
    year: '2024',
    bg: 'linear-gradient(160deg, #030d12 0%, #041a22 50%, #062534 100%)',
    accent: '#00e5b4',
    url: 'https://benmacompanis-sketch.github.io/Veterinaria/',
    img: '/codenest/portfolio/veterinaria.jpg',
    tag: 'Clínica · Caballito',
  },
  {
    name: 'Cucha del Pari',
    cat: 'Gastronomía',
    year: '2024',
    bg: 'linear-gradient(160deg, #100500 0%, #1e0b00 50%, #2a1200 100%)',
    accent: '#e8a020',
    url: 'https://benmacompanis-sketch.github.io/Cuchadelpari/',
    img: '/codenest/portfolio/cucha.jpg',
    tag: 'Bar & Cocina · Buenos Aires',
  },
  {
    name: 'Barre Estudio',
    cat: 'Fitness & Danza',
    year: '2024',
    bg: 'linear-gradient(160deg, #f5f0eb 0%, #ede6dd 100%)',
    accent: '#c8956c',
    url: 'https://benmacompanis-sketch.github.io/barre-estudio/',
    img: '/codenest/portfolio/barre.jpg',
    tag: 'Estudio · Buenos Aires',
    img: null,
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    gsap.from(cardRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
      y: 60, opacity: 0, duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
    })
  }, [index])

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: project.bg,
        borderRadius: 20, overflow: 'hidden',
        aspectRatio: '4/3', position: 'relative',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s',
        boxShadow: hovered ? `0 30px 80px ${project.accent}25` : '0 0 0 rgba(0,0,0,0)',
        border: `1px solid ${hovered ? project.accent + '30' : 'rgba(240,237,230,0.06)'}`,
      }}
    >
      {/* Screenshot placeholder (replaced when user provides images) */}
      {project.img ? (
        <img src={project.img} alt={project.name}
          style={{ width:'100%', height:'100%', objectFit:'cover', opacity: hovered ? 1 : 0.85, transition:'opacity 0.3s' }} />
      ) : (
        <>
          {/* Decorative grid */}
          <div style={{
            position:'absolute', inset:0, opacity:0.06,
            backgroundImage:'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize:'48px 48px',
          }}/>
          {/* Accent glow top-right */}
          <div style={{
            position:'absolute', top:-40, right:-40,
            width:180, height:180, borderRadius:'50%',
            background: project.accent, opacity:0.12, filter:'blur(50px)',
            transition:'opacity 0.4s',
            ...(hovered && { opacity:0.22 }),
          }}/>
          {/* Center monogram */}
          <div style={{
            position:'absolute', inset:0,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <span style={{
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(48px,6vw,80px)',
              color: project.accent, opacity: 0.15,
              letterSpacing:'-0.04em',
            }}>
              {project.name.split(' ').map(w => w[0]).join('')}
            </span>
          </div>
        </>
      )}

      {/* Bottom info */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'60px 24px 24px',
        background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <span style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700,
              fontSize:10, color: project.accent,
              letterSpacing:'0.2em', textTransform:'uppercase',
              display:'block', marginBottom:6,
            }}>{project.cat} · {project.year}</span>
            <p style={{
              fontFamily:'Inter,sans-serif', fontWeight:800,
              fontSize:'clamp(18px,2.2vw,26px)', color:'#ffffff',
              margin:0, letterSpacing:'-0.01em',
            }}>{project.name}</p>
          </div>
          <div style={{
            width:44, height:44, borderRadius:'50%',
            background: hovered ? project.accent : 'rgba(255,255,255,0.1)',
            backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background 0.3s, transform 0.3s',
            transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)',
            flexShrink:0,
          }}>
            <ArrowUpRight size={18} color={hovered ? '#080808' : '#ffffff'} />
          </div>
        </div>
      </div>
    </a>
  )
}

export default function PortfolioSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-title', {
        scrollTrigger: { trigger: '.port-title', start: 'top 85%' },
        y: 70, opacity: 0, duration: 1, ease: 'power4.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" style={{
      background: '#080808',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.05)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:60, flexWrap:'wrap', gap:16 }}>
          <div>
            <p style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
              color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:16,
            }}>Portfolio</p>
            <h2 className="port-title" style={{
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(36px,5vw,64px)', color:'#f0ede6',
              lineHeight:1.05, margin:0, letterSpacing:'-0.02em',
            }}>
              Proyectos que<br />hablan por sí <span style={{ color:'#5ed29c' }}>solos.</span>
            </h2>
          </div>
          <p style={{
            fontFamily:'Inter,sans-serif', fontSize:14,
            color:'rgba(240,237,230,0.35)', maxWidth:260, lineHeight:1.7, margin:0,
          }}>
            Diseño a medida para cada rubro y objetivo.
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap:16,
        }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>

      </div>
    </section>
  )
}
