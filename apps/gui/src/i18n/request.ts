import csMessages from '@messages/cs.json';
import enMessages from '@messages/en.json';
import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { z } from 'zod';

const localeSchema = z.enum(['en', 'cs']);

const RequestConfig = getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();
  
  const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value;

  let detectedLocale: string = localeFromCookie || 'en';
  if (!localeFromCookie) {
    const acceptLanguage = headerStore.get('accept-language') || '';
    if (acceptLanguage.toLowerCase().includes('cs')) {
      detectedLocale = 'cs';
    }
  }

  const validLocale = localeSchema.parse(detectedLocale);

  // Use static messages based on the locale
  const messages = validLocale === 'cs' ? csMessages : enMessages;

  return {
    locale: validLocale,
    messages,
  };
});

const finalizedConfig = RequestConfig;

export default finalizedConfig;
