import type { Profile } from '../../data/profile';
import { RiveAnimation } from '../shared/RiveAnimation';

interface HeroSectionProps {
  profile: Profile;
  className?: string;
}

export function HeroSection({ profile, className = '' }: HeroSectionProps) {
  return (
    <section id="hero" className={`relative mx-auto grid h-auto w-full grid-cols-4 gap-x-4 lg:grid-cols-12 lg:gap-x-6 my-20 bg-transparent px-4 first:mt-4 lg:mt-20 lg:px-9 first:lg:mt-10 lg:mb-[7.5rem] lg:h-[calc(100dvh-160px)] lg:max-h-[725px] lg:min-h-[620px] xl:mb-[5.5rem] ${className}`}>

      {/* Floating Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-accent-200 rounded-full animate-float-1 opacity-30" />
        <div className="absolute top-40 left-[25%] w-1.5 h-1.5 bg-accent-100 rounded-full animate-float-2 opacity-20" />
        <div className="absolute top-60 left-[15%] w-0.5 h-0.5 bg-base-400 rounded-full animate-float-3 opacity-40" />
        <div className="absolute top-32 right-[20%] w-1 h-1 bg-accent-300 rounded-full animate-float-2 opacity-25" />
        <div className="absolute top-52 right-[30%] w-0.5 h-0.5 bg-base-500 rounded-full animate-float-1 opacity-35" />
        <div className="absolute bottom-40 left-[35%] w-1.5 h-1.5 bg-accent-200 rounded-full animate-float-3 opacity-20" />
      </div>

      <div className="z-10 col-span-4 flex max-w-[650px] flex-col justify-between lg:col-span-6 lg:max-w-none">
        <div className="flex flex-col gap-y-4 lg:gap-y-6">
          {/* Vision Badge */}
          <div className="inline-flex items-center gap-3 pt-4 animate-fadeIn">
            <div
              className="size-2 rounded-full animate-pulse-glow"
              style={{ backgroundColor: 'var(--color-accent-200)' }}
            />
            <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-400">
              Vision
            </p>
          </div>

          {/* Description - directly under Vision */}
          <p className="text-pretty font-mono text-[16px] leading-[140%] tracking-[-0.02rem] lg:text-[18px] lg:tracking-[-0.0225rem] text-base-300 lg:max-w-[510px] animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {profile.tagline}
          </p>
        </div>

        {/* CTA Buttons - Phase 5 (9-12s) */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row lg:mt-0">
          <a
            data-slot="button"
            className="btn-slide-pattern group relative inline-flex w-max cursor-pointer items-center justify-center border transition-all duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&amp;_*]:transition-colors [&amp;_*]:duration-150 bg-light-base-secondary hover:bg-dark-base-primary focus-visible:bg-dark-base-primary [&amp;_*]:text-dark-base-primary hover:[&amp;_*]:text-light-base-secondary focus-visible:[&amp;_*]:text-light-base-secondary hover:border-base-600 focus-visible:border-base-600 focus-visible:outline-light-base-secondary overflow-clip rounded-sm border-transparent focus-visible:outline focus-visible:outline-offset-4 h-[40px] px-6 hover:scale-[1.02] hover:shadow-lg animate-phase-4a"
            href="#projects"
          >
            <span className="relative z-10 flex items-center uppercase gap-2">
              <p className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
                View Projects
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </a>

          <a
            data-slot="button"
            className="group relative inline-flex w-max cursor-pointer items-center justify-center border border-base-700 transition-all duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&amp;_*]:transition-colors [&amp;_*]:duration-150 bg-transparent [&amp;_*]:text-light-base-primary hover:border-accent-200 focus-visible:border-accent-200 hover:[&amp;_*]:text-accent-200 focus-visible:[&amp;_*]:text-accent-200 hover:outline-light-base-secondary focus-visible:outline-light-base-secondary overflow-clip rounded-sm focus-visible:outline focus-visible:outline-offset-4 h-[40px] px-6 animate-phase-4b"
            href="#about"
          >
            <span className="relative z-10 flex items-center uppercase">
              <p className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
                Get In Touch
              </p>
            </span>
          </a>
        </div>
      </div>

      {/* Right side - Rive Hero Animation */}
      <div className="col-span-4 lg:col-span-6 relative flex items-center justify-center animate-phase-5-container">
        <div className="relative w-full h-[300px] lg:h-[500px] flex items-center justify-center">
          <RiveAnimation
            src="/assets/rive/factory_hero_alt.riv"
            className="w-full h-full"
            autoplay={true}
          />
        </div>
      </div>

    </section>
  );
}
