import axiosApi from './AxiosApi.js'

const apiList = {
  // 登录
  annoLogin: '/authority/anno/login',
  // 登出
  annoLogout: '/authority/anno/logout',
  // 获取当前系统的所有枚举
  dictionaryEnums: '/gate/dictionary/enums'
}
export default {
  annoLogin (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.annoLogin,
      formData: true,
      data
    })
  },
  annoLogout (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.annoLogout,
      data
    })
  },
  dictionaryEnums () {
    return axiosApi({
      method: 'get',
      url: apiList.dictionaryEnums
    })
  }
}
