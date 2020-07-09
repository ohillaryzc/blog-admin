/* api请求 */
import { myPost } from '../utils/request'

function visitorLogin (params) {
  return myPost({
    url: '/login',
    params
  })
}

export {
  visitorLogin
}
