import * as utils from './utils'
import fs from 'fs'
import getConfig from './config'

export type RawItem = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc' | 'collection',
  payload: string,
  file: string,
  folder: string
}

export default function searchWithGrep ():Promise<RawItem[]> {
  const config = getConfig()
  const DOCS_CMD = `grep -rl "<!-- firescout-(component|collection) -->" ${config.widgetFolders}`
  const HANDLES_CMD = `grep -HREo "data-cy-(state|ctx|handle|collection)=(\\"|').*(\\"|')" ${config.widgetFolders}`
  return Promise.all([
    utils.executeCmd(DOCS_CMD), 
    utils.executeCmd(HANDLES_CMD)
  ]).then(parseInput)
}

function parseInput (input: [string,string]):RawItem[] {
  const [docs, handles] = input.map(s => {
    const list = s.split('\n').filter(Boolean)
    return Array.from(new Set(list))
  })
  const rawDocItems:RawItem[] = docs.map(doc => ({
    file: utils.normalizeFilePath(doc),
    type: doc.match(/firescout-component/) ? 'component-doc' : 'collection-doc',
    payload: fs.readFileSync(doc, 'utf8'),
    folder: utils.getFileFolder(doc)
  }))
  const rawHandleItems:RawItem[] = handles.map(handle => ({
    file: utils.normalizeFilePath(handle.split(':')[0]),
    // @ts-ignore
    type: handle.match(/data-cy-(state|ctx|handle|collection)/)[1] as string,
    // @ts-ignore
    payload: handle.match(/data-cy-(state|ctx|handle|collection)=("|')(.*)("|')/)[3] as string
  })) as any
  return [...rawDocItems, ...rawHandleItems]
}