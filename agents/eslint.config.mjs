import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  { files: ['**/*.js', '**/*.ts'], languageOptions: { sourceType: 'module' } },
  {
    ignores: ['node_modules', 'dist'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  prettier,
], eslintConfigPrettier);
