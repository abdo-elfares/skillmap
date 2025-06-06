import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { languages, setLanguageDirection } from '../i18n';

interface LanguageContextType {
  language: string;
  direction: string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  isRTL: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState<string>('en');
  
  // Detect user's browser language
  const detectUserLanguage = (): string => {
    const userLangs = navigator.languages || [navigator.language || (navigator as any).userLanguage];
    
    // Check if any user's languages match our supported languages
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
    
    return 'en'; // Default to English
  };
  
  useEffect(() => {
    // Get language from URL path or use browser detection
    const pathParts = location.pathname.split('/');
    let detectedLang = pathParts[1];
    
    // Check if the detected language is supported
    if (!languages[detectedLang]?.active) {
      detectedLang = detectUserLanguage();
      
      // Redirect to the appropriate language path
      const newPath = `/${detectedLang}${location.pathname === '/' ? '' : location.pathname}`;
      navigate(newPath, { replace: true });
      return; // Don't set language yet, wait for redirect
    }
    
    // Set the language and direction immediately
    setLanguageDirection(detectedLang);
    
    // Change i18n language
    i18n.changeLanguage(detectedLang).then(() => {
      setCurrentLang(detectedLang);
    });
    
  }, [location.pathname, navigate, i18n]);

  // Define the context value
  const value = {
    language: currentLang,
    direction: languages[currentLang]?.dir || 'ltr',
    isRTL: languages[currentLang]?.dir === 'rtl',
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
