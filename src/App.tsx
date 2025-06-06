import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { HeroSection } from "./components/hero-section";
import { FeatureSection } from "./components/feature-section";
import { WaitlistSection } from "./components/waitlist-section";
import { Footer } from "./components/footer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import "./i18n";

const MainContent = () => {
  const { t, ready } = useTranslation();
  const { isRTL } = useLanguage();

  if (!ready) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div>Loading translations...</div>
    </div>;
  }

  return (
    <div className={`min-h-screen bg-background animated-bg ${isRTL ? 'rtl' : 'ltr'}`}>
      <Navbar maxWidth="xl" className="bg-background/80 backdrop-blur-md border-b border-content3/30">
        <NavbarBrand>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="logo-container flex items-center gap-2"
          >
            <div className="logo-icon bg-primary/10 rounded-lg p-2 flex items-center justify-center">
              <Icon icon="lucide:map" className="text-primary text-2xl" />
            </div>
            <p className="logo-text font-bold text-xl">
              <span className="gradient-text">Skill</span>Map
            </p>
          </motion.div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button 
              as={Link} 
              color="primary" 
              href="#contact" 
              variant="flat"
              className="font-medium"
              startContent={!isRTL ? <Icon icon="lucide:mail" /> : null}
              endContent={isRTL ? <Icon icon="lucide:mail" /> : null}
            >
              {t('navbar.contactUs')}
            </Button>
          </motion.div>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <FeatureSection />
      </main>

      <WaitlistSection />
      <Footer />
    </div>
  );
};

// Component to handle automatic language detection and redirection
const LanguageRedirect = () => {
  const detectUserLanguage = (): string => {
    const userLangs = navigator.languages || [navigator.language || (navigator as any).userLanguage];
    
    // Check if any user's languages match our supported languages
    for (const lang of userLangs) {
      const langCode = lang.substring(0, 2).toLowerCase();
      if (langCode === 'ar' || langCode === 'en') {
        return langCode;
      }
    }
    
    // Check for MENA region languages (fallback to Arabic for regional preference)
    for (const lang of userLangs) {
      const fullLang = lang.toLowerCase();
      if (fullLang.includes('ar') || fullLang.includes('fa') || fullLang.includes('ur')) {
        return 'ar';
      }
    }
    
    return 'en'; // Default to English
  };

  const detectedLang = detectUserLanguage();
  return <Navigate to={`/${detectedLang}`} replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to browser-detected language */}
        <Route path="/" element={<LanguageRedirect />} />
        
        {/* Language-specific routes */}
        <Route 
          path="/:lang/*" 
          element={
            <LanguageProvider>
              <MainContent />
            </LanguageProvider>
          } 
        />
      </Routes>
    </Router>
  );
}