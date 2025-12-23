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

  // Render preview content for right panel (large visual area like Factory.ai)
  const renderPreviewContent = () => {
    const items = currentItems;
    const selected = items[selectedItemIndex];
    if (!selected) return null;

    switch (activeIndex) {
      case 0: // Projects preview - terminal/code style
        const project = selected as typeof projects[0];
        return (
          <div className="h-full flex flex-col">
            {/* Fake terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-base-1000 border-b border-base-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 text-base-500 font-mono text-[11px]">
                {project.title.toLowerCase().replace(/\s+/g, '-')}.tsx
              </span>
            </div>
            {/* Terminal content */}
            <div className="flex-1 p-6 font-mono text-[13px] leading-relaxed overflow-auto">
              <div className="text-base-500 mb-4">// {project.subtitle}</div>
              <div className="text-accent-200 mb-2">
                import {'{'} {project.title.split(' ')[0]} {'}'} from '@/projects';
              </div>
              <div className="text-base-400 mb-4">
                <span className="text-purple-400">const</span> <span className="text-blue-300">config</span> = {'{'}
              </div>
              <div className="pl-4 space-y-1">
                {project.techStack.slice(0, 4).map((tech, i) => (
                  <div key={i} className="text-base-400">
                    <span className="text-green-400">{tech.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>: <span className="text-yellow-300">true</span>,
                  </div>
                ))}
              </div>
              <div className="text-base-400 mb-4">{'}'}</div>
              {project.metrics && project.metrics.length > 0 && (
                <>
                  <div className="text-base-500 mb-2">// Performance Metrics</div>
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-base-400">
                      <span className="text-purple-400">export const</span> <span className="text-blue-300">{metric.label.replace(/\s+/g, '_').toUpperCase()}</span> = <span className="text-yellow-300">"{metric.value}"</span>;
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        );

      case 1: // Experience preview - org chart/company style
        const exp = selected as typeof experience[0];
        return (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-6">
              {/* Company logo placeholder */}
              <div className="w-24 h-24 mx-auto rounded-lg bg-gradient-to-br from-accent-200/20 to-accent-200/5 border border-accent-200/30 flex items-center justify-center">
                <span className="text-accent-200 font-mono text-[32px] font-bold">
                  {exp.company.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-foreground text-[24px] leading-tight mb-2">{exp.company}</h3>
                <p className="text-accent-200 font-mono text-[14px] uppercase">{exp.role}</p>
                <p className="text-base-500 font-mono text-[12px] mt-2">{exp.period}</p>
              </div>
              {exp.location && (
                <div className="flex items-center justify-center gap-2 text-base-500 font-mono text-[11px]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{exp.location}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 2: // Skills preview - visual skill cloud/grid
        const skillCategory = selected as typeof skills[0];
        return (
          <div className="h-full flex items-center justify-center p-8">
            <div className="space-y-6 w-full max-w-md">
              <div className="text-center mb-8">
                <h3 className="text-foreground text-[20px] mb-2">{skillCategory.name}</h3>
                <p className="text-base-500 font-mono text-[11px] uppercase">
                  {skillCategory.skills.length} technologies
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {skillCategory.skills.map((skill, i) => (
                  <div
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-br from-base-900 to-base-1000 border border-base-700 rounded-md text-base-300 font-mono text-[12px] hover:border-accent-200/50 hover:text-accent-200 transition-all"
                    style={{
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Background preview - profile/contact visual
        const backgroundItem = selected as { id: string; title: string; content: unknown };
        if (backgroundItem.id === 'bio') {
          return (
            <div className="h-full flex items-center justify-center p-8">
              <div className="max-w-md text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-200/20 to-accent-200/5 border-2 border-accent-200/30 flex items-center justify-center">
                  <span className="text-accent-200 font-mono text-[48px] font-bold">K</span>
                </div>
                <h3 className="text-foreground text-[24px] mb-2">{profile.name}</h3>
                <p className="text-accent-200 font-mono text-[14px] uppercase mb-4">{profile.title}</p>
                <p className="text-base-500 font-mono text-[12px] leading-relaxed">
                  {profile.tagline}
                </p>
              </div>
            </div>
          );
        } else if (backgroundItem.id === 'current-role') {
          const role = profile.currentRole;
          return (
            <div className="h-full flex items-center justify-center p-8">
              <div className="max-w-md text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-lg bg-gradient-to-br from-accent-200/20 to-accent-200/5 border border-accent-200/30 flex items-center justify-center">
                  <span className="text-accent-200 font-mono text-[32px] font-bold">
                    {role.company.charAt(0)}
                  </span>
                </div>
                <p className="text-base-500 font-mono text-[11px] uppercase mb-2">Current Role</p>
                <h3 className="text-foreground text-[20px] mb-2">{role.title}</h3>
                <p className="text-accent-200 font-mono text-[14px]">{role.company}</p>
              </div>
            </div>
          );
        } else {
          const links = profile.links;
          return (
            <div className="h-full flex items-center justify-center p-8">
              <div className="space-y-4 w-full max-w-sm">
                <div className="text-center mb-6">
                  <p className="text-base-500 font-mono text-[11px] uppercase">Let's Connect</p>
                </div>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-base-1000 border border-base-700 rounded-md hover:border-accent-200/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-md bg-base-900 flex items-center justify-center">
                    <svg className="w-5 h-5 text-base-400 group-hover:text-accent-200" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base-300 font-mono text-[12px] uppercase">GitHub</p>
                    <p className="text-base-600 font-mono text-[10px] truncate">{links.github}</p>
                  </div>
                  <span className="text-base-600 group-hover:text-accent-200">→</span>
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-base-1000 border border-base-700 rounded-md hover:border-accent-200/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-md bg-base-900 flex items-center justify-center">
                    <svg className="w-5 h-5 text-base-400 group-hover:text-accent-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base-300 font-mono text-[12px] uppercase">LinkedIn</p>
                    <p className="text-base-600 font-mono text-[10px] truncate">{links.linkedin}</p>
                  </div>
                  <span className="text-base-600 group-hover:text-accent-200">→</span>
                </a>
                <a
                  href={`mailto:${links.email}`}
                  className="flex items-center gap-4 p-4 bg-base-1000 border border-base-700 rounded-md hover:border-accent-200/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-md bg-base-900 flex items-center justify-center">
                    <svg className="w-5 h-5 text-base-400 group-hover:text-accent-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base-300 font-mono text-[12px] uppercase">Email</p>
                    <p className="text-base-600 font-mono text-[10px] truncate">{links.email}</p>
                  </div>
                  <span className="text-base-600 group-hover:text-accent-200">→</span>
                </a>
              </div>
            </div>
          );
        }

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


        {/* Factory.ai style content area - 12-column grid */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isContentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* 12-column grid layout like Factory.ai */}
          <div className="h-full grid grid-cols-4 gap-x-4 lg:grid-cols-12 lg:gap-x-6 px-4 lg:px-0">

            {/* Left Panel - Badge, headline, description at top; section nav at bottom (5 cols on desktop) */}
            <div className="col-span-full lg:col-span-5 border-base-700 relative flex h-full flex-col lg:border-r lg:pl-9 lg:pr-8 py-8">

              {/* Badge/Label - at top */}
              <div className="inline-flex items-center gap-3 mb-4">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent-200)' }}
                />
                <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-400">
                  {showcaseItems[activeIndex].title}
                </p>
              </div>

              {/* Main Headline - at top, below badge */}
              <h2 className="text-foreground font-normal text-[28px] lg:text-[36px] xl:text-[42px] leading-[110%] tracking-[-0.04rem] lg:max-w-[400px]">
                {sectionHeader.title}
              </h2>

              {/* Description - below headline */}
              <p className="text-base-400 font-mono text-[13px] lg:text-[14px] leading-[160%] mt-4 lg:mt-6 lg:max-w-[390px]">
                {sectionHeader.subtitle}
              </p>

              {/* Section Navigation - pushed to bottom with mt-auto */}
              <div className="mt-auto pt-8">
                {/* Progress pills */}
                <div className="border-base-700 relative flex rounded-full border p-[3px] w-fit flex-row space-x-1 px-1 mb-3">
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
                    const numberColor = isActive ? 'text-light-base-primary' : isPassed ? 'text-base-500' : 'text-base-700';
                    const titleColor = isActive ? 'text-accent-100' : 'text-base-500';

                    return (
                      <li key={item.number} className="flex">
                        <button
                          aria-label={`Go to step ${index + 1}`}
                          className="cursor-pointer text-left transition-opacity duration-200 hover:opacity-80"
                          onClick={() => scrollToSection(index)}
                        >
                          <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase transition-colors duration-300">
                            <span className={`transition-colors duration-300 ${numberColor}`}>{item.number}</span>
                            {' '}
                            <span className={`transition-colors duration-300 ${titleColor}`}>{item.title}</span>
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Right Panel - 2-column grid with details + preview (7 cols on desktop) */}
            <div className="col-span-full lg:col-span-7 lg:col-start-6 grid gap-6 md:grid-cols-2 lg:pr-9 py-8">

              {/* Left column of right panel - Item selector + Detail */}
              <div className="border-base-700 flex flex-col gap-6 border-t pt-6 md:border-t-0 md:pt-0">

                {/* Section header */}
                <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-accent-200">
                  {showcaseItems[activeIndex].number} - {showcaseItems[activeIndex].title.toUpperCase()}
                </p>

                {/* Item tabs/selector */}
                <div className="flex flex-wrap gap-1">
                  {currentItems.slice(0, 6).map((item, index) => {
                    const itemTitle = 'title' in item ? (item as { title: string }).title :
                      'name' in item ? (item as { name: string }).name :
                      'company' in item ? (item as { company: string }).company : `Item ${index + 1}`;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedItemIndex(index)}
                        className={`px-3 py-1.5 text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase border rounded-sm transition-all ${
                          selectedItemIndex === index
                            ? 'bg-accent-200/10 border-accent-200/50 text-accent-200'
                            : 'border-base-700 text-base-500 hover:border-base-600 hover:text-base-400'
                        }`}
                      >
                        {itemTitle.length > 12 ? itemTitle.slice(0, 12) + '...' : itemTitle}
                      </button>
                    );
                  })}
                </div>

                {/* Detail content */}
                <div className="flex-1 overflow-y-auto">
                  {renderDetailView()}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-auto pt-4">
                  <button className="flex-1 py-2.5 px-4 bg-accent-200 text-dark-base-primary font-mono text-[11px] uppercase tracking-wide rounded-sm hover:bg-accent-100 transition-colors">
                    View Details
                  </button>
                  <button className="py-2.5 px-4 border border-base-700 text-base-400 font-mono text-[11px] uppercase tracking-wide rounded-sm hover:border-base-600 hover:text-base-300 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right column of right panel - Preview/Visual */}
              <div className="border-base-700 flex flex-col gap-6 border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">

                {/* Preview label */}
                <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-500">
                  Preview
                </p>

                {/* Preview content */}
                <div className="flex-1 border border-base-800 rounded-md bg-dark-base-secondary/50 overflow-hidden relative min-h-[300px]">
                  {renderPreviewContent()}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
