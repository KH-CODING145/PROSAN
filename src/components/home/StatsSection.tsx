import React from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../../config/siteConfig';
import { Clock, Code2, Layers, Award, Star, Github } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />
};

export const StatsSection: React.FC = () => {
  const stats = siteConfig.stats;

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                {iconMap[stat.icon] || <Code2 className="w-5 h-5" />}
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {stat.label}
              </p>
              {stat.helper && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  {stat.helper}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
