/* axios */
import axios from 'axios'
import { Message, LoadingBar } from 'view-design'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export function myPost ({ url, params }) {
  return new Promise((resolve, reject) => {
    LoadingBar.start()
    axios.post(url, params)
      .then(res => {
        if (res.data.status === 0 || !res.data.error) {
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
  })
}
