import msgsCenterApi from '@/api/MsgsCenterApi.js'

export default {
  namespaced: true,
  state: {
    myMsgsPageData: {}
  },
  mutations: {
    SET_MY_MSGS_PAGE_DATA (state, data) {
      state.myMsgsPageData = data
    }
  },
  actions: {
    // 我的消息分页列表
    getMyMsgsPageList ({ commit }, data) {
      return msgsCenterApi.getMyMsgsPageList(data).then(res => {
        if (res.isSuccess) {
          commit('SET_MY_MSGS_PAGE_DATA', res.data || {})
        }
        return res
      })
    }
  }
}
