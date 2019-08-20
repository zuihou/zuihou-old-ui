import axiosApi from './AxiosApi.js'

const apiList = {
  // 获取字典项列表
  getDictPageList: '/authority/dictionary/page',
  // 获取字典项子列表
  getDictItemsPageList: '/authority/dictionaryItem/page',
  // 新增字典项
  addDict: '/authority/dictionary',
  // 修改字典面
  updatDict: '/authority/dictionary',
  // 删除字典项
  delDict: '/authority/dictionary',
  addDictItem: '/authority/dictionaryItem',
  updateDictItem: '/authority/dictionaryItem',
  delDictItem: '/authority/dictionaryItem'
}
export default {
  getDictPageList (data = {}) {
    return axiosApi({
      method: 'get',
      url: apiList.getDictPageList,
      data
    })
  },
  addDict (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.addDict,
      data
    })
  },
  updatDict (data = {}) {
    return axiosApi({
      method: 'put',
      url: apiList.updatDict,
      data
    })
  },
  delDict (id) {
    return axiosApi({
      method: 'delete',
      url: `${apiList.delDict}/${id}`
    })
  },
  getDictItemsPageList (code) {
    return axiosApi({
      method: 'get',
      url: `${apiList.getDictItemsPageList}?dictionaryCode=${code}`
    })
  },
  updateDictItem (data = {}) {
    return axiosApi({
      method: 'put',
      url: apiList.updateDictItem,
      data
    })
  },
  addDictItem (data = {}) {
    return axiosApi({
      method: 'post',
      url: apiList.addDictItem,
      data
    })
  },
  delDictItem (id) {
    return axiosApi({
      method: 'delete',
      url: `${apiList.delDictItem}/${id}`
    })
  }
}
