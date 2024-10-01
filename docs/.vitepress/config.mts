import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.js";	// 改成自己的路径
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  head: [["link", { rel: "icon", href: "../5.png" }]],
  title: "Milo的文档集站",
  description: "Milo docs ts",
  themeConfig: {
    outline: { level: [2,6] },
    outlineTitle: '文章目录',
    logo: '/3.gif',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'home', link: '/' },
      { text: 'Fontend', link: '/Frontend-Note/index.md' },
      { text: 'examples', items: [{ text: 'Markdown', link: '/markdown-examples' },
      { text: 'vitepress教程', link: 'https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html' },
      { text: 'vue.js', link: 'https://cn.vuejs.org/guide/introduction.html' }
    ] },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   },
    //   {
    //     text: 'Milo`s Notes',
    //     items: [
    //       { text: 'TypeScript 基础学习', link: '/TypeScript 基础学习.md' },
    //       { text: '微前端框架 qiankun 学习笔记', link: '/微前端框架 qiankun 学习笔记.md' }
    //     ]
    //   },
    // ],
    sidebar: { "/Frontend-Note": set_sidebar("Frontend-Note") },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/Miloboxgithub' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-Milo docs'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
        },
          modal: {
            resetButtonTitle: '清除查询',
            noResultsText: '没有找到结果',
            footer:{
              selectText: '选择',
              navigateText: '切换结果',
              closeText: '关闭'
            }
          }
      }
    }
  }
  }
})
