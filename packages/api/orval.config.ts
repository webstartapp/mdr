import { defineConfig } from 'orval';

const config = defineConfig({
  mdr: {
    input: './packages/api/openapi.yaml',
    output: {
      target: './packages/api/src/generated/mdr.ts',
      schemas: './packages/api/src/generated/model',
      client: 'fetch',
      mode: 'split',
      override: {
        mutator: {
          path: './packages/api/src/apiClient.ts',
          name: 'apiClient',
        },
      },
    },
  },
  mdrZod: {
    input: './packages/api/openapi.yaml',
    output: {
      target: './packages/api/src/generated/mdr.zod.ts',
      client: 'zod',
    },
  },
});

export default config;
