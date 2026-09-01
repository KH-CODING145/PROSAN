import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Terminal, 
  Activity, 
  Cpu, 
  Layers, 
  FolderGit2, 
  Key, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  LogOut, 
  Plus, 
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  FileCode
} from 'lucide-react';
import { cn } from '../utils/cn';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'api-keys' | 'telemetry'>('overview');

  const displayName = user?.name || 'Guest Partner';
  const displayEmail = user?.email || 'partner@enterprise.io';
  const displayRole = user?.role || 'client';

  return (
    <PageContainer
      title="Client & Engineering Dashboard"
      description="Real-time project deliverables, system health status, active API keys, and sprint metrics."
      className="max-w-7xl mx-auto"
    >
      <div className="py-8 sm:py-12 space-y-8">
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-cyan-500/20">
              {displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {displayName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {displayRole === 'client' ? 'Enterprise Client' : 'Core Contributor'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {displayEmail} • {user?.company || 'Verified Partner Account'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link to="/get-started">
              <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                New Sprint Request
              </Button>
            </Link>
            {isAuthenticated ? (
              <Button
                size="sm"
                variant="outline"
                leftIcon={<LogOut className="w-4 h-4 text-rose-500" />}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="outline">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Sprint Overview', icon: LayoutDashboard },
            { id: 'projects', label: 'Active Deployments', icon: FolderGit2 },
            { id: 'api-keys', label: 'API Keys & Secrets', icon: Key },
            { id: 'telemetry', label: 'System Telemetry', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all',
                  isActive
                    ? 'bg-cyan-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Active Sprint Deliverables', value: '4 Complete / 1 In-Progress', change: '80% Progress', icon: CheckCircle2 },
                { label: 'System Uptime SLA', value: '99.99%', change: '30-day verified', icon: Activity },
                { label: 'Avg API Gateway Latency', value: '1.8 ms', change: 'Sub-millisecond', icon: TrendingUp },
                { label: 'Security Compliance', value: 'SOC2 Ready', change: 'Zero vulnerabilities', icon: ShieldAlert },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="text-xs font-medium">{metric.label}</span>
                      <Icon className="w-4 h-4 text-cyan-500" />
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                      {metric.value}
                    </p>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 font-mono">
                      {metric.change}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current Sprints Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Active Sprint Deliverables
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live production status and roadmap checkpoints.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Sprint #4 Active
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Multi-Agent LLM Recursive Workflow Engine', status: 'Deployed to Staging', date: 'Sept 2026', badge: 'Complete' },
                  { name: 'Edge Reverse Proxy & Token Metering Integration', status: 'Live in Production', date: 'Sept 2026', badge: 'Complete' },
                  { name: 'Zero-Knowledge Credential Vault Migration', status: 'In Review & Testing', date: 'Target: Tomorrow', badge: 'Active' },
                  { name: 'Performance Audit & Core Web Vitals Overhaul', status: 'Scheduled Sprint #5', date: 'Next Week', badge: 'Upcoming' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.status} • {item.date}
                      </p>
                    </div>
                    <span className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-semibold self-start sm:self-center',
                      item.badge === 'Complete'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : item.badge === 'Active'
                        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    )}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Projects */}
        {activeTab === 'projects' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Connected Infrastructure & Code Repositories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    Production Cluster
                  </span>
                  <span className="text-xs text-emerald-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">agenticflow-prod-us-west</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kubernetes v1.30 • 6 Nodes • 99.99% Uptime
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <Link to="/contact">
                    <Button size="xs" variant="outline">
                      Manage Nodes
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    Edge CDN Proxy
                  </span>
                  <span className="text-xs text-emerald-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> 0 Errors
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">hyperscale-edge-global</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cloudflare Workers • 285 PoPs • 1.8ms Average Latency
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <Link to="/contact">
                    <Button size="xs" variant="outline">
                      View Logs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: API Keys */}
        {activeTab === 'api-keys' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Developer API Tokens
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage cryptographically isolated API keys for agent execution.
                </p>
              </div>
              <Button size="sm" variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Generate Token
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700">
              <span className="text-slate-900 dark:text-white">
                ps_live_8f3a9e2170dcb94018274a
              </span>
              <span className="text-xs text-slate-500">Read / Write • Created 2d ago</span>
            </div>
          </div>
        )}

        {/* Tab 4: Telemetry */}
        {activeTab === 'telemetry' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Real-Time Node Telemetry
            </h3>
            <div className="p-6 rounded-2xl bg-slate-950 text-slate-300 font-mono text-xs space-y-2 border border-slate-800">
              <p className="text-cyan-400 font-bold">$ telemetry status --verbose</p>
              <p>[INFO] 2026-09-01T07:40:00Z - All services operational.</p>
              <p>[INFO] AI Agent Pool: 12/12 active worker threads ready.</p>
              <p>[INFO] Memory footprint: 184MB / 2048MB (9% utilization).</p>
              <p>[SUCCESS] Database replication lag: 0.04ms.</p>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
