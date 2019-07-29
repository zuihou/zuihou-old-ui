import axiosApi from './AxiosApi.js'

const apiList = {
  // 获取服务分页数据接口
  microServicePage: '/authority/microService/page',
  // 同步服务
  microServiceSync: '/authority/microService/sync',
  // 解析接口
  microServiceParse: '/authority/microService/parse'

}
export default {
  getMicroServicePageList (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.microServicePage,
      data
    })
  },
  microServiceSync (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.microServiceSync,
      data
    })
  },
  microServiceParse (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.microServiceParse,
      data
    })
  }

}
