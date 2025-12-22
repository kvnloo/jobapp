import type { SkillCategory } from '../../data/skills';
import { ScrollReveal } from '../shared/ScrollReveal';

interface SkillsSectionProps {
  skills: SkillCategory[];
  className?: string;
}

export function SkillsSection({ skills, className = '' }: SkillsSectionProps) {
  return (
    <section
      id="skills"
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
            Technical Skills
          </p>
        </div>
        <h2 className="text-foreground font-normal text-[30px] leading-[100%] tracking-[-0.05625rem] lg:tracking-[-0.09rem] mt-4 lg:text-4xl xl:text-5xl">
          Skills & Technologies
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="col-span-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, categoryIndex) => (
          <ScrollReveal key={category.name} delay={categoryIndex * 100} animation="fade-up">
            <div className="border border-base-700 rounded-md bg-dark-base-secondary p-6">
              {/* Category Header */}
              <div className="mb-4">
                <h3 className="text-foreground font-normal text-[18px] leading-[100%] tracking-normal">
                  {category.name}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase px-2 py-1 rounded-sm bg-base-1000 text-base-400 border border-base-700 hover:border-base-500 hover:text-accent-200 transition-all duration-150 hover:scale-105"
                    style={{
                      animationDelay: `${(categoryIndex * 100) + (skillIndex * 30)}ms`,
                      opacity: 0,
                      animation: 'fadeIn 0.3s ease-out forwards'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
