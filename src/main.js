import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './filters/index.js'
import './directives/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
