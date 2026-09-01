import React from 'react';
import { ProjectCategory } from '../../types';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ProjectFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProjectCategory;
  onCategoryChange: (cat: ProjectCategory) => void;
  selectedTech: string;
  onTechChange: (tech: string) => void;
  availableTechs: string[];
  totalResults: number;
}

const categories: ProjectCategory[] = [
  'All',
  'AI & Automation',
  'Full-Stack',
  'Web Development',
  'SaaS',
  'Cloud & Backend',
  'Mobile Development'
];

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTech,
  onTechChange,
  availableTechs,
  totalResults
}) => {
  return (
    <div className="space-y-6 mb-10">
      {/* Search & Tech Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title, keyword, or architecture..."
            className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tech Selector Dropdown */}
        <div className="sm:w-60">
          <select
            value={selectedTech}
            onChange={(e) => onTechChange(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
          >
            <option value="">All Technologies</option>
            {availableTechs.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer',
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-xs font-semibold'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-slate-500 shrink-0">
          Showing {totalResults} {totalResults === 1 ? 'project' : 'projects'}
        </span>
      </div>
    </div>
  );
};
