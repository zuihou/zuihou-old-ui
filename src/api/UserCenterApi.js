import axiosApi from './AxiosApi.js'

const apiList = {
  // 获取单位管理分页列表
  getDeptPageList: '/aaa/',
  // 添加/删除/修改部门
  authorityOrg: '/authority/org',
  // 获取全部组织
  getAllDepart: '/authority/org/tree',
  // 查询部门分页列表
  authorityOrgPage: '/authority/org/page'
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
  getAllDepart (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.getAllDepart,
      data
    })
  }
}
