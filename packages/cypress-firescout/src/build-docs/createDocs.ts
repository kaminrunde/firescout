import {RawItem as GrepRawItem} from './searchWithGrep'
import {RawItem as NodeRawItem} from './searchWithNode'
import parseMdDocs, {Docs} from './parseComponentMdDocs'

type MdItem = GrepRawItem | NodeRawItem


export default function createDocs (mdItems:MdItem[]):Docs[] {
  const componentDocs = mdItems.filter(item => item.type === 'component-doc')
  const collectionDocs = mdItems.filter(item => item.type === 'collection-doc')
  const docs = componentDocs.map(item => parseMdDocs(item, collectionDocs))
  return docs
}