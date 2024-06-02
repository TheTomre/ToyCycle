/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  env: {
    jest: true,
    node: true
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      files: "*.d.ts",
      rules: {
        "spaced-comment": "off"
      }
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-use-before-defined": "off",
        "i18n-text/no-en": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "no-magic-numbers": "off",
        "node/no-unpublished-import": "off"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: ["./tsconfig.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname
  },
  plugins: [
    "es",
    "no-type-assertion",
    "only-warn",
    "sort-annotation",
    "sort-imports-requires",
    "spellcheck",
    "unused-imports",
    "jest"
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-var-requires": "off",
    "comma-dangle": ["error", "only-multiline"],
    "no-param-reassign": "off",
    "react/button-has-type": "off",
    "react/display-name": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error"
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
