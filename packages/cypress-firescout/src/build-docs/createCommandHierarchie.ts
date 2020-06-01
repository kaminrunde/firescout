import {RawItem as GrepRawItem} from './searchWithGrep'
import {RawItem as NodeRawItem} from './searchWithNode'

type RawItem = GrepRawItem | NodeRawItem

export type HierarchieTree = {
  payload: string,
  file: string,
  folder: string,
  handles: RawItem[],
  states: RawItem[],
  componentDocs: RawItem[],
  collectionDocs: RawItem[],
  collections: HierarchieTree[],
}

type EnhancedCollection = RawItem & {
  handles: RawItem[],
  states: RawItem[],
  collections: EnhancedCollection[],
  componentDocs: never[],
  collectionDocs: never[],
}

export default function createCommandHierarchie(rawItems:RawItem[]):HierarchieTree[] {
  let handleItems:RawItem[] = []
  let collectionItems:RawItem[] = []
  let stateItems:RawItem[] = []
  let ctxItems:RawItem[] = []
  let componentDocsItems:RawItem[] = []
  let collectionDocsItems:RawItem[] = []
  for(let item of rawItems) {
    switch(item.type){
      case 'ctx': ctxItems.push(item); break;
      case 'collection-doc': collectionDocsItems.push(item);break;
      case 'component-doc': componentDocsItems.push(item); break;
      case 'handle': handleItems.push(item); break;
      case 'state': stateItems.push(item); break;
      case 'collection': collectionItems.push(item); break;
    }
  }

  // sort collection items to ensure that deeper collections are parsed first
  collectionItems = collectionItems.sort((a,b) => {
    if(a.folder.includes(b.folder)) return 1
    if(b.folder.includes(a.folder)) return -1
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
      componentDocs: [],
      collectionDocs: []
    }))
  }

  return ctxItems.map(item => ({
    ...item,
    states: stateItems,
    handles: handleItems,
    collections: enhancedCollections.filter(col => col.folder.includes(item.folder)),
    componentDocs: componentDocsItems,
    collectionDocs: collectionDocsItems
  }))
}

/**
 * group all items that are in subfolder related to target
 * @returns [include,exclude] 
 */
function extractItems(target:RawItem, rawItems:any[]):[any[], any[]] {
  let exclude:RawItem[] = []
  let include:RawItem[] = []
  for(let item of rawItems) {
    if(item.folder.includes(target.folder)) include.push(item)
    else exclude.push(item)
  }
  return [include, exclude]
}