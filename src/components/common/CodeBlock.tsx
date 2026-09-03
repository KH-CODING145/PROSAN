import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Terminal, Code2, FileCode } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  subtitle?: string;
  showLineNumbers?: boolean;
  className?: string;
  id?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  title,
  subtitle = 'Verified Architecture Snippet',
  showLineNumbers = true,
  className = '',
  id,
}) => {
  const [copied, setCopied] = useState(false);

  const cleanCode = code.trim();
  const lines = cleanCode.split('\n');

  const handleCopy = async () => {
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(cleanCode);
        success = true;
      }
    } catch {
      // Fallback for iframe / non-secure contexts
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = cleanCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const getLanguageBadgeColor = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.includes('python')) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    if (l.includes('ts') || l.includes('typescript')) return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    if (l.includes('js') || l.includes('javascript')) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    if (l.includes('bash') || l.includes('shell') || l.includes('sh')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (l.includes('rust')) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    if (l.includes('json') || l.includes('yaml')) return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
  };

  return (
    <div
      id={id}
      className={`my-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200 font-mono shadow-xl transition-all hover:border-slate-700/80 ${className}`}
    >
      {/* Code Block Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-slate-400 text-xs select-none backdrop-blur-xs">
        <div className="flex items-center gap-3 min-w-0">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Language tag & title */}
          <div className="flex items-center gap-2 truncate">
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border uppercase tracking-wider flex items-center gap-1 ${getLanguageBadgeColor(
                language
              )}`}
            >
              <Terminal className="w-3 h-3" />
              <span>{language}</span>
            </span>

            {title && (
              <span className="font-mono text-slate-300 text-xs truncate hidden sm:inline-flex items-center gap-1">
                <FileCode className="w-3 h-3 text-slate-500" />
                {title}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {subtitle && !title && (
            <span className="text-[11px] text-slate-500 hidden sm:inline-block font-sans">
              {subtitle}
            </span>
          )}

          {/* Copy to Clipboard Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs shadow-emerald-500/20'
                : 'bg-slate-800 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-slate-700/60 active:scale-95'
            }`}
            title="Copy code to clipboard"
            aria-label="Copy code to clipboard"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 text-emerald-400 font-semibold"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Copied!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="relative group">
        <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-mono scrollbar-thin scrollbar-thumb-slate-800">
          <code className="block">
            {showLineNumbers ? (
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line, idx) => (
                    <tr key={`line-${idx}`} className="hover:bg-slate-900/40 transition-colors">
                      <td className="pr-4 py-0.5 text-right select-none text-slate-600 dark:text-slate-600 text-xs w-8 border-r border-slate-850">
                        {idx + 1}
                      </td>
                      <td className="pl-4 py-0.5 text-slate-200 whitespace-pre">{line || ' '}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              lines.map((line, idx) => (
                <div key={`line-${idx}`} className="whitespace-pre">
                  {line || ' '}
                </div>
              ))
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};
