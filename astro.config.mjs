// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://leonbede7.github.io',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  build: { inlineStylesheets: 'auto' },
});
