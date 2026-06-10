# 鹈鹕游戏官网 v2

基于 Astro + Keystatic 的内容管理型官网。

## 开发

```bash
npm install
npm run dev
```

## 后台管理

访问 `/keystatic` 进入后台编辑内容。

- 开发模式：无需登录，直接编辑
- 生产模式：需要 GitHub 账号登录（仅仓库管理员可编辑）

## 内容结构

| 集合 | 路径 | 说明 |
|------|------|------|
| 作品 | `src/content/products/` | 产品展示 |
| 文章 | `src/content/articles/` | 博客文章 |
| 动态 | `src/content/news/` | 最新动态 |
| FAQ | `src/content/faq/` | 常见问题 |
| 配置 | `src/content/siteConfig/` | 站点配置 |

## 部署

推送到 GitHub，Vercel 自动部署。

## 技术栈

- [Astro](https://astro.build) - 静态站点生成
- [Keystatic](https://keystatic.com) - Git-based CMS
- 部署：Vercel（免费）
