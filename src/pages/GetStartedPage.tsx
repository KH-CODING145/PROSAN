import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Code2, 
  Layers, 
  ShieldCheck,
  Calendar,
  Send
} from 'lucide-react';
import { cn } from '../utils/cn';
import confetti from 'canvas-confetti';

export const GetStartedPage: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [projectType, setProjectType] = useState<string>('ai-workflow');
  const [timeline, setTimeline] = useState<string>('immediate');
  const [budget, setBudget] = useState<string>('growth');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const PROJECT_TYPES = [
    { id: 'ai-workflow', title: 'Autonomous AI Agent Workflow', icon: Cpu, desc: 'Multi-agent orchestration, LLM reasoning chains & tool execution.' },
    { id: 'full-stack-app', title: 'Full-Stack Web Application', icon: Code2, desc: 'Modern React, TypeScript, Node.js, Python scalable platform.' },
    { id: 'cloud-architecture', title: 'Cloud & API Performance Audit', icon: Layers, desc: 'Low-latency reverse proxy, Kubernetes & Core Web Vitals overhaul.' },
    { id: 'advisory', title: 'Technical Leadership / Advisory', icon: Rocket, desc: 'Fractional CTO, code review sprint, and architecture guidance.' },
  ];

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <PageContainer
      title="Get Started — Kick Off Your Software Project"
      description="Interactive project discovery wizard to kick off your custom software or AI engineering sprint."
      className="max-w-3xl mx-auto"
    >
      <div className="py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            <Rocket className="w-3.5 h-3.5" />
            <span>Interactive Project Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Next Big Vision</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between relative max-w-md mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all',
                step >= s
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 ring-4 ring-white dark:ring-slate-950'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              )}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Wizard Box */}
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Project Discovery Received!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900 dark:text-white">{contactName || 'Partner'}</strong>. I have received your request for <strong className="text-cyan-500">{projectType}</strong>. I will review your requirements and reach out to <strong className="text-slate-900 dark:text-white">{contactEmail}</strong> within 24 hours.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <Link to="/dashboard">
                  <Button size="md" variant="primary">
                    Go to Portal Dashboard
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="md" variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Project Scope */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      1. Select Your Project Focus
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      What primary engineering outcome are you looking to achieve?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((t) => {
                      const Icon = t.icon;
                      const isSelected = projectType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setProjectType(t.id)}
                          className={cn(
                            'p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3',
                            isSelected
                              ? 'border-cyan-500 bg-cyan-500/5 dark:bg-cyan-950/20 ring-2 ring-cyan-500/40'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <Icon className={cn('w-5 h-5', isSelected ? 'text-cyan-500' : 'text-slate-500')} />
                            {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-500" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {t.title}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {t.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button size="md" variant="primary" onClick={() => setStep(2)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Continue to Timeline
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Timeline & Budget */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      2. Estimated Timeline & Sprint Scale
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Help us understand your urgency and target cadence.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Delivery Window:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'immediate', label: 'Within 2 Weeks' },
                        { id: 'month', label: '1 - 2 Months' },
                        { id: 'flexible', label: 'Flexible Retainer' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTimeline(t.id)}
                          className={cn(
                            'p-3 rounded-xl border text-xs font-semibold text-center transition-all',
                            timeline === t.id
                              ? 'bg-cyan-500 text-white border-cyan-500 shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          )}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Budget Range:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'advisory', label: '$2.5k - $5k' },
                        { id: 'growth', label: '$5k - $15k' },
                        { id: 'enterprise', label: '$15k+' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBudget(b.id)}
                          className={cn(
                            'p-3 rounded-xl border text-xs font-semibold text-center transition-all',
                            budget === b.id
                              ? 'bg-cyan-500 text-white border-cyan-500 shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          )}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Button size="md" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button size="md" variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Contact Details
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Submit */}
              {step === 3 && (
                <form onSubmit={handleFinish} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      3. Your Contact Information
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Where should we send your preliminary system architecture proposal?
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Brief Goals or Links (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any existing repositories, API schemas, or specific requirements..."
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Button size="md" variant="outline" type="button" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button size="md" variant="primary" type="submit" rightIcon={<Send className="w-4 h-4" />}>
                      Submit Project Brief
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
