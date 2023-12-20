module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@deriv/eslint-config-deriv'],
  rules:{
    "import/no-absolute-path" : "off",
    'import/no-extraneous-dependencies': ['off', { devDependencies: true }],
    "simple-import-sort/imports": "off",
  },
  parser: '@typescript-eslint/parser',
};
