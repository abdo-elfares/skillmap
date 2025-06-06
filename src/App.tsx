import React from "react";
import { motion } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { HeroSection } from "./components/hero-section";
import { FeatureSection } from "./components/feature-section";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background animated-bg">
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
              className="font-medium arabic-text"
              startContent={<Icon icon="lucide:mail" />}
            >
              تواصل معنا
            </Button>
          </motion.div>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <FeatureSection />
      </main>

      <Footer />
    </div>
  );
}