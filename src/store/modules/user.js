// 用于处理和用户相关的内容
import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
export default {
  namespaced: true, // 表示我们的模块是一个单独的模块，不会被合并到主模块
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => { // return promise 的原因是无论登录成功失败，之后我们都需要进行处理。（then/catch）
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            this.commit('user/setToken', data.data.data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
