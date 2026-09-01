import React, { useState, useMemo } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { projectsData } from '../data/projects';
import { ProjectCategory } from '../types';
import { ProjectFilter } from '../components/projects/ProjectFilter';
import { ProjectCard } from '../components/projects/ProjectCard';
import { SectionTitle } from '../components/common/SectionTitle';
import { FolderCode, Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedTech, setSelectedTech] = useState('');

  // Collect all unique technologies for filter dropdown
  const availableTechs = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach(p => p.technologies.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter projects by search, category, tech
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Search matching
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      // Tech matching
      const matchesTech =
        selectedTech === '' || project.technologies.includes(selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [searchQuery, selectedCategory, selectedTech]);

  return (
    <PageContainer
      title="Engineering Projects & Case Studies"
      description="Explore full-stack web applications, AI automation agents, distributed observability platforms, and open-source packages."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Portfolio Showcase"
          title="Engineered for Scalability & Impact"
          description="A curated catalog of enterprise SaaS solutions, autonomous AI systems, and open-source tooling with comprehensive architecture breakdowns."
        />

        {/* Filter & Search Bar */}
        <ProjectFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTech={selectedTech}
          onTechChange={setSelectedTech}
          availableTechs={availableTechs}
          totalResults={filteredProjects.length}
        />

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FolderCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching projects found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Try adjusting your search terms or clearing the selected filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTech('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
