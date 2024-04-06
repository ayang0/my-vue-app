import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "AYANG'S BLOG",
  description: "技术文档、收藏、生活记录",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/saima.png',
    search: {
      provider: 'algolia',
      options: {
        appId: process.env.API_ID,
        apiKey: process.env.API_KEY,
        indexName: process.env.INDEX_NAME,
      }
    },
    nav: [
      { text: '主页', link: '/' },
      {
        text: 'Java',
        items: [
          { text: '基础', link: '/java/base' },
        ]
      },
      {
        text: 'DevOps',
        items: [
          { text: 'Gitlab Docker Compose安装', link: '/devops/gitlab-install' },
        ]
      },
      {
        text: '生活',
        items: [

        ]
      }
    ],

    sidebar: {
      '/java/': [
        {
          text: 'Java',
          items: [
            { text: 'Java基础', link: '/java/base' },
          ]
        },
      ],
      '/devops/': [
        {
          text: 'DevOps',
          items: [
            { text: 'Gitlab Docker Compose安装', link: '/devops/gitlab-install' },
          ]
        },
      ],
      '/life/': [
        {
          text: '生活',
          items: [
          
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ayang0' }
    ],
    footer: {
      message: '基于 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 发布',
      copyright: '版权所有 © 2024 <a href="https://github.com/ayang0">AYANG0</a>'
    }
  }
})
