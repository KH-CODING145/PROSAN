import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';
import { 
  Share2, 
  Check, 
  Copy, 
  Linkedin, 
  Twitter, 
  Mail, 
  MessageSquare,
  Send,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { Button } from '../common/Button';

interface ShareProjectButtonProps {
  project: Project;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showFallbackDropdown?: boolean;
  showOptionsToggle?: boolean;
  label?: string;
}

export const ShareProjectButton: React.FC<ShareProjectButtonProps> = ({
  project,
  variant = 'outline',
  size = 'md',
  className = '',
  showFallbackDropdown = true,
  showOptionsToggle = true,
  label = 'Share Project',
}) => {
  const [copied, setCopied] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setSupportsNativeShare(true);
    }
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDropdown]);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://prosan.dev/projects/${project.slug}`;
  };

  const shareData = {
    title: `${project.title} — Software Architecture & Case Study`,
    text: `Explore "${project.title}" by PRO SAN: ${project.shortDescription}`,
    url: getShareUrl(),
  };

  const handleNativeShare = async (): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        const canShareData = navigator.canShare ? navigator.canShare(shareData) : true;
        if (!canShareData) {
          await navigator.share({
            title: shareData.title,
            url: getShareUrl(),
          });
        } else {
          await navigator.share(shareData);
        }
        setShareFeedback('Shared successfully!');
        setTimeout(() => setShareFeedback(null), 3000);
        return true;
      } catch (err: any) {
        // User closed the share sheet
        if (err?.name === 'AbortError') {
          return true;
        }
        console.warn('Web Share API call failed or not permitted, falling back to copy link:', err);
      }
    }
    return false;
  };

  const handleShareClick = async () => {
    // If native share is supported, attempt it first
    if (supportsNativeShare) {
      const success = await handleNativeShare();
      if (success) return;
    }

    // Fallback: Copy link and open share menu
    await copyLinkToClipboard();
    if (showFallbackDropdown) {
      setShowDropdown(true);
    }
  };

  const copyLinkToClipboard = async () => {
    const currentUrl = getShareUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setShareFeedback('Link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setShareFeedback(null);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      setShareFeedback('Failed to copy link');
      setTimeout(() => setShareFeedback(null), 3000);
    }
  };

  const encodedUrl = encodeURIComponent(getShareUrl());
  const encodedTitle = encodeURIComponent(`Explore "${project.title}": ${project.shortDescription}`);

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10',
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      color: 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
      color: 'hover:text-[#229ED9] hover:bg-[#229ED9]/10',
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageSquare,
      color: 'hover:text-[#25D366] hover:bg-[#25D366]/10',
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(project.title)}&body=${encodedTitle}%0A%0A${encodedUrl}`,
      icon: Mail,
      color: 'hover:text-cyan-500 hover:bg-cyan-500/10',
    },
  ];

  return (
    <div ref={dropdownRef} className={`relative inline-flex items-center ${className}`}>
      <div className="inline-flex items-center rounded-xl shadow-xs">
        <Button
          id={`share-project-btn-${project.id}`}
          variant={variant}
          size={size}
          onClick={handleShareClick}
          leftIcon={
            copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            )
          }
          className={`${showOptionsToggle ? 'rounded-r-none border-r-0' : ''}`}
          aria-label={`Share ${project.title}`}
          aria-haspopup="true"
          aria-expanded={showDropdown}
        >
          <span>{copied ? 'Link Copied!' : label}</span>
        </Button>

        {showOptionsToggle && (
          <button
            type="button"
            id={`share-options-toggle-${project.id}`}
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`px-2 py-2.5 inline-flex items-center justify-center rounded-r-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer ${
              variant === 'primary'
                ? 'bg-blue-600 hover:bg-blue-500 text-white border-cyan-500/20'
                : variant === 'secondary'
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700/60'
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent'
            }`}
            aria-label="More share options"
            title="More share options"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Floating feedback toast */}
      <AnimatePresence>
        {shareFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold shadow-xl border border-slate-700/60 flex items-center gap-1.5 pointer-events-none"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{shareFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Options Popover Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            id={`share-dropdown-menu-${project.id}`}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 z-50 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 space-y-3.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-cyan-500" />
                Share Project
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {supportsNativeShare ? 'Web Share Ready' : 'Direct Link'}
              </span>
            </div>

            {/* Quick Copy Link Action */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Project Link
              </label>
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <input
                  type="text"
                  readOnly
                  value={getShareUrl()}
                  className="bg-transparent text-xs text-slate-700 dark:text-slate-300 font-mono px-2 flex-1 outline-none truncate"
                  onFocus={(e) => e.target.select()}
                />
                <button
                  type="button"
                  id={`copy-url-btn-${project.id}`}
                  onClick={copyLinkToClipboard}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 shadow-xs transition-colors flex items-center gap-1 text-xs font-medium"
                  title="Copy link to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[11px] text-emerald-500 font-sans">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-sans">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Share Grid */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Share via
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 ${item.color} transition-all`}
                      title={`Share on ${item.name}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-medium truncate max-w-full">
                        {item.name.split(' ')[0]}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Web Share Sheet Trigger (if supported) */}
            {supportsNativeShare && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  id={`native-share-trigger-${project.id}`}
                  onClick={() => {
                    setShowDropdown(false);
                    handleNativeShare();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-950/60 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open System Share Sheet</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
