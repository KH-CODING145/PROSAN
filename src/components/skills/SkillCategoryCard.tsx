import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillCategoryGroup } from '../../data/skills';
import { SkillItem, SkillLevel } from '../../types';
import { Badge } from '../common/Badge';
import { 
  Code2, 
  Server, 
  Database, 
  Sparkles, 
  Cloud, 
  Wrench, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Terminal, 
  Workflow, 
  ShieldCheck, 
  Boxes, 
  FileCode, 
  Braces, 
  Zap, 
  Globe, 
  HardDrive, 
  GitBranch, 
  Container, 
  Palette, 
  TestTube, 
  Clock, 
  Award,
  FolderGit2,
  TrendingUp,
  Info
} from 'lucide-react';
import { cn } from '../../utils/cn';

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-5 h-5" />,
  Backend: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  'AI & ML': <Sparkles className="w-5 h-5" />,
  'DevOps & Cloud': <Cloud className="w-5 h-5" />,
  'Tools & Architecture': <Wrench className="w-5 h-5" />
};

// Technology specific icon resolver
const getSkillIcon = (name: string, category: string) => {
  const n = name.toLowerCase();
  if (n.includes('react')) return <Cpu className="w-4 h-4 text-cyan-500" />;
  if (n.includes('typescript') || n.includes('javascript')) return <FileCode className="w-4 h-4 text-blue-500" />;
  if (n.includes('tailwind') || n.includes('css') || n.includes('bootstrap')) return <Palette className="w-4 h-4 text-teal-500" />;
  if (n.includes('html')) return <Globe className="w-4 h-4 text-orange-500" />;
  if (n.includes('motion')) return <Zap className="w-4 h-4 text-purple-500" />;
  if (n.includes('next') || n.includes('vite') || n.includes('remix')) return <Boxes className="w-4 h-4 text-slate-700 dark:text-slate-300" />;
  
  if (n.includes('node') || n.includes('express')) return <Server className="w-4 h-4 text-emerald-500" />;
  if (n.includes('python') || n.includes('fastapi')) return <Braces className="w-4 h-4 text-yellow-500" />;
  if (n.includes('php') || n.includes('laravel')) return <Code2 className="w-4 h-4 text-indigo-500" />;
  if (n.includes('api') || n.includes('graphql') || n.includes('rest')) return <Workflow className="w-4 h-4 text-cyan-500" />;
  if (n.includes('socket') || n.includes('microservice')) return <Zap className="w-4 h-4 text-amber-500" />;

  if (n.includes('postgres') || n.includes('sql')) return <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
  if (n.includes('mongo')) return <HardDrive className="w-4 h-4 text-green-500" />;
  if (n.includes('redis')) return <Zap className="w-4 h-4 text-red-500" />;
  if (n.includes('firebase')) return <FlameIcon className="w-4 h-4 text-amber-500" />;
  if (n.includes('vector') || n.includes('pinecone')) return <Layers className="w-4 h-4 text-purple-500" />;

  if (n.includes('gemini') || n.includes('openai') || n.includes('gpt')) return <Sparkles className="w-4 h-4 text-indigo-400" />;
  if (n.includes('prompt') || n.includes('rag') || n.includes('agent') || n.includes('embedding')) return <BrainIcon className="w-4 h-4 text-cyan-400" />;
  if (n.includes('playwright') || n.includes('automation')) return <Terminal className="w-4 h-4 text-emerald-400" />;

  if (n.includes('git')) return <GitBranch className="w-4 h-4 text-orange-500" />;
  if (n.includes('docker') || n.includes('container')) return <Container className="w-4 h-4 text-cyan-500" />;
  if (n.includes('ci/cd') || n.includes('action')) return <Workflow className="w-4 h-4 text-purple-500" />;
  if (n.includes('cloud') || n.includes('gcp') || n.includes('aws')) return <Cloud className="w-4 h-4 text-sky-500" />;
  if (n.includes('linux') || n.includes('vps')) return <Terminal className="w-4 h-4 text-amber-400" />;
  if (n.includes('vercel') || n.includes('cloudflare')) return <Globe className="w-4 h-4 text-indigo-400" />;

  if (n.includes('security') || n.includes('auth')) return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
  if (n.includes('test') || n.includes('jest') || n.includes('vitest')) return <TestTube className="w-4 h-4 text-rose-500" />;
  if (n.includes('design') || n.includes('figma')) return <Palette className="w-4 h-4 text-violet-500" />;
  if (n.includes('performance') || n.includes('vital')) return <TrendingUp className="w-4 h-4 text-cyan-500" />;

  return categoryIcons[category] || <Code2 className="w-4 h-4 text-cyan-500" />;
};

const FlameIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Sparkles className={className} />
);

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Cpu className={className} />
);

const levelBadgeVariants: Record<SkillLevel, 'cyan' | 'blue' | 'purple' | 'slate'> = {
  Expert: 'cyan',
  Advanced: 'blue',
  Proficient: 'purple',
  Familiar: 'slate'
};

