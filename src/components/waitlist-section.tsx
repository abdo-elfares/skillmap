import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface WaitlistSectionProps {
  onEmailSubmit?: (email: string) => void;
}

export const WaitlistSection = ({ onEmailSubmit }: WaitlistSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    onEmailSubmit?.(email);
    
    // Reset form after success
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50/30 to-secondary-50/30" id="waitlist">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 border border-primary-200 mb-6"
            >
              <Icon icon="lucide:mail-plus" className="text-primary text-3xl" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 arabic-text">
              انضم إلى قائمة الانتظار
            </h2>
            <p className="text-foreground-600 text-lg arabic-text max-w-lg mx-auto">
              كن من أول المستخدمين للمنصة واحصل على وصول مبكر ومزايا حصرية
            </p>
          </div>

          <Card className="backdrop-blur-sm bg-background/80 border border-primary-200/50">
            <CardBody className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Input
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="lg"
                      variant="bordered"
                      classNames={{
                        input: "arabic-text",
                        inputWrapper: "border-primary-200 hover:border-primary-400 focus-within:border-primary-500"
                      }}
                      startContent={<Icon icon="lucide:mail" className="text-primary" />}
                      isInvalid={email.length > 0 && !validateEmail(email)}
                      errorMessage={email.length > 0 && !validateEmail(email) ? "يرجى إدخال بريد إلكتروني صحيح" : ""}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="w-full font-medium arabic-text hover-lift"
                      isLoading={isLoading}
                      isDisabled={!validateEmail(email)}
                      startContent={!isLoading && <Icon icon="lucide:user-plus" />}
                    >
                      {isLoading ? "جاري التسجيل..." : "انضم إلى قائمة الانتظار"}
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-4"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 mb-4">
                    <Icon icon="lucide:check-circle" className="text-success text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 arabic-text">تم التسجيل بنجاح!</h3>
                  <p className="text-foreground-600 arabic-text">شكراً لانضمامك، سنتواصل معك قريباً</p>
                </motion.div>
              )}
            </CardBody>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-6 flex items-center justify-center gap-4 text-sm text-foreground-500"
          >
            <div className="flex items-center gap-2">
              <Icon icon="lucide:shield-check" className="text-primary" />
              <span className="arabic-text">آمن ومحمي</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-foreground-400" />
            <div className="flex items-center gap-2">
              <Icon icon="lucide:mail-check" className="text-primary" />
              <span className="arabic-text">لا رسائل مزعجة</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
