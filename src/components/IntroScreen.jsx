import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const FingerSVG = ({ style }) => (
  <svg style={style} viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 44C16 44 4 36 4 22V14C4 11.8 5.8 10 8 10C10.2 10 12 11.8 12 14V24C12.5 23.2 13.7 22.5 15 22.5C16.5 22.5 17.8 23.3 18.4 24.5C19 23.5 20.2 22.8 21.5 22.8C22.8 22.8 23.9 23.5 24.5 24.5C25.1 23.7 26.1 23.2 27.2 23.2C29.3 23.2 31 24.9 31 27V33C31 39 24 44 16 44Z" fill="#f0ede6" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
    <circle cx="8" cy="7" r="3" fill="#5ed29c" opacity="0.8"/>
  </svg>
)

const PointerSVG = ({ style }) => (
  <svg style={style} viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 35V10C10 7.8 11.8 6 14 6C16.2 6 18 7.8 18 10V22C18.6 21.4 19.5 21 20.5 21C22.1 21 23.5 22 23.9 23.4C24.5 22.5 25.6 22 26.8 22C28.4 22 29.8 23 30.2 24.5C30.8 23.7 31.8 23.2 32.9 23.2C35 23.2 36.7 24.9 36.7 27V33C36.7 39.6 31.3 45 24.7 45H22C17.6 45 13.9 42.2 12.3 38.2L10 35Z" fill="#f0ede6" stroke="#080808" strokeWidth="1.5"/>
  </svg>
)

export default function IntroScreen({ onComplete }) {
  const overlayRef  = useRef(null)
  const glowRef     = useRef(null)
  const flashRef    = useRef(null)
  const cursorRef   = useRef(null)
  const iconRef     = useRef(null)
  const [gone, setGone] = useState(false)

  const finish = () => {
    document.body.style.overflow = ''
    setGone(true)
    onComplete?.()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fallback = setTimeout(finish, 8000)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Icon fades in
      tl.fromTo('.intro-icon',
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }
        )

      // 2. Logo text reveals
      .fromTo('.intro-idea',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.7 }, '-=0.1'
        )
      .fromTo('.intro-code',
          { clipPath: 'inset(0 100% 0 0)', x: -10 },
          { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 0.55 }, '-=0.3'
        )
      .fromTo('.intro-tagline',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4 }, '-=0.1'
        )
      .fromTo('.intro-line',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2'
        )

      // 3. Pause — cursor/finger enters
      .to({}, { duration: 0.4 })
      .fromTo('.intro-cursor',
          { x: isTouch ? 40 : 80, y: isTouch ? 60 : 80, opacity: 0, scale: 0.8 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
        )

      // 4. Move toward icon
      .to('.intro-cursor', {
          x: isTouch ? -10 : -20,
          y: isTouch ? -100 : -140,
          duration: 0.7, ease: 'power2.inOut',
        })

      // 5. Click/tap
      .to('.intro-cursor', { scale: 0.7, duration: 0.08, ease: 'power2.in' })
      .to('.intro-icon',   { scale: 0.88, duration: 0.08, ease: 'power2.in' }, '<')

      // 6. Fluorescent flicker
      .to('.intro-icon',   { scale: 1, duration: 0.05 })
      .to('.intro-cursor', { scale: 1, duration: 0.05 }, '<')
      .to('.intro-glow', { opacity: 0.15, scale: 1.1, duration: 0.04 })
      .to('.intro-glow', { opacity: 0,    scale: 1,   duration: 0.06 })
      .to('.intro-glow', { opacity: 0.35, scale: 1.3, duration: 0.05 })
      .to('.intro-glow', { opacity: 0,    scale: 1,   duration: 0.08 })
      .to('.intro-glow', { opacity: 0.6,  scale: 1.6, duration: 0.06 })
      .to('.intro-glow', { opacity: 0.1,  scale: 1.1, duration: 0.1  })

      // 7. Full power ON
      .to('.intro-glow', { opacity: 1, scale: 3.5, duration: 0.5, ease: 'power2.out' })
      .to('.intro-icon', {
          filter: 'drop-shadow(0 0 30px rgba(94,210,156,1)) drop-shadow(0 0 80px rgba(94,210,156,0.8))',
          duration: 0.4, ease: 'power2.out',
        }, '<')

      // 8. Flash
      .to('.intro-flash', { opacity: 1, duration: 0.18, ease: 'power3.in' }, '-=0.1')
      .to('.intro-flash', { opacity: 0, duration: 0.5,  ease: 'power2.out' })
      .to(overlayRef.current, {
          opacity: 0, duration: 0.3,
          onComplete: () => { clearTimeout(fallback); finish() },
        }, '-=0.25')
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
      gap: 20, overflow: 'hidden',
    }}>
      {/* Green flash overlay */}
      <div className="intro-flash" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #5ed29c 40%, #080808 100%)',
        opacity: 0, zIndex: 10, pointerEvents: 'none',
      }} />

      {/* Glow behind icon */}
      <div className="intro-glow" style={{
        position: 'absolute',
        width: 180, height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(94,210,156,0.95) 0%, transparent 70%)',
        opacity: 0,
        filter: 'blur(12px)',
        pointerEvents: 'none',
        marginBottom: 140,
      }} />

      {/* Lightbulb icon */}
      <img className="intro-icon" src="/codenest/logo-icon.png" alt=""
        style={{ height: 'clamp(70px,10vw,110px)', width: 'auto', marginBottom: 8, position: 'relative', zIndex: 2 }} />

      {/* Logo text */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, position: 'relative', zIndex: 2 }}>
        <span className="intro-idea" style={{
          display: 'inline-block',
          fontFamily: 'Inter,sans-serif', fontWeight: 900,
          fontSize: 'clamp(40px,7vw,80px)',
          color: '#f0ede6', letterSpacing: '-0.03em', lineHeight: 1,
        }}>I.D.E.A</span>
        <span className="intro-code" style={{
          display: 'inline-block',
          fontFamily: 'Inter,sans-serif', fontWeight: 900,
          fontSize: 'clamp(40px,7vw,80px)',
          color: '#5ed29c', letterSpacing: '-0.03em', lineHeight: 1,
          textShadow: '0 0 60px rgba(94,210,156,0.45)',
        }}>Code</span>
        <div className="intro-line" style={{
          position: 'absolute', bottom: -6, left: 0,
          width: '55%', height: 2,
          background: 'linear-gradient(to right, #5ed29c, transparent)',
          borderRadius: 1,
        }} />
      </div>

      <p className="intro-tagline" style={{
        fontFamily: '"Plus Jakarta Sans",sans-serif',
        fontWeight: 600, fontSize: 'clamp(9px,1vw,11px)',
        color: 'rgba(240,237,230,0.3)',
        letterSpacing: '0.26em', textTransform: 'uppercase',
        margin: 0, opacity: 0, position: 'relative', zIndex: 2,
      }}>
        Agencia de Diseño Web · Argentina
      </p>

      {/* Animated cursor (pointer on desktop, finger on mobile) */}
      <div className="intro-cursor" ref={cursorRef} style={{
        position: 'absolute',
        bottom: '28%', right: '38%',
        opacity: 0, zIndex: 5, pointerEvents: 'none',
      }}>
        <PointerSVG style={{ width: 36, height: 44, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))', display: 'var(--show-pointer, block)' }} />
        <FingerSVG  style={{ width: 28, height: 42, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))', display: 'var(--show-finger, none)' }} />
      </div>
      <style>{`
        @media (hover: none) {
          .intro-cursor { --show-pointer: none; --show-finger: block; }
        }
      `}</style>
    </div>
  )
}
