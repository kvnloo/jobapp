import { useState } from 'react';
import type { Project } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from '../shared/ScrollReveal';

interface ProjectsSectionProps {
  projects: Project[];
  className?: string;
}

type CategoryFilter = 'all' | 'ai' | 'mobile' | 'frontend' | 'devops';

export function ProjectsSection({ projects, className = '' }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'mobile', label: 'Mobile Development' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'devops', label: 'DevOps & Infrastructure' }
  ];

  return (
    <section
      id="projects"
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
            Featured Work
          </p>
        </div>
        <h2 className="text-foreground font-normal text-[30px] leading-[100%] tracking-[-0.05625rem] lg:tracking-[-0.09rem] mt-4 lg:text-4xl xl:text-5xl">
          Projects
        </h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="col-span-full mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase px-4 py-2 rounded-sm transition-colors duration-150 border ${
                activeCategory === category.id
                  ? 'bg-light-base-secondary border-transparent text-dark-base-primary'
                  : 'bg-base-1000 border-base-700 text-base-400 hover:border-base-500 hover:text-base-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="col-span-full grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 100}>
            <ProjectCard {...project} />
          </ScrollReveal>
        ))}
      </div>

      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-pretty font-mono text-[14px] leading-[120%] tracking-[-0.0175rem] text-base-500">
            No projects found in this category.
          </p>
        </div>
      )}
    </section>
  );
}
