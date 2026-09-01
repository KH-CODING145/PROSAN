import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { siteConfig } from '../../config/siteConfig';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { skillsData } from '../../data/skills';
import { Download, Printer, Mail, MapPin, Globe, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text or triggered download
    const element = document.createElement('a');
    const file = new Blob([
      `# ${siteConfig.profile.name} - ${siteConfig.profile.title}\n` +
      `Email: ${siteConfig.profile.email} | Location: ${siteConfig.profile.location}\n\n` +
      `## Summary\n${siteConfig.profile.shortBio}\n\n` +
      `## Experience\n` +
      experienceData.map(e => `### ${e.position} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.description}\nKey Tech: ${e.technologies.join(', ')}\n`).join('\n') +
      `\n## Education\n` +
      educationData.map(ed => `### ${ed.degree} in ${ed.field}\n${ed.institution} (${ed.startDate} - ${ed.endDate})\n`).join('\n')
    ], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${siteConfig.profile.name.replace(/\s+/g, '_')}_Resume.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl" title="Curriculum Vitae / Resume Preview">
      <div className="space-y-6">
        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
              Verified Executive CV (Updated 2026)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button
              size="sm"
              variant="primary"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={handleDownload}
            >
              Download CV
            </Button>
          </div>
        </div>

        {/* Formatted Resume Sheet */}
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {siteConfig.profile.name}
              </h2>
              <p className="text-base text-cyan-600 dark:text-cyan-400 font-medium mt-1">
                {siteConfig.profile.title}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {siteConfig.profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {siteConfig.profile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {siteConfig.siteUrl.replace('https://', '')}
                </span>
              </div>
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-md shrink-0 bg-slate-900">
              <img
                src={siteConfig.profile.avatar}
                alt={siteConfig.profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-slate-500 mb-2">
              Professional Summary
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {siteConfig.profile.shortBio}
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-slate-500 mb-3">
              Core Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillsData.map((group) => (
                <div key={group.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                    {group.category}
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">
                    {group.skills.map(s => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-slate-500 mb-4">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experienceData.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {exp.position} <span className="text-slate-400 font-normal">at</span> {exp.company}
                    </h4>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {exp.startDate} – {exp.endDate} | {exp.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {exp.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.slice(0, 3).map((r, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-[11px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-slate-500 mb-3">
              Education & Honors
            </h3>
            <div className="space-y-3">
              {educationData.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {edu.degree} in {edu.field}
                    </span>
                    <span className="text-slate-500 block text-xs">
                      {edu.institution}, {edu.location}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
