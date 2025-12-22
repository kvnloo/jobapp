import { experience } from '../../data/experience';

// Get unique companies (excluding Sabbatical which isn't a company)
const companies = experience
  .filter(exp => exp.company !== 'Sabbatical')
  .map(exp => ({
    name: exp.company,
    // Clean up display names
    displayName: exp.company
      .replace(', LLC', '')
      .replace(' Inc.', '')
      .replace(' (Scale.ai)', '')
      .replace(' Consulting', ''),
  }));

export function TrustedByMarquee() {
  // Duplicate the list for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <div className="w-full overflow-hidden border-y border-base-800 bg-dark-base-primary/50">
      <div className="flex items-center py-4">
        {/* Label */}
        <div className="flex-shrink-0 px-4 lg:px-9 border-r border-base-800">
          <p className="text-pretty font-mono text-[10px] leading-[100%] tracking-[-0.0125rem] uppercase text-base-500 whitespace-nowrap">
            Trusted by teams at
          </p>
        </div>

        {/* Marquee container */}
        <div className="flex-1 overflow-hidden relative">
          {/* Gradient masks for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark-base-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark-base-primary to-transparent z-10" />

          {/* Scrolling content */}
          <div className="flex animate-marquee">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 px-8 flex items-center"
              >
                <span className="text-pretty font-mono text-[14px] leading-[100%] tracking-[-0.0175rem] uppercase text-base-400 hover:text-base-200 transition-colors duration-200 whitespace-nowrap">
                  {company.displayName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
