import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const IDEA_CHARS = ['I', '.', 'D', '.', 'E', '.', 'A']

export default function IntroScreen({ onComplete }) {
  const curtainLeftRef  = useRef(null)
  const curtainRightRef = useRef(null)
  const [gone, setGone] = useState(false)

  const finish = () => {
    document.body.style.overflow = ''
    setGone(true)
    onComplete?.()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Safety fallback — never block site for more than 5s
    const fallback = setTimeout(finish, 5000)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to('.ic-letter', { y: '0%', duration: 0.7, stagger: 0.06 })
        .to('.ic-code',   { x: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .to('.ic-tag',    { opacity: 1, y: 0, duration: 0.4 }, '-=0.15')
        .to({}, { duration: 0.7 })
        .to(curtainLeftRef.current,  { x: '-100%', duration: 0.8, ease: 'power4.inOut' })
        .to(curtainRightRef.current, { x: '100%',  duration: 0.8, ease: 'power4.inOut' }, '<')
        .call(() => { clearTimeout(fallback); finish() })
    })

    return () => { ctx.revert(); clearTimeout(fallback); document.body.style.overflow = '' }
  }, [])

  if (gone) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
          {IDEA_CHARS.map((ch, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.1 }}>
              <span className="ic-letter" style={{
                display: 'inline-block',
                transform: 'translateY(110%)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(48px, 7vw, 88px)',
                color: '#ffffff',
              }}>
                {ch}
              </span>
            </span>
          ))}
          <span style={{ display: 'inline-block', width: '0.25em' }} />
          <span style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.1 }}>
            <span className="ic-code" style={{
              display: 'inline-block',
              transform: 'translateX(28px)',
              opacity: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(48px, 7vw, 88px)',
              color: '#5ed29c',
              textShadow: '0 0 36px rgba(94,210,156,0.5)',
            }}>
              Code
            </span>
          </span>
        </div>
        <p className="ic-tag" style={{
          margin: '16px 0 0', opacity: 0, transform: 'translateY(8px)',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 600, fontSize: 11,
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.22em', textTransform: 'uppercase',
        }}>
          Innovación Digital para Empresas y Agencias
        </p>
      </div>

      {/* Curtains */}
      <div ref={curtainLeftRef}  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: '50%', background: '#f8f6f1', zIndex: 10 }} />
      <div ref={curtainRightRef} style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', right: 0,  background: '#f8f6f1', zIndex: 10 }} />
    </div>
  )
}
