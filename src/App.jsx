import { useState } from 'react'
import { LenisProvider } from './context/lenis'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import ProcessSection from './components/ProcessSection'
import AboutSection from './components/AboutSection'
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
          className="relative overflow-x-hidden"
          style={{ background: '#f8f6f1', opacity: introComplete ? 1 : 0, transition: 'opacity 0.6s ease' }}
        >
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <main>
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <ProcessSection />
            <AboutSection />
            <CTASection />
          </main>
          <FloatingWhatsApp />
        </div>
      </LenisProvider>
    </>
  )
}
