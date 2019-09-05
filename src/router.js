import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@views/homeModule/Home.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: Login,
      meta: {
        withoutLayout: true
      }
    },
    // 部门管理-列表
    {
      path: '/userCenter/deptManage',
      name: 'deptManage',
      component: () => import('./views/userCenterModule/DeptManage.vue'),
      meta: {
        title: '部门管理'
      }
    },
    // 岗位-列表
    {
      path: '/userCenter/stationManage',
      name: 'stationManage',
      component: () => import('./views/userCenterModule/StationManage.vue'),
      meta: {
        title: '岗位管理'
      }
    },
    // 权限管理-菜单管理
    {
      path: '/authority/menuManage',
      name: 'menuManage',
      component: () => import('./views/authModule/MenuManage.vue'),
      meta: {
        title: '菜单管理'
      }
    },
    // 权限管理-角色管理
    {
      path: '/authority/roleManage',
      name: 'roleManage',
      component: () => import('./views/authModule/RoleManage.vue'),
      meta: {
        title: '角色管理'
      }
    },
    // 字典项管理
    {
      path: '/dictManage',
      name: 'dictManage',
      component: () => import('./views/dictManage/DictManage.vue'),
      meta: {
        title: '数据字典维护'
      }
    },
    // 地域管理
    {
      path: '/areaManage',
      name: 'areaManage',
      component: () => import('./views/areaManage/AreaManage.vue'),
      meta: {
        title: '地域管理'
      }
    },
    // 服务管理
    {
      path: '/developerManageModule/serviceManage',
      name: 'serviceManage',
      component: () =>
        import('./views/developerManageModule/serviceManage.vue'),
      meta: {
        title: '服务管理'
      }
    },
    // 接口查询
    {
      path: '/developerManageModule/apiView',
      name: 'apiView',
      component: () => import('./views/developerManageModule/ApiView.vue'),
      meta: {
        title: '接口查询'
      }
    },
    // 操作日志
    {
      path: '/developerManageModule/optLog',
      name: 'optLog',
      component: () => import('./views/developerManageModule/OptLog.vue'),
      meta: {
        title: '操作日志'
      }
    },
    // 我的消息
    {
      path: '/msgsCenter/myMsgs',
      name: 'myMsgs',
      component: () => import('./views/msgsCenterModule/myMsgs.vue'),
      meta: {
        title: '我的消息'
      }
    },
    // 发布消息
    {
      path: '/msgsCenter/sendMsgs',
      name: 'sendMsgs',
      component: () => import('./views/msgsCenterModule/sendMsgs.vue'),
      meta: {
        title: '发布消息'
      }
    },
    // 文件列表
    {
      path: '/fileCenter/file',
      name: 'file',
      component: () => import('./views/fileCenterModule/index.vue'),
      meta: {
        title: '文件列表'
      }
    },
    // 附件列表
    {
      path: '/fileCenter/attachment',
      name: 'attachment',
      component: () => import('./views/fileCenterModule/index.vue'),
      meta: {
        title: '文件列表'
      }
    },
    {
      path: '*',
      redirect: 'login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
export default router
