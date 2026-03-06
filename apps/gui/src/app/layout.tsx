import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import '@/app/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MDR Regulation Adviser | Professional Medical Compliance',
  description: 'Advanced medical device regulation and QMS advisor for manufacturers and compliance officers.',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.JSX.Element> => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
