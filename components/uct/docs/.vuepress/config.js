const path = require('path')
const glob = require('globby')
const cwd = path.join(__dirname, '..')
const { parse } = require('vue-docgen-api')

const { renameComponentMd } = require('./fileinit.js')
var vuepressConfig = async () => {
  renameComponentMd(cwd + '/components')
  const docFiles = glob.sync('components/**/*.md', { cwd }).map(f => '/' + f)  //获得.md文件的目录结构
  const components = await Promise.all(
    glob
      .sync('../../components1/**/[a-z].{vue,jsx,ts,tsx}', { cwd, absolute: true })
      .map(async path => {
        return {
          name: (await parse(path)).displayName.replace(/[^a-zA-Z0-9_]/g, ''),
          path
        }
      })
  )//建立文档和组件的热更新练习
  console.log(docFiles)
  /**
      * {name:'button','**.vue}
   */
  //引入fs文件目录模块
  return {
    dest: path.join(__dirname, '../../dist'),//打包目录
    base: '/docgen/',//打包后内容
    title: 'VuePress DocGen Live',
    themeConfig: {//页面可视化配置
      search: false,
      editLinks: true,
      nav: [ // 导航栏配置
        { text: '前端基础', link: '/accumulate/' },
        {
          text: '前端基础',
          items: [
            { text: 'focus-outside', link: 'https://github.com/TaoXuSheng/focus-outside' },
            { text: 'stylus-converter', link: 'https://github.com/TaoXuSheng/stylus-converter' },
          ]
        },
      ],
      sidebar: docFiles,//左侧导航栏内容
      markdown: { // 为每个代码块显示行号
        lineNumbers: true
      },
    },
    plugins: [
      ['live'],
      [
        '@vuepress/register-components',
        '@vuepress/nprogress',
        {
          //热更新时进行检测文件，当我们更改vue组件内容时候，能够检测到当前生成新的文档
          components,
          componentsDir: '../../components'
        }
      ]
    ]
  }
}

module.exports = vuepressConfig;