<template>
  <div class='home'>
    <el-card>
      <el-collapse v-model='activeList'>
        <el-collapse-item title='功能疑难' name='1'>
          <div>模块化分包、最小化引入依赖、插拔式组件</div>
          <div>nacos 作为注册/配置中心</div>
          <div>负载均衡、熔断机制、监控等SpringCloud自带的特性</div>
          <div>数据权限、MybatisPlus增强的Wrapper、防注入(参考：zuihou-databases)</div>
          <div>前后端统一表单验证(参考： zuihou-validator-starter)</div>
          <div>防跨站脚本攻击(参考： zuihou-xss-starter）</div>
          <div>Swagger在线文档(参考： zuihou-swagger2-starter)</div>
          <div>
            代码生成器(参考：
            <a
              href='https://github.com/zuihou/zuihou-generator '
              target='_blank'
            >zuihou-generator</a>)
          </div>
          <div>
            定时任务调度器(参考：
            <a
              href='http://42.202.130.216:10000/zuihou-jobs-server'
              target='_blank'
            >zuihou-jobs</a>)
          </div>
          <div>
            大文件/断点/分片续传、多类型的文件存储方式(参考：
            <a
              href='http://42.202.130.216:10000/chunk/demo.html'
              target='_blank'
            >zuihou-file</a>)
          </div>
          <div>分布式事务(参考： seata 、zuihou-order)</div>
          <div>高亮日志、异步日志(参考： zuihou-log-starter)</div>
          <div>Docker(参考： docs/docker)</div>
          <div>还有很多特性，参考代码</div>
        </el-collapse-item>
        <el-collapse-item title='加入我们' name='2'>
          <div>由于作者能力有限(不会vue基本边学边做，大部分精力放在完善后端微服务项目上)，所以这个前端项目仅作为演示后端接口是否正常而写</div>
          <div>如果你觉得能帮助完善这个项目，欢迎加入我们</div>
          <div style='color:red'>
            如果你热爱开源，如果你会 vue 或者 java ， 如果你有自己的想法，想为这个项目加点什么功能， 欢迎加入QQ群： 63202894 联系群主。
            <br />不需要你是大神，也不需要你精通后端或者前端，只要你有热情，想让这个项目更加完善，欢迎加入QQ群： 63202894 联系群主。
            <br />
          </div>
        </el-collapse-item>
        <el-collapse-item title='环境预览' name='3'>
          <div>## 项目代码地址</div>
          <div>[gitee] https://gitee.com/zuihou111/zuihou-admin-cloud</div>
          <div>[github] https://github.com/zuihou/zuihou-admin-cloud (由于某种特殊原因，下载代码有时非常慢)</div>
          <div>[前端] https://github.com/zuihou/zuihou-admin-ui</div>
          <div>[前端] https://gitee.com/zuihou111/zuihou-admin-ui</div>
          <div>[代码生成器] https://github.com/zuihou/zuihou-generator (提示缺少 zuihou-generator 包，需要下载该项目，执行编译)</div>
          <div>[原型] http://zuihou111.gitee.io/zuihou-admin-rp/</div>
          <div>[介绍文档] https://zuihou.github.io/zuihou-admin-cloud/</div>
          <div>## 演示地址 (账号密码均为： zuihou/zuihou) （演示账号没有写权限，只能查询）</div>
          <div>[演示环境] http://42.202.130.216:10000/zuihou-ui （http://wzroom.cn/zuihou-ui 即将到期）</div>
          <div>[注册中心] http://42.202.130.216:10000/nacos/</div>
          <div>[在线文档] http://42.202.130.216:10000/api/gate/doc.html （http://wzroom.cn/api/gate/doc.html 即将到期）</div>
          <div>[定时任务] http://42.202.130.216:10000/zuihou-jobs-server</div>
          <div>[监控中心] http://42.202.130.216:10000/zuihou-monitor/</div>
        </el-collapse-item>
        <el-collapse-item title='问题反馈' name='4'>
          <div>1,Github gitee 提Issues</div>
          <div>2,加QQ群： 63202894</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeList: ['1', '2']
    };
  }
}
</script>
