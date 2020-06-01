import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
import { Docs as MdDocs } from './parseComponentMdDocs';
declare type MdItem = GrepRawItem | NodeRawItem;
export declare type Docs = Record<string, MdDocs>;
export default function createDocs(mdItems: MdItem[]): Docs;
export {};
