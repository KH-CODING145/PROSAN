import { articlesData } from '../data/articles';
import { projectsData } from '../data/projects';
import { Project } from '../types';

export interface RouteReadingInfo {
  isDetail: boolean;
  type: 'article' | 'project' | null;
  slug: string | null;
  title: string | null;
  totalMinutes: number;
  formattedText: string;
}

/**
 * Calculates estimated reading time from arbitrary text.
 * Average reading speed: 200 words per minute.
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): { minutes: number; text: string } {
  if (!text || typeof text !== 'string') {
    return { minutes: 1, text: '1 min read' };
  }
  const cleanText = text.replace(/<[^>]*>/g, ' '); // Strip HTML tags if any
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return {
    minutes,
    text: `${minutes} min read`,
  };
}

/**
 * Calculates estimated reading time for a project case study.
 */
export function calculateProjectReadingTime(project: Project): { minutes: number; text: string } {
  if (project.readTime) {
    const match = project.readTime.match(/\d+/);
    const parsed = match ? parseInt(match[0], 10) : 5;
    return { minutes: parsed, text: project.readTime };
  }

  const combinedContent = [
    project.title,
    project.shortDescription,
    project.fullDescription,
    ...(project.features || []),
    ...(project.challenges || []),
    ...(project.solutions || []),
    ...(project.results || []),
    project.architecture?.frontend,
    project.architecture?.backend,
    project.architecture?.database,
    project.architecture?.aiOrCloud,
    project.architecture?.deployment,
  ]
    .filter(Boolean)
    .join(' ');

  return calculateReadingTime(combinedContent, 200);
}

/**
 * Retrieves the reading time info for a given URL pathname.
 * Handles /articles/:slug, /blog/:slug, and /projects/:slug.
 */
export function getReadingTimeForRoute(pathname: string): RouteReadingInfo {
  // Check article detail route (/articles/:slug or /blog/:slug)
  const articleMatch = pathname.match(/^\/(?:articles|blog)\/([^/?#]+)/);
  if (articleMatch) {
    const slug = decodeURIComponent(articleMatch[1]);
    const article = articlesData.find((a) => a.slug === slug);
    if (article) {
      const match = article.readTime?.match(/\d+/);
      const minutes = match ? parseInt(match[0], 10) : 5;
      return {
        isDetail: true,
        type: 'article',
        slug: article.slug,
        title: article.title,
        totalMinutes: minutes,
        formattedText: article.readTime || `${minutes} min read`,
      };
    }
  }

  // Check project detail route (/projects/:slug)
  const projectMatch = pathname.match(/^\/projects\/([^/?#]+)/);
  if (projectMatch) {
    const slug = decodeURIComponent(projectMatch[1]);
    const project = projectsData.find((p) => p.slug === slug);
    if (project) {
      const { minutes, text } = calculateProjectReadingTime(project);
      return {
        isDetail: true,
        type: 'project',
        slug: project.slug,
        title: project.title,
        totalMinutes: minutes,
        formattedText: text,
      };
    }
  }

  return {
    isDetail: false,
    type: null,
    slug: null,
    title: null,
    totalMinutes: 0,
    formattedText: '',
  };
}

/**
 * Calculates remaining reading time given total minutes and scroll progress (0 to 1).
 */
export function calculateRemainingReadingTime(totalMinutes: number, scrollProgress: number): {
  remainingMinutes: number;
  remainingText: string;
  isComplete: boolean;
} {
  const clampedProgress = Math.min(1, Math.max(0, scrollProgress));
  const isComplete = clampedProgress >= 0.95;

  if (isComplete) {
    return {
      remainingMinutes: 0,
      remainingText: 'Completed',
      isComplete: true,
    };
  }

  const remainingFraction = 1 - clampedProgress;
  const remainingMinutes = Math.max(1, Math.ceil(totalMinutes * remainingFraction));

  return {
    remainingMinutes,
    remainingText: `${remainingMinutes} min left`,
    isComplete: false,
  };
}
