import Vue from 'vue'
// 弹窗标题
Vue.filter('dialogTitle', val => {
  const types = {
    edit: '编辑',
    detail: '查看',
    create: '新增',
    copy: '复制'
  }
  return types[val]
})
