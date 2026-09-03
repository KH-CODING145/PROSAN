import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { articlesData } from '../data/articles';
import { SectionTitle } from '../components/common/SectionTitle';
import { ArticleCardSkeleton } from '../components/articles/ArticleCardSkeleton';
import { Badge } from '../components/common/Badge';
import { ViewCountBadge } from '../components/common/ViewCountBadge';
import { CodeBlock } from '../components/common/CodeBlock';
import { generateArticlesListSchema } from '../utils/seoSchemas';
import { siteConfig } from '../config/siteConfig';
import { BookOpen, Calendar, Clock, ArrowRight, ExternalLink, RefreshCw, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSnippets, setExpandedSnippets] = useState<Record<string, boolean>>({});

  const toggleSnippet = (id: string) => {
    setExpandedSnippets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const articlesSchema = useMemo(() => generateArticlesListSchema(articlesData), []);

  return (
    <PageContainer
      title="Articles & Engineering Deep Dives"
      description="Technical essays, system design teardowns, AI agent architecture patterns, and frontend performance playbooks by PRO SAN."
      canonicalUrl={`${siteConfig.siteUrl}/articles`}
      type="website"
      keywords={[
        'Engineering Blog',
        'System Design',
        'React 19 Architecture',
        'Multi-Agent LLM',
        'AI Systems',
        'Software Engineering Articles',
        'PRO SAN'
      ]}
      image="/images/og-preview.png"
      imageAlt="PRO SAN Engineering Articles and Architecture Teardowns"
      schema={articlesSchema}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          tag="Knowledge Sharing"
          title="Engineering Articles & Architecture Teardowns"
          description="In-depth writings on production React performance, multi-agent LLM systems, deterministic testing, and distributed backend design."
        />

        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <ArticleCardSkeleton key={`article-skeleton-${idx}`} />
            ))
          ) : (
            articlesData.map((article) => (
              <article
                key={article.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
                    <div className="flex items-center gap-3">
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

                    <ViewCountBadge
                      itemId={article.slug}
                      itemType="article"
                      variant="compact"
                      showPopularityBadge={true}
                    />
                  </div>

                  <Link
                    to={`/articles/${article.slug}`}
                    className="block text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
                  >
                    {article.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Architecture Snippet Preview */}
                  {(() => {
                    const snippetSection = article.sections?.find((s) => s.codeSnippet);
                    if (!snippetSection || !snippetSection.codeSnippet) return null;
                    const isExpanded = expandedSnippets[article.id];

                    return (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => toggleSnippet(article.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono text-cyan-600 dark:text-cyan-400 transition-colors"
                        >
                          <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                          <span>{isExpanded ? 'Hide Architecture Snippet' : 'Preview Architecture Snippet'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3">
                            <CodeBlock
                              id={`article-card-snippet-${article.id}`}
                              code={snippetSection.codeSnippet.code}
                              language={snippetSection.codeSnippet.language}
                              title={`${snippetSection.heading}`}
                              subtitle="Verified Architecture Snippet"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })()}
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

                  <Link
                    to={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
};
