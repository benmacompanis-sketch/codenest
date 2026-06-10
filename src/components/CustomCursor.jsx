import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef    = useRef(null)
  const circleRef = useRef(null)
  const pos       = useRef({ x: -100, y: -100 })
  const circle    = useRef({ x: -100, y: -100 })
  const raf       = useRef(null)
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) { setHidden(true); return }

    document.body.style.cursor = 'none'

    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    const enter = e => { if (e.target.closest('a, button, [data-cursor]')) setHovered(true) }
    const leave = e => { if (e.target.closest('a, button, [data-cursor]')) setHovered(false) }
    const down  = () => setClicked(true)
    const up    = () => setClicked(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', enter)
    window.addEventListener('mouseout', leave)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    const lerp = (a, b, n) => a + (b - a) * n

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`
      }
      if (circleRef.current) {
        circle.current.x = lerp(circle.current.x, pos.current.x, 0.12)
        circle.current.y = lerp(circle.current.y, pos.current.y, 0.12)
        circleRef.current.style.transform = `translate(${circle.current.x - 20}px, ${circle.current.y - 20}px)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', enter)
      window.removeEventListener('mouseout', leave)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      cancelAnimationFrame(raf.current)
      document.body.style.cursor = ''
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 10, height: 10, borderRadius: '50%',
        background: '#5ed29c',
        pointerEvents: 'none', zIndex: 99999,
        transition: 'transform 0.05s, width 0.2s, height 0.2s, opacity 0.2s',
        transform: 'translate(-100px, -100px)',
        mixBlendMode: 'difference',
        ...(clicked && { width: 6, height: 6 }),
      }} />
      {/* Circle */}
      <div ref={circleRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 40, height: 40, borderRadius: '50%',
        border: `1.5px solid ${hovered ? '#5ed29c' : 'rgba(94,210,156,0.5)'}`,
        background: hovered ? 'rgba(94,210,156,0.08)' : 'transparent',
        pointerEvents: 'none', zIndex: 99998,
        transform: 'translate(-100px, -100px)',
        transition: 'border-color 0.2s, background 0.2s, width 0.25s, height 0.25s',
        ...(hovered && { width: 56, height: 56 }),
        ...(clicked && { width: 32, height: 32 }),
      }} />
    </>
  )
}
