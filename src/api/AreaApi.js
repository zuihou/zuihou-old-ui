import axiosApi from './AxiosApi.js'

const apiList = {
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
  getAreaPageList (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.getAreaPageList,
      data
    })
  },
  addArea (data = {}) {
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
      url: `${apiList.deArea}/${id}`
    })
  }
}
