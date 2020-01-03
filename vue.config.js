const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    //编译打包存放的目录默认dist
  outputDir: 'dist',

  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,

  // 设为false打包时不生成.map文件
  productionSourceMap: false,

  assetsDir: 'static',
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          // 补全css前缀(解决兼容性)
          require("autoprefixer")(),
          // 把px单位换算成rem单位
          require("postcss-pxtorem")({
            rootValue: 32, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: [".van", ".my-van"],// 要忽略的选择器并保留为px。
            propList: ["*"], //可以从px更改为rem的属性。
            minPixelValue: 2 // 设置要替换的最小像素值。
          })
        ]
      }
    }
  },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                target: 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }
            
        }
    },
    chainWebpack(config) {
      // config.plugins.delete('preload') // TODO: need test
      // config.plugins.delete('prefetch') // TODO: need test
      // set svg-sprite-loader
      config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
      config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
              symbolId: 'icon-[name]'
          })
          .end()
  },
}