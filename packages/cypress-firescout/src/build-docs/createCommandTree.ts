import {HierarchieTree} from './createCommandHierarchie'
import * as utils from './utils'


type State = {
  name: string,
  file: string,
  hasRootRef: boolean,
  implementations: null | {
    name: string,
    file: string
  }[]
}

export type Tree = {
  context: string,
  typesaveContext: string,
  file: string,
  folder: string,
  handles: {
    name: string,
    file: string,
  }[],
  states: State[],
  collections: Tree[]
}

export default function createCommandTree (tree:HierarchieTree[]):Tree[] {
  return tree.map(target => ({
    context: target.payload,
    typesaveContext: utils.getTypesaveId(target.payload),
    file: target.file,
    folder: target.folder,
    handles: target.handles.map(item => ({
      name: item.payload,
      file: item.file
    })),
    states: getStates(target),
    collections: createCommandTree(target.collections)
  }))
}

function getStates (tree:HierarchieTree):State[] {
  let states:State[] = []
  let lastState:string = ''

  for(let state of tree.states) {
    const [name, implementation] = state.payload.split(':')
    if(lastState !== name) {
      lastState = name
      states.push({ name, hasRootRef: false, file: state.file, implementations: null})
    }
    if(implementation) {
      let target = states[states.length-1]
      if(!target.implementations) target.implementations = []
      target.implementations.push({ name: implementation, file: state.file })
    }
    else {
      let target = states[states.length-1]
      target.hasRootRef = true
    }
  }

  return states
}