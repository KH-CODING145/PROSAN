import React from 'react';
import { motion } from 'motion/react';
import { ExperienceItem } from '../../types';
import { Badge } from '../common/Badge';
import { Briefcase, MapPin, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="relative pl-8 sm:pl-10 pb-10 last:pb-0 group"
    >
      {/* Vertical Connecting Line */}
      <div className="absolute left-[11px] top-4 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 group-last:hidden" />

      {/* Node Dot */}
      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 flex items-center justify-center shadow-xs">
        <span className="w-2 h-2 rounded-full bg-cyan-500" />
      </div>

      {/* Content Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-colors">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {item.position}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                {item.company}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3 h-3" />
                {item.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-cyan-500" />
              {item.startDate} – {item.endDate}
            </span>
            {item.current && (
              <Badge variant="emerald" size="sm" dot>
                Present
              </Badge>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          {item.description}
        </p>

        {/* Responsibilities */}
        <div className="mt-4 space-y-2">
          {item.responsibilities.map((resp, rIdx) => (
            <div key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
              <span>{resp}</span>
            </div>
          ))}
        </div>

        {/* Quantifiable Achievements */}
        {item.achievements && item.achievements.length > 0 && (
          <div className="mt-4 p-3 bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 rounded-xl space-y-1">
            <p className="text-[11px] uppercase font-mono font-bold text-cyan-700 dark:text-cyan-300">
              Key Quantifiable Impact
            </p>
            {item.achievements.map((ach, aIdx) => (
              <p key={aIdx} className="text-xs text-slate-700 dark:text-slate-300">
                ⭐ {ach}
              </p>
            ))}
          </div>
        )}

        {/* Technologies Tag Array */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
