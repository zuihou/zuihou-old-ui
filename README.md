# zuihou-admin-ui
zuihou-admin-cloud 的前端

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
