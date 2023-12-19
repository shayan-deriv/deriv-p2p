module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@deriv/eslint-config-deriv'],
  rules:{
    "import/no-absolute-path" : "off",
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
  },
  parser: '@typescript-eslint/parser',
};
