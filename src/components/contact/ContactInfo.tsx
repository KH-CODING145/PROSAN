import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Copy, 
  Check, 
  Linkedin, 
  Youtube, 
  Send, 
  Facebook,
  Instagram,
  MessageCircle,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ContactInfo: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const profile = siteConfig.profile;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'Telegram', icon: Send, href: profile.social.telegram || 'https://t.me/kim_san145' },
    { name: 'Facebook', icon: Facebook, href: profile.social.facebook || 'https://t.me/kim_san145' },
    { name: 'YouTube', icon: Youtube, href: profile.social.youtube || 'https://t.me/kim_san145' },
    { name: 'Instagram', icon: Instagram, href: profile.social.instagram || 'https://t.me/kim_san145' },
    { name: 'WhatsApp', icon: MessageCircle, href: profile.social.whatsapp || 'https://t.me/kim_san145' },
    { name: 'LinkedIn', icon: Linkedin, href: profile.social.linkedin },
  ];

  return (
    <div className="space-y-6">
      {/* Availability Status Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-emerald-400">
            Open For Inquiries
          </span>
        </div>
        <h4 className="text-xl font-bold">
          {profile.hireStatusText}
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Open to senior engineering roles, multi-agent AI architecture advisory, and technical consulting contracts.
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="space-y-3">
        {/* Instant Support Telegram Card */}
        <a
          href="https://t.me/+XXMzPZjYJqwyYzc1"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 hover:border-cyan-500/60 flex items-center justify-between gap-3 shadow-xs hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-cyan-500 text-white shrink-0 shadow-md group-hover:scale-110 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold uppercase tracking-wider">SUPPORT</p>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded font-mono font-medium">ចូលទៅកាន់</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                t.me/+XXMzPZjYJqwyYzc1
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-cyan-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Email Card with Copy Button */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-mono">Email Address</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                {profile.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            aria-label="Copy email address"
            className="p-2 rounded-xl text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Location Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-xs">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-mono">Location & Remote</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {profile.location}
            </p>
          </div>
        </div>

        {/* Response Time Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-xs">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-mono">Response Velocity</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              Typically within 24 hours
            </p>
          </div>
        </div>
      </div>

      {/* Social Profiles Grid - Icon Only */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
          Professional Profiles & Networks
        </h4>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                aria-label={social.name}
                className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-xs"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
