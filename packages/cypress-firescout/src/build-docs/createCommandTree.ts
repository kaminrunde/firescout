import parseComponendMdDocs from './parseComponentMdDocs'
import {HierarchieTree} from './createCommandHierarchie'
import * as utils from './utils'

export type Tree = {
  context: string,
  typesaveContext: string,
  file: string,
  folder: string,
  docsFile?: string,
  docs?: ReturnType<typeof parseComponendMdDocs>
  handles: {
    name: string,
    file: string
  }[],
  states: {
    name: string,
    file: string
  }[],
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
    states: target.states.map(item => ({
      name: item.payload,
      file: item.file
    })),
    collections: createCommandTree(target.collections)
  }))
}


// export default function createCommandTree (items:RawItem[]):Tree[] {
//   let handleItems:RawItem[] = []
//   let collectionItems:RawItem[] = []
//   let stateItems:RawItem[] = []
//   let ctxItems:RawItem[] = []
//   let componentDocsItems:RawItem[] = []
//   let collectionDocsItems:RawItem[] = []
//   for(let item of items) {
//     switch(item.type){
//       case 'ctx': ctxItems.push(item); break;
//       case 'collection-doc': collectionDocsItems.push(item);break;
//       case 'component-doc': componentDocsItems.push(item); break;
//       case 'handle': handleItems.push(item); break;
//       case 'state': stateItems.push(item); break;
//       case 'collection': collectionItems.push(item); break;
//     }
//   }

//   const componentDocs = componentDocsItems
//     .map(item => ({
//       file: item.file,
//       folder: item.folder,  
//       docs: parseComponendMdDocs(item, collectionDocsItems)
//     }))

//   const collectionDocs = collectionDocsItems
//     .map(item => ({
//       file: item.file,
//       folder: item.folder,
//       docs: parseComponendMdDocs(item, collectionDocsItems)
//     }))
//     // TODO: sort by folder

//   const allDocs = [...componentDocs, ...collectionDocs]


//   console.log(collectionDocs)


//   function createSingleTree (target:RawItem):Tree {
//     const basePath = utils.getFileFolder(target.file)
//     const componentDoc = allDocs
//       .find(doc => doc.file.includes(target.folder) && doc.docs.context === target.payload)
//     const collections = collectionItems
//       .filter(item => item.file.includes(target.folder))
//       // TODO: filter sub collections

//     return {
//       context: target.payload,
//       typesaveContext: utils.getTypesaveId(target.payload),
//       basePath,
//       // docsFile: componentDoc?.file,
//       // docs: componentDoc?.docs,
//       file: target.file,
//       handles: handleItems
//         .filter(item => item.file.includes(basePath))
//         .map(item => ({
//           name: item.payload,
//           file: item.file
//         })),
//       states: stateItems
//         .filter(item => item.file.includes(basePath))
//         .map(item => ({
//           name: item.payload,
//           file: item.file
//         })),
//       collections: collections.map(item => createSingleTree(item)),
//     }
//   }

//   return null

//   // return ctxItems.map(item => createSingleTree(item))
// }

// export default function createCommandTree (items:RawItem[]):Tree {
//   const collectionDocs = items.filter(item => item.type === 'collection-doc')
//   const docs = items
//     .filter(item => item.type === 'component-doc')
//     .map(item => ({
//       file: item.file,
//       docs: parseComponendMdDocs(item, collectionDocs)
//     }))
//     .reduce<any>((p,n) => (p[n.docs.context]=n) && p, {})

//   return items
//     .filter(item => item.type === 'ctx')
//     .map(item => {
//       const basePath = item.file.split('/').slice(0, -1).join('/')
//       return ({
//         context: item.payload,
//         typesaveContext: (item.payload.charAt(0).toUpperCase() + item.payload.slice(1)).replace(/\//g, ''),
//         basePath: basePath,
//         docsFile: docs[item.payload]?.file,
//         docs: docs[item.payload]?.docs,
//         file: item.file,
//         handles: items
//           .filter(item => item.type === 'handle')
//           .filter(item => item.file.includes(basePath))
//           .map(item => ({
//             name: item.payload,
//             file: item.file
//           })),
//         states: items
//           .filter(item => item.type === 'state')
//           .filter(item => item.file.includes(basePath))
//           .map(item => ({
//             name: item.payload,
//             file: item.file
//           })),
//         collections: []
//       })
//     })
// }