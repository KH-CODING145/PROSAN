import React from 'react';
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

export const Home: React.FC = () => {
  return (
    <PageContainer
      title="Software Engineer & AI Developer Portfolio"
      description="Production-ready portfolio showcasing high-performance web systems, distributed backends, AI agents, and intelligent workflow automation."
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
