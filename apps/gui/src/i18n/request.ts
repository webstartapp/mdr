import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

// Define a type for the configuration object returned by getRequestConfig
type NextIntlRequestConfig = Awaited<ReturnType<typeof getRequestConfig>>;

const RequestConfig = getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();
  
  // 1. Check for NEXT_LOCALE cookie (user preference)
  let locale = cookieStore.get('NEXT_LOCALE')?.value;

  // 2. If no cookie, check for Czech detection on first visit
  if (!locale) {
    const acceptLanguage = headerStore.get('accept-language') || '';
    // Detect Czech if 'cs' is present
    if (acceptLanguage.toLowerCase().includes('cs')) {
      locale = 'cs';
    } else {
      locale = 'en';
    }
  }

  // Final fallback
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const validLocale: 'en' | 'cs' = ['en', 'cs'].includes(locale ?? '') ? (locale as 'en' | 'cs') : 'en';

  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
  const messagesImport = (await import(`../../messages/${validLocale}.json`)) as { default: any };
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const messages = messagesImport.default as import('next-intl').AbstractIntlMessages;

  return {
    locale: validLocale,
    messages,
  };
});

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default RequestConfig as NextIntlRequestConfig;
