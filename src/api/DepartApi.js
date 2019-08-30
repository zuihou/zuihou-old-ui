import axiosApi from './AxiosApi.js'

const apiList = {
  // 级联获取地域
  getDepartList: '/authority/area'
}
export default {
  getDepartList (data) {
    return axiosApi({
      method: 'get',
      url: apiList.getDepartList,
      data
    })
  }
  // getAreaPageList(data = {}) {
  //   return axiosApi({
  //     method: 'get',
  //     url: apiList.getAreaPageList,
  //     data
  //   })
  // },
  // addArea(data = {}) {
  //   return axiosApi({
  //     method: 'post',
  //     url: apiList.addArea,
  //     data
  //   })
  // },
  // updatArea(data = {}) {
  //   return axiosApi({
  //     method: 'put',
  //     url: apiList.updatArea,
  //     data
  //   })
  // },
  // delArea(id) {
  //   return axiosApi({
  //     method: 'delete',
  //     url: `${apiList.delArea}/${id}`
  //   })
  // }
}
