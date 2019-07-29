import developerManageApi from '@/api/DeveloperManageApi.js'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    // 服务分页数据
    microServicePageListData: [],
    microServiceApiPageListData: [],
    microServiceInfo: {}

  },
  mutations: {
    SET_MICRO_SERVICE_PAGE_LIST (state, data) {
      state.microServicePageListData = data
    },
    SET_MICRO_SERVICE_API_PAGE_LIST (state, data) {
      state.microServiceApiPageListData = data
    },
    SET_MICRO_SERVICE_INFO (state, data) {
      state.microServiceInfo = data
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
    // 查询 服务API 分页数据
    getMicroServiceApiPageList ({ commit }, data) {
      return developerManageApi.getMicroServiceApiPageList(data).then(res => {
        if (res.isSuccess) {
          commit('SET_MICRO_SERVICE_API_PAGE_LIST', res.data.records || [])
        }
        return res
      })
    },
    // 同步服务
    microServiceSync ({ commit }, data) {
      return developerManageApi.microServiceSync(data).then(res => {
        if (res.isSuccess) {
          Message.success('同步成功')
        } else {
          Message.error(res.msg)
        }
        return res
      })
    },
    // 解析 服务
    microServiceParse ({ commit }, data) {
      return developerManageApi.microServiceParse(data).then(res => {
        if (res.isSuccess) {
          Message.success('解析成功')
        } else {
          Message.error(res.msg)
        }
        return res
      })
    }
  }
}
