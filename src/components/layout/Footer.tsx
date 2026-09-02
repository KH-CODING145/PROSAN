import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { NewsletterSubscribe } from './NewsletterSubscribe';
import { 
  Linkedin, 
  Youtube, 
  Send, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Mail, 
  ArrowUp, 
  Terminal, 
  Code 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Telegram', icon: Send, href: siteConfig.profile.social.telegram || 'https://t.me/kim_san145' },
    { name: 'Facebook', icon: Facebook, href: siteConfig.profile.social.facebook || 'https://t.me/kim_san145' },
    { name: 'YouTube', icon: Youtube, href: siteConfig.profile.social.youtube || 'https://youtube.com/@kimsan2000' },
    { name: 'Instagram', icon: Instagram, href: siteConfig.profile.social.instagram || 'https://t.me/kim_san145' },
    { name: 'WhatsApp', icon: MessageCircle, href: siteConfig.profile.social.whatsapp || 'https://t.me/kim_san145' },
    { name: 'LinkedIn', icon: Linkedin, href: siteConfig.profile.social.linkedin },
    { name: 'Email', icon: Mail, href: `mailto:${siteConfig.profile.email}` },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-850 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Subscription Bar */}
        <NewsletterSubscribe />

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12 pt-4">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                {siteConfig.profile.name}
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {siteConfig.profile.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{siteConfig.profile.hireStatusText}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Insights */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Insights & Work
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/portfolio" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Blog & Tech Deep Dives
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Career Experience
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Skills & Technology Stack
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Credentials & Certs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name}`}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-slate-500 font-mono">
              {siteConfig.profile.email}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 {siteConfig.profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-500" /> Built with React 19, TypeScript & Tailwind
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
