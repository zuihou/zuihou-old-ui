import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

// 请求添加条件，如token
axios.interceptors.request.use(
  config => {
    config.headers.token = localStorage.getItem('token') || ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 接口返回处理
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

function handleError (error, reject) {
  if (error.response && error.response.data) {
    Message({
      message: error.response.data,
      duration: 3
    })
  } else if (error.message) {
    Message({
      message: error.message
    })
  }
  // reject(error)
}

function handleSuccess (res, resolve) {
  if (!res.data.isSuccess && res.data.msg) {
    // 未登录
    if (res.data.code === 40001) {
      MessageBox.alert(res.data.msg, '提醒', {
        confirmButtonText: '确定',
        callback: () => {
          window.location.hash = '/'
        }
      })
    } else {
      Message.error(res.data.msg)
    }
  }
  resolve(res.data)
}

// http请求
const httpServer = (opts) => {
  // 公共参数
  const publicParams = {
    ts: Date.now()
  }
  // http默认配置
  const method = opts.method.toUpperCase()
  const httpDefaultOpts = {
    method,
    baseURL: process.env.VUE_APP_API_BASE_URL,
    url: opts.url,
    timeout: 10000,
    transformRequest: [data => {
      if (opts.formData) {
        const formData = new FormData()
        Object.entries(data).forEach(item => {
          formData.append(item[0], item[1])
        })
        return formData
      }
    }]
  }
  const dataRequest = ['PUT', 'POST', 'PATCH']
  if (dataRequest.includes(method)) {
    httpDefaultOpts.data = opts.data || {}
  } else {
    httpDefaultOpts.params = {
      ...publicParams,
      ...(opts.data || {})
    }
  }

  const promise = new Promise((resolve, reject) => {
    axios(httpDefaultOpts).then(response => {
      handleSuccess(response, resolve)
    }).catch(error => {
      handleError(error, reject)
    })
  })
  return promise
}

export default httpServer
