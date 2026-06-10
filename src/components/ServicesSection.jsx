import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, ShoppingBag, QrCode, Zap, Palette, FileText } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { icon: Globe,      title: 'Páginas Web',      desc: 'Tu presencia online profesional, diseñada para convertir visitas en clientes reales.' },
  { icon: ShoppingBag,title: 'Tiendas Online',    desc: 'E-commerce completo con pasarela de pago, gestión de stock y panel de administración.' },
  { icon: QrCode,     title: 'Menú Digital QR',   desc: 'Menú para tu restaurante o bar, actualizable en tiempo real desde el celular.' },
  { icon: Zap,        title: 'Landing Pages',     desc: 'Una página enfocada en un objetivo: captar leads, vender o promocionar.' },
  { icon: Palette,    title: 'Branding Digital',  desc: 'Identidad visual para tu negocio: logo, paleta de colores y tipografía.' },
  { icon: FileText,   title: 'Blog Personal',     desc: 'Plataforma de contenido para posicionarte como experto en tu rubro.' },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.srv-heading', {
        scrollTrigger: { trigger: '.srv-heading', start: 'top 85%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
      })

      // Cards stagger in from below
      gsap.from('.srv-card', {
        scrollTrigger: { trigger: '.srv-grid', start: 'top 80%', toggleActions: 'play none none none' },
        y: 80, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="servicios"
      style={{ background: '#f8f6f1', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
          fontSize: 11, color: '#5ed29c',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20,
        }}>Servicios</p>

        <h2 className="srv-heading" style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 64px)', color: '#0a0a0a',
          lineHeight: 1.05, margin: '0 0 72px',
          maxWidth: 700,
        }}>
          Todo lo que tu negocio<br />necesita <span style={{ color: '#5ed29c' }}>online.</span>
        </h2>

        <div className="srv-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="srv-card" style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 20, padding: '32px 28px',
              transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#5ed29c'
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(94,210,156,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(94,210,156,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Icon size={20} color="#5ed29c" />
              </div>
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: 17, color: '#0a0a0a', margin: '0 0 10px',
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
