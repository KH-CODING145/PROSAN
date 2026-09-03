import React from 'react';
import { Skeleton } from '../common/Skeleton';

export interface ProjectCardSkeletonProps {
  className?: string;
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-all ${className}`}
    >
      {/* Thumbnail Aspect Video */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-200/90 dark:bg-slate-800/90">
        <Skeleton className="w-full h-full rounded-none" />

        {/* Badges placeholder */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Skeleton className="h-5 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
          <Skeleton className="h-5 w-16 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Action button placeholder */}
        <div className="absolute bottom-3 right-3">
          <Skeleton className="w-8 h-8 rounded-lg bg-slate-300/80 dark:bg-slate-700/60" />
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Title */}
          <Skeleton className="h-6 w-3/4 rounded-lg" />

          {/* Description Lines */}
          <div className="space-y-2 pt-1">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-5 w-14 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>

          {/* Footer Metadata */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
