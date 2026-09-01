import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Building2, 
  Rocket, 
  Briefcase 
} from 'lucide-react';
import { cn } from '../utils/cn';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: string;
  annualPrice: string;
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  notIncluded?: string[];
  ctaLabel: string;
  isPopular?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter-advisory',
    name: 'Technical Advisory & Audit',
    tagline: 'Ideal for early startups and teams needing architectural clarity and code reviews.',
    monthlyPrice: '$2,400',
    annualPrice: '$1,950',
    period: '/ month',
    icon: Rocket,
    features: [
      'Comprehensive Full-Stack & AI architecture review',
      'Core Web Vitals & performance optimization roadmap',
      'Security posture & secret vulnerability audit',
      'Bi-weekly 1:1 engineering strategy calls',
      'Asynchronous code review (up to 4 PRs/month)',
      'Direct Slack / Discord engineering support channel'
    ],
    ctaLabel: 'Select Advisory',
    isPopular: false
  },
  {
    id: 'growth-sprint',
    name: 'Dedicated Growth Sprint',
    badge: 'Most Popular',
    tagline: 'End-to-end full-stack or AI workflow development for high-velocity teams.',
    monthlyPrice: '$6,800',
    annualPrice: '$5,600',
    period: '/ sprint',
    icon: Zap,
    features: [
      'Full-stack web application development (React / Node / Python)',
      'Custom LLM agent workflows & recursive tooling',
      'Cloud database & serverless API architecture',
      'Automated CI/CD test pipelines & Docker containerization',
      'Dedicated weekly sprint demos & deliverables',
      'Production zero-downtime deployment assistance',
      '30-day post-launch warranty & bugfix support'
    ],
    ctaLabel: 'Start Growth Sprint',
    isPopular: true
  },
  {
    id: 'enterprise-custom',
    name: 'Enterprise AI Systems',
    tagline: 'Custom distributed systems, compliance hardening, and multi-agent infrastructure.',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    period: 'tailored quote',
    icon: Building2,
    features: [
      'Multi-region high-throughput cloud infrastructure',
      'SOC2 / HIPAA compliance architecture hardening',
      'Private air-gapped LLM deployments on AWS / GCP',
      'Custom SLA guarantees (99.99% uptime)',
      'Full technical documentation & team knowledge transfer',
      'Dedicated engineering leadership & priority 24/7 on-call'
    ],
    ctaLabel: 'Contact for Enterprise',
    isPopular: false
  }
];

const FAQS = [
  {
    question: 'How do project kickoffs work?',
    answer: 'Once you select a tier or request a project, we schedule a 45-minute technical discovery call to align on system requirements, milestones, and deliverables. Sprints begin within 3-5 business days.'
  },
  {
    question: 'Can tiers be customized for our specific stack?',
    answer: 'Yes. Every project has unique requirements. We can tailor any sprint or retainer around your current tech stack (e.g. Next.js, FastAPI, PostgreSQL, Kubernetes, Gemini/OpenAI).'
  },
  {
    question: 'What is your turnaround time for deliverables?',
    answer: 'Advisory audits are delivered within 5 business days. Dedicated development sprints operate on 2-week agile cycles with continuous preview deployments.'
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes, post-launch maintenance, monitoring, and ongoing feature engineering retainers are available after initial project handoff.'
  }
];

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <PageContainer
      title="Transparent Engineering Pricing & Retainers"
      description="Clear, predictable pricing tiers for advisory, full-stack application development, and enterprise AI engineering."
      className="max-w-7xl mx-auto"
    >
      <div className="py-8 sm:py-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investment & Plans</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transparent Pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">World-Class Engineering</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200',
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              Standard Sprints
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5',
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <span>Annual Retainer</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const Icon = tier.icon;
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={cn(
                  'relative p-6 sm:p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between',
                  tier.isPopular
                    ? 'bg-white dark:bg-slate-900 border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 lg:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-cyan-500/30">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top info */}
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                        {price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {tier.period}
                      </span>
                    </div>
                    {billingCycle === 'annual' && price !== 'Custom' && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                        Billed annually with dedicated priority support
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                      Included in this plan:
                    </p>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <Link to="/get-started">
                    <Button
                      size="lg"
                      variant={tier.isPopular ? 'primary' : 'outline'}
                      className="w-full justify-center"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {tier.ctaLabel}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="pt-8 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Clear answers regarding pricing, project scopes, billing, and code ownership.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-500 shrink-0" />
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
