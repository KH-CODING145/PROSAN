import React, { useState, useMemo } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { skillsData } from '../data/skills';
import { SkillCategoryCard } from '../components/skills/SkillCategoryCard';
import { SectionTitle } from '../components/common/SectionTitle';
import { 
  Search, 
  Sparkles, 
  Layers, 
  Award, 
  Clock, 
  CheckCircle2, 
  SlidersHorizontal,
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Info
} from 'lucide-react';
import { SkillLevel } from '../types';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

const categories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'AI & ML',
  'DevOps & Cloud',
  'Tools & Architecture'
] as const;

const levels: ('All' | SkillLevel)[] = [
  'All',
  'Expert',
  'Advanced',
  'Proficient'
];

export const SkillsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<'All' | SkillLevel>('All');

  const totalSkillsCount = useMemo(() => {
    return skillsData.reduce((acc, g) => acc + g.skills.length, 0);
  }, []);

  const expertCount = useMemo(() => {
    return skillsData.reduce((acc, g) => acc + g.skills.filter(s => s.level === 'Expert').length, 0);
  }, []);

  const filteredGroups = useMemo(() => {
    return skillsData
      .filter((group) => selectedCategory === 'All' || group.category === selectedCategory)
      .map((group) => {
        const filteredSkills = group.skills.filter((s) => {
          const matchesSearch = !searchQuery || 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.category.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesLevel = selectedLevel === 'All' || s.level === selectedLevel;

          return matchesSearch && matchesLevel;
        });

        return {
          ...group,
          skills: filteredSkills
        };
      })
      .filter((group) => group.skills.length > 0);
  }, [searchQuery, selectedCategory, selectedLevel]);

  return (
    <PageContainer
      title="Technical Skills & Competency Matrix"
      description="Deep dive into full-stack frameworks, AI LLM integrations, cloud infrastructure, databases, and DevOps tooling."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          tag="Full Technical Stack"
          title="Skills & Technical Ecosystem"
          description="Detailed breakdown of frameworks, programming languages, database architectures, and AI model orchestration platforms. Hover or tap on any skill to view years of experience and proficiency metrics."
        />

        {/* 📊 Summary Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {totalSkillsCount}+
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Core Technologies
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {expertCount}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Expert-Level Stacks
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                6+ Yrs
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Production Experience
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                96%
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Avg Expert Mastery
              </div>
            </div>
          </motion.div>
        </div>

        {/* 🔍 Search & Interactive Filters */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          {/* Search bar & Interactive Helper */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies, tools, patterns (e.g. React, Gemini, Docker, RAG)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-cyan-500/5 dark:bg-cyan-500/10 px-3.5 py-2 rounded-xl border border-cyan-500/20">
              <Info className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>
                <strong>UX Tip:</strong> Hover or tap any skill icon to view proficiency levels, metrics, and architecture patterns.
              </span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Filter by Category
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer select-none',
                      isActive
                        ? 'bg-cyan-500 text-white shadow-xs font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Filter Chips */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Filter by Proficiency Level
            </div>
            <div className="flex flex-wrap gap-2">
              {levels.map((lvl) => {
                const isActive = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={cn(
                      'px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer select-none',
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-xs'
                        : 'bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    )}
                  >
                    {lvl === 'All' ? 'All Proficiency Levels' : lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <SkillCategoryCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No matching technologies found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
              Try adjusting your search keywords or clearing your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
