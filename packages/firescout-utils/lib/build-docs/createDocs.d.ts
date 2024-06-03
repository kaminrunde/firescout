import { RawItem as MdItem } from './searchWithNode';
import { Docs as MdDocs } from './parseMdDocs';
export type Docs = Record<string, MdDocs>;
export default function createDocs(mdItems: MdItem[]): Docs;
