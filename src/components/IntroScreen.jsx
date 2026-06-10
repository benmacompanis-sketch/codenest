import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function IntroScreen({ onComplete }) {
  const containerRef = useRef(null)
  const videoRef     = useRef(null)
  const flashRef     = useRef(null)
  const [gone, setGone] = useState(false)

  const finish = () => {
    document.body.style.overflow = ''
    setGone(true)
    onComplete?.()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fallback = setTimeout(finish, 12000)

    const video = videoRef.current
    if (!video) return

    const onEnded = () => {
      gsap.to(flashRef.current, { opacity: 1, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0, duration: 0.5,
            onComplete: () => { clearTimeout(fallback); finish() }
          })
        }
      })
    }

    video.addEventListener('ended', onEnded)
    return () => {
      video.removeEventListener('ended', onEnded)
      clearTimeout(fallback)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#080808',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <video
        ref={videoRef}
        src="/codenest/intro.mp4"
        autoPlay
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Flash overlay for transition */}
      <div ref={flashRef} style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #5ed29c 50%, #080808 100%)',
        opacity: 0, pointerEvents: 'none', zIndex: 10,
      }} />
    </div>
  )
}
