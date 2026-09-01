import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { certificatesData } from '../data/certificates';
import { CertificateCard } from '../components/certificates/CertificateCard';
import { SectionTitle } from '../components/common/SectionTitle';

export const CertificatesPage: React.FC = () => {
  return (
    <PageContainer
      title="Certificates & Accreditations"
      description="Verified professional certifications in Google Cloud, AWS, Modern React Architecture, and Generative AI systems."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          tag="Credentials"
          title="Verified Professional Certifications"
          description="Industry-recognized certifications and professional credentials validating deep engineering rigor and ongoing technical mastery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
