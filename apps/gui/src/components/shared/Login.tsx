'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import Button from '@/components/shared/Button';
import Icon from '@/components/shared/Icon';
import { useAuth } from '@/hooks/useAuth';

const Login = (): React.JSX.Element => {
  const t = useTranslations('Header');
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-md" />;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Icon name="shield" variant="primarySm" />
          <span>{user.firstName} {user.lastName}</span>
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded uppercase tracking-wider">
            {user.role}
          </span>
        </div>
        <button 
          type="button"
          onClick={logout}
          className="text-sm font-medium text-gray-400 hover:text-secondary transition-colors uppercase tracking-wider"
        >
          {t('logout') || 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <>
      <Button href="/login" variant="ghostSm">
        {t('login')}
      </Button>
      <Button href="/signup" variant="primarySm">
        {t('getStarted')}
      </Button>
    </>
  );
};

export default Login;
