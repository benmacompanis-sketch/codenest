import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const HLS_SRC = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'
const WA = `https://wa.me/541134076364?text=${encodeURIComponent('Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?')}`

const TICKER = [
  'Páginas Web','Tiendas Online','Menú QR','Landing Pages','Branding Digital','E-commerce',
  'Páginas Web','Tiendas Online','Menú QR','Landing Pages','Branding Digital','E-commerce',
]

export default function HeroSection() {
  const sectionRef   = useRef(null)
  const videoWrapRef = useRef(null)
  const overlayRef   = useRef(null)
  const contentRef   = useRef(null)
  const videoRef     = useRef(null)
  const whiteRef     = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
    return () => hls?.destroy()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', {
        y: '110%', duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.3,
      })
      gsap.from(['.hero-sub', '.hero-cta'], {
        opacity: 0, y: 24, duration: 0.8, stagger: 0.15, delay: 1.0, ease: 'power3.out',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=90%',
          pin: true,
          scrub: 1.5,
        }
      })
      tl.to(contentRef.current,  { y: -120, opacity: 0, scale: 0.94 })
        .to(videoWrapRef.current, { scale: 1.12 }, '<')
        .to(overlayRef.current,   { opacity: 0.9 }, '<0.2')
        .to(whiteRef.current,     { scaleY: 1, ease: 'power4.inOut' }, '-=0.15')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="inicio"
      style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>

      <div ref={videoWrapRef} style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}>
        <video ref={videoRef}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
          autoPlay muted loop playsInline crossOrigin="anonymous" aria-hidden="true" />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a0a0a 0%, transparent 65%)' }} />
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, background: '#0a0a0a', opacity: 0.25 }} />

      <div ref={whiteRef} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%',
        background: '#f8f6f1', transform: 'scaleY(0)', transformOrigin: 'bottom', zIndex: 5,
      }} />

      <div ref={contentRef} style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(24px, 5vw, 80px)', maxWidth: 920,
      }}>
        <p style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
          fontSize: 11, color: '#5ed29c',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28,
        }}>
          Agencia de Diseño Web · Argentina
        </p>

        <h1 style={{ margin: 0, lineHeight: 1.0 }}>
          {[['Diseño', 'web'], ['que', 'convierte'], ['visitas', 'en'], ['clientes.']].map((line, li) => (
            <div key={li} style={{ overflow: 'hidden' }}>
              {line.map((word, wi) => (
                <span key={wi} className="hero-word" style={{
                  display: 'inline-block',
                  fontFamily: 'Inter, sans-serif', fontWeight: 900,
                  fontSize: 'clamp(44px, 7.5vw, 96px)',
                  color: (li === 3) ? '#5ed29c' : '#ffffff',
                  textShadow: (li === 3) ? '0 0 60px rgba(94,210,156,0.4)' : 'none',
                  marginRight: '0.22em',
                }}>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <p className="hero-sub" style={{
          fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75,
          color: 'rgba(255,255,255,0.52)', maxWidth: 460, margin: '28px 0 36px',
        }}>
          Creamos páginas web, tiendas online y soluciones digitales que hacen crecer tu negocio.
        </p>

        <div className="hero-cta" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#5ed29c', color: '#0a0a0a',
            fontFamily: 'Inter, sans-serif', fontWeight: 700,
            fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '14px 28px', borderRadius: 999, textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 0 32px rgba(94,210,156,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none' }}>
            Quiero mi web <ArrowRight size={14} />
          </a>
          <a href="#portfolio" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color='#fff'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.4)'}>
            Ver trabajos →
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 6,
        overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 0', background: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', animation: 'ticker 22s linear infinite', whiteSpace: 'nowrap' }}>
          {TICKER.map((item, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginRight: 36,
              fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600,
              fontSize: 11, color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.18em', textTransform: 'uppercase', flexShrink: 0,
            }}>
              <span style={{ color: '#5ed29c', opacity: 0.5 }}>✦</span>{item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
