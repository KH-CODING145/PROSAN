import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSearch, SearchCategoryFilter } from '../../context/SearchContext';
import { projectsData } from '../../data/projects';
import { articlesData } from '../../data/articles';
import { skillsData } from '../../data/skills';
import { 
  Search, 
  X, 
  FolderGit2, 
  BookOpen, 
  Cpu, 
  ArrowRight, 
  CornerDownLeft, 
  Sparkles, 
  Clock, 
  Tag, 
  Command, 
  Compass, 
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../utils/cn';

export interface UnifiedSearchResult {
  id: string;
  type: 'project' | 'article' | 'skill' | 'navigation';
  title: string;
  subtitle: string;
  category: string;
  url: string;
  tags?: string[];
  meta?: string;
  badge?: string;
  badgeColor?: string;
}

const POPULAR_QUICK_SEARCHES = [
  'AI Agents',
  'PostgreSQL',
  'React 18 / 19',
  'RAG Pipeline',
  'Docker',
  'FastAPI',
  'TypeScript',
  'Multi-Agent'
];

const QUICK_NAV_ITEMS: UnifiedSearchResult[] = [
  {
    id: 'nav-projects',
    type: 'navigation',
    title: 'Explore All Projects',
    subtitle: 'Browse featured enterprise software & AI automation case studies',
    category: 'Navigation',
    url: '/projects',
    badge: 'Portfolio'
  },
  {
    id: 'nav-articles',
    type: 'navigation',
    title: 'Technical Articles & Deep Dives',
    subtitle: 'Essays on deterministic AI, system design, and frontend architecture',
    category: 'Navigation',
    url: '/articles',
    badge: 'Blog'
  },
  {
    id: 'nav-skills',
    type: 'navigation',
    title: 'Skills Matrix & Architecture Stack',
    subtitle: 'Comprehensive evaluation across frontend, backend, databases, and AI',
    category: 'Navigation',
    url: '/skills',
    badge: 'Skills'
  },
  {
    id: 'nav-experience',
    type: 'navigation',
    title: 'Work Experience & Leadership',
    subtitle: 'Career timeline, technical milestones, and enterprise impact',
    category: 'Navigation',
    url: '/experience',
    badge: 'Career'
  },
  {
    id: 'nav-contact',
    type: 'navigation',
    title: 'Get In Touch / Hire',
    subtitle: 'Direct messaging and project collaboration inquiries',
    category: 'Navigation',
    url: '/contact',
    badge: 'Connect'
  }
];

export const GlobalSearchModal: React.FC = () => {
  const { isOpen, closeSearch, initialQuery, initialCategory, isMac } = useSearch();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Sync initial state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery || '');
      setSelectedCategory(initialCategory || 'all');
      setSelectedIndex(0);

      // Auto-focus input after modal renders
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialQuery, initialCategory]);

  // Flatten all skills into a searchable array
  const allSkills = useMemo(() => {
    return skillsData.flatMap((group) =>
      group.skills.map((skill) => ({
        ...skill,
        groupCategory: group.category
      }))
    );
  }, []);

  // Filter and compute search results
  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const tokens = trimmed.split(/\s+/).filter(Boolean);

    // Filter projects
    const matchedProjects: UnifiedSearchResult[] = projectsData
      .filter((project) => {
        if (tokens.length === 0) return false;
        const targetString = `${project.title} ${project.shortDescription} ${project.category} ${project.role} ${project.technologies.join(' ')}`.toLowerCase();
        return tokens.every((token) => targetString.includes(token));
      })
      .map((project) => ({
        id: `proj-${project.id}`,
        type: 'project' as const,
        title: project.title,
        subtitle: project.shortDescription,
        category: project.category,
        url: `/projects/${project.slug}`,
        tags: project.technologies.slice(0, 4),
        meta: project.role,
        badge: project.category,
        badgeColor: 'cyan'
      }));

    // Filter articles
    const matchedArticles: UnifiedSearchResult[] = articlesData
      .filter((article) => {
        if (tokens.length === 0) return false;
        const targetString = `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(' ')}`.toLowerCase();
        return tokens.every((token) => targetString.includes(token));
      })
      .map((article) => ({
        id: `art-${article.id}`,
        type: 'article' as const,
        title: article.title,
        subtitle: article.excerpt,
        category: 'Article',
        url: `/articles/${article.slug}`,
        tags: article.tags.slice(0, 3),
        meta: article.readTime,
        badge: article.readTime,
        badgeColor: 'violet'
      }));

    // Filter skills
    const matchedSkills: UnifiedSearchResult[] = allSkills
      .filter((skill) => {
        if (tokens.length === 0) return false;
        const targetString = `${skill.name} ${skill.groupCategory} ${skill.level} ${skill.specialty || ''}`.toLowerCase();
        return tokens.every((token) => targetString.includes(token));
      })
      .map((skill) => ({
        id: `skill-${skill.name}`,
        type: 'skill' as const,
        title: skill.name,
        subtitle: skill.specialty || `${skill.groupCategory} framework & architecture`,
        category: skill.groupCategory,
        url: `/skills?category=${encodeURIComponent(skill.groupCategory)}&q=${encodeURIComponent(skill.name)}`,
        meta: skill.experienceYears ? `${skill.experienceYears} exp` : undefined,
        badge: skill.level,
        badgeColor: skill.level === 'Expert' ? 'emerald' : 'blue'
      }));

    // Filter navigation shortcuts
    const matchedNav: UnifiedSearchResult[] = QUICK_NAV_ITEMS.filter((item) => {
      if (tokens.length === 0) return false;
      const targetString = `${item.title} ${item.subtitle} ${item.badge || ''}`.toLowerCase();
      return tokens.every((token) => targetString.includes(token));
    });

    return {
      projects: matchedProjects,
      articles: matchedArticles,
      skills: matchedSkills,
      navigation: matchedNav
    };
  }, [query, allSkills]);

  // Active items list based on selectedCategory tab
  const visibleItems = useMemo<UnifiedSearchResult[]>(() => {
    if (!query.trim()) {
      // Empty query default recommendations
      if (selectedCategory === 'projects') {
        return projectsData.map((p) => ({
          id: `proj-${p.id}`,
          type: 'project',
          title: p.title,
          subtitle: p.shortDescription,
          category: p.category,
          url: `/projects/${p.slug}`,
          tags: p.technologies.slice(0, 4),
          badge: p.category
        }));
      }
      if (selectedCategory === 'articles') {
        return articlesData.map((a) => ({
          id: `art-${a.id}`,
          type: 'article',
          title: a.title,
          subtitle: a.excerpt,
          category: 'Article',
          url: `/articles/${a.slug}`,
          tags: a.tags.slice(0, 3),
          badge: a.readTime
        }));
      }
      if (selectedCategory === 'skills') {
        return allSkills.filter((s) => s.highlight).map((s) => ({
          id: `skill-${s.name}`,
          type: 'skill',
          title: s.name,
          subtitle: s.specialty || `${s.groupCategory} architecture`,
          category: s.groupCategory,
          url: `/skills?category=${encodeURIComponent(s.groupCategory)}&q=${encodeURIComponent(s.name)}`,
          badge: s.level
        }));
      }
      // 'all' default: combine recommended items
      const topProjects = projectsData.slice(0, 2).map((p) => ({
        id: `proj-${p.id}`,
        type: 'project' as const,
        title: p.title,
        subtitle: p.shortDescription,
        category: p.category,
        url: `/projects/${p.slug}`,
        tags: p.technologies.slice(0, 3),
        badge: 'Featured Project'
      }));

      const topArticles = articlesData.slice(0, 2).map((a) => ({
        id: `art-${a.id}`,
        type: 'article' as const,
        title: a.title,
        subtitle: a.excerpt,
        category: 'Article',
        url: `/articles/${a.slug}`,
        badge: a.readTime
      }));

      const topSkills = allSkills.filter((s) => s.highlight).slice(0, 4).map((s) => ({
        id: `skill-${s.name}`,
        type: 'skill' as const,
        title: s.name,
        subtitle: s.specialty || `${s.groupCategory} architecture`,
        category: s.groupCategory,
        url: `/skills?category=${encodeURIComponent(s.groupCategory)}&q=${encodeURIComponent(s.name)}`,
        badge: s.level
      }));

      return [...topProjects, ...topArticles, ...topSkills, ...QUICK_NAV_ITEMS.slice(0, 2)];
    }

    // Filter according to category tab
    if (selectedCategory === 'projects') return searchResults.projects;
    if (selectedCategory === 'articles') return searchResults.articles;
    if (selectedCategory === 'skills') return searchResults.skills;

    // 'all' tab: assemble in priority order
    return [
      ...searchResults.projects,
      ...searchResults.articles,
      ...searchResults.skills,
      ...searchResults.navigation
    ];
  }, [query, selectedCategory, searchResults, allSkills]);

  // Keep selected index within bounds
  useEffect(() => {
    if (selectedIndex >= visibleItems.length) {
      setSelectedIndex(0);
    }
  }, [visibleItems.length, selectedIndex]);

  // Auto-scroll active item into view
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation within the modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (visibleItems.length > 0 ? (prev + 1) % visibleItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (visibleItems.length > 0 ? (prev - 1 + visibleItems.length) % visibleItems.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visibleItems[selectedIndex]) {
        handleSelectItem(visibleItems[selectedIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Cycle through categories
      const categories: SearchCategoryFilter[] = ['all', 'projects', 'articles', 'skills'];
      const nextIdx = (categories.indexOf(selectedCategory) + (e.shiftKey ? -1 : 1) + categories.length) % categories.length;
      setSelectedCategory(categories[nextIdx]);
      setSelectedIndex(0);
    }
  };

  const handleSelectItem = (item: UnifiedSearchResult) => {
    closeSearch();
    navigate(item.url);
  };

  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    const tokens = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return text;

    // Construct regex from escaped tokens
    const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold px-0.5 rounded"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const getItemIcon = (type: UnifiedSearchResult['type']) => {
    switch (type) {
      case 'project':
        return <FolderGit2 className="w-4 h-4 text-cyan-500" />;
      case 'article':
        return <BookOpen className="w-4 h-4 text-violet-500" />;
      case 'skill':
        return <Cpu className="w-4 h-4 text-emerald-500" />;
      case 'navigation':
        return <Compass className="w-4 h-4 text-amber-500" />;
    }
  };

  const totalResultsCount = 
    searchResults.projects.length +
    searchResults.articles.length +
    searchResults.skills.length +
    searchResults.navigation.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="global-search-dialog-root"
          className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Global Search & Command Palette"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[80vh]"
            onKeyDown={handleKeyDown}
          >
            {/* Top Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <Search className="w-5 h-5 text-cyan-500 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, blog articles, technical skills... (Ctrl+K)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                aria-label="Search across portfolio"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2 transition-colors"
                  title="Clear search"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={closeSearch}
                className="px-2 py-1 rounded-md text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                title="Close palette"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-950/30 text-xs overflow-x-auto no-scrollbar gap-1.5">
              <div className="flex items-center gap-1.5">
                {(['all', 'projects', 'articles', 'skills'] as const).map((cat) => {
                  const isActive = selectedCategory === cat;
                  let count = 0;
                  if (cat === 'all') count = totalResultsCount;
                  if (cat === 'projects') count = searchResults.projects.length;
                  if (cat === 'articles') count = searchResults.articles.length;
                  if (cat === 'skills') count = searchResults.skills.length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedIndex(0);
                        inputRef.current?.focus();
                      }}
                      className={cn(
                        'px-2.5 py-1 rounded-lg font-medium capitalize transition-all whitespace-nowrap flex items-center gap-1.5',
                        isActive
                          ? 'bg-cyan-500 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      )}
                    >
                      <span>{cat === 'all' ? 'All Results' : cat}</span>
                      {query.trim() && (
                        <span
                          className={cn(
                            'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center text-[11px] text-slate-400 font-mono gap-1">
                <span>Tab</span>
                <span>cycles tabs</span>
              </div>
            </div>

            {/* Scrollable Results Area */}
            <div
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 divide-y divide-slate-100/50 dark:divide-slate-800/50"
            >
              {/* Empty query recommendations header */}
              {!query.trim() && (
                <div className="px-2 pt-1 pb-2">
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-500" />
                    <span>Popular Searches</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {POPULAR_QUICK_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700/80 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Featured & Recommended
                  </p>
                </div>
              )}

              {/* No results empty state */}
              {query.trim() && visibleItems.length === 0 && (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      We couldn&apos;t find matching projects, articles, or skills. Try a broader search term or choose from popular suggestions above.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
                    >
                      Clear Search
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      Reset Category Filter
                    </button>
                  </div>
                </div>
              )}

              {/* Results Items */}
              {visibleItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    ref={isSelected ? activeItemRef : null}
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group relative focus:outline-none',
                      isSelected
                        ? 'bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/40 shadow-xs'
                        : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/60 border border-transparent'
                    )}
                  >
                    {/* Icon Container */}
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                        item.type === 'project' && 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
                        item.type === 'article' && 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
                        item.type === 'skill' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                        item.type === 'navigation' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      )}
                    >
                      {getItemIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {highlightMatch(item.title, query)}
                        </span>

                        {item.badge && (
                          <span
                            className={cn(
                              'text-[10px] font-mono px-1.5 py-0.5 rounded-md font-medium shrink-0',
                              item.type === 'project' && 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300',
                              item.type === 'article' && 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300',
                              item.type === 'skill' && 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
                              item.type === 'navigation' && 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}

                        {item.meta && (
                          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 ml-auto shrink-0 hidden sm:inline-block">
                            {item.meta}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {highlightMatch(item.subtitle, query)}
                      </p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Enter Indicator */}
                    <div
                      className={cn(
                        'shrink-0 flex items-center self-center text-xs font-mono transition-opacity',
                        isSelected ? 'opacity-100 text-cyan-600 dark:text-cyan-400' : 'opacity-0 group-hover:opacity-60 text-slate-400'
                      )}
                    >
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">↑</kbd>
                  <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">↵</kbd>
                  <span>select</span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">esc</kbd>
                  <span>close</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  {visibleItems.length} {visibleItems.length === 1 ? 'result' : 'results'}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-cyan-600 dark:text-cyan-400">
                  {isMac ? '⌘K' : 'Ctrl+K'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
