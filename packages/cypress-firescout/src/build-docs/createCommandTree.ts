
type RawItem = {
  type: 'ctx' | 'trigger' | 'state' | 'component-doc',
  payload: string,
  file: string
}

type Tree = {
  context: string,
  file: string,
  basePath: string,
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
  return items
    .filter(item => item.type === 'ctx')
    .map(item => {
      const basePath = item.file.split('/').slice(0, -1).join('/')
      return ({
        context: item.payload,
        basePath: basePath,
        file: item.file,
        triggers: items
          .filter(item => item.type === 'trigger')
          .filter(item => item.file.includes(basePath))
          .map(item => ({
            name: item.payload,
            file: item.file
          })),
        states: items
          .filter(item => item.type === 'trigger')
          .filter(item => item.file.includes(basePath))
          .map(item => ({
            name: item.payload,
            file: item.file
          }))
      })
    })
}