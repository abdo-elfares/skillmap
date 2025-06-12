import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { useAppState } from "../hooks/useAppState";
import { LoadingSpinner } from "./LoadingSpinner";

interface PartnerCardProps {
  imageSrc: string;
  alt: string;
  name: string;
  delay: number;
}

const PartnerCard = ({ imageSrc, alt, name, delay }: PartnerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="partner-card h-48 border border-primary-100 bg-background/80 backdrop-blur-sm overflow-hidden">
        <CardBody className="p-0 relative h-full">
          {/* Image that covers the entire card */}
          <div className="relative h-full w-full overflow-hidden">
            <img 
              src={imageSrc} 
              alt={alt}
              className="h-full w-full object-contain transition-all duration-300 group-hover:opacity-75 group-hover:scale-105"
            />
            {/* Overlay that appears on hover */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export const PartnersSection = () => {
  const { t, isReady, isRTL } = useAppState();

  if (!isReady) {
    return <LoadingSpinner />;
  }

  const partners = [
    {
      imageSrc: "/sfy.png",
      alt: "Scholars For Youth",
      name: "SFY"
    },
    {
      imageSrc: "/gdg.png", 
      alt: "Google Developer Groups (GDG)",
      name: "GDG"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-content1/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <PartnerCard
              key={partner.name}
              imageSrc={partner.imageSrc}
              alt={partner.alt}
              name={partner.name}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
