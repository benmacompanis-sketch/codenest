import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const IDEA_CHARS = ['I', '.', 'D', '.', 'E', '.', 'A']

export default function IntroScreen({ onComplete }) {
  const curtainLeftRef  = useRef(null)
  const curtainRightRef = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Prevent body scroll during intro
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Letters reveal up (mask effect via translateY)
    tl.to('.ic-letter', {
      y: '0%',
      duration: 0.75,
      stagger: 0.065,
    })

    // 2. "Code" slides in from right
    .to('.ic-code', {
      x: 0,
      opacity: 1,
      duration: 0.55,
    }, '-=0.35')

    // 3. Tagline fades in
    .to('.ic-tag', {
      opacity: 1,
      y: 0,
      duration: 0.45,
    }, '-=0.15')

    // 4. Hold
    .to({}, { duration: 0.75 })

    // 5. Curtain splits open — white panels slide out
    .to(curtainLeftRef.current, {
      x: '-100%',
      duration: 0.85,
      ease: 'power4.inOut',
    })
    .to(curtainRightRef.current, {
      x: '100%',
      duration: 0.85,
      ease: 'power4.inOut',
    }, '<')

    // 6. Done
    .call(() => {
      document.body.style.overflow = ''
      setGone(true)
      onComplete?.()
    })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Center content ── */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Headline row */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>

          {/* I.D.E.A — each letter masked */}
          {IDEA_CHARS.map((ch, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.05 }}
            >
              <span
                className="ic-letter"
                style={{
                  display: 'inline-block',
                  transform: 'translateY(110%)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(52px, 8vw, 92px)',
                  color: '#ffffff',
                  letterSpacing: ch === '.' ? '-0.02em' : '0.01em',
                }}
              >
                {ch}
              </span>
            </span>
          ))}

          {/* Space */}
          <span style={{ display: 'inline-block', width: '0.28em' }} />

          {/* Code */}
          <span
            style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.05 }}
          >
            <span
              className="ic-code"
              style={{
                display: 'inline-block',
                transform: 'translateX(32px)',
                opacity: 0,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(52px, 8vw, 92px)',
                color: '#5ed29c',
                textShadow: '0 0 40px rgba(94,210,156,0.45)',
              }}
            >
              Code
            </span>
          </span>
        </div>

        {/* Tagline */}
        <p
          className="ic-tag"
          style={{
            margin: '18px 0 0',
            opacity: 0,
            transform: 'translateY(10px)',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 600,
            fontSize: 11,
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          Innovación Digital para Empresas y Agencias
        </p>
      </div>

      {/* ── Split curtain (same color as landing bg) ── */}
      <div
        ref={curtainLeftRef}
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: 0, right: '50%',
          background: '#f8f6f1',
          zIndex: 10,
        }}
      />
      <div
        ref={curtainRightRef}
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: '50%', right: 0,
          background: '#f8f6f1',
          zIndex: 10,
        }}
      />
    </div>
  )
}
