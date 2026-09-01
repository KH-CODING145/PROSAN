import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { articlesData } from '../data/articles';
import { SectionTitle } from '../components/common/SectionTitle';
import { Badge } from '../components/common/Badge';
import { BookOpen, Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  return (
    <PageContainer
      title="Articles & Engineering Deep Dives"
      description="Technical essays, system design teardowns, AI agent architecture patterns, and frontend performance playbooks."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          tag="Knowledge Sharing"
          title="Engineering Articles & Architecture Teardowns"
          description="In-depth writings on production React performance, multi-agent LLM systems, deterministic testing, and distributed backend design."
        />

        <div className="space-y-6">
          {articlesData.map((article) => (
            <article
              key={article.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    {article.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {article.readTime}
                  </span>
                </div>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
                >
                  {article.title}
                </a>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                >
                  <span>Read Full Article</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
