import './App.css'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { ScrollShowcase } from './components/shared/ScrollShowcase'
import { ScrollProgress } from './components/shared/ScrollProgress'
import { SectionDots } from './components/shared/SectionDots'
import { TrustedByMarquee } from './components/hero/TrustedByMarquee'
import { profile } from './data/profile'

function App() {
  return (
    <div className="mx-auto min-h-screen max-w-[1920px] scroll-smooth bg-background text-foreground flex flex-col overflow-x-clip antialiased">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Section Navigation Dots */}
      <SectionDots />

      {/* Sticky Header */}
      <Header className="page-load-header" />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection profile={profile} className="page-load-hero" />

        {/* Trusted By Marquee */}
        <TrustedByMarquee />

        {/* Scroll Showcase - Factory.ai style (Projects, Experience, Skills, Background) */}
        <ScrollShowcase />
      </main>

      {/* Footer */}
      <Footer className="page-load-content" />
    </div>
  )
}

export default App
