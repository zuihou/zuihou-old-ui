module.exports = {
  /**
   * token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   *  是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * 项目部署基础
   * 默认情况下，我们假设你的应用将被部署在域的根目录下,
   * 例如：https://www.my-app.com/
   * 默认：'/'
   * 如果您的应用程序部署在子路径中，则需要在这指定子路径
   * 例如：https://www.foobar.com/my-app/
   * 需要将它改为'/my-app/'
   */
  publicPath: {
    //  本地环境发布目录
    dev: "/",
    //  生产环境发布目录
    pro: "/"
  },
  /**
   *  api请求基础路径
   */
  apiUrl: {
    //  本地环境接口请求地址
    dev: "http://127.0.0.1:8760",
    //  生产环境接口请求地址
    pro: "http://api.openc.top"
  },
  /**
   * 默认打开的首页的路由name值，默认为home
   */
  homeName: "home",
  /**
   * 需要加载的插件
   */
  plugin: {
    "error-store": {
      showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
