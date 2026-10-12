import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
export const prerender=true;
export const GET:APIRoute=async({site})=>{
const products=await getCollection('products'); const news=await getCollection('news');const articles=await getCollection('articles');
const paths=['/zh/','/zh/games/','/zh/studio/','/zh/journal/','/zh/contact/',...products.map(p=>`/zh/games/${p.id}/`),...news.filter(n=>n.data.detail).map(n=>`/zh/journal/${n.id}/`),...articles.map(a=>`/articles/${a.id}`)];
return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${new URL(p,site).href}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