const levelColorMap: Record<SkillLevel, { bg: string; text: string; bar: string }> = {
  Expert: {
    bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    text: 'text-cyan-500',
    bar: 'from-cyan-500 to-blue-600'
  },
  Advanced: {
    bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    text: 'text-blue-500',
    bar: 'from-blue-500 to-indigo-600'
  },
  Proficient: {
    bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    text: 'text-purple-500',
    bar: 'from-purple-500 to-pink-600'
  },
  Familiar: {
    bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
    text: 'text-slate-400',
    bar: 'from-slate-400 to-slate-600'
  }
};

interface SkillInteractiveItemProps {
  skill: SkillItem;
  category: string;
}

const SkillInteractiveItem: React.FC<SkillInteractiveItemProps> = ({ skill, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const icon = getSkillIcon(skill.name, category);
  const color = levelColorMap[skill.level] || levelColorMap.Advanced;
  const score = skill.proficiencyScore || (skill.level === 'Expert' ? 95 : skill.level === 'Advanced' ? 88 : skill.level === 'Proficient' ? 80 : 70);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Skill Row Pill */}
      <div
        tabIndex={0}
        role="button"
        aria-label={`${skill.name} - ${skill.level} proficiency`}
        className={cn(
          'w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer outline-none select-none',
          'bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60',
          'hover:bg-white dark:hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-md hover:shadow-cyan-500/5 hover:-translate-y-0.5',
          'focus-visible:ring-2 focus-visible:ring-cyan-500',
          isHovered && 'border-cyan-500/60 bg-white dark:bg-slate-800 shadow-md shadow-cyan-500/10'
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={cn(
            'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200',
            'bg-slate-100 dark:bg-slate-700/70 border border-slate-200/80 dark:border-slate-600/60',
            isHovered && 'scale-110 bg-cyan-500/15 dark:bg-cyan-500/20 border-cyan-500/30'
          )}>
            {icon}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono truncate">
            {skill.name}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {skill.experienceYears && (
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-flex items-center gap-1 bg-slate-100/80 dark:bg-slate-700/40 px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3 text-slate-400" />
              {skill.experienceYears}
            </span>
          )}
          <Badge
            variant={levelBadgeVariants[skill.level] || 'slate'}
            size="sm"
            className="shadow-2xs text-[11px] font-mono font-semibold"
          >
            {skill.level}
          </Badge>
        </div>
      </div>

      {/* 🚀 Rich Interactive Tooltip Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 sm:left-auto sm:right-0 sm:w-80 bottom-full mb-2 z-50 pointer-events-none p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-950/98 backdrop-blur-xl border border-cyan-500/30 text-white shadow-2xl shadow-cyan-500/15"
          >
            {/* Tooltip Header */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-mono leading-tight">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    {category} Architecture
                  </span>
                </div>
              </div>
              <span className={cn('text-xs font-mono font-bold px-2 py-0.5 rounded-md border', color.bg)}>
                {skill.level}
              </span>
            </div>

            {/* Proficiency Meter */}
            <div className="space-y-1.5 mb-3 bg-slate-800/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  Proficiency Index
                </span>
                <span className="font-bold text-cyan-400">{score}%</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-700/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={cn('h-full rounded-full bg-gradient-to-r', color.bar)}
                />
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-2.5 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700/40 flex flex-col">
                <span className="text-slate-400 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Experience
                </span>
                <span className="font-semibold text-slate-200 mt-0.5">
                  {skill.experienceYears ? `${skill.experienceYears} Active` : 'Production Ready'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50 dark:bg-slate-900/50 border border-slate-700/40 flex flex-col">
                <span className="text-slate-400 text-[10px] flex items-center gap-1">
                  <FolderGit2 className="w-3 h-3 text-cyan-400" /> Projects
                </span>
                <span className="font-semibold text-slate-200 mt-0.5">
                  {skill.productionProjects ? `${skill.productionProjects}+ Delivered` : 'Production Tested'}
                </span>
              </div>
            </div>

            {/* Specialties / Capabilities */}
            {skill.specialty && (
              <div className="text-[11px] text-slate-300 bg-slate-800/40 dark:bg-slate-900/40 p-2 rounded-lg border border-slate-700/30">
                <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-0.5">
                  Key Capabilities & Patterns:
                </div>
                <p className="leading-snug text-slate-300">
                  {skill.specialty}
                </p>
              </div>
            )}

            {/* Tooltip Arrow Pointer */}
            <div className="absolute top-full left-1/2 sm:left-auto sm:right-6 -translate-x-1/2 sm:translate-x-0 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-slate-900/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SkillCategoryCardProps {
  group: SkillCategoryGroup;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ group }) => {
  const icon = categoryIcons[group.category] || <Code2 className="w-5 h-5" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {group.category}
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {group.skills.length} core proficiencies
              </span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 hidden sm:flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-cyan-500" />
            <span>Hover for details</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {group.description}
        </p>

        {/* Skills List with Rich Hover Effects & Tooltips */}
        <div className="space-y-2.5">
          {group.skills.map((skill) => (
            <SkillInteractiveItem
              key={skill.name}
              skill={skill}
              category={group.category}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
