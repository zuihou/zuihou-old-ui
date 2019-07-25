import authManageApi from '@/api/AuthManageApi.js'

export default {
  namespaced: true,
  state: {
    // 当前用户的菜单的树结构
    authMenu: []
  },
  mutations: {
    SET_AUTH_MENU (state, data) {
      state.authMenu = data
    }
  },
  actions: {
    // 查询当前用户的菜单数据
    authMenu ({ commit }, data) {
      return authManageApi.authMenu(data).then(res => {
        if (res.isSuccess) {
          commit('SET_AUTH_MENU', res.data || [])
        }
        return res
      })
    }
  }
}
