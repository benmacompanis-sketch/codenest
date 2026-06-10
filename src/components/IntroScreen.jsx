import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroScreen({ onComplete }) {
  const videoRef = useRef(null)
  const [showCurtain, setShowCurtain] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setShowCurtain(true)
      setTimeout(() => {
        setGone(true)
        onComplete?.()
      }, 900)
    }

    video.addEventListener('ended', handleEnded)

    // Fallback: if video fails to load, skip intro
    video.addEventListener('error', () => {
      setGone(true)
      onComplete?.()
    })

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  if (gone) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
      initial={{ opacity: 1 }}
    >
      <video
        ref={videoRef}
        src="/codenest/intro.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      />

      {/* Split curtain exit */}
      <AnimatePresence>
        {showCurtain && (
          <>
            <motion.div
              key="left"
              style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: '50%', background: '#ffffff', zIndex: 20 }}
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              key="right"
              style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', right: 0, background: '#ffffff', zIndex: 20 }}
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
