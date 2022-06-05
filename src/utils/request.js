import axios from 'axios'
import { ElMessage } from 'element-plus' // 在非组件中使用element消息提示组件！！
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 icode
    config.headers.icode = 'FAEA43498368E432'
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (isCheckTimeout()) { // 超时前端主动接入
        // 登出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data // 注意，axios返回的是一个promise对象，因此，这里其实是等价于 return Promise.resolve(data)
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理服务端 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401 // 401是token超时，还可以自定义码来显示单点登录的问题
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error) // 有个问题，这个return值哪里可以接收？？？
  }
)
export default service
