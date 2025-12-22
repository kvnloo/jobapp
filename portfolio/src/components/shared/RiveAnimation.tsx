import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';

interface RiveAnimationProps {
  src: string;
  className?: string;
  stateMachine?: string;
  artboard?: string;
  autoplay?: boolean;
  fit?: Fit;
  alignment?: Alignment;
}

export function RiveAnimation({
  src,
  className = '',
  stateMachine,
  artboard,
  autoplay = true,
  fit = Fit.Contain,
  alignment = Alignment.Center,
}: RiveAnimationProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const { RiveComponent } = useRive({
    src,
    stateMachines: stateMachine ? [stateMachine] : undefined,
    artboard,
    autoplay,
    layout: new Layout({
      fit,
      alignment,
    }),
    onLoad: () => {
      setIsLoaded(true);
    },
  });

  // Preload the animation file
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = src;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src]);

  return (
    <div className={`rive-container relative ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-base-700 border-t-accent-200 rounded-full animate-spin" />
        </div>
      )}

      {/* Rive animation with fade-in */}
      <div
        className={`w-full h-full transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <RiveComponent />
      </div>
    </div>
  );
}

// Preload helper for critical animations (call early in app lifecycle)
export function preloadRiveAnimation(src: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.href = src;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}
