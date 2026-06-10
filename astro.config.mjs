import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';

const isBuild = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://pelicangames.studio',
  integrations: [...(isBuild ? [] : [keystatic()])],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
