import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

const RAYS = [
  { x1: 160, y1: 28, x2: 160, y2: 8, rotate: 0 },
  { x1: 160, y1: 28, x2: 178, y2: 12, rotate: 25 },
  { x1: 160, y1: 28, x2: 190, y2: 22, rotate: 48 },
  { x1: 160, y1: 28, x2: 142, y2: 12, rotate: -25 },
  { x1: 160, y1: 28, x2: 130, y2: 22, rotate: -48 },
  { x1: 160, y1: 28, x2: 196, y2: 35, rotate: 68 },
  { x1: 160, y1: 28, x2: 124, y2: 35, rotate: -68 },
]

function LogoSVG({ phase }) {
  // phase: 'bulb' | 'rays' | 'full'
  return (
    <svg viewBox="0 80 320 200" xmlns="http://www.w3.org/2000/svg" style={{ width: 320, height: 200, overflow: 'visible' }}>
      <defs>
        <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="bulb-clip">
          <ellipse cx="160" cy="148" rx="46" ry="50" />
        </clipPath>
      </defs>

      {/* ── Rays ── */}
      {RAYS.map((r, i) => (
        <motion.line
          key={i}
          x1={160} y1={100}
          x2={160} y2={82}
          stroke="#5ed29c"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ transformOrigin: '160px 100px', rotate: r.rotate }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            phase === 'rays' || phase === 'full'
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 0.25, delay: 0.05 * i, ease: 'easeOut' }}
          filter="url(#glow-green)"
        />
      ))}

      {/* ── Bulb outline ── */}
      <motion.path
        d="M160 95
           C135 95 118 113 118 135
           C118 150 126 162 138 168
           L138 178
           L182 178
           L182 168
           C194 162 202 150 202 135
           C202 113 185 95 160 95 Z"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Globe grid inside bulb ── */}
      <motion.g
        clipPath="url(#bulb-clip)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: '160px 148px' }}
      >
        {/* Globe fill */}
        <ellipse cx="160" cy="148" rx="36" ry="40" fill="#3a7a52" />
        {/* Vertical lines */}
        {[-18, -9, 0, 9, 18].map((x, i) => (
          <line key={`vl${i}`} x1={160 + x} y1={108} x2={160 + x} y2={188} stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        ))}
        {/* Horizontal lines */}
        {[-18, -9, 0, 9, 18, 27].map((y, i) => (
          <line key={`hl${i}`} x1={124} y1={148 + y} x2={196} y2={148 + y} stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        ))}
        {/* Globe outline */}
        <ellipse cx="160" cy="148" rx="36" ry="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      </motion.g>

      {/* ── Code tag </> inside bulb ── */}
      <motion.text
        x="160" y="142"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontFamily="Inter, monospace"
        fontWeight="700"
        letterSpacing="-1"
        opacity="0.9"
        initial={{ opacity: 0, y: 148 }}
        animate={{ opacity: 0.9, y: 142 }}
        transition={{ duration: 0.4, delay: 0.85, ease: 'easeOut' }}
      >
        {'</>'}
      </motion.text>

      {/* ── Base filament lines ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <rect x="145" y="178" width="30" height="4" rx="2" fill="#1a1a1a" />
        <rect x="148" y="185" width="24" height="4" rx="2" fill="#1a1a1a" />
        <rect x="152" y="192" width="16" height="4" rx="2" fill="#1a1a1a" />
        <ellipse cx="160" cy="199" rx="7" ry="5" fill="#1a1a1a" />
      </motion.g>

      {/* ── Bulb inner glow pulse ── */}
      {(phase === 'rays' || phase === 'full') && (
        <motion.ellipse
          cx="160" cy="148" rx="52" ry="55"
          fill="rgba(94,210,156,0.08)"
          filter="url(#glow-strong)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '160px 148px' }}
        />
      )}
    </svg>
  )
}

function IdeaCodeText({ show }) {
  const letters = ['I', '.', 'D', '.', 'E', '.', 'A']

  return (
    <motion.div
      className="flex items-baseline gap-0 select-none"
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
    >
      {/* I.D.E.A */}
      <div className="flex items-baseline">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className="font-inter font-black"
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              color: '#f0f0f0',
              lineHeight: 1,
              letterSpacing: l === '.' ? '-0.02em' : '0.01em',
            }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* space + Code */}
      <motion.span
        className="font-inter font-black ml-3"
        style={{
          fontSize: 'clamp(28px, 5vw, 52px)',
          color: '#5ed29c',
          lineHeight: 1,
          textShadow: '0 0 30px rgba(94,210,156,0.5)',
        }}
        variants={{
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Code
      </motion.span>
    </motion.div>
  )
}

function Tagline({ show }) {
  return (
    <motion.p
      className="font-inter"
      style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', marginTop: 8 }}
      initial={{ opacity: 0, y: 10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
    >
      INNOVACIÓN DIGITAL PARA EMPRESAS Y AGENCIAS
    </motion.p>
  )
}

function SplitCurtain({ trigger }) {
  return (
    <AnimatePresence>
      {trigger && (
        <>
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{ background: '#070b0a', zIndex: 10 }}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            exit={{}}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{ background: '#070b0a', zIndex: 10 }}
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            exit={{}}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('bulb')   // bulb → rays → full → exit
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('rays'), 900)
    const t2 = setTimeout(() => setPhase('full'), 1350)
    const t3 = setTimeout(() => setPhase('exit'), 2800)
    const t4 = setTimeout(() => {
      setDone(true)
      onComplete?.()
    }, 3700)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  if (done) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
      style={{ background: '#070b0a' }}
    >
      {/* Ambient glow behind logo */}
      <motion.div
        className="absolute"
        style={{
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,210,156,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center gap-3">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.26, 0.64, 1] }}
        >
          <LogoSVG phase={phase} />
        </motion.div>

        {/* Text */}
        <IdeaCodeText show={phase === 'full' || phase === 'exit'} />
        <Tagline show={phase === 'full' || phase === 'exit'} />

        {/* Progress bar */}
        <motion.div
          className="mt-8 rounded-full overflow-hidden"
          style={{ width: 120, height: 1.5, background: 'rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== 'bulb' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={{ height: '100%', background: '#5ed29c', borderRadius: 9999 }}
            initial={{ width: '0%' }}
            animate={{ width: phase === 'exit' ? '100%' : phase === 'full' ? '75%' : '40%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Split curtain exit */}
      <SplitCurtain trigger={phase === 'exit'} />

      {/* Final fade of center content before curtain fully opens */}
      <AnimatePresence>
        {phase === 'exit' && (
          <motion.div
            className="absolute inset-0 z-[15] bg-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
