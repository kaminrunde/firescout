import { RawItem } from './searchWithNode';
export type HierarchieTree = {
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
 */
export default function createCommandHierarchie(rawItems: RawItem[]): {
    tree: HierarchieTree[];
    mdItems: RawItem[];
    variableItems: RawItem[];
    moduleItems: RawItem[];
    fixtureItems: RawItem[];
};
