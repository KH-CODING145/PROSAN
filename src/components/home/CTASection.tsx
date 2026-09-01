import React, { useState } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';
import { ResumeModal } from '../resume/ResumeModal';
import { ArrowRight, Mail, FileText, Sparkles, Terminal } from 'lucide-react';

export const CTASection: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 overflow-hidden text-center shadow-2xl"
        >
          {/* Subtle Accent Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available For Engineering Collaboration & Advisory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have an ambitious project or team in mind?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Whether you need to architect autonomous AI agents, scale a high-throughput React/Node stack, or streamline developer tooling, let's connect.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                variant="primary"
                asAnchor
                href="/contact"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Initiate Conversation
              </Button>

              <Button
                size="lg"
                variant="secondary"
                leftIcon={<FileText className="w-4 h-4 text-cyan-400" />}
                onClick={() => setResumeOpen(true)}
              >
                View Full Resume
              </Button>
            </div>

            <p className="text-xs font-mono text-slate-400 pt-2">
              Direct inbox: <span className="text-cyan-400">{siteConfig.profile.email}</span>
            </p>
          </div>
        </motion.div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};
