/* axios */
import axios from 'axios'
import { Message, LoadingBar } from 'view-design'
import store from '../store'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export function myPost ({ url, params }) {
  return new Promise((resolve, reject) => {
    store.commit('setLoading', true)
    LoadingBar.start()
    const start = new Date().valueOf()
    axios.post(url, params)
      .then(res => {
        if (res.data.status === 0) {
          LoadingBar.finish()
          resolve(res.data.data)
        } else {
          LoadingBar.error()
          Message.error(res.data.message || '请求错误，稍后重试！')
          reject(res.data)
        }
      })
      .catch(() => {
        LoadingBar.error()
        Message.error('网络错误，稍后重试！')
        reject()
      })
      .finally(() => {
        if (new Date().valueOf() - start < 1500) {
          setTimeout(() => {
            store.commit('setLoading', false)
          }, 1000)
        } else {
          store.commit('setLoading', false)
        }
      })
  })
}
