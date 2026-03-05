import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [

  /**
   * GLOBAL IGNORES
   */
  {
    ignores: [
      '**/node_modules/**',
      'node_modules/**',
      'dist/**',
      '**/dist/**',
      '.nuxt/**',
      '**/.nuxt/**',
      '.output/**',
      '**/.output/**',
      '.expo/**',
      '**/.expo/**',
      'web-build/**',
      '**/web-build/**',
      'coverage/**',
      '**/coverage/**',
      '**/*.json',
      'apps/gui/index.js',
      'packages/api/src/generated/api.ts',
      'apps/gui/metro.config.js',
      'apps/gui/babel.config.js',
      '*.config.js',
      '*.config.mjs'
    ],
  },

  /**
   * BASE JS CONFIG (applies to everything)
   */
  eslint.configs.recommended,
 
  /**
   * SHARED RULES (for all JS/TS source)
   */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**', './**'],
              message: 'Use aliases (e.g. @/ or @api/) instead of relative imports.',
            },
          ],
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-constant-binary-expression': 'error',
    },
  },

  /**
   * TYPESCRIPT STRICT — ONLY FOR TS FILES
   */
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['apps/gui/tsconfig.json', 'apps/backend/tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  /**
   * COMMON RULES (applies to TS only)
   */
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
      'complexity': ['error', 10],
      'max-depth': ['error', 4],
      'max-params': ['error', 4],
      'consistent-return': 'error',
      'no-else-return': 'error',
      'eqeqeq': ['error', 'always'],
      'no-console': 'error',

      'import/no-cycle': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
        },
      ],
      'func-style': ['error', 'expression'],
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: false,
          allowLiteral: false,
          allowObject: false,
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "ExportDefaultDeclaration[declaration.type='FunctionDeclaration'], ExportDefaultDeclaration[declaration.type='ClassDeclaration']",
          message: "Do not export default declarations. Assign to a variable first: `const Name = ...; export default Name;`",
        },
        {
          selector: 'ImportExpression',
          message: 'Dynamic imports (import()) are not allowed. Use static imports instead.',
        },
      ],
    },
  },

  /**
   * JS FILES — NO TYPE-AWARE RULES
   */
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/*': 'off',
    },
  },
]