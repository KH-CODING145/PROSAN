import React, { useMemo } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ServicesSection } from '../components/home/ServicesSection';
import { CTASection } from '../components/home/CTASection';
import { siteConfig } from '../config/siteConfig';
import { generatePersonSchema, generateBreadcrumbSchema } from '../utils/seoSchemas';

export const ServicesPage: React.FC = () => {
  const servicesSchema = useMemo(() => {
    return {
      '@graph': [
        generatePersonSchema(),
        generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]),
        {
          '@type': 'Service',
          '@id': `${siteConfig.siteUrl}/services/#service`,
          name: 'Full-Stack Software Engineering & AI Automation Consulting',
          provider: {
            '@id': `${siteConfig.siteUrl}/#person`
          },
          serviceType: 'Software Development & Architecture',
          description: 'Custom full-stack web applications, AI LLM agent integration, high-concurrency backend services, and cloud modernization.'
        }
      ]
    };
  }, []);

  return (
    <PageContainer
      title="Engineering Services & Solutions"
      description="Production-grade full-stack engineering, custom AI agent development, cloud architecture, and web systems by PRO SAN."
      canonicalUrl={`${siteConfig.siteUrl}/services`}
      type="website"
      keywords={[
        'Software Engineering Services',
        'AI Consulting',
        'Custom Web Applications',
        'LLM Agent Development',
        'Cloud Architecture',
        'PRO SAN'
      ]}
      image="/images/og-preview.png"
      imageAlt="PRO SAN Engineering Services and Solutions"
      schema={servicesSchema}
      className="pt-0"
    >
      <div className="pt-12">
        <ServicesSection />
        <CTASection />
      </div>
    </PageContainer>
  );
};

