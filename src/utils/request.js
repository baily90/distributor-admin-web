import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const whiteList = ['/login', '/refresh-token']

const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
})

service.interceptors.request.use((config) => {
  // 是否需要设置 token
  let isNoNeedsToken = (config?.headers || {}).isNoNeedsToken === false
  whiteList.some((v) => {
    if (config.url.indexOf(v) > -1) {
      isNoNeedsToken = true
    }
    return isNoNeedsToken
  })
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  if (token.value && !isNoNeedsToken) {
    config.headers.Authorization = `Bearer ${token.value}`
  }
  return config
})

service.interceptors.response.use(async (response) => {
  if (response.status && response.status === 200) {
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      // 注意：如果导出的响应为 json，说明可能失败了，不直接返回进行下载
      if (response.data.type !== 'application/json') {
        return response.data
      }
      response.data = await new Response(response.data).json()
    }
    if (response.data.code === 401) {
      ElMessage({
        message: response.data.msg || '登录凭证失效，请重新登录',
        type: 'warning'
      })
    } else if (response.data.code !== 200) {
      ElMessage({
        message: response.data.msg || '数据异常',
        type: 'error'
      })
    }
    return response.data
  } else {
    ElMessage({
      message: response.data.msg,
      type: 'error'
    })
  }
}, (err) => {
  ElMessage({
    message: err.message || '服务器异常',
    type: 'error'
  })
})

export default {
  get: option => service({ method: 'GET', ...option }),
  post: option => service({ method: 'POST', ...option }),
  postOriginal: option => service({ method: 'POST', ...option }),
  delete: option => service({ method: 'DELETE', ...option }),
  put: option => service({ method: 'PUT', ...option }),
  download: option => service({ method: 'GET', responseType: 'blob', ...option }),
  upload: async (option) => {
    option.headersType = 'multipart/form-data'
    const res = await service({ method: 'POST', ...option })
    return res
  }
}
