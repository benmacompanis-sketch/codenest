import { useState, useEffect, useRef, useCallback } from 'react'

const CHARS = 'アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&<>/\\'

export function useTextScramble(text, trigger = true, duration = 1000) {
  const [display, setDisplay] = useState('')
  const frame = useRef(null)

  const scramble = useCallback(() => {
    cancelAnimationFrame(frame.current)
    let start = null

    const tick = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const revealed = Math.floor(progress * text.length)

      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < revealed) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    frame.current = requestAnimationFrame(tick)
  }, [text, duration])

  useEffect(() => {
    if (trigger) scramble()
    return () => cancelAnimationFrame(frame.current)
  }, [trigger, scramble])

  return { display, scramble }
}
