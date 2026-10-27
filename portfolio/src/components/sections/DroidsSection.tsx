export function DroidsSection() {
  return (
    <section className="relative w-full bg-background py-20 lg:py-32 px-4 lg:px-9">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-light-base-primary leading-tight">
            Droids meet you<br />
            wherever you work
          </h2>

          <p className="text-lg text-base-400 leading-relaxed">
            Integrate with your existing workflow. Factory Droids work seamlessly
            with your favorite tools and platforms, from GitHub to Slack to your
            terminal.
          </p>

          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-dark-base-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-light-base-primary mb-1">GitHub Integration</h3>
                <p className="text-sm text-base-400">Automatic PR reviews and code suggestions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-dark-base-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-light-base-primary mb-1">Terminal Access</h3>
                <p className="text-sm text-base-400">Run droids directly from your command line</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-dark-base-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-light-base-primary mb-1">IDE Plugins</h3>
                <p className="text-sm text-base-400">VS Code, IntelliJ, and more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Code Preview */}
        <div className="relative">
          <div className="bg-base-900 border border-base-700 rounded-lg overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-base-800 px-4 py-3 flex items-center justify-between border-b border-base-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-base-400 font-mono">~/my-app</span>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm space-y-3">
              <div className="text-base-300">
                <span className="text-accent-200">$</span> factory init
              </div>
              <div className="text-base-500 text-xs">
                ✓ Analyzing codebase...
              </div>
              <div className="text-base-500 text-xs">
                ✓ Setting up droids...
              </div>
              <div className="text-base-500 text-xs">
                ✓ Configuring integrations...
              </div>
              <div className="text-green-400 text-xs mt-4">
                ✓ Factory initialized successfully!
              </div>
              <div className="mt-4 text-base-400">
                Run <span className="text-accent-200">factory deploy</span> to start building
              </div>
            </div>
          </div>

          {/* Floating Code Icon */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-base-800 border border-base-700 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-accent-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
