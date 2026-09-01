import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ProjectCategory } from '../../types';
import { projectsData } from '../../data/projects';
import { Badge } from '../common/Badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  Layers, 
  Play, 
  Pause,
  FolderGit2
} from 'lucide-react';

interface RelatedProjectsCarouselProps {
  currentProject: Project;
  maxProjects?: number;
}

export const RelatedProjectsCarousel: React.FC<RelatedProjectsCarouselProps> = ({
  currentProject,
  maxProjects = 3,
}) => {
  // Find up to 3 projects from the same category; supplement if needed
  const relatedProjects = useMemo(() => {
    const sameCategory = projectsData.filter(
      (p) => p.id !== currentProject.id && p.category === currentProject.category
    );

    if (sameCategory.length >= maxProjects) {
      return sameCategory.slice(0, Math.max(maxProjects, sameCategory.length));
    }

    // Fallback: add projects with overlapping technologies or featured projects
    const fallbackProjects = projectsData.filter(
      (p) =>
        p.id !== currentProject.id &&
        !sameCategory.some((sc) => sc.id === p.id) &&
        (p.technologies.some((t) => currentProject.technologies.includes(t)) || p.featured)
    );

    return [...sameCategory, ...fallbackProjects].slice(0, Math.max(maxProjects, 3));
  }, [currentProject, maxProjects]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Responsive items per page detection
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(Math.min(3, relatedProjects.length));
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [relatedProjects.length]);

  const totalPages = Math.max(1, relatedProjects.length - itemsPerPage + 1);

  // Reset index when currentProject changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [currentProject.id]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || totalPages <= 1) return;
    const interval = setInterval(handleNext, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, totalPages]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section 
      id="related-projects-carousel"
      aria-label="Related Projects Carousel" 
      className="space-y-6 pt-12 border-t border-slate-200 dark:border-slate-800"
    >
      {/* Carousel Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>More in {currentProject.category}</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-mono text-slate-500">
              {Math.min(3, relatedProjects.length)} Suggested Projects
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Related Projects
          </h3>
        </div>

        {/* Action Controls: Autoplay, Prev/Next buttons, Explore Link */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          {totalPages > 1 && (
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause auto rotation' : 'Play auto rotation'}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              title={isPlaying ? 'Pause carousel' : 'Auto-play carousel'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          {totalPages > 1 && (
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-xs">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous related project slide"
                disabled={currentIndex === 0 && !isPlaying}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-2 text-xs font-mono text-slate-500 dark:text-slate-400 select-none">
                <span className="text-slate-900 dark:text-white font-bold">{currentIndex + 1}</span>
                <span className="text-slate-400">/</span>
                <span>{totalPages}</span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next related project slide"
                disabled={currentIndex === totalPages - 1 && !isPlaying}
                className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <Link
            to={`/projects?category=${encodeURIComponent(currentProject.category)}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20 transition-colors"
          >
            <span>All {currentProject.category}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div 
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage + (24 / itemsPerPage / 100))}%)`
          }}
        >
          {relatedProjects.map((relProj) => {
            const isSameCategory = relProj.category === currentProject.category;

            return (
              <div
                key={relProj.id}
                style={{
                  flex: `0 0 calc(${100 / itemsPerPage}% - ${(24 * (itemsPerPage - 1)) / itemsPerPage}px)`
                }}
                className="min-w-0"
              >
                <div className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300">
                  {/* Thumbnail / Header */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={relProj.image}
                      alt={relProj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <Badge variant={isSameCategory ? "cyan" : "slate"} size="sm">
                        {relProj.category}
                      </Badge>
                      {relProj.featured && (
                        <Badge variant="amber" size="sm" dot>
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Action Quick Links */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      {relProj.liveDemoUrl && (
                        <a
                          href={relProj.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live demo for ${relProj.title}`}
                          className="p-1.5 rounded-lg bg-cyan-600/90 hover:bg-cyan-600 text-white backdrop-blur-md border border-cyan-400/40 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <Link
                        to={`/projects/${relProj.slug}`}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group/title inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                      >
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition-colors line-clamp-1">
                          {relProj.title}
                        </h4>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {relProj.shortDescription}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-3.5 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {relProj.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {relProj.technologies.length > 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                            +{relProj.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Footer link */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500">
                          {relProj.role.split('&')[0]}
                        </span>

                        <Link
                          to={`/projects/${relProj.slug}`}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots indicator */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide page ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-6 bg-cyan-500'
                  : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
