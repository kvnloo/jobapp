interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
  className?: string;
}

export function TimelineItem({
  company,
  role,
  period,
  description,
  technologies,
  className = '',
}: TimelineItemProps) {
  return (
    <div className={`border-base-500 flex flex-col gap-6 border-t pt-6 ${className}`}>
      {/* Company and Period */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-foreground font-normal text-[18px] leading-[100%] tracking-normal lg:text-[20px]">
            {role}
          </h3>
          <p className="text-pretty font-mono text-[14px] leading-[120%] tracking-[-0.0175rem] text-base-400 mt-1">
            {company}
          </p>
        </div>
        <p className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase text-base-500 whitespace-nowrap">
          {period}
        </p>
      </div>

      {/* Description */}
      <ul className="flex flex-col gap-3">
        {description.map((item, index) => (
          <li
            key={index}
            className="text-pretty font-mono text-[14px] leading-[120%] tracking-[-0.0175rem] lg:text-[16px] lg:tracking-[-0.02rem] text-base-500 flex gap-3"
          >
            <span className="text-accent-200 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="text-pretty font-mono text-[12px] leading-[100%] tracking-[-0.015rem] uppercase px-2 py-1 rounded-sm bg-base-1000 text-base-400 border border-base-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
