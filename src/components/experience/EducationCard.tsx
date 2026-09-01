import React from 'react';
import { motion } from 'motion/react';
import { EducationItem } from '../../types';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface EducationCardProps {
  education: EducationItem;
}

export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {education.degree}
            </h3>
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
              {education.field}
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg shrink-0">
          <Calendar className="w-3.5 h-3.5" />
          {education.startDate} – {education.endDate}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-mono">
        <span>{education.institution}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {education.location}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        {education.description}
      </p>

      {education.highlights && education.highlights.length > 0 && (
        <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          {education.highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
