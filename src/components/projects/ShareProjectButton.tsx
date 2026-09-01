import React, { useState, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button';

interface ShareProjectButtonProps {
  project: Project;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showFallbackDropdown?: boolean;
}

export const ShareProjectButton: React.FC<ShareProjectButtonProps> = ({
  project,
  variant = 'outline',
  size = 'md',
  className = '',
  showFallbackDropdown = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setSupportsNativeShare(true);
    }
  }, []);

  const shareData = {
    title: `${project.title} - Case Study`,
    text: `Check out this project case study: "${project.title}" - ${project.shortDescription}`,
    url: typeof window !== 'undefined' ? window.location.href : '',
  };

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    // Check if Web Share API is available and can share this data
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        if (navigator.canShare && !navigator.canShare(shareData)) {
          // If cannot share full payload, share just title and url
          await navigator.share({
            title: shareData.title,
            url: currentUrl,
          });
        } else {
          await navigator.share(shareData);
        }
        setShareFeedback('Shared successfully!');
        setTimeout(() => setShareFeedback(null), 3000);
        return;
      } catch (err: any) {
        // If the user cancelled the share dialog (AbortError), do nothing
        if (err?.name === 'AbortError') {
          return;
        }
        // If error occurred (or disallowed by iframe permissions), fallback to dropdown/copy
        console.warn('Web Share API error or permission blocked, falling back to copy link:', err);
      }
    }

    // Fallback: Copy link directly and toggle dropdown if enabled
    copyLinkToClipboard();
    if (showFallbackDropdown) {
      setShowDropdown((prev) => !prev);
    }
  };

  const copyLinkToClipboard = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
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
    }
  };

  const encodedUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
  const encodedTitle = encodeURIComponent(`Check out ${project.title}: ${project.shortDescription}`);

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      color: 'hover:text-[#0A66C2]',
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      color: 'hover:text-slate-900 dark:hover:text-white',
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageSquare,
      color: 'hover:text-[#25D366]',
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(project.title)}&body=${encodedTitle}%0A%0A${encodedUrl}`,
      icon: Mail,
      color: 'hover:text-cyan-500',
    },
  ];

  return (
    <div className="relative inline-block">
      <Button
        id="share-project-btn"
        variant={variant}
        size={size}
        onClick={handleShare}
        leftIcon={
          copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Share2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          )
        }
        className={`relative ${className}`}
        aria-label={`Share ${project.title}`}
      >
        <span>{copied ? 'Link Copied!' : 'Share Project'}</span>
      </Button>

      {/* Floating feedback toast */}
      <AnimatePresence>
        {shareFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold shadow-xl border border-slate-700/60 flex items-center gap-1.5 pointer-events-none"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{shareFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback Social Share Dropdown */}
      <AnimatePresence>
        {showDropdown && !supportsNativeShare && (
          <>
            {/* Backdrop click to close */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 z-50 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Share Case Study
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Web Share</span>
              </div>

              {/* Copy URL Row */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  className="bg-transparent text-xs text-slate-600 dark:text-slate-300 font-mono px-2 flex-1 outline-none truncate"
                />
                <button
                  type="button"
                  onClick={copyLinkToClipboard}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-cyan-500 shadow-xs transition-colors"
                  title="Copy link"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 ${item.color} transition-all`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-medium">{item.name.split(' ')[0]}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
