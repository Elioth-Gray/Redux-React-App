module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'cypress'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.test.jsx',
          '**/*.spec.jsx',
          '**/*.cy.js',
          '**/*.cy.jsx',
          'cypress/**',
          'cypress.config.js',
          '**/vite.config.js',
          '**/vitest.setup.js',
        ],
      },
    ],
    'no-alert': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@tailwindcss/vite'],
      },
    ],
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
  },
  overrides: [
    {
      files: ['*.stories.@(js|jsx|ts|tsx)'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/destructuring-assignment': 'off',
        'no-unused-vars': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: [
        'vite.config.js',
        'cypress.config.js',
        '.storybook/**/*.js',
        '.storybook/**/*.ts',
        'vitest.workspace.js',
      ],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
  ],
};
