import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

export interface SEOOptions {
  /** Page title (will be formatted as "${title} | ${siteName}" unless rawTitle is true) */
  title?: string;
  /** Use the exact title without suffixing siteConfig name */
  rawTitle?: boolean;
  /** Meta description */
  description?: string;
  /** Canonical URL for the page */
  canonicalUrl?: string;
  /** Open Graph & Schema type ('website', 'article', 'profile', etc.) */
  type?: 'website' | 'article' | 'profile';
  /** URL to the preview image for social cards (Open Graph / Twitter) */
  image?: string;
  /** Alt text for social image */
  imageAlt?: string;
  /** List of keywords or comma-separated string */
  keywords?: string[] | string;
  /** Author name */
  author?: string;
  /** Publication timestamp (for articles / case studies) */
  publishedTime?: string;
  /** Last modification timestamp */
  modifiedTime?: string;
  /** Article section or topic */
  section?: string;
  /** Tags for article / project */
  tags?: string[];
  /** Prevent search engine indexing if true */
  noIndex?: boolean;
  /** Custom JSON-LD schema object */
  schema?: Record<string, any>;
}

/** Helper to set or create a <meta> tag with a given name or property attribute */
function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string | undefined | null) {
  if (content === undefined || content === null || content === '') {
    // Remove if content is empty
    const existing = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (existing) {
      existing.remove();
    }
    return;
  }

  let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/** Helper to set or create a <link rel="..."> tag */
function setLinkTag(rel: string, href: string | undefined | null) {
  if (!href) {
    const existing = document.querySelector(`link[rel="${rel}"]`);
    if (existing) existing.remove();
    return;
  }

  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Custom React Hook to dynamically manage document title, meta tags,
 * Open Graph, Twitter Cards, Canonical links, and JSON-LD structured data for every route.
 */
export function useSEO(options: SEOOptions = {}) {
  const {
    title,
    rawTitle = false,
    description = siteConfig.description,
    canonicalUrl,
    type = 'website',
    image = '/images/og-preview.png',
    imageAlt,
    keywords,
    author = siteConfig.profile.name,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    noIndex = false,
    schema
  } = options;

  useEffect(() => {
    // 1. Title
    const formattedTitle = title
      ? rawTitle
        ? title
        : `${title} | ${siteConfig.profile.name}`
      : `${siteConfig.profile.name} — ${siteConfig.profile.title}`;

    document.title = formattedTitle;

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'author', author);

    if (keywords) {
      const keywordsStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setMetaTag('name', 'keywords', keywordsStr);
    }

    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large');
    }

    // 3. Resolve URLs
    const currentUrl = typeof window !== 'undefined' ? window.location.href : siteConfig.siteUrl;
    const resolvedCanonical = canonicalUrl || currentUrl;

    // Format absolute image URL for external social preview bots
    let absoluteImage = image;
    if (image && !image.startsWith('http') && typeof window !== 'undefined') {
      absoluteImage = `${window.location.origin}${image.startsWith('/') ? '' : '/'}${image}`;
    }

    setLinkTag('canonical', resolvedCanonical);

    // 4. Open Graph (OG) Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', resolvedCanonical);
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:site_name', siteConfig.siteName);
    setMetaTag('property', 'og:locale', 'en_US');

    if (imageAlt) {
      setMetaTag('property', 'og:image:alt', imageAlt);
    }

    // Article-specific OG tags
    if (type === 'article') {
      if (publishedTime) setMetaTag('property', 'article:published_time', publishedTime);
      if (modifiedTime) setMetaTag('property', 'article:modified_time', modifiedTime);
      if (author) setMetaTag('property', 'article:author', author);
      if (section) setMetaTag('property', 'article:section', section);

      // Clean up previous article tags first
      document.querySelectorAll('meta[property="article:tag"]').forEach((el) => el.remove());
      if (tags && tags.length > 0) {
        tags.forEach((tag) => {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:tag');
          meta.setAttribute('content', tag);
          document.head.appendChild(meta);
        });
      }
    } else {
      // Remove any leftover article tags
      setMetaTag('property', 'article:published_time', null);
      setMetaTag('property', 'article:modified_time', null);
      setMetaTag('property', 'article:author', null);
      setMetaTag('property', 'article:section', null);
      document.querySelectorAll('meta[property="article:tag"]').forEach((el) => el.remove());
    }

    // 5. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteImage);
    if (imageAlt) setMetaTag('name', 'twitter:image:alt', imageAlt);
    setMetaTag('name', 'twitter:url', resolvedCanonical);
    if (siteConfig.profile.social.twitter) {
      const handle = siteConfig.profile.social.twitter.split('/').pop();
      if (handle) setMetaTag('name', 'twitter:creator', `@${handle}`);
    }

    // 6. JSON-LD Structured Data
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${siteConfig.siteUrl}/#person`,
          name: siteConfig.profile.name,
          jobTitle: siteConfig.profile.title,
          description: siteConfig.profile.shortBio,
          url: siteConfig.siteUrl,
          email: siteConfig.profile.email,
          sameAs: [
            siteConfig.profile.social.telegram,
            siteConfig.profile.social.facebook,
            siteConfig.profile.social.youtube,
            siteConfig.profile.social.instagram,
            siteConfig.profile.social.whatsapp,
            siteConfig.profile.social.linkedin,
          ].filter(Boolean)
        },
        {
          '@type': 'WebSite',
          '@id': `${siteConfig.siteUrl}/#website`,
          url: siteConfig.siteUrl,
          name: siteConfig.siteName,
          description: siteConfig.description,
          publisher: {
            '@id': `${siteConfig.siteUrl}/#person`
          }
        }
      ]
    };

    const finalSchema = schema ? { ...defaultSchema, ...schema } : defaultSchema;

    let scriptTag = document.getElementById('json-ld-structured-data') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(finalSchema, null, 2);

  }, [
    title,
    rawTitle,
    description,
    canonicalUrl,
    type,
    image,
    imageAlt,
    keywords,
    author,
    publishedTime,
    modifiedTime,
    section,
    JSON.stringify(tags),
    noIndex,
    JSON.stringify(schema)
  ]);
}
