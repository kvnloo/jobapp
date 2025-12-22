import { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';
import { skills } from '../../data/skills';
import { profile } from '../../data/profile';

interface ShowcaseItem {
  number: string;
  title: string;
  id: string;
}

const showcaseItems: ShowcaseItem[] = [
  { number: '01', title: 'Projects', id: 'projects' },
  { number: '02', title: 'Experience', id: 'experience' },
  { number: '03', title: 'Skills', id: 'skills' },
  { number: '04', title: 'Background', id: 'background' },
];

export function ScrollShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sectionHeight = 100; // vh per section

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const windowHeight = window.innerHeight;

      const scrollProgress = -containerTop / windowHeight;
      const newIndex = Math.max(0, Math.min(showcaseItems.length - 1, Math.floor(scrollProgress)));

      const sectionProgress = scrollProgress - Math.floor(scrollProgress);
      setProgress(Math.max(0, Math.min(1, sectionProgress)));

      // Content becomes visible after scrolling 20% into the section
      setIsContentVisible(scrollProgress > 0.2);

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        setSelectedItemIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const targetY = containerRef.current.offsetTop + (index * window.innerHeight) + 10;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Get section header
  const getSectionHeader = () => {
    switch (activeIndex) {
      case 0: return { title: 'Featured Work', subtitle: 'AI engineering, mobile development, and production systems' };
      case 1: return { title: 'Work History', subtitle: 'From AI engineering to enterprise consulting' };
      case 2: return { title: 'Skills & Technologies', subtitle: 'Technical expertise across the stack' };
      case 3: return { title: 'About Me', subtitle: 'Background and contact information' };
      default: return { title: '', subtitle: '' };
    }
  };

  const sectionHeader = getSectionHeader();

  // Get items for current section
  const getCurrentItems = () => {
    switch (activeIndex) {
      case 0: return projects.slice(0, 6);
      case 1: return experience;
      case 2: return skills;
      case 3: return [
        { id: 'bio', title: 'Bio', content: profile.bio },
        { id: 'current-role', title: 'Current Role', content: profile.currentRole },
        { id: 'links', title: 'Connect', content: profile.links },
      ];
      default: return [];
    }
  };

  const currentItems = getCurrentItems();

  // Render detail view (middle panel) - zoomed in on selected item
  const renderDetailView = () => {
    const items = currentItems;
    const selected = items[selectedItemIndex];
    if (!selected) return null;

    switch (activeIndex) {
      case 0: // Projects detail
        const project = selected as typeof projects[0];
        return (
          <div className="border border-base-700 rounded-md bg-dark-base-secondary/80 backdrop-blur-sm p-6">
            <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-accent-200 mb-2">
              {String(selectedItemIndex + 1).padStart(2, '0')} - {project.subtitle}
            </div>
            <h3 className="text-foreground font-normal text-[20px] leading-[120%] tracking-[-0.025rem] mb-4">
              {project.title}
            </h3>
            <p className="text-pretty font-mono text-[13px] leading-[160%] tracking-[-0.01625rem] text-base-400 mb-4">
              {project.summary}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {project.metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-accent-200 font-mono text-[14px]">{metric.value}</span>
                    <span className="text-base-500 font-mono text-[11px] uppercase">{metric.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase px-2 py-1 rounded-sm bg-base-1000 text-base-400 border border-base-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            {project.links && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-base-800">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base-400 hover:text-accent-200 transition-colors font-mono text-[11px] uppercase flex items-center gap-1"
                  >
                    GitHub →
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base-400 hover:text-accent-200 transition-colors font-mono text-[11px] uppercase flex items-center gap-1"
                  >
                    Demo →
                  </a>
                )}
              </div>
            )}
          </div>
        );

      case 1: // Experience detail
        const exp = selected as typeof experience[0];
        return (
          <div className="border border-base-700 rounded-md bg-dark-base-secondary/80 backdrop-blur-sm p-6">
            <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-accent-200 mb-2">
              {exp.period}
            </div>
            <h3 className="text-foreground font-normal text-[20px] leading-[120%] tracking-[-0.025rem] mb-1">
              {exp.role}
            </h3>
            <p className="text-base-400 font-mono text-[14px] mb-4">
              {exp.company} {exp.location && `• ${exp.location}`}
            </p>

            <ul className="space-y-2 mb-4">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-pretty font-mono text-[12px] leading-[160%] tracking-[-0.015rem] text-base-400 flex gap-2">
                  <span className="text-accent-200 mt-0.5">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            {exp.technologies && (
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-base-800">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase px-2 py-1 rounded-sm bg-base-1000 text-base-400 border border-base-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 2: // Skills detail
        const skillCategory = selected as typeof skills[0];
        return (
          <div className="border border-base-700 rounded-md bg-dark-base-secondary/80 backdrop-blur-sm p-6">
            <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-accent-200 mb-2">
              Expertise Area
            </div>
            <h3 className="text-foreground font-normal text-[20px] leading-[120%] tracking-[-0.025rem] mb-4">
              {skillCategory.name}
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {skillCategory.skills.map((skill) => (
                <div
                  key={skill}
                  className="text-pretty font-mono text-[12px] leading-[140%] tracking-[-0.015rem] text-base-400 py-2 px-3 bg-base-1000 border border-base-700 rounded-sm hover:border-accent-200/50 hover:text-base-200 transition-all"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Background detail
        const backgroundItem = selected as { id: string; title: string; content: unknown };
        if (backgroundItem.id === 'bio') {
          return (
            <div className="border border-base-700 rounded-md bg-dark-base-secondary/80 backdrop-blur-sm p-6">
              <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-accent-200 mb-2">
                About
              </div>
              <h3 className="text-foreground font-normal text-[20px] leading-[120%] tracking-[-0.025rem] mb-4">
                Bio
              </h3>
              <p className="text-pretty font-mono text-[13px] leading-[170%] tracking-[-0.01625rem] text-base-400">
                {backgroundItem.content as string}
              </p>
            </div>
          );
        } else if (backgroundItem.id === 'current-role') {
          const role = backgroundItem.content as typeof profile.currentRole;
          return (
            <div className="border border-base-700 rounded-md bg-dark-base-secondary/80 backdrop-blur-sm p-6">
              <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-accent-200 mb-2">
                Current Position
              </div>
              <h3 className="text-foreground font-normal text-[20px] leading-[120%] tracking-[-0.025rem] mb-1">
                {role.title}
              </h3>
              <p className="text-base-400 font-mono text-[14px] mb-4">
                {role.company}
              </p>
              <p className="text-pretty font-mono text-[13px] leading-[170%] tracking-[-0.01625rem] text-base-400">
                {role.description}
              </p>
            </div>
          );
        } else {
          const links = backgroundItem.content as typeof profile.links;
          return (
            <div className="border border-base-700 rounded-md bg-dark-base-secondary/80 backdrop-blur-sm p-6">
              <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-accent-200 mb-2">
                Get in Touch
              </div>
              <h3 className="text-foreground font-normal text-[20px] leading-[120%] tracking-[-0.025rem] mb-4">
                Connect
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-base-1000 border border-base-700 rounded-sm hover:border-accent-200/50 transition-all group"
                >
                  <span className="text-base-400 group-hover:text-accent-200 font-mono text-[12px] uppercase">GitHub</span>
                  <span className="text-base-600 font-mono text-[11px] flex-1 truncate">{links.github}</span>
                  <span className="text-base-500 group-hover:text-accent-200">→</span>
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-base-1000 border border-base-700 rounded-sm hover:border-accent-200/50 transition-all group"
                >
                  <span className="text-base-400 group-hover:text-accent-200 font-mono text-[12px] uppercase">LinkedIn</span>
                  <span className="text-base-600 font-mono text-[11px] flex-1 truncate">{links.linkedin}</span>
                  <span className="text-base-500 group-hover:text-accent-200">→</span>
                </a>
                <a
                  href={`mailto:${links.email}`}
                  className="flex items-center gap-3 p-3 bg-base-1000 border border-base-700 rounded-sm hover:border-accent-200/50 transition-all group"
                >
                  <span className="text-base-400 group-hover:text-accent-200 font-mono text-[12px] uppercase">Email</span>
                  <span className="text-base-600 font-mono text-[11px] flex-1 truncate">{links.email}</span>
                  <span className="text-base-500 group-hover:text-accent-200">→</span>
                </a>
              </div>
            </div>
          );
        }

      default:
        return null;
    }
  };

  // Render list view (right panel) - all items clickable
  const renderListView = () => {
    switch (activeIndex) {
      case 0: // Projects list
        return (
          <div className="space-y-2">
            {projects.slice(0, 6).map((project, index) => (
              <button
                key={project.id}
                onClick={() => setSelectedItemIndex(index)}
                className={`w-full text-left p-4 border rounded-md transition-all duration-200 ${
                  selectedItemIndex === index
                    ? 'border-accent-200/50 bg-dark-base-secondary'
                    : 'border-base-800 bg-base-1000/50 hover:border-base-700 hover:bg-dark-base-secondary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`font-mono text-[10px] mt-0.5 ${selectedItemIndex === index ? 'text-accent-200' : 'text-base-600'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-normal text-[14px] leading-[120%] truncate ${selectedItemIndex === index ? 'text-foreground' : 'text-base-300'}`}>
                      {project.title}
                    </h4>
                    <p className="text-base-500 font-mono text-[11px] truncate mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 1: // Experience list
        return (
          <div className="space-y-2">
            {experience.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setSelectedItemIndex(index)}
                className={`w-full text-left p-4 border rounded-md transition-all duration-200 ${
                  selectedItemIndex === index
                    ? 'border-accent-200/50 bg-dark-base-secondary'
                    : 'border-base-800 bg-base-1000/50 hover:border-base-700 hover:bg-dark-base-secondary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`font-mono text-[10px] mt-0.5 ${selectedItemIndex === index ? 'text-accent-200' : 'text-base-600'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-normal text-[14px] leading-[120%] truncate ${selectedItemIndex === index ? 'text-foreground' : 'text-base-300'}`}>
                      {exp.company}
                    </h4>
                    <p className="text-base-500 font-mono text-[11px] truncate mt-0.5">
                      {exp.role}
                    </p>
                  </div>
                  <span className="text-base-600 font-mono text-[10px] whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
              </button>
            ))}
          </div>
        );

      case 2: // Skills list
        return (
          <div className="space-y-2">
            {skills.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setSelectedItemIndex(index)}
                className={`w-full text-left p-4 border rounded-md transition-all duration-200 ${
                  selectedItemIndex === index
                    ? 'border-accent-200/50 bg-dark-base-secondary'
                    : 'border-base-800 bg-base-1000/50 hover:border-base-700 hover:bg-dark-base-secondary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`font-mono text-[10px] mt-0.5 ${selectedItemIndex === index ? 'text-accent-200' : 'text-base-600'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-normal text-[14px] leading-[120%] ${selectedItemIndex === index ? 'text-foreground' : 'text-base-300'}`}>
                      {category.name}
                    </h4>
                    <p className="text-base-500 font-mono text-[11px] mt-0.5">
                      {category.skills.length} skills
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 3: // Background list
        const backgroundItems = [
          { id: 'bio', title: 'Bio', subtitle: 'Who I am' },
          { id: 'current-role', title: 'Current Role', subtitle: profile.currentRole.company },
          { id: 'links', title: 'Connect', subtitle: 'Get in touch' },
        ];
        return (
          <div className="space-y-2">
            {backgroundItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedItemIndex(index)}
                className={`w-full text-left p-4 border rounded-md transition-all duration-200 ${
                  selectedItemIndex === index
                    ? 'border-accent-200/50 bg-dark-base-secondary'
                    : 'border-base-800 bg-base-1000/50 hover:border-base-700 hover:bg-dark-base-secondary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`font-mono text-[10px] mt-0.5 ${selectedItemIndex === index ? 'text-accent-200' : 'text-base-600'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-normal text-[14px] leading-[120%] ${selectedItemIndex === index ? 'text-foreground' : 'text-base-300'}`}>
                      {item.title}
                    </h4>
                    <p className="text-base-500 font-mono text-[11px] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative bg-dark-base-primary bg-[url('/assets/bg-lines.png')]"
      style={{ height: `${showcaseItems.length * sectionHeight}vh` }}
    >
      {/* Sticky container - full viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Section label - top left */}
        <div className="absolute top-8 left-4 lg:left-9 z-20">
          <div className="inline-flex items-center gap-3">
            <div
              className="size-2 rounded-full animate-pulse-glow"
              style={{ backgroundColor: 'var(--color-accent-200)' }}
            />
            <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-400">
              About
            </p>
          </div>
        </div>

        {/* Section header - centered top, only visible before scrolling into content */}
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 transition-all duration-500 ${
            isContentVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <h2 className="text-foreground font-normal text-[32px] lg:text-[48px] leading-[100%] tracking-[-0.08rem] mb-4">
            {sectionHeader.title}
          </h2>
          <p className="text-base-500 font-mono text-[14px] lg:text-[16px]">
            {sectionHeader.subtitle}
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-base-600">
            <span className="font-mono text-[11px] uppercase">Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Bottom left - Factory.ai style indicator */}
        <div className="absolute bottom-8 left-4 lg:left-9 z-20">
          <div className="flex flex-col gap-3">

            {/* Progress pills */}
            <div className="border-base-700 relative flex rounded-full border p-[3px] w-fit flex-row space-x-1 px-1">
              {showcaseItems.map((_, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center cursor-pointer"
                  aria-label={`Go to step ${index + 1}`}
                  onClick={() => scrollToSection(index)}
                >
                  <div
                    className={`relative overflow-hidden rounded-full transition-all duration-300 ease-linear ${
                      index === activeIndex
                        ? 'bg-base-700 h-2 w-8'
                        : 'size-2 bg-base-700'
                    }`}
                  >
                    {index === activeIndex && (
                      <div
                        className="bg-accent-100 absolute top-0 left-0 h-full transition-all duration-100"
                        style={{ width: `${progress * 100}%` }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Section labels */}
            <ul className="flex flex-col gap-1.5">
              {showcaseItems.map((item, index) => {
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;

                const numberColor = isActive
                  ? 'text-light-base-primary'
                  : isPassed
                    ? 'text-base-500'
                    : 'text-base-700';

                const titleColor = isActive ? 'text-accent-100' : 'text-base-500';

                return (
                  <li key={item.number} className="flex">
                    <button
                      aria-label={`Go to step ${index + 1}`}
                      className="cursor-pointer text-left transition-opacity duration-200 hover:opacity-80"
                      onClick={() => scrollToSection(index)}
                    >
                      <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase transition-colors duration-300">
                        <span className={`transition-colors duration-300 ${numberColor}`}>
                          {item.number}
                        </span>
                        {' '}
                        <span className={`transition-colors duration-300 ${titleColor}`}>
                          {item.title}
                        </span>
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Two-panel content area - only visible after scrolling */}
        <div
          className={`absolute left-0 lg:left-48 right-0 top-20 bottom-20 transition-all duration-500 ${
            isContentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Desktop layout - two panels side by side */}
          <div className="hidden lg:flex h-full gap-6 px-8">
            {/* Left panel - Detail view */}
            <div className="flex flex-col w-[380px] flex-shrink-0">
              <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-base-500 mb-4">
                {sectionHeader.title}
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-700 scrollbar-track-transparent pr-2">
                {renderDetailView()}
              </div>
            </div>

            {/* Right panel - List view */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-base-500 mb-4 flex items-center justify-between">
                <span>Select to view details</span>
                <span className="text-base-600">{currentItems.length} items</span>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-700 scrollbar-track-transparent pr-2">
                {renderListView()}
              </div>
            </div>
          </div>

          {/* Mobile layout - stacked vertically */}
          <div className="lg:hidden h-full flex flex-col px-4">
            <div className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-base-500 mb-4">
              {sectionHeader.title}
            </div>
            <div className="flex-1 overflow-y-auto">
              {renderDetailView()}
              <div className="mt-4">
                {renderListView()}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
