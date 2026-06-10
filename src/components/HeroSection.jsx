import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Hls from 'hls.js'

const HLS_SRC =
  'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

function BackgroundVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS on Safari / iOS
      video.src = HLS_SRC
    }

    return () => {
      if (hls) hls.destroy()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0.6 }}
      autoPlay
      muted
      loop
      playsInline
      crossOrigin="anonymous"
    />
  )
}

function GlassCard() {
  return (
    <div
      className="glass-card rounded-2xl flex flex-col justify-between p-5 text-left"
      style={{ width: 200, height: 200, transform: 'translateY(-50px)' }}
    >
      {/* Inner content sits above the ::before border overlay */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <span
          className="font-inter text-white/50 tracking-widest"
          style={{ fontSize: 14 }}
        >
          [ 2025 ]
        </span>

        <div>
          <p
            className="text-white font-inter font-semibold leading-snug mb-2"
            style={{ fontSize: 18 }}
          >
            Taught by{' '}
            <em className="font-instrument italic not-italic" style={{ fontStyle: 'italic' }}>
              Industry
            </em>{' '}
            Professionals
          </p>
          <p
            className="text-white/50 font-inter leading-relaxed"
            style={{ fontSize: 11 }}
          >
            Learn from experts who built real-world products at top tech companies worldwide.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Background video ─────────────────────────────────────── */}
      <BackgroundVideo />

      {/* ── Left-to-right dark gradient ──────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #070b0a 0%, transparent 60%)' }}
      />

      {/* ── Bottom-to-top dark gradient ──────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #070b0a 0%, transparent 55%)' }}
      />

      {/* ── Vertical grid lines (desktop only) ───────────────────── */}
      <div className="absolute inset-0 z-10 hidden md:block pointer-events-none">
        <div className="absolute inset-y-0 left-1/4 w-px bg-white/10" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-white/10" />
      </div>

      {/* ── Central ellipse glow ─────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 z-10 flex justify-center pointer-events-none">
        <svg
          width="1100"
          height="280"
          viewBox="0 0 1100 280"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="center-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>
          <ellipse
            cx="550"
            cy="90"
            rx="440"
            ry="110"
            fill="rgba(20, 200, 140, 0.22)"
            filter="url(#center-glow)"
          />
        </svg>
      </div>

      {/* ── Hero content ─────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 md:px-12">

        {/* Liquid glass card — translateY(-50px) per spec */}
        <GlassCard />

        {/* Eyebrow */}
        <p
          className="font-jakarta font-bold uppercase tracking-widest mb-4"
          style={{ fontSize: 11, color: '#5ed29c' }}
        >
          Career-Ready Curriculum
        </p>

        {/* Main headline */}
        <h1
          className="font-inter font-extrabold uppercase tracking-tight leading-none mb-6 text-white"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          LAUNCH YOUR CODING CAREER
          <span style={{ color: '#5ed29c' }}>.</span>
        </h1>

        {/* Description */}
        <p
          className="font-inter mb-10"
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 512,
            lineHeight: 1.75,
          }}
        >
          Master in-demand coding skills through hands-on projects, expert
          mentorship, and a curriculum built for the real world. Go from
          complete beginner to job-ready developer.
        </p>

        {/* CTA button */}
        <button
          className="flex items-center gap-2 rounded-full font-inter font-bold uppercase text-sm px-8 py-3.5 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(94,210,156,0.4)]"
          style={{ background: '#5ed29c', color: '#070b0a' }}
        >
          Get Started
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  )
}
