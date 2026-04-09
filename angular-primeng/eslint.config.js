// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsAll,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // --- Angular selector rules ---
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],

      // --- Clean Code: no any ---
      '@typescript-eslint/no-explicit-any': 'error',

      // --- Clean Code: consistent returns & exhaustive switches ---
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],

      // --- Clean Code: naming conventions ---
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'interface', format: ['PascalCase'], leadingUnderscore: 'forbid' },
        { selector: 'class', format: ['PascalCase'], leadingUnderscore: 'forbid' },
        { selector: 'typeAlias', format: ['PascalCase'], leadingUnderscore: 'forbid' },
        { selector: 'enum', format: ['UPPER_CASE'], leadingUnderscore: 'forbid' },
        { selector: 'enumMember', format: ['UPPER_CASE'], leadingUnderscore: 'forbid' },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'forbid'
        },
        { selector: 'variable', format: ['camelCase'], leadingUnderscore: 'forbid' },
        { selector: 'function', format: ['camelCase'], leadingUnderscore: 'forbid' },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'forbid' },
        { selector: 'method', format: ['camelCase'] },
        {
          selector: 'property',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
      ],

      // --- Clean Code: small functions, low complexity ---
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      complexity: ['warn', 10],
      'max-depth': ['warn', 3],
      'max-params': ['warn', 4],

      // --- Clean Code: no dead code ---
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // --- Clean Code: prefer immutability ---
      'prefer-const': 'error',
      'no-var': 'error',

      // --- Angular-specific relaxations for strict tsAll ---
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      // Allow i18n to be opt-in, not mandatory on every element
      '@angular-eslint/use-component-view-encapsulation': 'warn',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      // Relax rules for test files
      'max-lines-per-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateAll, angular.configs.templateAccessibility],
    rules: {
      // i18n is opt-in for now
      '@angular-eslint/template/i18n': 'off',
      // Signals are designed to be called in templates
      '@angular-eslint/template/no-call-expression': 'off',
    },
  },
]);
