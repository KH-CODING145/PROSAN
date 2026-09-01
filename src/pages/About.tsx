import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { siteConfig } from '../config/siteConfig';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { SectionTitle } from '../components/common/SectionTitle';
import { TimelineItem } from '../components/experience/TimelineItem';
import { EducationCard } from '../components/experience/EducationCard';
import { Button } from '../components/common/Button';
import { ResumeModal } from '../components/resume/ResumeModal';
import { 
  Target, 
  Compass, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Heart, 
  Sparkles,
  MapPin,
  Mail,
  Globe,
  ArrowRight,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Cloud,
  Cpu,
  CheckCircle2,
  Terminal,
  FileText,
  Workflow,
  Layers,
  Send,
  Facebook,
  Youtube,
  Instagram,
  MessageCircle,
  Linkedin
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

const coreExpertiseList = [
  'Full-Stack Development',
  'AI Engineering',
  'AI Agents',
  'RAG & Semantic Search',
  'Cloud Architecture',
  'API Development',
  'Database Architecture',
  'Automation',
  'System Design',
  'DevOps & CI/CD',
  'Web Security',
  'Performance Optimization'
];

const achievementsList = [
  {
    icon: '🚀',
    title: 'Production Engineering',
    description: 'មានបទពិសោធន៍ 6+ ឆ្នាំ ក្នុងការអភិវឌ្ឍ និងគ្រប់គ្រង Software សម្រាប់ Production។ (6+ Years architecting resilient, production-grade systems).'
  },
  {
    icon: '🤖',
    title: 'AI Engineering',
    description: 'អភិវឌ្ឍប្រព័ន្ធ AI ដោយប្រើ LLM APIs, RAG, Embeddings, Vector Search និង AI Agents។ (Production LLM orchestration & autonomous agents).'
  },
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'ផ្តោតលើការកែលម្អ Performance របស់ Frontend, Backend, Database និង Cloud Infrastructure។ (Sub-second latency & high throughput).'
  },
  {
    icon: '🔐',
    title: 'Enterprise Security',
    description: 'អនុវត្ត Security Best Practices សម្រាប់ Authentication, Authorization, APIs, Secrets និង Data។ (Zero-trust & OWASP compliance).'
  },
  {
    icon: '☁️',
    title: 'Scalable Systems',
    description: 'រចនាប្រព័ន្ធដែលអាចពង្រីកពី Application តូចទៅ Production Platform ដែលមានទំហំធំ។ (Scalable cloud-native architectures).'
  },
  {
    icon: '🛠️',
    title: 'Developer Experience',
    description: 'បង្កើត Project Architecture ដែលមានភាពស្អាត ងាយ Maintain និងងាយស្រួលសម្រាប់ Developer ផ្សេងទៀតបន្តអភិវឌ្ឍ។ (Clean code & modular DX).'
  }
];

