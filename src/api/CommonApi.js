import axiosApi from './AxiosApi.js'

const apiList = {
  // 登录
  annoLogin: '/authority/anno/login',
  annoLogout: '/authority/anno/logout'
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
  }
}
