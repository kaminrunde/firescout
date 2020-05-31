import * as utils from './utils'
import fs from 'fs'
import config from './config'

export type RawItem = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc',
  payload: string,
  file: string
}

const DOCS_CMD = `grep -rl "<!-- firescout-docs -->" ${config.widgetFolder}`
const HANDLES_CMD = `grep -HREo "data-cy-(state|ctx|handle)=(\\"|').*(\\"|')" ${config.widgetFolder}`

export default function searchWithGrep ():Promise<RawItem[]> {
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
    file: utils.parseFile(doc),
    type: 'component-doc',
    payload: fs.readFileSync(doc, 'utf8')
  }))
  const rawHandleItems:RawItem[] = handles.map(handle => ({
    file: utils.parseFile(handle.split(':')[0]),
    // @ts-ignore
    type: handle.match(/data-cy-(state|ctx|handle)/)[1] as string,
    // @ts-ignore
    payload: handle.match(/data-cy-(state|ctx|handle)=("|')(.*)("|')/)[3] as string
  })) as any
  return [...rawDocItems, ...rawHandleItems]
}