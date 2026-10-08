// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    // Pages are built ahead, as static HTML. The adapter serves only what needs a server: the
    // action behind the form, and the server island.
    adapter: node({ mode: 'standalone' }),
});
