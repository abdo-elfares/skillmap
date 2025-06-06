import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";
import { smoothScrollTo } from "../utils/scroll";

export const HeroSection = () => {
  const { t, ready } = useTranslation();
  const { isRTL } = useLanguage();
  
  if (!ready) {
    return <div>Loading...</div>;
  }
  
  return (
    <section className="py-20 md:py-28">
      <div className="flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text"
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            color="primary"
            size="lg"
            className="font-medium text-base"
            startContent={!isRTL ? <Icon icon="lucide:arrow-right" /> : null}
            endContent={isRTL ? <Icon icon="lucide:arrow-left" /> : null}
            onPress={() => smoothScrollTo('waitlist')}
          >
            {t('hero.joinWaitlist')}
          </Button>
          <Button
            variant="bordered"
            color="primary"
            size="lg"
            className="font-medium text-base border-2"
            startContent={<Icon icon="lucide:compass" />}
            onPress={() => smoothScrollTo('features')}
          >
            {t('hero.exploreMore')}
          </Button>
        </motion.div>
      </div>
    
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-20 w-full max-w-4xl mx-auto"
      >
        <div className="relative rounded-xl overflow-hidden p-8 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-primary-500/5"
            animate={{ 
              background: ["rgba(79, 70, 229, 0.03)", "rgba(139, 92, 246, 0.06)", "rgba(79, 70, 229, 0.03)"] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">
            <div className="rounded-full bg-primary-100 border border-primary-200 p-4 w-20 h-20 flex items-center justify-center">
              <Icon icon="lucide:rocket" className="text-primary text-3xl" />
            </div>
            
            <h3 className="text-2xl font-bold">{t('hero.comingSoon')}</h3>
            
            <p className="text-foreground-600 max-w-lg">
              {t('hero.developmentText')}
            </p>
            
            <div className="flex gap-3 mt-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut" 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};