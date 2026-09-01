import React from 'react';
import { Link } from 'react-router-dom';
import { skillsData } from '../../data/skills';
import { SkillCategoryCard } from '../skills/SkillCategoryCard';
import { SectionTitle } from '../common/SectionTitle';
import { Button } from '../common/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const SkillsPreview: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Core Competencies"
          title="Skills & Technical Ecosystem"
          description="A comprehensive matrix of technologies, frameworks, cloud services, and AI architectures honed across 6+ years in production."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.slice(0, 6).map((group) => (
            <SkillCategoryCard key={group.id} group={group} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            asAnchor
            href="/skills"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Skills Matrix & Experience Breakdown
          </Button>
        </div>
      </div>
    </section>
  );
};
