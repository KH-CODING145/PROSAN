import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Clock, 
  Activity, 
  Lock, 
  Globe, 
  Code2, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Database,
  Terminal
} from 'lucide-react';

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  category: string;
  description: string;
  metrics: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Zap,
    title: 'Sub-Millisecond Edge Latency',
    category: 'Performance',
    description: 'Globally distributed CDN caching and serverless edge functions delivering instant time-to-first-byte and 99.9th percentile responsiveness.',
    metrics: '< 15ms Worldwide TTFB'
  },
  {
    icon: Cpu,
    title: 'Autonomous AI Workflows',
    category: 'Artificial Intelligence',
    description: 'Multi-agent orchestration with autonomous tool execution, deterministic JSON-schema outputs, and real-time streaming tokens.',
    metrics: '99.4% Task Accuracy'
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Security & SOC2 Ready',
    category: 'Security',
    description: 'Hardware enclave encryption, automated secrets rotation, sanitized SQL queries, and comprehensive rate limiting preventing DDoS attacks.',
    metrics: 'AES-256-GCM Encryption'
  },
  {
    icon: Layers,
    title: 'Modular Micro-Architecture',
    category: 'Scalability',
    description: 'Decoupled domain services, asynchronous event buses, and distributed queues engineered to scale horizontally under extreme traffic surges.',
    metrics: '100k+ Concurrent Req/s'
  },
  {
    icon: Database,
    title: 'Multi-Region Data Sync',
    category: 'Reliability',
    description: 'Active-active distributed replication with automated partition tolerance, optimistic concurrency, and zero-downtime schema migrations.',
    metrics: '99.99% Availability'
  },
  {
    icon: Activity,
    title: 'Deep Telemetry & Observability',
    category: 'Monitoring',
    description: 'Distributed OpenTelemetry tracing, real-time structured logging, automated anomaly alerts, and Core Web Vitals monitoring dashboards.',
    metrics: '100% Trace Coverage'
  }
];

export const FeaturesPage: React.FC = () => {
  return (
    <PageContainer
      title="System Architecture & Core Engineering Features"
      description="Deep dive into the architectural principles, security standards, and performance benchmarks engineered into every solution."
      className="max-w-7xl mx-auto"
    >
      <div className="py-8 sm:py-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Extreme <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Speed, Scale & Security</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-lg hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Benchmark</span>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {item.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Why Modern Engineering Standards Matter
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Comparing conventional software implementations with our production-grade architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-mono font-semibold text-rose-500 uppercase tracking-wider">
                Conventional AI & Web Apps
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✕</span> Fragile prompt-chains prone to LLM hallucinations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✕</span> Unmonitored latency spikes and slow render cycles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✕</span> Monolithic tightly-coupled codebases with technical debt
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✕</span> Secrets exposed to frontend clients
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/30 space-y-3">
              <span className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                PRO SAN Engineering Architecture
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> Structured schema validators with deterministic fallback logic
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> Sub-second response times with global caching layers
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> Clean domain boundaries and strict TypeScript type-safety
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" /> Zero-trust server-side API proxying and encrypted vaults
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link to="/get-started">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started with Modern Architecture
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
