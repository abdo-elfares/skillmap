import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="feature-card h-full border border-primary-100 bg-background/80 backdrop-blur-sm">
        <CardBody className="gap-4 p-6">
          <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center">
            <Icon icon={icon} className="text-primary text-xl" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-foreground-600">{description}</p>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export const FeatureSection = () => {
  const { t, ready } = useTranslation();
  const { isRTL } = useLanguage();

  if (!ready) {
    return <div>Loading...</div>;
  }

  const features = [
    {
      icon: "lucide:compass",
      title: t('features.cards.0.title'),
      description: t('features.cards.0.description')
    },
    {
      icon: "lucide:brain",
      title: t('features.cards.1.title'),
      description: t('features.cards.1.description')
    },
    {
      icon: "lucide:users",
      title: t('features.cards.2.title'),
      description: t('features.cards.2.description')
    },
    {
      icon: "lucide:book-open",
      title: t('features.cards.3.title'),
      description: t('features.cards.3.description')
    },
    {
      icon: "lucide:message-square",
      title: t('features.cards.4.title'),
      description: t('features.cards.4.description')
    },
    {
      icon: "lucide:briefcase",
      title: t('features.cards.5.title'),
      description: t('features.cards.5.description')
    }
  ];

  return (
    <section className="py-16" id="features">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')} <span className="gradient-text">SkillMap</span></h2>
        <p className="text-foreground-600 max-w-2xl mx-auto">
          {t('features.subtitle')}
        </p>
      </motion.div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};