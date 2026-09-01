import React, { useState } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';
import { ResumeModal } from '../resume/ResumeModal';
import { 
  ArrowDown, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Code2, 
  Cpu, 
  MapPin,
  Globe,
  Mail,
  Send,
  CheckCircle2,
  Terminal,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const profile = siteConfig.profile;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dot-pattern">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300">
                🌎 {profile.hireStatusText}
              </span>
            </div>

            {/* Main Greeting & Heading */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-mono text-cyan-600 dark:text-cyan-400 font-semibold tracking-wide">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {profile.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200">
                  {profile.title}
                </span>
              </div>
            </div>

            {/* Iconic Quote */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border-l-4 border-cyan-500 text-slate-800 dark:text-slate-200 font-mono text-sm sm:text-base italic max-w-2xl mx-auto lg:mx-0">
              {siteConfig.quote}
            </div>

            {/* Bio Description */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users.
              </p>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {profile.tagline}
              </p>
            </div>

            {/* Quick Metadata: Location, Experience, Contact */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono pt-1">
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg text-cyan-600 dark:text-cyan-400 font-semibold">
                <Sparkles className="w-4 h-4 shrink-0" />
                6+ Years Production Systems
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg"
              >
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                {profile.email}
              </a>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => scrollToSection('featured-projects')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View My Projects →
              </Button>

              <Button
                size="lg"
                variant="outline"
                leftIcon={<FileText className="w-4 h-4 text-cyan-500" />}
                onClick={() => setResumeOpen(true)}
              >
                Download Resume
              </Button>

              <Button
                size="lg"
                variant="secondary"
                asAnchor
                href="https://t.me/+XXMzPZjYJqwyYzc1"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<Send className="w-4 h-4 text-cyan-500" />}
              >
                SUPPORT →
              </Button>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-[4/5]">
              {/* Outer Glow & Border Frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-indigo-500/20 blur-xl -z-10" />

              {/* Main Profile Image Box */}
              <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-slate-200/80 dark:border-slate-800 shadow-2xl relative bg-slate-900">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/70 backdrop-blur-md border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">{profile.name}</p>
                      <p className="text-[11px] font-mono text-cyan-400">Full-Stack & AI Systems</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: React & TypeScript */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 sm:-left-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono text-slate-400">Frontend</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">React 19 • TS</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: AI & LLMs */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono text-slate-400">AI Agents</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Gemini • RAG</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollToSection('tech-marquee')}
            aria-label="Scroll to tech stack"
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors animate-bounce"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};
