import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../common/SEO';
import { SEOOptions } from '../../hooks/useSEO';
import { usePrefersReducedMotion } from '../../hooks/useScrollReveal';

export interface PageContainerProps extends SEOOptions {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
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
  tags,
  noIndex,
  schema
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      <SEO
        title={title}
        rawTitle={rawTitle}
        description={description}
        canonicalUrl={canonicalUrl}
        type={type}
        image={image}
        imageAlt={imageAlt}
        keywords={keywords}
        author={author}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        section={section}
        tags={tags}
        noIndex={noIndex}
        schema={schema}
      />
      <motion.main
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`min-h-screen pt-24 pb-16 ${className}`}
      >
        {children}
      </motion.main>
    </>
  );
};

