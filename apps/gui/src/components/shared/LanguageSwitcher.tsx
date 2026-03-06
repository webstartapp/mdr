'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

import Button from '@/components/shared/Button';
import Icon from '@/components/shared/Icon';
import { setCookie } from '@/lib/cookies';

const LanguageSwitcher = (): React.JSX.Element => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Languages');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: t('en') },
    { code: 'cs', label: t('cs') },
  ];

  const handleLanguageChange = (newLocale: string): void => {
    if (newLocale === locale) return;
    
    // Set cookie and refresh
    setCookie('NEXT_LOCALE', newLocale);
    setIsOpen(false);
    router.refresh();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outlineSm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Icon name="globe" variant="primarySm" />
        <span className="min-w-lang-label text-left">{locale === 'en' ? 'English' : 'Čeština'}</span>
        <span className={`flex transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <Icon name="chevron-down" variant="grayXs" />
        </span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden"
            role="listbox"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                    locale === lang.code 
                      ? 'bg-primary/5 text-primary font-semibold' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                  role="option"
                  aria-selected={locale === lang.code}
                >
                  <span>{lang.label}</span>
                  {locale === lang.code && <Icon name="check" variant="primaryXs" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
