import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
declare type RawItem = GrepRawItem | NodeRawItem;
export declare type HierarchieTree = {
    payload: string;
    file: string;
    folder: string;
    handles: RawItem[];
    states: RawItem[];
    componentDocs: RawItem[];
    collectionDocs: RawItem[];
    collections: HierarchieTree[];
};
export default function createCommandHierarchie(rawItems: RawItem[]): HierarchieTree[];
export {};