export const About: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const profile = siteConfig.profile;

  return (
    <PageContainer
      title="PRO SAN — Senior Software Engineer & AI Developer"
      description="“I don't just write code. I design systems.” 6+ Years Production Experience in Full-Stack, AI Agents, RAG, and Cloud Platforms."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ========================================================================= */}
        {/* 01 — ប្រវត្តិរូបសង្ខេប / Profile & Core Expertise */}
        {/* ========================================================================= */}
        <section id="section-01" className="space-y-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
              01
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              ប្រវត្តិរូបសង្ខេប — Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Avatar Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 md:w-80 aspect-[4/5]">
                <div className="rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 h-full">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono">6+ Years</p>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-semibold">Production Systems</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {profile.name}
                </h1>
                <p className="text-lg sm:text-xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                  {profile.title}
                </p>
              </div>

              {/* Iconic Quote */}
              <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border-l-4 border-cyan-500 text-slate-800 dark:text-slate-200 font-mono text-base italic">
                {siteConfig.quote}
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {profile.fullBio.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Core Expertise Chips */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Core Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {coreExpertiseList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs font-mono text-slate-700 dark:text-slate-300 font-medium"
                    >
                      • {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <Button
                  variant="primary"
                  onClick={() => setResumeOpen(true)}
                  leftIcon={<FileText className="w-4 h-4" />}
                >
                  View Full CV / Resume
                </Button>
                <Button
                  variant="outline"
                  asAnchor
                  href="https://t.me/+XXMzPZjYJqwyYzc1"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<Send className="w-4 h-4 text-cyan-500" />}
                >
                  SUPPORT
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 02 — ការសិក្សា / Education & Continuous Learning */}
        {/* ========================================================================= */}
        <section id="section-02" className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
              02
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              ការសិក្សា — Education & Continuous Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 03 — ការងារ និងបទពិសោធន៍ / Work Experience */}
        {/* ========================================================================= */}
        <section id="section-03" className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
              03
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              ការងារ និងបទពិសោធន៍ — Work Experience
            </h2>
          </div>

          <div className="space-y-0 max-w-4xl mx-auto">
            {experienceData.map((exp, idx) => (
              <TimelineItem key={exp.id} item={exp} index={idx} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 04 — ស្នាដៃ / Achievements */}
        {/* ========================================================================= */}
        <section id="section-04" className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
              04
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              ស្នាដៃ — Key Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementsList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-2xl">{item.icon}</div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 05 — គម្រោង / Selected Projects */}
        {/* ========================================================================= */}
        <section id="section-05" className="space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
                05
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                គម្រោង — Selected Projects
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              asAnchor
              href="/portfolio"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Full Portfolio
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">0{idx + 1}. Project</span>
                    <span className="text-slate-400">{project.role}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Key Features:</span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-mono">
                      {project.features.slice(0, 4).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 06 — ជំនាញសំខាន់ / Technical Skills */}
        {/* ========================================================================= */}
        <section id="section-06" className="space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
                06
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                ជំនាញសំខាន់ — Technical Skills
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              asAnchor
              href="/skills"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Interactive Skills Matrix
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 text-xs font-mono text-slate-700 dark:text-slate-300"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 07 — Engineering Philosophy */}
        {/* ========================================================================= */}
        <section id="section-07" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
              07
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              Engineering Philosophy
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-cyan-500/30 shadow-2xl relative overflow-hidden space-y-6">
            <div className="space-y-2 font-mono text-xl sm:text-2xl lg:text-3xl font-black text-cyan-400">
              <p>«Build it clean.</p>
              <p>Build it secure.</p>
              <p>Build it scalable.</p>
              <p>Build it for production.»</p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              ខ្ញុំជឿថា Software ល្អមិនមែនគ្រាន់តែ “ដំណើរការ” ប៉ុណ្ណោះទេ ប៉ុន្តែត្រូវមាន៖
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 font-mono text-xs sm:text-sm text-cyan-300 font-bold tracking-wide">
              Performance + Security + Reliability + Scalability + Maintainability + Great UX
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 08 — ទំនាក់ទំនង / Contact */}
        {/* ========================================================================= */}
        <section id="section-08" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold">
              08
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              ទំនាក់ទំនង — Contact
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                PRO SAN
              </h3>
              <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                Senior Software Engineer & AI Developer
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block mb-1">📧 Email</span>
                <a href={`mailto:${profile.email}`} className="font-semibold text-slate-900 dark:text-white hover:text-cyan-500">
                  {profile.email}
                </a>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block mb-1">🌐 Website</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  prosan.dev
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block mb-1">📍 Location</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {profile.location}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-400 block mb-1">💼 Availability</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Open to Remote & Relocation
                </span>
              </div>
            </div>

            {/* Social Networks Quick List - Icon Only */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Professional Profiles & Networks
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[
                  { name: 'Telegram', icon: Send, href: profile.social.telegram || 'https://t.me/kim_san145' },
                  { name: 'Facebook', icon: Facebook, href: profile.social.facebook || 'https://t.me/kim_san145' },
                  { name: 'YouTube', icon: Youtube, href: profile.social.youtube || 'https://t.me/kim_san145' },
                  { name: 'Instagram', icon: Instagram, href: profile.social.instagram || 'https://t.me/kim_san145' },
                  { name: 'WhatsApp', icon: MessageCircle, href: profile.social.whatsapp || 'https://t.me/kim_san145' },
                  { name: 'LinkedIn', icon: Linkedin, href: profile.social.linkedin },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.name}
                      aria-label={item.name}
                      className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 dark:hover:bg-cyan-500/10 flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                Let's Build Something Great Together.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  asAnchor
                  href="https://t.me/+XXMzPZjYJqwyYzc1"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  SUPPORT →
                </Button>
                <Button
                  variant="secondary"
                  asAnchor
                  href="/portfolio"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View My Projects →
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setResumeOpen(true)}
                  leftIcon={<FileText className="w-4 h-4 text-cyan-500" />}
                >
                  Download Resume →
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </PageContainer>
  );
};
