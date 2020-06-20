import {RawItem as GrepRawItem} from './searchWithGrep'
import {RawItem as NodeRawItem} from './searchWithNode'
import {Tree} from './createCommandTree'
import {Docs} from './createDocs'
import {ModuleTree} from './createModuleTree'

type RawItem = GrepRawItem | NodeRawItem

const codes = {
  // HANDLE_WITHOUT_PARENT: (item:RawItem) => `You declared a "data-cy-handle='${item.payload}'" `
  // + `in "${item.file}" but there was no parent found. You have define a "data-cy-ctx" in `
  // + `either the same file or `,
  HANDLE_WITHOUT_PARENT: (item:RawItem) => item.file,
  STATE_WITHOUT_PARENT: (item:RawItem) => item.file,
  COLLECTION_WITHOUT_PARENT: (item:RawItem) => item.file,
  HANDLE_HAS_NO_DOCS: (file:string) => file,
  STATE_HAS_NO_DOCS: (file:string) => file,
}

export function report(code:'HANDLE_WITHOUT_PARENT', item:RawItem):void
export function report(code:'STATE_WITHOUT_PARENT', item:RawItem):void
export function report(code:'COLLECTION_WITHOUT_PARENT', item:RawItem):void
export function report(code:'HANDLE_HAS_NO_DOCS', item:RawItem):void
export function report(code:'STATE_HAS_NO_DOCS', item:RawItem):void
export function report (code:keyof typeof codes, ctx:any) {
  console.log(code, codes[code](ctx))
}

type Input = {
  tree:Tree[], 
  docs:Docs,
  modules:ModuleTree[]
}

export function validate (input:Input):Input {
  /**
   * all sets have the same signature: "[ctx]-[collection]?-[handle]":file
   * the collection is optional or can be multiple
   */
  const treeCtx = new Map<string,string>()
  const treeCollections = new Map<string,string>()
  const treeHandles = new Map<string, string>()
  const treeStates = new Map<string, string>()
  const docsCtx = new Map<string,string>()
  const docsCollections = new Map<string,string>()
  const docsHandles = new Map<string, string>()
  const docsStates = new Map<string, string>()
  for(let tree of input.tree) {
    treeCtx.set(tree.context, tree.file)
    for(let handle of tree.handles) treeHandles.set(tree.context + '-' + handle.name, handle.file)
    for(let state of tree.states) treeStates.set(tree.context + '-' + state.name, state.file)
  }

  for(let ctx in input.docs) {
    const doc = input.docs[ctx]
    docsCtx.set(doc.context,doc.file)
    for(let handle of doc.handles.bullets) docsHandles.set(doc.context + '-' + handle.name, doc.file)
    for(let state of doc.states.bullets) docsStates.set(doc.context + '-' + state.name, doc.file)
  }

  for(let handle in treeHandles) {
    if(!docsHandles.has(handle)) {}
  }

  for(let state in treeStates) {
    if(!docsStates.has(state)) {}
  }

  for(let handle in docsHandles) {
    if(!treeHandles.has(handle)) {}
  }

  for(let state in docsStates) {
    if(!treeStates.has(state)) {}
  }

  return input
}