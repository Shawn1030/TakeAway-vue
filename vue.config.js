const path = require('path')
function resolve(dir){
  return path.resolve(__dirname,dir)
}
module.exports={
  configureWebpack:{
    resolve:{
      alias: {
        'components':'@/components',
        'pages':'@/pages'
      }
    }
  },
  devServer: {
    proxy: {
      // 请求地址以/api开头 就会代理到这个服务器去发请求
      '/api': {
        target: 'http://localhost:4002', //转发的目的地地址
        changeOrigin: true, //支持跨域
        pathRewrite: {
          '^/api': '', // rewrite path
        }
      },
    }
  }
  
}