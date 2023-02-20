module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    // jest: true,
  },
  extends: ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {},
};
