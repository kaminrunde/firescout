import { RawItem as MdItem } from './searchWithNode'
import { Docs as MdDocs } from './parseMdDocs'
export declare type Docs = Record<string, MdDocs>
export default function createDocs(mdItems: MdItem[]): Docs
