// Configuring Jest
// See: https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
  // preset: 'ts-jest',

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
  // setupFilesAfterEnv: [
  //   // Add matchers via `expect.extend()`
  //   '<rootDir>/tests/setup.ts',
  // ],

  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],

  verbose: true,
};
