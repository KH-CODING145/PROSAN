import React, { useState } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { subscribeNewsletter } from '../../services/firestoreService';

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address (e.g. name@domain.com)')
    .max(120, 'Email cannot exceed 120 characters')
});

interface NewsletterSubscribeProps {
  variant?: 'footer' | 'card' | 'inline';
  className?: string;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({ 
  variant = 'footer',
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateEmail = (val: string): string | null => {
    const res = newsletterSchema.safeParse({ email: val });
    if (!res.success) {
      return res.error.issues[0]?.message || 'Invalid email address';
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (error) {
      setError(null);
    }
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setStatus('loading');

    try {
      await subscribeNewsletter(email.trim(), `footer_subscription`);
      setStatus('success');
      setStatusMessage('Thank you for subscribing! You will receive tech insights & architecture case studies.');
      setEmail('');
    } catch (err: any) {
      console.error('Newsletter subscription error:', err);
      setStatus('error');
      setStatusMessage('Unable to subscribe at the moment. Please try again or reach out directly.');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Header & Copy */}
          <div className="max-w-xl space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
                Tech Dispatch & Updates
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Stay ahead in Engineering, AI & Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Curated case studies, real-world full-stack architectures, and zero-spam developer insights sent directly to your inbox.
            </p>
          </div>

          {/* Form */}
          <div className="w-full lg:w-auto lg:min-w-[380px] xl:min-w-[440px]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success-box"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">Subscribed Successfully!</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{statusMessage}</p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-xs text-cyan-600 dark:text-cyan-400 font-medium hover:underline pt-1 inline-block"
                    >
                      Subscribe another email
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="newsletter-email-input"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your work or personal email..."
                        aria-label="Email address for newsletter"
                        aria-invalid={!!error}
                        aria-describedby={error ? "newsletter-error" : undefined}
                        disabled={status === 'loading'}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                          error 
                            ? 'border-rose-500 focus:ring-rose-500' 
                            : 'border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500'
                        } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 transition-colors disabled:opacity-60`}
                      />
                    </div>
                    <button
                      id="newsletter-submit-button"
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 shrink-0 cursor-pointer active:scale-98"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Validation Error / Status Error */}
                  {error && (
                    <motion.p
                      id="newsletter-error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1.5 pl-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{error}</span>
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1.5 pl-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{statusMessage}</span>
                    </motion.p>
                  )}

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-1 font-mono">
                    No spam ever • Instant unsubscribe anytime • Secure Firestore storage
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
