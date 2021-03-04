import {RawItem} from './searchWithNode'
import {report} from './reporter'

export type HierarchieTree = {
  payload: string,
  file: string,
  folder: string,
  handles: RawItem[],
  states: RawItem[],
  collections: HierarchieTree[],
}

type EnhancedCollection = RawItem & {
  handles: RawItem[],
  states: RawItem[],
  collections: EnhancedCollection[]
}

/**
 * creates the hierarchie tree and enshures that collection commands won't be
 * stored on the root component. It splits the result
 */
export default function createCommandHierarchie(rawItems:RawItem[]):{
  tree:HierarchieTree[],
  mdItems:RawItem[],
  variableItems:RawItem[],
  moduleItems:RawItem[],
  fixtureItems:RawItem[]
} {
  let tree:HierarchieTree[] = []
  let handleItems:RawItem[] = []
  let collectionItems:RawItem[] = []
  let stateItems:RawItem[] = []
  let ctxItems:RawItem[] = []
  let mdItems:RawItem[] = []
  let moduleItems:RawItem[] = []
  let variableItems:RawItem[] = []
  let fixtureItems:RawItem[] = []
  for(let item of rawItems) {
    switch(item.type){
      case 'ctx': ctxItems.push(item); break;
      case 'collection-doc': mdItems.push(item);break;
      case 'component-doc': mdItems.push(item); break;
      case 'handle': handleItems.push(item); break;
      case 'state': stateItems.push(item); break;
      case 'collection': collectionItems.push(item); break;
      case 'module-fn': moduleItems.push(item); break;
      case 'fixture': fixtureItems.push(item); break;
      case 'module-var': variableItems.push(item); break;
    }
  }

  // sort collection items to ensure that deeper collections are parsed first
  collectionItems = collectionItems
  .sort((a,b) => a.file.localeCompare(b.file))
  .sort((a,b) => {
    if(a.folder.includes(b.folder)) return -1
    if(b.folder.includes(a.folder)) return 1
    return 0
  })

  let enhancedCollections:EnhancedCollection[] = []

  for (let collectionItem of collectionItems) {
    const [includeHandles, excludeHandles] = extractItems(collectionItem, handleItems)
    const [includeStates, excludeStates] = extractItems(collectionItem, stateItems)
    const [includeColls, excludeColls] = extractItems(collectionItem, enhancedCollections)
    handleItems = excludeHandles
    stateItems = excludeStates
    enhancedCollections = excludeColls
    enhancedCollections.push(Object.assign({}, collectionItem, {
      handles: includeHandles,
      states: includeStates,
      collections: includeColls,
    }))
  }
  
  for(let ctx of ctxItems) {
    const [includeHandles, excludeHandles] = extractItems(ctx, handleItems)
    const [includeStates, excludeStates] = extractItems(ctx, stateItems)
    const [includeColls, excludeColls] = extractItems(ctx, enhancedCollections)
    handleItems = excludeHandles
    stateItems = excludeStates
    enhancedCollections = excludeColls
    tree.push({
      ...ctx,
      handles: includeHandles,
      states: includeStates,
      collections: includeColls,
    })
  }

  if(handleItems.length) for(let item of handleItems) report('HANDLE_WITHOUT_PARENT', item)
  if(stateItems.length) for(let item of stateItems) report('STATE_WITHOUT_PARENT', item)
  if(enhancedCollections.length) for(let item of enhancedCollections) report('COLLECTION_WITHOUT_PARENT', item)

  return {tree, mdItems, moduleItems, fixtureItems, variableItems}
}

/**
 * group all items that are in subfolder related to target
 * @returns [include,exclude] 
 */
function extractItems(target:RawItem, rawItems:any[]):[any[], any[]] {
  let exclude:RawItem[] = []
  let include:RawItem[] = []
  for(let item of rawItems) {
    if(item.folder === target.folder || item.folder.includes(target.folder+'/')) include.push(item)
    else exclude.push(item)
  }
  return [include, exclude]
}