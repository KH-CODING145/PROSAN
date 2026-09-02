import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '../../hooks/useScrollReveal';

export interface ScrollProgressIndicatorProps {
  /**
   * Optional manual override to force enable or disable
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
   * List of path patterns where the progress indicator should be active.
   * Defaults to articles, project details, about, and long-form pages.
   */
  activeRoutes?: (string | RegExp)[];
}

const DEFAULT_ACTIVE_ROUTES: (string | RegExp)[] = [
  /^\/projects\/.+/,
  '/projects',
  '/portfolio',
  '/articles',
  '/blog',
  '/about',
  '/features',
  '/experience',
  '/skills'
];

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  enabled,
  className = '',
  showPercentage = false,
  activeRoutes = DEFAULT_ACTIVE_ROUTES
}) => {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [percentValue, setPercentValue] = useState(0);

  // Motion scroll progress hooks
  const { scrollYProgress, scrollY } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  // Track if current route matches long-form criteria
  const isTargetRoute = React.useMemo(() => {
    if (enabled !== undefined) return enabled;
    return activeRoutes.some((route) => {
      if (typeof route === 'string') {
        return location.pathname === route || location.pathname.startsWith(`${route}/`);
      }
      return route.test(location.pathname);
    });
  }, [enabled, location.pathname, activeRoutes]);

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

  if (!isTargetRoute) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      {/* Background track for contrast */}
      <div className="w-full h-[3px] bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-xs">
        {/* Animated Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 origin-left shadow-xs shadow-cyan-500/50"
          style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
        />
      </div>

      {/* Floating subtle percentage badge if enabled */}
      {showPercentage && isVisible && (
        <div className="absolute right-4 top-2 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 py-0.5 rounded-full bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-slate-700/50 shadow-sm"
          >
            {percentValue}%
          </motion.div>
        </div>
      )}
    </div>
  );
};
