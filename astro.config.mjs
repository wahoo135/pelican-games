import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://pelicangames.studio',
  integrations: [keystatic()],
  output: 'server',
  adapter: vercel(),
  build: {
    assets: 'assets'
  }
});
