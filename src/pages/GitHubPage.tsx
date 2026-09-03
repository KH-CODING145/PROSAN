import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionTitle } from '../components/common/SectionTitle';
import { fetchGithubData } from '../services/githubApi';
import { GithubRepo, GithubStats } from '../types';
import { Button } from '../components/common/Button';
import { 
  GitFork, 
  Star, 
  BookOpen, 
  Users, 
  UserCheck, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  Search,
  Code2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const GitHubPage: React.FC = () => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchGithubData();
      setStats(data.stats);
      setRepos(data.repos);
      setIsFallback(data.isFallback);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))];

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <PageContainer
      title="Open Source & GitHub Repositories"
      description="Explore open-source developer tooling, agent frameworks, and production-ready repositories by PRO SAN."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          tag="Open-Source Contributions"
          title="GitHub Repositories & Activity"
          description="A direct look into my open-source codebases, libraries, automation scripts, and full-stack software architecture."
        />

        {/* Profile Card & Stats Grid */}
        {stats && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border-2 border-cyan-500/30 shrink-0">
                  <img
                    src={stats.avatarUrl}
                    alt={stats.username}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    @{stats.username}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-cyan-600 dark:text-cyan-400">
                    Active Open Source Contributor & Architect
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  asAnchor
                  href={stats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  View on GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadData}
                  disabled={isLoading}
                  leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
                >
                  Sync
                </Button>
              </div>
            </div>

            {/* Metrics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
                  <BookOpen className="w-4 h-4 text-cyan-500" />
                  <span>Public Repos</span>
                </div>
                <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {stats.publicRepos}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Total Stars</span>
                </div>
                <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {stats.totalStars.toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Followers</span>
                </div>
                <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {stats.followers.toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  <span>Following</span>
                </div>
                <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {stats.following.toLocaleString()}
                </p>
              </div>
            </div>

            {isFallback && (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-1">
                <AlertCircle className="w-3.5 h-3.5 text-cyan-500" />
                <span>Showing verified repository catalog (GitHub live sync is rate-governed).</span>
              </div>
            )}
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by name or topic..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  selectedLanguage === lang
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRepos.map((repo) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    <BookOpen className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span className="font-mono text-base">{repo.name}</span>
                  </div>

                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${repo.name} on GitHub`}
                    className="text-slate-400 hover:text-cyan-500 transition-colors p-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {repo.description}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[11px]"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    {repo.forks}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400">
                  {repo.updatedAt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
