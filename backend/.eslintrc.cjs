/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  env: {
    es2020: true,
    jest: true
  },
  extends: ["./.eslintrc.base.cjs"],
  globals: { Express: true },
  ignorePatterns: ["!.*", "coverage/**", "dist/**", "node_modules/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "spellcheck/spell-checker": "off"
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
