import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation files
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

// Define supported languages and their RTL status
export const languages: { [key: string]: { name: string; dir: string; active: boolean } } = {
  en: { name: 'English', dir: 'ltr', active: true },
  ar: { name: 'العربية', dir: 'rtl', active: true }
};

// Detect user's browser language
const detectUserLanguage = (): string => {
  const userLangs = navigator.languages || [navigator.language || (navigator as any).userLanguage];
  
  // Check if any of the user's languages match our supported languages
  for (const lang of userLangs) {
    const langCode = lang.substring(0, 2).toLowerCase();
    if (languages[langCode]?.active) {
      return langCode;
    }
  }
  
  // Check for MENA region languages (fallback to Arabic for regional preference)
  for (const lang of userLangs) {
    const fullLang = lang.toLowerCase();
    if (fullLang.includes('ar') || fullLang.includes('fa') || fullLang.includes('ur') || 
        fullLang.includes('he') || fullLang.includes('ku') || fullLang.includes('ps')) {
      return 'ar';
    }
  }
  
  // Default to English if no match
  return 'en';
};

// Initialize i18next
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation }
    },
    fallbackLng: 'en',
    lng: undefined, // Don't set default language, let context handle it
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

// Set the HTML dir attribute based on the language
export const setLanguageDirection = (lang: string): string => {
  const dir = languages[lang]?.dir || 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  return dir;
};

export default i18n;
