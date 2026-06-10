import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: {
      name: '鹈鹕游戏',
      mark: () => null,
    },
  },
  collections: {
    // ========== 作品 ==========
    products: collection({
      label: '作品管理',
      slugField: 'name',
      path: 'src/content/products/*',
      format: { contentField: 'description' },
      schema: {
        name: fields.slug({ name: { label: '作品名称' } }),
        tagline: fields.text({ label: '一句话标语', validation: { length: { max: 100 } } }),
        status: fields.select({
          label: '状态',
          options: [
            { value: 'online', label: '已上线' },
            { value: 'wip', label: '研发中' },
            { value: 'planned', label: '规划中' },
          ],
          defaultValue: 'wip',
        }),
        tags: fields.multiselect({
          label: '标签',
          options: [
            { value: '情绪治愈', label: '情绪治愈' },
            { value: '聚会社交', label: '聚会社交' },
            { value: '桌面游戏', label: '桌面游戏' },
            { value: '策略博弈', label: '策略博弈' },
            { value: '商业模拟', label: '商业模拟' },
            { value: '治愈叙事', label: '治愈叙事' },
            { value: '轻度解谜', label: '轻度解谜' },
            { value: '推理', label: '推理' },
            { value: '2D游戏', label: '2D游戏' },
            { value: '独立游戏', label: '独立游戏' },
          ],
        }),
        image: fields.image({
          label: '封面图（首页卡片用）',
          directory: 'public/images/products',
          publicPath: '/images/products',
          validation: { isRequired: true },
        }),
        price: fields.text({ label: '价格（如 ¥158）' }),
        players: fields.text({ label: '人数（如 3-6人）' }),
        duration: fields.text({ label: '时长（如 45分钟）' }),
        buyLink: fields.url({ label: '购买链接' }),
        buyLinkText: fields.text({ label: '购买按钮文字', defaultValue: '立即购买' }),
        description: fields.mdx({
          label: '作品详情（详情页正文）',
          options: {
            images: {
              directory: 'public/images/products',
              publicPath: '/images/products',
            },
          },
        }),
        order: fields.integer({ label: '排序（越小越靠前）', defaultValue: 0 }),
      },
    }),

    // ========== 文章/博客 ==========
    articles: collection({
      label: '文章管理',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        cover: fields.image({
          label: '封面图',
          directory: 'public/images/articles',
          publicPath: '/images/articles',
        }),
        excerpt: fields.text({ label: '摘要', multiline: true, validation: { length: { max: 300 } } }),
        category: fields.select({
          label: '分类',
          options: [
            { value: 'design', label: '设计手记' },
            { value: 'news', label: '工作室动态' },
            { value: 'playtest', label: '测玩报告' },
            { value: 'behind', label: '幕后故事' },
            { value: 'industry', label: '行业观察' },
          ],
          defaultValue: 'news',
        }),
        content: fields.mdx({
          label: '正文（支持图片和视频嵌入）',
          options: {
            images: {
              directory: 'public/images/articles',
              publicPath: '/images/articles',
            },
          },
        }),
        publishedAt: fields.date({ label: '发布日期', validation: { isRequired: true } }),
        featured: fields.checkbox({ label: '置顶推荐', defaultValue: false }),
      },
    }),

    // ========== 最新动态 ==========
    news: collection({
      label: '最新动态',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        date: fields.text({ label: '日期（如 2026.08）', validation: { isRequired: true } }),
        detail: fields.text({ label: '详情说明', multiline: true }),
        link: fields.url({ label: '相关链接' }),
        order: fields.integer({ label: '排序（越小越靠前）', defaultValue: 0 }),
      },
    }),

    // ========== FAQ ==========
    faq: collection({
      label: '常见问题',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: '问题' } }),
        answer: fields.text({ label: '回答', multiline: true, validation: { isRequired: true } }),
        order: fields.integer({ label: '排序（越小越靠前）', defaultValue: 0 }),
      },
    }),
  },

  singletons: {
    // ========== 页面装修 ==========
    siteConfig: collection({
      label: '页面装修 & 站点配置',
      path: 'src/content/siteConfig',
      format: { data: 'json' },
      schema: {
        // --- 首页装修 ---
        heroTitle: fields.text({ label: '首页大标题', defaultValue: '鹈鹕游戏' }),
        heroSubtitle: fields.text({ label: '首页副标题', defaultValue: '以游戏为载体，探索情绪与世界的边界' }),
        heroImage: fields.image({
          label: '首页背景图（可选，留空用渐变）',
          directory: 'public/images/hero',
          publicPath: '/images/hero',
        }),
        heroBtnPrimaryText: fields.text({ label: '主按钮文字', defaultValue: '查看我们的作品' }),
        heroBtnPrimaryLink: fields.text({ label: '主按钮链接', defaultValue: '#works' }),
        heroBtnSecondaryText: fields.text({ label: '副按钮文字', defaultValue: '商务合作' }),
        heroBtnSecondaryLink: fields.text({ label: '副按钮链接', defaultValue: '#business' }),

        // --- 关于我们 ---
        aboutText: fields.text({ label: '关于我们 - 正文（段落间空行分隔）', multiline: true, validation: { isRequired: true } }),
        aboutImage: fields.image({
          label: '关于我们 - 配图',
          directory: 'public/images/about',
          publicPath: '/images/about',
        }),

        // --- 商务合作 ---
        businessEmail: fields.text({ label: '商务合作邮箱', validation: { isRequired: true } }),
        businessPhone: fields.text({ label: '商务电话' }),
        wechat: fields.text({ label: '微信号' }),
        wechatQR: fields.image({
          label: '微信二维码',
          directory: 'public/images/contact',
          publicPath: '/images/contact',
        }),

        // --- 社交链接 ---
        xiaohongshu: fields.url({ label: '小红书链接' }),
        weibo: fields.url({ label: '微博链接' }),
        bilibili: fields.url({ label: 'B站链接' }),

        // --- 底部 ---
        footerSlogan: fields.text({ label: '底部Slogan', defaultValue: '以游戏为载体，探索情绪与世界的边界' }),
        copyrightName: fields.text({ label: '版权名称', defaultValue: '鹈鹕游戏 Pelican Games' }),
      },
    }),
  },
});
