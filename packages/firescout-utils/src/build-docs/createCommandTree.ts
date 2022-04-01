import { HierarchieTree } from './createCommandHierarchie'
import * as utils from './utils'

type State = {
  name: string
  file: string
  hasRootRef: boolean
  implementations:
    | null
    | {
        name: string
        file: string
      }[]
}

export type Tree = {
  context: string
  typesaveContext: string
  file: string
  folder: string
  handles: {
    name: string
    file: string
  }[]
  states: State[]
  collections: Tree[]
}

export default function createCommandTree(tree: HierarchieTree[]): Tree[] {
  return tree.map((target) => ({
    context: target.payload,
    typesaveContext: utils.getTypesaveId(target.payload),
    file: target.file,
    folder: target.folder,
    handles: target.handles.map((item) => ({
      name: item.payload,
      file: item.file,
    })),
    states: getStates(target),
    collections: createCommandTree(target.collections),
  }))
}

function getStates(tree: HierarchieTree): State[] {
  let stateDict: Record<string, State> = {}
  // let states:State[] = []
  // let lastState:string = ''

  for (let state of tree.states) {
    const [name, implementation] = state.payload.split(':')
    if (!stateDict[name])
      stateDict[name] = {
        name: name,
        hasRootRef: false,
        file: 'null',
        implementations: null,
      }
    if (implementation) {
      let target = stateDict[name]
      if (!target.implementations) target.implementations = []
      target.implementations.push({ name: implementation, file: state.file })
    } else {
      let target = stateDict[name]
      target.hasRootRef = true
      target.file = state.file
    }
  }

  return Object.values(stateDict)
}
