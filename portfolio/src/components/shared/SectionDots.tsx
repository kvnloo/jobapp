import { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'showcase', label: 'About' },
];

export function SectionDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const prevActiveRef = useRef('hero');

  // Delayed entrance after page load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll progress within current section
  useEffect(() => {
    const handleScroll = () => {
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      const currentEl = document.getElementById(activeSection);
      const nextSection = sections[currentIndex + 1];
      const nextEl = nextSection ? document.getElementById(nextSection.id) : null;

      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const sectionHeight = currentEl.offsetHeight;
        const scrolled = Math.max(0, -rect.top);
        const progress = nextEl
          ? Math.min(1, scrolled / sectionHeight)
          : Math.min(1, scrolled / (sectionHeight * 0.5));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prevActiveRef.current = activeSection;
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const activeIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <nav
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      aria-label="Section Navigation"
    >
      {/* Background blur */}
      <div className="absolute -inset-4 bg-dark-base-primary/30 backdrop-blur-sm rounded-full" />

      {/* Progress line connecting dots */}
      <div className="absolute right-[3px] top-0 bottom-0 w-[2px] bg-base-800 overflow-hidden rounded-full">
        {/* Base progress - fills as you scroll */}
        <div
          className="absolute top-0 left-0 w-full bg-base-600 transition-all duration-300 ease-out"
          style={{
            height: `${((activeIndex + scrollProgress) / sections.length) * 100}%`,
          }}
        />
        {/* Active section highlight */}
        <div
          className="absolute left-0 w-full bg-accent-200 transition-all duration-500 ease-out"
          style={{
            top: `${(activeIndex / sections.length) * 100}%`,
            height: `${(1 / sections.length) * 100}%`,
            opacity: 0.8,
          }}
        />
      </div>

      {/* Section dots */}
      <div className="relative flex flex-col gap-6">
        {sections.map(({ id, label }, index) => {
          const isActive = activeSection === id;
          const isHovered = hoveredSection === id;
          const isPassed = index < activeIndex;
          const isTransitioning = prevActiveRef.current !== activeSection && (id === activeSection || id === prevActiveRef.current);

          return (
            <a
              key={id}
              href={`#${id}`}
              className="group relative flex items-center justify-end gap-3"
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
              aria-label={`Go to ${label}`}
              aria-current={isActive ? 'true' : 'false'}
            >
              {/* Section label tooltip - slides in on hover */}
              <span
                className={`text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase px-2 py-1 rounded bg-dark-base-primary/80 backdrop-blur-sm border border-base-700 whitespace-nowrap transition-all duration-300 ease-out ${
                  isHovered || isActive
                    ? 'opacity-100 translate-x-0 scale-100'
                    : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
                }`}
                style={{
                  color: isActive ? 'var(--color-accent-200)' : 'var(--color-base-400)',
                }}
              >
                {label}
              </span>

              {/* Dot container with morphing animation */}
              <div className="relative flex items-center justify-center">
                {/* Outer ping ring on active */}
                {isActive && (
                  <div
                    className="absolute inset-0 -m-2 rounded-full border border-accent-200/30"
                    style={{
                      animation: 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }}
                  />
                )}

                {/* Secondary pulse ring */}
                {isActive && (
                  <div
                    className="absolute inset-0 -m-1 rounded-full bg-accent-200/20"
                    style={{
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                )}

                {/* Main dot with morph effect */}
                <div
                  className={`relative rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? 'w-3 h-3 bg-accent-200'
                      : isHovered
                      ? 'w-2.5 h-2.5 bg-base-300'
                      : isPassed
                      ? 'w-2 h-2 bg-base-500'
                      : 'w-2 h-2 bg-base-600'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? '0 0 12px var(--color-accent-200), 0 0 24px rgba(238, 96, 24, 0.4)'
                      : isHovered
                      ? '0 0 8px var(--color-base-400)'
                      : 'none',
                    transform: isTransitioning ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  {/* Inner glow for active dot */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                  )}
                </div>

                {/* Connecting line glow between dots */}
                {index < sections.length - 1 && isPassed && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-base-500 to-transparent"
                  />
                )}
              </div>
            </a>
          );
        })}
      </div>

      {/* Current section indicator */}
      <div
        className="absolute -left-16 top-1/2 -translate-y-1/2 text-base-500 font-mono text-[10px] uppercase tracking-wider transition-all duration-300"
        style={{
          opacity: hoveredSection ? 0 : 0.5,
        }}
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
      </div>
    </nav>
  );
}
