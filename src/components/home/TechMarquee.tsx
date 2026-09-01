import React from 'react';

const technologies = [
  'React 19',
  'TypeScript',
  'Node.js',
  'Python',
  'FastAPI',
  'Gemini 2.5',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Tailwind CSS',
  'GCP Cloud Run',
  'Playwright',
  'LangGraph',
  'GraphQL',
  'MongoDB',
  'AWS'
];

export const TechMarquee: React.FC = () => {
  return (
    <section id="tech-marquee" className="py-8 border-y border-slate-200/80 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Core Technologies & Engineering Ecosystem
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Repeating badges */}
        <div className="flex animate-marquee space-x-6 shrink-0 py-2">
          {technologies.concat(technologies).map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-slate-200 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
