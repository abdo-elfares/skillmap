import React from "react";
import { motion } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { HeroSection } from "./components/hero-section";
import { FeatureSection } from "./components/feature-section";
import { PartnersSection } from "./components/partners-section";
import { WaitlistSection } from "./components/waitlist-section";
import { Footer } from "./components/footer";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useAppState } from "./hooks/useAppState";
import { detectUserLanguage } from "./utils/languageDetection";
import "./i18n";

const MainContent = () => {
  const { t, isRTL, isReady, isLoading } = useAppState();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner message="Setting up language..." />
      </div>
    );
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
            <img src="/svg-removebg-preview.svg" alt="SkillMap Logo" className="h-12" />
          </motion.div>
        </NavbarBrand>
        <NavbarContent justify="end" className="gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <LanguageSwitcher variant="flat" className="responsive-lang-btn" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button 
              as={Link} 
              color="primary"
              href="#contact" 
              variant="flat"
              className="font-medium responsive-contact-btn"
              aria-label={t('navbar.contactUs')}
              startContent={!isRTL ? <Icon icon="lucide:mail" className="responsive-icon" /> : null}
              endContent={isRTL ? <Icon icon="lucide:mail" className="responsive-icon" /> : null}
            >
              <span className="responsive-text">{t('navbar.contactUs')}</span>
            </Button>
          </motion.div>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <FeatureSection />
        <PartnersSection />
      </main>

      <WaitlistSection />
      <Footer />
    </div>
  );
};

// Optimized component for automatic language detection and redirection
const LanguageRedirect = () => <Navigate to={`/${detectUserLanguage()}`} replace />;

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