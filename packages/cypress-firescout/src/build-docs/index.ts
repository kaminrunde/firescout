import * as utils from './utils'
import createCommandTree from './createCommandTree'
import createFileContent from './createFileContent'
import fs from 'fs'

const configRaw = fs.readFileSync(process.cwd()+'/firescout.json', 'utf8')
const config = JSON.parse(configRaw)

const DOCS_CMD = `grep -rl "<!-- firescout-docs -->" ${process.cwd()}/${config.widgetFolder}`
const HANDLES_CMD = `grep -HREo "data-cy-(state|ctx|trigger)=(\\"|').*(\\"|')" ${process.cwd()}/${config.widgetFolder}`

type RawItem = {
  type: 'ctx' | 'trigger' | 'state' | 'component-doc',
  payload: string,
  file: string
}

Promise.all([
  utils.executeCmd(DOCS_CMD),
  utils.executeCmd(HANDLES_CMD),
])

// format
.then(a => a.map(s => {
  const list = s.split('\n').filter(Boolean)
  return Array.from(new Set(list))
}))

.then(([docs, handles]) => {
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
})
.then(createCommandTree)
.then(createFileContent)
// .then(r => JSON.stringify(r,null,2))
.then(console.log)
.catch(console.log)