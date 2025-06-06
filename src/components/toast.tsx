import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ 
  message, 
  type = "success", 
  isVisible, 
  onClose, 
  duration = 4000 
}: ToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "lucide:check-circle",
          color: "text-success",
          bgColor: "bg-success-50 border-success-200",
          iconBg: "bg-success-100"
        };
      case "error":
        return {
          icon: "lucide:x-circle",
          color: "text-danger",
          bgColor: "bg-danger-50 border-danger-200",
          iconBg: "bg-danger-100"
        };
      case "info":
      default:
        return {
          icon: "lucide:info",
          color: "text-primary",
          bgColor: "bg-primary-50 border-primary-200",
          iconBg: "bg-primary-100"
        };
    }
  };

  const config = getToastConfig();

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              duration: 0.3 
            }}
          >
            <Card className={`${config.bgColor} border backdrop-blur-sm shadow-lg`}>
              <CardBody className="flex-row items-center gap-3 p-4 min-w-[300px]">
                <div className={`rounded-full p-2 ${config.iconBg}`}>
                  <Icon icon={config.icon} className={`${config.color} text-xl`} />
                </div>
                <div className="flex-1">
                  <p className="arabic-text font-medium text-foreground-800">
                    {message}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-foreground-100 transition-colors"
                >
                  <Icon icon="lucide:x" className="text-foreground-500 text-sm" />
                </button>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Toast provider hook for easier usage
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: "success" | "error" | "info";
  }>>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </>
  );

  return { showToast, ToastContainer };
};
