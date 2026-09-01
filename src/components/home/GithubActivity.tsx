import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { fetchGithubData } from '../../services/githubApi';
import { GithubRepo, GithubStats } from '../../types';
import { SectionTitle } from '../common/SectionTitle';
import { Badge } from '../common/Badge';
import { 
  Github, 
  Star, 
  GitFork, 
  Users, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  Calendar,
  Activity
} from 'lucide-react';

export const GithubActivity: React.FC = () => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const result = await fetchGithubData();
        if (isMounted) {
          setStats(result.stats);
          setRepos(result.repos);
          setIsFallback(result.isFallback);
        }
      } catch (e) {
        console.warn('Failed to load GitHub activity', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Open Source & Code"
          title="GitHub Engineering Activity"
          description="A glimpse into open-source contributions, developer utilities, algorithm repositories, and public codebases."
        />

        {/* Overview Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {stats.publicRepos}+
                </p>
                <p className="text-xs text-slate-500 font-mono">Repositories</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {stats.totalStars}
                </p>
                <p className="text-xs text-slate-500 font-mono">Earned Stars</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {stats.followers}
                </p>
                <p className="text-xs text-slate-500 font-mono">Followers</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                  1,840+
                </p>
                <p className="text-xs text-slate-500 font-mono">Yearly Commits</p>
              </div>
            </div>
          </div>
        )}

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/repo flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span className="font-mono">{repo.name}</span>
                  </a>
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open repository ${repo.name}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks}
                  </span>
                </div>
                <span>Updated {repo.updatedAt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Profile on GitHub */}
        <div className="mt-10 text-center">
          <a
            href={stats?.profileUrl || 'https://github.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 text-sm font-medium border border-slate-700 shadow-sm transition-all"
          >
            <Github className="w-4 h-4" />
            <span>Follow @{stats?.username || 'alexander-dev'} on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
