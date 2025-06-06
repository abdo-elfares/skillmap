import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { smoothScrollTo, smoothScrollToElement } from "../utils/scroll";

export const HeroSection = () => {
  return (
    <section className="py-20 md:py-28 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 arabic-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          اكتشف مسارك المهني مع <span className="gradient-text">SkillMap</span>
        </motion.h1>
        
        <motion.p 
          className="text-foreground-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto arabic-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          منصة تعليمية متكاملة تساعدك على اكتشاف المجال المناسب لمهاراتك وشخصيتك، وتوفر لك خارطة طريق احترافية للتعلم والتطور
        </motion.p>
    
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Button
            color="primary"
            size="lg"
            className="font-medium text-base arabic-text hover-lift shadow-lg"
            startContent={<Icon icon="lucide:user-plus" />}
            endContent={<Icon icon="lucide:arrow-down" />}
            onPress={() => smoothScrollTo('waitlist')}
          >
            انضم لقائمة الانتظار
          </Button>
          <Button
            variant="bordered"
            color="primary"
            size="lg"
            className="font-medium text-base arabic-text hover-lift border-2"
            startContent={<Icon icon="lucide:compass" />}
            onPress={() => smoothScrollTo('features')}
          >
            استكشف المزيد
          </Button>
        </motion.div>
      </motion.div>
    
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-20 w-full max-w-4xl"
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
            
            <h3 className="text-2xl font-bold arabic-text">قريباً</h3>
            
            <p className="text-foreground-600 max-w-lg arabic-text">
              نعمل حالياً على تطوير منصة SkillMap لمساعدتك في اكتشاف مسارك المهني وتطوير مهاراتك. ترقب إطلاق المنصة قريباً!
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