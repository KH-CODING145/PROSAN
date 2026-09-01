import React from 'react';
import { useContactForm } from '../../hooks/useContactForm';
import { Button } from '../common/Button';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  Check
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface QuickInquiryTopic {
  label: string;
  subject: string;
  message: string;
}

const QUICK_TOPICS: QuickInquiryTopic[] = [
  {
    label: '🤖 AI Automation',
    subject: 'AI Agent Architecture / LLM Workflow Integration',
    message: "Hi PRO SAN, we are looking to build/integrate an autonomous AI workflow for our product and would love to explore collaborating with you on the system architecture and implementation."
  },
  {
    label: '⚡ Full-Stack App',
    subject: 'Full-Stack Modern Web Application Development',
    message: "Hi PRO SAN, we have a new web application project with high scalability and real-time telemetry requirements and want to discuss project scope, tech stack, and timeline."
  },
  {
    label: '🔍 Architecture Audit',
    subject: 'System Architecture & Performance Optimization Audit',
    message: "Hi PRO SAN, we'd like to schedule a comprehensive technical audit of our frontend/backend infrastructure to boost Core Web Vitals, reduce cloud latency, and harden security."
  },
  {
    label: '💼 Engineering Role',
    subject: 'Senior Full-Stack / AI Systems Engineering Opportunity',
    message: "Hi PRO SAN, I came across your portfolio and was impressed with your systems engineering work. We have an exciting technical leadership/senior engineering opportunity on our team."
  }
];

export const ContactForm: React.FC = () => {
  const {
    values,
    errors,
    touched,
    status,
    serverMessage,
    isSubmitting,
    isSuccess,
    isError,
    handleChange,
    handleBlur,
    handleSubmit,
    applyTemplate,
    resetForm
  } = useContactForm({
    cooldownMs: 10000
  });

  const messageLength = values.message.length;
  const maxMessageLength = 2000;

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Send a Direct Message
          </h3>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Avg. reply &lt; 24h</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Have an engineering opening, consulting inquiry, or technical question? Fill out the form or select a template below.
        </p>
      </div>

      {/* Quick Template Suggestion Chips */}
      {!isSuccess && (
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick Inquiry Templates:
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TOPICS.map((topic) => {
              const isSelected = values.subject === topic.subject;
              return (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => applyTemplate(topic)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
                    isSelected
                      ? 'bg-cyan-500 text-white border-cyan-500 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-slate-700/50'
                  )}
                >
                  {topic.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Success Notification Banner */}
      {isSuccess && (
        <div className="p-6 mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 animate-in fade-in zoom-in-95 duration-300 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                Message Dispatched Successfully!
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                {serverMessage}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Delivered to priority inbox
            </span>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 hover:underline focus:outline-none"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Send Another Note
            </button>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {isError && (
        <div className="p-4 mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          <div className="space-y-0.5">
            <p className="text-sm font-semibold">Message delivery issue</p>
            <p className="text-xs">{serverMessage}</p>
          </div>
        </div>
      )}

      {/* Main Interactive Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Anti-Spam Honeypot (hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="honeypot"
            value={values.honeypot || ''}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Your Name <span className="text-cyan-500">*</span>
              </label>
              {touched.name && !errors.name && values.name.trim().length >= 2 && (
                <span className="text-emerald-500 text-[11px] flex items-center gap-0.5 font-mono">
                  <Check className="w-3 h-3" /> Valid
                </span>
              )}
            </div>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="e.g. Elena Rostova"
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={cn(
                'w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all',
                touched.name && errors.name
                  ? 'border-rose-400 dark:border-rose-500 focus:ring-2 focus:ring-rose-400'
                  : touched.name && !errors.name && values.name.trim().length >= 2
                  ? 'border-emerald-400 dark:border-emerald-500/70 focus:ring-2 focus:ring-emerald-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500'
              )}
            />
            {touched.name && errors.name && (
              <p id="contact-name-error" className="text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email Address <span className="text-cyan-500">*</span>
              </label>
              {touched.email && !errors.email && values.email.trim().length > 0 && (
                <span className="text-emerald-500 text-[11px] flex items-center gap-0.5 font-mono">
                  <Check className="w-3 h-3" /> Valid
                </span>
              )}
            </div>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              placeholder="elena@company.com"
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={cn(
                'w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all',
                touched.email && errors.email
                  ? 'border-rose-400 dark:border-rose-500 focus:ring-2 focus:ring-rose-400'
                  : touched.email && !errors.email && values.email.trim().length > 0
                  ? 'border-emerald-400 dark:border-emerald-500/70 focus:ring-2 focus:ring-emerald-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500'
              )}
            />
            {touched.email && errors.email && (
              <p id="contact-email-error" className="text-xs text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Subject <span className="text-cyan-500">*</span>
            </label>
            {touched.subject && !errors.subject && values.subject.trim().length >= 3 && (
              <span className="text-emerald-500 text-[11px] flex items-center gap-0.5 font-mono">
                <Check className="w-3 h-3" /> Valid
              </span>
            )}
          </div>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder="e.g. Senior Full-Stack Engineering Role / AI Integration"
            aria-invalid={touched.subject && !!errors.subject}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            className={cn(
              'w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all',
              touched.subject && errors.subject
                ? 'border-rose-400 dark:border-rose-500 focus:ring-2 focus:ring-rose-400'
                : touched.subject && !errors.subject && values.subject.trim().length >= 3
                ? 'border-emerald-400 dark:border-emerald-500/70 focus:ring-2 focus:ring-emerald-400'
                : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500'
            )}
          />
          {touched.subject && errors.subject && (
            <p id="contact-subject-error" className="text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Message Details <span className="text-cyan-500">*</span>
            </label>
            <span
              className={cn(
                'text-[11px] font-mono transition-colors',
                messageLength > maxMessageLength
                  ? 'text-rose-500 font-bold'
                  : messageLength >= 15
                  ? 'text-slate-500 dark:text-slate-400'
                  : 'text-amber-500'
              )}
            >
              {messageLength} / {maxMessageLength}
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            placeholder="Describe your goals, project scope, team background, or timeline..."
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={cn(
              'w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all resize-y min-h-[120px]',
              touched.message && errors.message
                ? 'border-rose-400 dark:border-rose-500 focus:ring-2 focus:ring-rose-400'
                : touched.message && !errors.message && messageLength >= 15
                ? 'border-emerald-400 dark:border-emerald-500/70 focus:ring-2 focus:ring-emerald-400'
                : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500'
            )}
          />
          {touched.message && errors.message && (
            <p id="contact-message-error" className="text-xs text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.message}
            </p>
          )}
        </div>

        {/* Submit button & disclaimer */}
        <div className="pt-2 space-y-3">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="w-full justify-center shadow-md shadow-cyan-500/10"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
          >
            {isSubmitting ? 'Dispatching Message...' : 'Send Message'}
          </Button>

          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            Protected by client validation, honeypot anti-spam & rate limiting.
          </p>
        </div>
      </form>
    </div>
  );
};
