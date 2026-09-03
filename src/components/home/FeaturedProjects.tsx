import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { ProjectCard, ProjectCardSkeleton } from '../projects/ProjectCard';
import { SectionTitle } from '../common/SectionTitle';
import { Button } from '../common/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface FeaturedProjectsProps {
  isLoading?: boolean;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ isLoading = false }) => {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section id="featured-projects" className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Engineering Portfolio"
          title="Featured Production Projects"
          description="Handpicked scalable full-stack applications, autonomous AI orchestrators, observability platforms, and open-source tooling."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ProjectCardSkeleton key={`featured-skeleton-${index}`} />
            ))
          ) : (
            featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            asAnchor
            href="/projects"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All {projectsData.length} Projects & Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
};
