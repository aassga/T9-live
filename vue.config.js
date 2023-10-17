const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const IN_ONLINE = process.env.NODE_ENV === "online";
module.exports = {
  publicPath: '',
  devServer: {
    open: true,
    https: false,
    // 以上的ip和埠号是我们本机的;下面为需要跨域的
    proxy: {    //配置跨域
      '/': {
        target: process.env.VUE_APP_URL, // 動態環境
        ws: false,     // 如果要代理 websockets
        changOrigin: true,  // 允许跨域
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '_api': resolve('src/api'),
        '_util': resolve('src/libs/utils'),
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "T9 LIVE";
        return args
      })
    //線上環境打包圖片壓縮 
    IN_ONLINE &&
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
      })
      .end();
  },
  transpileDependencies:['screenfull']
};