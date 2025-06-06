import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";

export const WaitlistSection = () => {
  const { t, ready } = useTranslation();
  const { isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!ready) {
    return <div>Loading...</div>;
  }

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
    
    // Reset form after success
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gray-50" id="waitlist">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <Icon icon="lucide:mail-plus" className="text-primary text-2xl" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t('waitlist.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-lg mx-auto">
              {t('waitlist.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Simple email input */}
                <input
                  type="email"
                  placeholder={t('waitlist.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-base rounded-xl border border-gray-200 
                           focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                           placeholder:text-gray-400
                           transition-colors duration-200"
                  dir="ltr"
                  required
                />
                
                {/* Simple submit button */}
                <button
                  type="submit"
                  disabled={!validateEmail(email) || isLoading}
                  className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 
                           ${validateEmail(email) && !isLoading
                             ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                             : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                           }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{t('waitlist.sending')}</span>
                    </div>
                  ) : (
                    <span>{t('waitlist.buttonText')}</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon icon="lucide:check" className="text-green-600 text-xl" />
                </div>
                <p className="text-gray-600">{t('waitlist.successMessage')}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:shield-check" className="text-primary text-base" />
              <span>{t('waitlist.secure')}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            <div className="flex items-center gap-2">
              <Icon icon="lucide:mail-check" className="text-primary text-base" />
              <span>{t('waitlist.noSpam')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
