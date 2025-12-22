import { useState, useEffect, useRef } from 'react';
import { RiveAnimation } from './RiveAnimation';

interface ShowcaseSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  riveFile: string;
}

const sections: ShowcaseSection[] = [
  {
    id: 'terminal',
    number: '01',
    title: 'TERMINAL / IDE',
    subtitle: 'Integrated development environment',
    riveFile: '/assets/rive/factory_anim_1.riv',
  },
  {
    id: 'browser',
    number: '02',
    title: 'WEB BROWSER',
    subtitle: 'Preview and test in real-time',
    riveFile: '/assets/rive/factory_anim_2.riv',
  },
  {
    id: 'debugging',
    number: '03',
    title: 'DEBUGGING',
    subtitle: 'Intelligent error detection',
    riveFile: '/assets/rive/factory_anim_3.riv',
  },
  {
    id: 'deployment',
    number: '04',
    title: 'DEPLOYMENT',
    subtitle: 'One-click production deployment',
    riveFile: '/assets/rive/factory_anim_4.riv',
  },
  {
    id: 'collaboration',
    number: '05',
    title: 'COLLABORATION',
    subtitle: 'Real-time team workflows',
    riveFile: '/assets/rive/factory_anim_5.riv',
  },
];

export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled into the container
      const scrolled = windowHeight - rect.top;
      const totalScrollable = containerHeight + windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sectionCount = sections.length;
      const sectionProgress = progress * sectionCount;
      const newActiveIndex = Math.min(
        sectionCount - 1,
        Math.floor(sectionProgress)
      );

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const activeSection = sections[activeIndex];

  return (
    <section
      ref={containerRef}
      id="products"
      className="relative min-h-[300vh] bg-dark-base-primary"
    >
      {/* Sticky container for animation and indicators */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-9 grid grid-cols-12 gap-6">
          {/* Left side - Section indicators */}
          <div className="col-span-4 lg:col-span-3 flex flex-col justify-center">
            <div className="space-y-6">
              {sections.map((section, index) => {
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;

                return (
                  <div
                    key={section.id}
                    ref={(el) => { sectionRefs.current[index] = el; }}
                    className={`group cursor-pointer transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Progress indicator */}
                      <div className="relative flex flex-col items-center">
                        {/* Number circle */}
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs transition-all duration-300 ${
                            isActive
                              ? 'border-accent-200 text-accent-200 bg-accent-200/10'
                              : isPassed
                              ? 'border-base-500 text-base-500'
                              : 'border-base-700 text-base-600'
                          }`}
                        >
                          {section.number}
                        </div>

                        {/* Connecting line */}
                        {index < sections.length - 1 && (
                          <div
                            className={`w-0.5 h-12 mt-2 transition-all duration-500 ${
                              isPassed ? 'bg-accent-200/50' : 'bg-base-700'
                            }`}
                          />
                        )}
                      </div>

                      {/* Section text */}
                      <div className="pt-1">
                        <h3
                          className={`font-mono text-sm uppercase tracking-wider transition-colors duration-300 ${
                            isActive ? 'text-accent-200' : 'text-base-400'
                          }`}
                        >
                          {section.title}
                        </h3>
                        <p
                          className={`font-mono text-xs mt-1 transition-all duration-300 ${
                            isActive
                              ? 'text-base-400 opacity-100'
                              : 'text-base-600 opacity-0'
                          }`}
                        >
                          {section.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll progress bar */}
            <div className="mt-12 w-full max-w-[200px]">
              <div className="h-0.5 bg-base-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-200 transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-base-600 uppercase">
                <span>Scroll</span>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Right side - Rive animation */}
          <div className="col-span-8 lg:col-span-9 flex items-center justify-center">
            <div className="relative w-full h-[60vh] max-h-[600px]">
              {/* Animation container with fade transition */}
              <div
                key={activeSection.id}
                className="absolute inset-0 animate-fadeIn"
              >
                <RiveAnimation
                  src={activeSection.riveFile}
                  className="w-full h-full"
                  autoplay={true}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -inset-4 border border-base-800 rounded-lg pointer-events-none opacity-30" />
              <div className="absolute -inset-8 border border-base-900 rounded-lg pointer-events-none opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
