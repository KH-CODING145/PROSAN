import React from 'react';
import { Skeleton } from '../common/Skeleton';

export interface ArticleCardSkeletonProps {
  className?: string;
}

export const ArticleCardSkeleton: React.FC<ArticleCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6 ${className}`}
    >
      <div className="space-y-4">
        {/* Meta Row: Date & Read Time */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3.5 w-24 rounded" />
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-3.5 w-20 rounded" />
        </div>

        {/* Title */}
        <Skeleton className="h-7 sm:h-8 w-4/5 rounded-lg" />

        {/* Excerpt Lines */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-11/12 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </div>

      {/* Footer: Tags and Read Link */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>

        <Skeleton className="h-4 w-28 rounded" />
      </div>
    </div>
  );
};
