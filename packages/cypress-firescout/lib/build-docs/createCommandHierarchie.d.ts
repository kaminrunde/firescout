import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
declare type RawItem = GrepRawItem | NodeRawItem;
export declare type HierarchieTree = {
    payload: string;
    file: string;
    folder: string;
    handles: RawItem[];
    states: RawItem[];
    collections: HierarchieTree[];
};
/**
 * creates the hierarchie tree and enshures that collection commands won't be
 * stored on the root component. It splits the result
 *
 * @returns [HierarchieTree,mdItems]
 */
export default function createCommandHierarchie(rawItems: RawItem[]): [HierarchieTree[], RawItem[]];
export {};
