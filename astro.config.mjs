import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://pelicangames.studio',
  integrations: [react(), mdx(), keystatic()],
  output: 'server',
  adapter: vercel(),
  build: {
    assets: 'assets'
  }
});
