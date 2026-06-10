import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://pelicangames.studio',
  integrations: [keystatic()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
