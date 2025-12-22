import type { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  animation?: AnimationType;
  staggerDelay?: number;
  staggerIndex?: number;
}

const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'animate-fadeInUp',
  'fade-left': 'animate-fadeLeft',
  'fade-right': 'animate-fadeRight',
  'fade-in': 'animate-fadeIn',
  'scale': 'animate-scaleIn',
};

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  animation = 'fade-up',
  staggerDelay = 0,
  staggerIndex = 0,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const totalDelay = delay + (staggerIndex * staggerDelay);
  const animationClass = animationClasses[animation];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${
        isVisible ? animationClass : 'opacity-0'
      } ${className}`}
      style={{
        transitionDelay: `${totalDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}
