import axiosApi from './AxiosApi.js'

const apiList = {
  // 获取系统所有的菜单
  authMenuTree: '/authority/menu/tree',
  // 查询当前用户绑定的菜单、增删改查某一项菜单
  authMenu: '/authority/menu',
  // 分页查询角色
  authRolePage: '/authority/role/page'
}
export default {
  authMenuTree (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.authMenuTree,
      data
    })
  },
  authMenu (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.authMenu,
      data
    })
  },
  authMenuPost (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.authMenu,
      data
    })
  },
  authMenuDelete (id) {
    return axiosApi({
      method: 'delete',
      url: `${apiList.authMenu}/${id}`
    })
  },
  authMenuPut (data = {}) {
    return axiosApi({
      method: 'put',
      url: apiList.authMenu,
      data
    })
  },
  authMenuGet (id) {
    return axiosApi({
      method: 'get',
      url: `${apiList.authMenu}/${id}`
    })
  },
  authRolePage (data) {
    return axiosApi({
      method: 'get',
      url: apiList.authRolePage,
      data
    })
  }
}
