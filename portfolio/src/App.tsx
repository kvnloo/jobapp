import { useEffect } from 'react'
import './App.css'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { ScrollShowcase } from './components/shared/ScrollShowcase'
import { ScrollProgress } from './components/shared/ScrollProgress'
import { SectionDots } from './components/shared/SectionDots'
import { TrustedByMarquee } from './components/hero/TrustedByMarquee'
import { preloadRiveAnimation } from './components/shared/RiveAnimation'
import { profile } from './data/profile'

// Additional Rive animations to preload after initial page load
const SECONDARY_RIVE_ANIMATIONS = [
  '/assets/rive/factory_anim_1.riv',
  '/assets/rive/factory_anim_2.riv',
  '/assets/rive/factory_anim_3.riv',
  '/assets/rive/factory_anim_4.riv',
  '/assets/rive/factory_anim_5.riv',
]

function App() {
  // Preload secondary animations after initial page load
  useEffect(() => {
    // Use requestIdleCallback for non-critical preloading
    const preloadSecondaryAssets = () => {
      SECONDARY_RIVE_ANIMATIONS.forEach((src) => {
        preloadRiveAnimation(src)
      })
    }

    // Delay preloading to prioritize initial render
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadSecondaryAssets, { timeout: 3000 })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(preloadSecondaryAssets, 2000)
    }
  }, [])
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
