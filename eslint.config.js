import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      prettier,
    },
    extends: ["js/recommended", prettierConfig],
    rules: {
      "no-console": "warn",
      eqeqeq: "warn",
      curly: "warn",
      "prettier/prettier": "warn",
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
