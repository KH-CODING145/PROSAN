import React from 'react';
import { cn } from '../../utils/cn';

interface SectionTitleProps {
  tag?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  tag,
  title,
  description,
  align = 'center',
  className = ''
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {tag && (
        <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border mb-3',
          'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20'
        )}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>{tag}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
