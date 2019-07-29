import axiosApi from './AxiosApi.js'

const apiList = {
  // 获取服务分页数据接口
  microServicePage: '/authority/microService/page',
  // 查询API资源接口分页数据
  microServiceApiPage: '/authority/resource/page',
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
  getMicroServiceApiPageList (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.microServiceApiPage,
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
      method: 'get',
      url: apiList.microServiceParse,
      data
    })
  }

}
