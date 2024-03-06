module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'eslint-config-airbnb-base'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  plugins: ['jest'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
        ],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.spec.js'] }],
  },
};
