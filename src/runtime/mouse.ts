import { setSelectId } from './utils'
import type { NodeStyle } from '../shared/types'

const getValidCodeMetaPath = (el: any): NodeStyle[] => {
  const path: NodeStyle[] = []
  while (el && el !== document) {
    const codeMeta = el.__codeMeta
    if (codeMeta) {
      const last = path[path.length - 1]
      if (codeMeta === last?.codeMeta) {
        path.pop()
      }
      path.push({
        codeMeta,
        rect: el.getBoundingClientRect(),
        name: codeMeta.name
      })
    }
    el = el.parentElement
  }

  return path
}

window.addEventListener('mouseover', (e) => {
  const el = e.target
  const codeMeta = getValidCodeMetaPath(el)
  window.parent.postMessage(
    {
      action: 'codeMeta',
      codeMeta
    },
    '*'
  )
})

window.addEventListener('mouseout', (e: any) => {
  const toElement = e.toElement
  if (!toElement) {
    window.parent.postMessage(
      {
        action: 'codeMeta',
        codeMeta: []
      },
      '*'
    )
  }
})

window.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const el = e.target
  const codeMeta = getValidCodeMetaPath(el)[0]
  setSelectId(codeMeta?.codeMeta.id!)
  window.parent.postMessage(
    {
      action: 'selected',
      codeMeta
    },
    '*'
  )
})

export {}
