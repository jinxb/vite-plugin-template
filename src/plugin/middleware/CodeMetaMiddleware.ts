import type { Connect } from 'vite'
import { scriptCache } from '../runtime/const'

const CodeMetaMiddleware: Connect.NextHandleFunction = (req, res, next) => {
  if (!(req as any).scriptCache) {
    ;(req as any).scriptCache = scriptCache
  }
  next()
}

export default CodeMetaMiddleware
