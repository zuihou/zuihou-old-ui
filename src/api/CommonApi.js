import axiosApi from './AxiosApi.js'
const apiList = {
  // 测试
  test: '/test'
}
export default {
  test (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.test,
      data
    })
  }
}
