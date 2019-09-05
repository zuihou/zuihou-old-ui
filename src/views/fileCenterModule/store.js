import fileCenterApi from '@/api/FileCenterApi.js'

export default {
  namespaced: true,
  state: {
    myFilePageData: {},
    myAttachmentPageData: {}
  },
  mutations: {
    SET_MY_FILE_PAGE_DATA (state, data) {
      state.myFilePageData = data
    },
    SET_MY_ATTACHMENT_PAGE_DATA (state, data) {
      state.myAttachmentPageData = data
    }
  },
  actions: {
    // 我的消息分页列表
    getMyFilePageList ({ commit }, data) {
      return fileCenterApi.getMyFilePageList(data).then(res => {
        if (res.isSuccess) {
          commit('SET_MY_FILE_PAGE_DATA', res.data || {})
        }
        return res
      })
    },
    getMyAttachmentPageList ({ commit }, data) {
      return fileCenterApi.getMyAttachmentPageList(data).then(res => {
        if (res.isSuccess) {
          commit('SET_MY_ATTACHMENT_PAGE_DATA', res.data || {})
        }
        return res
      })
    }
  }
}
