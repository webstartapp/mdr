import { useTranslations } from 'next-intl';
import React from 'react';

import HeroSlider from '@/components/shared/HeroSlider';
import Icon from '@/components/shared/Icon';

const LandingPage = (): React.JSX.Element => {
  const t = useTranslations('Hero');
  const tf = useTranslations('Features');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSlider 
        slides={[
          {
            badge: { text: t('badge'), icon: 'zap' },
            title: t('title'),
            subtitle: t('subtitle'),
            description: t('description'),
            buttons: [
              { label: t('cta'), href: '/signup', variant: 'primaryLg', icon: 'arrow-right' },
              { label: t('demo'), href: '/demo', variant: 'outlineLg' },
            ],
            image: '/hero.png',
            imageAlt: t('imageAlt'),
            complianceBadge: {
              label: t('compliance'),
              status: t('status'),
              icon: 'circle-check',
              iconVariant: 'compliance',
            },
          },
        ]}
      />

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">{tf('title')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {tf('subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Icon name="file-check" variant="feature" />,
                title: tf('technicalFile.title'),
                desc: tf('technicalFile.desc'),
              },
              {
                icon: <Icon name="database" variant="feature" />,
                title: tf('mdrAdvisor.title'),
                desc: tf('mdrAdvisor.desc'),
              },
              {
                icon: <Icon name="shield" variant="feature" />,
                title: tf('qmsManager.title'),
                desc: tf('qmsManager.desc'),
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-100 hover:border-secondary/20 hover:shadow-xl hover:shadow-secondary/5 transition-all group">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
