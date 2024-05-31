import type { Connect } from 'vite'
import { middlewares } from '../fs-handle'
import launchEditor from '../utils/launch-editor'

const nodeOptMiddleware: Connect.NextHandleFunction = (req, res, next) => {
  if (req.url === '/nodeopt' && req.method?.toLowerCase() === 'post') {
    let i = -1
    const dispatch: Connect.NextFunction = async (index: number) => {
      if (i >= index) console.warn('请勿重复调用next')
      i = index
      const fn = middlewares[index]
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(req, res, dispatch.bind(null, index + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    dispatch(0)
  } else if (req.url === '/locationSourceCode' && req.method?.toLowerCase() === 'post') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString() // 将数据块拼接成字符串
    })
    req.on('end', () => {
      try {
        ;(req as any).body = JSON.parse(body) // 尝试解析 JSON
        const { file, line, column } = (req as any).body
        res.end('ok')
        launchEditor(file, line, column)
      } catch (error) {
        res.statusCode = 400
        res.end('Invalid JSON')
      }
    })
  } else {
    next()
  }
}

export * from '../fs-handle'
export default nodeOptMiddleware
