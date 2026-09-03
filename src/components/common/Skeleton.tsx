import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rectangular' | 'rounded' | 'circular';
  shimmer?: boolean;
}

/**
 * Base Skeleton component for layout placeholding with shimmer animation.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  shimmer = true,
  ...props
}) => {
  const variantClasses = {
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
    circular: 'rounded-full',
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/80 ${variantClasses} ${className}`}
      {...props}
    >
      {shimmer && (
        <div 
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent pointer-events-none"
        />
      )}
    </div>
  );
};
