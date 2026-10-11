import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;
export const GET: APIRoute = async ({ site }) => {
  const products = await getCollection('products');
  const articles = await getCollection('articles');
  const news = await getCollection('news');
  const paths = ['/', '/articles', ...products.map(p => `/products/${p.id}`), ...articles.map(a => `/articles/${a.id}`), ...news.map(n => `/news/${n.id}/`)];
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const entries = paths.map(path => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
