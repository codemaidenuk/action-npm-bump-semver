module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  plugins: [
    'jest',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'never'],
  },
}
