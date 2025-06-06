import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export const Logo = ({ size = "md", animated = true }: LogoProps) => {
  const sizeClasses = {
    sm: {
      container: "gap-1.5",
      icon: "text-xl p-1.5",
      text: "text-lg"
    },
    md: {
      container: "gap-2",
      icon: "text-2xl p-2",
      text: "text-xl"
    },
    lg: {
      container: "gap-2.5",
      icon: "text-3xl p-3",
      text: "text-2xl"
    }
  };
  
  const classes = sizeClasses[size];
  
  if (animated) {
    return (
      <motion.div 
        className={`logo-container flex items-center ${classes.container}`}
        whileHover={{ scale: 1.03 }}
      >
        <motion.div 
          className={`logo-icon bg-primary/10 rounded-lg flex items-center justify-center ${classes.icon}`}
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Icon icon="lucide:map" className="text-primary" />
        </motion.div>
        <p className={`logo-text font-bold ${classes.text}`}>
          <span className="gradient-text">Skill</span>Map
        </p>
      </motion.div>
    );
  }
  
  return (
    <div className={`flex items-center ${classes.container}`}>
      <div className={`bg-primary/10 rounded-lg flex items-center justify-center ${classes.icon}`}>
        <Icon icon="lucide:map" className="text-primary" />
      </div>
      <p className={`font-bold ${classes.text}`}>
        <span className="gradient-text">Skill</span>Map
      </p>
    </div>
  );
};