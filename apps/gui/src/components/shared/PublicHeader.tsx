'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Icon from '@/components/shared/Icon';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Login from '@/components/shared/Login';

const PublicHeader = (): React.JSX.Element => {
  const t = useTranslations('Header');

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Icon name="shield" variant="primary" />
          <span className="text-xl font-heading font-bold text-primary tracking-tight">
            MDR <span className="text-secondary">Adviser</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/about" className="hover:text-secondary transition-colors uppercase tracking-wider">{t('solutions')}</Link>
          <Link href="/regulation" className="hover:text-secondary transition-colors uppercase tracking-wider">{t('services')}</Link>
          <Link href="/pricing" className="hover:text-secondary transition-colors uppercase tracking-wider">{t('compliance')}</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Login />
          <button className="md:hidden">
            <Icon name="menu" variant="primary" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
