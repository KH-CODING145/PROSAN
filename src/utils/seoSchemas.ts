import { siteConfig } from '../config/siteConfig';
import { Project, SkillItem, ArticleItem } from '../types';
import { SkillCategoryGroup } from '../data/skills';

/**
 * Generates Schema.org Person entity
 */
export function generatePersonSchema() {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.siteUrl}/#person`,
    name: siteConfig.profile.name,
    givenName: 'PRO',
    familyName: 'SAN',
    jobTitle: siteConfig.profile.title,
    description: siteConfig.profile.shortBio,
    url: siteConfig.siteUrl,
    email: siteConfig.profile.email,
    telephone: siteConfig.profile.phone,
    image: `${siteConfig.siteUrl}/assets/avatar.svg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phnom Penh',
      addressCountry: 'KH'
    },
    sameAs: [
      siteConfig.profile.social.github,
      siteConfig.profile.social.telegram,
      siteConfig.profile.social.facebook,
      siteConfig.profile.social.youtube,
      siteConfig.profile.social.instagram,
      siteConfig.profile.social.linkedin,
      siteConfig.profile.social.whatsapp
    ].filter(Boolean),
    knowsAbout: [
      'Full-Stack Web Development',
      'React 19 & Next.js',
      'TypeScript & Modern JavaScript',
      'Node.js & Express.js',
      'Python & FastAPI',
      'Generative AI & LLM Systems',
      'Retrieval-Augmented Generation (RAG)',
      'Autonomous AI Agents & LangGraph',
      'PostgreSQL & pgvector',
      'MongoDB & Redis',
      'Docker & Container Orchestration',
      'Cloud Architecture (Google Cloud, AWS)',
      'System Design & Microservices',
      'Performance Optimization & Web Vitals'
    ]
  };
}

/**
 * Generates Schema.org WebSite entity
 */
export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.siteName,
    description: siteConfig.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${siteConfig.siteUrl}/#person`
    }
  };
}

/**
 * Generates Google-compliant BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1]?.url || siteConfig.siteUrl}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.siteUrl}${item.url}`
    }))
  };
}

/**
 * Generates detailed SoftwareApplication schema for a single project
 */
export function generateProjectDetailSchema(project: Project) {
  const projectUrl = `${siteConfig.siteUrl}/projects/${project.slug}`;
  const person = generatePersonSchema();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title, url: `/projects/${project.slug}` }
  ]);

  const softwareApp = {
    '@type': 'SoftwareApplication',
    '@id': `${projectUrl}/#software`,
    name: project.title,
    headline: `${project.title} — Software Architecture & Production Case Study`,
    description: project.fullDescription || project.shortDescription,
    applicationCategory: project.category,
    operatingSystem: 'Cross-platform / Web & Cloud',
    image: project.image,
    screenshot: project.gallery && project.gallery.length > 0 ? project.gallery : [project.image],
    url: projectUrl,
    author: {
      '@id': `${siteConfig.siteUrl}/#person`
    },
    creator: {
      '@id': `${siteConfig.siteUrl}/#person`
    },
    programmingLanguage: project.technologies,
    softwareRequirements: project.technologies.join(', '),
    keywords: [project.title, project.category, ...project.technologies, 'Software Engineering', 'Case Study'].join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.liveDemoUrl ? { installUrl: project.liveDemoUrl } : {})
  };

  const techArticle = {
    '@type': 'TechArticle',
    '@id': `${projectUrl}/#article`,
    headline: `${project.title} — Case Study & Architectural Deep Dive`,
    description: project.shortDescription,
    image: project.image,
    author: {
      '@id': `${siteConfig.siteUrl}/#person`
    },
    publisher: {
      '@id': `${siteConfig.siteUrl}/#person`
    },
    url: projectUrl,
    mainEntityOfPage: projectUrl,
    articleSection: project.category,
    keywords: project.technologies.join(', '),
    dependencies: project.technologies.join(', '),
    proficiencyLevel: 'Expert'
  };

  return {
    '@graph': [person, softwareApp, techArticle, breadcrumbs]
  };
}

/**
 * Generates CollectionPage & ItemList schema for the projects showcase
 */
