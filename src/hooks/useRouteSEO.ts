import { useEffect, useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projects';
import { useSEO, SEOOptions } from './useSEO';

export interface RouteSEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
  image?: string;
  noIndex?: boolean;
}

/**
 * Route-specific default metadata mapping for the application
 */
export const ROUTE_METADATA_REGISTRY: Record<string, RouteSEOMetadata> = {
  '/': {
    title: `${siteConfig.profile.name} — ${siteConfig.profile.title}`,
    description: siteConfig.description,
    keywords: [
      'PRO SAN',
      'Senior Software Engineer',
      'Full Stack Developer',
      'AI Architect',
      'React',
      'TypeScript',
      'Node.js',
      'Cloud Architecture'
    ],
    type: 'website'
  },
  '/about': {
    title: `About Me — Engineering Philosophy & Story | ${siteConfig.profile.name}`,
    description: `Discover the background, technical philosophy, and 6+ years of engineering experience of ${siteConfig.profile.name}.`,
    keywords: ['About PRO SAN', 'Software Engineer Biography', 'Tech Stack', 'Engineering Principles'],
    type: 'profile'
  },
  '/projects': {
    title: `Engineering Projects & Case Studies | ${siteConfig.profile.name}`,
    description: `Explore production-grade software applications, open-source architectures, and AI agent frameworks built by ${siteConfig.profile.name}.`,
    keywords: ['Software Projects', 'AI Automation Systems', 'Full Stack Apps', 'Case Studies', 'Open Source'],
    type: 'website'
  },
  '/skills': {
    title: `Technical Skills Matrix & Architecture Expertise | ${siteConfig.profile.name}`,
    description: `Comprehensive interactive breakdown of proficiency across languages, backend frameworks, cloud infrastructure, AI models, and DevOps.`,
    keywords: ['Skills Matrix', 'TypeScript', 'Python', 'React', 'Docker', 'Kubernetes', 'LLM Engineering'],
    type: 'website'
  },
  '/services': {
    title: `Engineering Services & Digital Solutions | ${siteConfig.profile.name}`,
    description: `Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users.`,
    keywords: ['Digital Solutions', 'Software Consulting', 'AI Agent Development', 'Architecture Audit', 'Contract Engineering'],
    type: 'website'
  },
  '/products': {
    title: `Products & Software Suites | ${siteConfig.profile.name}`,
    description: `Explore production-grade software products, developer tooling, and autonomous AI systems engineered by ${siteConfig.profile.name}.`,
    keywords: ['Software Products', 'AI Tools', 'Developer Frameworks', 'HyperScale Gateway', 'AgenticFlow'],
    type: 'website'
  },
  '/features': {
    title: `System Architecture & Features | ${siteConfig.profile.name}`,
    description: `Deep dive into the architectural principles, security standards, and performance benchmarks engineered into every solution.`,
    keywords: ['System Architecture', 'Zero-Trust Security', 'Edge Latency', 'Observability', 'Scalability'],
    type: 'website'
  },
  '/pricing': {
    title: `Pricing & Engineering Retainers | ${siteConfig.profile.name}`,
    description: `Transparent pricing tiers for advisory audits, full-stack application development sprints, and enterprise AI engineering.`,
    keywords: ['Engineering Pricing', 'Software Retainer', 'Consulting Rates', 'Sprint Packages'],
    type: 'website'
  },
  '/portfolio': {
    title: `Portfolio & Case Studies | ${siteConfig.profile.name}`,
    description: `Explore production-grade software applications, open-source architectures, and AI agent frameworks built by ${siteConfig.profile.name}.`,
    keywords: ['Portfolio', 'Software Projects', 'AI Automation Systems', 'Full Stack Apps', 'Case Studies'],
    type: 'website'
  },
  '/blog': {
    title: `Blog & Technical Publications | ${siteConfig.profile.name}`,
    description: `In-depth technical publications, distributed system design deep dives, and AI automation patterns authored by ${siteConfig.profile.name}.`,
    keywords: ['Tech Blog', 'Software Architecture Guides', 'AI Tutorials', 'Engineering Best Practices'],
    type: 'website'
  },
  '/login': {
    title: `Partner & Client Sign In | ${siteConfig.profile.name}`,
    description: `Secure sign in for clients, engineering collaborators, and project partners.`,
    keywords: ['Sign In', 'Client Portal', 'Partner Login'],
    type: 'website'
  },
  '/signup': {
    title: `Create Account | ${siteConfig.profile.name}`,
    description: `Create an account to start your engineering sprint, review architecture audits, and track deliverables.`,
    keywords: ['Sign Up', 'Create Account', 'Client Portal Registration'],
    type: 'website'
  },
  '/dashboard': {
    title: `Client & Developer Portal Dashboard | ${siteConfig.profile.name}`,
    description: `Real-time project deliverables, system health status, active API keys, and sprint metrics.`,
    keywords: ['Dashboard', 'Project Metrics', 'Client Portal', 'API Keys'],
    type: 'website'
  },
  '/get-started': {
    title: `Get Started — Kick Off Your Project | ${siteConfig.profile.name}`,
    description: `Interactive project discovery wizard to kick off your custom software or AI engineering sprint.`,
    keywords: ['Get Started', 'Project Discovery', 'Hire Engineer', 'Kick Off Sprint'],
    type: 'website'
  },
  '/experience': {
    title: `Career Timeline & Engineering Leadership | ${siteConfig.profile.name}`,
    description: `Chronological career history, proven impact metrics, technical leadership roles, and company milestones delivered by ${siteConfig.profile.name}.`,
    keywords: ['Work History', 'Career Timeline', 'Engineering Milestones', 'Leadership Experience'],
    type: 'profile'
  },
  '/certificates': {
    title: `Credentials, Licenses & Certifications | ${siteConfig.profile.name}`,
    description: `Verified professional certifications, cloud licenses, and specialized AI and software engineering credentials.`,
    keywords: ['Certifications', 'AWS Certified', 'Google Cloud', 'Specializations', 'Credentials'],
    type: 'website'
  },
  '/articles': {
    title: `Technical Articles & Engineering Guides | ${siteConfig.profile.name}`,
    description: `In-depth technical publications, distributed system design deep dives, and AI automation patterns authored by ${siteConfig.profile.name}.`,
    keywords: ['Tech Blog', 'Software Architecture Guides', 'AI Tutorials', 'Engineering Best Practices'],
    type: 'website'
  },
  '/contact': {
    title: `Contact & Collaboration Inquiries | ${siteConfig.profile.name}`,
    description: `Get in touch with ${siteConfig.profile.name} for technical consulting, full-time opportunities, speaking engagements, or engineering collaborations.`,
    keywords: ['Contact PRO SAN', 'Hire Software Engineer', 'Consulting Inquiry', 'Developer Contact'],
    type: 'website'
  }
};

