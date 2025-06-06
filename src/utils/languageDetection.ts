/**
 * Enhanced language detection with caching and performance optimizations
 */

export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', dir: 'ltr', active: true },
  ar: { name: 'العربية', dir: 'rtl', active: true }
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// MENA region language codes that should default to Arabic
const MENA_LANGUAGE_CODES = new Set([
  'ar', 'fa', 'ur', 'he', 'ku', 'ps', 'tr', 'az', 'kk', 'ky', 'tk', 'uz'
]);

// Countries that are part of MENA region (using country codes)
const MENA_COUNTRIES = new Set([
  'EG', 'SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'YE', 'JO', 'LB', 'SY', 'IQ', 
  'IR', 'AF', 'PK', 'IL', 'PS', 'TR', 'AZ', 'KZ', 'KG', 'TJ', 'TM', 'UZ'
]);

// Cache for language detection to avoid repeated calculations
let cachedLanguage: SupportedLanguage | null = null;

/**
 * Optimized browser language detection with caching
 * Priority: Cache > Exact match > MENA region languages > MENA region countries > Default English
 */
export const detectUserLanguage = (): SupportedLanguage => {
  // Return cached result if available
  if (cachedLanguage) {
    return cachedLanguage;
  }

  // Get user's language preferences from browser
  const userLanguages = navigator.languages || [
    navigator.language || 
    (navigator as any).userLanguage || 
    'en'
  ];

  let detectedLanguage: SupportedLanguage = 'en';

  // First pass: Check for exact language matches
  for (const lang of userLanguages) {
    const langCode = lang.substring(0, 2).toLowerCase();
    if (langCode in SUPPORTED_LANGUAGES) {
      detectedLanguage = langCode as SupportedLanguage;
      break;
    }
  }

  // Second pass: Check for MENA region languages if no exact match
  if (detectedLanguage === 'en') {
    for (const lang of userLanguages) {
      const langCode = lang.substring(0, 2).toLowerCase();
      if (MENA_LANGUAGE_CODES.has(langCode)) {
        detectedLanguage = 'ar';
        break;
      }
    }
  }

  // Third pass: Check for MENA region by country code if still no match
  if (detectedLanguage === 'en') {
    for (const lang of userLanguages) {
      const parts = lang.split('-');
      if (parts.length > 1) {
        const countryCode = parts[1].toUpperCase();
        if (MENA_COUNTRIES.has(countryCode)) {
          detectedLanguage = 'ar';
          break;
        }
      }
    }
  }

  // Cache the result
  cachedLanguage = detectedLanguage;
  
  return detectedLanguage;
};

/**
 * Set HTML document direction and language attributes with performance optimization
 */
export const setDocumentLanguage = (lang: SupportedLanguage): void => {
  const { dir } = SUPPORTED_LANGUAGES[lang];
  
  // Only update if changed to avoid unnecessary DOM operations
  if (document.documentElement.dir !== dir) {
    document.documentElement.dir = dir;
  }
  
  if (document.documentElement.lang !== lang) {
    document.documentElement.lang = lang;
  }
};

/**
 * Get the opposite language (for language switcher)
 */
export const getOppositeLanguage = (currentLang: SupportedLanguage): SupportedLanguage => {
  return currentLang === 'ar' ? 'en' : 'ar';
};

/**
 * Clear language detection cache (useful for testing)
 */
export const clearLanguageCache = (): void => {
  cachedLanguage = null;
};

/**
 * Validate if a string is a supported language
 */
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return lang in SUPPORTED_LANGUAGES;
};
