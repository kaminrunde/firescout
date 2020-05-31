// not used

import * as utils from './utils'
import fs from 'fs'

export type RawItem = {
  type: 'ctx' | 'trigger' | 'state' | 'component-doc',
  payload: string,
  file: string
}

export default function parseInput (input: [string,string]):RawItem[] {
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
    type: handle.match(/data-cy-(state|ctx|trigger)/)[1] as string,
    // @ts-ignore
    payload: handle.match(/data-cy-(state|ctx|trigger)=("|')(.*)("|')/)[3] as string
  })) as any
  return [...rawDocItems, ...rawHandleItems]
}