import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CertificateItem } from '../../types';
import { Modal } from '../common/Modal';
import { Award, ExternalLink, Calendar, KeyRound, Eye } from 'lucide-react';

interface CertificateCardProps {
  cert: CertificateItem;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ cert }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
      >
        <div>
          {/* Top image thumbnail */}
          <div
            onClick={() => setModalOpen(true)}
            className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 bg-slate-950 cursor-pointer"
          >
            <img
              src={cert.image}
              alt={cert.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md">
                <Eye className="w-3.5 h-3.5" /> View Certificate
              </span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {cert.name}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {cert.organization}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {cert.issueDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" />
              {cert.credentialId}
            </span>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Verification Footer Link */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setModalOpen(true)}
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer"
          >
            Quick Preview
          </button>
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
          >
            <span>Verify Credential</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>

      {/* Certificate Modal Lightbox */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="2xl"
        title={cert.name}
      >
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
            <img
              src={cert.image}
              alt={cert.name}
              className="w-full h-auto object-contain max-h-[500px] mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Issuing Organization:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{cert.organization}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Issue Date:</span>
              <span className="font-mono text-slate-900 dark:text-white">{cert.issueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Credential ID:</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400">{cert.credentialId}</span>
            </div>
          </div>
          <div className="flex justify-end">
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
            >
              <span>Verify Official Issuer Record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};
