import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageTest: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'red', 
      color: 'white', 
      padding: '10px', 
      zIndex: 9999 
    }}>
      <div>Current Lang: {i18n.language}</div>
      <div>Contact Us: {t('footer.contactUs')}</div>
      <div>Follow Us: {t('footer.followUs')}</div>
    </div>
  );
};
