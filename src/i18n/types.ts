export type Locale = 'en' | 'km';

export interface LanguageOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  shortLabel: string;
}

export type TranslationDictionary = Record<string, string>;
