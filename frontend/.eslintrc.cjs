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
    "@typescript-eslint/no-unsafe-argument": "off",
    "spellcheck/spell-checker": "off",
    "unicorn/no-null": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "no-underscore-dangle": "off"
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
