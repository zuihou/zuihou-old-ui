import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@views/homeModule/Home.vue')
    },
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: Login,
      meta: {
        withoutLayout: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
export default router
