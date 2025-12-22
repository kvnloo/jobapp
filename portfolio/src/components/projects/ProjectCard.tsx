import { useState, useRef, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  summary: string;
  techStack: string[];
  metrics?: Array<{ label: string; value: string }>;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  className?: string;
}

export function ProjectCard({
  title,
  subtitle,
  summary,
  techStack,
  metrics = [],
  links = {},
  className = '',
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div
      data-slot="card"
      className={`text-card-foreground rounded-md py-4 transition-all duration-300 ease-in-out bg-dark-base-secondary border-base-800 border flex w-full flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-100/10 ${className}`}
    >
      {/* Card Header */}
      <div data-slot="card-header" className="@container/card-header gap-1.5 px-4 [.border-b]:pb-6 mb-6 flex flex-row items-center justify-between">
        <div className="text-pretty font-mono text-[14px] leading-[100%] tracking-[-0.0175rem] text-gl inline-flex items-center uppercase gap-3">
          <div
            className="size-2 transform-gpu rounded-full border will-change-[background-color]"
            data-slot="badge-icon"
            style={{ backfaceVisibility: 'hidden', backgroundColor: 'var(--color-accent-200)' }}
          ></div>
          <p className="whitespace-nowrap text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div data-slot="card-footer" className="px-4 [.border-t]:pt-6 mt-auto flex flex-col gap-4 gap-y-4">
        <h2 className="text-foreground font-normal text-[18px] leading-[100%] tracking-normal lg:text-[24px]">
          {title}
        </h2>

        <p className="text-pretty font-mono text-[14px] leading-[120%] tracking-[-0.0175rem] lg:text-[16px] lg:tracking-[-0.02rem] text-base-500">
          {summary}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase px-2 py-1 rounded-sm bg-base-1000 text-base-400 border border-base-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable Metrics Section */}
        {metrics.length > 0 && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-left mt-2 text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-400 hover:text-accent-200 transition-colors duration-150 flex items-center gap-1"
            >
              {isExpanded ? 'Hide Details' : 'Show Details'}
              <svg
                className={`h-3 w-3 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Smooth expanding container */}
            <div
              style={{ height: height ? `${height}px` : '0px' }}
              className="overflow-hidden transition-all duration-300 ease-in-out"
            >
              <div ref={contentRef} className="mt-4">
                <div className={`grid grid-cols-2 gap-4 p-4 border border-base-700 rounded-sm bg-base-1000 ${isExpanded ? 'animate-fadeIn' : ''}`}>
                  {metrics.map((metric, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <span className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-500">
                        {metric.label}
                      </span>
                      <span className="text-foreground font-normal text-[16px] leading-[100%]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Links */}
        <div className="flex gap-3 mt-2">
          {links.github && (
            <a
              data-slot="button"
              className="group relative inline-flex w-max cursor-pointer items-center justify-center border transition-colors duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&amp;_*]:transition-colors [&amp;_*]:duration-150 bg-light-base-secondary hover:bg-dark-base-primary focus-visible:bg-dark-base-primary [&amp;_*]:text-dark-base-primary hover:[&amp;_*]:text-light-base-secondary focus-visible:[&amp;_*]:text-light-base-secondary hover:border-base-600 focus-visible:border-base-600 focus-visible:outline-light-base-secondary overflow-clip rounded-sm border-transparent focus-visible:outline focus-visible:outline-offset-4 h-[25px] px-3"
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center uppercase gap-1">
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
                  className="size-3"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </a>
          )}

          {links.live && (
            <a
              data-slot="button"
              className="group relative inline-flex w-max cursor-pointer items-center justify-center border transition-colors duration-150 will-change-transform disabled:cursor-not-allowed disabled:opacity-50 [&amp;_*]:transition-colors [&amp;_*]:duration-150 bg-light-base-secondary hover:bg-dark-base-primary focus-visible:bg-dark-base-primary [&amp;_*]:text-dark-base-primary hover:[&amp;_*]:text-light-base-secondary focus-visible:[&amp;_*]:text-light-base-secondary hover:border-base-600 focus-visible:border-base-600 focus-visible:outline-light-base-secondary overflow-clip rounded-sm border-transparent focus-visible:outline focus-visible:outline-offset-4 h-[25px] px-3"
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center uppercase gap-1">
                <p className="text-foreground text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase">
                  Live Demo
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
