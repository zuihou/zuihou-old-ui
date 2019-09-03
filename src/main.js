import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters/index.js'
import './directives/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
// 自定义的全局组件
import './components/index.js'
Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
