import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Locale, LanguageOption } from '../i18n/types';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'portfolio_locale';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', shortLabel: 'EN' },
  { code: 'km', label: 'Khmer', nativeLabel: 'ភាសាខ្មែរ', shortLabel: 'ខ្មែរ' },
];

interface I18nContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, defaultText?: string) => string;
  isKhmer: boolean;
  supportedLanguages: LanguageOption[];
  currentLanguage: LanguageOption;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale;
      if (saved === 'en' || saved === 'km') {
        return saved;
      }
    } catch (e) {
      console.warn('localStorage inaccessible for locale preference', e);
    }
    return 'en';
  });

  // Sync to HTML lang attribute and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {
      console.warn('Could not save locale to localStorage', e);
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'km' : 'en'));
  }, []);

  const t = useCallback(
    (key: string, defaultText?: string): string => {
      const currentDict = translations[locale];
      if (currentDict && currentDict[key] !== undefined) {
        return currentDict[key];
      }
      // Fallback to English if missing in target
      const enDict = translations.en;
      if (enDict && enDict[key] !== undefined) {
        return enDict[key];
      }
      return defaultText !== undefined ? defaultText : key;
    },
    [locale]
  );

  const currentLanguage = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((lang) => lang.code === locale) || SUPPORTED_LANGUAGES[0];
  }, [locale]);

  const value = useMemo<I18nContextType>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      isKhmer: locale === 'km',
      supportedLanguages: SUPPORTED_LANGUAGES,
      currentLanguage,
    }),
    [locale, setLocale, toggleLocale, t, currentLanguage]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
