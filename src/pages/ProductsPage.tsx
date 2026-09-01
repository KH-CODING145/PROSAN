import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { 
  Box, 
  Sparkles, 
  Cpu, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Activity,
  Code2
} from 'lucide-react';
import { cn } from '../utils/cn';

interface ProductItem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  category: 'AI Agents' | 'Developer Tools' | 'Cloud Infrastructure' | 'Enterprise Systems';
  highlights: string[];
  stats: { label: string; value: string };
  status: 'Live & Active' | 'Enterprise Ready' | 'Open Source';
  demoUrl?: string;
  ctaText: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'agentic-flow',
    name: 'AgenticFlow Studio',
    badge: 'Flagship AI Suite',
    tagline: 'Autonomous multi-agent orchestration engine with recursive tool use',
    description: 'An enterprise-grade orchestration framework that enables distributed LLM agents to collaborate, execute sandboxed code, inspect database schemas, and synthesize multi-step workflows with zero human intervention.',
    category: 'AI Agents',
    highlights: [
      'Multi-agent state synchronization via Redis & SSE',
      'Sandboxed Docker code execution environments',
      'Automated semantic caching reducing API costs by 68%',
      'Custom human-in-the-loop review triggers'
    ],
    stats: { label: 'Active Deployments', value: '450+' },
    status: 'Enterprise Ready',
    ctaText: 'Deploy Agents'
  },
  {
    id: 'hyperscale-api',
    name: 'HyperScale Gateway',
    badge: 'Distributed Core',
    tagline: 'Ultra-low latency edge proxy with dynamic rate limiting and token metering',
    description: 'A lightning-fast reverse proxy built for AI and fintech workloads. Provides cryptographically secure token metering, circuit breakers, multi-region failover, and sub-millisecond route dispatching.',
    category: 'Cloud Infrastructure',
    highlights: [
      '< 2ms average edge routing latency',
      'Dynamic per-tenant token-bucket rate limiter',
      'Built-in SOC2 compliant audit log exporter',
      'Native OpenTelemetry distributed tracing'
    ],
    stats: { label: 'Uptime SLA', value: '99.99%' },
    status: 'Live & Active',
    ctaText: 'Explore Gateway'
  },
  {
    id: 'zenith-ui',
    name: 'Zenith Design System',
    badge: 'Open Source',
    tagline: 'Accessible, dark-first UI component ecosystem for high-density engineering dashboards',
    description: 'A modular, high-contrast UI component architecture with zero hydration lag. Crafted specifically for financial terminals, telemetry analytics, and mission-critical SaaS consoles.',
    category: 'Developer Tools',
    highlights: [
      'WCAG 2.1 AAA accessibility certified',
      'Under 8kb gzipped core bundle footprint',
      'Fluid gesture support and keyboard-only navigation',
      'Seamless Tailwind CSS v4 & Motion v12 bindings'
    ],
    stats: { label: 'GitHub Stars', value: '1.8k+' },
    status: 'Open Source',
    ctaText: 'View Repository'
  },
  {
    id: 'secure-vault',
    name: 'CryptaGuard Vault',
    badge: 'Security Standard',
    tagline: 'Zero-knowledge secret management and automated credential rotation for CI/CD',
    description: 'A decentralized secret management gateway providing real-time dynamic rotation for AWS, GCP, and database credentials with automated anomaly detection and hardware-key authorization.',
    category: 'Enterprise Systems',
    highlights: [
      'AES-256-GCM hardware enclave encryption',
      'Automated ephemeral credential generation',
      'Slack/PagerDuty instantaneous alerts on breach attempts',
      'Zero-trust peer-to-peer verification protocols'
    ],
    stats: { label: 'Encrypted Keys', value: '1.2M+' },
    status: 'Enterprise Ready',
    ctaText: 'Request Security Demo'
  }
];

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Agents', 'Developer Tools', 'Cloud Infrastructure', 'Enterprise Systems'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <PageContainer
      title="Engineering Products & Software Suites"
      description="Explore production-grade software products, developer tooling, and autonomous AI systems engineered by PRO SAN."
      className="max-w-7xl mx-auto"
    >
      <div className="py-8 sm:py-12 space-y-12">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            <Box className="w-3.5 h-3.5" />
            <span>Digital Solutions & Systems</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Production-Ready <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Software Products</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 rounded-3xl shadow-sm hover:shadow-xl hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {product.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {product.status}
                  </span>
                </div>

                {/* Title and Tagline */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-1">
                    {product.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                    Core Capabilities:
                  </p>
                  <ul className="space-y-1.5">
                    {product.highlights.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                    {product.stats.label}
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    {product.stats.value}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link to="/contact">
                    <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      {product.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Solution Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-white border border-cyan-500/20 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Zap className="w-6 h-6" />
          </div>
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Need a Custom Product Built for Your Team?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              From bespoke AI agents to high-throughput financial pipelines, let's architect and ship your proprietary software solution with guaranteed delivery timelines.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/get-started">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started Today
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                View Pricing Tiers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
