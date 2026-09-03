import React, { useMemo } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Hero } from '../components/home/Hero';
import { TechMarquee } from '../components/home/TechMarquee';
import { StatsSection } from '../components/home/StatsSection';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { SkillsPreview } from '../components/home/SkillsPreview';
import { ServicesSection } from '../components/home/ServicesSection';
import { ExperiencePreview } from '../components/home/ExperiencePreview';
import { YoutubeSection } from '../components/home/YoutubeSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CTASection } from '../components/home/CTASection';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projects';
import { generatePersonSchema, generateWebSiteSchema } from '../utils/seoSchemas';

export const Home: React.FC = () => {
  const homeSchema = useMemo(() => {
    const featuredProjects = projectsData.filter((p) => p.featured);
    return {
      '@graph': [
        generatePersonSchema(),
        generateWebSiteSchema(),
        {
          '@type': 'ProfilePage',
          '@id': `${siteConfig.siteUrl}/#profilepage`,
          url: siteConfig.siteUrl,
          name: 'PRO SAN — Senior Software Engineer & AI Developer Portfolio',
          mainEntity: {
            '@id': `${siteConfig.siteUrl}/#person`
          }
        },
        {
          '@type': 'ItemList',
          '@id': `${siteConfig.siteUrl}/#featured-projects`,
          name: 'Featured Engineering Projects',
          description: 'Production systems, AI agents, and full-stack software built by PRO SAN.',
          numberOfItems: featuredProjects.length,
          itemListElement: featuredProjects.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: p.title,
              url: `${siteConfig.siteUrl}/projects/${p.slug}`,
              description: p.shortDescription,
              applicationCategory: p.category
            }
          }))
        }
      ]
    };
  }, []);

  return (
    <PageContainer
      title="Software Engineer & AI Developer Portfolio"
      description="Production-ready portfolio showcasing high-performance web systems, distributed backends, AI agents, and intelligent workflow automation by PRO SAN."
      canonicalUrl={siteConfig.siteUrl}
      type="website"
      keywords={[
        'PRO SAN',
        'Senior Software Engineer',
        'Full Stack Developer',
        'AI Developer',
        'AI Agents',
        'RAG Architecture',
        'React 19',
        'TypeScript',
        'Python',
        'Cloud Systems',
        'PostgreSQL',
        'Portfolio',
        'Phnom Penh',
        'Cambodia'
      ]}
      image="/images/og-preview.png"
      imageAlt="PRO SAN - Senior Software Engineer & AI Developer Portfolio"
      schema={homeSchema}
      className="pt-0"
    >
      <Hero />
      <TechMarquee />
      <StatsSection />
      <FeaturedProjects />
      <SkillsPreview />
      <ServicesSection />
      <ExperiencePreview />
      <YoutubeSection />
      <TestimonialsSection />
      <CTASection />
    </PageContainer>
  );
};

