module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    // The Follow config only works with eslint-plugin-vue v8.0.0+
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'standard-with-typescript',
    'plugin:prettier/recommended'
  ],
  rules: {
    // 'vue/require-default-prop': 0
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-call': 'off'
  }
}
