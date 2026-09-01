import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ServicesSection } from '../components/home/ServicesSection';
import { CTASection } from '../components/home/CTASection';

export const ServicesPage: React.FC = () => {
  return (
    <PageContainer
      title="Engineering Services & Solutions"
      description="Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users."
      className="pt-0"
    >
      <div className="pt-12">
        <ServicesSection />
        <CTASection />
      </div>
    </PageContainer>
  );
};
