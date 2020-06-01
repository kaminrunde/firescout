import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
declare type MdItem = GrepRawItem | NodeRawItem;
export declare type Docs = {};
export default function createDocs(mdItems: MdItem[]): Docs[];
export {};
