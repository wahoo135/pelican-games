import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    status: z.enum(['online', 'wip', 'planned']),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    price: z.string().optional(),
    players: z.string().optional(),
    duration: z.string().optional(),
    buyLink: z.string().optional(),
    buyLinkText: z.string().optional(),
    detailLink: z.string().optional(),
    order: z.number().default(0),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    cover: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.enum(['design', 'news', 'playtest', 'behind', 'industry']).default('news'),
    publishedAt: z.string(),
    featured: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    detail: z.string().optional(),
    link: z.string().optional(),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().default(0),
  }),
});

const siteConfig = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/siteConfig' }),
  schema: z.object({
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    heroImage: z.string().optional(),
    heroBtnPrimaryText: z.string().optional(),
    heroBtnPrimaryLink: z.string().optional(),
    heroBtnSecondaryText: z.string().optional(),
    heroBtnSecondaryLink: z.string().optional(),
    aboutText: z.string(),
    aboutImage: z.string().optional(),
    businessEmail: z.string(),
    businessPhone: z.string().optional(),
    wechat: z.string().optional(),
    wechatQR: z.string().optional(),
    xiaohongshu: z.string().optional(),
    weibo: z.string().optional(),
    bilibili: z.string().optional(),
    footerSlogan: z.string().optional(),
    copyrightName: z.string().optional(),
  }),
});

export const collections = { products, articles, news, faq, siteConfig };
