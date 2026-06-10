import { useState, useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const springX = useSpring(pos.x, { stiffness: 120, damping: 20 })
  const springY = useSpring(pos.y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    // Detect touch/mobile
    const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) setHovered(true)
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) setHovered(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Update springs when pos changes
  useEffect(() => {
    springX.set(pos.x)
    springY.set(pos.y)
  }, [pos.x, pos.y, springX, springY])

  if (isMobile) return null

  return (
    <>
      {/* Hide default cursor via style tag */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Small dot — follows exactly */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${pos.x - 5}px, ${pos.y - 5}px)`,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#5ed29c',
          transition: 'transform 0.02s linear',
          scale: hovered ? '1.5' : '1',
        }}
      />

      {/* Spring-follower circle outline */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 80 : 40,
          height: hovered ? 80 : 40,
          borderRadius: '50%',
          border: '1.5px solid #5ed29c',
          background: hovered ? 'rgba(94, 210, 156, 0.15)' : 'transparent',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
        }}
      />
    </>
  )
}
