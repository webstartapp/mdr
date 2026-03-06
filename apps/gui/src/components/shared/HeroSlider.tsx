'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import React from 'react';

import Button, { type ButtonVariant } from '@/components/shared/Button';
import styles from '@/components/shared/HeroSlider.module.css';
import Icon, { type IconName, type IconVariant } from '@/components/shared/Icon';

export interface HeroSlide {
  badge?: {
    text: string;
    icon: IconName;
  };
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description: string;
  buttons: Array<{
    label: string;
    href: string;
    variant: ButtonVariant;
    icon?: IconName;
    iconVariant?: IconVariant;
  }>;
  image: string;
  imageAlt: string;
  complianceBadge?: {
    label: string;
    status: string;
    icon: IconName;
    iconVariant: IconVariant;
  };
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

const HeroSlider = ({ slides, autoPlayInterval = 8000 }: HeroSliderProps): React.JSX.Element | null => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  if (!slides.length) return null;

  const currentSlide = slides[current];

  return (
    <section className={styles.heroSlider}>
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={styles.slideContent}
          >
            {/* Info Column */}
            <div className={styles.infoColumn}>
              {currentSlide.badge && (
                <div className={styles.badge}>
                  <Icon name={currentSlide.badge.icon} variant="secondarySm" />
                  <span className={styles.badgeText}>{currentSlide.badge.text}</span>
                </div>
              )}
              
              <h1 className={styles.title}>
                {currentSlide.title}
                {currentSlide.subtitle && (
                  <> <span className={styles.subtitle}>{currentSlide.subtitle}</span></>
                )}
              </h1>

              <p className={styles.description}>
                {currentSlide.description}
              </p>

              <div className={styles.buttonGroup}>
                {currentSlide.buttons.map((btn, idx) => (
                  <Button key={idx} href={btn.href} variant={btn.variant}>
                    <span>{btn.label}</span>
                    {btn.icon && <Icon name={btn.icon} variant={btn.iconVariant || 'white'} />}
                  </Button>
                ))}
              </div>
            </div>

            {/* Image Column */}
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={currentSlide.image} 
                  alt={currentSlide.imageAlt} 
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {currentSlide.complianceBadge && (
                <div className={styles.complianceBadge}>
                  <Icon 
                    name={currentSlide.complianceBadge.icon} 
                    variant={currentSlide.complianceBadge.iconVariant} 
                  />
                  <div>
                    <div className={styles.complianceLabel}>{currentSlide.complianceBadge.label}</div>
                    <div className={styles.complianceStatus}>{currentSlide.complianceBadge.status}</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Indicators (only if multiple slides) */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === idx ? 'bg-secondary w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSlider;
