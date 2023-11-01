module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],

  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!src/mocks/**', '!src/main.jsx', '!src/App.jsx'],

  collectCoverage: true,

  setupFilesAfterEnv: ['./setupTests.js'],

  testEnvironment: 'jsdom',

  modulePaths: ['<rootDir>/src'],

  moduleNameMapper: { '^.+\\.(css|less|scss)$': 'identity-obj-proxy' }
};
