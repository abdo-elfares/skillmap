import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

// Initialize i18next with optimized configuration
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation }
    },
    fallbackLng: 'en',
    lng: undefined, // Language is handled by context
    interpolation: {
      escapeValue: false // React already provides XSS protection
    },
    // Performance optimizations
    react: {
      useSuspense: false // Prevent loading issues
    }
  });

export default i18n;
