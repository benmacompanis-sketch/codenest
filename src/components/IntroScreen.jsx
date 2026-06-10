import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function IntroScreen({ onComplete }) {
  const overlayRef = useRef(null)
  const [gone, setGone]   = useState(false)

  const finish = () => {
    document.body.style.overflow = ''
    setGone(true)
    onComplete?.()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fallback = setTimeout(finish, 6000)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.intro-icon',
          { opacity: 0, scale: 0.7, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }
        )
        .fromTo('.intro-idea',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.8 }
        )
        .fromTo('.intro-code',
          { clipPath: 'inset(0 100% 0 0)', x: -12 },
          { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo('.intro-tagline',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.1'
        )
        .fromTo('.intro-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
          '-=0.3'
        )
        .to({}, { duration: 0.7 })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => { clearTimeout(fallback); finish() }
        })
    })

    return () => { ctx.revert(); clearTimeout(fallback); document.body.style.overflow = '' }
  }, [])

  if (gone) return null

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#080808',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 20,
    }}>
      {/* Icon */}
      <img className="intro-icon" src="/codenest/logo-icon.png" alt=""
        style={{ height: 'clamp(70px, 10vw, 110px)', width: 'auto', marginBottom: 8 }} />

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, position: 'relative' }}>
        <span className="intro-idea" style={{
          display: 'inline-block',
          fontFamily: 'Inter, sans-serif', fontWeight: 900,
          fontSize: 'clamp(40px, 7vw, 80px)',
          color: '#f0ede6',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          I.D.E.A
        </span>
        <span className="intro-code" style={{
          display: 'inline-block',
          fontFamily: 'Inter, sans-serif', fontWeight: 900,
          fontSize: 'clamp(40px, 7vw, 80px)',
          color: '#5ed29c',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          textShadow: '0 0 60px rgba(94,210,156,0.45)',
        }}>
          Code
        </span>

        <div className="intro-line" style={{
          position: 'absolute',
          bottom: -6,
          left: 0,
          width: '55%',
          height: 2,
          background: 'linear-gradient(to right, #5ed29c, transparent)',
          borderRadius: 1,
        }} />
      </div>

      <p className="intro-tagline" style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 600, fontSize: 'clamp(9px, 1vw, 11px)',
        color: 'rgba(240,237,230,0.3)',
        letterSpacing: '0.26em', textTransform: 'uppercase',
        margin: 0, opacity: 0,
      }}>
        Agencia de Diseño Web · Argentina
      </p>
    </div>
  )
}
