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
  const bulbRef          = useRef(null)
  const bulbGlowRef      = useRef(null)
  const bulbFillRef      = useRef(null)
  const raysRef          = useRef(null)
  const [gone, setGone]  = useState(false)

  const finish = () => {
    document.body.style.overflow = ''
    setGone(true)
    onComplete?.()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fallback = setTimeout(finish, 10000)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // 1. Bulb + switch appear
      tl.fromTo(bulbRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.3 }
      )
      .fromTo(switchWrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4'
      )

      // 2. Cursor enters and moves to button
      .fromTo(cursorRef.current,
        { x: isTouch ? 50 : 80, y: isTouch ? 80 : 100, opacity: 0 },
        { x: -8, y: -2, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.2 }
      )

      // 3. Press button
      .to(cursorRef.current,   { scale: 0.85, y: 4, duration: 0.1 })
      .to(buttonRef.current,   { y: 4, duration: 0.1 }, '<')
      .to(buttonInnerRef.current, { attr: { fill: '#222' }, duration: 0.1 }, '<')

      // 4. Bulb flickers (fluorescent)
      .to(bulbFillRef.current,  { attr: { fill: '#5ed29c' }, opacity: 0.3, duration: 0.05, delay: 0.05 })
      .to(bulbFillRef.current,  { opacity: 0, duration: 0.05 })
      .to(bulbFillRef.current,  { opacity: 0.7, duration: 0.04 })
      .to(bulbFillRef.current,  { opacity: 0, duration: 0.06 })
      .to(bulbFillRef.current,  { opacity: 0.5, duration: 0.04 })
      .to(bulbFillRef.current,  { opacity: 0, duration: 0.08 })

      // 5. Bulb fully ON
      .to(bulbFillRef.current,  { opacity: 1, duration: 0.2, ease: 'power2.out' })
      .to(bulbGlowRef.current,  { opacity: 1, scale: 1.4, duration: 0.3, ease: 'power2.out' }, '<')
      .to(raysRef.current,      { opacity: 1, scale: 1.1, duration: 0.3, ease: 'back.out(2)' }, '<')

      // 6. Light explosion from bulb
      .to(glowRef.current,      { opacity: 1, scale: 5, duration: 0.7, ease: 'power3.in' }, '-=0.1')
      .to(switchWrapperRef.current, { opacity: 0, duration: 0.1 }, '-=0.5')
      .to(bulbRef.current,      { opacity: 0, duration: 0.1 }, '-=0.5')
      .to(cursorRef.current,    { opacity: 0, duration: 0.1 }, '-=0.5')

      // 7. Logo appears
      .to(logoRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')

      // 8. Flash → reveal
      .to(flashRef.current, { opacity: 1, duration: 0.25, delay: 0.6 })
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
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      gap: 32, overflow: 'hidden',
    }}>
      {/* Green radial glow — expands from bulb position */}
      <div ref={glowRef} style={{
        position: 'absolute',
        width: '80vw', height: '80vw',
        background: 'radial-gradient(circle, #5ed29c 0%, rgba(94,210,156,0) 65%)',
        borderRadius: '50%',
        opacity: 0, transform: 'scale(0)',
        top: '28%', left: '50%', marginLeft: '-40vw', marginTop: '-40vw',
        pointerEvents: 'none',
      }} />

      {/* Lightbulb */}
      <div ref={bulbRef} style={{ opacity: 0, position: 'relative', zIndex: 2 }}>
        {/* Glow behind bulb */}
        <div ref={bulbGlowRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%) scale(1)',
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,210,156,0.8) 0%, transparent 70%)',
          filter: 'blur(16px)',
          opacity: 0, pointerEvents: 'none',
        }} />

        <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rays */}
          <g ref={raysRef} style={{ opacity: 0, transformOrigin: '40px 42px' }}>
            <line x1="40" y1="4"  x2="40" y2="14" stroke="#5ed29c" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="68" y1="14" x2="61" y2="21" stroke="#5ed29c" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="76" y1="42" x2="66" y2="42" stroke="#5ed29c" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="12" y1="42" x2="4"  y2="42" stroke="#5ed29c" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="12" y1="14" x2="19" y2="21" stroke="#5ed29c" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
          {/* Bulb glass */}
          <path d="M40 18C27.9 18 18 27.9 18 40C18 48.5 22.8 55.8 30 59.5V68H50V59.5C57.2 55.8 62 48.5 62 40C62 27.9 52.1 18 40 18Z"
            fill="#1a1a1a" stroke="#333" strokeWidth="1.5"/>
          {/* Bulb fill (lights up) */}
          <path ref={bulbFillRef} d="M40 18C27.9 18 18 27.9 18 40C18 48.5 22.8 55.8 30 59.5V68H50V59.5C57.2 55.8 62 48.5 62 40C62 27.9 52.1 18 40 18Z"
            fill="#5ed29c" opacity="0"/>
          {/* Base */}
          <rect x="30" y="68" width="20" height="5" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
          <rect x="32" y="73" width="16" height="4" rx="2" fill="#222" stroke="#444" strokeWidth="1"/>
          <rect x="34" y="77" width="12" height="4" rx="2" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
          {/* Filament */}
          <path d="M34 55 Q37 48 40 52 Q43 56 46 49" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Switch + cursor */}
      <div ref={switchWrapperRef} style={{ position: 'relative', zIndex: 2, opacity: 0 }}>
        <svg width="100" height="150" viewBox="0 0 120 180"
          style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.6))' }}>
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

        {/* Cursor */}
        <div ref={cursorRef} style={{
          position: 'absolute', top: '75px', left: '50px',
          zIndex: 10, opacity: 0,
        }}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="#ffffff"
            stroke="#000" strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.6))' }}>
            <path d="M10.5 2.5C10.5 1.67 11.17 1 12 1C12.83 1 13.5 1.67 13.5 2.5V10H14.5C14.78 10 15.06 10.05 15.31 10.15L19.46 11.81C20.37 12.17 21 13.06 21 14.04V18C21 20.21 19.21 22 17 22H11.5C9.91 22 8.44 21.05 7.68 19.64L5.18 15.06C4.85 14.45 4.96 13.68 5.46 13.18L6.82 11.82C7.2 11.45 7.78 11.39 8.22 11.69L10.5 13.25V2.5Z"/>
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div ref={logoRef} style={{
        position: 'absolute', zIndex: 3,
        opacity: 0, transform: 'scale(0.8)', textAlign: 'center',
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
            fontSize: 'clamp(40px,8vw,80px)', color: '#ffffff',
            letterSpacing: '-0.03em', lineHeight: 1,
            textShadow: '0 0 40px rgba(255,255,255,0.5)',
          }}>Code</span>
        </div>
        <p style={{
          fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600,
          fontSize: 'clamp(9px,1.2vw,12px)', color: 'rgba(240,237,230,0.5)',
          letterSpacing: '0.26em', textTransform: 'uppercase', margin: '10px 0 0',
        }}>Agencia de Diseño Web · Argentina</p>
      </div>

      {/* Flash */}
      <div ref={flashRef} style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #5ed29c 50%, #080808 100%)',
        opacity: 0, zIndex: 10, pointerEvents: 'none',
      }} />
    </div>
  )
}
