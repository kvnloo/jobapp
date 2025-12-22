import type { Experience } from '../../data/experience';
import { TimelineItem } from './TimelineItem';
import { ScrollReveal } from '../shared/ScrollReveal';

interface ExperienceSectionProps {
  experiences: Experience[];
  className?: string;
}

export function ExperienceSection({ experiences, className = '' }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className={`relative mx-auto grid h-auto w-full grid-cols-4 gap-x-4 lg:grid-cols-12 lg:gap-x-6 my-20 bg-transparent px-4 lg:mt-20 lg:px-9 lg:mb-30 ${className}`}
    >
      {/* Section Header */}
      <div className="col-span-full mb-12">
        <div className="text-pretty font-mono text-[14px] leading-[100%] tracking-[-0.0175rem] inline-flex items-center uppercase gap-3">
          <div
            className="size-2 transform-gpu rounded-full border will-change-[background-color]"
            style={{ backfaceVisibility: 'hidden', backgroundColor: 'var(--color-accent-200)' }}
          ></div>
          <p className="whitespace-nowrap text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
            Work History
          </p>
        </div>
        <h2 className="text-foreground font-normal text-[30px] leading-[100%] tracking-[-0.05625rem] lg:tracking-[-0.09rem] mt-4 lg:text-4xl xl:text-5xl">
          Experience
        </h2>
      </div>

      {/* Experience Timeline */}
      <div className="col-span-full space-y-0">
        {experiences.map((experience, index) => (
          <ScrollReveal
            key={experience.id}
            delay={index * 100}
            animation={index % 2 === 0 ? 'fade-left' : 'fade-right'}
          >
            <TimelineItem
              company={experience.company}
              role={experience.role}
              period={experience.period}
              description={experience.description}
              technologies={experience.technologies || []}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
