import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/useScrollReveal';
import {
  getReadingTimeForRoute,
  calculateRemainingReadingTime,
} from '../../utils/readingTime';

export interface ScrollProgressIndicatorProps {
  /**
   * Optional manual override to force enable or disable the progress indicator
   */
  enabled?: boolean;
  /**
   * Optional custom class for the progress bar container
   */
  className?: string;
  /**
   * Show a subtle floating percentage pill on the right side when scrolling
   */
  showPercentage?: boolean;
  /**
   * Show estimated reading time on detail pages (ArticleDetail and ProjectDetails).
   * Defaults to true.
   */
  showReadingTime?: boolean;
  /**
   * Optional manual override for reading time (e.g., "7 min read")
   */
  readingTime?: string;
  /**
   * Optional title override for the item being read
   */
  itemTitle?: string;
  /**
   * List of path patterns where the progress indicator should be active.
   * Defaults to articles, project details, about, and long-form pages.
   */
  activeRoutes?: (string | RegExp)[];
}

const DEFAULT_ACTIVE_ROUTES: (string | RegExp)[] = [
  /^\/projects\/.+/,
  '/projects',
  '/portfolio',
  /^\/articles\/.+/,
  '/articles',
  /^\/blog\/.+/,
  '/blog',
  '/about',
  '/features',
  '/experience',
  '/skills',
];

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  enabled,
  className = '',
  showPercentage = false,
  showReadingTime = true,
  readingTime: propReadingTime,
  itemTitle: propItemTitle,
  activeRoutes = DEFAULT_ACTIVE_ROUTES,
}) => {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [percentValue, setPercentValue] = useState(0);
  const [displayMode, setDisplayMode] = useState<'smart' | 'total' | 'percent'>('smart');

  // Motion scroll progress hooks
  const { scrollYProgress, scrollY } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  // Track if current route matches long-form criteria
  const isTargetRoute = useMemo(() => {
    if (enabled !== undefined) return enabled;
    return activeRoutes.some((route) => {
      if (typeof route === 'string') {
        return location.pathname === route || location.pathname.startsWith(`${route}/`);
      }
      return route.test(location.pathname);
    });
  }, [enabled, location.pathname, activeRoutes]);

  // Determine reading time metadata for detail pages (Articles & Projects)
  const routeReadingMeta = useMemo(() => {
    return getReadingTimeForRoute(location.pathname);
  }, [location.pathname]);

  const isDetailPage = Boolean(
    propReadingTime ||
    routeReadingMeta.isDetail ||
    /^\/(?:articles|blog|projects)\/[^/]+/.test(location.pathname)
  );

  const shouldDisplayReadingTime = showReadingTime && isDetailPage;

  // Resolve total reading minutes and formatted string
  const totalMinutes = useMemo(() => {
    if (propReadingTime) {
      const match = propReadingTime.match(/\d+/);
      return match ? parseInt(match[0], 10) : 5;
    }
    return routeReadingMeta.totalMinutes || 5;
  }, [propReadingTime, routeReadingMeta.totalMinutes]);

  const formattedTotalReadTime = useMemo(() => {
    if (propReadingTime) return propReadingTime;
    return routeReadingMeta.formattedText || `${totalMinutes} min read`;
  }, [propReadingTime, routeReadingMeta.formattedText, totalMinutes]);

  const itemTitle = propItemTitle || routeReadingMeta.title;

  // Calculate remaining reading time based on scroll progress
  const remainingInfo = useMemo(() => {
    return calculateRemainingReadingTime(totalMinutes, percentValue / 100);
  }, [totalMinutes, percentValue]);

  useEffect(() => {
    const unsubscribeScroll = scrollY.on('change', (latest) => {
      // Only show when the user has begun scrolling and on target route
      setIsVisible(isTargetRoute && latest > 30);
    });

    const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
      setPercentValue(Math.round(latest * 100));
    });

    return () => {
      unsubscribeScroll();
      unsubscribeProgress();
    };
  }, [scrollY, scrollYProgress, isTargetRoute]);

  // Reset display mode on route change
  useEffect(() => {
    setDisplayMode('smart');
  }, [location.pathname]);

  if (!isTargetRoute) {
    return null;
  }

  const cycleDisplayMode = () => {
    setDisplayMode((current) => {
      if (current === 'smart') return 'total';
      if (current === 'total') return 'percent';
      return 'smart';
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden={!isVisible}
    >
      {/* Background track for contrast */}
      <div className="w-full h-[3px] bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-xs">
        {/* Animated Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 origin-left shadow-xs shadow-cyan-500/50"
          style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
        />
      </div>

      <AnimatePresence>
        {/* Estimated Reading Time Pill for ArticleDetail & ProjectDetails Pages */}
        {shouldDisplayReadingTime && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 sm:right-6 top-16 sm:top-[70px] pointer-events-auto"
          >
            <button
              type="button"
              onClick={cycleDisplayMode}
              title={`Estimated reading time: ${formattedTotalReadTime}. Click to toggle display mode.`}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-900/5 text-xs text-slate-700 dark:text-slate-200 font-medium select-none hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-cyan-500/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {remainingInfo.isComplete ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Completed</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">100%</span>
                </>
              ) : displayMode === 'smart' ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  {percentValue < 5 ? (
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {formattedTotalReadTime}
                    </span>
                  ) : (
                    <>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {remainingInfo.remainingText}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                        {percentValue}%
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden md:inline">
                        ({totalMinutes}m total)
                      </span>
                    </>
                  )}
                </>
              ) : displayMode === 'total' ? (
                <>
                  <Clock className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {formattedTotalReadTime}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    {percentValue}%
                  </span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    {percentValue}%
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    completed
                  </span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Fallback percentage badge on non-detail pages when showPercentage is enabled */}
        {!shouldDisplayReadingTime && showPercentage && isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute right-4 top-16 sm:top-[70px] pointer-events-none"
          >
            <div className="px-2 py-0.5 rounded-full bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-slate-700/50 shadow-sm">
              {percentValue}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
