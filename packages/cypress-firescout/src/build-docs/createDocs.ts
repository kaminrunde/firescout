import {RawItem as GrepRawItem} from './searchWithGrep'
import {RawItem as NodeRawItem} from './searchWithNode'

type MdItem = GrepRawItem | NodeRawItem

export type Docs = {

}

export default function createDocs (mdItems:MdItem[]):Docs[] {
  return []
}