import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { SectionTitle } from '../components/common/SectionTitle';

export const ContactPage: React.FC = () => {
  return (
    <PageContainer
      title="Contact & Engineering Inquiries"
      description="Get in touch with PRO SAN for full-stack engineering contracts, AI agent architecture consulting, or full-time opportunities."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          tag="Let's Build Together"
          title="Get in Touch"
          description="Have a challenging technical problem to solve, an architectural initiative to launch, or an open engineering role? Reach out directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Contact Info & Socials (5 cols) */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
