module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-await-in-loop": "error",
    "no-constant-binary-expression": "error",
    "no-duplicate-imports": "error",
    "no-self-compare": "error",
    "no-use-before-define": "error",
    curly: "error",
    eqeqeq: ["error", "smart"],
    "max-params": ["error", 3],
    "no-console": "warn",
    "no-lonely-if": "error",
    "no-unneeded-ternary": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "require-await": "error",
    "react/jsx-sort-props": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { enforceForJSX: true },
    ],
    "prettier/prettier": "error",
    "jsx-a11y/label-has-associated-control": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};