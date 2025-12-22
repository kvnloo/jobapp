import type { Profile } from '../../data/profile';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface AboutSectionProps {
  profile: Profile;
  className?: string;
}

export function AboutSection({ profile, className = '' }: AboutSectionProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative mx-auto grid h-auto w-full grid-cols-4 gap-x-4 lg:grid-cols-12 lg:gap-x-6 my-20 bg-transparent px-4 lg:mt-20 lg:px-9 lg:mb-30 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {/* Section Header */}
      <div className="col-span-full mb-12">
        <div className="text-pretty font-mono text-[14px] leading-[100%] tracking-[-0.0175rem] inline-flex items-center uppercase gap-3">
          <div
            className="size-2 transform-gpu rounded-full border will-change-[background-color]"
            style={{ backfaceVisibility: 'hidden', backgroundColor: 'var(--color-accent-200)' }}
          ></div>
          <p className="whitespace-nowrap text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
            About Me
          </p>
        </div>
        <h2 className="text-foreground font-normal text-[30px] leading-[100%] tracking-[-0.05625rem] lg:tracking-[-0.09rem] mt-4 lg:text-4xl xl:text-5xl">
          Background
        </h2>
      </div>

      {/* Content */}
      <div className="col-span-full lg:col-span-8">
        {/* Bio */}
        <div className="border border-base-700 rounded-md bg-dark-base-secondary p-8 mb-8">
          <p className="text-pretty font-mono text-[16px] leading-[150%] tracking-[-0.02rem] text-base-400">
            {profile.bio}
          </p>
        </div>

        {/* Current Role Highlight */}
        <div className="border border-base-700 rounded-md bg-dark-base-secondary p-8 mb-8">
          <div className="mb-4">
            <div className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-500 mb-2">
              Current Role
            </div>
            <h3 className="text-foreground font-normal text-[20px] leading-[120%] tracking-normal">
              {profile.currentRole.title} at {profile.currentRole.company}
            </h3>
          </div>
          <p className="text-pretty font-mono text-[14px] leading-[150%] tracking-[-0.0175rem] text-base-400">
            {profile.currentRole.description}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <a
            data-slot="button"
            className="group relative inline-flex w-max cursor-pointer items-center justify-center border transition-colors duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&_*]:transition-colors [&_*]:duration-150 bg-light-base-secondary hover:bg-dark-base-primary focus-visible:bg-dark-base-primary [&_*]:text-dark-base-primary hover:[&_*]:text-light-base-secondary focus-visible:[&_*]:text-light-base-secondary hover:border-base-600 focus-visible:border-base-600 focus-visible:outline-light-base-secondary overflow-clip rounded-sm border-transparent focus-visible:outline focus-visible:outline-offset-4 h-[40px] px-6"
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10 flex items-center uppercase gap-2">
              <p className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
                GitHub
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
            className="group relative inline-flex w-max cursor-pointer items-center justify-center border transition-colors duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&_*]:transition-colors [&_*]:duration-150 bg-light-base-secondary hover:bg-dark-base-primary focus-visible:bg-dark-base-primary [&_*]:text-dark-base-primary hover:[&_*]:text-light-base-secondary focus-visible:[&_*]:text-light-base-secondary hover:border-base-600 focus-visible:border-base-600 focus-visible:outline-light-base-secondary overflow-clip rounded-sm border-transparent focus-visible:outline focus-visible:outline-offset-4 h-[40px] px-6"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10 flex items-center uppercase gap-2">
              <p className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
                LinkedIn
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
            className="group relative inline-flex w-max cursor-pointer items-center justify-center border border-transparent transition-colors duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&_*]:transition-colors [&_*]:duration-150 bg-base-1000 light:bg-dark-base-primary [&_*]:text-light-base-primary hover:bg-light-base-secondary focus-visible:bg-light-base-secondary hover:[&_*]:text-dark-base-primary focus-visible:[&_*]:text-dark-base-primary hover:outline-light-base-secondary focus-visible:outline-light-base-secondary light:border-base-700 overflow-clip rounded-sm focus-visible:outline focus-visible:outline-offset-4 h-[40px] px-6"
            href={`mailto:${profile.links.email}`}
          >
            <span className="relative z-10 flex items-center uppercase gap-2">
              <p className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
                Email
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
        </div>
      </div>
    </section>
  );
}
