import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function IntroScreen({ onComplete }) {
  const containerRef     = useRef(null)
  const glowRef          = useRef(null)
  const switchWrapperRef = useRef(null)
  const buttonRef        = useRef(null)
  const buttonInnerRef   = useRef(null)
  const cursorRef        = useRef(null)
  const logoRef          = useRef(null)
  const flashRef         = useRef(null)
  const [gone, setGone]  = useState(false)

  const finish = () => {
    document.body.style.overflow = ''
    setGone(true)
    onComplete?.()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fallback = setTimeout(finish, 9000)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(cursorRef.current,
        { x: isTouch ? 50 : 80, y: isTouch ? 100 : 120, opacity: 0 },
        { x: 15, y: 25, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      )
      .to(cursorRef.current, { scale: 0.9, y: 30, duration: 0.1 })
      .to(buttonRef.current, { y: 4, duration: 0.1 }, '<')
      .to(buttonInnerRef.current, { attr: { fill: '#111111' }, duration: 0.1 }, '<')
      .to(glowRef.current, { opacity: 0.5, scale: 0.3, duration: 0.05, delay: 0.1 })
      .to(glowRef.current, { opacity: 0,   duration: 0.05 })
      .to(glowRef.current, { opacity: 0.8, scale: 0.4, duration: 0.05 })
      .to(glowRef.current, { opacity: 0,   duration: 0.05 })
      .to(glowRef.current, { opacity: 0.6, scale: 0.35, duration: 0.05 })
      .to(glowRef.current, { opacity: 0,   duration: 0.08 })
      .to(glowRef.current, { opacity: 1, scale: 4, duration: 0.75, ease: 'power4.in' })
      .to(switchWrapperRef.current, { opacity: 0, duration: 0.1 }, '-=0.4')
      .to(logoRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3')
      .to(flashRef.current, { opacity: 1, duration: 0.25, delay: 0.7 })
      .to(containerRef.current, {
        opacity: 0, duration: 0.5, ease: 'power2.inOut',
        onComplete: () => { clearTimeout(fallback); finish() },
      })
    }, containerRef)

    return () => { ctx.revert(); clearTimeout(fallback); document.body.style.overflow = '' }
  }, [])

  if (gone) return null

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#080808',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div ref={glowRef} style={{
        position: 'absolute',
        width: '100vw', height: '100vw',
        background: 'radial-gradient(circle, #5ed29c 0%, rgba(94,210,156,0) 60%)',
        borderRadius: '50%',
        opacity: 0, transform: 'scale(0)',
        pointerEvents: 'none',
      }} />

      <div ref={switchWrapperRef} style={{ position: 'relative', zIndex: 2 }}>
        <svg width="120" height="180" viewBox="0 0 120 180"
          style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}>
          <defs>
            <filter id="inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feOffset dx="0" dy="4"/>
              <feGaussianBlur stdDeviation="4" result="offset-blur"/>
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
              <feFlood floodColor="black" floodOpacity="0.7" result="color"/>
              <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
              <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
            </filter>
            <linearGradient id="plate-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a2a2a"/>
              <stop offset="100%" stopColor="#151515"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="100" height="160" rx="16" fill="url(#plate-grad)" stroke="#333" strokeWidth="1"/>
          <circle cx="60" cy="90" r="32" fill="#050505" filter="url(#inset-shadow)"/>
          <g ref={buttonRef}>
            <circle ref={buttonInnerRef} cx="60" cy="90" r="28" fill="#e0e0e0"/>
            <circle cx="60" cy="90" r="28" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2"/>
          </g>
        </svg>

        <div ref={cursorRef} style={{
          position: 'absolute', top: '90px', left: '60px',
          zIndex: 10, opacity: 0,
        }}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="#ffffff"
            stroke="#000000" strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))' }}>
            <path d="M10.5 2.5C10.5 1.67 11.17 1 12 1C12.83 1 13.5 1.67 13.5 2.5V10H14.5C14.78 10 15.06 10.05 15.31 10.15L19.46 11.81C20.37 12.17 21 13.06 21 14.04V18C21 20.21 19.21 22 17 22H11.5C9.91 22 8.44 21.05 7.68 19.64L5.18 15.06C4.85 14.45 4.96 13.68 5.46 13.18L6.82 11.82C7.2 11.45 7.78 11.39 8.22 11.69L10.5 13.25V2.5Z"/>
          </svg>
        </div>
      </div>

      <div ref={logoRef} style={{
        position: 'absolute', zIndex: 3,
        opacity: 0, transform: 'scale(0.8)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'center' }}>
          <span style={{
            fontFamily: 'Inter,sans-serif', fontWeight: 900,
            fontSize: 'clamp(40px,8vw,80px)', color: '#f0ede6',
            letterSpacing: '-0.03em', lineHeight: 1,
            textShadow: '0 0 40px rgba(94,210,156,0.4)',
          }}>I.D.E.A</span>
          <span style={{
            fontFamily: 'Inter,sans-serif', fontWeight: 900,
            fontSize: 'clamp(40px,8vw,80px)', color: '#5ed29c',
            letterSpacing: '-0.03em', lineHeight: 1,
            textShadow: '0 0 60px rgba(94,210,156,0.7)',
          }}>Code</span>
        </div>
        <p style={{
          fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600,
          fontSize: 'clamp(9px,1.2vw,12px)', color: 'rgba(240,237,230,0.4)',
          letterSpacing: '0.26em', textTransform: 'uppercase', margin: '10px 0 0',
        }}>Agencia de Diseño Web · Argentina</p>
      </div>

      <div ref={flashRef} style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #5ed29c 50%, #080808 100%)',
        opacity: 0, zIndex: 10, pointerEvents: 'none',
      }} />
    </div>
  )
}
