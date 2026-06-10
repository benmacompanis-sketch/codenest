import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, ShoppingBag, QrCode, Zap, Palette, FileText } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { num:'01', icon: Globe,       title:'Páginas Web',     desc:'Tu presencia online profesional, diseñada para convertir visitas en clientes reales.' },
  { num:'02', icon: ShoppingBag, title:'Tiendas Online',  desc:'E-commerce completo con pasarela de pago, stock y panel de administración.' },
  { num:'03', icon: QrCode,      title:'Menú Digital QR', desc:'Menú para tu restaurante o bar, actualizable en tiempo real desde el celular.' },
  { num:'04', icon: Zap,         title:'Landing Pages',   desc:'Una página enfocada en un objetivo: captar leads, vender o promocionar.' },
  { num:'05', icon: Palette,     title:'Branding Digital',desc:'Identidad visual completa: logo, paleta, tipografía y manual de marca.' },
  { num:'06', icon: FileText,    title:'Blog Personal',   desc:'Plataforma de contenido para posicionarte como experto en tu rubro.' },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from('.srv-title', {
        scrollTrigger: { trigger: '.srv-title', start: 'top 85%' },
        y: 80, opacity: 0, duration: 1, ease: 'power4.out',
      })
      // Each row slides in
      gsap.utils.toArray('.srv-row').forEach((row, i) => {
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: 'top 88%' },
          x: -40, opacity: 0, duration: 0.7, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="servicios" style={{
      background: '#080808',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.05)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:72, flexWrap:'wrap', gap:20 }}>
          <div>
            <p style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
              color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:16,
            }}>Servicios</p>
            <h2 className="srv-title" style={{
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(36px,5vw,64px)', color:'#f0ede6',
              lineHeight:1.05, margin:0, letterSpacing:'-0.02em',
            }}>
              Todo lo que necesitás<br /><span style={{ color:'#5ed29c' }}>online.</span>
            </h2>
          </div>
          <p style={{
            fontFamily:'Inter,sans-serif', fontSize:14,
            color:'rgba(240,237,230,0.35)', maxWidth:280, lineHeight:1.7, margin:0,
          }}>
            Desde tu primera web hasta una tienda online completa — lo hacemos todo.
          </p>
        </div>

        {/* Service rows */}
        <div>
          {SERVICES.map(({ num, icon: Icon, title, desc }, i) => (
            <div key={i} className="srv-row" style={{
              display:'flex', alignItems:'center', gap:24,
              padding:'24px 0',
              borderTop:'1px solid rgba(240,237,230,0.06)',
              cursor:'default',
              transition:'background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(94,210,156,0.03)'
              e.currentTarget.querySelector('.srv-num').style.color = '#5ed29c'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.querySelector('.srv-num').style.color = 'rgba(240,237,230,0.15)'
            }}>
              <span className="srv-num" style={{
                fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:12,
                color:'rgba(240,237,230,0.15)', letterSpacing:'0.1em',
                minWidth:32, transition:'color 0.2s',
              }}>{num}</span>

              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                background:'rgba(94,210,156,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon size={17} color="#5ed29c" />
              </div>

              <span style={{
                fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'clamp(16px,2vw,22px)',
                color:'#f0ede6', flex:1, letterSpacing:'-0.01em',
              }}>{title}</span>

              <span style={{
                fontFamily:'Inter,sans-serif', fontSize:14,
                color:'rgba(240,237,230,0.35)', maxWidth:340, lineHeight:1.6,
                display:'none',
              }} className="srv-desc">{desc}</span>

              <span style={{
                fontFamily:'Inter,sans-serif', fontSize:13,
                color:'rgba(94,210,156,0.5)', marginLeft:'auto', flexShrink:0,
              }}>→</span>
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(240,237,230,0.06)' }} />
        </div>
      </div>
    </section>
  )
}
