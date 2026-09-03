import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, Variants } from 'motion/react';
import { PageContainer } from '../components/layout/PageContainer';
import { articlesData } from '../data/articles';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ViewCountBadge } from '../components/common/ViewCountBadge';
import { CodeBlock } from '../components/common/CodeBlock';
import { usePrefersReducedMotion } from '../hooks/useScrollReveal';
import { siteConfig } from '../config/siteConfig';
import { generateArticleDetailSchema } from '../utils/seoSchemas';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  BookOpen, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Terminal
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const prefersReducedMotion = usePrefersReducedMotion();

  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PageContainer title="Article Not Found">
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Article Not Found</h1>
          <p className="text-sm text-slate-500">The publication you requested does not exist or has been relocated.</p>
          <Button variant="primary" asAnchor href="/articles" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Articles
          </Button>
        </div>
      </PageContainer>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const relatedArticles = articlesData
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const handleNativeShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  const articleSchema = generateArticleDetailSchema(article);
  const articleUrl = `${siteConfig.siteUrl}/articles/${article.slug}`;

  return (
    <PageContainer
      title={article.title}
      description={article.excerpt}
      canonicalUrl={articleUrl}
      image={article.coverImage}
      imageAlt={`${article.title} - Engineering Article by ${siteConfig.profile.name}`}
      type="article"
      author={siteConfig.profile.name}
      section={article.category}
      tags={article.tags}
      publishedTime={`${article.publishedDate}T00:00:00Z`}
      keywords={[
        article.title,
        article.category,
        ...(article.tags || []),
        'Software Architecture',
        'Engineering Teardown',
        siteConfig.profile.name
      ]}
      schema={articleSchema}
    >
      <motion.article
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6"
      >
        {/* Navigation Breadcrumb / Actions */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Share article"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.header variants={itemVariants} className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {article.category && (
              <Badge variant="cyan" size="md">
                {article.category}
              </Badge>
            )}
            {/* Real-time Dynamic View Count & Popularity Metric */}
            <ViewCountBadge
              itemId={article.slug}
              itemType="article"
              autoIncrement={true}
              showPopularityBadge={true}
            />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2 border-y border-slate-200 dark:border-slate-800 py-3">
            <span className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-[11px]">
                {siteConfig.profile.name.charAt(0)}
              </span>
              <span>{siteConfig.profile.name}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-500" />
              {article.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {article.readTime}
            </span>
          </div>
        </motion.header>

        {/* Cover Hero Image */}
        {article.coverImage && (
          <motion.div variants={itemVariants} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 sm:h-96 object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Dynamic Popularity Telemetry Card */}
        <motion.div variants={itemVariants}>
          <ViewCountBadge
            itemId={article.slug}
            itemType="article"
            variant="card"
          />
        </motion.div>

        {/* Key Takeaways Callout */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/60 space-y-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              Executive Takeaways & Key Insights
            </h3>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={`takeaway-${idx}`} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Article Body Sections */}
        {article.sections && article.sections.length > 0 ? (
          <motion.div variants={itemVariants} className="space-y-10">
            {article.sections.map((section, sIdx) => (
              <section key={`sec-${sIdx}`} className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {section.heading}
                </h2>
                <div className="space-y-4 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {section.body.map((pText, pIdx) => (
                    <p key={`p-${sIdx}-${pIdx}`}>{pText}</p>
                  ))}
                </div>

                {section.codeSnippet && (
                  <CodeBlock
                    id={`article-code-snippet-${sIdx}`}
                    code={section.codeSnippet.code}
                    language={section.codeSnippet.language}
                    title={`${section.heading}`}
                    subtitle="Verified Architecture Snippet"
                  />
                )}
              </section>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="prose dark:prose-invert max-w-none">
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {article.excerpt}
            </p>
          </motion.div>
        )}

        {/* Article Tags */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* Bottom CTA / Author Box */}
        <motion.div
          variants={itemVariants}
          className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Have thoughts or discussing enterprise systems?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              Reach out to discuss software architecture, deterministic AI agent workflows, or custom consulting.
            </p>
          </div>
          <Button variant="primary" asAnchor href="/contact" leftIcon={<ArrowRight className="w-4 h-4" />}>
            Get in Touch
          </Button>
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-6 pt-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Related Technical Essays
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/articles/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{rel.publishedDate}</span>
                    <ViewCountBadge itemId={rel.slug} itemType="article" variant="compact" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.article>
    </PageContainer>
  );
};
