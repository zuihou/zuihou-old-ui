import userCenterApi from '@/api/UserCenterApi.js'

export default {
  namespaced: true,
  state: {
    // 部门的树结构
    deptTreeData: []
  },
  mutations: {
    SET_DEPT_TREE_DATA (state, data) {
      state.deptTreeData = data
    }
  },
  actions: {
    // 查询部门列表并转换为树结构
    getDeptTreeData ({ commit }, data) {
      return userCenterApi.getDeptPageList(data).then(res => {
        commit('SET_DEPT_TREE_DATA', res)
        if (res.isSuccess) {
          commit('SET_DEPT_TREE_DATA', res.data || [])
        }
        return res
      })
    }
  }
}
