import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { Badge } from '../common/Badge';
import { ViewCountBadge } from '../common/ViewCountBadge';
import { CodeBlock } from '../common/CodeBlock';
import { ExternalLink, ArrowRight, Sparkles, Layers, Github, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
export { ProjectCardSkeleton } from './ProjectCardSkeleton';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isSnippetExpanded, setIsSnippetExpanded] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-cyan-500/40 transition-all duration-300"
    >
      {/* Image Thumbnail Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge variant="cyan" size="sm">
            {project.category}
          </Badge>
          {project.featured && (
            <Badge variant="amber" size="sm" dot>
              Featured
            </Badge>
          )}
        </div>

        {/* Action icons overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.title}`}
              className="p-2 rounded-lg bg-cyan-600/90 hover:bg-cyan-600 text-white backdrop-blur-md border border-cyan-400/40 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Link
            to={`/projects/${project.slug}`}
            className="group/title inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
          >
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 text-slate-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Project Card Actions & View Count */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <ViewCountBadge
                itemId={project.slug}
                itemType="project"
                variant="compact"
                showPopularityBadge={true}
              />

              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {/* Quick Code Snippet Toggle */}
            {project.codeSnippet && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsSnippetExpanded(!isSnippetExpanded)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{isSnippetExpanded ? 'Hide Code Snippet' : 'Preview Code Snippet'}</span>
                  {isSnippetExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isSnippetExpanded && (
                  <div className="mt-2.5">
                    <CodeBlock
                      id={`project-card-snippet-${project.id}`}
                      code={project.codeSnippet.code}
                      language={project.codeSnippet.language}
                      title={project.codeSnippet.title || `${project.slug}`}
                      subtitle="Verified Implementation"
                      className="text-xs"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
