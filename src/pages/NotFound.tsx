import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { Home, FolderCode, Terminal, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <PageContainer
      title="404 — Page Not Found"
      description="The requested page could not be located."
    >
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
            HTTP 404 Error
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The route or resource you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button
            variant="primary"
            asAnchor
            href="/"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Back to Home
          </Button>
          <Button
            variant="outline"
            asAnchor
            href="/projects"
            leftIcon={<FolderCode className="w-4 h-4" />}
          >
            Explore Projects
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
