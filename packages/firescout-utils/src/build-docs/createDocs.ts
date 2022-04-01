import { RawItem as MdItem } from './searchWithNode'
import parseMdDocs, { Docs as MdDocs } from './parseMdDocs'

export type Docs = Record<string, MdDocs>

export default function createDocs(mdItems: MdItem[]): Docs {
  const componentDocs = mdItems.filter((item) => item.type === 'component-doc')
  const collectionDocs = mdItems.filter((item) => item.type === 'collection-doc')
  const docs = componentDocs.map((item) => parseMdDocs(item, collectionDocs))
  let result: Docs = {}
  for (let doc of docs) if (doc) result[doc.context] = doc
  return result
}
