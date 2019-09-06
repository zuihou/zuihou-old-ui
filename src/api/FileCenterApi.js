import axiosApi from './AxiosApi.js'

const apiList = {
  getMyFilePageList: '/file/file/page',
  getMyAttachmentPageList: '/file/attachment/page',
  saveFolder: '/file/file',
  delFile: '/file/file/ids',
  downloadFiles: '/file/file/download'
}
export default {
  downloadFiles: {
    url: apiList.downloadFiles,
    method: 'get'
  },
  getMyFilePageList (data) {
    return axiosApi({
      method: 'get',
      url: apiList.getMyFilePageList,
      data
    })
  },
  getMyAttachmentPageList (data) {
    return axiosApi({
      method: 'get',
      url: apiList.getMyAttachmentPageList,
      data
    })
  },
  saveFolder (data) {
    return axiosApi({
      method: 'post',
      url: apiList.saveFolder,
      data
    })
  },
  updateFolder (data) {
    return axiosApi({
      method: 'put',
      url: apiList.saveFolder,
      data
    })
  },
  delFile (data) {
    return axiosApi({
      method: 'DELETE',
      url: apiList.delFile,
      data
    })
  }
}
