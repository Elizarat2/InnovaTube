// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021
      },
      ecmaVersion: 2021,
      sourceType: "commonjs"
    },
    rules: {
      ...js.configs.recommended.rules,
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"]
    }
  }
];