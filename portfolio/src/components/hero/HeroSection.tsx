import type { Profile } from '../../data/profile';
import { RiveAnimation } from '../shared/RiveAnimation';

interface HeroSectionProps {
  profile: Profile;
  className?: string;
}

export function HeroSection({ profile, className = '' }: HeroSectionProps) {
  return (
    <section id="hero" className={`relative mx-auto grid h-auto w-full grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-5 lg:grid-cols-12 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 my-12 sm:my-16 md:my-20 bg-transparent px-4 md:px-6 first:mt-4 md:mt-16 lg:mt-20 xl:mt-24 lg:px-9 xl:px-12 2xl:px-16 first:lg:mt-10 lg:mb-[7.5rem] xl:mb-[6rem] 2xl:mb-[6.5rem] md:h-[calc(100dvh-140px)] lg:h-[calc(100dvh-160px)] md:max-h-[650px] lg:max-h-[725px] xl:max-h-[800px] 2xl:max-h-[850px] md:min-h-[500px] lg:min-h-[620px] xl:min-h-[680px] overflow-x-hidden ${className}`}>

      {/* Floating Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-accent-200 rounded-full animate-float-1 opacity-30" />
        <div className="absolute top-40 left-[25%] w-1.5 h-1.5 bg-accent-100 rounded-full animate-float-2 opacity-20" />
        <div className="absolute top-60 left-[15%] w-0.5 h-0.5 bg-base-400 rounded-full animate-float-3 opacity-40" />
        <div className="absolute top-32 right-[20%] w-1 h-1 bg-accent-300 rounded-full animate-float-2 opacity-25" />
        <div className="absolute top-52 right-[30%] w-0.5 h-0.5 bg-base-500 rounded-full animate-float-1 opacity-35" />
        <div className="absolute bottom-40 left-[35%] w-1.5 h-1.5 bg-accent-200 rounded-full animate-float-3 opacity-20" />
      </div>

      <div className="z-10 col-span-4 md:col-span-4 flex max-w-[650px] flex-col justify-between lg:col-span-6 md:max-w-none lg:max-w-[600px] xl:max-w-[680px] 2xl:max-w-[750px]">
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
          <p className="text-pretty font-mono text-[16px] leading-[140%] tracking-[-0.02rem] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] md:tracking-[-0.02125rem] lg:tracking-[-0.0225rem] text-base-300 md:max-w-[400px] lg:max-w-[510px] xl:max-w-[580px] 2xl:max-w-[640px] animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {profile.tagline}
          </p>
        </div>

        {/* CTA Buttons - Phase 5 (9-12s) */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row lg:mt-0">
          <a
            data-slot="button"
            className="btn-slide-pattern group relative inline-flex w-max cursor-pointer items-center justify-center border transition-all duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&amp;_*]:transition-colors [&amp;_*]:duration-150 bg-light-base-secondary hover:bg-dark-base-primary focus-visible:bg-dark-base-primary [&amp;_*]:text-dark-base-primary hover:[&amp;_*]:text-light-base-secondary focus-visible:[&amp;_*]:text-light-base-secondary hover:border-base-600 focus-visible:border-base-600 focus-visible:outline-light-base-secondary overflow-clip rounded-sm border-transparent focus-visible:outline focus-visible:outline-offset-4 min-h-[44px] h-[44px] px-6 hover:scale-[1.02] hover:shadow-lg animate-phase-4a"
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
            className="group relative inline-flex w-max cursor-pointer items-center justify-center border border-base-700 transition-all duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&amp;_*]:transition-colors [&amp;_*]:duration-150 bg-transparent [&amp;_*]:text-light-base-primary hover:border-accent-200 focus-visible:border-accent-200 hover:[&amp;_*]:text-accent-200 focus-visible:[&amp;_*]:text-accent-200 hover:outline-light-base-secondary focus-visible:outline-light-base-secondary overflow-clip rounded-sm focus-visible:outline focus-visible:outline-offset-4 min-h-[44px] h-[44px] px-6 animate-phase-4b"
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

      {/* Right side - Rive Hero Animation - responsive sizing */}
      <div className="col-span-4 md:col-span-4 lg:col-span-6 relative flex items-center justify-center animate-phase-5-container mt-8 sm:mt-4 md:mt-0">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[560px] 2xl:h-[620px] flex items-center justify-center max-w-full">
          <RiveAnimation
            src="/assets/rive/factory_hero_alt.riv"
            className="w-full h-full object-contain"
            autoplay={true}
          />
        </div>
      </div>

    </section>
  );
}
