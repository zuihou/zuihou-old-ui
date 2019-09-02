const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}

//const targetUrl = "http://42.202.130.216:10000"

let targetUrl = ""
switch (process.env.NODE_ENV) {
  case "development":
    targetUrl = "http://127.0.0.1:8760"
    break
  case "production":
    targetUrl = "http://42.202.130.216:10000"
    break
}

const proxyArr = ["/api"]
const proxy = {}
proxyArr.forEach(item => {
  proxy[item] = {
    target: targetUrl,
    changeOrigin: true
  }
})

module.exports = {
  // 配置部署的路径，默认‘/’，表示根域名下，这里必须以‘/’结束，否则会出现打包失败(具体体现在绝对路径打包时会出错)
  publicPath: "./",
  // 静态资源放置文件夹
  assetsDir: "assets",
  // true: 控制台显示warning，不影响编译
  // 'error': 强制显示错误，不修改无法编译
  // false: 不检查
  // npm run lint指令，检查并修复文件警告，未指定文件时默认为src和test文件夹下的文件
  // lintOnSave: 'error', // default: true
  lintOnSave: true,
  // 给script和link标签添加crossorigin属性，免发送身份验证信息
  crossorigin: "anonymous",
  // 设置代理
  devServer: {
    contentBase: "./",
    proxy,
    open: true
  },
  // 简单的webpack的配置
  configureWebpack: {
    resolve: {
      // 设置别名,这里会把配置和原来的合并，并非覆盖，默认@指向src目录
      alias: {
        "@views": resolve("src/views")
      }
    }
  }
}
