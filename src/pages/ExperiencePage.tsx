import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { TimelineItem } from '../components/experience/TimelineItem';
import { EducationCard } from '../components/experience/EducationCard';
import { SectionTitle } from '../components/common/SectionTitle';

export const ExperiencePage: React.FC = () => {
  return (
    <PageContainer
      title="Experience & Education History"
      description="Detailed career path, positions held, quantifiable business impact, leadership roles, and academic background."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <SectionTitle
            tag="Career History"
            title="Work Experience & Positions"
            description="Proven track record in building high-consequence SaaS platforms, AI systems, and leading high-velocity engineering squads."
          />
          <div className="space-y-0">
            {experienceData.map((item, idx) => (
              <TimelineItem key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle
            tag="Academic Credentials"
            title="Education & Degree Programs"
            description="Formal foundation in computer science, software design, and specialized post-graduate training."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
