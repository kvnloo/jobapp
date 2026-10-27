export function MetricsSection() {
  return (
    <section className="relative w-full bg-light-base-primary py-20 lg:py-32 px-4 lg:px-9">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-base-primary mb-6">
            We ship with you
          </h2>
          <p className="text-lg text-base-700 max-w-2xl mx-auto">
            Factory's AI agents understand your context, follow your patterns,
            and deliver production-ready code that matches your standards.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-base-300 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-dark-base-primary mb-4">10x</div>
            <h3 className="text-xl font-semibold text-dark-base-primary mb-2">
              Faster Iteration
            </h3>
            <p className="text-base-600">
              Ship features in hours, not weeks. AI agents handle the repetitive
              work while you focus on architecture.
            </p>

            {/* Mini Chart */}
            <div className="mt-6 flex items-end gap-1 h-20">
              {[40, 55, 45, 70, 60, 80, 75, 90, 85, 100].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-accent-200 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-base-300 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-dark-base-primary mb-4">95%</div>
            <h3 className="text-xl font-semibold text-dark-base-primary mb-2">
              Test Coverage
            </h3>
            <p className="text-base-600">
              Automated testing ensures every feature works as expected.
              Catch bugs before they reach production.
            </p>

            {/* Mini Progress Circles */}
            <div className="mt-6 flex gap-3">
              <div className="flex-1">
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgb(var(--color-accent-200))"
                      strokeWidth="3"
                      strokeDasharray="95, 100"
                    />
                  </svg>
                </div>
                <div className="text-xs text-center text-base-600 mt-2">Unit</div>
              </div>
              <div className="flex-1">
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgb(var(--color-accent-200))"
                      strokeWidth="3"
                      strokeDasharray="88, 100"
                    />
                  </svg>
                </div>
                <div className="text-xs text-center text-base-600 mt-2">Integration</div>
              </div>
              <div className="flex-1">
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgb(var(--color-accent-200))"
                      strokeWidth="3"
                      strokeDasharray="92, 100"
                    />
                  </svg>
                </div>
                <div className="text-xs text-center text-base-600 mt-2">E2E</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-base-300 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-dark-base-primary mb-4">24/7</div>
            <h3 className="text-xl font-semibold text-dark-base-primary mb-2">
              Always Available
            </h3>
            <p className="text-base-600">
              Your AI development team never sleeps. Deploy updates,
              fix bugs, and ship features around the clock.
            </p>

            {/* Mini Timeline */}
            <div className="mt-6 space-y-2">
              {[
                { time: '09:00', task: 'Feature deployed', color: 'bg-green-500' },
                { time: '14:30', task: 'Tests passing', color: 'bg-blue-500' },
                { time: '18:45', task: 'Bug fixed', color: 'bg-accent-200' },
                { time: '22:15', task: 'PR reviewed', color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-base-500 font-mono">{item.time}</span>
                  <span className="text-xs text-base-600">{item.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
