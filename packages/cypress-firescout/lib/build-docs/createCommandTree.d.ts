import { HierarchieTree } from './createCommandHierarchie';
export declare type Tree = {
    context: string;
    typesaveContext: string;
    file: string;
    folder: string;
    handles: {
        name: string;
        file: string;
    }[];
    states: {
        name: string;
        file: string;
    }[];
    collections: Tree[];
};
export default function createCommandTree(tree: HierarchieTree[]): Tree[];
