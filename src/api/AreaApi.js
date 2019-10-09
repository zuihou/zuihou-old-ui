import axiosApi from './AxiosApi.js'

const apiList = {
  // 级联获取地域
  getArea: '/authority/area',
  // 获取地域列表
  getAreaPageList: '/authority/area/page',
  // 新增地域
  addArea: '/authority/area',
  // 修改字典面
  updatArea: '/authority/area',
  // 删除地域
  delArea: '/authority/area'
}
export default {
  getAreaList (data) {
    return axiosApi({
      method: 'get',
      url: apiList.getArea,
      data
    })
  },
  getAreaPageList (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.getAreaPageList,
      data
    })
  },
  addArea (data = {}, tag = false) {
    if (tag) {
      return {
        method: 'post',
        url: apiList.addArea
      }
    }
    return axiosApi({
      method: 'post',
      url: apiList.addArea,
      data
    })
  },
  updatArea (data = {}) {
    return axiosApi({
      method: 'put',
      url: apiList.updatArea,
      data
    })
  },
  delArea (id) {
    return axiosApi({
      method: 'delete',
      url: `${apiList.delArea}/${id}`
    })
  }
}
