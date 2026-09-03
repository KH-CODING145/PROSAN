import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type SearchCategoryFilter = 'all' | 'projects' | 'articles' | 'skills';

interface SearchContextType {
  isOpen: boolean;
  openSearch: (options?: { query?: string; category?: SearchCategoryFilter }) => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  initialQuery: string;
  initialCategory: SearchCategoryFilter;
  isMac: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const [initialCategory, setInitialCategory] = useState<SearchCategoryFilter>('all');
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect Mac platform for ⌘K vs Ctrl+K display
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const platform = navigator.platform || (navigator as any).userAgentData?.platform || '';
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(platform));
    }
  }, []);

  const openSearch = useCallback((options?: { query?: string; category?: SearchCategoryFilter }) => {
    if (options?.query !== undefined) {
      setInitialQuery(options.query);
    }
    if (options?.category !== undefined) {
      setInitialCategory(options.category);
    }
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Global keyboard shortcut listener for Ctrl+K / Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
        return;
      }

      // Check for Escape to close
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen]);

  // Lock body scroll when search modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        openSearch,
        closeSearch,
        toggleSearch,
        initialQuery,
        initialCategory,
        isMac
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
