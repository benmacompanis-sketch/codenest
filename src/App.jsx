import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark overflow-hidden">
      <Navigation />
      <HeroSection />
    </div>
  )
}
