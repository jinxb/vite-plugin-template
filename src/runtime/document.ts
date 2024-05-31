import type { CodeMeta } from '../shared/types'
import * as uuid from 'uuid'
import { getSelectId } from './utils'

const originCreateElement = document.createElement

document.createElement = function (tagName: string, options?: ElementCreationOptions) {
  const el = originCreateElement.call(this, tagName, options)

  Object.defineProperty(el, 'codeMeta', {
    enumerable: true,
    set(value: CodeMeta) {
      const id = (el as any).__codeMeta?.id || uuid.v4()
      const codeMeta = {
        ...value,
        id
      }
      if (getSelectId() === id) {
        window.parent.postMessage(
          {
            action: 'selected',
            codeMeta: {
              codeMeta,
              rect: el.getBoundingClientRect(),
              name: codeMeta.name
            }
          },
          '*'
        )
      }
      ;(el as any).__codeMeta = codeMeta
    },
    get() {
      return (el as any).__codeMeta
    }
  })

  return el
}

const originDefineProperty = Object.defineProperty

Object.defineProperty = function (obj: any, prop: string, descriptor: PropertyDescriptor & ThisType<any>): any {
  const newDescriptor = { ...descriptor }
  if (obj instanceof HTMLElement && prop === '__vnode') {
    const value = descriptor.value
    const codeMeta = value.props?.codeMeta || value.ctx.attrs?.codeMeta
    if (codeMeta) {
      newDescriptor.value = {
        ...value,
        __codeMeta: codeMeta
      }
    }
  }
  return originDefineProperty.call(this, obj, prop, newDescriptor)
}

export {}
