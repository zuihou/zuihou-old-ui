# zuihou-admin-ui
zuihou-admin-cloud 的前端

## 项目地址
[github] https://github.com/zuihou/zuihou-admin-cloud

[gitee] https://gitee.com/zuihou111/zuihou-admin-cloud  (同步的github的代码，需要最新代码的同学请关注github项目)

[代码生成器] https://github.com/zuihou/zuihou-generator  (提示缺少 zuihou-generator 包，需要下载该项目，执行编译)

[前端] https://github.com/zuihou/zuihou-admin-ui  「开发中」

[原型] http://zuihou111.gitee.io/zuihou-admin-rp/

[demo] http://wzroom.cn/zuihou-ui  (zuihou/zuihou) 「开发中」

[注册中心] http://wzroom.cn/zuihou-eureka/  (zuihou/zuihou)

[在线文档] http://wzroom.cn/api/gate/doc.html  (zuihou/zuihou)

## 修改后端 请求地址
```
修改 vue.config.js 文件的targetUrl 为 zuihou-admin-cloud 项目的网关地址(zuihou-zuul-server)
const targetUrl = 'http://wzroom.cn'
如：
//const targetUrl = 'http://192.168.1.1:8760'
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
