import React from 'react';
import { experienceData } from '../../data/experience';
import { TimelineItem } from '../experience/TimelineItem';
import { SectionTitle } from '../common/SectionTitle';
import { Button } from '../common/Button';
import { ArrowRight, Briefcase } from 'lucide-react';

export const ExperiencePreview: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Career Journey"
          title="Work Experience & Track Record"
          description="Proven history of leading engineering teams, scaling web architectures, and deploying autonomous AI systems."
        />

        <div className="space-y-0">
          {experienceData.slice(0, 3).map((item, idx) => (
            <TimelineItem key={item.id} item={item} index={idx} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            asAnchor
            href="/experience"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            View Complete Career Timeline & Education
          </Button>
        </div>
      </div>
    </section>
  );
};
