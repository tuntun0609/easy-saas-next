import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'import-x/no-unresolved': 'off',
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-nodejs-modules': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/order': [
        'warn',
        {
          // 对导入模块进行分组，分组排序规则如下
          groups: [
            'builtin', // 内置模块
            'external', // 外部模块
            'internal', //内部引用
            'parent', //父节点依赖
            'sibling', //兄弟依赖
            'index', // index文件
            'type', //类型文件
            'unknown',
          ],
          //通过路径自定义分组
          pathGroups: [
            {
              pattern: '**.{scss,css,less}',
              patternOptions: { matchBase: true },
              group: 'unknown',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'react**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react**/**',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          distinctGroup: false,
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
        },
      ],
    },
  },
  {
    rules: {
      'prettier/prettier': 'warn',
      'prefer-template': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]

export default eslintConfig
