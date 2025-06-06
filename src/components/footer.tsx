import React from "react";
import { motion } from "framer-motion";
import { Link, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer = () => {
  return (
    <footer className="bg-content2/50 backdrop-blur-sm py-16 border-t border-content3/30" id="contact">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="mb-8 flex justify-center">
            <div className="logo-container flex items-center gap-2">
              <div className="logo-icon bg-primary/10 rounded-lg p-3 flex items-center justify-center">
                <Icon icon="lucide:map" className="text-primary text-3xl" />
              </div>
              <p className="logo-text font-bold text-2xl">
                <span className="gradient-text">Skill</span>Map
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 arabic-text">كن أول من يعرف عند إطلاق المنصة</h2>
          <p className="text-foreground-600 mb-8 arabic-text">
            سجل بريدك الإلكتروني للحصول على إشعار عند إطلاق منصة SkillMap وتمتع بمزايا حصرية للمستخدمين الأوائل
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              color="primary"
              size="lg"
              className="font-medium arabic-text hover-lift"
              startContent={<Icon icon="lucide:mail" />}
              as={Link}
              href="mailto:contact@joinskillmap.tech"
            >
              تواصل معنا
            </Button>
            <Button
              variant="flat"
              color="primary"
              size="lg"
              className="font-medium arabic-text hover-lift"
              startContent={<Icon icon="lucide:instagram" />}
              as={Link}
              href="https://instagram.com/joinskillmap"
              target="_blank"
            >
              تابعنا على انستجرام
            </Button>
          </motion.div>
          
          <div className="flex justify-center items-center gap-2 text-foreground-500">
            <p className="font-medium arabic-text">
              <span className="gradient-text">Skill</span>Map
            </p>
            <span className="mx-2">•</span>
            <p className="arabic-text">joinskillmap.tech</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};