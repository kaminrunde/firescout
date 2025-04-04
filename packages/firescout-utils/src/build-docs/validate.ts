import * as reporter from './reporter'
import { Tree } from './createCommandTree'
import { Docs } from './createDocs'
import { ModuleTree } from './createModuleTree'

type Input = {
  tree: Tree[]
  docs: Docs
  modules: ModuleTree[]
}

export default function validate(input: Input): Input {
  /**
   * all sets have the same signature: "[ctx]-[collection]?-[handle]":file
   * the collection is optional or can be multiple
   */
  const treeCtx = new Map<string, string>()
  const treeCollections = new Map<string, string>()
  const treeHandles = new Map<string, string>()
  const treeStates = new Map<string, string>()
  const docsCtx = new Map<string, string>()
  const docsCollections = new Map<string, string>()
  const docsHandles = new Map<string, string>()
  const docsStates = new Map<string, string>()
  const docsStateImplementations = new Map<string, string>()
  const treeStateImplementations = new Map<string, string>()

  ;(function callTree(trees: Tree[], prefix: string) {
    for (let tree of trees) {
      prefix === ''
        ? treeCtx.set(prefix + tree.context, tree.file)
        : treeCollections.set(prefix + tree.context, tree.file)
      for (let handle of tree.handles)
        treeHandles.set(prefix + tree.context + ' -> ' + handle.name, handle.file)
      for (let state of tree.states) {
        if (state.hasRootRef && state.implementations) {
          reporter.report('MIXED_STATES_AND_IMPLEMENTATIONS', state)
        }
        treeStates.set(prefix + tree.context + ' -> ' + state.name, state.file)
        if (state.implementations)
          for (let imp of state.implementations) {
            treeStateImplementations.set(
              prefix + tree.context + ' -> ' + state.name + ':' + imp.name,
              imp.file
            )
          }
      }
      callTree(tree.collections, prefix + tree.context + ' -> ')
    }
  })(input.tree, '')
  ;(function callDocs(docs: Docs, prefix: string) {
    for (let ctx in docs) {
      const doc = docs[ctx]
      prefix === ''
        ? docsCtx.set(prefix + doc.context, doc.file)
        : docsCollections.set(prefix + doc.context, doc.file)
      for (let handle of doc.handles.bullets)
        docsHandles.set(prefix + doc.context + ' -> ' + handle.name, doc.file)
      for (let state of doc.states.bullets) {
        docsStates.set(prefix + doc.context + ' -> ' + state.name, doc.file)
        if (state.bullets)
          for (let bul of state.bullets)
            docsStateImplementations.set(
              prefix + doc.context + ' -> ' + state.name + ':' + bul.name,
              doc.file
            )
      }
      callDocs(doc.collections, prefix + doc.context + ' -> ')
    }
  })(input.docs, '')

  for (let [name, file] of Array.from(treeCtx)) {
    if (!docsCtx.has(name)) reporter.report('NO_DOCS', { name, file })
  }

  for (let [name, file] of Array.from(treeCollections)) {
    if (!docsCollections.has(name)) reporter.report('COLLECTION_HAS_NO_DOCS', { name, file })
  }

  for (let [name, file] of Array.from(treeHandles)) {
    if (!docsHandles.has(name)) reporter.report('HANDLE_HAS_NO_DOCS', { name, file })
  }

  for (let [name, file] of Array.from(treeStates)) {
    if (!docsStates.has(name)) reporter.report('STATE_HAS_NO_DOCS', { name, file })
  }

  for (let [name, file] of Array.from(treeStateImplementations)) {
    if (!docsStateImplementations.has(name))
      reporter.report('STATE_IMPLEMENTATION_HAS_NO_DOCS', { name, file })
  }

  for (let [name, file] of Array.from(docsCtx)) {
    if (!treeCtx.has(name)) reporter.report('NO_CTX_REF', { name, file })
  }

  for (let [name, file] of Array.from(docsCollections)) {
    if (!treeCollections.has(name)) reporter.report('COLLECTION_HAS_NO_REF', { name, file })
  }

  for (let [name, file] of Array.from(docsHandles)) {
    if (!treeHandles.has(name)) reporter.report('HANDLE_HAS_NO_REF', { name, file })
  }

  for (let [name, file] of Array.from(docsStates)) {
    if (!treeStates.has(name)) reporter.report('STATE_HAS_NO_REF', { name, file })
  }

  for (let [name, file] of Array.from(docsStateImplementations)) {
    if (!treeStateImplementations.has(name))
      reporter.report('STATE_IMPLEMENTATION_HAS_NO_REF', { name, file })
  }

  return input
}