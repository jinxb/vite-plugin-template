import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const CODEMETAURL = '/__codeMeta'
let filename
if (typeof import.meta === 'object' && import.meta.url) {
  filename = fileURLToPath(import.meta.url)
} else {
  // CommonJS 环境的回退逻辑
  filename = __filename
}
const dirname = path.dirname(filename)
export const resolve = (...paths: string[]) => path.resolve(dirname, ...paths)
