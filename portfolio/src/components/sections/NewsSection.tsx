export function NewsSection() {
  const newsItems = [
    {
      date: 'Dec 20, 2024',
      category: 'Product',
      title: 'Introducing Factory 2.0',
      description: 'Major update with enhanced AI capabilities and new integrations'
    },
    {
      date: 'Dec 15, 2024',
      category: 'Company',
      title: 'Series B Funding',
      description: 'Raised $50M to accelerate AI-native development'
    },
    {
      date: 'Dec 10, 2024',
      category: 'Feature',
      title: 'Real-time Collaboration',
      description: 'Work with AI agents and team members simultaneously'
    },
    {
      date: 'Dec 5, 2024',
      category: 'Integration',
      title: 'GitHub Copilot Integration',
      description: 'Seamless integration with GitHub Copilot for enhanced productivity'
    },
    {
      date: 'Nov 28, 2024',
      category: 'Case Study',
      title: 'How Stripe uses Factory',
      description: 'Learn how Stripe ships features 10x faster with Factory'
    },
    {
      date: 'Nov 20, 2024',
      category: 'Product',
      title: 'New Templates Library',
      description: 'Pre-built templates for common use cases and architectures'
    },
  ];

  return (
    <section className="relative w-full bg-background py-20 lg:py-32 px-4 lg:px-9">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-light-base-primary">
            Factory news & updates
          </h2>
          <button className="text-sm text-accent-200 hover:text-accent-100 transition-colors">
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="group bg-base-900 border border-base-700 rounded-lg p-6 hover:border-accent-200 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-base-500 font-mono">{item.date}</span>
                <span className="px-2 py-1 text-xs bg-base-800 text-accent-200 rounded">
                  {item.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-light-base-primary mb-2 group-hover:text-accent-200 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-base-400 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 flex items-center text-accent-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
