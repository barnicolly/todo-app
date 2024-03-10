module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
    jest: true,
  },

  extends: [
    'eslint-config-airbnb-base',
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    '@vue/eslint-config-typescript',
    '@vue/typescript',
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  plugins: ['jest', '@typescript-eslint'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.spec.js'] },
    ],
    'import/prefer-default-export': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
