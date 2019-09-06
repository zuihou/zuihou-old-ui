import axiosApi from './AxiosApi.js'

const apiList = {
  // 获取单位管理分页列表
  getDeptPageList: '/aaa/',
  // 添加/删除/修改部门
  authorityOrg: '/authority/org',
  // 获取全部组织
  getAllDepart: '/authority/org/tree',
  // 查询部门分页列表
  authorityOrgPage: '/authority/org/page',
  delDepart: '/authority/org',
  updateDepart: '/authority/org',
  userPage: '/authority/user/page',
  // 分页查询岗位
  stationPageList: '/authority/station/page',
  // 新增岗位
  addStation: '/authority/station',
  // 更新岗位
  updateStation: '/authority/station',
  // 删除岗位
  delStation: '/authority'

}
export default {
  getDeptPageList (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.getDeptPageList,
      data
    }).then(() => {
      return [{
        id: 'dididi',
        item: '111'
      }]
    })
  },
  authorityOrgPost (data = {}, formTag) {
    if (formTag) {
      return {
        method: 'post',
        url: apiList.authorityOrg
      }
    }
    return axiosApi({
      method: 'post',
      url: apiList.authorityOrg,
      data
    })
  },
  authorityOrgPut (data = {}) {
    return axiosApi({
      method: 'put',
      url: apiList.authorityOrg,
      data
    })
  },
  authorityOrgDelete (data = {}) {
    return axiosApi({
      method: 'delete',
      url: apiList.authorityOrg,
      data
    })
  },
  authorityOrgPage (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.authorityOrgPage,
      data
    })
  },
  userPage (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.userPage,
      data
    })
  },
  getAllDepart (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.getAllDepart,
      data
    })
  },
  delDepart (id) {
    return axiosApi({
      method: 'delete',
      url: `${apiList.delDepart}/${id}`
    })
  },
  updateDepart (data = {}) {
    return axiosApi({
      method: 'put',
      url: apiList.updateDepart,
      data
    })
  },
  getStationPageList (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.stationPageList,
      data
    })
  },
  addStation (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.addStation,
      data
    })
  },
  delStation (id) {
    return axiosApi({
      method: 'delete',
      url: `${apiList.delStation}/${id}`
    })
  },
  updateStation (data = {}) {
    return axiosApi({
      method: 'put',
      url: apiList.updateStation,
      data
    })
  }

}
