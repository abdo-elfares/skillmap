import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getOppositeLanguage } from "../utils/languageDetection";

interface LanguageSwitcherProps {
  variant?: "solid" | "bordered" | "flat" | "ghost";
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = "flat", 
  className = ""
}) => {
  const { language, isLoading } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLanguage = () => {
    if (isLoading) return;
    
    const newLang = getOppositeLanguage(language as 'en' | 'ar');
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length > 0) {
      pathSegments[0] = newLang;
      navigate(`/${pathSegments.join('/')}`);
    } else {
      navigate(`/${newLang}`);
    }
  };

  const isArabic = language === 'ar';
  const flagIcon = isArabic ? "emojione:flag-for-united-kingdom" : "emojione:flag-for-egypt";
  const ariaLabel = isArabic ? "Switch to English" : "التبديل إلى العربية";
  const buttonText = isArabic ? 'EN' : 'عربي';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button
        variant={variant}
        onPress={switchLanguage}
        aria-label={ariaLabel}
        className="min-w-unit-10 font-medium responsive-lang-switcher"
        isDisabled={isLoading}
        startContent={
          <motion.div
            key={flagIcon}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon icon={flagIcon} className="responsive-flag-icon" />
          </motion.div>
        }
      >
        <motion.span 
          className="responsive-lang-text"
          key={buttonText}
          initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {buttonText}
        </motion.span>
      </Button>
    </motion.div>
  );
};
