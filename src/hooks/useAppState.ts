import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Custom hook for consistent component loading states and translations
 */
export const useAppState = () => {
  const { t, ready } = useTranslation();
  const { isRTL, isLoading } = useLanguage();
  
  const isAppReady = ready && !isLoading;
  
  return {
    t,
    isRTL,
    isReady: isAppReady,
    isLoading: !isAppReady
  };
};
