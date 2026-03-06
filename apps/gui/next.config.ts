import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
};

const finalizedConfig: unknown = withNextIntl(nextConfig);

export default finalizedConfig;
