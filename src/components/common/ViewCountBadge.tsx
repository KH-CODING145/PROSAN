import React from 'react';
import { Eye, Flame, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { useItemViews } from '../../hooks/useItemViews';

interface ViewCountBadgeProps {
  itemId: string;
  itemType: 'project' | 'article';
  autoIncrement?: boolean;
  variant?: 'compact' | 'badge' | 'card';
  showPopularityBadge?: boolean;
  className?: string;
}

export const ViewCountBadge: React.FC<ViewCountBadgeProps> = ({
  itemId,
  itemType,
  autoIncrement = false,
  variant = 'badge',
  showPopularityBadge = true,
  className = '',
}) => {
  const { views, isLoading, popularity, isLive } = useItemViews({
    itemId,
    itemType,
    autoIncrement,
  });

  const formattedCount = new Intl.NumberFormat('en-US').format(views);

  // Icon corresponding to popularity tier
  const renderPopularityIcon = () => {
    switch (popularity.tier) {
      case 'viral':
        return <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />;
      case 'trending':
        return <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />;
      case 'high':
      case 'active':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Activity className="w-3 h-3 text-slate-400" />;
    }
  };

  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 ${className}`}
        title={`Viewed ${formattedCount} times (Synced with Firestore)`}
      >
        <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {isLoading ? '...' : formattedCount}
        </span>
        {showPopularityBadge && views > 0 && (
          <span
            className={`ml-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${popularity.bgClass} ${popularity.colorClass} ${popularity.borderClass}`}
          >
            {popularity.label}
          </span>
        )}
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 ${className}`}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-mono text-slate-500 dark:text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-500" />
            <span>Popularity Telemetry</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {isLive ? 'Live Firestore' : 'Syncing'}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isLoading ? (
                  <span className="inline-block w-16 h-7 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
                ) : (
                  formattedCount
                )}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Verified reader impressions
            </p>
          </div>

          <div className="text-right">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${popularity.bgClass} ${popularity.colorClass} ${popularity.borderClass}`}
            >
              {renderPopularityIcon()}
              <span>{popularity.label}</span>
            </span>
            {popularity.rankText && (
              <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                {popularity.rankText}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default Badge Variant
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 ${className}`}
      id={`view-metrics-${itemType}-${itemId}`}
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-mono">
        <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
        <span className="font-bold text-slate-800 dark:text-slate-200">
          {isLoading ? (
            <span className="inline-block w-6 h-3 bg-slate-200 dark:bg-slate-700 animate-pulse rounded" />
          ) : (
            formattedCount
          )}
        </span>
        <span className="text-slate-400 dark:text-slate-500 text-[11px]">views</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" title="Live Firestore" />
      </div>

      {showPopularityBadge && (
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border ${popularity.bgClass} ${popularity.colorClass} ${popularity.borderClass}`}
        >
          {renderPopularityIcon()}
          <span>{popularity.label}</span>
        </span>
      )}
    </div>
  );
};
