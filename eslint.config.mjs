// @ts-check
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default defineConfig(
    { ignores: ['.astro/', 'dist/'] },
    js.configs.recommended,
    tseslint.configs.recommended,
    astro.configs.recommended,
);
