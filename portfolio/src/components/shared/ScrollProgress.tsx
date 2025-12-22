import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay visibility until hero animation starts settling
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[2px] z-[100] bg-base-900/50 backdrop-blur-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Main progress bar */}
      <div
        className="h-full transition-all duration-75 ease-out relative overflow-hidden"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--color-accent-200), var(--color-accent-100))',
        }}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            animation: progress > 0 ? 'shimmer 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* Glow effect at the end */}
      <div
        className="absolute top-0 h-full w-4 pointer-events-none transition-opacity duration-300"
        style={{
          left: `calc(${progress}% - 8px)`,
          background: 'radial-gradient(circle, var(--color-accent-200) 0%, transparent 70%)',
          opacity: progress > 1 ? 0.8 : 0,
          filter: 'blur(2px)',
        }}
      />

      {/* Percentage indicator on hover/scroll */}
      <div
        className="absolute top-full left-0 mt-1 px-2 py-0.5 bg-dark-base-primary/90 backdrop-blur-sm border border-base-700 rounded text-[10px] font-mono text-accent-200 transition-all duration-300"
        style={{
          left: `${Math.min(progress, 95)}%`,
          opacity: progress > 5 && progress < 95 ? 0.8 : 0,
          transform: 'translateX(-50%)',
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}
