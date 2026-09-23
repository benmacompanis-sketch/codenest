import { useCallback, useEffect, useState } from 'react'
import { LanguageProvider } from './i18n'
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
import Footer from './components/Footer'
import LegalPage from './components/LegalPage'
import { LEGAL_PAGES } from './legal'

const legalFromHash = () => LEGAL_PAGES[window.location.hash] ?? null

export default function App() {
  const [legal, setLegal] = useState(legalFromHash)
  // Someone opening a shared link to the privacy policy wants to read it, not watch the intro.
  const [introComplete, setIntroComplete] = useState(() => legalFromHash() !== null)

  useEffect(() => {
    const onHash = () => setLegal(legalFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const closeLegal = useCallback(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setLegal(null)
  }, [])

  return (
    <LanguageProvider>
      {!introComplete && <IntroScreen onComplete={() => setIntroComplete(true)} />}
      <LenisProvider>
        <div style={{
          background: '#080808',
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}>
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
          <Footer />
          <FloatingWhatsApp />
        </div>
        {legal && <LegalPage page={legal} onClose={closeLegal} />}
      </LenisProvider>
    </LanguageProvider>
  )
}
