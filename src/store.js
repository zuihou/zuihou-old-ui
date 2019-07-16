import Vue from 'vue'
import Vuex from 'vuex'
import commonApi from '@/api/CommonApi.js'

Vue.use(Vuex)
const userInfo = {
  account: '',
  id: '',
  loginCount: 0,
  mobile: '',
  name: '',
  orgId: '',
  photo: '',
  sex: null,
  workDescribe: ''
}
export default new Vuex.Store({
  namespaced: true,
  state: {
    token: null,
    userInfo
  },
  mutations: {
    // 设置用户信息
    SET_USER_INFO (state, info) {
      state.userInfo = {
        ...state.userInfo,
        ...info
      }
    },
    // 刷新token
    SET_TOKEN (state, token) {
      state.token = token
    },
    // token过期了，清空state数据和localstorage的数据
    REMOVE_LOCALSTORAGE (state) {
      state.token = null
      state.userInfo = userInfo
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  },
  actions: {
    getUserInfo ({ commit }, data) {
      return commonApi.annoLogin(data).then(res => {
        if (res.isSuccess) {
          localStorage.setItem('token', res.data.token.token)
          localStorage.setItem('userInfo', JSON.stringify(res.data.user))
          commit('SET_USER_INFO', res.data.user)
          commit('SET_TOKEN', res.data.token.token)
        } else {
          commit('REMOVE_LOCALSTORAGE')
        }
        return res
      }).catch(err => {
        // eslint-disable-next-line
        console.log(err)
        commit('REMOVE_LOCALSTORAGE')
      })
    },
    logout ({ commit }, data) {
      return commonApi.annoLogout(data).then(res => {
        commit('REMOVE_LOCALSTORAGE')
        return res
      })
    }
  },
  modules: {

  }
})
