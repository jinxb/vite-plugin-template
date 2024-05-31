type MessageType = 'history' | 'hash' | 'reload' | 'codeMeta' | 'selected'

interface Message {
  codeMeta?: CodeMetaPath[] | CodeMetaPath
  type?: 'push' | 'replace'
  action: MessageType
  url?: string
  data?: any
}

interface HashMessage extends Message {
  action: 'hash'
  url: string
}
interface HistoryMessage extends Message {
  action: 'history'
  type: 'push' | 'replace'
  url: string
  data: any
}
interface CodeMetaPathMessage extends Message {
  action: 'codeMeta'
  codeMeta: CodeMetaPath[]
}

interface CodeMetaMessage extends Message {
  action: 'codeMeta'
  codeMeta: CodeMetaPath
}

interface ReloadMessage extends Message {
  action: 'reload'
}

interface SelectedMessage extends Message {
  action: 'selected'
}

interface Loc {
  line: number
  column: number
  offset: number
}

interface IProps {
  diractive: false | string
  name: string
  value: string
}

interface CodeMeta {
  start: Loc
  end: Loc
  isSelfClosing: boolean
  filename: string
  isComponent: boolean
  slotName?: string
  name: string
  began: number
  props: IProps[]
  id?: string
}

interface CodeMetaPath {
  name: string
  rect: DOMRect
  codeMeta: CodeMeta
}

type NodeStyle = {
  name: string
  rect: DOMRect
  codeMeta: CodeMeta
} | null

type Editor = 'atom' | 'code' | 'code_insiders' | 'idea' | 'phpstorm' | 'pycharm' | 'webstorm' | 'hbuilder'

type IDEOpenMethod = 'reuse' | 'new' | 'auto'

export type {
  NodeStyle,
  HashMessage,
  HistoryMessage,
  CodeMetaMessage,
  CodeMetaPathMessage,
  CodeMeta,
  ReloadMessage,
  Message,
  CodeMetaPath,
  SelectedMessage,
  IProps,
  Editor,
  IDEOpenMethod
}
