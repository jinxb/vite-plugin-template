import type { SFCDescriptor } from '@vue/compiler-sfc'
import { compileScript } from '@vue/compiler-sfc'
import os from 'os'

import { IProps } from '../../shared/types'
import { FormatColumn, FormatFile, FormatLine } from '../../shared/const'

const toString = (obj: any): string => {
  if (typeof obj !== 'object') {
    if (typeof obj === 'string') {
      if (obj.startsWith('$attrs')) return `${obj}`
      return `\`${obj.replaceAll(/\`/g, '\\`')}\``
    }
    return obj
  }
  if (Array.isArray(obj)) {
    return `[${obj.map((item) => toString(item)).join(',')}]`
  }
  const keys = Object.keys(obj)
  let res = `{`
  res += keys
    .filter((key) => obj[key] !== undefined && obj[key] !== null)
    .map((key) => {
      return ` ${key}: ${toString(obj[key])}`
    })
    .join(',')
  res += `}`

  return res
}

const existComp = (str: string, customCom: Set<string>) => {
  if (customCom.has(str)) return true
  const name = str
    .split('-')
    .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
    .join('')
  return customCom.has(name)
}

const getCustomComponent = (descriptor: SFCDescriptor, customCom: Set<string>) => {
  if (!descriptor.scriptSetup && !descriptor.script) return
  const a = compileScript(descriptor, {
    id: 'codeMeta'
  })
  const imports = a.imports
  for (const key in imports) {
    const source = imports[key].source
    if (/\.vue$/.test(source)) {
      customCom.add(key)
    }
  }
}

const formatProps = (node: any): IProps[] => {
  const props = node.props
  // type: 6  name value.content  type 7 arg.content exp.content
  return props.map((prop: any) => {
    const { type, name, value, arg, exp } = prop
    if (type === 6) {
      return {
        diractive: false,
        name,
        value: value?.content
      }
    } else if (type === 7) {
      return {
        diractive: name,
        name: arg?.content,
        value: exp?.content
      }
    }
  })
}

function formatOpenPath(file: string, line: string, column: string, format: string | string[] | boolean) {
  let path = `${file}:${line}:${column}`
  if (typeof format === 'string') {
    path = format.replace(FormatFile, file).replace(FormatLine, line).replace(FormatColumn, column)
  } else if (format instanceof Array) {
    return format.map((item) => {
      return item.replace(FormatFile, file).replace(FormatLine, line).replace(FormatColumn, column)
    })
  }
  return [path]
}

//获取本机ip地址
function getIP(ip: boolean | string) {
  if (typeof ip === 'string' && ip !== '') {
    return ip
  } else if (ip === true) {
    let interfaces = os.networkInterfaces()
    for (let devName in interfaces) {
      let iface = interfaces[devName] as os.NetworkInterfaceInfo[]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
  }
  return 'localhost'
}

export { toString, getCustomComponent, existComp, formatProps, getIP, formatOpenPath }
