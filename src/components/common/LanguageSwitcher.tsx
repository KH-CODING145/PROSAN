import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check } from 'lucide-react';
import { useI18n, SUPPORTED_LANGUAGES } from '../../context/I18nContext';
import { Locale } from '../../i18n/types';
import { cn } from '../../utils/cn';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'segmented' | 'toggle';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  className = '',
}) => {
  const { locale, setLocale, toggleLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Segmented control variant (great for mobile drawer or footer)
  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium',
          className
        )}
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = locale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLocale(lang.code)}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5',
                isActive
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              )}
            >
              <span>{lang.nativeLabel}</span>
              <span className="text-[10px] opacity-70 font-mono">({lang.shortLabel})</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Quick toggle variant (swaps directly between EN and KM)
  if (variant === 'toggle') {
    return (
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={t('lang.switch', 'Switch Language')}
        title={locale === 'en' ? 'ប្តូរទៅជា ភាសាខ្មែរ' : 'Switch to English'}
        className={cn(
          'flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors',
          className
        )}
      >
        <Globe className="w-3.5 h-3.5 text-cyan-500" />
        <span className="font-mono text-[11px] font-bold">
          {locale === 'en' ? 'EN' : 'ខ្មែរ'}
        </span>
      </button>
    );
  }

  // Default dropdown variant
  return (
    <div className={cn('relative inline-block text-left', className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('lang.switch', 'Switch Language')}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
      >
        <Globe className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
        <span className="font-semibold text-[11px] uppercase tracking-wider">
          {locale === 'en' ? 'EN' : 'ខ្មែរ'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 focus:outline-none"
          >
            <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
              {t('lang.label', 'Language')}
            </div>

            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLocale(lang.code as Locale);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-colors text-left',
                    isSelected
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {lang.shortLabel}
                    </span>
                    <span>{lang.nativeLabel}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-500" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
