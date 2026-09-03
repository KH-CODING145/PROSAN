import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionTitle } from '../components/common/SectionTitle';
import { educationData } from '../data/education';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { motion } from 'motion/react';

export const EducationPage: React.FC = () => {
  return (
    <PageContainer
      title="Education & Continuous Learning"
      description="Academic background in Computer Science and continuous professional research in AI Systems, RAG architecture, and Cloud Engineering."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionTitle
          tag="Academic & Professional Foundation"
          title="Education & Continuous Research"
          description="A solid academic grounding in Computer Science complemented by relentless self-directed engineering research in autonomous AI agents and cloud systems."
        />

        {/* Education Timeline / Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {educationData.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Header Badge & Date */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-xs group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>

                {/* Degree & Institution */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-cyan-600 dark:text-cyan-400 font-mono">
                    {edu.institution}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {edu.location}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.description}
                </p>

                {/* Highlights / Key Coursework */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Relevant Coursework & Core Domains</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {edu.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  {edu.field}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Specialized Workshops & Continuous Learning Overview */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-semibold">
              <Award className="w-3.5 h-3.5" />
              Continuous Engineering Research
            </div>

            <h3 className="text-2xl sm:text-3xl font-black">
              Engineering Mindset & Continuous Professional Growth
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Software engineering is constantly evolving. In addition to formal academic studies, I dedicate 15+ hours weekly to studying whitepapers, open-source architectural patterns, distributed systems resilience, and generative AI research papers (such as HNSW vector indexing, CoT prompting, and multi-agent coordination).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <p className="text-2xl font-bold font-mono text-cyan-400">100%</p>
                <p className="text-xs text-slate-400 font-mono mt-1">Autonomous Learning</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <p className="text-2xl font-bold font-mono text-emerald-400">50+</p>
                <p className="text-xs text-slate-400 font-mono mt-1">Tech Whitepapers Studied</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <p className="text-2xl font-bold font-mono text-blue-400">25+</p>
                <p className="text-xs text-slate-400 font-mono mt-1">Production Tech Stacks</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                variant="primary"
                asAnchor
                href="/certificates"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Professional Certificates →
              </Button>
              <Button
                variant="outline"
                asAnchor
                href="/projects"
              >
                Explore Production Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
