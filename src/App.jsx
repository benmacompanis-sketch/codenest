import { LenisProvider } from './context/lenis'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import HowItWorksSection from './components/HowItWorksSection'
import CTASection from './components/CTASection'
import ScrollProgress from './components/ScrollProgress'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  return (
    <LenisProvider>
      <div className="relative bg-dark grain overflow-x-hidden">
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
  )
}