export function generateProjectsListSchema(projects: Project[]) {
  const pageUrl = `${siteConfig.siteUrl}/projects`;
  const person = generatePersonSchema();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' }
  ]);

  const itemList = {
    '@type': 'ItemList',
    '@id': `${pageUrl}/#itemlist`,
    name: 'Featured Engineering Projects & AI Case Studies',
    description: 'Catalog of enterprise web applications, AI automation platforms, and open-source packages.',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'SoftwareApplication',
        '@id': `${siteConfig.siteUrl}/projects/${project.slug}/#software`,
        name: project.title,
        description: project.shortDescription,
        url: `${siteConfig.siteUrl}/projects/${project.slug}`,
        image: project.image,
        applicationCategory: project.category,
        operatingSystem: 'Web Browser / Cloud',
        programmingLanguage: project.technologies,
        author: {
          '@id': `${siteConfig.siteUrl}/#person`
        }
      }
    }))
  };

  const collectionPage = {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: 'Engineering Projects & Case Studies | PRO SAN',
    description: 'Explore production-grade software applications, open-source architectures, and AI agent frameworks built by PRO SAN.',
    mainEntity: {
      '@id': `${pageUrl}/#itemlist`
    },
    breadcrumb: {
      '@id': `${pageUrl}/#breadcrumb`
    }
  };

  return {
    '@graph': [person, collectionPage, itemList, breadcrumbs]
  };
}

/**
 * Generates ItemPage & ItemList schema for technical skills matrix
 */
export function generateSkillsCatalogSchema(groups: SkillCategoryGroup[]) {
  const pageUrl = `${siteConfig.siteUrl}/skills`;
  const person = generatePersonSchema();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Skills', url: '/skills' }
  ]);

  const allSkills: (SkillItem & { categoryGroup: string })[] = [];
  groups.forEach(g => {
    g.skills.forEach(s => {
      allSkills.push({ ...s, categoryGroup: g.category });
    });
  });

  const itemList = {
    '@type': 'ItemList',
    '@id': `${pageUrl}/#skills-list`,
    name: 'Technical Skills, Frameworks & Architecture Expertise',
    description: 'Comprehensive interactive matrix of full-stack engineering, AI/ML, databases, and DevOps proficiencies.',
    numberOfItems: allSkills.length,
    itemListElement: allSkills.map((skill, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'DefinedTerm',
        name: skill.name,
        description: `${skill.name} (${skill.level}, ${skill.experienceYears}) - Specialty: ${skill.specialty || skill.category}`,
        inDefinedTermSet: skill.categoryGroup,
        termCode: skill.name
      }
    }))
  };

  const skillsPage = {
    '@type': 'ItemPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: 'Technical Skills Matrix & Architecture Expertise | PRO SAN',
    description: 'Comprehensive breakdown of proficiency across programming languages, backend frameworks, cloud infrastructure, AI models, and DevOps by PRO SAN.',
    mainEntity: {
      '@id': `${pageUrl}/#skills-list`
    },
    breadcrumb: {
      '@id': `${pageUrl}/#breadcrumb`
    }
  };

  return {
    '@graph': [person, skillsPage, itemList, breadcrumbs]
  };
}

/**
 * Generates Blog / Articles Collection schema
 */
export function generateArticlesListSchema(articles: ArticleItem[]) {
  const pageUrl = `${siteConfig.siteUrl}/articles`;
  const person = generatePersonSchema();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' }
  ]);

  const blog = {
    '@type': 'Blog',
    '@id': `${pageUrl}/#blog`,
    name: 'Engineering Articles & Architecture Teardowns',
    description: 'In-depth technical publications, distributed system design deep dives, and AI automation patterns authored by PRO SAN.',
    url: pageUrl,
    publisher: {
      '@id': `${siteConfig.siteUrl}/#person`
    },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      url: `${siteConfig.siteUrl}/articles/${article.slug}`,
      image: article.coverImage,
      datePublished: article.publishedDate,
      author: {
        '@id': `${siteConfig.siteUrl}/#person`
      }
    }))
  };

  return {
    '@graph': [person, blog, breadcrumbs]
  };
}

/**
 * Generates individual Article / BlogPosting schema
 */
export function generateArticleDetailSchema(article: ArticleItem) {
  const articleUrl = `${siteConfig.siteUrl}/articles/${article.slug}`;
  const person = generatePersonSchema();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
    { name: article.title, url: `/articles/${article.slug}` }
  ]);

  const post = {
    '@type': 'BlogPosting',
    '@id': `${articleUrl}/#post`,
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    url: articleUrl,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    articleSection: article.category,
    keywords: article.tags?.join(', ') || article.category,
    author: {
      '@id': `${siteConfig.siteUrl}/#person`
    },
    publisher: {
      '@id': `${siteConfig.siteUrl}/#person`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  };

  return {
    '@graph': [person, post, breadcrumbs]
  };
}
