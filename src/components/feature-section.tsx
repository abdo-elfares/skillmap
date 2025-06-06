import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

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
          <h3 className="text-xl font-semibold arabic-text">{title}</h3>
          <p className="text-foreground-600 arabic-text">{description}</p>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export const FeatureSection = () => {
  const features = [
    {
      icon: "lucide:compass",
      title: "خرائط مسارات تعليمية",
      description: "خرائط طريق مفصلة لكل مجال مهني مع مصادر تعليمية مجانية ومدفوعة"
    },
    {
      icon: "lucide:brain",
      title: "اختبار تحديد المسار",
      description: "اختبار تحليل شخصية يساعدك على اكتشاف المجال المهني الأنسب لمهاراتك وميولك"
    },
    {
      icon: "lucide:users",
      title: "مجتمع تعليمي",
      description: "تواصل مع متعلمين آخرين في نفس المجال ومشاركة الخبرات والنصائح"
    },
    {
      icon: "lucide:book-open",
      title: "دورات متخصصة",
      description: "دورات تدريبية متخصصة يقدمها خبراء في مختلف المجالات المهنية"
    },
    {
      icon: "lucide:message-square",
      title: "استشارات مهنية",
      description: "جلسات استشارية مع خبراء لمساعدتك في اتخاذ القرارات المهنية المناسبة"
    },
    {
      icon: "lucide:briefcase",
      title: "فرص توظيف",
      description: "تواصل مع شركات توظيف وفرص عمل مناسبة لمهاراتك بعد إتمام المسار التعليمي"
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 arabic-text">ما نقدمه في <span className="gradient-text">SkillMap</span></h2>
        <p className="text-foreground-600 max-w-2xl mx-auto arabic-text">
          منصة متكاملة تساعدك على اكتشاف مسارك المهني وتطوير مهاراتك بطريقة منظمة ومدروسة
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