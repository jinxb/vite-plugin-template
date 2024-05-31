// import axios from 'axios'
import type { Connect } from 'vite'
import { getIP } from '../utils'

const PushInfoMiddleware = (isExecuted: { value: boolean }): Connect.NextHandleFunction => {
  return async (req, res, next) => {
    if (!isExecuted.value) {
      // // 推送端口号、组件信息
      const ip = getIP(true)
      console.log(ip, 'ip')
      // const response = await axios.post('https://kenym.cn:8099'); // 替换为你的线上服务器URL
      isExecuted.value = true
    }
    next()
  }
}

export default PushInfoMiddleware
