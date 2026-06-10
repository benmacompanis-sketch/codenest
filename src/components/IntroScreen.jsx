import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 7 rays radiating from top of bulb
const RAY_ANGLES = [-65, -40, -18, 0, 18, 40, 65]

function BulbIcon({ showRays }) {
  return (
    <svg
      viewBox="0 0 120 150"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 140, height: 175, overflow: 'visible' }}
    >
      <defs>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="bulb-clip">
          <path d="M60 18 C38 18 22 34 22 56 C22 71 30 82 40 90 L40 100 L80 100 L80 90 C90 82 98 71 98 56 C98 34 82 18 60 18 Z" />
        </clipPath>
      </defs>

      {/* ── Rays ── */}
      {RAY_ANGLES.map((angle, i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: '60px 56px', rotate: angle }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={showRays ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.2, delay: i * 0.06, ease: 'easeOut' }}
        >
          <line
            x1="60" y1="10"
            x2="60" y2="1"
            stroke="#5ed29c"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </motion.g>
      ))}

      {/* ── Bulb glass — drawn stroke ── */}
      <motion.path
        d="M60 18 C38 18 22 34 22 56 C22 71 30 82 40 90 L40 100 L80 100 L80 90 C90 82 98 71 98 56 C98 34 82 18 60 18 Z"
        fill="transparent"
        stroke="white"
        strokeWidth="4.5"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Globe fill (clipped to bulb) ── */}
      <motion.g
        clipPath="url(#bulb-clip)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        {/* Base fill */}
        <ellipse cx="60" cy="62" rx="28" ry="30" fill="#3a7a52" />
        {/* Vertical grid lines */}
        {[-14, -7, 0, 7, 14].map((x, i) => (
          <line key={`v${i}`} x1={60 + x} y1={30} x2={60 + x} y2={95} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        ))}
        {/* Horizontal grid lines */}
        {[-20, -12, -4, 4, 12, 20, 28].map((y, i) => (
          <line key={`h${i}`} x1={30} y1={62 + y} x2={90} y2={62 + y} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        ))}
        {/* Globe border */}
        <ellipse cx="60" cy="62" rx="28" ry="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
      </motion.g>

      {/* ── </> tag ── */}
      <motion.text
        x="60" y="55"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontFamily="Inter, monospace"
        fontWeight="800"
        opacity="0.95"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 0.95, y: 55 }}
        transition={{ duration: 0.35, delay: 0.8 }}
      >
        {'</>'}
      </motion.text>

      {/* ── Filament base lines ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        <rect x="40" y="100" width="40" height="5" rx="2.5" fill="white" opacity="0.9" />
        <rect x="43" y="109" width="34" height="5" rx="2.5" fill="white" opacity="0.75" />
        <rect x="46" y="118" width="28" height="5" rx="2.5" fill="white" opacity="0.6" />
        <ellipse cx="60" cy="130" rx="10" ry="6" fill="white" opacity="0.5" />
      </motion.g>

      {/* ── Ambient glow pulse when rays appear ── */}
      {showRays && (
        <motion.ellipse
          cx="60" cy="56" rx="55" ry="58"
          fill="rgba(94,210,156,0.07)"
          filter="url(#glow-strong)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.8, 0.2], scale: [0.85, 1.1, 1.0] }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transformOrigin: '60px 56px' }}
        />
      )}
    </svg>
  )
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('draw')  // draw → rays → text → exit
  const [gone, setGone]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('rays'),  900)
    const t2 = setTimeout(() => setPhase('text'),  1300)
    const t3 = setTimeout(() => setPhase('exit'),  3000)
    const t4 = setTimeout(() => { setGone(true); onComplete?.() }, 4000)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  if (gone) return null

  const showText = phase === 'text' || phase === 'exit'
  const showCurtain = phase === 'exit'

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: '#070b0a' }}
    >
      {/* Radial ambient */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,210,156,0.1) 0%, transparent 65%)',
          filter: 'blur(30px)',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />

      {/* Center content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        style={{ gap: 16 }}
        animate={showCurtain ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 1, 1] }}
      >
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.65, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.3, 0.64, 1] }}
        >
          <BulbIcon showRays={phase !== 'draw'} />
        </motion.div>

        {/* I.D.E.A Code */}
        <motion.div
          className="flex items-baseline"
          initial="hidden"
          animate={showText ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.045 } } }}
        >
          {['I', '.', 'D', '.', 'E', '.', 'A'].map((ch, i) => (
            <motion.span
              key={i}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: '#f2f2f2',
                lineHeight: 1,
                display: 'inline-block',
              }}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              {ch}
            </motion.span>
          ))}
          <motion.span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: '#5ed29c',
              lineHeight: 1,
              marginLeft: '0.25em',
              display: 'inline-block',
              textShadow: '0 0 28px rgba(94,210,156,0.55)',
            }}
            variants={{
              hidden: { opacity: 0, x: 18 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          >
            Code
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 600,
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
          }}
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Innovación Digital para Empresas y Agencias
        </motion.p>

        {/* Progress bar */}
        <motion.div
          style={{
            width: 100, height: 1.5,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 99,
            overflow: 'hidden',
            marginTop: 12,
          }}
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={{ height: '100%', background: '#5ed29c', borderRadius: 99 }}
            initial={{ width: '0%' }}
            animate={{
              width: phase === 'exit' ? '100%' : phase === 'text' ? '65%' : '30%',
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Split curtain exit */}
      <AnimatePresence>
        {showCurtain && (
          <>
            <motion.div
              key="left"
              style={{ position: 'absolute', inset: 0, right: '50%', background: '#070b0a', zIndex: 20 }}
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              key="right"
              style={{ position: 'absolute', inset: 0, left: '50%', background: '#070b0a', zIndex: 20 }}
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
