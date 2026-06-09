import { useState } from 'react'
import { LenisProvider } from './context/lenis'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import HowItWorksSection from './components/HowItWorksSection'
import CTASection from './components/CTASection'
import ScrollProgress from './components/ScrollProgress'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import IntroScreen from './components/IntroScreen'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <IntroScreen onComplete={() => setIntroComplete(true)} />
      <LenisProvider>
        <div
          className="relative bg-dark grain overflow-x-hidden"
          style={{
            opacity: introComplete ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <ScrollProgress />
          <Navigation />
          <main>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <HowItWorksSection />
            <CTASection />
          </main>
          <FloatingWhatsApp />
        </div>
      </LenisProvider>
    </>
  )
}
