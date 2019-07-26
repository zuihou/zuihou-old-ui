import Vue from 'vue'
import Vuex from 'vuex'
import commonApi from '@/api/CommonApi.js'
import userCenterModule from './views/userCenterModule/store'
import authModule from './views/authModule/store'

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
    userInfo,
    // 当前系统的所有枚举值
    enums: {}
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
    },
    // 设置当前系统的枚举值
    SET_ENUMS (state, data) {
      state.enums = data
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
    },
    getDictionaryEnums ({ commit }) {
      commonApi.dictionaryEnums().then(res => {
        if (res.isSuccess) {
          commit('SET_ENUMS', res.data)
        }
      })
    }
  },
  modules: {
    userCenterModule,
    authModule
  }
})
