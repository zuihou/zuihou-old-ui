import authManageApi from '@/api/AuthManageApi.js'

export default {
  namespaced: true,
  state: {
    // 当前用户的菜单的树结构
    authMenu: [],
    // 所有角色的分页列表
    rolePageList: [],
    // 当前操作的角色的所有信息
    currentRoleInfo: {}
  },
  mutations: {
    SET_AUTH_MENU (state, data) {
      state.authMenu = data
    },
    SET_ROLE_PAGE_LIST (state, data) {
      state.rolePageList = data
    },
    SET_CURRENT_ROLE_INFO (state, data) {
      state.currentRoleInfo = data
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
    },
    // 查询角色列表
    getRolePageList ({ commit }, data) {
      return authManageApi.authRolePage(data).then(res => {
        if (res.isSuccess) {
          commit('SET_ROLE_PAGE_LIST', res.data || [])
        }
        return res
      })
    }
  }
}
