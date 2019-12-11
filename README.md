# zuihou-admin-ui
zuihou-admin-cloud 的前端， 改版本 不再维护！ 最新代码看下面👇👇👇

## 最新项目代码地址（持续开发）
| 项目 | gitee | github |
|---|---|---|
| 微服务项目 | https://gitee.com/zuihou111/zuihou-admin-cloud | https://github.com/zuihou/zuihou-admin-cloud |
| 单体项目 | https://gitee.com/zuihou111/zuihou-admin-boot | https://github.com/zuihou/zuihou-admin-boot |
| 租户后台 | https://gitee.com/zuihou111/zuihou-ui | https://github.com/zuihou/zuihou-ui |
| 开发&运营后台 | https://gitee.com/zuihou111/zuihou-admin-ui | https://github.com/zuihou/zuihou-admin-ui |
| 代码生成器 | 无 | https://github.com/zuihou/zuihou-generator |


## 当前代码的演示地址 (账号密码均为： zuihou/zuihou)       （演示环境部署不易，请勿胡乱删除、修改数据）
[演示环境] http://42.202.130.216:10000/zuihou-ui                

[注册中心] http://42.202.130.216:10000/nacos/      

[在线文档] http://42.202.130.216:10000/api/gate/doc.html       

[定时任务] http://42.202.130.216:10000/zuihou-jobs-server

[监控中心] http://42.202.130.216:10000/zuihou-monitor/


## 修改后端 请求地址
```
修改 src/config/index.js 文件的 apiUrl.dev 为 zuihou-admin-cloud 项目的网关地址(zuihou-zuul-server) (或者nginx地址，如用了nginx)

apiUrl: {
    //  本地环境接口请求地址
    dev: 'http://127.0.0.1:8760',     //TODO 这个地址改成你自己的（默认就是网关的地址，无需修改）
    //  生产环境接口请求地址 
    pro: 'http://42.202.130.216:10000'  
},

```

## 期待您的加入：
    1，前端   （急需！！只要你懂点vue、热爱开源，请加入我们的队伍吧）
    2，后端    
    3，土豪哥哥(求赞助服务器)
    4，有想要合作或者赞助服务器的朋友加群（63202894）联系群主

## 如何贡献代码    
    1，Fork
    2，修改代码后提交pr
    3，等待合并
    4，合并超过5次的朋友，直接拉为项目开发者

## 安装
```
npm install
```

### 本地开发环境运行
```
npm run serve
```

### 生产环境运行
```
npm run build
```

### 运行测试
```
npm run test
```

### 修复文件中不规范的写法
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
