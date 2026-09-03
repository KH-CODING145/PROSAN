import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionTitle } from '../components/common/SectionTitle';
import { siteConfig } from '../config/siteConfig';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { certificatesData } from '../data/certificates';
import { Button } from '../components/common/Button';
import { 
  Download, 
  FileText, 
  Printer, 
  Mail, 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  Calendar,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';

export const ResumePage: React.FC = () => {
  const profile = siteConfig.profile;
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} — Professional Resume`,
          text: `Explore the senior software engineer resume of ${profile.name}.`,
          url: window.location.href
        });
      } catch (e) {
        // Ignored or cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageContainer
      title={`${profile.name} — Professional Resume`}
      description="Interactive and downloadable resume for PRO SAN, Senior Software Engineer & AI Developer with 6+ years of production experience."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Curriculum Vitae / Resume
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Updated for 2026 • Verified Engineering Credentials & History
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/resume.pdf"
              download="PRO_SAN_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Resume PDF
            </a>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print CV
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              {copied ? 'Link Copied!' : 'Share'}
            </Button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Printable Resume Container */}
        {/* ========================================================================= */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md space-y-12 print:border-none print:shadow-none print:p-0">
          
          {/* Header & Contact Information */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {profile.name}
              </h2>
              <p className="text-base sm:text-lg font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                {profile.title}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                {profile.tagline}
              </p>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 md:text-right">
              <div className="flex items-center md:justify-end gap-2">
                <Mail className="w-4 h-4 text-cyan-500" />
                <a href={`mailto:${profile.email}`} className="hover:text-cyan-500">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center md:justify-end gap-2">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center md:justify-end gap-2">
                <Globe className="w-4 h-4 text-cyan-500" />
                <span>prosan.dev</span>
              </div>
              <div className="flex items-center md:justify-end gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Open for Remote Contracts</span>
              </div>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Professional Summary
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Senior Software Engineer with 6+ years of production experience architecting resilient full-stack web applications, AI multi-agent workflows, RAG search engines, and high-load APIs. Proven track record of delivering 38+ production applications with 99% client satisfaction, optimizing Core Web Vitals to sub-100ms render speeds, and implementing zero-trust security standards.
            </p>
          </section>

          {/* Section: Technical Skills Matrix */}
          <section className="space-y-4">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Technical Competencies & Stack
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsData.map((group) => (
                <div key={group.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                  <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                    {group.category}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {group.skills.map(s => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Work Experience */}
          <section className="space-y-6">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Work Experience
            </h3>

            <div className="space-y-6">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-b-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {exp.position}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 font-mono">
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Selected Featured Projects */}
          <section className="space-y-4">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Key Production Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectsData.slice(0, 4).map((project) => (
                <div key={project.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500">
                    Stack: {project.technologies.slice(0, 5).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Education */}
          <section className="space-y-4">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Education & Academics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationData.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {edu.field} • {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Certifications */}
          <section className="space-y-4">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Verified Accreditations & Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {certificatesData.map((cert) => (
                <div key={cert.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {cert.name}
                  </h4>
                  <p className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                    {cert.organization}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400">
                    ID: {cert.credentialId}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Download CTA */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              Download the official ATS-friendly PDF copy for your records.
            </p>
            <a
              href="/resume.pdf"
              download="PRO_SAN_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Resume PDF
            </a>
          </div>

        </div>

      </div>
    </PageContainer>
  );
};
