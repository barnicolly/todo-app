// Configuring Jest
// See: https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {

  moduleFileExtensions: [
    'js',
    'vue',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue3-jest',
  },

  testPathIgnorePatterns: [
    '/node_modules/',
  ],

  collectCoverage: true,
  coverageThreshold: {
    global: { statements: 70 },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],

  verbose: true,
};
