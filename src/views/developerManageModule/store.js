import developerManageApi from '@/api/DeveloperManageApi.js'

export default {
  namespaced: true,
  state: {
    // 服务分页数据
    microServicePageListData: []

  },
  mutations: {
    SET_MICRO_SERVICE_PAGE_LIST (state, data) {
      state.microServicePageListData = data
    }
  },
  actions: {
    // 查询 服务分页数据
    getMicroServicePageList ({ commit }, data) {
      return developerManageApi.getMicroServicePageList(data).then(res => {
        if (res.isSuccess) {
          commit('SET_MICRO_SERVICE_PAGE_LIST', res.data.records || [])
        }
        return res
      })
    },
    microServiceSync ({ commit }, data) {
      const vm = this
      return developerManageApi.microServiceSync(data).then(res => {
        if (res.isSuccess) {
          vm._vm.$message.success('123')
        } else {
          vm._vm.$message.success(res.msg)
        }
        return res
      })
    },
    microServiceParse ({ commit }, data) {
      return developerManageApi.microServiceParse(data).then(res => {
        if (res.isSuccess) {
        }
        return res
      })
    }
  }
}
