import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  SUPPORTED_LANGUAGES, 
  setDocumentLanguage, 
  detectUserLanguage,
  isSupportedLanguage,
  type SupportedLanguage 
} from '../utils/languageDetection';

interface LanguageContextType {
  language: SupportedLanguage;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  isRTL: false,
  isLoading: true,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleLanguageSetup = async () => {
      try {
        // Extract language from URL path
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const urlLang = pathSegments[0];
        
        // Validate language from URL, fallback to detection if invalid
        let targetLang: SupportedLanguage;
        
        if (!urlLang || !isSupportedLanguage(urlLang)) {
          targetLang = detectUserLanguage();
          
          // Redirect to detected language path
          const restPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '';
          const newPath = `/${targetLang}${restPath}`;
          navigate(newPath, { replace: true });
          return;
        } else {
          targetLang = urlLang;
        }
        
        // Set document language and direction
        setDocumentLanguage(targetLang);
        
        // Update i18n language if needed
        if (i18n.language !== targetLang) {
          await i18n.changeLanguage(targetLang);
        }
        
        setCurrentLang(targetLang);
      } catch (error) {
        console.warn('Language setup error:', error);
        // Fallback to English on error
        setCurrentLang('en');
      } finally {
        setIsLoading(false);
      }
    };

    handleLanguageSetup();
  }, [location.pathname, navigate, i18n]);

  const value: LanguageContextType = {
    language: currentLang,
    direction: SUPPORTED_LANGUAGES[currentLang]?.dir || 'ltr',
    isRTL: SUPPORTED_LANGUAGES[currentLang]?.dir === 'rtl',
    isLoading,
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