/**
 * Custom hook that dynamically determines and applies document title,
 * meta descriptions, Open Graph data, and social preview cards based
 * on the active route location and optional custom overrides.
 *
 * @param customOptions Optional overrides to supersede default route metadata
 */
export function useRouteSEO(customOptions?: Partial<SEOOptions>) {
  const location = useLocation();

  const resolvedMetadata = useMemo<SEOOptions>(() => {
    const pathname = location.pathname;

    // Filter out undefined keys from customOptions so defaults aren't overwritten by undefined
    const cleanOverrides: Partial<SEOOptions> = {};
    if (customOptions) {
      (Object.keys(customOptions) as (keyof SEOOptions)[]).forEach((key) => {
        if (customOptions[key] !== undefined) {
          (cleanOverrides as any)[key] = customOptions[key];
        }
      });
    }

    // 1. Exact match in registry
    if (ROUTE_METADATA_REGISTRY[pathname]) {
      const routeData = ROUTE_METADATA_REGISTRY[pathname];
      return {
        title: routeData.title,
        rawTitle: true,
        description: routeData.description,
        keywords: routeData.keywords,
        type: routeData.type,
        canonicalUrl: `${siteConfig.siteUrl}${pathname === '/' ? '' : pathname}`,
        ...cleanOverrides
      };
    }

    // 2. Dynamic Project Case Study route (/projects/:slug)
    const projectMatch = matchPath('/projects/:slug', pathname);
    if (projectMatch && projectMatch.params.slug) {
      const slug = projectMatch.params.slug;
      const foundProject = projectsData.find((p) => p.slug === slug);

      if (foundProject) {
        return {
          title: `${foundProject.title} — Case Study | ${siteConfig.profile.name}`,
          rawTitle: true,
          description: foundProject.shortDescription,
          type: 'article',
          image: foundProject.image,
          imageAlt: `${foundProject.title} preview screenshot`,
          keywords: [foundProject.title, foundProject.category, ...foundProject.technologies, 'Case Study'],
          canonicalUrl: `${siteConfig.siteUrl}/projects/${foundProject.slug}`,
          section: foundProject.category,
          tags: foundProject.technologies,
          ...cleanOverrides
        };
      }
    }

    // 3. Fallback / 404 Not Found route
    return {
      title: `404 — Page Not Found | ${siteConfig.profile.name}`,
      rawTitle: true,
      description: `The page you are looking for at ${pathname} does not exist or has been relocated.`,
      noIndex: true,
      ...cleanOverrides
    };
  }, [location.pathname, customOptions]);

  // Apply resolved SEO configuration to head elements
  useSEO(resolvedMetadata);

  return resolvedMetadata;
}
