module.exports = {
  configureWebpack:{
    resolve:{
      //设置别名
      alias:{
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
      }
    }
  }
}