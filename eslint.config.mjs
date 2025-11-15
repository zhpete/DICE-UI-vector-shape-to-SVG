import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:all"),

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },

    rules: {
        "array-element-newline": ["error", "consistent"],
        "capitalized-comments": "off",
        "comma-dangle": ["error", "always-multiline"],
        complexity: "warn",
        curly: ["error", "multi-or-nest"],
        "dot-location": ["error", "property"],
        "function-call-argument-newline": ["error", "consistent"],
        "id-length": "warn",
        indent: ["error", 2],
        "line-comment-position": "off",
        "max-len": ["warn", 100],
        "max-lines-per-function": "warn",
        "max-params": "warn",
        "max-statements": "off",
        "multiline-comment-style": ["error", "bare-block"],
        "multiline-ternary": "off",
        "no-console": "warn",
        "no-inline-comments": "off",
        "no-magic-numbers": "off",
        "no-param-reassign": "off",
        "no-ternary": "off",

        "object-curly-newline": ["error", {
            multiline: true,
        }],

        "object-curly-spacing": ["error", "always"],

        "object-property-newline": ["error", {
            allowAllPropertiesOnSameLine: true,
        }],

        "one-var": ["error", "never"],
        "operator-linebreak": ["error", "before"],
        "padded-blocks": ["error", "never"],
        "prefer-destructuring": "warn",
        "quote-props": ["error", "as-needed"],
        quotes: ["error", "single"],
        "sort-keys": "warn",
        strict: ["error", "global"],
    },
}]);