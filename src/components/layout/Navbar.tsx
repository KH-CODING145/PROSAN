import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { siteConfig } from '../../config/siteConfig';
import { ResumeModal } from '../resume/ResumeModal';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useSearch } from '../../context/SearchContext';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Menu, 
  X, 
  Terminal, 
  FileText, 
  Send,
  Github,
  Linkedin,
  Search
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();
  const { openSearch, isMac } = useSearch();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const themeRef = useRef<HTMLDivElement>(null);

  const getNavLabel = (href: string, fallback: string) => {
    switch (href) {
      case '/': return t('nav.home', fallback);
      case '/about': return t('nav.about', fallback);
      case '/skills': return t('nav.skills', fallback);
      case '/experience': return t('nav.experience', fallback);
      case '/projects': return t('nav.projects', fallback);
      case '/services': return t('nav.services', fallback);
      case '/education': return t('nav.education', fallback);
      case '/certificates': return t('nav.certificates', fallback);
      case '/blog': return t('nav.blog', fallback);
      case '/contact': return t('nav.contact', fallback);
      case '/resume': return t('nav.resume', fallback);
      default: return fallback;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setThemeDropdownOpen(false);
  }, [location.pathname]);

  const mainMenu = siteConfig.mainMenu || [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const mobileMenu = siteConfig.mobileMenu || mainMenu;

  const isLinkActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/portfolio') return location.pathname === '/portfolio' || location.pathname.startsWith('/projects');
    if (href === '/blog') return location.pathname === '/blog' || location.pathname.startsWith('/articles');
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-250',
          isScrolled
            ? 'py-2.5 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
            : 'py-4 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-4">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg shrink-0"
              aria-label="PRO SAN Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  PRO SAN
                  <span className="text-cyan-500 font-mono">.dev</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-none hidden sm:inline-block">
                  Software & AI Architect
                </span>
              </div>
            </Link>

            {/* 🌐 Desktop Main Menu */}
            <nav className="hidden xl:flex items-center gap-0.5 bg-slate-100/70 dark:bg-slate-900/70 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
              {mainMenu.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      'relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-150 whitespace-nowrap',
                      isActive
                        ? 'text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-xs border border-slate-200/50 dark:border-slate-700/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{getNavLabel(link.href, link.name)}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Medium screen navigation fallback (condensed) */}
            <nav className="hidden lg:flex xl:hidden items-center gap-0.5 bg-slate-100/70 dark:bg-slate-900/70 p-1 rounded-full border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
              {mainMenu.slice(0, 6).map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      'relative px-2.5 py-1 text-xs font-medium rounded-full transition-colors duration-150',
                      isActive
                        ? 'text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPillLg"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-xs border border-slate-200/50 dark:border-slate-700/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{getNavLabel(link.href, link.name)}</span>
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {t('nav.contact', 'Contact')}
              </Link>
            </nav>

            {/* Right Controls: Search, Socials, Resume, Language & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Global Search Quick Trigger */}
              <button
                type="button"
                onClick={() => openSearch()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-850/90 hover:bg-slate-200/90 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all group shadow-2xs"
                title={`Search projects, articles, skills (${isMac ? '⌘K' : 'Ctrl+K'})`}
                aria-label="Search portfolio"
              >
                <Search className="w-3.5 h-3.5 text-cyan-500 group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline text-xs font-medium">Search...</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 transition-colors shadow-2xs">
                  {isMac ? '⌘K' : 'Ctrl+K'}
                </kbd>
              </button>

              {/* GitHub Quick Link */}
              <a
                href={siteConfig.profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* LinkedIn Quick Link */}
              <a
                href={siteConfig.profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Resume Button */}
              <Link
                to="/resume"
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-500" />
                <span>{t('nav.resume', 'Resume')}</span>
              </Link>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme Switcher Dropdown */}
              <div className="relative" ref={themeRef}>
                <button
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  aria-label="Toggle theme dropdown"
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  {resolvedTheme === 'dark' ? (
                    <Moon className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                </button>

                <AnimatePresence>
                  {themeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1 z-50"
                    >
                      <button
                        onClick={() => { setTheme('light'); setThemeDropdownOpen(false); }}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-colors',
                          theme === 'light' ? 'bg-cyan-500/10 text-cyan-600 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        )}
                      >
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => { setTheme('dark'); setThemeDropdownOpen(false); }}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-colors',
                          theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        )}
                      >
                        <Moon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Dark</span>
                      </button>
                      <button
                        onClick={() => { setTheme('system'); setThemeDropdownOpen(false); }}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-colors',
                          theme === 'system' ? 'bg-cyan-500/10 text-cyan-500 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        )}
                      >
                        <Monitor className="w-3.5 h-3.5 text-slate-400" />
                        <span>System</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
              {/* Quick Search trigger */}
              <button
                type="button"
                onClick={() => openSearch()}
                aria-label="Search portfolio"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4 text-cyan-500" />
              </button>

              {/* Quick Language Toggle */}
              <LanguageSwitcher variant="toggle" />

              {/* Quick theme toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                {resolvedTheme === 'dark' ? (
                  <Moon className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </button>

              {/* Hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open mobile menu"
                aria-expanded={mobileMenuOpen}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 📱 Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {/* Language Switcher in Mobile Drawer */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    {t('lang.label', 'Language')}
                  </span>
                  <LanguageSwitcher variant="segmented" />
                </div>

                {/* Quick Search in Mobile Drawer */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="w-full mb-3 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between hover:bg-slate-200/70 dark:hover:bg-slate-850 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan-500" />
                    <span>Search projects, articles, skills...</span>
                  </span>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400">
                    {isMac ? '⌘K' : 'Ctrl+K'}
                  </kbd>
                </button>

                <div className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {t('nav.navigation', 'Navigation')}
                </div>

                {mobileMenu.map((link) => {
                  const isActive = isLinkActive(link.href);

                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between',
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                      )}
                    >
                      <span>{getNavLabel(link.href, link.name)}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />}
                    </Link>
                  );
                })}

                {/* Additional Quick Access Links in Mobile */}
                <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setResumeModalOpen(true);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t('nav.resumeCv', 'Resume / CV')}</span>
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('nav.getInTouch', 'Get in Touch')}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
};
