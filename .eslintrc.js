module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    describe : 'readonly',
    beforeAll : 'readonly',
    it : 'readonly',
    expect : 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "no-params-reasign" : 'off',
    "camelcase" : 'off'
  }
}
