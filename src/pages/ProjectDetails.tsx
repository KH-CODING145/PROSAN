import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, Variants } from 'motion/react';
import { PageContainer } from '../components/layout/PageContainer';
import { projectsData } from '../data/projects';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { RelatedProjects } from '../components/projects/RelatedProjects';
import { ShareProjectButton } from '../components/projects/ShareProjectButton';
import { usePrefersReducedMotion } from '../hooks/useScrollReveal';
import { siteConfig } from '../config/siteConfig';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  Calendar, 
  User, 
  Cpu, 
  Server, 
  Database, 
  Cloud, 
  Eye,
  Share2
} from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageContainer title="Project Not Found">
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Project Not Found</h1>
          <p className="text-sm text-slate-500">The project case study you requested does not exist or has been relocated.</p>
          <Button variant="primary" asAnchor href="/projects" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Projects
          </Button>
        </div>
      </PageContainer>
    );
  }

  // Animation variants for smooth page entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const projectCanonicalUrl = `${siteConfig.siteUrl}/projects/${project.slug}`;
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${project.title} — Software Architecture & Case Study`,
    description: project.shortDescription,
    image: project.image,
    author: {
      '@type': 'Person',
      name: siteConfig.profile.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.profile.name,
    },
    keywords: [project.category, ...project.technologies, 'Software Architecture', 'Case Study'].join(', '),
    articleSection: project.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': projectCanonicalUrl,
    },
    datePublished: '2024-01-01T00:00:00Z',
  };

  return (
    <PageContainer
      title={`${project.title} — Case Study`}
      description={project.shortDescription}
      canonicalUrl={projectCanonicalUrl}
      type="article"
      image={project.image}
      imageAlt={`${project.title} screenshot and architectural preview`}
      keywords={[project.title, project.category, ...project.technologies, 'Software Engineering', 'PRO SAN']}
      author={siteConfig.profile.name}
      section={project.category}
      tags={project.technologies}
      publishedTime="2024-01-01T00:00:00Z"
      schema={projectSchema}
    >
      <motion.div
        key={project.slug}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
      >
        {/* Navigation Breadcrumb / Back */}
        <motion.div variants={itemVariants}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </motion.div>

        {/* Hero Header */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan" size="md">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge variant="amber" size="md" dot>
                Featured Production Case Study
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {project.fullDescription}
          </p>

          {/* Metadata quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm shadow-xs">
            <div>
              <p className="text-slate-400 font-mono text-[11px]">Role</p>
              <p className="font-semibold text-slate-900 dark:text-white">{project.role}</p>
            </div>
            <div>
              <p className="text-slate-400 font-mono text-[11px]">Timeline</p>
              <p className="font-semibold text-slate-900 dark:text-white">{project.timeline}</p>
            </div>
            <div>
              <p className="text-slate-400 font-mono text-[11px]">Client / Domain</p>
              <p className="font-semibold text-slate-900 dark:text-white">{project.client || 'Open Source'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-mono text-[11px]">Category</p>
              <p className="font-semibold text-cyan-600 dark:text-cyan-400">{project.category}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveDemoUrl && (
              <Button
                variant="primary"
                asAnchor
                href={project.liveDemoUrl}
                target="_blank"
                rightIcon={<ExternalLink className="w-4 h-4" />}
              >
                Launch Live Demo
              </Button>
            )}
            <ShareProjectButton project={project} variant="outline" size="md" />
          </div>
        </motion.div>

        {/* Featured Hero Banner Image */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-950 aspect-16/9 relative group"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Performance Metrics Bento (if available) */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center hover:border-cyan-500/40 transition-colors"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                  {metric.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* System Architecture Breakdown */}
        <motion.div
          variants={itemVariants}
          className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                System Architecture & Tech Stack
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Component distribution and infrastructure layers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            {project.architecture.frontend && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <Cpu className="w-4 h-4 text-cyan-500" /> Frontend Layer
                </span>
                <p className="text-slate-600 dark:text-slate-400 font-mono text-xs">
                  {project.architecture.frontend}
                </p>
              </div>
            )}
            {project.architecture.backend && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <Server className="w-4 h-4 text-blue-500" /> Backend Services
                </span>
                <p className="text-slate-600 dark:text-slate-400 font-mono text-xs">
                  {project.architecture.backend}
                </p>
              </div>
            )}
            {project.architecture.database && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <Database className="w-4 h-4 text-purple-500" /> Data Storage & Cache
                </span>
                <p className="text-slate-600 dark:text-slate-400 font-mono text-xs">
                  {project.architecture.database}
                </p>
              </div>
            )}
            {project.architecture.aiOrCloud && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <Cloud className="w-4 h-4 text-emerald-500" /> AI Pipeline & Cloud
                </span>
                <p className="text-slate-600 dark:text-slate-400 font-mono text-xs">
                  {project.architecture.aiOrCloud}
                </p>
              </div>
            )}
          </div>

          {/* Tech Badges List */}
          <div className="pt-2">
            <p className="text-xs uppercase font-mono font-bold text-slate-400 mb-2">Technologies Used</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t} variant="slate" size="md">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          variants={itemVariants}
          className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6"
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Core Features & Functional Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Challenges & Solutions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-bold">Engineering Challenges</h3>
            </div>
            <ul className="space-y-3">
              {project.challenges.map((c, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="text-lg font-bold">Architectural Solutions</h3>
            </div>
            <ul className="space-y-3">
              {project.solutions.map((s, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Quantifiable Results */}
        <motion.div
          variants={itemVariants}
          className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400">
            <TrendingUp className="w-5 h-5" />
            <h3 className="text-lg font-bold">Production Outcomes & Results</h3>
          </div>
          <ul className="space-y-2.5">
            {project.results.map((r, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Gallery / Screenshots */}
        {project.gallery && project.gallery.length > 1 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Visual Gallery & Interface Snapshots
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-video cursor-pointer hover:border-cyan-500/60 transition-all relative group"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="p-2 rounded-lg bg-slate-900/90 text-white text-xs font-semibold">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share Case Study Card */}
        <motion.div
          variants={itemVariants}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
              <Share2 className="w-5 h-5 text-cyan-400" />
              <span>Enjoyed this case study?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
              Share "{project.title}" with fellow engineers, hiring teams, or your network.
            </p>
          </div>
          <div className="shrink-0">
            <ShareProjectButton project={project} variant="primary" size="md" />
          </div>
        </motion.div>

        {/* Related Projects (Horizontal Grid / Carousel) */}
        <motion.div variants={itemVariants}>
          <RelatedProjects currentProject={project} maxProjects={3} />
        </motion.div>
      </motion.div>

      {/* Image Lightbox Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="4xl"
        title="Screenshot Preview"
      >
        {selectedImage && (
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
            <img
              src={selectedImage}
              alt="Expanded preview"
              className="w-full h-auto object-contain max-h-[75vh] mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};
