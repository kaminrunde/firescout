import exec from './exec'
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
  exec(DOCS_CMD),
  exec(HANDLES_CMD),
])
.then(a => a.map(s => s.split('\n').filter(Boolean)))
.then(([docs, handles]) => {
  const rawDocItems:RawItem[] = docs.map(doc => ({
    file: doc,
    type: 'component-doc',
    payload: fs.readFileSync(doc, 'utf8')
  }))
  const rawHandleItems:RawItem[] = handles.map(handle => ({
    file: handle.split(':')[0],
    // @ts-ignore
    type: handle.match(/data-cy-(state|ctx|trigger)/)[1] as string,
    // @ts-ignore
    payload: handle.match(/data-cy-(state|ctx|trigger)=("|')(.*)("|')/)[3] as string
  })) as any
  return [...rawDocItems, ...rawHandleItems]
})
.then(items => {
  console.log(items)
})
.catch(console.log)