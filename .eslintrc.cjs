module.exports = {
  env: {
    browser: true,

    es2021: true,

    'jest/globals': true
  },

  extends: ['plugin:react/recommended', 'airbnb', 'plugin:react/jsx-runtime'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },

    ecmaVersion: 'latest',

    requireConfigFile: false,

    sourceType: 'module'
  },

  plugins: ['react', 'jest', 'testing-library', 'react-prefer-function-component', 'react-hooks'],

  rules: {
    'comma-dangle': ['error', 'never'],

    'no-underscore-dangle': 'off',

    'class-methods-use-this': 'off',

    'react/function-component-definition': [
      2,

      {
        namedComponents: 'arrow-function'
      }
    ]
  },

  overrides: [
    {
      files: ['**/*.test.js'],

      rules: {
        'max-lines-per-function': 'off'
      }
    }
  ],

  globals: {
    describe: true,

    it: true,

    true: true
  }
};
