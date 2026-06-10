import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    })
    setLenis(l)

    // Sync Lenis with GSAP ScrollTrigger
    l.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { l.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    return () => {
      l.destroy()
      gsap.ticker.remove((time) => { l.raf(time * 1000) })
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)
