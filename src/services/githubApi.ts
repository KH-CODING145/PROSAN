import axios from 'axios';
import { GithubRepo, GithubStats } from '../types';

const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 101,
    name: 'nexus-ai-engine',
    description: 'Enterprise multi-agent LLM orchestration framework with deterministic state machines and WebSocket streaming.',
    language: 'TypeScript',
    stars: 842,
    forks: 118,
    updatedAt: '2 days ago',
    htmlUrl: 'https://github.com/example/nexus-ai-engine',
    topics: ['agent-framework', 'gemini-api', 'typescript', 'orchestration']
  },
  {
    id: 102,
    name: 'strata-ui-primitives',
    description: 'Accessible, unstyled React component engine with strict WCAG AAA compliance and zero runtime CSS overhead.',
    language: 'TypeScript',
    stars: 620,
    forks: 74,
    updatedAt: '1 week ago',
    htmlUrl: 'https://github.com/example/strata-ui-primitives',
    topics: ['react', 'accessibility', 'design-system', 'tailwind']
  },
  {
    id: 103,
    name: 'chronos-task-queue',
    description: 'High-throughput distributed background job scheduler and worker cluster with microsecond precision.',
    language: 'JavaScript',
    stars: 495,
    forks: 58,
    updatedAt: '2 weeks ago',
    htmlUrl: 'https://github.com/example/chronos-task-queue',
    topics: ['nodejs', 'redis', 'queue', 'distributed-systems']
  },
  {
    id: 104,
    name: 'playwright-stealth-automator',
    description: 'Resilient web automation suite featuring self-healing layout selectors and automated vision fallbacks.',
    language: 'Python',
    stars: 380,
    forks: 42,
    updatedAt: '3 weeks ago',
    htmlUrl: 'https://github.com/example/playwright-stealth-automator',
    topics: ['playwright', 'automation', 'scraping', 'python']
  }
];

const FALLBACK_STATS: GithubStats = {
  username: 'pro-san',
  publicRepos: 42,
  followers: 680,
  following: 195,
  totalStars: 2337,
  avatarUrl: '/assets/avatar.svg',
  profileUrl: 'https://github.com'
};

export async function fetchGithubData(username?: string): Promise<{
  stats: GithubStats;
  repos: GithubRepo[];
  isFallback: boolean;
}> {
  const targetUser = username || import.meta.env.VITE_GITHUB_USERNAME || 'torvalds';

  if (!targetUser || targetUser === 'YOUR_GITHUB_USERNAME') {
    return {
      stats: FALLBACK_STATS,
      repos: FALLBACK_REPOS,
      isFallback: true
    };
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${targetUser}`, { timeout: 5000 }),
      axios.get(`https://api.github.com/users/${targetUser}/repos?sort=updated&per_page=6`, { timeout: 5000 })
    ]);

    const repos: GithubRepo[] = reposRes.data.map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description || 'Open-source software repository and utilities.',
      language: r.language || 'TypeScript',
      stars: r.stargazers_count,
      forks: r.forks_count,
      updatedAt: new Date(r.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      htmlUrl: r.html_url,
      topics: r.topics || []
    }));

    const totalStars = repos.reduce((acc, curr) => acc + curr.stars, 0);

    const stats: GithubStats = {
      username: userRes.data.login,
      publicRepos: userRes.data.public_repos,
      followers: userRes.data.followers,
      following: userRes.data.following,
      totalStars: totalStars > 0 ? totalStars : 2300,
      avatarUrl: userRes.data.avatar_url,
      profileUrl: userRes.data.html_url
    };

    return { stats, repos, isFallback: false };
  } catch (error) {
    console.warn('GitHub API fetch failed or rate limited, using graceful fallback dataset.', error);
    return {
      stats: FALLBACK_STATS,
      repos: FALLBACK_REPOS,
      isFallback: true
    };
  }
}
