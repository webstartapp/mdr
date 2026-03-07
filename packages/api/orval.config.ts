import { defineConfig } from 'orval';

const config = defineConfig({
  mdr: {
    input: './openapi.yaml',
    output: {
      target: './src/generated/mdr.ts',
      client: 'fetch',
      mode: 'split',
      prettier: true,
      clean: false,
      override: {
        useTypeOverInterfaces: true,
        mutator: {
          path: './src/apiClient.ts',
          name: 'apiClient',
        },
      },
    },
  },
  mdrZod: {
    input: './openapi.yaml',
    output: {
      target: './src/generated/mdr.zod.ts',
      client: 'zod',
    },
  },
});

export default config;
