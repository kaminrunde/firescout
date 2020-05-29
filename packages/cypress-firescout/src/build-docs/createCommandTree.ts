import parseComponendMdDocs from './parseComponentMdDocs'
import {RawItem} from './parseInput'

export type Tree = {
  context: string,
  typesaveContext: string,
  file: string,
  basePath: string,
  docsFile?: string,
  docs?: ReturnType<typeof parseComponendMdDocs>
  triggers: {
    name: string,
    file: string
  }[],
  states: {
    name: string,
    file: string
  }[]
}[]

export default function createCommandTree (items:RawItem[]):Tree {
  const docs = items
    .filter(item => item.type === 'component-doc')
    .map(item => ({
      file: item.file,
      docs: parseComponendMdDocs(item.payload)
    }))
    .reduce<any>((p,n) => (p[n.docs.context]=n) && p, {})

  return items
    .filter(item => item.type === 'ctx')
    .map(item => {
      const basePath = item.file.split('/').slice(0, -1).join('/')
      return ({
        context: item.payload,
        typesaveContext: (item.payload.charAt(0).toUpperCase() + item.payload.slice(1)).replace(/\//g, ''),
        basePath: basePath,
        docsFile: docs[item.payload]?.file,
        docs: docs[item.payload]?.docs,
        file: item.file,
        triggers: items
          .filter(item => item.type === 'trigger')
          .filter(item => item.file.includes(basePath))
          .map(item => ({
            name: item.payload,
            file: item.file
          })),
        states: items
          .filter(item => item.type === 'state')
          .filter(item => item.file.includes(basePath))
          .map(item => ({
            name: item.payload,
            file: item.file
          }))
      })
    })
}