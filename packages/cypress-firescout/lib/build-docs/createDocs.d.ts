import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
import { Docs } from './parseComponentMdDocs';
declare type MdItem = GrepRawItem | NodeRawItem;
export default function createDocs(mdItems: MdItem[]): Docs[];
export {};
