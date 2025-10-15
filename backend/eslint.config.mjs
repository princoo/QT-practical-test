import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    ignores: ["node_modules", "dist", "build"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".cjs"],
        },
      },
    },
    plugins: { js, import: importPlugin },

    extends: [js.configs.recommended, prettier],

    rules: {
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          mjs: "never",
        },
      ],
      "no-unused-vars": "error",
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "arrow-body-style": ["error", "as-needed"],

      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "space-before-function-paren": ["error", "never"],

      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);
