import { HierarchieTree } from './createCommandHierarchie';
declare type State = {
    name: string;
    file: string | null;
    hasRootRef: boolean;
    implementations: null | {
        name: string;
        file: string;
    }[];
};
export declare type Tree = {
    context: string;
    typesaveContext: string;
    file: string;
    folder: string;
    handles: {
        name: string;
        file: string;
    }[];
    states: State[];
    collections: Tree[];
};
export default function createCommandTree(tree: HierarchieTree[]): Tree[];
export {};
